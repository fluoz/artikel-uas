"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FilePlus, HomeIcon, SquareCheckBig } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const SideBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="fixed hidden sm:block left-0 bg-white top-16 shadow-sm border-r h-full">
      <div className="w-full ">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex flex-col w-[200px] px-2 mt-3 space-x-0 space-y-1">
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
    </div>
  );
};

export default SideBar;
