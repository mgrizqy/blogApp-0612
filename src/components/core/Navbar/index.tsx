"use client";
import * as React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { apiCall } from "@/helper/apiCall";
import { useDispatch } from "react-redux";
import { setSignIn, setSignOut } from "@/lib/redux/features/userSlice";
import { Button } from "@/components/ui/button";

const Navbar: React.FunctionComponent = () => {
  // const router = useRouter();
  const userMail = useAppSelector((state => state.userReducer.email));
  const dispatch = useDispatch();


  const keeplogin = async () => {
    try{
      const tkn = localStorage.getItem("tkn");
      if (tkn) {

        const res = await apiCall.get(`/accounts/${tkn}`)

        dispatch(setSignIn(res.data));
        

      } 
    } catch(error) {
        
      console.log(error)
      

    }
  }

  React.useEffect(() => {

    keeplogin();

  })

  return (
    <div className="flex items-center justify-between px-6 lg:px-24 py-5">
      <Link href="/" className="text-3xl font-bold">
        P
      </Link>
      <ul className="flex items-center gap-5">
        <li className="hidden lg:block">
          <div className="relative">
            <span className="absolute top-2.5 left-2">
              <FaSearch color="gray" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="border w-28 px-3 py-1 rounded-full pl-8"
            />
          </div>
        </li>

        <li className="flex items-center gap-2">
          {
            userMail ? (
              <div className="flex flex-row items-center gap-2">
              <p>{userMail}</p>
              <Link href={"/my-article"}>
              My Article
              </Link>
              <Button type="button" onClick={() => {dispatch(setSignOut()); localStorage.removeItem("tkn")}}> Sign Out</Button>
              </div>
            ) : (
              <>
            <Link
              href="/sign-up"
              className="bg-slate-200 text-slate-700 px-3 py-1 rounded-md shadow"
            >
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              className="bg-slate-700 text-white px-3 py-1 rounded-md shadow"
            >
              Sign In
            </Link>
          </>
              
            )
          }
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
