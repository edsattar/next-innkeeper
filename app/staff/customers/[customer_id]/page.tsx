import { getCustomerByID, get_countries_list } from "@/actions";

interface Props {
  params: { customer_id: string }
}

const Page = async ({ params }: Props) => {
  const id = Number(params.customer_id);
  const data = id ? await getCustomerByID(id) : null;
  const countries_list = await get_countries_list();
  const formProps = {
    initialData: data && data.length > 0 ? data[0] : null,
    countries_list: countries_list,
  };
  return (
    <>
      <div className="flex h-full m-auto max-w-7xl flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{ data  ? "Edit Reservation" : "Create Reservation"}</h2>
          </div>
          Page
        </div>
      </div>
    </>
  );
}
export default Page