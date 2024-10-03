import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import markdownit from "markdown-it";
import { notFound } from "next/navigation";

import { formatDate } from "@/lib/utils";

import { client } from "@/sanity/lib/client";
import { IDEA_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";

import View from "@/components/View";
import { Skeleton } from "@/components/ui/skeleton";
import StartupCard, { StartupIdeaType } from "@/components/StartupCard";

const md = markdownit();
export const experimental_ppr = true;

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(IDEA_BY_ID_QUERY, {
      id: id,
    }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="w-full bg-primary min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6">
        <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before-tri after-tri">
          {formatDate(post._createdAt)}
        </p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-bold text-white sm:text-[54px] text-[36px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center">
          {post.description}
        </p>
      </section>

      <section className="py-10 px-6 max-w-7xl mx-auto">
        <Image
          src={post.image}
          alt="image"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <Link href={`/user/${post.author?._id}`}>
            <Image
              src={post.author.image}
              alt="image"
              className="size-16 rounded-full mb-3"
            />
          </Link>
          <h3 className="font-bold text-[30px]">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="tex-sm font-normal text-black-100">
              No details provided
            </p>
          )}
        </div>
        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {editorPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold text-[30px] text-black">Editor Picks</p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartupIdeaType, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <Suspense
        fallback={
          <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
        }
      >
        <View id={id} totalViews={post.views} />
      </Suspense>
    </>
  );
}

export default Page;
