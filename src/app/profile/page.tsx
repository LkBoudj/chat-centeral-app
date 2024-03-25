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
import { FileManagerItems } from "@/components/global/explorer/FileManager";

import { Tab } from "@nextui-org/react";

import React, { useContext } from "react";

type Props = {
  params: {};
  searchParams: {};
};

const ProfilePage = () => {
  const { userData, isLoading, isError } = useContext(userContext);
  const { onOpenUploadFile, files } = useContext(globalContext);
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <div className="py-16 w-full bg-cover bg-center bg-repeat-none bg-[url('/images/bg_c.webp')]"></div>
      <ContainerMaxWind className=" transform -translate-y-24 flex items-center justify-center px-5 ">
        <CustomAvatarUser
          canEdit={true}
          onClick={onOpenUploadFile}
          src={files.length ? files[0].src : userData?.image ?? ""}
          defaultSrc="/images/default.jpeg"
          name={userData?.name ?? ""}
          email={userData?.email ?? ""}
          description={userData?.description ?? ""}
        />
      </ContainerMaxWind>
      <ContainerMaxWind className="h-full   px-5 items-center   -translate-y-16">
        <FileManagerItems
          className="h-full max-h-[var(--mediaProfile)]"
          startComponent={
            <Tab
              className="h-full w-full"
              key="information"
              title="Information"
            >
              <UserInformation readonly={false} />
            </Tab>
          }
        />
      </ContainerMaxWind>
    </>
  );
};

export default ProfilePage;
