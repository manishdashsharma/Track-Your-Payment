import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./src/routes/index.js"
import { connectToDb } from "./src/config/db.js"
import config from "./src/config/index.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

app.use("/api/v1/", routes)

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.get("/", (req, res) => {
    return res.status(200).json({ 
        success: true,
        message: "Backend services are running fine" 
    });
})

const onListening = () => {
    console.log(`Listening on port ${config.PORT}`);
};

connectToDb().then(()=>{
    app.listen(config.PORT, onListening);
}).catch((error) => {
    return { error: 'Failed to connect to DB' }
});