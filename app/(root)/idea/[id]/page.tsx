import markdownit from "markdown-it";
import { unstable_after as after } from "next/server";

import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { IDEA_BY_ID_QUERY } from "@/sanity/lib/queries";
import { server } from "@/sanity/lib/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const md = markdownit();

const Fallback = () => {
  return <Skeleton className="bg-zinc-400 px-6 py-3" />;
};

async function Page({ params }: { params: { id: string } }) {
  const post = await client.fetch(IDEA_BY_ID_QUERY, {
    id: params.id,
  });

  const parsedContent = md.render(post?.pitch || "");

  after(async () => {
    console.log("coming in after", params.id, post.views);
    await server
      .patch(params.id)
      .set({ views: post.views + 1 })
      .commit();
  });

  return (
    <>
      <section className="w-full bg-primary min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6">
        <Suspense fallback={<Fallback />}>
          <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before-tri after-tri">
            {/*{formatDate(post._createdAt)}*/}
            {post.views}
          </p>
        </Suspense>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-bold text-white sm:text-[54px] text-[36px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center">
          {post.description}
        </p>
      </section>

      <section className="py-10 px-6 max-w-7xl mx-auto">
        <img
          src={post.image}
          alt="image"
          className="w-full h-auto rounded-xl"
        />

        {parsedContent && (
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <h3 className="font-bold text-[30px]">Pitch Details</h3>
            <article
              className="prose max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Page;
