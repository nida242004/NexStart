import { Idea } from "@/sanity/types";

import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { IDEAS_QUERY, SEARCH_QUERY } from "@/sanity/lib/queries";

async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).query as string;

  let posts;
  if (query) {
    posts = await client.fetch(SEARCH_QUERY, { search: query.toLowerCase() });
  } else {
    const result = await sanityFetch({ query: IDEAS_QUERY });
    posts = result.data;
  }

  return (
    <>
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before-tri after-tri">
          Pitch, Vote and Grow
        </p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-bold text-white sm:text-[54px] text-[36px] max-w-5xl text-center my-5">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-center">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm />
      </section>

      <section className="px-5 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[30px] text-black">Explore Startups</p>

        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: Idea, index: number) => (
              <StartupCard key={index} post={post} />
            ))
          ) : (
            <p className="text-black-100 text-sm">No results found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

export default Home;
