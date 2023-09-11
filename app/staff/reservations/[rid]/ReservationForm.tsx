"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { toast } from "@ui/use-toast";

import { ComboBoxField, TextInputField, NumberInputField, DateInputField } from "./CustomFormFields";

import { CountriesListType } from "@/db";
import { reservation_sources, reservation_status } from "@/db/schema";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  id: z.coerce.number().positive(),
  room_id: z.coerce.number().positive(),
  guest_name: z.string().min(2, { message: "( min 2 characters. )" }).max(30, { message: "Name must not be longer than 30 characters." }).nullable(),
  phone: z.string().min(11, { message: "( min 11 characters. )" }).max(14, { message: "Phone must not be longer than 14 characters." }).optional(),
  email: z.string().email().optional(),
  country: z.string().optional(),
  id_card_type: z.string().optional(),
  id_card_number: z.string().optional(),
  room_rate: z.coerce.number(),
  check_in: z.date(),
  check_out: z.date(),
  status: z.string(),
  source: z.string(),
});

const reservation_status_list = reservation_status.enumValues.map((value) => ({ label: value }));
const reservation_sources_list = reservation_sources.enumValues.map((value) => ({ label: value }));

interface Props {
  countries: CountriesListType;
  initialData: any;
  last_rid: number;
  room_list: { label: number }[];
}

export function ReservationForm({ initialData, countries, last_rid, room_list }: Props) {
  const params = useParams();
  const router = useRouter();

  const defaultValues = initialData || {
    id: last_rid + 1,
    room_rate: 3000,
    check_in: new Date(),
  };

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/reservation`, values);
      } else {
        await axios.post(`/api/reservation`, values);
      }
      router.refresh();
      router.push("/staff/reservations");
    } catch (error: any) {
      toast({ title: "Something went wrong.", description: error.message });
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          <p>{JSON.stringify(reservation_status_list)}</p>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-[1280px] flex-col items-center space-y-8">
        {/* Customer Form */}
        <h2 className="text-lg self-start tracking-tight font-bold pl-0.5">Customer Info</h2>
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-12">
          <TextInputField form={form} name="guest_name" label="Guest Name" placeholder="Name" />
          <TextInputField form={form} name="phone" label="Phone" placeholder="+8801710000000" />
          <TextInputField form={form} name="email" label="Email" placeholder="name@example.com" />
          <TextInputField form={form} name="id_card_type" label="ID Type" placeholder="Passport, NID" />
          <ComboBoxField form={form} name="country" label="Country" placeholder="Country" list={countries} />
          <TextInputField form={form} name="id_card_number" label="ID No." placeholder="ABCD1234" />
        </div>
        <Separator />

        <h2 className="text-lg self-start tracking-tight font-bold pl-0.5">Booking Info</h2>
        <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
          <NumberInputField form={form} name="id" label="RID" placeholder="Reservation ID" />
          <ComboBoxField form={form} name="room_id" label="Room" placeholder="Room" list={room_list} />
          <NumberInputField form={form} name="room_rate" label="Rate" placeholder="Rate..." />
        </div>
        <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
          <DateInputField form={form} name="check_in" label="Check In" disabled={(date) => date.getTime() < new Date().getTime() - 14 * 24 * 60 * 60 * 1000} />
          <DateInputField form={form} name="check_out" label="Check Out" disabled={(date) => date < form.getValues("check_in")} />
        </div>
        <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
          <ComboBoxField form={form} name="source" label="Source" placeholder="Source" list={reservation_sources_list} />
          <ComboBoxField form={form} name="status" label="Status" placeholder="Status" list={reservation_status_list} />
        </div>

        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
}
