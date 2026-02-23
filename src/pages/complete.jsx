import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
// const data = [{ SNo: 1, serviceId: 12, ServiceName: "first", CustomerName: "firstc", date: "1-1-233", cdate: "1-1-233", status: "com" }, { SNo: 2, serviceId: 13, ServiceName: "second", CustomerName: "secondc", date: "2-3-233", cdate: "54-1-233", status: "pen" }, { SNo: 3, serviceId: 14, ServiceName: "third", CustomerName: "thirdc", date: "4-1-233", cdate: "5-1-233", status: "com" }, { SNo: 4, serviceId: 12, ServiceName: "fourth", CustomerName: "fourthc", date: "1-12-233", cdate: "6-1-233", status: "del" }]
export const Complete = () => {
    const [data,setdata]=useState([])
    useEffect(()=>{
        axios.get('https://services-qtcu.onrender.com/complete').then((response)=>{
            // console.log(response)
            setdata(response.data)
        })
    },[])
    console.log(data)
    return (
        <>
            <Table striped bordered variant="success" hover>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>ServiceId</th>
                        <th>ServiceName</th>
                        <th>CustomerName</th>
                        <th>Date</th>
                        <th>Complete date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((test,index) =>
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{test._id}</td>
                        <td>{test.serviced}</td>
                        <td>{test.cname}</td>
                        <td>{test.createddate}</td>
                        <td>{test.updatedDate}</td>
                        <td>{test.status}</td>
                    </tr>

                    )
                }

                </tbody>
            </Table>
        </>
    )
}
// export default Complete;