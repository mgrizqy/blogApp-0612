"use client";
import * as React from "react";
import Image from "next/image";
import AccountImage from "../../../public/access_account.svg";
import { callAPI } from "@/config/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormInput from "@/components/core/FormInput";
import { useRouter } from "next/navigation";
import { apiCall } from "@/helper/apiCall";


const SignUpPage: React.FunctionComponent = () => {
  const router = useRouter();

  // Refs untuk semua field input 
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confPasswordRef = React.useRef<HTMLInputElement>(null);
  console.log(usernameRef.current?.value)

  const onSignUp = async () => {
    try {
      // - mengambil value dari form input 
      const username = usernameRef.current?.value || "";
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      const confPassword = confPasswordRef.current?.value || "";

      
      // memeriksa apakah semua form sudah diisi
      if (!(username && email && password && confPassword)) {
        
        alert ("Isi semua form input");
        return
        
      }
      
      // - memeriksa password
      if (password !== confPassword) {
        alert("Password dan konfirmasi password tidak cocok");
        return;
      }

      console.log(username,email,password)

      // - menyimpan data ke database backendless
      const response = await apiCall.post(
        "/accounts",
         {
          username,
          email,
          password,

         }
      )

      console.log(response.data);

      alert("Pendaftaran akun berhasil");
      // pindah halaman
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      alert("Gagal mendaftar akun");
    }
  };

  return (
    <div className="h-screen px-10">
      <div className="container m-auto flex flex-col md:flex-row items-center gap-5 md:gap-16">
        <div
          id="left"
          className="flex w-full md:w-1/2 flex-col justify-center md:space-y-5"
        >
          <h1 className="text-3xl font-bold">Post your story</h1>
          <p className="text-2xl font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="hidden md:block space-y-5">
            <Image
              src={AccountImage}
              alt="image"
              width={350}
              className="m-auto"
            />
          </div>
        </div>

        <div id="right" className="w-full md:w-1/2 h-fit">
          <Card>
            <CardHeader>
              <h1 className="text-2xl">Sign up now</h1>
            </CardHeader>
            <CardContent>
              <form>
                <div className="py-2 md:py-6 space-y-5">
                  <FormInput
                    type="text"
                    name="username"
                    label="Username"
                    ref={usernameRef}
                  />
                  <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    ref={emailRef}
                  />
                  <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    ref={passwordRef}
                  />
                  <FormInput
                    type="password"
                    name="confPassword"
                    label="Confirmation Password"
                    ref={confPasswordRef}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className="text-xs cursor-pointer hover:text-blue-600"
                      onClick={() => router.push("/sign-in")}
                    >
                      Already have an account ?
                    </p>
                    <Button
                      type="button"
                      className="bg-gray-400 text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base shadow"
                      onClick={onSignUp}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
