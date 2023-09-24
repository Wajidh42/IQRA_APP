"use client";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/db";
import { toast } from "react-toastify";
import Loader from "./loader"; // Make sure you import the Loader component correctly

const NotificationModal = ({ close, item ,Edit}) => {
  const [text, setText] = useState(item ? item.text : "");
  const [message, setMessage] = useState(item ? item.message : "");
  const [Loading, setLoading] = useState(false);

  async function HandleSubmit() {
    setLoading(true);

    const formData = {
      text,
      message,
    };
    if (item) {
      await setDoc(doc(db, "notification", item.id), formData);
      toast.success("Notification edited succsessfull", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await addDoc(collection(db, "notification"), formData);
      toast.success("Notification added succsessfull", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    close(false);
    location.reload();
  }
  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <div className="modal-box">
        <form onSubmit={HandleSubmit} method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            onClick={(e) => {
              e.preventDefault();
              close(false);
            }}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">
            {!Edit ? "Add Notification" : "Edit Notification"}
          </h3>
          <input
            id="title" // Corrected the input 'id' attribute
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Notification Title"
            className="input input-bordered w-full mt-5"
            autoComplete="off"
            required
          />
          <textarea
            id="ResidentialAdd" // Corrected the textarea 'id' attribute
            placeholder="Text Notification"
            className="input input-bordered w-full mt-4 p-3 h-40"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          />

          <button
            button="submit"
            className="btn btn-primary flex disabled:bg-gray-300 w-full"
            disabled={Loading}
          >
            {Loading ? (
              <Loader />
            ) : (
              `${Edit ? "Update Notification" : "Add Notification"}`
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default NotificationModal;
