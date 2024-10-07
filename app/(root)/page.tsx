import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SEARCH_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 0;

async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [searchParams: string]: string }>;
}) {
  const query = (await searchParams).query as string;

  let posts;
  if (query) {
    posts = await client.fetch(SEARCH_QUERY, { search: query.toLowerCase() });
  } else {
    const result = await sanityFetch({ query: STARTUPS_QUERY });
    posts = result.data;
  }

  return (
    <>
      <section className="pink_container">
        <p className="tag">Pitch, Vote and Grow</p>

        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={index} post={post} />
            ))
          ) : (
            <p className="no-result">No results found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

export default Home;
