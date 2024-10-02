import { Bookmark } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const StartupCard = ({ post }) => {
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5  rounded-[22px] shadow-200">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">
          {formatDate(post._createdAt)}
        </p>
        <Bookmark className="size-[23px] text-black" />
      </div>

      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <p className="font-medium text-[16px] line-clamp-1">
            {post.author.name}
          </p>
          <h3 className="font-semibold text-[26px] line-clamp-1">
            {post.title}
          </h3>
        </div>

        <img
          src={post.author.image}
          alt="placeholder"
          className="size-12 rounded-full"
        />
      </div>

      <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100">
        {post.description}
      </p>

      <img
        src={post.image}
        alt="placeholder"
        className="w-full h-[164px] rounded-[10px] object-cover"
      />

      <div className="flex justify-between items-center gap-3 mt-5">
        <p className="font-medium text-[16px]">{post.category}</p>
        <Button className="rounded-full !bg-black-200 font-medium text-[16px] text-white px-5 py-3">
          Details
        </Button>
      </div>
    </li>
  );
};

export const Fallback = () => (
  <>
    {[0, 1, 2, 3, 4].map((_, index: number) => (
      <li key={cn("skeleton", index)} className="h-full">
        <Skeleton className="size-full bg-zinc-400" />
      </li>
    ))}
  </>
);

export default StartupCard;
