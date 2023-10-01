import { TextInputField, ComboBoxField } from "@/components/forms/CustomFormFields";
import { CountriesListType } from "@/actions";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "@ui/separator";

interface Props {
  form: UseFormReturn<any>;
  countries_list: CountriesListType;
}

const CustomerForm = ({ form, countries_list }: Props) => {
  return (
    <>
        <h2 className="mt-[22px] w-[200px] pl-0.5 text-lg font-bold tracking-tight">Customer Info</h2>
      <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8 pt-8 sm:gap-x-12">
        <TextInputField form={form} name="guest_name" label="Guest Name" placeholder="Name" />
        <TextInputField form={form} name="phone" label="Phone" placeholder="8801710000000" />
        <TextInputField form={form} name="email" label="Email" placeholder="name@example.com" />
        <ComboBoxField form={form} name="country_iso" label="Country" placeholder="Country" list={countries_list} val="name" />
        <TextInputField form={form} name="id_card_type" label="ID Type" placeholder="Passport, NID" />
        <TextInputField form={form} name="id_card_number" label="ID No." placeholder="ABCD1234" />
      </div>
    </>
  );
};
export default CustomerForm;
