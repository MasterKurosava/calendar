import React, { useEffect,useRef, useState } from "react";
import './contextMenu.css'
import { addDatePlan, removeDatePlan,showDatePlan } from "../Calendar/datePlane";

const ContextMenu=({closeWindow, width, height, date})=>{
  const [changedPlan,setchangedPlan]=useState('');
  const saveBtn=useRef();
  useEffect(()=>{
    setchangedPlan(showDatePlan(date));
  },[date])

  const closeInputWindow=()=>{
    closeWindow(setchangedPlan);
  }
  const checkInput=(error)=>{
    if(error){
      saveBtn.current.classList.add('error');
      setTimeout(()=>{ if (saveBtn.current) saveBtn.current.classList.remove('error')},500);
    }else{
      saveBtn.current.classList.add('success');
      setTimeout(()=>{ if (saveBtn.current) saveBtn.current.classList.remove('success')},500);
    }
  }
  return(
      <div onClick={event=>event.stopPropagation()} className="contextMenuBlock" style={{left:width, top:height}}>
        <p>Ваша задача</p>
        <textarea onChange={(e)=>setchangedPlan(e.target.value)} placeholder="Новый план" value={changedPlan}></textarea>

        <div className="buttons">
          <button 
            onClick={()=>addDatePlan(date, changedPlan, checkInput)} 
            ref={saveBtn}
          >Сохранить</button>

          <button 
            onClick={()=>closeWindow(closeInputWindow)}
          >Закрыть</button>

          <button 
            onClick={()=>{removeDatePlan(date); closeInputWindow()}} 
            className="deleteBtn"
          >X</button>

        </div>
      </div> 
    )
}
export default ContextMenu;