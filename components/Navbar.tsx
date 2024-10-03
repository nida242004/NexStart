import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="avatar">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                      />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dropdown-menu">
                  <DropdownMenuItem className="font-bold uppercase focus:bg-white">
                    {session?.user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-5" />
                  <DropdownMenuItem asChild>
                    <Link href={`/user/${session?.id}`}>My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/startup/create">Submit Proposal</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 font-bold mt-5">
                    <form
                      action={async () => {
                        "use server";
                        await signOut({
                          redirectTo: "/",
                        });
                        revalidatePath("/");
                      }}
                      className="w-full"
                    >
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full"
                      >
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
              <Button type="submit" className="login">
                <Github className="size-5 mr-2" />
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
