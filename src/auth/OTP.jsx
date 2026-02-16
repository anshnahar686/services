
import axios from "axios";
import { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Button, Tabs, Tab, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
// import this from 
const CheckOTp=(props)=>{
    const {email}=useParams()
    const [data,setdata]=useState('')
    const [first,setfirts]=useState({})
    const[otp,setotp]=useState(null)
    const nac= useNavigate()
    const handlechange=(e)=>{
            const name=e.target.name
            const value=e.target.value
            setfirts(values =>({...values,[name]:value}));
          
    }
    const handle=(e)=>{
        e.preventDefault()
        const otps=first.first+first.second+first.third+first.fourth;
        console.log(otps)
        setdata(otps)
        const obj={otp:otps}
        console.log(obj)
        axios.post(`http://localhost:8080/opt/${email}`,obj).then((response)=>{
            console.log(response)
            if (response.data.status ==1) {
                    nac(`/updatepassword/${email}`)
            } else {
                alert(response.data.message)
                    nac('/forget')
            }
        })
    }
    return(
        <>
 <div style={{ width: "100%", height: "100vh", display: "flex" }}>
                <Container>
                    <Row style={{ marginTop: "40px" }} >
                        <Col sm={{ span: 4, offset: 4 }} className="p-4">
                                <Card>
                                    <Card.Header style={{border:"none",textAlign:"center",}}> 
                                            <h3>OTP Verification</h3>
                                    </Card.Header>
                                    <Card.Body  >
                                        <input type="text" style={{width:"40px",height:"40px",margin:"20px",borderRadius:"10px" }} onChange={(e)=>handlechange(e)} name="first"  />
                                        <input type="text" style={{width:"40px",height:"40px",margin:"20px",borderRadius:"10px"}} onChange={(e)=>handlechange(e)} name="second"/>
                                        <input type="text" style={{width:"40px",height:"40px" ,margin:"20px",borderRadius:"10px"}} onChange={(e)=>handlechange(e)} name="third"/>
                                        <input type="text" style={{width:"40px",height:"40px" ,margin:"20px",borderRadius:"10px"}} onChange={(e)=>handlechange(e)} name="fourth"/>
                                        <div className="d-grid gap-2">
                                        <Button variant='primary' size="lg" type="submit" onClick={handle}>Submit</Button>    
                                        </div>
                                    </Card.Body>
                                </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default CheckOTp;