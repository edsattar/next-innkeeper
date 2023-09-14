import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { number } from "zod";

import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@ui/command";
import { Input } from "@ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { is } from "drizzle-orm";

interface NumberInputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
}

export const NumberInputField = ({ form, name, label, placeholder }: NumberInputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex w-[25vw] flex-col">
        <div className="ml-1 flex items-center space-x-2">
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </div>
        <FormControl>
          <Input className="min-w-[60px] border-0 bg-secondary dark:bg-black/40" placeholder={placeholder} {...field} />
        </FormControl>
      </FormItem>
    )}
  />
);

interface TextInputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
}
export const TextInputField = ({ form, name, label, placeholder }: TextInputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className="ml-1 flex items-center space-x-2">
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </div>
        <FormControl>
          <Input
            className="border-0 bg-secondary dark:bg-black/40"
            placeholder={placeholder}
            {...field}
            value={field.value as string} // fix for zod error
          />
        </FormControl>
      </FormItem>
    )}
  />
);

interface ComboBoxFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  list: {
    id?: string;
    label: string | number;
  }[];
}
export const ComboBoxField = ({ form, name, label, placeholder, list }: ComboBoxFieldProps) => {
  const isSelected = (item: (typeof list)[0], value: string) => {
    if (value) {
      return value === item.id || value === item.label;
    }
    return false;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <div className="ml-1 flex items-center space-x-2">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="secondary" role="combobox" className={cn("justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                  {field.value ? (list[0].id ? list.find((item) => item.id === field.value)?.label : field.value) : placeholder}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="min-h-[120px] w-[40vw] max-w-[288px]" align="start">
              <Command>
                <CommandInput placeholder="Search" />
                <CommandList>
                  <CommandEmpty>No Match</CommandEmpty>
                  <CommandGroup>
                    {list.map((item, index) => (
                      <CommandItem
                        className={isSelected(item, field.value) ? "bg-secondary" : ""}
                        key={index}
                        value={String(item.label)}
                        onSelect={() => {
                          form.setValue(name, item.id ? item.id : item.label);
                        }}
                      >
                        <CheckIcon className={cn("mr-2 h-4 w-4 opacity-0", isSelected(item, field.value) && "opacity-100")} />
                        {item.label}
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
  );
};

interface DateInputFieldProps {
  className?: string;
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  disabled: (date: Date) => boolean;
}

export const DateInputField = ({ className, form, name, label, disabled, placeholder = "Pick a date" }: DateInputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("flex w-[50vw] flex-col", className)}>
        <div className="ml-1 flex items-center space-x-2">
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="secondary" className={cn("min-w-[160px] border-0 bg-secondary dark:bg-black/40", !field.value && "text-muted-fore dark:text-muted-fore")}>
                {field.value ? format(field.value, "d MMM yyyy") : placeholder}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              // disabled={(date) => date.getTime() < new Date().getTime() - 7 * 24 * 60 * 60 * 1000}
              disabled={(date) => disabled(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormItem>
    )}
  />
);
