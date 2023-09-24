import React, { useRef, useState } from "react";
import { storage } from "@/utils/db";
import Loader from "./loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


function ImageModal({ close,refresh,setRefresh }) {
  const imageRef = useRef(null);
  const UploadImage = async () => {
    setLoading(true);
    const imageRef = ref(storage, `gallary/${title}.jpg`);
    let imageUrl;
    try {
      await uploadBytesResumable(imageRef, Image).then(async (snapshot) => {
        imageUrl = await getDownloadURL(imageRef);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh(!refresh)
      close(false)
      setLoading(false);
    }
  };
  const [Image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [Loading, setLoading] = useState(false);

  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <div className="modal-box">
        <form method="dialog" onSubmit={UploadImage}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            onClick={(e) => {
              e.preventDefault();
              close(false);
            }}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg ">Add Image</h3>
          <input
            id="tile"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Image Title"
            className="input input-bordered w-full mt-5"
            autoComplete="off"
            required
          />
         
          <img
            className="w-full rounded-lg border-2 border-gray-300 mt-5"
            src={Image ? URL.createObjectURL(Image) : "dragimage.jpeg"}
            alt=""
            onClick={() => imageRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            ref={imageRef}
            className="hidden"
            required
          />
          <button
            
            className="btn btn-primary flex disabled:bg-gray-300 w-full mt-5"
            disabled={Loading}
          >
            {Loading ? <Loader /> : "Upload Image"}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default ImageModal;
