"use client";

import { db } from "@/utils/db";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import NotificationModal from "./NotificationModal";
import NotificationDelete from "./NotificationDelete";


function NotificationList({ refresh }) {
  const [deleteItem, setDeleteItem] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState();


  const [data, setData] = useState([]);
  const getData = async () => {
    setLoading(true);
    let temp = [];
    const q = query(collection(db, "notification"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push({ ...doc.data(), id: doc.id });
    });

    setData(temp);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [deleteItem, refresh, edit]);

  return (
    <div className="mb-10">
      <h2 className="bg-gray-200 w-full p-4 text-lg text-gray-700 font-bold rounded-lg text-center">
        {" "}
        Added Notifications
      </h2>
      {!loading ? (
        data.map((item, index) => (
          <div key={index} className="card w-full bg-base-100 shadow-xl mt-5">
            <div className="card-body relative">
              <h2 className="card-title">{item.text}</h2>
              <p className="">
                {item.message}
              </p><div className="flex gap-3 justify-center items-center absolute top-6 right-10">
              <div className="hover:bg-gray-200 duration-500 p-2 rounded-lg">
              
          <FiEdit
            onClick={() => {
              setEdit(item);
            }} className="text-2xl text-gray-600 cursor-pointer	"
            />
              </div>
              <div className="hover:bg-gray-200 duration-500 p-2 rounded-lg">
                <MdDelete
                  onClick={() => setDeleteItem(item)}
                  className="text-2xl text-red-600 cursor-pointer	"
                />
              </div>
            </div>
            </div>
            
            {deleteItem && <NotificationDelete close={setDeleteItem} item={deleteItem} />}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-lg bg-primary"></span>
        </div>
      )}
      {edit && <NotificationModal item={edit} close={setEdit} Edit={true} />}
    </div>
  );
}

export default NotificationList;
