import React, {useState} from "react";
import './App.css'

function App() {
  const [clockOutHour, setClockOutHour] = useState(0)
  const [clockOutMinute, setClockOutMinute] = useState(0)
  const [clockInHour, setClockInHour] = useState(0)
  const [clockInMinute, setClockInMinute] = useState(0)
  const [lunchOutHour, setLunchOutHour] = useState(0)
  const [lunchOutMinute, setLunchOutMinute] = useState(0)
  const [lunchInHour, setLunchInHour] = useState(0)
  const [lunchInMinute, setLunchInMinute] = useState(0)
  const [beforeLunchHour, setBeforeLunchHour] = useState(0)
  const [beforeLunchMinute, setBeforeLunchMinute] = useState(0)
  const [afterLunchHour, setAfterLunchHour] = useState(0)
  const [afterLunchMinute, setAfterLunchMinute] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const[totalMinutes, setTotalMinutes] = useState(0)


  const militaryTimeMap = new Map();
  militaryTimeMap.set(1, 13);
  militaryTimeMap.set(2, 14);
  militaryTimeMap.set(3, 15);
  militaryTimeMap.set(4, 16);
  militaryTimeMap.set(5, 17);
  militaryTimeMap.set(6, 18);


  const nonMilitaryTimeMap = new Map();
  nonMilitaryTimeMap.set(13, 1);
  nonMilitaryTimeMap.set(14, 2);
  nonMilitaryTimeMap.set(15, 3);
  nonMilitaryTimeMap.set(16, 4);
  nonMilitaryTimeMap.set(17, 5);
  nonMilitaryTimeMap.set(18, 6);



  // function handlesetClockOutHour(){
  //   setClockOutHour('2');
  // }

  function handleSetClockInHour(e){

    if(Number(e.target.value) < 7){
      setClockInHour(militaryTimeMap.get(Number(e.target.value)));
    }
    else{
      setClockInHour(Number(e.target.value));
    }
    // console.log(clockOut + clockInHour)
    // setClockOutHour(Number(e.target.value)+lunchInHour+lunchOutHour)
    // console.log(clockOut)
  }

  function handleSetClockInMinute(e){
    console.log(clockInHour);
    setClockInMinute(Number(e.target.value));
  }

  function handleSetLunchInHour(e){
    if(Number(e.target.value) < 7){
      setLunchInHour(militaryTimeMap.get(Number(e.target.value)));
    }
    else{setLunchInHour(Number(e.target.value));}
  }

  function handleSetLunchInMinute(e){
    setLunchInMinute(Number(e.target.value));
  }

  function handleSetLunchOutHour(e){
    if(Number(e.target.value) < 7){
      setLunchOutHour(militaryTimeMap.get(Number(e.target.value)));
    }
    else{setLunchOutHour(Number(e.target.value));}
  }

  function handleSetLunchOutMinute(e){
    setLunchOutMinute(Number(e.target.value));
  }

  function handleGenerateClockOut(){
    if(clockInHour === 0 || clockInMinute === 0 || lunchInHour === 0 || lunchInMinute === 0 || lunchOutHour === 0 || lunchInMinute === 0 ){
      console.log("error")
    }

    // console.log(lunchInHour);

    

    // time before the lunch
    console.log(lunchOutHour);
    var [timeBeforeLunchInHour, timeBeforeLunchInMinute] = subtractTime(60*lunchOutHour + lunchOutMinute, 60*clockInHour + clockInMinute);
    console.log(timeBeforeLunchInHour, timeBeforeLunchInMinute);
    setBeforeLunchHour(timeBeforeLunchInHour);
    setBeforeLunchMinute(timeBeforeLunchInMinute);
    
    //calculate time needed after the lunch
    var [timeAfterLunchInHour, timeAfterLunchInMinute] = subtractTime(480, timeBeforeLunchInHour*60+timeBeforeLunchInMinute);
    console.log(timeAfterLunchInHour, timeAfterLunchInMinute);
    setAfterLunchHour(timeAfterLunchInHour);
    setAfterLunchMinute(timeAfterLunchInMinute);
    

    //cacluate the total hours worked
    var [totalhours, totalminutes] = addTime((timeBeforeLunchInHour+timeAfterLunchInHour)*60, timeBeforeLunchInMinute+timeAfterLunchInMinute);

    setTotalHours(totalhours);
    setTotalMinutes(totalminutes);


    //calculate the clock out time
    var [clockoutTimeInHour, clockoutTimeInMinute] = addTime(timeAfterLunchInHour*60+timeAfterLunchInMinute, lunchInHour*60+lunchInMinute);
    if(clockoutTimeInHour > 12){
        setClockOutHour(nonMilitaryTimeMap.get(clockoutTimeInHour));
    }else{
      setClockOutHour(clockoutTimeInHour);
    }
    setClockOutMinute(clockoutTimeInMinute);
  }


  function subtractTime(time2, time1){
    var hour = Math.floor((time2 - time1)/60);
    console.log(hour);
    var minute = (time2 - time1)%60;

    return [hour, minute];
  }


  function addTime(time1, time2){
    var hour = Math.floor((time1+time2)/60);
    console.log(hour);
    var minute = (time1+time2)%60;
    console.log(hour, minute);

    return [hour, minute];
  }

  return (
    <div className="App">
      <p className="title">Kronos ClockOut Time Calculator</p>
      <div className="clockin">
          <input className="hour" placeholder="Start Hour" type="number" onChange={handleSetClockInHour}/>
          <input className="minute" placeholder="Start Minute" type="number" onChange={handleSetClockInMinute} />
      </div>
      <div className="lunchOut">
          <input className="hour"   placeholder="Lunch Out Hour" type="number" onChange={handleSetLunchOutHour} />
          <input className="minute"  placeholder="Lunch Out Minute"  type="number" onChange={handleSetLunchOutMinute}/>
      </div>
      <div className="lunchIn">
          <input className="hour"  placeholder="Lunch In Hour" type="number" onChange={handleSetLunchInHour} />
          <input className="minute" placeholder="Lunch In Minute" type="number" onChange={handleSetLunchInMinute}/>
      </div>
      <div className="clockOut">
        <button onClick={handleGenerateClockOut} >Generate Clock Out Time</button>
          <p className="clockout">ClockOut Time: {clockOutHour}:{clockOutMinute}</p>
          <p>Time Before Lunch: {beforeLunchHour}hours {beforeLunchMinute}minutes</p>
          <p>Time After Lunch: {afterLunchHour}hours {afterLunchMinute}minutes</p>
          <p>Total Hours: {totalHours} hours {totalMinutes} minutes</p>
          {/* <input type="number" className="hour" value={clockOutHour} placeholder="ClockOut Hour"/>
          <input type="number" className="minute" value={clockOutMinute} placeholder="ClockOut Min" /> */}
      </div>

    </div>
  );
}

















export default App;
