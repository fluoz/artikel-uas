"use client";
import React from "react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/store/use-modal-store";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const { onOpen } = useModal();
  const { data: sessions } = useSession();
  return (
    <div className="fixed z-10 top-0 border-b py-3 w-full shadow-sm">
      <div className="fixed left-6">Logo</div>
      <div className="box-container flex justify-end">
        {!sessions && <Button onClick={() => onOpen("login")}>Login</Button>}
        {sessions && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <p>{sessions.user?.username}</p>
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
  );
};

export default Navbar;
