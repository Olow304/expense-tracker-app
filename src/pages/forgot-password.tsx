import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotpasswordInput } from "../server/inputs/forgotpassword";
import { trpc } from "../utils/trpc";

const ForgotPassword: NextPage = () => {
  const { handleSubmit, register } = useForm<forgotpasswordInput>();
  const [emailSendSuccess, setEmailSendSuccess] = useState(false);

  const { mutate, error } = trpc.useMutation(["user.forgot-password"], {
    onSuccess: (data) => {
      console.log("success", data);
      setEmailSendSuccess(true);
    }
  });

  function onSubmit(data: forgotpasswordInput) {
    // check if password and confirm password match
    mutate(data);
  }

  return (
    <>
      <Head>
        <title>Password reset - Expense App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/2">
          {error && <div className="text-red-500">{error.message}</div>}
          <input
            type="text" placeholder="email"
            className="border-2 border-gray-700 p-2"
            {...register('email')} />

          <button type="submit" className="border-2 border-gray-700 p-2 bg-blue-600 text-white text-md uppercase">Request password reset</button>
        </form>
        {emailSendSuccess && <div className="text-green-500">Email sent successfuly, please check your inbox or in your spam folder.</div>}

        <Link href="/login">
          <a className="text-blue-500 text-xl">Sign in</a>
        </Link>
      </div>


    </>
  );
};


export default ForgotPassword;
