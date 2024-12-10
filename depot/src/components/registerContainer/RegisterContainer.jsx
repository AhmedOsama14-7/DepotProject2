import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "../input/Input";
import { registerValidation } from "../../validations/Validations";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
export default function RegisterContainer() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const queryClient = useQueryClient()
  const registerMutations = useMutation({
    mutationKey:["login"],
    mutationFn: async (values) =>
      await AxiosConfig("auth/local/register", {
        method: "POST",
        data: {
          username: values.Name,
          email: values.Email,
          password: values.Password,
        },
      }),
    onError: (err) => {
      if (err?.response?.status === 400) {
        setError("Email or Name are already used");
      } else {
        setError("Something went wrong. Please try again.");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("login")
      localStorage.setItem("jwt", data?.data?.jwt);
      localStorage.setItem("name", data?.data?.user?.username);
      localStorage.setItem("email", data?.data?.user?.email);
      
      navigate("/");
    },
  });

  const onSubmit = (values) => {
    registerMutations.mutateAsync(values);
  };
  const initialValues = {
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  };
  return (
    <>
      <div className="registerContainer">
        <h3>Register</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={registerValidation}
        >
          <Form>
            <Input name={"Name"} label={"Name"} isDefault />
            <Input name={"Email"} label={"Email"} isDefault />
            <Input name={"Password"} label={"Password"} isPassword />
            <Input
              name={"ConfirmPassword"}
              label={"Confirm Password"}
              isPassword={true}
            />
            {error ? <p className="error">{error}</p> : ""}
            <button
              type="submit"
              className={registerMutations.isPending ? "loading" : ""}
            >
              Register <LuLoader2 />{" "}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
