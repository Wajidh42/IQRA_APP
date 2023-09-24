import React, { useEffect, Fragment } from "react";
import ResultModal from "./ResultModal";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import AddResultSecion from "./AddResultSecion";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,

} from "firebase/firestore";
import { db } from "@/utils/db";

function ResultSection() {
  const [resultModalOpen, setResultModalOpen] = useState();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const examsData = [];

      const examsQuery = query(collection(db, "exams"));
      const examsSnapshot = await getDocs(examsQuery);

      examsSnapshot.forEach(async (examDoc) => {
        const examData = examDoc.data();
        const examId = examDoc.id;


        const results = [];
        if (examData.results && examData.results.length != 0) {
          for (const result of examData.results) {
            const studentId = result.StdId;
            const studentRef = doc(db, "students", studentId);
            const docSnap = await getDoc(studentRef);
            const studentName = docSnap.data().name;

            results.push({
              ...result,
              studentName,
            });
          }
        }


        // Add both exam data and results to examsData array
        examsData.push({
          ...examData,
          id: examId,
          results: results.sort((a, b) => b.total - a.total),
        });

        // Check if we have fetched data for all exams
        if (examsData.length === examsSnapshot.size) {

          // Update the state with all the data
          setExams(examsData.reverse());
          setLoading(false);
        }

      });

    };

    // Initialize exams state as an empty array
    setExams([]);

    // Fetch and populate data
    getData();
    setLoading(false)
  }, []);

  console.log(exams);
  return (
    <div className="mb-20">
      <h1 className="bg-gray-200 w-full p-4 text-xl text-gray-700 font-bold rounded-lg">
        Exam Results
      </h1>
      <AddResultSecion />
      {loading ? (
        <div>
          <span className="loading loading-spinner loading-lg block mx-auto bg-primary mt-10"></span>
        </div>
      ) : (
        exams.map((exam) => (
          <div
            key={exam.id}
            className="w-full border border-slate-400 rounded-xl mt-4 p-4"
          >
            <div className="flex items-top justify-between gap-4 overflow-auto">
              <div className="w-full bg-gray-200 p-3 text-lg rounded-lg text-normal text-between px-7 flex items-center justify-between"><h6 className="">
                {exam.title}
              </h6><FiEdit/></div>
              <button
                onClick={() => setResultModalOpen(exam)}
                className="btn btn-primary"
              >
                Add Result
                <AiOutlinePlusCircle className="ml-1" size={20} />
              </button>
              {resultModalOpen && (
                <ResultModal
                  close={setResultModalOpen}
                  {...resultModalOpen}
                  View={false}
                />
              )}
            </div>
            {exam.results.length !== 0 && <table className="table table-xs result-table table-zebra">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  {exam.subjects.map((subject, index) => (<th key={index} colSpan={2}>{subject.name}</th>))}
                  <th>Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  {exam.subjects.map((subject, index) => (<Fragment key={index}><th>TE</th>
                    <th>CE</th></Fragment>))}


                </tr>
              </thead>
              <tbody>
                {exam.results &&
                  exam.results.map((result, index) => (
                    <tr key={result.id}>
                      <th>{index + 1}</th>
                      <td>{result.studentName}</td>
                      {result.results.map((sub, index) => (
                        <Fragment key={index}><td>{sub.TE}</td><td>{sub.CE}</td></Fragment>
                      ))}



                      <td className="font-bold">{result.total}</td>
                      {/* <td className="text-lg p-2 duration-5 rounded-lg hover:bg-gray-200 flex"><FiEdit /><MdDelete/></td> */}
                    </tr>
                  ))}
              </tbody>
            </table>}
          </div>
        ))
      )}
    </div>
  );
}

export default ResultSection;
