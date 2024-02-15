import { useState } from "react";
function Form({ onClicksubmit }) {
  let [username, setUsername] = useState("");
  let [userRoll, setUserroll] = useState("");
  let [Semester,SetSemester]=useState("0"); 
  let [Branch, setBranch] = useState("");

  let [Sgpa, SetSgpa] = useState("");
  const onChangename = (event) => {
    setUsername(event.target.value);
  };
  const onChangeroll = (event) => {
    setUserroll(event.target.value);
  };
 const onchangeSem=(event)=>
 {
  SetSemester(event.target.value);
 }
  const onChangesgpa = (event) => {
    SetSgpa(event.target.value);
  };
  const onClickRadio = (event) => {
    setBranch(event.target.value);
  };
  const onClickbtn = () => {
    let format1 = /^[A-Za-z\s'-]+$/;
    let format2 = /^[0-9]+$/;
    let formats3 = /^[0-9]+(\.[0-9]+)?$/;;
    if (
      username.match(format1) &&
     userRoll.match(format2) &&
     Semester!=="0"&&
     Branch.match(format1) &&
    Sgpa.match(formats3)
    ) {
        console.log(Semester);
      onClicksubmit(username, userRoll,Semester,Branch, Sgpa);
      alert("submitted successfully");
      setUsername("");
      setUserroll("");
      SetSemester("");
      SetSgpa("");
      setBranch("");
    } else {
        alert("Enter again")
      setUsername("");
      setUserroll("");
      SetSemester("");
      SetSgpa("");
      setBranch("");
    }
  };

  return (
    <div className="formcss">
      <p>Student Registration Form</p>
      Name:
      <input
        type="text"
        value={username}
        placeholder="Enter the name"
        onChange={onChangename}
      />
      Roll No.
      <input
        type="number"
        placeholder="Enter roll no"
        value={userRoll}
        onChange={onChangeroll}
      />
     <div className="branchCss">
  <h5>Branch</h5>
  <span>
  <label>
    CSE <input type="radio" value="CSE" name="branch" onChange={onClickRadio} />
  </label></span>
  <span> <label>
    ECE <input type="radio" value="ECE" name="branch" onChange={onClickRadio} />
  </label></span>
  <span> <label>
    MEC <input type="radio" value="MEC" name="branch" onChange={onClickRadio} />
  </label></span>
</div>

      <select value={Semester} onChange={onchangeSem}>
        <option value="0">Select Semester</option>
        <option value="1" >
          1
        </option>
        <option value="2" >
          
          2
        </option>
        <option value="3" >
        
          3
        </option>
        <option value="4" >
          4
        </option>
        <option value="5" >
          5
        </option>
      </select>
      Sgpa:
      <input
        type="number"
        value={Sgpa}
        placeholder="Enter Sgpa"
        onChange={onChangesgpa}
      />
      <button onClick={onClickbtn}>Submit</button>
    </div>
  );
}
export default Form;
