import { db } from "@/utils/db";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function ResultCollapes() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["user"]);
  const user = cookies.user;
  
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const examsData = [];

      // Fetch exams data
      const examsQuery = query(collection(db, "exams"));
      const examsSnapshot = await getDocs(examsQuery);

      examsSnapshot.forEach(async (examDoc) => {
        const examData = examDoc.data();
        const examId = examDoc.id;

        // Fetch results data for this exam
        // const resultsQuery = query(
        //   collection(db, "results"),
        //   where("examId", "==", examId),
        //   orderBy("total", "desc")
        // );
        // const resultsSnapshot = await getDocs(resultsQuery);
let rank
        const results = examData.results.sort((a, b) => b.total - a.total)
       const result=results.filter((result,index)=>{
        if(user.id===result.StdId){
          rank=index+1
          return result
        }
       })


        // Add both exam data and results to examsData array
        examsData.push({
          ...examData,
          id: examId,
          results: result,
          rank
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
  return (
    <div className="">
      {exams.map((exam)=>(<div key={exam.id} className="card bg-base-100 shadow-xl w-96 mb-2 relative">
        <div  className=" flex p-4 items-center">
          <div className="w-1/4">
            <p className="rank-text">{exam.rank}</p>
          </div>
          <div className="w-3/4 ml-1">
            <p className="text-sm">You got </p>
            <p className="text-sm">Rank in {exam.title}</p>
          </div>
        </div>
      </div>))}
      <div className="bg-yellow-100 py-3 px-5 text-center rounded-xl mt-4 mb-2 shadow-xl w-96">Exam Results</div>
      {exams.map((exam)=>(<div key={exam.id} className="collapse collapse-arrow bg-base-100 shadow-xl w-96 mb-2">
        <input type="radio" name="my-accordion-2" checked="checked" /> 
        <div className="collapse-title text-md font-medium">
          {exam.title}
        </div>
        <div className="collapse-content">
        <table className="table tab-02">
    {/* head */}
    <thead>
      <tr>
        <th>Subjects</th>
        <th>TE</th>
        <th>CE</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {exam.results.length!==0 ? exam.results[0].results.map((result,index)=>(<tr key={index}>
        <th>{result.name}</th>
        <td>{result.TE}</td>
        <td>{result.CE}</td>
        <td className="font-bold">{Number(result.CE)+Number(result.TE)}</td>
      </tr>)):<tr><td colSpan={4}>result not published</td></tr>}
      {/* row 2 */}
      <tr>
        <th></th>
        <td></td>
        <td className="font-bold">Total</td>
        <td className="font-bold">{exam.results[0].total}</td>
      </tr>
    </tbody>
  </table>
        </div>
      </div>))}
    </div>
  );
}

export default ResultCollapes;
