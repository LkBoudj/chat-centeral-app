"use client";
import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { isCanSubmit } from "@/lib/utlis";

type Props = {};

const shema = z.object({
  email: z.string().email(),
});

type Inputs = z.infer<typeof shema>;

const ResetPage = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(shema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex w-full h-screen">
      {/* <Details /> */}
      <div className="text-center w-full  h-full flex  items-center justify-center ">
        <div className="space-y-5 max-w-sm">
          <h3 className="localization  font-semibold text-3xl leading-snug ">
            Enter Your Email To Reset password
          </h3>

          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              classNames={{
                inputWrapper: "border-slate-500 rounded-md",
              }}
              required
              {...register("email")}
              type="email"
              placeholder="Email"
              variant="bordered"
            />

            <Button
              isDisabled={!isCanSubmit(shema, { email: watch("email") })}
              type="submit"
              size="lg"
              className="block w-full  rounded-md bg-slate-800"
              color="primary"
            >
              Reset password
            </Button>
          </form>
          <div>
            <Link
              href="/login"
              className=" text-blue-500 hover:text-blue-600 font-semibold "
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
