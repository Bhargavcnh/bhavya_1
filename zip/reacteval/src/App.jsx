import Form from './from'
import './App.css'
import { useState } from 'react'
import Grade from './grade';


function App() {
  let [detail,setDetail]=useState(
    []
  );
 const onClickbtn=(name,roll,sem,branch,sgpa)=>{
  let userdetail=[...detail,{
    Name:name,
    Roll:roll,
    Semester:sem,
    Branch:branch,
    Sgpa:sgpa
  }]
  setDetail(userdetail);
  // console.log(detail);
 }
 const calculateGrade = (sgpa) => {
  
  if (sgpa >= 9) return 'A+';
  if (sgpa >= 8) return 'A';
  if (sgpa >= 7) return 'B';
  if (sgpa >= 6) return 'C';
  return "F";
  
};

return <div className='appcss'>
  <Form onClicksubmit={onClickbtn}/>
<Grade onGrade={calculateGrade} userde={ detail}/>
</div>
}

export default App
