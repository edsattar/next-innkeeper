"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PulseLoader from "react-spinners/PulseLoader";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { toast } from "@ui/use-toast";
import { ComboBoxField, ComboBoxFieldProps, NumberInputField, DateInputField } from "@/components/forms/CustomFormFields";

import {
  CountriesListType,
  CustomerPhonesType,
  CustomersInfoType,
  addCustomer,
  addReservation,
  deleteReservation,
  getCustomerByID,
  get_customer_emails,
  get_customer_phones,
  updateReservation,
} from "@/actions";
import { Customer, reservation_sources, reservation_status } from "@/db/schema";
import GuestInfoCard from "./GuestInfoCard";
import { useState } from "react";
import CustomerForm from "@/components/forms/CustomerForm";
import { TrashIcon } from "lucide-react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const formSchema = z.object({
  // Reservation
  id: z.coerce.number().positive(),
  room_id: z.coerce
    .number({
      invalid_type_error: "Required",
    })
    .positive(),
  room_rate: z.coerce
    .number({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .positive({ message: "Invalid" }),
  check_in: z.date(),
  check_out: z.date(),
  status: z.enum(reservation_status.enumValues),
  source: z.enum(reservation_sources.enumValues),
  customer_id: z.coerce.number().optional(),

  // Customer
  guest_name: z
    .string()
    .min(2, { message: "( min 2 letters )" })
    .regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*\s?$/, { message: "Invalid" })
    .max(30, { message: "( max 30 letters )" }),
  phone: z.string().regex(/^\d*$/, { message: "Invalid phone number format" }).min(11, { message: "( min 11 digits )" }).max(14, { message: "( max 14 digits )" }),
  email: z.string().email(),
  country_iso: z.string(),
  id_card_type: z.string().nullable(),
  id_card_number: z.string().nullable(),
});
export type ReservationFormValues = z.infer<typeof formSchema>;

const status_labels = reservation_status.enumValues.map((value) => ({ status: value }));
const sources_labels = reservation_sources.enumValues.map((value) => ({ source: value }));

interface Props {
  countries_list: CountriesListType;
  initialData?: any;
  next_rid: number;
  room_list: { room_id: number }[];
  customer_phones: CustomerPhonesType;
  customers_info: CustomersInfoType;
}

export function ReservationForm({ countries_list, customers_info, initialData, next_rid, room_list }: Props) {
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [customerData, setCustomerData] = useState<Customer>(
    initialData
      ? {
          ...initialData,
          id: initialData.customer_id,
          name: initialData.guest_name,
        }
      : null,
  );

  const params = useParams();
  const router = useRouter();

  // TODO: Some of the default values
  // can be removed for production
  let defaultValues = initialData || {
    id: next_rid,
    room_id: 101,
    room_rate: 3000,
    check_in: new Date(),
    check_out: new Date(),
    status: "booked" as const,
    source: "other" as const,
    // customer_id: 1,
    guest_name: "John Doe",
    phone: `88017100000${next_rid}`,
    email: `john.doe${next_rid}@example.com`,
    country_iso: "US",
    id_card_type: "Passport",
    id_card_number: "ABCD1234",
  };

  if (params.rid === "new") {
    defaultValues = {
      id: next_rid + 1,
      check_in: new Date(),
      status: "booked" as const,
      // customer_id: 1,
    };
  }

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ReservationFormValues) => {
    console.log(values); // Client console
    try {
      if (initialData) {
        await updateReservation(values);
      } else {
        let new_customer_id = values.customer_id;
        if (isNewGuest) {
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

  const getCustomerData = async () => {
    let data = await getCustomerByID(form.watch("customer_id") as number);
    setCustomerData(data[0]);
  };

  const onDelete = async () => {
    try {
      await deleteReservation(initialData.id);
      router.refresh();
      router.push("/staff/reservations");
    } catch (error: any) {
      toast({ title: "Something went wrong.", description: error.message });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-w-[350px] max-w-[1280px] flex-col gap-y-8">
          {/* ---------- CUSTOMER SECTION ---------- */}
          <Tabs
            defaultValue="returning_guest"
            onValueChange={async (value) => {
              setIsNewGuest(value === "new_guest");
            }}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="returning_guest">Returning Guest</TabsTrigger>
              <TabsTrigger value="new_guest">New Guest</TabsTrigger>
            </TabsList>
            <TabsContent value="new_guest">
              <CustomerForm {...{ form, countries_list }} />
            </TabsContent>
            <TabsContent value="returning_guest">
              <>
                <div className="flex flex-col items-start justify-start gap-4 sm:flex-row">
                  <h2 className="my-auto min-w-[150px] pl-0.5 text-lg font-bold tracking-tight">Search Customer</h2>
                  <div className="flex w-full items-center gap-4">
                    <Tabs defaultValue="phone" className="flex flex-row items-end gap-4 mb-2 w-full">
                      <TabsList>
                        <TabsTrigger value="phone">Phone</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                      </TabsList>
                      <TabsContent value="phone" className="w-full max-w-[300px]">
                        <ComboBoxField form={form} name="customer_id" placeholder="Search.." list={customers_info} val="phone" onSelect={getCustomerData} />
                      </TabsContent>
                      <TabsContent value="email" className="w-full max-w-[300px]">
                        <ComboBoxField form={form} name="customer_id" placeholder="Search.." list={customers_info} val="email" onSelect={getCustomerData} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                <div className="pt-4">{customerData && <GuestInfoCard customer_data={customerData} />}</div>
              </>
            </TabsContent>
          </Tabs>
          {/* ------------- BOOKING INFO SECTION -------------- */}
          <div className="flex flex-col gap-y-8">
            {/* Header */}
            <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
              <h2 className="pl-0.5 text-lg font-bold tracking-tight">Booking Info</h2>
              {params.rid === "new" || params.rid === "old" ? (
                <Button className="w-[100px] self-center" type="submit">
                  Create
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button className="w-[100px] self-center" type="submit">
                    Update
                  </Button>
                  <DeleteConfirmDialog onConfirm={onDelete}>
                    <Button variant="destructive" className="w-[48px] sm:w-[100px]">
                      <span className="hidden sm:inline">Delete</span>
                      <TrashIcon width={20} className="sm:hidden" />
                    </Button>
                  </DeleteConfirmDialog>
                </div>
              )}
            </div>
            {/* Form Row 1  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <NumberInputField form={form} name="id" label="RID" placeholder="Reservation ID" disabled={initialData} />
              <ComboBoxField form={form} name="room_id" label="Room" placeholder="Room" list={room_list} />
              <NumberInputField form={form} name="room_rate" label="Rate" placeholder="Rate..." />
            </div>
            {/* Form Row 3  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <DateInputField form={form} name="check_in" label="Check In" disabled={(date) => date.getTime() < new Date().getTime() - 14 * 24 * 60 * 60 * 1000} />
              <DateInputField form={form} name="check_out" label="Check Out" disabled={(date) => date < form.getValues("check_in")} />
            </div>
            {/* Form Row 3  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <ComboBoxField form={form} name="source" label="Source" placeholder="Source" list={sources_labels} />
              <ComboBoxField form={form} name="status" label="Status" placeholder="Status" list={status_labels} />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
