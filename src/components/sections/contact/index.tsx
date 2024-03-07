"use client";
import toast from "react-hot-toast";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import Media from "./components/Media";

import { LegacyRef } from "react";
import { Section } from "@/components";
import { MailCheck, Phone } from "lucide-react";
type Inputs = {
  email: string;
  phone?: string;
  message: string;
};
export default function Contact({ id }: { id?: LegacyRef<HTMLElement> }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data, e: any) => {
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        toast.success("Your Message Sent Successfuly");
      } else {
        toast.error("Your Message Not Sent");
      }
    } else {
      toast.error("Your Message Not Sent");
    }
    e.target.reset();
  };

  return (
    <Section
      id={id}
      containerClass="pt-36 pb-16 grid gap-8 md:grid-cols-2 items-start w-full"
    >
      <div className="w-full space-y-10">
        <h4 className="max-w-[548px] capitalize text-[43px] font-bold text-[#001131]">
          Have a request? New Feature? Problem? Or anything at all, Reach out!
        </h4>
        <div className="space-y-4">
          <Media Icon={Phone} text="info@chatcentral.com" />
        </div>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-w-xl md:mx-auto space-y-8"
        >
          <Input
            {...register("email")}
            isRequired
            type="email"
            label="Email"
            className="w-full bg-white"
            variant="flat"
            classNames={{
              base: "bg-white",
              inputWrapper: "bg-white",
            }}
          />
          <Input
            {...register("phone")}
            type="text"
            label="Phone number (optional)"
            className="w-full"
            classNames={{
              base: "bg-white",
              inputWrapper: "bg-white",
            }}
          />

          <Textarea
            {...register("message")}
            label="Message"
            isRequired
            className="w-full"
            classNames={{
              base: "bg-white",
              inputWrapper: "bg-white",
            }}
          />
          <div className="flex justify-start">
            <Button
              size="lg"
              type="submit"
              className="rounded-xl mx-auto text-[14px] font-bold px-20"
              color="primary"
            >
              Contact Now
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
}
