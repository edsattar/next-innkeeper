"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { toast } from "@ui/use-toast";
import {
  ComboBoxField,
  NumberInputField,
  DateInputField,
  SelectField,
  SelectGridField,
} from "@/components/forms/CustomFormFields";

import {
  CountriesListType,
  CustomerPhonesType,
  CustomersInfoType,
  addCustomer,
  addReservation,
  deleteReservation,
  getCustomerByID,
  updateReservation,
} from "@/actions";
import { Customer, reservation_sources, reservation_status } from "@/db/schema";
import { useState } from "react";
import CustomerForm from "@/components/forms/CustomerForm";
import { TrashIcon } from "lucide-react";
import DeleteConfirmDialog from "../../../../../components/DeleteConfirmDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingInfoCard from "../../../../../components/BookingInfoCard";
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
  phone: z
    .string()
    .regex(/^\d*$/, { message: "Invalid phone number format" })
    .min(11, { message: "( min 11 digits )" })
    .max(14, { message: "( max 14 digits )" }),
  email: z.string().email(),
  country_iso: z.string(),
  id_card_type: z.string().nullable(),
  id_card_number: z.string().nullable(),
});
export type ReservationFormValues = z.infer<typeof formSchema>;

const status_labels = reservation_status.enumValues.map((value) => ({
  status: value,
}));
const sources_labels = reservation_sources.enumValues.map((value) => ({
  source: value,
}));

interface Props {
  countries_list: CountriesListType;
  initialData?: any;
  next_rid: number;
  room_list: { room_id: number }[];
  customers_info: CustomersInfoType;
}

// ------------- MAIN COMPONENT --------------
// -------------------------------------------
export function ReservationForm({
  countries_list,
  customers_info,
  initialData,
  next_rid,
  room_list,
}: Props) {
  const params = useParams();
  const router = useRouter();

  const [isNewGuest, setIsNewGuest] = useState(false);
  const [customerSearchBy, setCustomerSearchBy] = useState<"phone" | "email">(
    "phone",
  );
  const [customerData, setCustomerData] = useState<Customer | null>(
    initialData
      ? {
          ...initialData,
          id: initialData.customer_id,
          name: initialData.guest_name,
        }
      : null,
  );

  let defaultValues = initialData || {
    id: next_rid,
    room_id: 101,
    check_in: new Date(),
    status: "booked" as const,
    guest_name: "John Doe",
    phone: `88017100000${next_rid}`,
    email: `john.doe${next_rid}@example.com`,
    country_iso: "US",
    id_card_type: "Passport",
    id_card_number: "ABCD1234",
  };

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-w-[350px] max-w-[1280px] flex-col gap-y-8"
        >
          {/* ------------- BOOKING INFO SECTION -------------- */}
          <div className="flex flex-col gap-y-8">
            {/* Header */}
            <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
              <h2 className="pl-0.5 text-lg font-bold tracking-tight">
                Booking Info
              </h2>
              {params.rid === "new" || params.rid === "old" ? (
                <Button className="w-[100px] self-center" type="submit">
                  Create
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button className="w-[100px] self-center" type="submit">
                    Update
                  </Button>
                </div>
              )}
            </div>
            {/* Form Row 1  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <NumberInputField
                className="flex-grow-0"
                form={form}
                name="id"
                label="RID"
                placeholder="ID"
              />
              <SelectGridField
                form={form}
                name="room_id"
                label="Room"
                placeholder="room..."
                list={room_list}
              />
              <NumberInputField
                form={form}
                name="room_rate"
                label="Rate"
                placeholder="Rate..."
              />
            </div>
            {/* Form Row 3  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <DateInputField
                form={form}
                name="check_in"
                label="Check In"
                disabled={(date) =>
                  date.getTime() <
                  new Date().getTime() - 14 * 24 * 60 * 60 * 1000
                }
              />
              <DateInputField
                form={form}
                name="check_out"
                label="Check Out"
                disabled={(date) => date < form.getValues("check_in")}
              />
            </div>
            {/* Form Row 3  */}
            <div className="flex w-full justify-between gap-x-8 sm:gap-x-12">
              <SelectField
                form={form}
                name="source"
                label="Source"
                placeholder="source..."
                list={sources_labels}
              />
              <SelectField
                form={form}
                name="status"
                label="Status"
                placeholder="select status..."
                list={status_labels}
              />
            </div>
          </div>

          {/* ---------- CUSTOMER SECTION ---------- */}

          {params.rid === "new" && (
            <>
              <h2 className="pl-0.5 text-lg font-bold tracking-tight">
                Customer Info
              </h2>
              <Tabs
                defaultValue="returning_guest"
                onValueChange={async (value) => {
                  if (value === "new_guest") {
                    form.unregister("guest_name");
                    form.unregister("phone");
                    form.unregister("email");
                    form.unregister("country_iso");
                    form.unregister("id_card_type");
                    form.unregister("id_card_number");
                    form.setValue("customer_id", 0);
                    setCustomerData(null);
                  } else {
                    form.unregister("customer_id");
                    form.setValue("guest_name", "Abcd Efgh");
                    form.setValue("phone", "0000000000000");
                    form.setValue("email", `abcd@example.com`);
                    form.setValue("country_iso", "US");
                    form.setValue("id_card_type", "Passport");
                    form.setValue("id_card_number", "ABCD1234");
                  }

                  setIsNewGuest(value === "new_guest");
                }}
              >
                <TabsList>
                  <TabsTrigger value="returning_guest">
                    Returning Guest
                  </TabsTrigger>
                  <TabsTrigger value="new_guest">New Guest</TabsTrigger>
                </TabsList>
                <TabsContent value="returning_guest">
                  <div className="flex w-full flex-row items-end gap-x-4">
                    <Select
                      onValueChange={(value) =>
                        setCustomerSearchBy(value as "phone" | "email")
                      }
                      defaultValue={customerSearchBy}
                    >
                      <div className="pt-[16px]">
                        <h2 className="px-1 py-1.5 text-sm font-medium tracking-tight">
                          Search by
                        </h2>
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
                      <ComboBoxField
                        form={form}
                        name="customer_id"
                        placeholder="Search.."
                        list={customers_info}
                        val={customerSearchBy}
                        onSelect={getCustomerData}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="new_guest">
                  <CustomerForm {...{ form, countries_list }} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </form>
      </Form>
      {initialData && <BookingInfoCard booking_data={initialData} />}
      {customerData && <GuestInfoCard customer_data={customerData} />}
    </>
  );
}
