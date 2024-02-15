function Grade({ onGrade, userde }) {
   return (<>
      <p className="registered-student-heading">Registered Students</p>
     <div className="grade-container">
     
       {userde.map((item, index) => (
         <div key={index} className="student-details">
           <p>
             <span className="detail-label">Name:</span> {item.Name}
           </p>
           <p>
             <span className="detail-label">Roll No:</span> {item.Roll}
           </p>
           <p>
             <span className="detail-label">Branch:</span> {item.Branch}
           </p>
           <p>
             <span className="detail-label">Semester:</span> {item.Semester}
           </p>
           <p>
             <span className="detail-label">Sgpa:</span> {item.Sgpa}
           </p>
           <p>
             <span className="detail-label">Grade:</span> {onGrade(item.Sgpa)}
           </p>
         </div>
       ))}
     </div>
     </> );
 }
 
 export default Grade;
 