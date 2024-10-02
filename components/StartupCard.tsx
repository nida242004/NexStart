import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const StartupCard = () => {
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5  rounded-[22px] shadow-200">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">
          20 May 2023
        </p>
        <Bookmark className="size-[23px] text-black" />
      </div>

      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <p className="font-medium text-[16px] line-clamp-1">Steven Smith</p>
          <h3 className="font-semibold text-[26px] line-clamp-1">Ecotrack</h3>
        </div>

        <img
          src="https://avatar.iran.liara.run/public"
          alt="placeholder"
          className="size-12 rounded-full"
        />
      </div>

      <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100">
        A mobile app that helps users track and reduce their carbo and best ins
      </p>

      <img
        src="https://placehold.co/600x400/orange/white"
        alt="placeholder"
        className="w-full h-[164px] rounded-[10px] object-cover"
      />

      <div className="flex justify-between items-center gap-3 mt-5">
        <p className="font-medium text-[16px]">Health</p>
        <Button className="rounded-full !bg-black-200 font-medium text-[16px] text-white px-5 py-3">
          Details
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
