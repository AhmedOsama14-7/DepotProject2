import React, { useState } from "react";
import { Form, Formik } from "formik";
import Input from "../input/Input";
import { LoginValidation } from "../../validations/Validations";
import { useQueryClient, useMutation } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const queryClient = useQueryClient()
  const loginMutation = useMutation({
    mutationKey :["login"] , 
    mutationFn: async (values) =>
      await AxiosConfig("auth/local", {
        method: "POST",
        data: {
          identifier: values.Email,
          password: values.Password,
        },
      }),
    onSuccess: (data) => {
      localStorage.setItem("jwt", data?.data?.jwt);
      localStorage.setItem("name", data?.data?.user?.username);
      localStorage.setItem("email", data?.data?.user?.email);
      localStorage.setItem("id", data?.data?.user?.id);
      queryClient.invalidateQueries("login")
      navigate("/");
    },
    onError: (err) => {
      if (err.status == 400) {
        setError("Invalid Email or Password");
      }
    },
  });
  const initialValues = {
    name: "",
    password: "",
  };
  const onSubmit = (values) => {
    loginMutation.mutateAsync(values);
  };
  return (
    <div className="loginContainer">
      <h3>Log in</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={LoginValidation}
      >
        <Form>
          <Input name={"Email"} label={"Email"} isDefault />
          <Input name={"Password"} label={"Password"} isPassword />
          {error ? <p className="error">{error}</p> : ""}
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
}
