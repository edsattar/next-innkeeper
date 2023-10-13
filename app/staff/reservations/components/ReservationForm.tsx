"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { toast } from "@ui/use-toast";

import { ComboBoxField, NumberInputField, DateInputField, SelectField, SelectGridField } from "@/components/forms/CustomFormFields";
import CustomerFormSection from "./CustomerFormSection";

import { Customer, reservation_sources, reservation_status } from "@/db/schema";

import { addCustomer, addReservation, getCustomerByID, RoomListType, CountriesListType, CustomersInfoType, updateReservation } from "@/actions";
import GuestInfoCard from "@/components/GuestInfoCard";

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
  customer_id: z.coerce.number({
    invalid_type_error: "Required",
  }),
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

export interface ReservationFormProps {
  initial_data?: any;
  customer_data?: Customer;
  next_rid: number;
  countries_list: CountriesListType;
  customers_info: CustomersInfoType;
  room_list: RoomListType;
  status_labels: { status: string }[];
  sources_labels: { source: string }[];
}

// ------------- MAIN COMPONENT --------------
export const ReservationForm = ({ initial_data, customer_data, next_rid, countries_list, customers_info, room_list, status_labels, sources_labels }: ReservationFormProps) => {
  const router = useRouter();
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [customerSearchBy, setCustomerSearchBy] = useState("phone");
  const [customerData, setCustomerData] = useState(customer_data);
  const [isLoading, setIsLoading] = useState(false);

  
  let defaultValues = initial_data || {
    // default reservation data
    id: next_rid,
    check_in: new Date(),
    status: "booked" as const,
  };

  const customer_defaults = {
    guest_name: "John Doe",
    phone: `88017100000${next_rid}`,
    email: `john.doe${next_rid}@example.com`,
    country_iso: "US",
    id_card_type: "Passport",
    id_card_number: "ABCD1234",
  }

  defaultValues = { ...defaultValues, ...customer_defaults };

  type ReservationFormValues = z.infer<typeof formSchema>;
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const updateCustomerData = async (value: string) => {
    // let data = await getCustomerByID(form.watch("customer_id") as number);
    setIsLoading(true);
    let data = await getCustomerByID(parseInt(value));
    setCustomerData(data[0]);
    setIsLoading(false);
  };

  const onSubmit = async (values: ReservationFormValues) => {
    // console.log(values); // Client console
    try {
      if (initial_data) {
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
      router.back();
      // router.push("/staff/reservations");
    } catch (error: any) {
      console.log(error);
      toast({ title: "Something went wrong.", description: error.message });
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-w-[350px] max-w-[1280px] flex-col gap-y-8">
          {/* ------------- BOOKING SECTION -------------- */}
          <div className="flex flex-col gap-y-8">
            {/* Header */}
            <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
              <h2 className="pl-0.5 text-lg font-bold tracking-tight">Booking Section</h2>
              <Button className="w-[100px] self-center" type="submit">
                Submit
              </Button>
            </div>
            {/* Form Row 1  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <NumberInputField className="flex-grow-0" form={form} name="id" label="RID" placeholder="ID" />
              <SelectGridField form={form} name="room_id" label="Room" placeholder="room..." list={room_list} />
              <NumberInputField form={form} name="room_rate" label="Rate" placeholder="Rate..." />
            </div>
            {/* Form Row 2  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <DateInputField form={form} name="check_in" label="Check In" disabled={(date) => date.getTime() < new Date().getTime() - 14 * 24 * 60 * 60 * 1000} />
              <DateInputField form={form} name="check_out" label="Check Out" disabled={(date) => date < form.getValues("check_in")} />
            </div>
            {/* Form Row 3  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <SelectField form={form} name="source" label="Source" placeholder="source..." list={sources_labels} />
              <SelectField form={form} name="status" label="Status" placeholder="select status..." list={status_labels} />
            </div>
          </div>

          {/* ---------- CUSTOMER SECTION ---------- */}
          <>
            <h2 className="pl-0.5 text-lg font-bold tracking-tight">Customer Section</h2>
            <Tabs
              defaultValue="returning_guest"
              onValueChange={async (value) => {
                setIsNewGuest(value === "new_guest");
                if (value === "new_guest") {
                  form.unregister("guest_name");
                  form.unregister("phone");
                  form.unregister("email");
                  form.unregister("country_iso");
                  form.unregister("id_card_type");
                  form.unregister("id_card_number");
                  form.setValue("customer_id", 0);
                  setCustomerData(undefined);
                } else {
                  // returning_guest
                  form.unregister("customer_id");
                  form.setValue("guest_name", "Abcd Efgh");
                  form.setValue("phone", "0000000000000");
                  form.setValue("email", `abcd@example.com`);
                  form.setValue("country_iso", "US");
                  form.setValue("id_card_type", "Passport");
                  form.setValue("id_card_number", "ABCD1234");
                }
              }}
            >
              <TabsList>
                <TabsTrigger value="returning_guest">Returning Guest</TabsTrigger>
                <TabsTrigger value="new_guest">New Guest</TabsTrigger>
              </TabsList>
              <TabsContent value="returning_guest">
                <div className="flex w-full flex-row items-end gap-x-4">
                  <Select onValueChange={(value) => setCustomerSearchBy(value)} defaultValue={customerSearchBy}>
                    <div className="pt-[16px]">
                      <h2 className="px-1 py-1.5 text-sm font-medium tracking-tight">Search by</h2>
                      <SelectTrigger className="w-[100px] border-none">
                        <SelectValue placeholder="Search by.." />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem indicator={false} value="phone">
                        Phone
                      </SelectItem>
                      <SelectItem indicator={false} value="email">
                        Email
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="w-full max-w-[300px]">
                    <ComboBoxField form={form} name="customer_id" placeholder="Search.." list={customers_info} val={customerSearchBy} onSelect={updateCustomerData} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="new_guest">
                <CustomerFormSection {...{ form, countries_list }} />
              </TabsContent>
            </Tabs>
          </>
        </form>
      {!isNewGuest && <GuestInfoCard loading={isLoading} customer_data={customerData} />}
      </Form>
    </>
  );
};
