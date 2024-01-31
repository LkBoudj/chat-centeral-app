import React from "react";
import { SubmitHandler } from "react-hook-form";

type Props = {
  handleSubmit?: SubmitHandler<any>;
  children?: React.ReactNode | undefined;
  className?: string;
};

const Form = ({ handleSubmit, children, className }: Props) => {
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
