import { globalContext } from "@/components/context/GlobalContextProvider";
import { dashUserContext } from "@/components/context/dashboard/DashUserContextProvider";

import {
  FormInput,
  FormModel,
  FormSwitchInput,
} from "@/components/global/form";
import {
  schemaCreateUser,
  schemaEditUser,
} from "@/lib/validation/user_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@nextui-org/react";
import React, { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

type Inputs = z.infer<typeof schemaEditUser>;

const UpdateUser = (props: Props) => {
  const { onOpenChangeU, isOpenU, customErrors, updateItem, selectedItem } =
    useContext(dashUserContext);
  const { onOpenUploadFile, file, setFile } = useContext(globalContext);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schemaEditUser),
    defaultValues: {
      ...selectedItem,
      messagesMax: selectedItem?.messagesMax?.toString(),
    },
  });

  useEffect(() => {
    if (file?.src) {
      setValue("image", file?.src);
    }
  }, [file, setValue]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updateItem(JSON.stringify(data), reset);
  };
  return (
    <FormModel
      isOpen={isOpenU}
      onOpenChange={onOpenChangeU}
      title={"Update User "}
      typeForm={"update"}
      handleSubmit={handleSubmit(onSubmit)}
      edit={true}
    >
      <div className="flex items-center justify-center mb-4">
        <Avatar
          size="lg"
          src={file?.src ?? selectedItem.image}
          onClick={onOpenUploadFile}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="name"
          label="Name"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="email"
          label="Email"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="password"
          label="password"
        />
        <FormInput.FormSelectController
          data={["admin", "user"]}
          control={control}
          customErrors={customErrors}
          id="roles"
          label="role"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="messagesMax"
          label="messages Max Number"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="stripeCustomerId"
          label="stripe Customer Id"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="stripeSubscriptionId"
          label="stripe Subscription Id"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="stripePriceId"
          label="stripe Price Id"
        />
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="SubscriptionExpirydate"
          placeholder=" "
          label="Subscription Expiry date"
          type="date"
        />
        <div>
          <FormSwitchInput control={control} label="Status" name="status" />
        </div>
      </div>
    </FormModel>
  );
};

export default UpdateUser;
