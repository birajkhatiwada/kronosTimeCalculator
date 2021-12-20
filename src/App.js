// import { div } from "prelude-ls";
import React, {useState} from "react";
import './App.css'

function App() {
  const [clockOutHour, setClockOutHour] = useState(0)
  const [clockOutMinute, setClockOutMinute] = useState(0)
  const [clockOutHour2, setClockOutHour2] = useState(0)
  const [clockOutMinute2, setClockOutMinute2] = useState(0)

  const [clockInHour, setClockInHour] = useState(0)
  const [clockInMinute, setClockInMinute] = useState(0)
  const [lunchOutHour, setLunchOutHour] = useState(0)
  const [lunchOutMinute, setLunchOutMinute] = useState(0)
  const [lunchInHour, setLunchInHour] = useState(0)
  const [lunchInMinute, setLunchInMinute] = useState(0)


  const [clockInHour2, setClockInHour2] = useState(0)
  const [clockInMinute2, setClockInMinute2] = useState(0)
  const [lunchOutHour2, setLunchOutHour2] = useState(0)
  const [lunchOutMinute2, setLunchOutMinute2] = useState(0)
  const [lunchInHour2, setLunchInHour2] = useState(0)
  const [lunchInMinute2, setLunchInMinute2] = useState(0)

  const [beforeLunchHour, setBeforeLunchHour] = useState(0)
  const [beforeLunchMinute, setBeforeLunchMinute] = useState(0)
  const [afterLunchHour, setAfterLunchHour] = useState(0)
  const [afterLunchMinute, setAfterLunchMinute] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const[totalMinutes, setTotalMinutes] = useState(0)
  const [restTime, setRestTime] = useState(false);
  const [clockOutTime, setClockOutTime] = useState(false);


  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");



  const militaryTimeMap = new Map();
  militaryTimeMap.set(1, 13);
  militaryTimeMap.set(2, 14);
  militaryTimeMap.set(3, 15);
  militaryTimeMap.set(4, 16);
  militaryTimeMap.set(5, 17);
  militaryTimeMap.set(6, 18);
  militaryTimeMap.set(7, 19);
  militaryTimeMap.set(8, 20);
  militaryTimeMap.set(9, 21);
  militaryTimeMap.set(10, 22);
  militaryTimeMap.set(11, 23);
  militaryTimeMap.set(12, 24);

  const nonMilitaryTimeMap = new Map();
  nonMilitaryTimeMap.set(13, 1);
  nonMilitaryTimeMap.set(14, 2);
  nonMilitaryTimeMap.set(15, 3);
  nonMilitaryTimeMap.set(16, 4);
  nonMilitaryTimeMap.set(17, 5);
  nonMilitaryTimeMap.set(18, 6);
  nonMilitaryTimeMap.set(19, 7);
  nonMilitaryTimeMap.set(20, 8);
  nonMilitaryTimeMap.set(21, 9);
  nonMilitaryTimeMap.set(22, 10);
  nonMilitaryTimeMap.set(23,11);
  nonMilitaryTimeMap.set(24, 12);

  
  function handleSetClockInHour(e){
    if(Number(e.target.value) < 7){
      setClockInHour(militaryTimeMap.get(Number(e.target.value)));
    }else{
      setClockInHour(Number(e.target.value));
    }
  }

  function handleSetClockInMinute(e){
    setClockInMinute(Number(e.target.value));

  }


  /// handling clock in time for second container////////////
  function handleSetClockInHour2(e){
    if(Number(e.target.value) < 7){
      setClockInHour2(militaryTimeMap.get(Number(e.target.value)));
    }else{
      setClockInHour2(Number(e.target.value));
    }
  }
  function handleSetClockInMinute2(e){
    setClockInMinute2(Number(e.target.value));
  }
  ////////////////////////////////////////////////////////////



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

    //clears the div for restTime calculation hours
    setIsError(false);
    // setRestTime(false);
    setClockOutTime(true);
    if(handleError()){return;}

  
    //Algorithm to calculate the clockout time
    var [tempClockInHour, tempClockInMinute] = handleTempClockInTimeForEdgeCase(clockInHour, clockInMinute);
    // time before the lunch
    var [timeBeforeLunchInHour, timeBeforeLunchInMinute] = subtractTime(60*lunchOutHour + lunchOutMinute, 60*tempClockInHour + tempClockInMinute);
    console.log(timeBeforeLunchInHour, timeBeforeLunchInMinute);
    setBeforeLunchHour(timeBeforeLunchInHour);
    setBeforeLunchMinute(timeBeforeLunchInMinute);
    console.log(beforeLunchHour, beforeLunchMinute);
    //calculate time needed after the lunch
    var [timeAfterLunchInHour, timeAfterLunchInMinute] = subtractTime(480, timeBeforeLunchInHour*60+timeBeforeLunchInMinute);
    console.log(timeAfterLunchInHour, timeAfterLunchInMinute);
    setAfterLunchHour(timeAfterLunchInHour);
    setAfterLunchMinute(timeAfterLunchInMinute);
    console.log(afterLunchHour, afterLunchMinute);
    //cacluate the total hours worked
    var [totalhours, totalminutes] = addTime((timeBeforeLunchInHour+timeAfterLunchInHour)*60, timeBeforeLunchInMinute+timeAfterLunchInMinute);
    setTotalHours(totalhours);
    setTotalMinutes(totalminutes);
    console.log(totalHours, totalMinutes);
    //calculate the clock out time
    var [clockoutTimeInHour, clockoutTimeInMinute] = addTime(timeAfterLunchInHour*60+timeAfterLunchInMinute, lunchInHour*60+lunchInMinute);
    setClockOutHour(clockoutTimeInHour > 12 ? nonMilitaryTimeMap.get(clockoutTimeInHour): clockoutTimeInHour);
    setClockOutMinute(clockoutTimeInMinute);
    console.log(clockInMinute);
  }



  /// handle generating the rest of the time punches like
  /// lunch in and lunch out, clock out
  function handleGenerateRestTime(){
    //enables the space to show the hours
    setIsError2(false);
    setRestTime(true);
    // setClockOutTime(false);
    if(handleError2()){return;}
    

    ///Algorithm to calculate the lunch out, lunch in and clockout time
    var [tempClockInHour, tempClockInMinute] = handleTempClockInTimeForEdgeCase(clockInHour2, clockInMinute2);
    const [lunchouthour, lunchoutminute] = addTime((tempClockInHour+4)*60, tempClockInMinute);
    setLunchOutHour2(lunchouthour > 12? nonMilitaryTimeMap.get(lunchouthour): lunchouthour);
    setLunchOutMinute2(lunchoutminute);
    const [lunchinhour, lunchinminute] = addTime((lunchouthour)*60, lunchoutminute+31);
    setLunchInHour2(lunchinhour > 12 ? nonMilitaryTimeMap.get(lunchinhour): lunchinhour);
    setLunchInMinute2(lunchinminute);
    const [clockouthour, clockoutminute] = addTime((lunchinhour+4)*60, lunchinminute);
    setClockOutHour2(clockouthour > 12 ? nonMilitaryTimeMap.get(clockouthour): clockouthour);
    setClockOutMinute2(clockoutminute);
  }




  //////////////////////////////////////////Helper Functions///////////////////////////////////

  //Error Handling//
  function handleError(){
    var errorMsg = "Error! incorrect input! minutes field shouldn't be less than 0 or greater than 59!";
    if(clockInHour === 0 || lunchInHour === 0 || lunchOutHour === 0){
      console.log("error")
      setErrorMessage("Error! hour input field shouldn't be 0!");
      errorSetterHelper();
      return true;
    }
    if(clockInMinute > 59 || clockInMinute < 0 || lunchInMinute < 0 || lunchInMinute > 59 || 
      lunchOutMinute < 0 || lunchOutMinute > 59){
      console.log("here");
      setErrorMessage(errorMsg);
      errorSetterHelper();
      return true;
    }
    var[lunchHour, lunchMin] = subtractTime(lunchInHour*60+lunchInMinute, lunchOutHour*60+lunchOutMinute);
    var timeInMinutes = lunchHour*60+lunchMin;
    if(timeInMinutes < 0){
      setErrorMessage("Error! lunch out time can't be after lunch in time");
      errorSetterHelper();
      return true;
    }
    if(timeInMinutes < 31){
      setErrorMessage("Error! lunch break shouldn't be less than 31 minutes!");
      errorSetterHelper();
      return true;
    }
    return false;
  }

  function handleError2(){
    var errorMsg = "Error! incorrect input! minutes field shouldn't be less than 0 or greater than 59!";
    if(clockInHour2 === 0){
      console.log("here");
      setErrorMessage2("Error! clock in Hour is empty!");
      errorSetterHelper2();
      return true;
    } 
    if(clockInMinute2 < 0 || clockInMinute2 > 59){
      setErrorMessage2(errorMsg);
      errorSetterHelper2();
      return true;
    }
    return false;
  }


  function errorSetterHelper(){
    setIsError(true);
    setClockOutTime(false);
    // setRestTime(false);
  }


  function errorSetterHelper2(){
    setIsError2(true);
    // setClockOutTime(false);
    setRestTime(false);
  }
  /////////////////////////////



  function handleTempClockInTimeForEdgeCase(inHour, inMinute){
    var tempClockInHour = inHour;
    var tempClockInMinute = inMinute;
     //check for the edge case (8:55am to 9:05 is taken as just 9:00)
     if(tempClockInHour === 8){
      if(tempClockInMinute > 54){
        tempClockInHour = 9;
        tempClockInMinute = 0;
        console.log(tempClockInMinute);
      }
    }

    // console.log(clockInMinute);
    if(tempClockInHour === 9){
      if(tempClockInMinute <= 5){
        console.log("here");
        tempClockInMinute = 0;
      }
    }
    
    return [tempClockInHour, tempClockInMinute];
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
      <div className="main-container">
        <div className="containers">
          <div className="generateclockout-container">
            <p className="container-title">Generate the Clock Out Time</p>
            <div className="clocking">
              <div>Clock In Time</div>
              <input className="hour" placeholder="Hour" type="number" onChange={handleSetClockInHour}/>
              <input className="minute" placeholder="Minute" type="number" onChange={handleSetClockInMinute} />
            </div>
            <div className="lunchOut">
              <div>Lunch Out</div>
              <input className="hour"   placeholder="Hour" type="number" onChange={handleSetLunchOutHour} />
              <input className="minute"  placeholder="Minute"  type="number" onChange={handleSetLunchOutMinute}/>
            </div>
            <div className="lunchIn">
              <div>Lunch In</div>
              <input className="hour"  placeholder="Hour" type="number" onChange={handleSetLunchInHour} />
              <input className="minute" placeholder="Minute" type="number" onChange={handleSetLunchInMinute}/>
            </div>
            <div className="clockOut">
              <button onClick={handleGenerateClockOut} >Generate Clock Out Time</button>
              {clockOutTime === true ? (
                <div className="output">
                  <p className="clockout">ClockOut Time:  {clockOutHour.toString().length === 1? ""+0+clockOutHour: clockOutHour}:
                    {clockOutMinute.toString().length === 1? ""+0+clockOutMinute: clockOutMinute}</p>
                  <p>Time Before Lunch: {beforeLunchHour}hours {beforeLunchMinute}minutes</p>
                  <p>Time After Lunch: {afterLunchHour}hours {afterLunchMinute}minutes</p>
                  <p>Total Hours: {totalHours} hours {totalMinutes} minutes</p>

                  {/* <p>{clockInHour} {clockInMinute}</p> */}
                </div>
              ):(
                <div></div>
              )}
              {isError === true? (
                <div className="error">
                  {errorMessage}
                </div>
              ):(
                <div></div>
              )}
            </div>
          </div>


          <div className="generateall-container">
            <p className="container-title">Generate Lunch In and Out and Clock Out Time</p>
            <div className="clocking">
              <div>Clock In Time</div>
              <input className="hour" placeholder="Hour" type="number" onChange={handleSetClockInHour2}/>
              <input className="minute" placeholder="Minute" type="number" onChange={handleSetClockInMinute2} />
              <div>
                <button onClick={handleGenerateRestTime} >Generate Lunch Out, Lunch In and Clockout </button>
              </div>
              {restTime === true ? (<div className="output">
                <p>Based on the clock in time above, here is your normal time punches:</p>
                <p className="time-index">Lunch Out: {lunchOutHour2.toString().length === 1? ""+0+lunchOutHour2: lunchOutHour2}:
                    {lunchOutMinute2.toString().length === 1? ""+0+lunchOutMinute2: lunchOutMinute2}</p>
                <p className="time-index">Lunch In: {lunchInHour2.toString().length === 1? ""+0+lunchInHour2: lunchInHour2}:
                    {lunchInMinute2.toString().length === 1? ""+0+lunchInMinute2: lunchInMinute2}</p>
                <p className="time-index">Clock Out: {clockOutHour2.toString().length === 1? ""+0+clockOutHour2: clockOutHour2}:
                    {clockOutMinute2.toString().length === 1? ""+0+clockOutMinute2: clockOutMinute2}</p>
                <p>if you have different lunch out and lunch in punches please use the "generate clock out time" button!</p>
              </div>
              ):(
                <div></div>
              )}
              {isError2 === true? (
                <div className="error">
                  {errorMessage2}
                </div>
              ):(
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>have any feedbacks or questions?</p> 
        <p className="email">bkhatiwada@tesla.com</p>
      </div>
    </div>
  );
}


export default App;
