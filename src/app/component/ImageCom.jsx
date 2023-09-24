
import {  ref, deleteObject } from "firebase/storage";
import { storage } from "@/utils/db";
import React, { useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function ImageCom({ image }) {
  const [active, setActive] = useState(false);
  

  return (
    <div className="relative" onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
      <img src={image.url} alt="image" />
      
      {active && <div className="absolute opening-div bottom-0 right-0 top-0 left-0 bg-opacity-75 flex gap-1 bg-gray-400 items-center justify-center duration-500 rounded-lg">
        <a href={URL.createObjectURL(image.blob)} download><HiOutlineDownload className="hover:bg-gray-200 bg-gray-300 text-gray-700 p-1 duration-500 rounded-lg text-4xl" /></a>
        <MdDelete className="hover:bg-gray-200 bg-gray-300 text-red-700 p-1 duration-500 rounded-lg text-4xl" onClick={async()=>{
          const desertRef = ref(storage, image.path)
          deleteObject(desertRef).then(() => {
            toast.info('Image deleted', {
              position: toast.POSITION.TOP_CENTER,
              onClose: () => {
                window.location.reload();
              },
            });
          }).catch((error) => {
            toast.error("something went wrong", {
              position: toast.POSITION.TOP_CENTER,
            });
          });
          
        }}/>
      </div>}
    </div>
  );
}

export default ImageCom;
