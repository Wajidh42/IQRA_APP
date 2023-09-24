"use client";
import { useState } from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import Modal from './Modal'
import { db } from '../../utils/db';
import { collection, query, getDocs } from "firebase/firestore";

function AddTask({setRefresh,refresh}) {
  const[modalOpen, setModalOpen] = useState(false);
const getData=async ()=>{
  const q = query(collection(db, "students"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
  return (
    <div className='p-3'>
      
      <button  onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add new Student
      <AiOutlinePlusCircle className='ml-2' size={20}/></button>
    {modalOpen && <Modal  close={setModalOpen}View={false} setRefresh={setRefresh} refresh={refresh}/>}
    
    </div>
  )
}

export default AddTask