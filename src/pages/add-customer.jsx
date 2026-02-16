import axios from "axios";
import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap"

export const Customer=()=>{
    const [customerData,setData]=useState([]);

    const setdata=(e)=>{
        e.preventDefault();
        console.log("hello")
        const create=new Date()
        const update=new Date()
        const value={...customerData,status:'Active',createddate:create.toISOString().split('T')[0],updatedDate:update.toISOString().split('T')[0],otp:"0000"}
          
        // console.log(value)
        axios.post('http://localhost:8080/customer',value).then((response)=>{
                 if (response.data.status==1) {
                        alert( `${response.data.message}` )
                        
                 }
                 else
                 {
                    alert("some error has been occured")
                 }

        })
    }
    const takedata=(e)=>{
        const name=e.target.name;
        const datas=e.target.value;
        setData(values =>({...values,[name]:datas}))
       
    }
    return(
        <>
            <Row className="m-auto">
                <Col className="ms-3 me-3">
                    <Form className="mt-3" onSubmit={setdata}>
                        <Form.Label className="mb-2">CustomerName</Form.Label>
                       <FloatingLabel label="Customer Name">
                        <Form.Control type="text" placeholder="Enter the customer name" required name="cname" onChange={takedata} />
                       </FloatingLabel>
                       <Form.Label className="mb-2">E&#8211;mail</Form.Label>
                       <FloatingLabel label="EmailAddress">
                        <Form.Control type="email" placeholder="Enter the Email Address" required className="mb-2" name="caddress" onChange={takedata}/>
                       </FloatingLabel>
                       <Form.Label className="mb-2">MobileNo</Form.Label>
                       <FloatingLabel label="MobileNo">
                            <Form.Control type="number" placeholder="Enter the MobileNumber" required className="mb-2" name="cmnumber" onChange={takedata}/>
                       </FloatingLabel>
                       <Form.Label className="mb-2">Select the Services</Form.Label>
                       <Form.Select className="mb-2" name="serviced" onChange={takedata}>
                            <option value="">Select the Services</option>
                            <option value="first">firstService</option>
                            <option value="second">secondService</option>
                            <option value="third">thirdService</option>
                            <option value="fourth">fourthService</option>
                            <option value="fifth">FifthService</option>

                       </Form.Select>
                       <Form.Label className="mb-2">Amount</Form.Label>
                       <FloatingLabel label="Amount">
                                <Form.Control type="text"placeholder="Amount" name="cnumber" onChange={takedata}/>
                       </FloatingLabel>
                       <Form.Label className="mb-2">ServiceDescription</Form.Label>
                       <FloatingLabel label="ServiceDescription">
                        <Form.Control type="text" placeholder="Items given for the Service" name="serviceD" onChange={takedata}/>
                       </FloatingLabel>
                       <Form.Label className="mb-2">ReturnDate</Form.Label>
                       <FloatingLabel label="ReturnDate">
                            <Form.Control type="date" name="rdate" onChange={takedata}/>
                       </FloatingLabel>
                      <div className="d-grid gap-3" >
                        <Button type="submit" size="lg" variant="primary" className="mb-2" >clickme</Button>
                      </div>

                    </Form>
                </Col>
               
            </Row>
        </>
    )
}
