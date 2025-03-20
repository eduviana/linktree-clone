"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddLinkFormProps } from "./AddLinkForm.types";
import { formSchema } from "./AddLinkForm.form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { linksSocialNetwork } from "@/data/linksSocialNetwork";
import Image from "next/image";
import axios from "axios";
import { useUserInfo } from "@/hooks/useUser";
import { toast } from "sonner";

export function AddLinkForm(props: AddLinkFormProps) {
  const { onReload } = props;
  const [open, setOpen] = useState(false);
  const { reloadUser } = useUserInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      name: "",
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/social-network", values);
      toast("Social network created");
      reloadUser();
      onReload(true);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-purple-600 text-white rounded-full py-6 text-lg hover:bg-purple-800 w-full">
            <Plus className="w-7 h-7" />
            Add social network
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new social network</DialogTitle>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Select your icon</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              const selectedLink = linksSocialNetwork.find(
                                (link) => link.icon === value
                              );
                              if (selectedLink) {
                                form.setValue("name", selectedLink.name);
                              }
                            }}
                            value={field.value || ""}
                            className="grid grid-cols-4 space-x-1 space-y-4"
                          >
                            {linksSocialNetwork.map((link) => (
                              <FormItem
                                key={link.icon}
                                className="flex items-center gap-1 space-x-0 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={link.icon} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <Image
                                    src={link.icon}
                                    alt="Icon"
                                    width={40}
                                    height={40}
                                  />
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter URL</FormLabel>
                        <FormControl>
                          <Input placeholder="URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Netowrk Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name will be auto-filled"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full rouunded-full bg-violet-500"
                  >
                    Create new social network
                  </Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
