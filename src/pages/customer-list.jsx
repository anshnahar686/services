import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Link } from "react-router"

export const List = () => {
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.get('https://services-qtcu.onrender.com/list').then((response) => {
            
            if (response != null && response?.data) {
                setlist(response.data)
                console.log(list)
            }
        })
    }, [])
    return (
        <>
            <Table striped hover variant="success">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>MobileNo</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>ReturnDate</th>
                        <th>Update Profile</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((data, index) =>

                            <tr>
                                <td>{index + 1}</td>
                                <td>{data.cname}</td>
                                <td>{data.caddress}</td>
                                <td>{data.cmnumber}</td>
                                <td>{data.cnumber}</td>
                                <td>{data.serviceD}</td>
                                <td>{data.rdate}</td>
                                <td><Button><Link to={`/updateprofile/${data._id}`}style={{textDecoration:"none",color:"whitesmoke"}}>update profile</Link></Button></td>
                            </tr>

                        )
                    }

                </tbody>
            </Table>
        </>
    )
}
