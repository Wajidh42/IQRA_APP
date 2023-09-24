"use client";

import { db } from "@/utils/db";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
function NotificBox({refresh}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getData = async () => {
    setLoading(true);
    let temp = [];
    const q = query(collection(db, "notification"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push({ ...doc.data(), id: doc.id });
    });

    setData(temp);
    setLoading(false);
  };
  useEffect(() => {
    getData();
},[refresh]);
  return (
    !loading && (
      data.map((item, index) => (<div key={index} className="card w-96 bg-base-100 shadow-xl mt-3">
      <div className="card-body">
        <h2 className="card-title">{item.text}</h2>
        <p>
          {item.message}
        </p>
      </div>
    </div>)))
  );
}

export default NotificBox;
