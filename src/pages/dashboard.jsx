import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, Row, NavDropdown, Navbar, Card, ListGroup, ListGroupItem, ProgressBar } from "react-bootstrap";
import first from '../images/growth-chart.png'
import second from '../images/currency.png'
import third from '../images/user.png'
import fourth from '../images/expenses.png';
import fifth from '../images/message.png'
import sixth from '../images/client.png'
import axios from "axios";
export const Dashboard = () => {
    const [dataJson,setDataJson]=useState({});
     useEffect(()=>{
        axios.get('http://localhost:8080/cusotmerdata').then((response)=>{
            console.log(response.data)
            setDataJson(response.data)
        })
    },[])
    const data = [{ image: second, label: "Delayed Services", value: dataJson.delayusers }, { image: third, label: "Active Services", value: dataJson.activeusers }, { image: first, label: "totalcustomer", value: dataJson.totalcustomer }, { image: first, label: "CompletedCustomer", value: dataJson.completedusers }]
  
    const loginUser = localStorage.getItem('loginUser');
    return (
        <>
           <Row>
                {
                    data.map((item,id) =>
                        <Col sm={3} key={id}>
                            <Card>
                                <Card.Body style={{ margin: "0px auto", textAlign: "center" }}>
                                    <img src={item.image} style={{ width: "50px", height: "50px" }} />
                                    <p style={{ fontSize: "0.5rem" }}><strong>{item.label}</strong></p>
                                    <p style={{ fontSize: "0.5rem" }}>{item.value}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </Row>
            <Row>

                {/* <Col sm={12}>
                    <Row className="mt-5">
                        <Col sm={4}>
                            <Card>
                                <Card.Body style={{ margin: "0px auto", textAlign: "center" }}>
                                    <img src={fifth} alt="" srcset="" style={{ width: "50%", height: "50%" }} />
                                    <p>Message</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Body style={{ margin: "0px auto", textAlign: "center" }}>
                                    <img src={sixth} alt="" srcset="" style={{ width: "50%", height: "50%" }} />
                                    <p>Message</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>

                                <Card.Body style={{ margin: "0px auto", textAlign: "center" }} >
                                    <img src={fourth} style={{ width: "50%", height: "50%" }} />
                                    <p>Message</p>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Col> */}
                <Col sm={12}>
                <ListGroup style={{ padding: "10px" }}>
                            <ListGroup.Item>
                                <p style={{ display: "inline", paddingRight: "160px" }}>TotalCustomer</p>
                                <p style={{ display: "inline-block",fontWeight:"bold" }}>{dataJson.totalcustomer } </p>
                                <ProgressBar variant="primary" now={dataJson.totalcustomer } striped animated label={`${dataJson.totalcustomer }`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p style={{ display: "inline", paddingRight: "145px" }}>Active Services</p>
                                <p style={{ display: "inline-block",fontWeight:"bold" }}>{`${ dataJson.activeusers }`}</p>
                                <ProgressBar variant="success" now= {dataJson.activeusers } striped animated label={`${dataJson.activeusers }`}  />  
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p style={{ display: "inline", paddingRight: "140px" }}>Completedusers</p>
                                <p style={{ display: "inline-block",fontWeight:"bold" }}>{`${dataJson.completedusers}`}</p>
                                <ProgressBar variant="info" now={dataJson.completedusers} striped animated label={`${dataJson.completedusers}`}  />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p style={{ display: "inline", paddingRight: "130px ",textAlign:"end" }}>PendingCustomer</p>
                                <p style={{ display: "inline-block",fontWeight:"bold" }}>{`${dataJson.delayusers}`}</p>
                                <ProgressBar variant="danger" now={dataJson.delayusers} striped animated label={`${dataJson.delayusers }`}  />
                            </ListGroup.Item>
                        </ListGroup>
                </Col>
            </Row>



        </>
    );

}
// export default Dashboard;