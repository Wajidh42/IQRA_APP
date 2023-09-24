"use client";

import { useEffect, useState } from "react";
import AddTask from "../component/AddTask";
import TodoList from "../component/TodoList";
import { useCookies } from "react-cookie";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";

export default function Home() {
  const [refresh, setRefresh] = useState();
  const [cookies] = useCookies(["user"]);
  const [loading, setLoading] = useState(false);
  const user = cookies.user;
  
  return cookies.user && cookies.user.admin ? (
    <>
      <main className="max-w-4xl mx-auto mt-20">
        <div className="text-center my-5 flex flex-col gap-4">
          {/* <h1 className="text-2xl font-bold">IQRA Admin Panel</h1> */}
          <AddTask setRefresh={setRefresh} refresh={refresh} />
        </div>
        <TodoList refresh={refresh} />
      </main>
    </>
  ) : (
    <>
      <main className="min-h-screen flex justify-center overflow-auto relative">
        <div className="min-h-screen home-grid-d w100 bg-red-500 flex flex-col justify-center items-center bottom-0 pb-28">
          <div className="h-48"></div>
          <div className="card w-96 bg-base-100 shadow-xl mt-16">
            <figure className="max-h-60">
              <img src={user.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{user.name}</h2>
              <div className="flex items-center">
                <BiSolidPhoneCall className="text-primary text-lg" />
                <p className="text-lg ml-2">{user.phone}</p>
              </div>
              <div className="flex items-center">
                <MdMarkEmailRead className="text-primary text-lg" />
                <p className="text-sm ml-2">{user.EMail}</p>
              </div>
              <div className="flex items-start">
                <FaAddressBook className="text-primary text-lg" />
                <p className="text-lg ml-2">{user.ResidentialAdd}</p>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mt-3">
            <div className="card-body">
              <h2 className="card-title">{user.NameofFather}</h2>
              <p>
                Occupation :<b>{user.Occupation}</b>
              </p>
              <div className="flex items-center">
                <BiSolidPhoneCall className="text-primary text-lg" />
                <p className="text-lg ml-2">{user.Phone}</p>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mt-3">
            <div className="card-body">
              <h2 className="card-title">{user.NameOfMother}</h2>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mt-3">
            <div className="card-body">
              <p className="bg-gray-100 px-5 py-3 rounded-xl text-center">
                Addmission Details
              </p>
              <p className="mt-2">
                Batch :<b>{user.Batch}</b>
              </p>
              <p>
                Addmission Year :<b>{user.Year}</b>
              </p>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mt-3">
            <div className="card-body">
              <p className="bg-gray-100 px-5 py-3 rounded-xl text-center">
                Personal Details
              </p>
              <p className="mt-2">
                Age :<b>{user.Age}</b>
              </p>
              <p>
                Date of Birth :<b>{user.DOB}</b>
              </p>
              <p>
                Blood Group :<b>{user.BloodGroup}</b>
              </p>
              <p>
                Place :<b>{user.Place}</b>
              </p>
              <p>
                Panchayath :<b>{user.Panchayath}</b>
              </p>
              <p>
                Taluk :<b>{user.Taluk}</b>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
