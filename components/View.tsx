// import { unstable_after as after } from "next/server";

import Ping from "@/components/Ping";
import { server } from "@/sanity/lib/server";

const View = async ({ id, totalViews }: { id: string; totalViews: number }) => {
  // after(async () => {
  //   console.log("coming in after", id, totalViews);
  //   await server
  //     .patch(id)
  //     .set({ views: totalViews + 1 })
  //     .commit();
  // });

  await server
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">{totalViews + 1}</span> views
      </p>
    </div>
  );
};

export default View;
