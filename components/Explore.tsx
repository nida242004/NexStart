import { Suspense } from "react";

import { IDEAS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

import StartupCard, { Fallback } from "@/components/StartupCard";

const Explore = async () => {
  const { data: posts } = await sanityFetch({ query: IDEAS_QUERY });

  return (
    <>
      <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        <Suspense fallback={<Fallback />}>
          {posts.map((post, index: number) => (
            <StartupCard key={index} post={post} />
          ))}
        </Suspense>
      </ul>
      <SanityLive />
    </>
  );
};

export default Explore;
