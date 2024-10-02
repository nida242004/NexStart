import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "@/auth";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={143} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link
                href="/idea/create"
                className="text-black capitalize font-medium"
              >
                Submit Proposal
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <Avatar className="w-10 h-10 border-2 border-black">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                      />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 border-2 border-black"
                >
                  <DropdownMenuItem className="font-bold">
                    {session?.user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-bold">
                    {session?.user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 font-bold">
                    <form
                      action={async () => {
                        "use server";
                        await signOut({
                          redirectTo: "/",
                        });
                        revalidatePath("/");
                      }}
                    >
                      <Button type="submit" variant="destructive">
                        Log out
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
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
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
