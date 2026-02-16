import { Button, Col, Row, Table } from "react-bootstrap";
import emp from '../images/employee.jpeg'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
// import axios from "axios";
export const EDashboard = () => {
    const [empdata,setemp]=useState(JSON.parse(localStorage.getItem('data')))
    // const {params}=useParams()
    // console.log(params)
    useEffect(()=>{
        // console.log("edashboard",JSON.parse(localStorage.getItem('datas')))
        // axios.get()
        // setemp()
    },[])
    console.log(empdata)
    return (
        <>
            <Row >
                <Col sm={4} >
                    <img src={emp} style={{ width: "100%", height: "100%" }} />
                </Col>
                <Col sm={8} >
                    <h1>Personal Detalais</h1>
                    <Table hover style={{ margin: "30px, 10px" }}  >
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{empdata.usertype.employeename}</td>
                            </tr>
                            <tr>
                                <td>Number</td>
                                 <td>{empdata.usertype.employeenumber

                                }</td> 
                            </tr>
                            <tr>
                                <td>Id</td>
                                <td>{empdata.usertype._id}</td>
                            </tr>
                            <tr>
                                <td>Job role</td>
                                <td>{empdata.usertype.b_category}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{empdata.usertype.address}</td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>{empdata.usertype.password}</td> 
                            </tr>
                            <tr>
                                 <td>Email</td>
                                <td>{empdata.usertype.bemail}</td> 
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col sm={4} style={{ padding: "5px", textAlign: "center" }}>
                    <h4>{empdata.usertype.employeename}</h4>
                    <h4>{ empdata.usertype.b_category}</h4>
                    <div style={{ padding: "5px", textAlign: "center" }}  className="d-grid gap-2" >
                     <Button variant="primary" size="lg"><Link to={`/updateemployee/${empdata.usertype._id}`} style={{color:"white",textDecoration:"none"}}>updateProfile</Link></Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default EDashboard;
