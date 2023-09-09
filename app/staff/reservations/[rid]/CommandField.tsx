import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  form: any;
  data: string[];
  name: string;
  title: string;
}

const CommandField = ({form, data, name, title}: Props) => {
  return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="ml-1 flex items-center space-x-2">
                <FormLabel>{title}</FormLabel>
                <FormMessage />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="secondary" role="combobox" className={cn("w-[240px] justify-between", !field.value && "text-muted-fore dark:text-muted-fore")}>
                      {field.value ? field.value : <span>Select..</span>}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="min-h-[120px] w-[250px] p-0" align="center">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>Not found</CommandEmpty>
                      <CommandGroup>
                        {data.map((item) => (
                          <CommandItem
                            value={item}
                            key={item}
                            onSelect={() => {
                              form.setValue(title, item);
                            }}
                          >
                            <CheckIcon className={cn("mr-2 h-4 w-4", item === field.value ? "opacity-100" : "opacity-0")} />
                            {item}
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
}
export default CommandField