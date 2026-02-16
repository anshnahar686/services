// import { Container } from "react-bootstrap"
import axios from "axios";
import { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Button, Tabs, Tab } from "react-bootstrap";
import { Link, useNavigate, useNavigation, useParams } from "react-router";

const New=()=>{
    const [pass,setpass]=useState({})
    const {email}=useParams()
    const navigate=useNavigate()
    console.log(email)
    const handlechange=(event)=>{
        const name=event.target.name
        const value=event.target.value
        setpass(values=>({...values,[name]:value}))
    }
    const submit=(event)=>{
        event.preventDefault()
           if (pass.npass === pass.rnpass) {
                axios.put(`http://localhost:8080/updatepassword/${email}`,pass).then((response)=>{
                    console.log(response)
                    if (response.data.status ===1 ) {
                            alert('Password is updated')
                            navigate('/')
                    } else {
                        
                    }
                })
           } 
    }
   
    return(
        <>
               <div style={{ width: "100%", height: "120vh", display: "flex" }}>
                <Container>
                    <Row style={{ marginTop: "40px" }} >
                        <Col sm={{ span: 4, offset: 4 }} style={{ border: "none", boxShadow: "0px 0px 10px #000000a3", outline: "none", borderRadius: "10px",height:"50vh"}} className="p-4">
                            <Form style={{paddingBlock:"50px" }} onSubmit={submit} >
                                <Form.Label>Enter the New Password</Form.Label>
                                <FloatingLabel label="NewPassword"  >
                                    <Form.Control type="password" placeholder="Enter the Password" name="npass" value={pass.npass ||""} onChange={handlechange}   />
                                </FloatingLabel>
                                <Form.Label className="mt-2">Re-Enter the Password</Form.Label>

                                <FloatingLabel label="Re-Password" >
                                    <Form.Control type="password" placeholder="Re-Enter the Password" name="rnpass"  className="mt-3" value={pass.rnpass ||""} onChange={handlechange}/>
                                </FloatingLabel>
                                <Button type="submit" className="mt-2">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default New