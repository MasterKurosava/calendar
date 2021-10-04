import React from "react";
import './contextMenu.css'
const ContextMenu=({width, height, planIsExist})=>{
  if(planIsExist){
    return(
      <div className="contextMenuBlock" style={{left:width, top:height}}>
        <ul>
          <li>Просмотреть</li>
          <li>Редактировать</li>
          <li>Удалить</li>
        </ul>
      </div>
    )
  }else{
    return(
      <div className="contextMenuBlock" style={{left:width, top:height}}>
        <ul>
          <li>Добавить</li>
        </ul>
      </div>
    )
  }
}
export default ContextMenu;