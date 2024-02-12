"use client";
import { schemaUser } from "@/lib/validation/user_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FromInput from "../global/form/FormInput";
import { Form } from "../global/form";
import { Button } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { userContext } from "../context/UserContextProvider";

type Input = z.infer<typeof schemaUser>;
const UserInformation = ({ readonly = true }: { readonly?: boolean }) => {
  const { handelUpdateUser, userData, customErrors, setCustomErros } =
    useContext(userContext);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schemaUser),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      description: userData.description,
    },
  });

  const onSubnit: SubmitHandler<Input> = async (obj) => handelUpdateUser(obj);
  useEffect(() => {
    if (Object.keys(errors).length) {
      setCustomErros(errors);
    }
  }, [errors, setCustomErros]);
  return (
    <Form className="space-y-4" handleSubmit={handleSubmit(onSubnit)}>
      <FromInput.FromInputController
        id="name"
        placeholder="Name"
        control={control}
        customErrors={customErrors}
        variant="flat"
        readOnly={readonly}
      />
      {!readonly && (
        <FromInput.FromInputController
          id="email"
          placeholder="Email"
          type="email"
          control={control}
          customErrors={customErrors}
          variant="flat"
          readOnly={readonly}
        />
      )}

      <FromInput.FormTextareaController
        id="description"
        placeholder="Description"
        type="description"
        control={control}
        customErrors={customErrors}
        variant="flat"
        readOnly={readonly}
      />
      {!readonly && (
        <div className="w-full flex justify-center">
          <Button
            className="w-full max-w-md mx-auto"
            color="primary"
            type="submit"
          >
            Update
          </Button>
        </div>
      )}
    </Form>
  );
};

export default UserInformation;
