import React from "react";
import {getMonthData,areEqual} from './calendar';
import classnames from 'classnames';
import ContextMenu from "../contextMenu/contextMenu";
import { datePlans } from "./datePlane";
import './index.css';

export default class Calendar extends React.Component{
  static defaultProps = {
    date: new Date(),
    years : [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011],
    monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    weekDayNames : ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    onChange: Function.prototype
  };
  state={
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
    contexMenu: null
  }
  get year(){
    return this.state.date.getFullYear();
  };
  get month(){
    return this.state.date.getMonth();
  }
  get day(){
    return this.state.date.getDate();
  }

  prevButtonClick=()=>{
    const date= new Date(this.year, this.month - 1);
    this.setState({date});
  };

  nextButtonClick=()=>{
    const date= new Date(this.year,  this.month + 1);
    this.setState({date});
  };
  showContextMenu=(e,date)=>{
    e.preventDefault();
    const contexMenu={width:e.clientX, height:e.clientY, planIsExist:false}
    this.setState({contexMenu});
    this.setState({selectedDate:date})
    document.addEventListener('click',()=>{this.setState({contexMenu:null});},{once:true} )
  }
  closeContextMenu=(clear)=>{
    this.setState({contexMenu:null});
    clear();
  }
  selectChange=()=>{
    const year= this.yearSelect.value;
    const month=this.monthSelect.value;
    const date=new Date(year,month);
    this.setState({date});
  };

  dayClick= (date) =>{
    this.setState({selectedDate:date});
    this.props.onChange(date);
  }
  setPlanStyle=(date)=>{
    let planIdExist;
    datePlans.some(el=>{
      if(areEqual(date,el.date)){
        planIdExist=true;
        return;
      }
    })
    return planIdExist;
  }

  render(){
    const {years, monthNames, weekDayNames} = this.props;
    const monthData = getMonthData(this.year,this.month, this.day);
    const {currentDate, selectedDate} = this.state;
    return(
      <div className="calendar">
        <header>
          <button onClick={this.prevButtonClick}>{'<'}</button>

          <select 
            ref={element=> this.monthSelect= element}
            value={this.month}
            onChange={this.selectChange}
          >
            {monthNames.map((name,index)=><option key={name} value={index}>{name}</option>)}
          </select>

          <select 
            ref={element=> this.yearSelect= element}
            value={this.year}
            onChange={this.selectChange}
          >
            {years.map((name)=><option key={name} value={name}>{name}</option>)}
          </select>

          <button  onClick={this.nextButtonClick}>{'>'}</button>
        </header>
        <table>
          <thead>
            <tr>
              {weekDayNames.map((name)=><th key={name} >{name}</th>)} 
            </tr>
          </thead>

          <tbody>
            {monthData.map((week,index)=>
              <tr key={index} className="week">
                {week.map((date,index)=> Number.isInteger(date) ?
                  <td className="day pastDays" key={index}>{date}</td>
                  : 
                  <td onContextMenu={(e)=>this.showContextMenu(e,date)} onClick={()=>this.dayClick(date)} key={index} className={classnames('day',{
                    'today': areEqual(date,currentDate),
                    'selected': areEqual(date,selectedDate),
                    'grades': index==6 || index==5,
                    'planedDay': this.setPlanStyle(date)
                  })} >{date.getDate()}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
        {this.state.contexMenu
        ?<ContextMenu 
          closeWindow={this.closeContextMenu}
          setPlanStyle={this.setPlanStyle}
          width={this.state.contexMenu.width + 40} 
          height={this.state.contexMenu.height - 40} 
          date={selectedDate}
        />
        : false
        }
      </div>
    )
  }
}