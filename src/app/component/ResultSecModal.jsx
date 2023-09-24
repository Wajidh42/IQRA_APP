"use client";

import React, { useState, Fragment } from "react";
import Loader from "./loader";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/db";
import { FiPlus } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import { toast } from "react-toastify";

function ResultSecModal({ close }) {
  const [title, setTitle] = useState("");
  const [subjects, setSubjects] = useState([{ name: "" }, { name: "" }, { name: "" }, { name: "" }]);


  const [Loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // const optionalFields = [optional1, optional2, optional3, optional4];

    const formData = {
      title,
      subjects,
      results: []
    };

    // optionalFields.forEach((optional, index) => {
    //   if(input.length > 0) {
    //     formData[`optional${index + 1}`] = optional;
    //   }
    // });

    try {
      await addDoc(collection(db, "exams"), formData);
      toast.success("Exam added successfully", {
        position: toast.POSITION.TOP_CENTER,
      })
    } catch (error) {
      toast.error("Failed to add exam", {
        position: toast.POSITION.TOP_CENTER,
      })
    } finally {
      setLoading(false);
      location.reload();
    }

  };

  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <div className="modal-box">
        <form method="dialog" onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            onClick={(e) => {
              e.preventDefault();
              close(false);
            }}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg ">Add Section</h3>
          <input
            id="tile"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Section Title"
            className="input input-bordered w-full mt-5"
            autoComplete="off"
            required
          />
          <Fragment>
            <div className="flex justify-between text-sm font-semibold mt-3">
              <h4>Subjects</h4>
              <FiPlus className="cursor-pointer hover:bg-zinc-200  rounded-full text-sm" type="button" onClick={() => setSubjects(prev => [...prev, { value: '' }])} />
            </div>
            <div className="w-full grid grid-cols-2 grid-flow-row gap-2 mt-2">


              {subjects.map((subject, index) => (
                <div key={index} className="relative group">
                  <GrFormClose className="cursor-pointer group-hover:block absolute right-3 hover:bg-zinc-200 rounded-full hidden top-4" type="button" onClick={() => setSubjects(subjects.filter((obj, Index) => Index !== index))} />
                  <input

                    value={subject.name}
                    onChange={(e) => {
                      const newValue = [...subjects]
                      newValue[index].name = e.target.value

                      setSubjects(newValue);
                    }}
                    className="input input-bordered w-full"
                    type="text"
                    placeholder={`Subject ${index + 1}`}
                  />
                </div>))}

              {/* <input
              value={subject2}
              onChange={(e) => {
                setSubject2(e.target.value);
              }}
              className="input input-bordered w-full"
              type="text"
              placeholder="Subject 2"
            />
            <input
              value={subject3}
              onChange={(e) => {
                setSubject3(e.target.value);
              }}
              className="input input-bordered w-full"
              type="text"
              placeholder="Subject 3"
            />
            <input
              value={subject4}
              onChange={(e) => {
                setSubject4(e.target.value);
              }}
              className="input input-bordered w-full"
              type="text"
              placeholder="Subject 4"
            /> */}

            </div>
          </Fragment>
          <button
            className="btn btn-primary flex disabled:bg-gray-300 w-full mt-5"
            disabled={Loading}
          >
            {Loading ? <Loader /> : "Add Section"}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default ResultSecModal;
