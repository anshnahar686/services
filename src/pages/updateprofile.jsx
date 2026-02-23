import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";

const UpdateCustomer = (props) => {
    const [updatedata, setupdatecustomer] = useState([]);
    const { id } = useParams();
    const [customer, setcustomer] = useState([]);
    console.log(id)
    useEffect(()=>{
            axios.get(`https://services-qtcu.onrender.com/updatecustomerdata/${id}`).then((response)=>{
                setupdatecustomer(response.data)
                console.log(customer)
            })
    },[])
    
    const setupdatedata = (e) => {
        e.preventDefault();
        // console.log("hello")
        console.log(delete updatedata._id);
        const update=new Date()
        updatedata.updatedDate=update.toISOString().split('T')[0]
        console.log(updatedata)   
        axios.post(`https://services-qtcu.onrender.com/updatecdata/${id}`,updatedata).then((response)=>{
            console.log(response.data)
         }).catch((err)=>{
             console.log(err)
         })
    }
    const takedata = (e) => {
        const name = e.target.name;
        const datas = e.target.value;
         setupdatecustomer(values => ({ ...values, [name]: datas }))

    }
    console.log(updatedata)
    return (
        <>
            <Row className="m-auto">
                <Col className="ms-3 me-3">
                    <Form className="mt-3" onSubmit={setupdatedata}>
                        <Form.Label className="mb-2">CustomerName</Form.Label>
                        <FloatingLabel label="Customer Name">
                            <Form.Control type="text" placeholder="Enter the customer name"  required name="cname" value={updatedata.cname} onChange={takedata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2">E&#8211;mail</Form.Label>
                        <FloatingLabel label="EmailAddress">
                            <Form.Control type="email" placeholder="Enter the Email Address" required className="mb-2" name="caddress"  value={updatedata.caddress}  onChange={takedata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2">MobileNo</Form.Label>
                        <FloatingLabel label="MobileNo">
                            <Form.Control type="number" placeholder="Enter the MobileNumber" required className="mb-2" name="cmnumber" onChange={takedata}  value={updatedata.cmnumber}/>
                        </FloatingLabel>
                        <Form.Label className="mb-2">Select the Services</Form.Label>
                        <Form.Select className="mb-2" name="serviced" onChange={takedata} value={updatedata.serviced}>
                            <option value="">Select the Services</option>
                            <option value="first">firstService</option>
                            <option value="second">secondService</option>
                            <option value="third">thirdService</option>
                            <option value="fourth">fourthService</option>
                            <option value="fifth">FifthService</option>
                        </Form.Select>
                        <Form.Label className="mb-2">Amount</Form.Label>
                        <FloatingLabel label="Amount">
                            <Form.Control type="text" placeholder="Amount" name="cnumber" onChange={takedata}  value={updatedata.cnumber} />
                        </FloatingLabel>
                        <Form.Label className="mb-2">ServiceDescription</Form.Label>
                        <FloatingLabel label="ServiceDescription">
                            <Form.Control type="text" placeholder="Items given for the Service" name="serviceD" onChange={takedata}  value={updatedata.serviceD}/>
                        </FloatingLabel>
                        <Form.Label className="mb-2">ReturnDate</Form.Label>
                        <FloatingLabel label="ReturnDate">
                            <Form.Control type="date" name="rdate" onChange={takedata} value={updatedata.rdate} />
                        </FloatingLabel>
                        <Form.Label>Current Status</Form.Label>
                        <Form.Select className="mb-2" name="status" onChange={takedata} value={updatedata.serviced}>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="delayed">Delayed</option>
                            <option value="completed">Completed</option>
                            <option value="deleted">Deleted</option>
                        </Form.Select>
                        <div className="d-grid gap-3" >
                            <Button type="submit" size="lg" variant="primary" className="mb-2" >Update profile</Button>
                        </div>

                    </Form>
                </Col>

            </Row>
        </>
    )
}
export default UpdateCustomer;