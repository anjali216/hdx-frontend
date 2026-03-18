import { useEffect, useState } from "react";
import API from "../services/api";

export default function Projects(){
  const [data,setData]=useState([]);

  useEffect(()=>{
    API.get("/projects").then(res=>setData(res.data));
  },[]);

  return(
    <div>
      <h2>Projects</h2>
      {data.map(p=><div key={p._id}>{p.name}</div>)}
    </div>
  );
}