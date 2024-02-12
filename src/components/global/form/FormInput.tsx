import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

import { Controller, FieldErrors } from "react-hook-form";

interface BaseInputProps {
  label?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  id: string;
  customErrors?: FieldErrors;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  classNames?: any;
  placeholder?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
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

interface ControllerSelectProps extends ControllerInputProps {
  data: any[];
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
  variant = "bordered",
}: RegisterInputProps) => {
  return (
    <Input
      size={size}
      classNames={classNames}
      required={required}
      {...register(id)}
      className={className}
      placeholder={placeholder}
      variant={variant}
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
  labelPlacement = "inside",
  size = "sm",
  control,
  customErrors,
  variant = "bordered",
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
            labelPlacement={labelPlacement}
            onChange={onChange}
            variant={variant}
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
const FormTextarea = ({
  label,
  id,
  type = "text",
  required,
  register,
  customErrors,
  disabled,
  readOnly,
  className,
  classNames,
  variant = "bordered",
}: RegisterInputProps) => {
  return (
    <Textarea
      classNames={classNames}
      {...register(id)}
      className={className}
      placeholder=" "
      variant={variant}
      label={label}
      type={type}
      isDisabled={disabled}
      isReadOnly={readOnly}
      errorMessage={customErrors && (customErrors[id]?.message as string)}
      isInvalid={customErrors && customErrors[id]?.message != undefined}
    />
  );
};
const FormTextareaController = ({
  label,
  id,
  type = "text",
  required,
  control,
  customErrors,
  disabled,
  readOnly,
  className,
  classNames,
  variant = "bordered",
  size = "sm",
  placeholder,
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
          <Textarea
            required={required}
            ref={ref}
            size={size}
            classNames={classNames}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            variant={variant}
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

const FormSelectController = ({
  label,
  id,
  type = "text",
  required,
  control,
  customErrors,
  disabled,
  readOnly,
  className,
  classNames,
  variant = "bordered",
  size = "sm",
  placeholder,
  data,
}: ControllerSelectProps) => {
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
          <Select
            label={label}
            placeholder={placeholder}
            selectionMode="single"
            defaultSelectedKeys={[value]}
            className={className}
            onChange={onChange}
          >
            {data.map((d) => (
              <SelectItem key={d}>{d}</SelectItem>
            ))}
          </Select>
        );
      }}
    />
  );
};

const FromInput = {
  FromInputRegister,
  FromInputController,
  FormInputImageFile,
  FormTextarea,
  FormTextareaController,
  FormSelectController,
};
export default FromInput;
