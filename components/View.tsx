import { unstable_after as after } from "next/server";

import Ping from "@/components/Ping";
import { server } from "@/sanity/lib/server";
import { client } from "@/sanity/lib/client";
import { IDEA_VIEWS_QUERY } from "@/sanity/lib/queries";
import { formatNumber } from "@/lib/utils";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(IDEA_VIEWS_QUERY, {
      id: id,
    });

  after(async () => {
    await server
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">{formatNumber(totalViews + 1)}</span> views
      </p>
    </div>
  );
};

export default View;
