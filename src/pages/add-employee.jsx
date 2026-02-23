import axios from "axios";
import { useEffect, useState } from "react"
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap"
export const Employee = () => {
    const [handle, sethandle] = useState([]);
    const subitdata = (e) => {
        e.preventDefault();
        console.log(handle)
        handle.usertype="employee";
              axios.post('https://services-qtcu.onrender.com/register', handle).then((response) => {
                if (response.data.status === 1) {
                    alert(`${response.data.message}`)

                } else {
                    alert("some error occured")
                }
            })
  
    }
    const getdata = (e) => {
        const name = e.target.name;
        const data = e.target.value;
        sethandle(values => ({ ...values, [name]: data }))
    }
    return (

        <>
            <Row className="mb-3">
                <Col>
                    <Form onSubmit={subitdata}>
                        <Form.Label className="mb-2 mt-1">EmployeeName</Form.Label>
                        <FloatingLabel label="EmployeeName">
                            <Form.Control type="text" placeholder="Enter the Name" required name="employeename" onChange={getdata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2 mt-1">MobileNo</Form.Label>
                        <FloatingLabel label="Mobile No">
                            <Form.Control type="number" placeholder="Enter the MobileNo" required name="employeenumber" onChange={getdata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2 mt-1">EmailAddress</Form.Label>
                        <FloatingLabel label="EmailAddress">
                            <Form.Control type="email" placeholder="Enter the Email address" required name="bemail" onChange={getdata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2 mt-1">JobRole</Form.Label>
                        <Form.Select name="b_category" onChange={getdata}>
                        <option value="">Select the Bussiness Category</option>
                        <option value="Mobile Service">Mobile Service</option>
                        <option value="Bike  Service">Bike  Service</option>
                        <option value="Car Service">Car Service</option>
                        <option value="Electronic Service">Electronic Service</option>
                        </Form.Select>

                        <Form.Label className="mb-2 mt-1">Address</Form.Label>
                        <FloatingLabel label="Address">
                            <Form.Control type="text" placeholder="Enter the Address" name="address" onChange={getdata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2 mt-1">Password</Form.Label>
                        <FloatingLabel label="Password">
                            <Form.Control type="password" placeholder="Create the Password ofor the access" name="password" onChange={getdata} />
                        </FloatingLabel>
                        <Form.Label className="mb-2 mt-1">Re-enter Password</Form.Label>
                        <FloatingLabel label="Re-enter Password">
                            <Form.Control type="password" placeholder="Re-enter the Password" name="rpassword" onChange={getdata} />
                        </FloatingLabel>
                        <div className="d-grid gap-2 mb-2 mt-1">
                            <Button type="submit" variant="primary" size="lg">Submit</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
// export default Employee;