import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { data } from "react-router"

export const Delay = () => {
    const [del, setdel] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/delay').then((response) => {
            console.log(response)
            setdel(response.data)
        })
    }, [])
    return (
        <>
            <Table striped bordered variant="success" className="mt-2">
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
                        del.map((list, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{list._id}</td>
                                <td>{list.serviced}</td>
                                <td>{list.cname}</td>
                                <td>{list.rdate}</td>
                                <td>{
                                            new Date(list.rdate)>new Date()?"pending":"Delay"
                                    }</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}
// export default Delay;