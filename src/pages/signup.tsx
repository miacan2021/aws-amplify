import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input, { Button, TextField } from "@mui/material";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [signUpErr, setSignUpErr] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      signUpWithEmailAndPassword(data);
    } catch (error: any) {
      console.error(error);
      setSignUpErr(error.message);
      setOpen(true);
    }
  };
  console.log("errors", errors);

  async function signUpWithEmailAndPassword(data: IFormInput) {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextField
        id="username"
        label="username"
        type="text"
        error={errors.username ? true : false}
        helperText={errors.username ? errors.username.message : null}
        {...register("username", {
          required: { value: true, message: "Please enter a username." },
          minLength: {
            value: 3,
            message: "Please enter a username between 3-16 characters.",
          },
          maxLength: {
            value: 16,
            message: "Please enter a username between 3-16 characters.",
          },
        })}
      />
      <TextField
        id="email"
        label="email"
        type="email"
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email.message : null}
        {...register("email", {
          required: { value: true, message: "Please enter a valid email." },
        })}
      />
      <TextField
        id="password"
        label="password"
        type="password"
        error={errors.password ? true : false}
        helperText={errors.password ? errors.password.message : null}
        {...register("password", {
          required: { value: true, message: "Please enter a password." },
        })}
      />
      <Button variant="contained" type="submit">
        Sign up
      </Button>

      {/* <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {signUpErr}
        </Alert> */}
    </form>
  );
};

export default Signup;
