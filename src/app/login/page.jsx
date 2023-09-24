"use client";
import React, { useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";
import { UserContext } from "../component/context";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Loader from "../component/loader";
import {  toast } from 'react-toastify';

function Page() {
  const router = useRouter();
  const [Psd, setPsd] = useState("");
  const [Email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext); 
  const [cookies, setCookie] = useCookies(["user"]);
  const [Loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true)
    try {
      if (Email !== "IQRA") {
        const q = query(
          collection(db, "students"),
          where("EMail", "==", Email)
        );

        const querySnapshot = await getDocs(q);
        if(querySnapshot.size!=0){

        querySnapshot.forEach((doc) => {
          if (doc) {
            const { name } = doc.data();
            const { DOB } = doc.data();
            if (Psd === name.toLowerCase().slice(0, 4) + DOB.slice(0, 4)) {
              setUser({
                ...doc.data(),
                admin: false,
              });
              setCookie(
                "user",
                { ...doc.data(), admin: false,id:doc.id },
                {
                  path: "/",
                  maxAge: 36000,
                  sameSite: true,
                }
              );
            }else{
              toast.error("Wrong Password", {
                position: toast.POSITION.TOP_CENTER,
              })
              setLoading(false)
            }
          } 
        
        })
      }else {toast.error("Student not Found", {
        position: toast.POSITION.TOP_CENTER,
      })
    setLoading(false)
    }
      } else {
        if (Psd === "admin@iqra") {
          setUser({
            Email,
            admin: true,
          });
          setCookie(
            "user",
            { Email, admin: true },
            {
              path: "/",
              maxAge: 36000,
              sameSite: true,
            }
          );
        }else{
          toast.error("wrong Password", {
            position: toast.POSITION.TOP_CENTER,
          })
          setLoading(false)
        }
      }
    } catch (error) {
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      })
      setLoading(false)
    
    }
  };

  return (
    <main className="p-5 max-w-sm m-auto flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        method="dialog border border-gray-200 duration-500 rounded-xl p-3 hover:drop-shadow-3xl shadow-primary mx-auto"
      ><img className="h-16 mx-auto mb-20" src="iqralogo.png" alt="" />
        <h3 className="font-bold text-xl text-center">Login</h3>
        <input
          id="email"
          type="text"
          value={Email}
          placeholder="Email or User Name"
          className="input input-bordered w-full mt-5"
          autoComplete="off"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          id="psd"
          value={Psd}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mt-4"
          autoComplete="off"
          required
          onChange={(e) => {
            setPsd(e.target.value);
          }}
        />
        <button
            className="btn btn-primary flex disabled:bg-gray-300 mt-5 w-full"
            disabled={Loading}
          >
            {Loading ? <Loader /> :  `Login`}
          </button>
      </form>
    </main>
  );
}

export default Page;
