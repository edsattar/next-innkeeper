import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

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
    label: string;
  }[];
}
export const ComboBoxField = ({ form, name, label, placeholder, list }: ComboBoxFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex w-[40vw] flex-col">
        <div className="ml-1 flex items-center space-x-2">
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="secondary" role="combobox" className={cn("justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                {field.value ? String(field.value) : placeholder}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="min-h-[120px] w-[40vw] p-0" align="center">
            <Command>
              <CommandInput placeholder="Search" />
              <CommandList>
                <CommandEmpty>No Match</CommandEmpty>
                <CommandGroup>
                  {list.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item.label}
                      onSelect={() => {
                        form.setValue(name, item.id ? item.id : item.label);
                      }}
                    >
                      <CheckIcon className={cn("mr-2 h-4 w-4", item.id === field.value ? "opacity-100" : "opacity-0")} />
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
