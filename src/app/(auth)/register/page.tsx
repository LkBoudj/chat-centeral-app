"use client";
import clsx from "clsx";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import toaster from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { cn, isCanSubmit } from "@/lib/utlis";
import { registerSchema } from "@/lib/validation";
import { AuthForm, Details } from "@/components";
import { Input } from "@nextui-org/react";
import { trpc } from "@/trpc/client";

const EndComponet = () => (
  <div className="space-y-2 text-[14px]">
    <p className=" text-slate-600  leading-relaxed ">
      By clicking Create account or Continue with Google, you agree to the{" "}
      <Link
        href="/policy"
        className="text-blue-500 hover:text-blue-600 font-bold"
      >
        ChatCentral
      </Link>
      .
    </p>
    <p className="">
      Already have an account?{" "}
      <Link
        href="/login"
        className="text-blue-500 hover:text-blue-600 font-bold"
      >
        Log in
      </Link>
    </p>
  </div>
);

type Props = {};

type Inputs = z.infer<typeof registerSchema>;

const RegisterPage = (props: Props) => {
  const router = useRouter();
  const {
    data: backData,

    mutate,
    isSuccess,
    isPending,
    isError,
    error,
  } = trpc.authantication.signup.useMutation({
    onSuccess(data) {
      reset();
      router.push(`/login?email=${data.email}`);
    },
    onError(error) {
      const getErrorData = JSON.parse(error.message);
      toaster.error(getErrorData[0].message);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutate(data);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      startComponent={<Details />}
      title="Sigin Up to chatCantal"
      formType="Create Account"
      isValidated={isCanSubmit(registerSchema, {
        fullName: watch("fullName"),
        email: watch("email"),
        password: watch("password"),
        agree: watch("agree"),
      })}
      endComponet={<EndComponet />}
    >
      <Input
        {...register("fullName")}
        classNames={{
          inputWrapper: "border-slate-500 rounded-md ",
        }}
        type="text"
        placeholder={"Full Name "}
        errorMessage={errors.fullName?.message}
        isInvalid={errors.fullName?.message != undefined}
        variant="bordered"
      />
      <Input
        {...register("email")}
        classNames={{
          inputWrapper: "border-slate-500 rounded-md",
        }}
        type="email"
        placeholder="Email"
        errorMessage={errors.email?.message}
        isInvalid={errors.email?.message != undefined}
        variant="bordered"
      />
      <Input
        {...register("password")}
        classNames={{
          inputWrapper: "border-slate-500 rounded-md",
        }}
        type="password"
        placeholder="Password"
        errorMessage={errors.password?.message}
        isInvalid={errors.password?.message != undefined}
        variant="bordered"
      />

      <label
        {...register("agree")}
        className={cn(
          errors.agree?.message != undefined && "text-red-500",
          "space-x-1 flex items-center justify-start w-full"
        )}
      >
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
          type="checkbox"
          {...register("agree")}
          value="agree"
        />
        <p> I agree to join ChatCentral&apos;s mailing list</p>
      </label>

      <br />
    </AuthForm>
  );
};

export default RegisterPage;

/*

    <div className="flex w-full h-screen">
      <Details />
      <div className="text-center w-full  h-full flex  items-center ">
        <div className="flex flex-col items-center  w-full space-y-8">
          <h3 className="localization  font-semibold text-3xl ">
            Sigin Up to chatCantal
          </h3>

          <div className="w-full max-w-sm space-y-4 ">
            <Button
              size="lg"
              className="w-full rounded-md text-slate-800 border-slate-800 font-semibold"
              color="primary"
              variant="bordered"
            >
              <Image src="/images/google.png" width={20} height={20} />
              Continue with Google
            </Button>

            <div>or</div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            

              <Button
                isDisabled={
                  !isCanSubmit(schema, {
                    fullName: watch("fullName"),
                    email: watch("email"),
                    password: watch("password"),
                    agree: watch("agree"),
                  })
                }
                type="submit"
                size="lg"
                className="w-full  rounded-md bg-slate-800"
                color="primary"
              >
                Create Account
              </Button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
*/
