import React from "react";
import { ErrorMessage, Field } from "formik";
export default function Input({
  isDefault,
  isPassword,
  name,
  label,
  placeHolder,
  value,
}) {
  return (
    <div>
      <div className="wrapper_input">
        <label htmlFor={name}>{label}</label>
        {isDefault && (
          <Field
            id={name}
            name={name}
            placeholder={placeHolder ? placeHolder : label}
          />
        )}
        {isPassword && (
          <Field
            id={name}
            name={name}
            value={value}
            type="password"
            placeholder={placeHolder ? placeHolder : label}
          />
        )}
        <ErrorMessage
          name={name}
          component="p"
          style={{ color: "red" }}
        ></ErrorMessage>
      </div>
    </div>
  );
}
