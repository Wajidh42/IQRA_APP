'use client'
import { storage } from "../../utils/db";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { LuDownload } from "react-icons/lu";
import { getBlob } from "firebase/storage";


function ImageBox() {
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
          
          return {url,blob};
        });
  
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
  }, []);
  return (
      images.map((image,index)=>(<div className="img-card rounded-2xl overflow-hidden w-96 bg-base-100 shadow-xl my-2" image={image} key={index}>
        <img src={image.url} alt="Shoes" />
      <a className="img-down" href={URL.createObjectURL(image.blob)} download><LuDownload/></a>
    </div>))
  );
}

export default ImageBox;
