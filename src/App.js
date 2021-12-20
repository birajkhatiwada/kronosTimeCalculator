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
        <div className="contact">
          <p>have any feedbacks or questions?</p> 
          <p className="email">bkhatiwada@tesla.com</p>
        </div>
        <div class="social-media">
            <a href="https://github.com/birajkhatiwada" target="_blank">
                <svg class="footer-img github" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    
                </svg> 
            </a>
            <a href="https://www.linkedin.com/in/biraj-khatiwada-04b12a115/" target="_blank">
                <svg class="footer-img linkedin" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>  
            </a>
            <a href="https://www.instagram.com/biraj_khatiwada/" target="_blank">
                <svg class="footer-img instagram" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a> 
            
        </div>
      </div>
    </div>
  );
}


export default App;
