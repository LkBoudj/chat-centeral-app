import { Image, Input } from "@nextui-org/react";
import { useState } from "react";

import { Controller, FieldErrors } from "react-hook-form";

interface BaseInputProps {
  label?: string;
  id: string;
  customErrors?: FieldErrors;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  classNames?: any;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | undefined;
}

interface RegisterInputProps extends BaseInputProps {
  defaultValue?: string;
  register: any;
}

interface ControllerInputProps extends BaseInputProps {
  control?: any;
}

interface FormInputImageFile extends RegisterInputProps {
  src?: string;
}
const FromInputRegister = ({
  label,
  id,
  type = "text",
  required,
  defaultValue,
  register,
  customErrors,
  disabled,
  readOnly,
  className,
  classNames,
  placeholder,
  size = "sm",
}: RegisterInputProps) => {
  return (
    <Input
      size={size}
      classNames={classNames}
      required={required}
      {...register(id)}
      className={className}
      placeholder={placeholder}
      variant="bordered"
      label={label}
      type={type}
      defaultvalue={defaultValue}
      isDisabled={disabled}
      isReadOnly={readOnly}
      errorMessage={customErrors && (customErrors[id]?.message as string)}
      isInvalid={customErrors && customErrors[id]?.message != undefined}
    />
  );
};

const FromInputController = ({
  label,
  id,
  type = "text",
  required,
  disabled,
  readOnly,
  className,
  classNames,
  placeholder,
  size = "sm",
  control,
  customErrors,
}: ControllerInputProps) => {
  return (
    <Controller
      control={control}
      name={id}
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
        fieldState,
      }) => {
        errors = { ...errors, ...customErrors };
        return (
          <Input
            required={required}
            ref={ref}
            size={size}
            classNames={classNames}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            variant="bordered"
            label={label}
            type={type}
            value={value}
            isDisabled={disabled}
            isReadOnly={readOnly}
            errorMessage={errors[id]?.message as string}
            isInvalid={errors[id]?.message != undefined}
          />
        );
      }}
    />
  );
};

const FormInputImageFile = ({
  src = "/images/no_image.jpg",
  customErrors,
  readOnly,
  register,
  id,
}: FormInputImageFile) => {
  const [srcImage, setSrcImage] = useState<any>(src);
  const handelOnChange = (e: any) => {
    const fileRernder = new FileReader();

    fileRernder.onload = function (e) {
      setSrcImage(e.target?.result);
    };

    fileRernder.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="relative ">
      <Image className="w-32  mx-auto" alt="" src={srcImage} />
      {!readOnly && (
        <input
          {...register(id)}
          onChange={handelOnChange}
          type="file"
          className="w-full h-full absolute top-0 left-0 z-50 opacity-0"
        />
      )}
    </div>
  );
};

const FromInput = {
  FromInputRegister,
  FromInputController,
  FormInputImageFile,
};
export default FromInput;
