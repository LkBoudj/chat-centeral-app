"use client";
import { ContainerMaxWind, MediaFiles } from "@/components";
import { Form, FormTextarea } from "@/components/global/form";
import FromInput from "@/components/global/form/FormInput";
import { schemaUser } from "@/lib/validation/user_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const CustomAvatarUser = ({
  name,
  description,

  src,
}: {
  name: string;
  description?: string;
  src?: string;
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="w-64 h-64" name={name} src={src} />
      <div className="space-y-2 transform translate-y-[51px] ">
        <p className="font-bold text-5xl text-slate-800 ">{name}</p>
        <p className="text-medium text-md font-medium text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
};
type Input = z.infer<typeof schemaUser>;
const UserInformation = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schemaUser),
  });
  return (
    <Form className="space-y-4">
      <FromInput.FromInputRegister
        id="name"
        label="Name"
        register={register}
        customErrors={errors}
      />
      <FromInput.FromInputRegister
        id="email"
        label="Email"
        type="email"
        register={register}
        customErrors={errors}
      />
      <FormTextarea
        id="description"
        label="Description"
        type="description"
        register={register}
        errors={errors}
      />
    </Form>
  );
};
const page = (props: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      <div className="py-32 w-full bg-cover bg-center bg-repeat-none bg-[url('/images/bg_c.webp')]"></div>
      <ContainerMaxWind className="px-5 transform -translate-y-32 ">
        <CustomAvatarUser
          src="/images/default.jpeg"
          name={user?.name}
          description={user?.email}
        />
      </ContainerMaxWind>
      <ContainerMaxWind className="px-5 transform -translate-y-20 flex flex-col  h-full max-h-96 min-h-96">
        <Tabs aria-label="Options">
          <Tab className="h-full  " key="informatin" title="Information">
            <UserInformation />
          </Tab>
          <Tab className="h-full  " key="photos" title="Photos">
            <MediaFiles type="image" />
          </Tab>
          <Tab key="audio" className="h-full  " title="Music">
            <MediaFiles type="audio" />
          </Tab>
          <Tab key="videos" className="h-full  " title="Videos">
            <MediaFiles type="video" />
          </Tab>
        </Tabs>
      </ContainerMaxWind>
    </div>
  );
};

export default page;
