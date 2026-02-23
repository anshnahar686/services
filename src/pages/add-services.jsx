
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Form, Table, Button } from 'react-bootstrap';
export const AddServices = () => {
  const ser = [{ serviceName: "first", amount: 294, file: "//dfdssd" }, { serviceName: "second", amount: 394, file: "//ddsffdssd" }, { serviceName: "third", amount: 322, file: "///dfdssd" }, { serviceName: "fourth", amount: 2934, file: "///dfdssd" }]
  const [data, setdata] = useState({})
  const [file, setfile] = useState()
  const [result, setresult] = useState([])
  const getservice = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdata(values => ({ ...values, [name]: value }))
  }
  const setservice = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    axios.post('https://services-qtcu.onrender.com/upload', formData).then((response) => {
      // console.log()
      if (response.data.status == 1) {
        console.log(response.data.filedata.originalname)
        console.log(data)
        console.log(response.data.filedata.path)
        const result = { ...data, pathname: response.data.filedata.path, filename: response.data.filedata.originalname }
        axios.post('https://services-qtcu.onrender.com/addservice', result).then((response) => {
          if (response.data.status == 1) {
            // alert('Services is Added')
            console.log("service are added")
          } else {

          }
        })
      }
    })
  }
  useEffect(() => {
    axios.get('https://services-qtcu.onrender.com/data').then((response) => {
      setresult(response.data.data)
      console.log(response)
    })
  }, [])
  return (
    <>

      <Row>
        <Col md={12}>
          <Form onSubmit={setservice}>
            <Form.Label>ServiceName</Form.Label>
            <Form.Control placeholder="Service name" className='mb-3' name='servicename' onChange={getservice} />
            <Form.Label>ServiceAmount</Form.Label>
            <Form.Control placeholder="Amount" className='mb-3' name='serviceamount' onChange={getservice} />
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Large file input example</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e) => { setfile(e.target.files[0]) }} name='imgage' />
            </Form.Group>
            <Button type='submit' variant='primary' size='lg'>Submit</Button>
          </Form>
        </Col>
        <Col><br/><br/>
          <Table striped="columns" variant='success' hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>ServiceName</th>
                <th>Amount</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                result.map((data, index) =>
                  <tr key={index}>
                    <td>{data._id}</td>
                    <td>{data.servicename}</td>
                    <td>{data.serviceamount}</td>
                    <td>{data.filename}</td>

                  </tr>
                )
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
export default AddServices;