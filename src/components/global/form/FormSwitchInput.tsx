import { Switch } from "@nextui-org/react";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  label: string;
};

const FormSwitchInput = ({ control, name, label }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        formState,
        fieldState,
      }) => (
        <Switch isSelected={value} onValueChange={onChange}>
          {label}
        </Switch>
      )}
    />
  );
};

export default FormSwitchInput;
