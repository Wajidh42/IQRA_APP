import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ResultSecModal from "./ResultSecModal";
function AddResultSecion() {
  const [resultModalOpen, setResultModalOpen] = useState(false);

  return (
    <div>
      <button
        className="btn btn-primary w-full mt-4"
        onClick={() => setResultModalOpen(true)}
      >
        Add Result Section
        <AiOutlinePlusCircle className="ml-2" size={20} />
      </button>
      {resultModalOpen && (
        <ResultSecModal close={setResultModalOpen} View={false} />
      )}
    </div>
  );
}

export default AddResultSecion;
