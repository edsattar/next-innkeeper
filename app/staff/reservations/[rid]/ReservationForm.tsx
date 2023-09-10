"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { format } from "date-fns";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { toast } from "@ui/use-toast";

import { ComboBoxField, TextInputField, NumberInputField } from "./CustomFormFields";

import { CountriesListType } from "@/db";
import { reservation_sources, reservation_status } from "@/db/schema";

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

type FormValues = z.infer<typeof formSchema>;

interface Props {
  countries: CountriesListType;
  initialData: any;
  last_rid: number;
  room_list: { id: number }[];
}

export function ReservationForm({ initialData, countries, last_rid, room_list }: Props) {
  const params = useParams();
  const router = useRouter();

  const defaultValues = initialData || {
    id: last_rid + 1,
    // room_id: "",
    // guest_name: "",
    // phone: "",
    // country: "BD",
    room_rate: 3000,
    check_in: new Date(),
  };
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-[1280px] space-y-8">
        <div className="flex justify-between space-x-8 sm:space-x-12">
          <NumberInputField form={form} name="id" label="RID" placeholder="Reservation ID" />
          {/* <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="flex w-[25vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>RID</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input className="min-w-[60px] border-0 bg-secondary dark:bg-black/40" placeholder="Reservation ID" {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="room_id"
            render={({ field }) => (
              <FormItem className="flex w-[25vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>Room</FormLabel>
                  <FormMessage />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="secondary" role="combobox" className={cn(" justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                        {field.value ? field.value : <span>Rooms...</span>}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-h-[120px] w-[25vw] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search" />
                      <CommandList>
                        <CommandEmpty>Not found</CommandEmpty>
                        <CommandGroup>
                          {room_list.map((room) => (
                            <CommandItem
                              value={String(room.id)}
                              key={room.id}
                              onSelect={() => {
                                form.setValue("room_id", room.id);
                              }}
                            >
                              <CheckIcon className={cn("mr-2 h-4 w-4", room.id === field.value ? "opacity-100" : "opacity-0")} />
                              {room.id}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <NumberInputField form={form} name="room_rate" label="Room Rate" placeholder="Rate..." />
          {/* <FormField
            control={form.control}
            name="room_rate"
            render={({ field }) => (
              <FormItem className="flex w-[25vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>Room Rate</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input className="min-w-[60px] border-0 bg-secondary dark:bg-black/40" placeholder="Room Rate" {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}
        </div>

        <div className="flex justify-between space-x-8 sm:space-x-12">
          <FormField
            control={form.control}
            name="check_in"
            render={({ field }) => (
              <FormItem className="flex w-[40vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>Check In</FormLabel>
                  <FormMessage />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="secondary" className={cn("min-w-[160px] border-0 bg-secondary dark:bg-black/40", !field.value && "text-muted-fore dark:text-muted-fore")}>
                        {field.value ? format(field.value, "d MMM yyyy") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-1" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        return date.getTime() < new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="check_out"
            render={({ field }) => (
              <FormItem className="flex w-[40vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>Check Out</FormLabel>
                  <FormMessage />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="secondary" className={cn("min-w-[160px] justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                        {field.value ? format(field.value, "d MMM yyyy") : <span>Pick a Date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-1" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date.getTime() < new Date().getTime() - 7 * 24 * 60 * 60 * 1000}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between space-x-8 sm:space-x-12">
          <ComboBoxField form={form} name="source" label="Source" placeholder="Source" list={reservation_sources_list} />
          {/* <ComboBoxField form={form} name="status" label="Status" placeholder="Status" list={reservation_status.enumValues} /> */}
        </div>
        {/* Customer Form */}
        <TextInputField form={form} name="guest_name" label="Guest Name" placeholder="Name" />
        <TextInputField form={form} name="phone" label="Phone" placeholder="+8801710000000" />
        <TextInputField form={form} name="email" label="Email" placeholder="name@example.com" />
        <TextInputField form={form} name="id_card_type" label="ID Type" placeholder="Passport, NID" />
        <TextInputField form={form} name="id_card_number" label="ID No." placeholder="ABCD1234" />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="ml-1 flex items-center space-x-2">
                <FormLabel>Country</FormLabel>
                <FormMessage />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="secondary" role="combobox" className={cn("w-[240px] justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                      {field.value ? countries.find((item) => item.iso === field.value)?.name : <span>Select a country</span>}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="min-h-[120px] w-[250px] p-0" align="center">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>Not found</CommandEmpty>
                      <CommandGroup>
                        {countries.map((item) => (
                          <CommandItem
                            value={item.name}
                            key={item.iso}
                            onSelect={() => {
                              form.setValue("country", item.iso);
                            }}
                          >
                            <CheckIcon className={cn("mr-2 h-4 w-4", item.iso === field.value ? "opacity-100" : "opacity-0")} />
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
}
