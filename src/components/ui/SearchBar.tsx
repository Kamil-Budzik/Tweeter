import { Button } from "~/components/ui/Button";

const SearchBar = () => {
  return (
    <form className="flex w-full items-center rounded rounded bg-white p-2">
      <input
        type="text"
        className="flex-grow resize-none py-2 pb-2 outline-none placeholder:font-semibold placeholder:text-[#BDBDBD] md:mx-0"
        placeholder="Search by Author or Content"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;