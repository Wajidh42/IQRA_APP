"use client";
import { db } from "@/utils/db";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
function Delete({ close,item }) {
  async function deleteStudent() {
    try {
        deleteDoc(doc(db,'students',item.id)).then(data=>{
            close()
        })
    } catch (error) {
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
        
        close()
        return
    }
  }
    return (
    <dialog id="my_modal" className="modal modal-open">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-xl aline-center">Confirm delete</h3>
        <p className="py-4">are you confirm to delete {item.name}</p>
        <div className="modal-action flex justify-around">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={() => close()} className="btn w-2/5">
            Cancel
          </button>
          <button onClick={deleteStudent} className="btn bg-red-500 hover:bg-red-600 w-2/5 text-white">Delete</button>
        </div>
      </form>
    </dialog>
  );
}

export default Delete;
