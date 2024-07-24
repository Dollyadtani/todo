import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
export default function Todo() {
     let senddata = ()=>
  {
    let taskName = document.getElementById("taskName").value;
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let notes = document.getElementById("notes").value;  

    let data = {

    "taskName": taskName,
    "startDate": start,
    "endDate": end,
    "notes": notes
    };
    
    fetch(`http://localhost:1337/api/todos`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
    }).then((res) => { return res.json() }).then((data) => {
      if (data.data.attributes.taskName === taskName)
      {
      Swal.fire({
        title: "Good job!",
        text: "You have succesfully Registred",
        icon: "success"
      })
    }
    }).catch();
    }
     // hook - useEffect()
    
    const [enquries, setEnquires] = useState([]);
   
    useEffect(() => {
     
        fetch(`http://localhost:1337/api/todos`)
            .then((res) => { 
                return res.json(); // Response Json Readble
            })
            .then((list) => {
                console.log(list);

            let eqlist = list.data.map((cv,idx,arr) => {
                     
                    return{
                          id: cv.id,
                        taskName:cv.attributes.taskName,
                        startDate:cv.attributes.startDate,                        
                        endDate: cv.attributes.endDate,
                        notes:cv.attributes.notes
                    }
                });
                
                setEnquires(eqlist);

            })
            .catch();

    }, []);


    let deletedata = (e) => {
    {
        fetch(`http://localhost:1337/api/todos/${e}`,
            {
                method: 'DELETE'                
            }
        )
            .then((res) => { return res.json(); })
            .then((data) => {
                
                console.log(data);
                
            })
            .catch();
    }

    }

  return (
      <div className='container m-5'>
          <div className='row bg-success'>
              <div className='col-md-4 p-5'>
                  <div>
                      <h3 className='mb-3'>TODO FORM</h3>
                      <form>
                          <div className='form-group'>
                              <label>Task Name:</label>
                              <input type='text'className='form-control' id='taskName'></input>
                          </div>
                          <div className='form-group'>
                              <label>Start Date:</label>
                              <input type='date'className='form-control' id='start'></input>
                          </div>
                          <div className='form-group'>
                              <label>End Date:</label>
                              <input type='date'className='form-control' id='end'></input>
                          </div>
                          <div className='form-group'>
                              <label>Notes:</label>
                              <input type='text'className='form-control' id='notes'></input>
                          </div>
                          <div>
                              <button className='btn btn-lg btn-dark m-3' onClick={senddata}>Save</button>
                          </div>
                      </form>
                  </div>
              </div>
              <div className='col-md-7 p-5 m-1'>
                  <table className='table table-bordered table-striped'>
                      <tr>
                          <th>S.No.</th>
                          <th>Task Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Notes</th>
                          <th>Action</th>
                      </tr>
                      {
                          enquries.map((cv, idx, arr) => {
                              return <tr>
                                  <td>{cv.id}</td>
                                  <td>{cv.taskName}</td>
                                  <td>{cv.startDate}</td>
                                  <td>{cv.endDate}</td>
                                  <td>{cv.notes}</td>
                                  <td><button onClick={()=>{deletedata(cv.id)}} className='btn btn-danger'>Delete</button></td>
                              </tr>
                          })}
                  </table>  
              </div>
          </div>
    </div>
  )
}
