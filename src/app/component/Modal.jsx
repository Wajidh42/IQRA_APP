
import { useRef, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../utils/db";
import Loader from "./loader";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Modal = ({ close, View, item, setRefresh, refresh }) => {
  const [name, setName] = useState(item ? item.name : "");
  const [DOB, setDOB] = useState(item ? item.DOB : "");
  const [PhNo, setPhNo] = useState(item ? item.phone : "");
  const [Place, setPlace] = useState(item ? item.Place : "");
  const [Age, setAge] = useState(item ? item.Age : "");
  const [Year, setYear] = useState(item ? item.Year : "");
  const [Batch, setBatch] = useState(item ? item.Batch : "");
  const [NameofFather, setNameofFather] = useState(
    item ? item.NameofFather : ""
  );
  const [Occupation, setOccupation] = useState(item ? item.Occupation : "");
  const [NameOfMother, setNameOfMother] = useState(
    item ? item.NameOfMother : ""
  );
  const [NameOfGuardian, setNameOfGuardian] = useState(
    item ? item.NameOfGuardian : ""
  );
  const [Phone, setPhone] = useState(item ? item.Phone : "");
  const [RWS, setRWS] = useState(item ? item.RWS : "");
  const [ResidentialAdd, setResidentialAdd] = useState(
    item ? item.ResidentialAdd : ""
  );
  const [Panchayath, setPanchayath] = useState(item ? item.Panchayath : "");
  const [Taluk, setTaluk] = useState(item ? item.Taluk : "");
  const [EMail, setEMail] = useState(item ? item.EMail : "");
  const [BloodGroup, setBloodGroup] = useState(item ? item.BloodGroup : "");
  const [Loading, setLoading] = useState(false);
  const [Image, setImage] = useState(item ? item.image : "");
  const imageRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(View ? true : false);

  async function HandleSubmit() {
    setLoading(true);
    let imageUrl;
    if (typeof Image == "object") {
      const imageRef = ref(storage, `students/${name}.jpg`);

      try {
        await uploadBytesResumable(imageRef, Image).then(async (snapshot) => {
          imageUrl = await getDownloadURL(imageRef);
        });
      } catch (error) {
        console.log(error);
      }
    }

    const formData = {
      name,
      DOB,
      phone: PhNo,
      image: imageUrl ? imageUrl : Image,
      Place,
      Age,
      Year,
      Batch,
      NameofFather,
      Occupation,
      NameOfMother,
      NameOfGuardian,
      Phone,
      RWS,
      ResidentialAdd,
      Panchayath,
      Taluk,
      EMail,
      BloodGroup,
    };
    if (item) {
      await setDoc(doc(db, "students", item.id), formData);
      toast.success("student details edited succsessfull", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await addDoc(collection(db, "students"), formData);
      toast.success("student added succsessfull", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (!item) {
      setRefresh(!refresh);
    }
    close(false);
  }

  return (
    <dialog id="my_modal_3" className="modal modal-open ">
      <form
        method="dialog"
        onSubmit={HandleSubmit}
        className="modal-box p-10 flex flex-col gap-4"
        autoComplete="off"
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={(e) => {
            e.preventDefault();
            close(false);
          }}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold">
          {!view && !edit
            ? "Add Student"
            : !edit && view
            ? "Student Details"
            : "Edit Details"}
        </h2>
        {view && (
          <FiEdit
            onClick={() => {
              setView(false);
              setEdit(true);
            }}
            className=" text-6xl ml-auto cursor-pointer mr-6"
            title="Edit"
          />
        )}
        <div className="mt-5 flex flex-col gap-3 w-full h-full overflow-auto mb-5 p-2">
          <div className="relative mb-3">
            <div className=" bg-primary w-40 h-40 rounded-full mx-auto p-1">
              <img
                className="w-full h-full block mx-auto rounded-full bg-white"
                src={
                  typeof Image === "string" && Image === ""
                    ? "avatar.png"
                    : typeof Image === "string" && Image !== ""
                    ? Image
                    : URL.createObjectURL(Image)
                }
                alt="image"
              />
            </div>
            {!view && (
              <AiFillPlusCircle
                className="absolute bottom-1 right-1/3 text-primary text-4xl bg-white rounded-full p-1 cursor-pointer"
                onClick={() => imageRef.current.click()}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              ref={imageRef}
              className="hidden"
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Name" className="">
              Name :
            </label>
            <input
              id="Name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered grow"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled={view}
              autoComplete="off"
              required
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Place" className="">
              Place:
            </label>
            <input
              id="Place"
              type="text"
              placeholder="Place"
              className="input input-bordered grow"
              value={Place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              disabled={view}
              autoComplete="off"
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="DOB" className="w-max">
              Date of birth :
            </label>
            <input
              id="DOB"
              type="date"
              placeholder="Text here"
              max={"2030-01-01"}
              className="input input-bordered grow"
              value={DOB}
              onChange={(e) => {
                setDOB(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Age" className="">
              Age :
            </label>
            <input
              id="Age"
              type="number"
              placeholder="Student Age"
              max={"100"}
              min={"0"}
              className="input input-bordered grow"
              value={Age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Year" className="w-max">
              Year :
            </label>
            <input
              id="Year"
              type="number-yyyy"
              placeholder="Year"
              className="input input-bordered grow"
              value={Year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Batch" className="w-max">
              Batch :
            </label>
            <input
              id="Batch"
              type="number"
              placeholder="Student Batch"
              max={"50"}
              min={"0"}
              className="input input-bordered grow"
              value={Batch}
              onChange={(e) => {
                setBatch(e.target.value);
              }}
              disabled={view}
            />
          </div>

          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="NameofFather" className="">
              Name of Father :
            </label>
            <input
              id="nameofFather"
              type="text"
              placeholder="Name of Father"
              className="input input-bordered grow"
              value={NameofFather}
              onChange={(e) => {
                setNameofFather(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Occupation" className="">
              Occupation :
            </label>
            <input
              id="Occupation"
              type="text"
              placeholder="Occupation"
              className="input input-bordered grow"
              value={Occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="PhNo" className="">
              Phone No :
            </label>
            <input
              id="PhNo"
              type="number"
              min={"0"}
              placeholder="Phone No of Father"
              className="input input-bordered grow"
              value={PhNo}
              onChange={(e) => {
                setPhNo(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="NameofMother" className="">
              Name of Mother :
            </label>
            <input
              id="NameofMother"
              type="text"
              placeholder="Name of Mother"
              className="input input-bordered grow"
              value={NameOfMother}
              onChange={(e) => {
                setNameOfMother(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="NameOfGuardian" className="">
              Name Of Guardian :
            </label>
            <input
              id="NameOfGuardian"
              type="text"
              placeholder="Name Of Guardian"
              className="input input-bordered grow"
              value={NameOfGuardian}
              onChange={(e) => {
                setNameOfGuardian(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Phone" className="">
              Phone No Of Guardian :
            </label>
            <input
              id="Phone"
              type="number"
              min={"0"}
              placeholder="Phone No Of Guardian"
              className="input input-bordered grow"
              value={Phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="RSW" className="">
              Relation With The Student :
            </label>
            <input
              id="RSW"
              type="text"
              placeholder="Relation With The Student"
              className="input input-bordered grow"
              value={RWS}
              onChange={(e) => {
                setRWS(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="ResidentialAdd" className="">
              Residential Address :
            </label>
            <textarea
              id="ResidentialAdd"
              rows="5"
              placeholder="Residential Address"
              className="input input-bordered grow resize-none"
              value={ResidentialAdd}
              onChange={(e) => {
                setResidentialAdd(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Panchayath" className="text-left">
              Panchayath :
            </label>
            <input
              id="Panchayath"
              type="text"
              placeholder="Panchayath"
              className="input input-bordered grow"
              value={Panchayath}
              onChange={(e) => {
                setPanchayath(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="Taluk" className="">
              Taluk :
            </label>
            <input
              id="Taluk"
              type="text"
              placeholder="Taluk"
              className="input input-bordered grow"
              value={Taluk}
              onChange={(e) => {
                setTaluk(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="EMail" className="">
              EMail :
            </label>
            <input
              required
              id="EMail"
              type="email"
              placeholder="EMail"
              className="input input-bordered grow"
              value={EMail}
              onChange={(e) => {
                setEMail(e.target.value);
              }}
              disabled={view}
            />
          </div>
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="BloodGroup" className="">
              BloodGroup :
            </label>
            <select
              className="input input-bordered grow"
              value={BloodGroup}
              onChange={(e) => {
                setBloodGroup(e.target.value);
              }}
              disabled={view}
              id="BloodGroup"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "o+", "o-"].map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
            {/* <input
              id="BloodGroup"
              type="text"
              placeholder="BloodGroup"
              className="input input-bordered grow"
              value={BloodGroup}
              onChange={(e) => {
                setBloodGroup(e.target.value);
              }}
            /> */}
          </div>
        </div>
        {!view && (
          <button
            className="btn btn-primary flex disabled:bg-gray-300"
            disabled={Loading}
          >
            {Loading ? (
              <Loader />
            ) : (
              `${edit ? "Update Student" : "Add Student"}`
            )}
          </button>
        )}
      </form>
    </dialog>
  );
};
export default Modal;
