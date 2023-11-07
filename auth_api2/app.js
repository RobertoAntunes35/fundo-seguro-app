import express from 'express'
import cors from 'cors'
import * as db from "./src/config/db/initialDate.js"
import UserRoute from "./src/modules/user/routes/UserRoute.js"
import checkToken from './src/config/auth/checkToken.js'

db.createInitialDate()

const app = express()
const env = process.env
const PORT = env.PORT || 8080 
 

app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(checkToken)

app.get("/api/status", (req, res) => {
    return res.status(200).json({
        service: "Auth-API",
        status: "up",
        httpStatus: 200,
    });
});

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}`);
});