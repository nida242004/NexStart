import { Suspense } from "react";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { IDEAS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";

import UserCard from "@/components/UserCard";
import StartupCard from "@/components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Idea } from "@/sanity/types";

export const experimental_ppr = true;

async function Page({ params }: { params: { id: string } }) {
  const session = auth();

  const posts = await client.fetch(IDEAS_BY_AUTHOR_QUERY, {
    id: params.id,
  });

  return (
    <>
      <section className="w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10">
        <UserCard id={params.id} />

        <Suspense fallback={<p>Loading...</p>}>
          <ul className="flex-1 grid sm:grid-cols-2 gap-5">
            {posts.length > 0 ? (
              <Suspense
                fallback={<Skeleton className="bg-zinc-400 w-full h-72" />}
              >
                {posts.map((post: Idea) => (
                  <StartupCard key={post._id} post={post} />
                ))}
              </Suspense>
            ) : (
              <p className="font-semibold text-black-100">No posts yet</p>
            )}
          </ul>
        </Suspense>
      </section>
    </>
  );
}

export default Page;
