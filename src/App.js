import './App.css';
// import Login from './auth/login';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, Row, NavDropdown, Navbar, Card, ListGroup, ListGroupItem, ProgressBar } from "react-bootstrap";
// import Today from './auth/employee';
import { AddServices, Dashboard, Customer, Employee, Delay, Complete, Pending, Logout, EDashboard, List, Page } from './pages';
import { Today, Login } from './auth';
import UpdateCustomer from './pages/updateprofile';
import UpdateEmp from './pages/updateemp';
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store";
import Forget from './auth/forgetpassword';
import CheckOTp from './auth/OTP';

import New from './auth/newpassword';
function App() {
  const [loginType, setUserType] = useState(JSON.parse(localStorage.getItem('data')));
   
  return (
  
    <BrowserRouter>
            
      {loginType &&
        <>
          <Container fluid className="mb-3">
            <Navbar bg="dark" data-bs-theme="dark">
              <Container>
                <Navbar.Brand href="#home">
                  Service Mang..
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Container>
          <Container>
            <Row>
              <Col sm={3}>
                {loginType.usertype.usertype === "admin" && 
                  <Card className="mb-3" >
                    <ListGroup as="ul" variant="dark">
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={'/dashboard'} style={{ textDecoration: "none", color: "white" }} >Dashboard</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={'/add-customer'} style={{ textDecoration: "none", color: "white" }}>Add Customer</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={"/database"} style={{ textDecoration: "none", color: "white" }}>Customers</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={"/add-employee"} style={{ textDecoration: "none", color: "white" }}>Add Employee</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={"/add-service"} style={{ textDecoration: "none", color: "white" }}>Add Services</Link></ListGroup.Item>
                     <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={"/logout"} style={{ textDecoration: "none", color: "white" }}>Logout</Link></ListGroup.Item>
                    </ListGroup>
                  </Card>
} 
  {             loginType.usertype.usertype === "employee" &&
                  <Card>
                    <ListGroup as="ul" >
                      <ListGroup.Item as="li" style={{ background: "#000000c7", color: "white", padding: "20px" }}><Link to={'/Edashboard'} style={{ textDecoration: "none", color: "white" }}> Dashboard</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={'/today'} style={{ textDecoration: "none", color: "white" }}>Today Task</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={'/delay'} style={{ textDecoration: "none", color: "white" }}>Delay Task</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={'/complete'} style={{ textDecoration: "none", color: "white" }}>Complete Task</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={'/pending'} style={{ textDecoration: "none", color: "white" }}>Pending Task</Link></ListGroup.Item>
                      <ListGroup.Item as="li" style={{ backgroundColor: "#000000c7", color: "white", padding: "20px" }}><Link to={"/logout"} style={{ textDecoration: "none", color: "white" }}>Logout</Link></ListGroup.Item>

                    </ListGroup>
                  </Card>
                }
              </Col>
              <Col sm={9}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path='/add-service' element={<AddServices />} />
                  <Route path='/add-customer' element={<Customer />} />
                  <Route path='/database' element={<List />} />
                  <Route path='/add-employee' element={<Employee />} />
                  <Route path='/today' element={<Today />} />
                  <Route path='/delay' element={<Delay />} />
                  <Route path='/complete' element={<Complete />} />
                  <Route path='/pending' element={<Pending />} />
                  <Route path='/logout' element={<Logout />} />
                  <Route path='/Edashboard' element={<EDashboard />} />
                  <Route path='/updateprofile/:id' element={<UpdateCustomer/>} />
                  <Route path ='/updateemployee/:id' element={<UpdateEmp/>}/> 
    
                </Routes>
              </Col>
            </Row>

          </Container>
        </>
      }
      {loginType == null &&
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path ='/forget' element={<Forget/>}/> 
          <Route path='/otp/:email' element={<CheckOTp/>}/>
          <Route path='/updatepassword/:email' element={<New/>}/>


          

        </Routes>
      }


    </BrowserRouter>

  );
}

export default App;
