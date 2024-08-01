"use client";
import { useModal } from "@/hooks/store/use-modal-store";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAuthSchema,
  LoginSchemaType,
  RegisterSchemaType,
} from "@/validations/auth.validation";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import TextInput from "../form/TextInput";
import { PasswordInput } from "../form/PasswordInput";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { signIn, useSession } from "next-auth/react";

const ModalAuth = () => {
  const { isOpen, type, onClose } = useModal();
  const showModal = isOpen && type === "login";
  const [authtype, setAuthtype] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  console.log(session);
  const form = useForm<LoginSchemaType | RegisterSchemaType>({
    resolver: zodResolver(getAuthSchema(authtype)),
  });
  const onSubmit = async (data: LoginSchemaType | RegisterSchemaType) => {
    try {
      setIsLoading(true);
      if (authtype === "login") {
        const login = await signIn("credentials", { ...data, redirect: false });
        if (login?.error) {
          throw new Error(login?.error);
        }

        onClose();
      }

      if (authtype === "register") {
        console.log("MASOK");
        await axios.post("/api/register", data);
        toast({
          description: "Berhasil Register",
        });

        setAuthtype("login");
      }
    } catch (error: any) {
      toast({
        description: error?.response?.data?.message || error?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={() => {
        onClose();
        form.reset();
      }}
    >
      <DialogContent>
        <Tabs
          value={authtype}
          onValueChange={(value: any) => setAuthtype(value)}
          className="mt-6"
          defaultValue="login"
        >
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="w-full" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="login">
                <TextInput
                  form={form}
                  label="Email"
                  name="email"
                  placeholder="Masukan Email"
                  type="email"
                />
                <PasswordInput
                  form={form}
                  label="Password"
                  name="password"
                  placeholder="Masukan Password"
                />
              </TabsContent>
              <TabsContent value="register">
                <TextInput
                  form={form}
                  label="Name"
                  name="name"
                  placeholder="Masukan nama"
                />
                <TextInput
                  form={form}
                  label="Email"
                  name="email"
                  placeholder="Masukan Email"
                />
                <PasswordInput
                  form={form}
                  label="Password"
                  name="password"
                  placeholder="Masukan Password"
                />
                <PasswordInput
                  form={form}
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Masukan Password"
                />
              </TabsContent>
              <Button disabled={isLoading} className="w-full mt-3">
                Submit
              </Button>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAuth;
