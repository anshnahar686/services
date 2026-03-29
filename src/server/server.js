const { MongoClient, Collection, ObjectId, BSONType } = require('mongodb');
const multer = require("multer");
// const path = require("node:path");
const uri = "mongodb+srv://anshnahar686_db_user:nahar123@cluster0.qwwjk5t.mongodb.net/?appName=Cluster0/services"
const client = new MongoClient(uri);
const express = require('express')
const twilio = require('twilio')
const otp = Math.floor(Math.random() * 9000) + 1000;
console.log(otp)
const app = express()
// const { ObjectId } = require('mongodb');
const mailer = require('nodemailer');
const path=require('path')
app.use(express.urlencoded({extended:true}))
const transporter = mailer .createTransport({
    service: 'gmail',
    auth: {
        user: 'anshnahar686@gmail.com',
        pass: 'dihq kgts ntef gcbh'
    }

});
const storage=multer.diskStorage({
    destination:'../../public/images/',
     filename:(req,file,cb )=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
     }
})
const upload=multer({
    storage:storage,
    limits:{fileSize: 10 * 1024 * 1024},
    fileFilter:(req,file,cb)=>{
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
          } else {
            return cb(new Error("Only images and PDFs are allowed!"));
          }
    
    }
})
app.use(express.json());
// Enable cors at the server side. 
const cors = require('cors');
const { count } = require('node:console');
const { json, text } = require('node:stream/consumers');
const { title } = require('node:process');
const corsOption = {
    origin: ['http://localhost:3000','https://serverice-frontend.onrender.com/'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors("*"));
const port = 8080;
app.get('/alldata', async (req, res) => {
    await client.connect();
    const db = client.db('services');
    const database = db.collection('login');
    const data = await database.find().toArray()
    res.json(data);
})
app.get('/alldata/:userid', async (req, res) => {
    const id = req.params.userid;
    const { ObjectId } = require('mongodb');
    const userid = new ObjectId(id);
    await client.connect();
    const db = client.db('services');
    const database = db.collection('login');
    const data = await database.findOne({ _id: userid });
    res.json(data);
})
app.post('/register', async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log('Received data:', req.body);

        // Respond with the received data as JSON
        // res.json(req.body);
        await client.connect()
        const db = client.db('services');
        const database = db.collection('login');
        const data = await database.insertOne(req.body);
        res.json({ status: 1, message: "data is sent" });
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.post('/login', async (req, res) => {
    let values = req.body;
    await client.connect();
    const db = client.db('services');
    const database = db.collection('login');
    const data = await database.findOne({ 'bemail': values.username })
    if (values.password === data.password) {

        res.json({ status: 1, usertype: data })

    } else {
        res.json({ status: 0, message: "error" })

    }
    // res.json(data);
})
app.post('/customer', async (req, res) => {
    try {
        await client.connect()
        const db = client.db('services')
        const table = db.collection('customer');
        await table.insertOne(req.body)
        const maileroptions = {
            from: 'anshnahar686@gmail.com',
            to: `${req.body.caddress}`,
            subject: 'Bill for the Service',
            html: `<div style="display: block; justify-content: center; align-items: center;border: 1px solid black;width:100%; ">
           <h1>Company Name</h1><br/> 
            <table  style="padding: 5px; width: 100%; height: fit-content; border-collapse: separate;
            border-spacing: 5px;padding: 10px;
           " >
                <tr>
                    <td>Name</td>
                    <td>${req.body.cname}</td>
                </tr>
                <tr>
                    <td>Mobile</td>
                    <td>${req.body.cmnumber}</td>
                </tr>
                <tr>
                    <td>Services</td>
                    <td>${req.body.serviced}</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>${req.body.cnumber}</td>
                </tr>
                <tr>
                    <td>Return Date</td>
                    <td>${req.body.rdate}</td>
                </tr>
            </table>
     </div>`
        }
        emailsender(maileroptions);
        res.json({ status: 1, message: "data is entered" })
    } catch (error) {
        console.log("error")
    }
})
const emailsender = (maileroptions) => {
    transporter.sendMail(maileroptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    })

}
app.get('/list', async (req, res) => {
    await client.connect();
    const db = client.db('services')
    const cdata = db.collection('customer');
    const result = await cdata.find().toArray()
    res.json(result)
})
app.get('/delaytask', async (req, res) => {
    await client.connect()
    const db = client.db("services")
    const task = db.collection('customer');
    const result = await task.aggregate([{
        $match: { status: "pending" }
    }]).toArray()
    console.log(result)
    res.json(result)
})

app.get('/updatecustomerdata/:id', async (req, res) => {
    await client.connect();
    const db = client.db('services')
    const task = db.collection('customer')
    const ids = req.params.id;
    const userid = new ObjectId(ids)
    const result = await task.findOne({ _id: userid })

    res.json(result)
})
app.post('/updatecdata/:id', async (req, res) => {
    await client.connect();
    const db = client.db('services')
    const collect = db.collection('customer')
    const name = req.body;
    const ids = req.params.id;
    const userid = new ObjectId(ids)
    const findvalue = { _id: userid }
    const newvalue = { $set: name }
    const result = await collect.updateOne(findvalue, newvalue);
    if (result.modifiedCount > 0) {
        res.send({ success: true, message: "Data has been updated" });
    } else {
        res.status(404).send({ success: false, message: "No matching record found" });
    }

})
app.get('/empdata/:id', async (req, res) => {
    await client.connect();
    const db = client.db('services')
    const data = db.collection('login')
    const ids = req.params.id;
    const userids = new ObjectId(ids)
    const respos = await data.findOne({ _id: userids })
    res.json(respos)
})
app.post('/service', async (req, res) => {
    await client.connect();
    const db = client.db('services');
    const data = db.collection('services');
})
app.get('/cusotmerdata', async (req, res) => {
    await client.connect();
    const db = client.db('services');
    const data = db.collection('customer')
    const totalcustomer = await data.aggregate([{
        $count: "totalcustomer"
    }]).toArray();
    const active = await data.aggregate([
        {
            $match: { status: "Active" }
        },
        { $count: "activeusers" }
    ]).toArray()
    const delay = await data.aggregate([{
        $match: { status: "delayed" }
    },
    { $count: "delayusers" }

    ]).toArray()
    const complete = await data.aggregate([{
        $match: { status: "completed" }
    },
    { $count: "completedusers" }
    ]).toArray()
    const jsondata = { ...totalcustomer[0], ...active[0], ...delay[0], ...complete[0] };
    res.json(jsondata)
})
app.get('/detalis', async (req, res) => {
    client.connect();
    const db = client.db('services')
    const data = db.collection('customer')
    const look = await data.aggregate([{
        $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "cid",
            as: "servicesdetails"
        }
    }]).toArray()
    res.json(look)
})
app.put('/updatee/:id', async (req, res) => {
    try {
        await client.connect()
        const db = client.db('services')
        const collect = db.collection('login')
        const ids = req.params.id;
        const name = req.body;
        const useid = new ObjectId(ids)
        const findvalue = { _id: useid }
        const newvalue = { $set: name }
        const result = await collect.updateOne(findvalue, newvalue)
        const newresult= await collect.findOne(findvalue)
        console.log(newresult)
        console.log(result)
        res.json({ status: 1, message: "data has been updated",datax:newresult })
    }
    catch {
        console.log("some error has been occured")
    } finally {
        client.close();
    }
})
app.get('/today', async (req, res) => {
    await client.connect()
    const db = client.db('services')
    const table = db.collection('customer')
    const count = await table.aggregate([
        { $match: { status: "Active" }, }
    ]).toArray()
    console.log(count)
    res.json({ message: "current user", data: count })
})
app.get('/delay', async (req, res) => {
    await client.connect();
    const db = client.db('services');
    const table = db.collection('customer')
    const count = await table.aggregate([{
        $match: { status: 'delayed' }
    }]).toArray()
    res.json(count)
})
app.get('/complete', async (req, res) => {
    try {
        await client.connect()
        const db = client.db('services')
        const collect = db.collection('customer')
        const result = await collect.aggregate([{
            $match: { status: "completed" }
        }]).toArray()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.post('/forget', async (req, res) => {
    await client.connect()
    const db = client.db('services')
    const collect = db.collection('login')
    const data = req.body
    const result = await collect.aggregate([{
        $match: { bemail: data.cemail, usertype: 'admin' }
    }]).toArray()
    // console.log(result)
    if (result[0].bemail == data.cemail) {
        const options = {
            from: 'anshnahar686@gmail.com',
            to: data.cemail,
            subject: "Our OTP Verification Code",
            html: ` <strong><p>Dear ${result[0].employeename} ,<br/></strong>
                    We’ve received a request to verify your identity. To complete the process, please use the One-Time Password (OTP) below:<br/>
                    OTP Code:${otp}<br/>
                    This code is valid for the next 10 minutes. Please ensure that you enter it accurately. If you did not request this, please ignore this email.
                    For any issues, feel free to reach out to our support team.
                    Thank you,
                     </p>`
        }
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log(info)
            }
        })
        res.json({ status: 1, message: 'Email is  found' })

    } else {
        res.json({ status: 0, message: "Email is not found" })
    }
})
app.post('/opt/:email', async (req, res) => {
    const data = req.body
    // console.log(data)
    if (Number(data.otp) === otp) {
        res.json({ status: 1, message: "OTP is Verified" })
    } else {
        res.json({ status: 0, message: "OTP is not  Verified" })

    }
})
app.put('/updatepassword/:email', async (req, res) => {
    const email = req.params.email
    await client.connect()
    const db = client.db('services')
    const newdata = req.body
    // console.log(newdata)
    const collection = db.collection('login')
    const result = await collection.find({ bemail: email }).toArray()
    console.log(result)
    if (email == result[0].bemail && result[0].usertype == 'admin') {
      
        const setdata =  { $set: {password:newdata.npass,rpassword:newdata.rnpass } };
        const resus = await collection.updateOne({ bemail: email }, setdata)
        console.log(result)
        if (resus.modifiedCount > 0) {
     
            console.log(email);
            const maileroptions = {
                from: 'anshnahar686@gmail.com',
                to: result[0].bemail,
                subject: "Your New Password",
                html: `<strong><p>Dear ${result[0].employeename} ,<br/></strong>
                  We received a request to reset your password. Below are your new login credentials:<br/>
                          Username:${result[0].employeename}<br/>
                          New Password:${result[0].password}<br/>
                          Please use the new password to log in to your account. If you did not request this password reset, please contact us immediately to secure your account.
                         For your security, we recommend changing your password once you log in.<br/>
                        If you have any questions or need further assistance, feel free to reach out to us.<br/>
                            Thank you,
                             </p>`
            }

            transporter.sendMail(maileroptions,(error,info)=>{
                if (error) {
                    console.log(error)    
                }
                else
                {
                    console.log(info)
                }
            })
            res.json({status:1,message:"Password has been updated"})
        }
        else {
            res.json({ status: 0, message: "Server error is occured" })
        }
    }
})
app.post('/upload',upload.single('file'),async(req,res)=>{
    try{
   
         console.log(req.file);
        res.json({ message: "Files uploaded successfully", status:1,filedata:req.file})
   
    }
     catch(error){
        console.log(error)
     }
} )
app.post('/addservice',async(req,res)=>{
    try {
        await client.connect()
        const db=client.db('services')
        const collection=db.collection('service')
        const name=req.body;
        const data=collection.insertOne(name)
        res.json({status:1,message:"Service is inserted"})
    } catch (error) {
        console.log(error)
    }
})
app.get('/data',async(req,res)=>{
    try {
            await client.connect()
            const db=client.db('services')
            const collection=db.collection('service')
            const result=await collection.find().toArray()
            console.log(result)
            res.json({data:result})
    } catch (error) {
        console.log(error)
    }
})
app.use('/send',express.static('send'))
app.listen(port, async () => {
    try {
        await client.connect();
        const db = client.db('services');
        console.log("database is connected")
        
        await db.createCollection('data', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ['servicename', 'serviceamount', 'image'],
                    properties: {
                        servicename: {
                            bsonType: 'string',  // Corrected this from 'object' to 'string'
                            description: "must be a string and is required"
                        },
                        serviceamount: {
                            bsonType: 'int',
                            description: "must be a positive number",
                            minimum: 0
                        },
                        image: {  // Corrected typo here from 'imagage' to 'image'
                            bsonType: 'string',
                            description: "must be a string and is required"
                        },
                    }
                }
            }
        });

        

    } catch (error) {
        console.log(error);
    }

    console.log(`Server is started at ${port}`);
    
});
