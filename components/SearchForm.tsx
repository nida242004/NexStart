import Form from "next/form";
import Link from "next/link";
import { X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startup"
      />

      <div className="flex gap-2">
        {query && (
          <Button type="reset" asChild>
            <Link href="/" className="search-btn">
              <X className="size-5 text-white" />
            </Link>
          </Button>
        )}

        <button type="submit" className="search-btn">
          <Search className="size-5 text-white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
