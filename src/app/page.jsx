"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { BsFileImageFill, BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import CopyRight from "./component/CopyRight";

export default function Home() {
  const [refresh, setRefresh] = useState();
  const [cookies] = useCookies(["user"]);
  return cookies.user && cookies.user.admin ? (
    <main className="max-w-4xl mx-auto mt-36">
      <div className="w-full mt-4 img-row gap-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 p-4">
        <a href="/details">
          <div className="w-50% h-60 bg-gray-100 border-2  rounded-2xl hover:bg-white hover:border-0 hover:drop-shadow-2xl hover:scale-120 hover:translate-x-4 hover:-skew-x-4	 duration-500 flex justify-center items-center flex-col">
            <TbListDetails className="text-7xl text-primary" />
            <span className="text-gray-700 text-2xl text-bold mt-10">
              Students Details
            </span>
          </div>
        </a>
        <a href="/results">
          <div className="w-50% h-60 bg-gray-100 border-2  rounded-2xl hover:bg-white hover:border-0 hover:drop-shadow-2xl hover:scale-120 hover:translate-x-4 hover:-skew-x-4	 duration-500 flex justify-center items-center flex-col">
            <BsFillJournalBookmarkFill className="text-7xl text-primary" />
            <span className="text-gray-700 text-2xl text-bold mt-10">
              Exam Results
            </span>
          </div>
        </a>
        <a href="/images">
          <div className="w-50% h-60 bg-gray-100 border-2  rounded-2xl hover:bg-white hover:border-0 hover:drop-shadow-2xl hover:scale-120 hover:translate-x-4 hover:-skew-x-4	 duration-500 flex justify-center items-center flex-col">
            <BsFileImageFill className="text-7xl text-primary" />
            <span className="text-gray-700 text-2xl text-bold mt-10">
              Gallery
            </span>
          </div>
        </a>
        <a href="/notifications">
          <div className="w-50% h-60 bg-gray-100 border-2  rounded-2xl hover:bg-white hover:border-0 hover:drop-shadow-2xl hover:scale-120 hover:translate-x-4 hover:-skew-x-4	 duration-500 flex justify-center items-center flex-col">
            <MdNotificationsActive className="text-7xl text-primary" />
            <span className="text-gray-700 text-2xl text-bold mt-10">
              Notifications
            </span>
          </div>
        </a>
      </div>
    </main>
  ) : (
    <main className="min-h-screen flex justify-center overflow-hidden relative">
      <div className="home-grid w100 gap-2 h-4/5 bg-red-500 flex flex-col justify-center items-center bottom-0 absolute">
        <div className=" flex justify-center items-center gap-4 mt-2">
          <a href="/details"> 
            <div className="box-icon bg-white flex justify-center items-center p-7 w-fit">
              <img className="h-20" src="./details.png" alt="" />
              <p>Details</p>
            </div> 
          </a>
          <a href="/results">
            <div className="box-icon bg-white flex justify-center items-center p-7 w-fit">
              <img className="h-20" src="./result.png" alt="" />
              <p>Results</p>   
            </div>
          </a> 
        </div>
        <div className="flex justify-center items-center gap-4 mt-2">
          <a href="/images">
            <div className="box-icon bg-white flex justify-center items-center p-7 w-fit">
              <img className="h-20" src="./gallery.png" alt="" />
              <p>Gallery</p>
            </div>
          </a>
          <a href="/notifications">
            <div className="box-icon bg-white flex justify-center items-center p-7 w-fit">
              <img className="h-20" src="./notification.png" alt="" />
              <p>Notifications</p>
            </div>
          </a>
        </div>
        <div className="flex justify-center items-center gap-4 mt-2 mb-4">
          <a href="/about">
            <div className="box-icon bg-white flex justify-center items-center p-7 w-fit">
              <img className="h-20" src="./about.png" alt="" />
              <p>About</p>
            </div>
          </a>
          <a href="/profile">
            <div className="box-icon bg-white flex justify-center items-center p-7 w-fit">
              <img className="h-20" src="./profile.png" alt="" />
              <p>Profile</p>
            </div>
          </a>
        </div>
      </div>
      <CopyRight/>
    </main>
  ); 
  }

