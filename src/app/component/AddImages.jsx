"use client";
import { useState } from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { db } from '@/utils/db';
import { collection, query, getDocs } from "firebase/firestore";
import ImageModal from './ImageModal';

function AddImages({refresh,setRefresh}) {
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
      
      <button  onClick={() => setImageModalOpen(true)} className="btn btn-primary w-full">Add Images
      <AiOutlinePlusCircle className='ml-2' size={20}/></button>
    {imageModalOpen && <ImageModal  close={setImageModalOpen}View={false} refresh={refresh} setRefresh={setRefresh}/>}
    
    </div>
  )
}

export default AddImages