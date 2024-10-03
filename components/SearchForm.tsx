import Form from "next/form";
import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <Form
      action="/"
      scroll={false}
      className="max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
    >
      <input
        name="query"
        className="flex-1 placeholder:font-bold placeholder:text-black w-full h-auto outline-none"
        placeholder="Search Startup"
      />

      <button
        type="submit"
        className="size-[50px] rounded-full bg-black flex justify-center items-center"
      >
        <Search className="size-[20px] text-white" />
      </button>
    </Form>
  );
};

export default SearchForm;
