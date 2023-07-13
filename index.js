const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


// meadile wear 
app.use(cors())
app.use(express.json())







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1izglfl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const userCollactions = client.db("UserManamentDB").collection("users");




        app.post('/adduser', async (req, res) => {
            const adduser = req.body;
            const result = await userCollactions.insertOne(adduser)

            res.send(result)
        })

        app.get('/allusers', async (req, res) => {
            const result = await userCollactions.find().toArray()
            res.send(result)
        })



       


        app.get('/edit/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: new ObjectId(id) }
            try {
                const result = await userCollactions.findOne(qurey);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })
        app.get('/singledata/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: new ObjectId(id) }
            try {
                const result = await userCollactions.findOne(qurey);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })




        app.put("/edit/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const Updateduser = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateToy = {
                $set: {
                    name: Updateduser.name,
                    email: Updateduser.email,
                    phone: Updateduser.phone,

                },
            }
            try {
                const result = await userCollactions.updateOne(filter, updateToy, options)
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })






        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;

            const qurey = { _id: new ObjectId(id) }
            console.log(qurey)
            try {
                const result = await userCollactions.deleteOne(qurey);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })




        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get("/", (req, res) => {
    res.send('user managemnt is runnig')

})


app.listen(port, () => {
    console.log(` managemnt listening on port ${port}`)
})