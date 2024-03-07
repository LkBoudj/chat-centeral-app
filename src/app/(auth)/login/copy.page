"use client";
import { z } from "zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Input, Link } from "@nextui-org/react";
import { AuthForm, Details } from "@/components/";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isCanSubmit } from "@/lib/utlis";
import { loginSchema } from "@/lib/validation";

const EndComponet = () => (
  <div className="space-y-2 text-[14px]">
    <Link href="/reset" className="text-blue-500 hover:text-blue-600 font-bold">
      Reset password
    </Link>
    <p>
      No account?{" "}
      <Link
        href="/register"
        className="text-blue-500 hover:text-blue-600 font-bold"
      >
        Create one
      </Link>
    </p>
  </div>
);

type Inputs = z.infer<typeof loginSchema>;

const LoginPage = ({ searchParams: { email } }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn("credentials", { ...data, redirect: false })
      .then((res: any) => {
        console.log(res);

        if (!res.ok) {
          toast.error("Invalid email or password");
        } else {
          toast.success("You have been logged in successfully");

          router.push("/chat");
        }
      })
      .catch((e) => {
        toast.error("Invalid email or password");
        console.log("error", e);
      });
  };
  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      startComponent={<Details />}
      title="Sigin in to chatCantal"
      formType=" Login In"
      isValidated={isCanSubmit(loginSchema, {
        email: watch("email"),
        password: watch("password"),
      })}
      endComponet={<EndComponet />}
    >
      <Input
        {...register("email")}
        classNames={{
          inputWrapper: "border-slate-500 rounded-md",
        }}
        defaultValue={email}
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
    </AuthForm>
  );
};

export default LoginPage;
