import { Suspense } from "react";

import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { IDEAS_QUERY, SEARCH_QUERY } from "@/sanity/lib/queries";
import StartupCard, { Fallback } from "@/components/StartupCard";
import { Idea } from "@/sanity/types";

const Explore = async ({ query }: { query: string }) => {
  let posts;

  if (query) {
    posts = await client.fetch(SEARCH_QUERY, { search: query.toLowerCase() });
  } else {
    const result = await sanityFetch({ query: IDEAS_QUERY });
    posts = result.data;
  }

  return (
    <>
      <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        <Suspense fallback={<Fallback />}>
          {posts?.length > 0 ? (
            posts.map((post: Idea, index: number) => (
              <StartupCard key={index} post={post} />
            ))
          ) : (
            <p className="text-black-100 text-sm">No results found</p>
          )}
        </Suspense>
      </ul>
      <SanityLive />
    </>
  );
};

export default Explore;
