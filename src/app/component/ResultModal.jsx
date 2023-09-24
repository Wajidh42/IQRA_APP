import { useEffect, useState } from "react";
import { updateDoc, doc, arrayUnion, collection, getDocs, query } from "firebase/firestore";
import { db } from "@/utils/db";
import Loader from "./loader";
import { toast } from "react-toastify";

const ResultModal = ({ close, id, view, edit, subjects }) => {
  const [StdId, setStdId] = useState("");
  const [results, setResults] = useState(subjects);
  const [Loading, setLoading] = useState(false);
  // const [ArabicCEMark, setArabicCEMark] = useState("");
  // const [VocabularyTEMark, setVocabularyTEMark] = useState("");
  // const [VocabularyCEMark, setVocabularyCEMark] = useState("");
  // const [UrduTEMark, setUrduTEMark] = useState("");
  // const [UrduCEMark, setUrduCEMark] = useState("");
  // const [EnglishTEMark, setEnglishTEMark] = useState("");
  // const [EnglishCEMark, setEnglishCEMark] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const q = query(collection(db, "students"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        setStudents((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    };
    setStudents([]);
    getStudents();
  }, []);

  async function HandleSubmit() {
    setLoading(true);
    let total = 0
    results.forEach(async (subject) => {
      total = total + Number(subject.TE) + Number(subject.CE)
    })
    const formData = {
      StdId,
      results,
      total

    }; 
    try {
      updateDoc(doc(db, 'exams', id), { results: arrayUnion(formData) })
        .then(() => {
          toast.success("result added succsessfully", {
            position: toast.POSITION.TOP_CENTER,
          })
          location.reload()
        })
        .catch((error) => {
          console.log(error);
          toast.error("failed", {
            position: toast.POSITION.TOP_CENTER,
          })
        });


    } catch (error) {
      console.log(error);
      toast.error("failed", {
        position: toast.POSITION.TOP_CENTER,
      })
    } finally {
      setLoading(false);

    }
  }

  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <form
        method="dialog"
        onSubmit={HandleSubmit}
        className="modal-box p-10 flex flex-col gap-4 overflow-scroll"
        autoComplete="off"
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold">Add Result</h2>
        <div className="mt-5 flex flex-col gap-3 w-full h-full overflow-auto p-2">
          <div className=" flex items-center justify-start gap-5">
            <label htmlFor="StdName" className="">
              Name :
            </label>
            <select
              className="input input-bordered grow"
              value={StdId}
              onChange={(e) => {
                setStdId(e.target.value);
              }}
              disabled={view}
              id="StdName"
            >
              <option value="">Select</option>
              {students.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {results.map((subject, index) => (<div key={index} className=" flex items-center justify-center gap-4">
            <label htmlFor="ArabicTEMark">{subject.name} :</label>
            <input
              id="ArabicTEMark"
              type="number"
              placeholder="TE"
              className="input input-bordered w-36"
              value={subject.TE || ''}
              onChange={(e) => {
                const newValue = [...results]
                newValue[index].TE = e.target.value
                setResults(newValue);
              }}
              disabled={view}
              autoComplete="off"
              required
            />
            <input
              id="ArabciCEMark"
              type="number"
              placeholder="CE"
              className="input input-bordered w-36"
              value={subject.CE || ''}
              onChange={(e) => {
                const newValue = [...results]
                newValue[index].CE = e.target.value
                setResults(newValue);
              }}
              disabled={view}
              autoComplete="off"
              required
            />
          </div>))}

          <button
            className="btn btn-primary flex disabled:bg-gray-300"
            disabled={Loading}
          >
            {Loading ? <Loader /> : `${edit ? "Update Result" : "Add Result"}`}
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default ResultModal;
