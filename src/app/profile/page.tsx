"use client";
import {
  ContainerMaxWind,
  Loading,
  Error,
  UserInformation,
  CustomAvatarUser,
  Explorer,
} from "@/components";
import { globalContext } from "@/components/context/GlobalContextProvider";
import { userContext } from "@/components/context/UserContextProvider";

import { Tab } from "@nextui-org/react";

import React, { useContext } from "react";

type Props = {
  params: {};
  searchParams: {};
};

const ProfilePage = () => {
  const { userData, isLoading, isError } = useContext(userContext);
  const { onOpenUploadFile } = useContext(globalContext);
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <div className="py-16 w-full bg-cover bg-center bg-repeat-none bg-[url('/images/bg_c.webp')]"></div>
      <ContainerMaxWind className=" transform -translate-y-24 flex items-center justify-center px-5 ">
        <CustomAvatarUser
          canEdit={true}
          onClick={onOpenUploadFile}
          src={userData?.image ?? ""}
          defualt="/images/default.jpeg"
          name={userData?.name ?? ""}
          email={userData?.email ?? ""}
          description={userData?.description ?? ""}
        />
      </ContainerMaxWind>
      <ContainerMaxWind className="px-5 items-center  flex flex-col  h-full max-h-96 min-h-96">
        <Explorer
          startComponent={
            <Tab className="h-full w-full" key="informatin" title="Information">
              <UserInformation readonly={false} />
            </Tab>
          }
          types={["image", "audio", "video", "pdf"]}
        />
      </ContainerMaxWind>
    </>
  );
};

export default ProfilePage;
