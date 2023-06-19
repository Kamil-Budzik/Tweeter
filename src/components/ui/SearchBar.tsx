import { Button } from "~/components/ui/Button";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  search: string;
};

interface Props {
  handler: (v: string) => void;
}

const SearchBar = ({ handler }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ search }) => {
    handler(search);
    console.log(search);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center rounded rounded bg-white p-2"
    >
      <input
        type="text"
        className="flex-grow resize-none py-2 pb-2 outline-none placeholder:font-semibold placeholder:text-[#BDBDBD] md:mx-0"
        placeholder="Search by Content"
        {...register("search")}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;