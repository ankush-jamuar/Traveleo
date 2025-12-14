import express from 'express'
const app=express()

//middleware
app.use(express.json())

import userRoute from "./routes/user.route.js";

app.use("/api", userRoute);

import healthRoute from './routes/health.route.js'


app.use('/api',healthRoute);
// test route
app.get('/',(req,res)=>{
    res.send('Traveleo backend is running 🚀')
})

export default app