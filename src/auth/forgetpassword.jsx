// import { FloatingLabel, Form } from "react-bootstrap"
import axios from "axios";
import { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Button, Tabs, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
const Forget = () => {
    const [email,setmail]=useState()
    const nav=useNavigate()
    const handlechange=(e)=>{
            const name=e.target.name
            const value=e.target.value;
            console.log(name)
            setmail(valuse =>({...valuse,[name]:value}))
    }
    const verifyemail=(e)=>{
        e.preventDefault()
        console.log(email)
        axios.post('https://services-qtcu.onrender.com/forget',email).then((response)=>{
            console.log(response)
            if(response.data.status == 1)
            {
                alert('OTP is send to the registered E-mail')
                nav(`/otp/${email.cemail}`)
            }
            else
            {
                alert(response.data.message)
            }
        })
    }
    return (
        <>
            <div style={{ width: "100%", height: "100vh", display: "flex" }}>
                <Container>
                    <Row style={{ marginTop: "40px" }} >
                        <Col sm={{ span: 4, offset: 4 }} style={{ border: "none", boxShadow: "0px 0px 10px #000000a3", outline: "none", borderRadius: "10px",height:"50vh"}} className="p-4">
                            <Form style={{paddingBlock:"100px" }} onSubmit={verifyemail}>
                                <Form.Label>Enter the Registered Email</Form.Label>
                                <FloatingLabel label="Email"  >
                                    <Form.Control type="email" placeholder="Enter the Registered Email" name="cemail"  onChange={handlechange} />
                                </FloatingLabel>
                                <Button type="submit" className="mt-5" >Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
export default Forget;