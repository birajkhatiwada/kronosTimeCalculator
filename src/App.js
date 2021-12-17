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




  // function handlesetClockOutHour(){
  //   setClockOutHour('2');
  // }

  function handleSetClockInHour(e){
    setClockInHour(Number(e.target.value));
    console.log(Number(e.target.value));
    // console.log(clockOut + clockInHour)
    setClockOutHour(Number(e.target.value)+lunchInHour+lunchOutHour)
    // console.log(clockOut)
  }
  function handleSetClockInMinute(e){
    setClockInMinute(Number(e.target.value));
    setClockOutHour(Number(e.target.value) +  + clockInMinute)
  }

  function handleSetLunchInHour(e){
    setLunchInHour(Number(e.target.value));
    setClockOutHour( + Number(e.target.value))
  }

  function handleSetLunchInMinute(e){
    setLunchInMinute(Number(e.target.value));
    setClockOutHour( + lunchInMinute)
  }

  function handleSetLunchOutHour(e){
    setLunchOutHour(Number(e.target.value));
    setClockOutHour( + Number(e.target.value))
  }

  function handleSetLunchOutMinute(e){
    setLunchOutMinute(Number(e.target.value));
    setClockOutHour( + lunchOutMinute)
  }

  return (
    <div className="App">
      <div className="clockin">
          <input placeholder="Start Hour" type="number" onChange={handleSetClockInHour} onKeyDown={handleSetClockInHour}/>
          <input placeholder="Start Minute" type="number" onChange={handleSetClockInMinute} />
      </div>
      <div className="lunchOut">
          <input placeholder="Lunch Out Hour" type="number" onChange={handleSetLunchOutHour}  onKeyDown={handleSetLunchOutHour}/>
          <input placeholder="Lunch Out Minute" type="number" onChange={handleSetLunchOutMinute}/>
      </div>
      <div className="lunchIn">
          <input placeholder="Lunch In Hour" type="number" onChange={handleSetLunchInHour} onKeyDown={handleSetLunchInHour}/>
          <input placeholder="Lunch In Minute" type="number" onChange={handleSetLunchInMinute}/>
      </div>
        

        <p>Clock Out= {clockOutHour}:{clockOutMinute}</p>
    </div>
  );
}

export default App;
