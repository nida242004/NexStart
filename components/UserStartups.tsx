import { client } from "@/sanity/lib/client";
import { IDEAS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";

import StartupCard, { StartupIdeaType } from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const posts = await client.fetch(IDEAS_BY_AUTHOR_QUERY, { id: id });

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: StartupIdeaType) => (
          <StartupCard key={post._id} post={post} />
        ))
      ) : (
        <p className="font-semibold text-black-100">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
