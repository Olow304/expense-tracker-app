import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerInput } from "../server/inputs/registerInput";
import { trpc } from "../utils/trpc";

const Register: NextPage = () => {
    const { handleSubmit, register } = useForm<registerInput>();
    useEffect(() => {
        if (localStorage.getItem("token") || localStorage.getItem("user")) {
            router.push("/");
        }
    }, []);

    // import react router
    const router = useRouter();
    const [mismatch, setMismatch] = useState(false);
    const { mutate, error } = trpc.useMutation(["user.register"], {
        onSuccess: (data) => {
            router.push("/login");
        }
    });

    function onSubmit(data: registerInput) {
        // check if password and confirm password match
        if (data.password !== data.confirmPassword) {
            setMismatch(true);
        } else {
            mutate(data);
        }
        
    }

    return (
        <>
            <Head>
                <title>Register - Expense App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col justify-center items-center pt-6">
                <span className="text-2xl pb-4">Create your account</span>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/2 mobile:w-full mobile:px-4">
                    {error && <div className="text-red-500">{error.message}</div>}
                    {mismatch && <div className="text-red-500">Password and Confirm Password do not match</div>}
                    <input
                        type="text" placeholder="name"
                        className="border-2 border-gray-700 p-2"
                        {...register('name')} />
                    <input
                        type="text" placeholder="email"
                        className="border-2 border-gray-700 p-2"
                        {...register('email')} />

                    <input
                        type="password" placeholder="password"
                        className="border-2 border-gray-700 p-2"
                        {...register('password')} />
                    <input
                        type="password" placeholder="Confirm password"
                        className="border-2 border-gray-700 p-2"
                        {...register('confirmPassword')} />
                    <button type="submit" className="border-2 border-gray-700 p-2 bg-blue-600 text-white text-xl uppercase">Register</button>
                </form>
                <Link href="/login">
                    <a className="text-blue-500 text-xl">Sign in</a>
                </Link>
            </div>
        </>
    );
};


export default Register;
