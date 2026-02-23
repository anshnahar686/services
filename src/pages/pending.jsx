import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
export const Pending = () => {
    const [pend, setpend] = useState([])
    useEffect(() => {
        axios.get('https://services-qtcu.onrender.com/delaytask').then((response) => {
            setpend(response.data)
        })
    }, [])
    console.log(pend)
    return (
        <>
            <Table striped hover bordered variant="success">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>ServiceId</th>
                        <th>ServiceName</th>
                        <th>CustomerName</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pend.map((list, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{list._id}</td>
                                <td>{list.serviced}</td>
                                <td>{list.cname}</td>
                                <td>{list.rdate}</td>
                                <td>{list.status}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}
//  default Pending;