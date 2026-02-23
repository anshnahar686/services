import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
export const Today =()=>{
const [today,settoday]=useState([])
    useEffect(()=>{
        axios.get('https://services-qtcu.onrender.com/today').then((response)=>{
                // console.log(response.data.data)
                settoday(response.data.data)
        })
    },[])
    console.log(today)
    return(
        <>
            <Table striped bordered hover variant="success" className="mt-2">
               <thead>
                <tr>
                    <th>S.no</th>
                    <th>CustomerName</th>
                    <th>JobService</th>
                   <th>job status</th>
                   <th>Return Date</th>

                   </tr>     
                </thead>
                <tbody>
                    {
                        today.map((list,index )=>
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td >{list.cname}</td>
                                <td>{list.serviced}</td>
                                <td>{list.status}</td>
                                <td>{list.rdate}</td>

                                </tr>
                        )
                    }
                </tbody>
           </Table>
        </>
    )

}
