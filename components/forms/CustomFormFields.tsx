import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/command";
import { Input } from "@ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

interface NumberInputFieldProps {
  form: UseFormReturn<any>;
  className?: string;
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

export const NumberInputField = ({
  form,
  className,
  name,
  label,
  placeholder,
  disabled = false,
}: NumberInputFieldProps) => (
  <FormField
    disabled={disabled}
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("flex flex-1 flex-col", className)}>
        <div className="ml-1 flex items-center space-x-2">
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </div>
        <FormControl>
          <Input
            className="min-w-[64px] border-0 bg-secondary disabled:cursor-default dark:bg-black/40"
            placeholder={placeholder}
            {...field}
          />
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
export const TextInputField = ({
  form,
  name,
  label,
  placeholder,
}: TextInputFieldProps) => (
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

export interface ComboBoxFieldProps {
  form: UseFormReturn<any>;
  name: string;
  val?: string;
  label?: string;
  placeholder: string;
  list: {
    [key: string]: string | number;
  }[];
  className?: string;
  onSelect?: (value: string) => any;
}

export const ComboBoxField = ({
  form,
  name,
  val,
  label,
  placeholder,
  list,
  onSelect = () => {},
  className,
}: ComboBoxFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<string | number>();

  useEffect(() => {
    if (val) {
      const item = list.find((item) => item[name] === form.getValues(name));
      setSelectedValue(item ? item[val] : placeholder);
    } else {
      setSelectedValue(form.getValues(name) || placeholder);
    }
  }, [form, list, name, placeholder, val]);

  const isSelected = (
    item: { [key: string]: string | number },
    value: string,
  ) => {
    if (value) {
      return value === item[name];
    }
    return false;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex w-full flex-1 flex-col ", className)}>
          <div className="ml-1 flex items-center space-x-2">
            {label && <FormLabel>{label}</FormLabel>}
            <FormMessage />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="secondary"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-fore dark:text-muted-fore",
                  )}
                >
                  <span className="-mr-[10px] max-w-[150px]  overflow-hidden text-ellipsis sm:max-w-none">
                    {selectedValue}
                  </span>
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Command>
                <CommandInput placeholder="Search" />
                <CommandList className="h-40">
                  <CommandEmpty>No Match</CommandEmpty>
                  <CommandGroup>
                    {list.map((item, index) => (
                      <CommandItem
                        className={cn(
                          "",
                          field.value === item[name] &&
                            "bg-secondary dark:bg-secondary-dark/50",
                        )}
                        key={index}
                        // value={String(item[val || name])}
                        value={String(item[name])}
                        onSelect={(value) => {
                          form.clearErrors(name);
                          form.setValue(name, item[name]);
                          setSelectedValue(item[val || name]);
                          onSelect(value);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4 opacity-0",
                            isSelected(item, field.value) && "opacity-100",
                          )}
                        />
                        {item[val || name]}
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

export const DateInputField = ({
  className,
  form,
  name,
  label,
  disabled,
  placeholder = "Pick a date",
}: DateInputFieldProps) => (
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
              <Button
                variant="secondary"
                className={cn(
                  "min-w-[140px] border-0 bg-secondary dark:bg-black/40",
                  !field.value && "text-muted-fore dark:text-muted-fore",
                )}
              >
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

interface SelectFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  list: {
    [key: string]: string | number;
  }[];
  className?: string;
}
export const SelectField = ({
  form,
  name,
  label,
  placeholder,
  list,
  className,
}: SelectFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("flex w-full flex-1 flex-col ")}>
        <div className="ml-1 flex items-center space-x-2">
          {label && <FormLabel>{label}</FormLabel>}
          <FormMessage />
        </div>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger
              className={cn(
                !field.value && "text-muted-fore dark:text-muted-fore",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <div className={cn(className)}>
              {list.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item[name] as string}
                  className={
                    field.value === item[name]
                      ? "bg-secondary dark:bg-secondary-dark/50"
                      : ""
                  }
                >
                  {item[name]}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);

interface SelectGridFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  list: {
    [key: string]: string | number;
  }[];
  className?: string;
}
export const SelectGridField = ({
  form,
  name,
  label,
  placeholder,
  list,
  className,
}: SelectGridFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("flex w-full flex-1 flex-col ")}>
        <div className="ml-1 flex items-center space-x-2">
          {label && <FormLabel>{label}</FormLabel>}
          <FormMessage />
        </div>
        <Select onValueChange={field.onChange} defaultValue={field.value && String(field.value)}>
          <FormControl>
            <SelectTrigger
              className={cn(
                !field.value && "text-muted-fore dark:text-muted-fore",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent
           className="w-[172px] md:w-[332px]"
           >
            <div className="grid w-40 grid-cols-4 gap-1 md:w-80 md:grid-cols-8">
              {list.map((item, index) => (
                <SelectItem
                  indicator={false}
                  key={index}
                  value={String(item[name])}
                  className={cn(
                    "w-10",
                    field.value === String(item[name]) &&
                      "bg-secondary dark:bg-secondary-dark/50",
                      item[name] as number % 100 === 1 && "col-start-1",
                  )}
                >
                  {item[name]}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);
