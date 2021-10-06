import {areEqual} from './calendar';

export const datePlans=[];

function addDatePlan(date, plan, check){
  let PlanIsFinded=false;
  if(!plan){
    check("error");
    return;
  }
  datePlans.forEach(currentPlan=>{
    if(areEqual(currentPlan.date, date)){
      currentPlan.plan=plan;
      PlanIsFinded=true;
      return;
    }});
  if (!PlanIsFinded) datePlans.push({date:date, plan:plan});
  check();
}

function removeDatePlan(date){
  datePlans.forEach((plan, index)=>{
    if(areEqual(plan.date, date)){
      datePlans.splice(index,1);
    }
  })
}

function showDatePlan(date){
  let findedPlan;
  datePlans.forEach(plan=>{
    if(areEqual(plan.date, date)){
      findedPlan=plan.plan;
    }
  })
  return findedPlan || "";
}
export {addDatePlan,removeDatePlan, showDatePlan};