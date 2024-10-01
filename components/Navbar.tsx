import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white">
      <nav className="flex justify-between items-center">
        <Link href="/public">
          <Image src="/logo.png" alt="logo" width={143} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          <form
            action={async () => {
              "use server";
              console.log("say hello");
            }}
          >
            <Button
              type="submit"
              className="border-[5px] py-4 border-black !bg-white text-black relative shadow-100 font-work-sans font-medium hover:shadow-none transition-all duration-500"
            >
              <Github className="w-5 h-5 mr-2" />
              Login
            </Button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
