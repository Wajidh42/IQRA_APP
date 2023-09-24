"use client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import LogOut from "../component/logOut";
import { HiOutlineLogout } from "react-icons/hi";
import { FiEye} from "react-icons/fi";
import { BsEyeSlash} from "react-icons/bs";


function Page() {
  const [cookies] = useCookies(["user"]);
  const [logOut, setLogOut] = useState(false);
  const user = cookies.user;
  const Psd = user?.name.toLowerCase().slice(0, 4) + user?.DOB.slice(0, 4);
  const [psdshow, setPsdshow]=useState("password");
  
  return cookies.user && cookies.user.admin ? (
    <div></div>
  ) : (
    <main className="min-h-screen flex justify-center overflow-hidden relative">
      <div className="min-h-screen home-grid-d w100 bg-red-500 flex flex-col justify-center items-center bottom-0 pb-28">
        <div className="h-48"></div>
        <div className="card w-96 bg-base-100 shadow-xl mt-16">
          <div className="card-body">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto border-8 border-blue-300">
              <img src={user?.image} alt="profile" />
            </div>
            <h2 className="card-title text-center mx-auto">{user.name}</h2>
            <p className="text-sm">User Name :</p>
            <p className="px-5 py-2 bg-gray-100 rounded-lg text-sm">{user.EMail}</p>
            <div className="relative">
              <p className="text-sm">Password :</p>
              <input type={psdshow} className="px-5 py-2 bg-gray-100 rounded-lg w-full" value={Psd} readOnly/>
              {psdshow==="password" ?<FiEye onClick={()=>setPsdshow("text")} className="absolute bottom-3 right-5 text-xl"/>
              : <BsEyeSlash onClick={()=>setPsdshow("password")} className="absolute bottom-3 right-5 text-xl"/>}
            </div>
          </div>
        </div>
        <div className="card w-96 bg-red-400 mt-5 shadow-xl">
        <div className="py-4 px-5 flex justify-center items-center flex-row cursor-pointer"
            onClick={() => setLogOut(true)}
          >
            <HiOutlineLogout className="text-3xl text-white" /><p className="text-white font-bold">Logout</p>
          </div>
          {logOut && <LogOut close={setLogOut} />}
        </div>
        
      </div>
    </main>
  );
}

export default Page;
