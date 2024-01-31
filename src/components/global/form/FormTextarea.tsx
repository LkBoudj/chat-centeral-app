import { Input, Textarea } from "@nextui-org/react";
import { FormInput } from "lucide-react";
import { FieldErrors } from "react-hook-form";

type Props = {};

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: any;
  errors: FieldErrors;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  classNames?: any;
}
const FormTextarea = ({
  label,
  id,
  type = "text",
  required,
  register,
  errors,
  disabled,
  readOnly,
  className,
  classNames,
}: InputProps) => {
  return (
    <Textarea
      classNames={classNames}
      {...register(id)}
      className={className}
      placeholder=" "
      variant="bordered"
      label={label}
      type={type}
      isDisabled={disabled}
      isReadOnly={readOnly}
      errorMessage={errors[id]?.message as string}
      isInvalid={errors[id]?.message != undefined}
    />
  );
};

export default FormTextarea;
