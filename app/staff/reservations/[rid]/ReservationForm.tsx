"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
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

import CommandField from "./CommandField";

import { CountriesListType } from "@/db";
import { reservation_sources, reservation_status } from "@/db/schema";

const formSchema = z.object({
  id: z.coerce.number().positive(),
  room_id: z.coerce.number().positive(),
  guest_name: z.string().min(2, { message: "( min 2 characters. )" }).max(30, { message: "Name must not be longer than 30 characters." }).nullable(),
  country: z.string().nullable(),
  room_rate: z.coerce.number(),
  check_in: z.date(),
  check_out: z.date(),
  status: z.enum(reservation_status.enumValues),
  source: z.enum(reservation_sources.enumValues),
});

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
        await axios.patch(`/api/reservation/${params.rid}`, values);
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
          <p>{values.check_in.toISOString()}</p>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-[1280px] space-y-8">
        <div className="relative flex justify-between space-x-8 sm:space-x-12">
          <FormField
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
          />
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
          <FormField
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
          />
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
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem className="flex w-[40vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>Source</FormLabel>
                  <FormMessage />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="secondary" role="combobox" className={cn("justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                        {field.value ? field.value : <span>Sources...</span>}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-h-[120px] w-[40vw] p-0" align="center">
                    <Command>
                      <CommandInput placeholder="Search" />
                      <CommandList>
                        <CommandEmpty>Not found</CommandEmpty>
                        <CommandGroup>
                          {reservation_sources.enumValues.map((e) => (
                            <CommandItem
                              value={String(e)}
                              key={e}
                              onSelect={() => {
                                form.setValue("source", e);
                              }}
                            >
                              <CheckIcon className={cn("mr-2 h-4 w-4", e === field.value ? "opacity-100" : "opacity-0")} />
                              {e}
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
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex w-[40vw] flex-col">
                <div className="ml-1 flex items-center space-x-2">
                  <FormLabel>Status</FormLabel>
                  <FormMessage />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="secondary" role="combobox" className={cn("justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                        {field.value ? field.value : <span>Status...</span>}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-h-[120px] w-[40vw] p-0" align="center">
                    <Command>
                      <CommandInput placeholder="Search" />
                      <CommandList>
                        <CommandEmpty>Not found</CommandEmpty>
                        <CommandGroup>
                          {reservation_status.enumValues.map((e) => (
                            <CommandItem
                              value={String(e)}
                              key={e}
                              onSelect={() => {
                                form.setValue("status", e);
                              }}
                            >
                              <CheckIcon className={cn("mr-2 h-4 w-4", e === field.value ? "opacity-100" : "opacity-0")} />
                              {e}
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
        </div>
        <FormField
          control={form.control}
          name="guest_name"
          render={({ field }) => (
            <FormItem>
              <div className="ml-1 flex items-center space-x-2">
                <FormLabel>Guest Name</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="border-0 bg-secondary dark:bg-black/40"
                  placeholder="Name"
                  {...field}
                  value={field.value || ""} // fix for zod error
                />
              </FormControl>
            </FormItem>
          )}
        />
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
                      {field.value ? countries.find((country) => country.iso === field.value)?.name : <span>Select a country</span>}
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
                        {countries.map((country) => (
                          <CommandItem
                            value={country.name}
                            key={country.iso}
                            onSelect={() => {
                              form.setValue("country", country.iso);
                            }}
                          >
                            <CheckIcon className={cn("mr-2 h-4 w-4", country.iso === field.value ? "opacity-100" : "opacity-0")} />
                            {country.name}
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
