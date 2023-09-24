"use client";
import React, { useEffect, useState } from "react";
import {  ref, listAll, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "../../utils/db";
import ImageCom from "./ImageCom";

function ImageSection({refresh}) {
  const [loading, setLoading] = useState(true);
  const [images,setImages]=useState([])
  useEffect(() => {
    
    setLoading(true);
    
    async function getImages() {
      
      try {
        const listRef = ref(storage, "gallary");
        const res = await listAll(listRef);
        const imagePromises = res.items.map(async (item) => {
          const imageRef = ref(storage, item._location.path);
          const url = await getDownloadURL(imageRef);
          const blob = await getBlob(imageRef);
          
          return {url,blob,path:item._location.path};        });
  
        const imageUrls = await Promise.all(imagePromises);
        setImages([]);
      
        // Add new images to the cleared state
        setImages((prevImages) => [...prevImages, ...imageUrls]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    getImages();
  }, [refresh]);
  
  return (
    <div>
      <h2 className="bg-gray-200 w-full p-4 text-lg text-gray-700 font-bold rounded-lg text-center" 
      >
        {" "}
        Uploaded Images
      </h2>
      {loading ? <span className="loading loading-spinner loading-lg bg-primary block mx-auto mt-20"></span> :<div className="w-full mt-4 img-row gap-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        
        {images.map((image,index)=>(<ImageCom image={image} key={index}/>))}
        
      </div>}
    </div>
  );
}

export default ImageSection;
