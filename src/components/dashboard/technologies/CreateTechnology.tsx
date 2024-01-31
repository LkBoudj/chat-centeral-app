import {
  FormInput,
  FormSwitchInput,
  FormTextarea,
} from "@/components/global/form";
import Form from "@/components/global/form/Form";
import { schemCreateTechFront } from "@/lib/validation/technology_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type Props = {};

type Inputs = z.infer<typeof schemCreateTechFront>;

const CreateTechnology = (props: Props) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schemCreateTechFront),
    defaultValues: { status: true },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full p-2 space-y-8 flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl ">Create Technology</h1>
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto space-y-4"
      >
        <FormInput
          classNames={{
            label: "top-[8px]",
          }}
          id="logo"
          label="logo"
          type="file"
          register={register}
          errors={errors}
        />
        FromInput
        <FormInput id="name" label="Name" register={register} errors={errors} />
        <FormInput
          id="refTech"
          label="Ref"
          register={register}
          errors={errors}
        />
        <div>
          <FormSwitchInput control={control} label="Status" name="status" />
        </div>
        <FormTextarea
          id="models"
          register={register}
          errors={errors}
          label="Models"
        />
        <FormTextarea
          id="description"
          register={register}
          errors={errors}
          label="Description"
        />
        <Button className="w-full" color="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default CreateTechnology;
