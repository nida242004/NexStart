import Form from "next/form";
import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        className="search-input"
        placeholder="Search Startup"
      />

      <button type="submit" className="search-btn">
        <Search className="size-5 text-white" />
      </button>
    </Form>
  );
};

export default SearchForm;
