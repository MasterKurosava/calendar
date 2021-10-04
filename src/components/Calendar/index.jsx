import React from "react";
import {getMonthData,areEqual} from './calendar';
import classnames from 'classnames';
import './index.css';
import ContextMenu from "../contextMenu/contextMenu";

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
  showContextMenu=(e)=>{
    e.preventDefault();
    const contexMenu={width:e.clientX, height:e.clientY, planIsExist:false}
    this.setState({contexMenu});
    document.addEventListener('click',()=>{this.setState({contexMenu:null});},{once:true} )
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

  render(){
    const{years, monthNames, weekDayNames}=this.props;
    const monthData= getMonthData(this.year,this.month, this.day);
    const {currentDate, selectedDate}=this.state;
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
            {years.map((name,index)=><option key={name} value={name}>{name}</option>)}
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
                {week.map((date,index)=> date ?
                  <td onContextMenu={(e)=>this.showContextMenu(e)} onClick={()=>this.dayClick(date)} key={index} className={classnames('day',{
                    'today': areEqual(date,currentDate),
                    'selected': areEqual(date,selectedDate)
                  })} >{date.getDate()}</td>
                  : 
                  <td key={index}/>)}
              </tr>
            )}
          </tbody>
        </table>
        {this.state.contexMenu
        ?<ContextMenu 
          width={this.state.contexMenu.width + 20} 
          height={this.state.contexMenu.height - 20} 
          planIsExist={this.state.contexMenu.planIsExist}
        />
        : false
        }
      </div>
    )
  }
}