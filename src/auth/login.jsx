import { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Button, Tabs, Tab } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router";
import styles from './data.module.css'
import axios from 'axios';
import Forget from "./forgetpassword";
export const Login = () => {
    // const [load,setload]=useState(null)
    return (
        <>
            <div style={{ width: "100%", height: "100vh", display: "flex" }}>
                <Container>
                    <Row style={{ marginTop: "40px" }} >
                        <Col sm={{ span: 5, offset: 5 }} style={{ border: "none", boxShadow: "0px 0px 10px #000000a3", outline: "none", borderRadius: "10px", }} className="p-4">
                            <Tabs defaultActiveKey="login" id="signup" className="p-5" justify>
                                <Tab title="Login" eventKey="login" >
                                    <LoginForm />
                                </Tab>
                                <Tab title="Signup" eventKey="Signup">
                                    <Register />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
const LoginForm = () => {
    const usenav = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    function LoginHandler(e) {
        e.preventDefault();
        const datas = { username: username, password: password }
        console.log(datas)
        axios.post('https://services-qtcu.onrender.com/login', datas).then((response) => {
            console.log("data has been posted")
            console.log("response data:", response);
            if (response.data.status == 1) {

                localStorage.setItem("data", JSON.stringify(response.data))

                if (response.data.usertype.usertype === "admin") {
                    usenav('/dashboard')
                }
                else {
                    usenav('/Edashboard')
                }
                window.location.reload();

            }
            else {
                alert("unsuccessful login")
            }
        }).catch(function (error) {
            console.log(error);
        });

    }
    return (
        <>
            <Form>
                <Form.Label className="mt-3">Username</Form.Label>
                <FloatingLabel
                    controlId="floatingTextarea"
                    label="UserName"
                    className="mb-3"
                >
                    <Form.Control type="text" onKeyUp={(event) => setUsername(event.target.value)} placeholder="Enter the Username" />
                </FloatingLabel>
                <Form.Label className="mt-3" >Password</Form.Label>
                <FloatingLabel controlId="floatingTextarea" label="Password" >
                    <Form.Control type="password" onKeyUp={(event) => setPassword(event.target.value)} placeholder="Enter the password" required />
                </FloatingLabel>
                <Link to={'/forget'} style={{ textDecoration: "none", justifyItems: "center", fontSize: "1.2rem", marginLeft: ' 260px', color: "black", padding: '5px' }} className="mt-5">ForgotPassword?</Link>

                <Button variant="primary" type="submit" onClick={LoginHandler} className="mt-3 w-100">Submit</Button>
            </Form>
        </>
    )
}
const Register = () => {
    const [dataFild, setDataFild] = useState([]);
    const handlerSubmit = (event) => {
        event.preventDefault();

        console.log("send api data", dataFild);
        dataFild.usertype = "admin"
        console.log("send api data", dataFild);
        axios.post('https://services-qtcu.onrender.com/register', dataFild)
            .then(function (response) {
                console.log("data send by api", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const HandlerOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDataFild(values => ({ ...values, [name]: value }))
    }
    return (
        <>
            <Form onSubmit={handlerSubmit} >
                <Form.Label className="mt-2" >Select Bussiness Category</Form.Label>
                <FloatingLabel>
                    <Form.Select name="b_category" onChange={HandlerOnChange}>
                        <option value="">Select the Bussiness Category</option>
                        <option value="Mobile Service">Mobile Service</option>
                        <option value="Bike  Service">Bike  Service</option>
                        <option value="Car Service">Car Service</option>
                        <option value="Electronic Service">Electronic Service</option>
                    </Form.Select>
                </FloatingLabel>
                <Form.Label className="mt-2">Bussiness Name</Form.Label>
                <FloatingLabel label="Bussiness Name">
                    <Form.Control name="employeename" type="text" onChange={HandlerOnChange} placeholder="Enter the Bussiness Name" />
                </FloatingLabel>

                <Form.Label className="mt-2">Email Address</Form.Label>
                <FloatingLabel label="Email">
                    <Form.Control type="email" name="bemail" onChange={HandlerOnChange} placeholder="Enter the Email" />
                </FloatingLabel>
                <Form.Label className="mt-2">Create Password</Form.Label>
                <FloatingLabel label="password">
                    <Form.Control type="password" name='password' onChange={HandlerOnChange} placeholder="Create Password" />
                </FloatingLabel>
                <Form.Label className="mt-2">Re-Enter Password</Form.Label>
                <FloatingLabel label="Re-Enter Password">
                    <Form.Control type="password" name='rpassword' onChange={HandlerOnChange} placeholder="Re-Enter Password" />
                </FloatingLabel>

                <Button type="Submit" variant="primary" className="w-100 mt-3" >Submit</Button>
            </Form>
        </>
    )
}
// export default Login;