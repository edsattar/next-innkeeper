"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PulseLoader from "react-spinners/PulseLoader";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { toast } from "@ui/use-toast";
import { ComboBoxField, ComboBoxFieldProps, TextInputField, NumberInputField, DateInputField } from "@/components/forms/CustomFormFields";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CountriesListType, addCustomer, addReservation, deleteReservation, getCustomerByID, getCustomerEmails, getCustomerPhones, updateReservation } from "@/actions";
import { Customer, reservation_sources, reservation_status } from "@/db/schema";
import GuestInfoCard from "./GuestInfoCard";
import { useState } from "react";
import CustomerForm from "@/components/forms/CustomerForm";
import { TrashIcon } from "lucide-react";

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
      invalid_type_error: "Input a positive number.",
    })
    .positive({ message: "Input a positive number." }),
  check_in: z.date(),
  check_out: z.date(),
  status: z.enum(reservation_status.enumValues),
  source: z.enum(reservation_sources.enumValues),
  customer_id: z.coerce.number(),

  // Customer
  guest_name: z
    .string()
    .min(2, { message: "( min 2 letters )" })
    .regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*\s?$/, { message: "Invalid" })
    .max(30, { message: "( max 30 letters )" }),
  phone: z
    .string()
    // .regex(/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/, { message: "Invalid phone number format" })
    .regex(/^\d*$/, { message: "Invalid phone number format" })
    .min(11, { message: "( min 11 digits )" })
    .max(14, { message: "( max 14 digits )" }),
  email: z.string().email(),
  country_iso: z.string(),
  id_card_type: z.string().nullable(),
  id_card_number: z.string().nullable(),
});
export type ReservationFormValues = z.infer<typeof formSchema>;

const status_labels = reservation_status.enumValues.map((value) => ({ label: value }));
const sources_labels = reservation_sources.enumValues.map((value) => ({ label: value }));

interface Props {
  countries_list: CountriesListType;
  initialData?: any;
  last_rid: number;
  room_list: { label: number }[];
}

export function ReservationForm({ countries_list, initialData, last_rid, room_list }: Props) {
  const [customerData, setCustomerData] = useState<Customer[]>(
    initialData
      ? [
          {
            ...initialData,
            id: initialData.customer_id,
            name: initialData.guest_name,
          },
        ]
      : [],
  );
  const [searchData, setSearchData] = useState<ComboBoxFieldProps["list"]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const params = useParams();
  const router = useRouter();



  // TODO: Some of the default values
  // can be removed for production
  let defaultValues = initialData || {
    id: last_rid + 1,
    room_id: 101,
    room_rate: 3000,
    check_in: new Date(),
    check_out: new Date(),
    status: "booked" as const,
    source: "other" as const,
    // customer_id: 1,
    guest_name: "John Doe",
    phone: `88017100000${last_rid + 1}`,
    email: `john.doe${last_rid + 1}@example.com`,
    country_iso: "BD",
    id_card_type: "Passport",
    id_card_number: "ABCD1234",
  };
  if (params.rid === "new") {
    defaultValues = {
      id: last_rid + 1,
      check_in: new Date(),
      status: "booked" as const,
      customer_id: 1,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-[1280px] flex-col space-y-8">
        {params.rid === "new" && <CustomerForm {...{ form, countries_list }} />}

        {/* ---------- EXISTING CUSTOMER SEARCH ---------- */}
        {params.rid == "old" && (
          <>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <h2 className="w-48 pl-0.5 text-lg font-bold tracking-tight sm:self-center">Search Customer</h2>
              <div className="flex w-full items-center gap-4">
                <Tabs onValueChange={onSearchViaSelect}>
                  <TabsList>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                  </TabsList>
                </Tabs>
                {searchLoading && <PulseLoader size={8} color="#78716c" />}
                {searchData.length >= 1 && !searchLoading && (
                  <ComboBoxField className="w-52" form={form} name="customer_id" placeholder="Search.." list={searchData} onSelect={() => refreshCustomerData()} />
                )}
              </div>
            </div>
          </>
        )}
        {customerData.length > 0 && <GuestInfoCard customer_data={customerData[0]} />}

        {/* ----------------------------------- BOOKING INFO SECTION ----------------------------------- */}
        <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
          <h2 className="pl-0.5 text-lg font-bold tracking-tight">Booking Info</h2>
          {isNaN(params.rid as any) ? (
            <Button className="w-[120px] self-center" type="submit">
              Create
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button className="w-[120px] self-center" type="submit">
                Update
              </Button>
              <Button variant={"destructive"} size={"icon"} onClick={onDelete} type="button">
                <TrashIcon height={20} />
              </Button>
            </div>
          )}
        </div>
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
        {/* <Button className="w-44 self-center" type="submit">
            {initialData ? "Update Reservation" : "Create Reservation"}
          </Button> */}
      </form>
    </Form>
  );
}
