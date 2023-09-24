"use client";

import { db } from "@/utils/db";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LuExpand } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import Delete from "./Delete";
import Modal from "./Modal";


function TodoList({refresh}) {
  const [deleteItem, setDeleteItem] = useState();
  const [viewItem, setViewItem] = useState();
  const [loading,setLoading]=useState(false)

  const [data, setData] = useState([]);
  const getData = async () => {
    setLoading(true)
    let temp = [];
    const q = query(collection(db, "students"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push({ ...doc.data(), id: doc.id });
    });

    setData(temp);
    setLoading(false)
  };
  useEffect(() => {
    getData();
  }, [deleteItem,refresh,viewItem]);

  return (
    <>
      <div className="overflow-x-auto">
         {/* <button onClick={getData}>refresh</button> */}
        <table className="table table-zebra mb-20">
          {/* head */}
          <thead>
            <tr>
              <th className="text-sm">Serial No</th>
              <th className="text-sm">Image</th>
              <th className="text-sm">Name</th>
              <th className="text-sm">Name of Father</th>
              <th className="text-sm">Batch</th>
              <th className="text-center text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} alt=""/>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.NameofFather}</td>
                <td>{item.Batch}</td>
                <td>
                  <div className="flex gap-7 justify-center items-center">
                    <div className="hover:bg-gray-200 duration-500 p-2 rounded-lg"><LuExpand
                      onClick={() => setViewItem(item)}
                      className="text-xl font-bold cursor-pointer	"
                    /></div>
                    <div className="hover:bg-gray-200 duration-500 p-2 rounded-lg"><MdDelete
                      onClick={() => setDeleteItem(item)}
                      className="text-2xl text-red-600 cursor-pointer	"
                    /></div>
                  </div>
                  {deleteItem && (
                    <Delete close={setDeleteItem} item={deleteItem} />
                  )}
                </td>
              </tr>
            )) : <tr><td colSpan={6}><span className="loading loading-spinner loading-lg bg-primary"></span> </td></tr>}
          </tbody>
        </table>{viewItem && <Modal item={viewItem} close={setViewItem}View={true}/>}
      </div>
    </>
  );
}

export default TodoList;
