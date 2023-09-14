"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PulseLoader from "react-spinners/PulseLoader";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { toast } from "@ui/use-toast";
import { Separator } from "@ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComboBoxField, ComboBoxFieldProps, TextInputField, NumberInputField, DateInputField } from "./CustomFormFields";

import { CountriesListType } from "@/db";
import { addCustomer, addReservation, getCustomerByID, getCustomerEmails, getCustomerPhones, updateReservation } from "@/actions";
import { Customer, reservation_sources, reservation_status } from "@/db/schema";
import GuestInfoCard from "./GuestInfoCard";
import { useState } from "react";

const formSchema = z.object({
  id: z.coerce.number().positive(),
  room_id: z.coerce.number().positive(),
  room_rate: z.coerce.number(),
  check_in: z.date(),
  check_out: z.date(),
  status: z.enum(reservation_status.enumValues),
  source: z.enum(reservation_sources.enumValues),
  customer_id: z.coerce.number(),
  guest_name: z.string().min(2, { message: "( min 2 characters. )" }).max(30, { message: "Name must not be longer than 30 characters." }),
  phone: z.string().min(11, { message: "( min 11 characters. )" }).max(14, { message: "Phone must not be longer than 14 characters." }),
  email: z.string().email(),
  country_iso: z.string(),
  id_card_type: z.string().nullable(),
  id_card_number: z.string().nullable(),
});
export type ReservationFormValues = z.infer<typeof formSchema>;

const status_labels = reservation_status.enumValues.map((value) => ({ label: value }));
const sources_labels = reservation_sources.enumValues.map((value) => ({ label: value }));

interface Props {
  countries: CountriesListType;
  initialData?: any;
  last_rid: number;
  room_list: { label: number }[];
}

export function ReservationForm({ initialData, countries, last_rid, room_list }: Props) {
  const [customerData, setCustomerData] = useState<Customer[]>(
    initialData
      ? [
          {
            ...initialData,
            id: initialData.customer_id,
            name: initialData.guest_name,
            // created_at: null,
            // updated_at: null,
          },
        ]
      : [],
  );
  const [searchData, setSearchData] = useState<ComboBoxFieldProps["list"]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const defaultValues = initialData || {
    id: last_rid + 1,
    room_id: 101,
    room_rate: 3000,
    check_in: new Date(),
    check_out: new Date(),
    status: "booked" as const,
    source: "other" as const,
    customer_id: 1,
    guest_name: "John Doe",
    phone: `+88017100000${last_rid + 1}`,
    email: `john.doe${last_rid + 1}@example.com`,
    country_iso: "BD",
    id_card_type: null,
    id_card_number: null,
  };

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ReservationFormValues) => {
    try {
      if (initialData) {
        await updateReservation(values);
      } else {
        let new_customer_id = values.customer_id;
        if (params.rid === "new") {
          let customer = {
            ...values,
            id: undefined,
            name: values.guest_name,
          };
          const { insert_return } = await addCustomer(customer);
          new_customer_id = insert_return[0].insertedId;
        }

        let reservation = {
          ...values,
          customer_id: new_customer_id,
        };
        await addReservation(reservation);
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
        </pre>
      ),
    });
  };
  const refreshCustomerData = async () => {
    setCustomerData(await getCustomerByID(form.watch("customer_id")));
  };

  const onSearchViaSelect = async (value: string) => {
    setSearchLoading(true);
    if (value === "phone") setSearchData(await getCustomerPhones());
    if (value === "email") setSearchData(await getCustomerEmails());
    setSearchLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-[1280px] flex-col space-y-8">
        {/* New Customer Form */}
        {params.rid === "new" && (
          <>
            <h2 className="self-start pl-0.5 text-lg font-bold tracking-tight">Customer Info</h2>
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-12">
              <TextInputField form={form} name="guest_name" label="Guest Name" placeholder="Name" />
              <TextInputField form={form} name="phone" label="Phone" placeholder="+8801710000000" />
              <TextInputField form={form} name="email" label="Email" placeholder="name@example.com" />
              <TextInputField form={form} name="id_card_type" label="ID Type" placeholder="Passport, NID" />
              <ComboBoxField form={form} name="country_iso" label="Country" placeholder="Country" list={countries} />
              <TextInputField form={form} name="id_card_number" label="ID No." placeholder="ABCD1234" />
            </div>
            <Separator />
          </>
        )}

        {params.rid != "new" && (
          <>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <h2 className="sm:self-center pl-0.5 text-lg font-bold tracking-tight w-48">Search Customer</h2>
              <div className="flex w-full gap-4">
                <Select onValueChange={onSearchViaSelect}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Search via" />
                  </SelectTrigger>
                  <SelectContent className="pt-2">
                    <SelectGroup className="grid">
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {searchLoading && <PulseLoader size={8} color="#78716c" />}
                {searchData.length >= 1 && !searchLoading && (
                  <ComboBoxField className="w-52" form={form} name="customer_id" placeholder="Search.." list={searchData} onSelect={() => refreshCustomerData()} />
                )}
              </div>
            </div>
          </>
        )}
        {customerData.length > 0 && <GuestInfoCard customer_data={customerData[0]} />}
        <h2 className="self-start pl-0.5 text-lg font-bold tracking-tight">Booking Info</h2>
        <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
          <NumberInputField form={form} name="id" label="RID" placeholder="Reservation ID" disabled={initialData} />
          <ComboBoxField form={form} name="room_id" label="Room" placeholder="Room" list={room_list} />
          <NumberInputField form={form} name="room_rate" label="Rate" placeholder="Rate..." />
        </div>
        <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
          <DateInputField form={form} name="check_in" label="Check In" disabled={(date) => date.getTime() < new Date().getTime() - 14 * 24 * 60 * 60 * 1000} />
          <DateInputField form={form} name="check_out" label="Check Out" disabled={(date) => date < form.getValues("check_in")} />
        </div>
        <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
          <ComboBoxField form={form} name="source" label="Source" placeholder="Source" list={sources_labels} />
          <ComboBoxField form={form} name="status" label="Status" placeholder="Status" list={status_labels} />
        </div>
        <Button className="w-40 self-center" type="submit">
          {initialData ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
