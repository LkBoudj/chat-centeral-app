"use client";
import {
  ContainerMaxWind,
  Loading,
  Error,
  UserInformation,
  CustomAvatarUser,
} from "@/components";
import { globalContext } from "@/components/context/GlobalContextProvider";
import { userContext } from "@/components/context/UserContextProvider";
import { FileManagerItems } from "@/components/global/explorer/FileManager";

import { Tab } from "@nextui-org/react";

import React, { useContext } from "react";

type Props = {
  params?: any;
  searchParams: {};
};

const ProfilePage = ({ params, searchParams }: Props) => {
  const { userData, isLoading, isError, user } = useContext(userContext);
  const { id } = params;
  const { onOpenUploadFile, files } = useContext(globalContext);
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <div className="py-16 w-full bg-cover bg-center bg-repeat-none bg-[url('/images/bg_c.webp')]"></div>
      <ContainerMaxWind className=" transform -translate-y-24 flex items-center justify-center px-5 ">
        <CustomAvatarUser
          onClick={onOpenUploadFile}
          canEdit={user.id == id}
          src={files.length ? files[0].src : userData?.image ?? ""}
          defaultSrc="/images/default.jpeg"
          name={userData?.name ?? ""}
          email={user.id == id && userData?.email ? userData?.email : ""}
          description={userData?.description ?? ""}
        />
      </ContainerMaxWind>
      <ContainerMaxWind className="px-5 items-center  flex flex-col  h-full max-h-96 min-h-96">
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
