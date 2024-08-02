"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/store/use-modal-store";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Divide as Hamburger } from "hamburger-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { slide as Menu } from "react-burger-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePlus, HomeIcon, SquareCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";

const Navbar = () => {
  const { onOpen } = useModal();
  const { data: session } = useSession();
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="fixed flex w-full z-10 top-0 border-b bg-white py-3 justify-between items-center px-6 shadow-sm">
        <div className="flex gap-2 items-center ">
          <div className="w-fit md:hidden">
            <Hamburger size={24} toggled={isOpen} toggle={setOpen} />
          </div>
          Logo
        </div>
        <div className="">
          {!session && <Button onClick={() => onOpen("login")}>Login</Button>}
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-2 items-center cursor-pointer">
                  <p>{session.user?.username}</p>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <Menu
        isOpen={isOpen}
        onStateChange={(state) => setOpen(state.isOpen)}
        customBurgerIcon={false}
        className="bg-white"
        overlayClassName="!z-[11]"
      >
        <div className="w-full">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-[300px] px-2 mt-3 space-x-0 space-y-1">
              <NavigationMenuItem className="w-full">
                <Link className="w-full" href={"/"} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/"}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full justify-start items-start"
                    )}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <HomeIcon className="w-4 h-4" /> Home
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {session && (
                <NavigationMenuItem className="w-full">
                  <Link
                    className="w-full"
                    href={"/article"}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      active={pathname === "/article"}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start items-start"
                      )}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <FilePlus className="w-4 h-4" /> Buat Artikel
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              {session && session?.user?.role === UserRole.ADMIN && (
                <NavigationMenuItem className="w-full">
                  <Link
                    className="w-full"
                    href={"/approval"}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      active={pathname === "/approval"}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start items-start"
                      )}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <SquareCheckBig className="w-4 h-4" /> Approval
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Menu>
    </>
  );
};

export default Navbar;
