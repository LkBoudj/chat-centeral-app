import { Button, Image, Input } from "@nextui-org/react";
import React from "react";

type Props = {
  title: string;
  formType: string;
  onSubmit?: any;
  children: React.ReactNode;
  endComponet?: React.ReactNode;
  isValidated?: boolean;
  isPending?: boolean;
  startComponent?: React.ReactNode;
};

const AuthForm = ({
  title,
  onSubmit,
  children,
  isValidated,
  isPending,
  formType,
  endComponet,
  startComponent,
}: Props) => {
  return (
    <div className="flex w-full h-screen bg-slate-50/10">
      {startComponent}
      <div className="text-center w-full  h-full flex  items-center ">
        <div className="flex flex-col items-center  w-full space-y-8">
          <h3 className="localization  font-semibold text-3xl ">{title}</h3>

          <div className="w-full max-w-sm space-y-4 ">
            <Button
              size="lg"
              className="w-full rounded-md text-slate-800 border-slate-800 font-semibold"
              color="primary"
              variant="bordered"
            >
              <Image
                src="/images/google.png"
                alt="google"
                width={20}
                height={20}
              />
              Continue with Google
            </Button>

            <div>or</div>
            <form className="space-y-4" onSubmit={onSubmit}>
              {children}

              <Button
                //isDisabled={!isValidated}
                isLoading={isPending}
                type="submit"
                size="lg"
                className="w-full  rounded-md bg-slate-800"
                color="primary"
              >
                {formType}
              </Button>
            </form>
            {endComponet}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
