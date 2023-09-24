"use client";
import { useState } from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { db } from '@/utils/db';
import { collection, query, getDocs } from "firebase/firestore";
import NotificationModal from './NotificationModal';

function AddNotifications() {
  const[imageModalOpen, setImageModalOpen] = useState(false);
const getData=async ()=>{
  const q = query(collection(db, "students"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
  return ( 
    <div>
      
      <button  onClick={() => setImageModalOpen(true)} className="btn btn-primary w-full">Add Notification
      <AiOutlinePlusCircle className='ml-2' size={20}/></button>
    {imageModalOpen && <NotificationModal  close={setImageModalOpen}View={false}/>}
    
    </div>
  )
}

export default AddNotifications