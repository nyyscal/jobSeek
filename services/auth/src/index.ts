import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

app.listen(process.env.PORT,()=>{
  console.log(`Auth service is running on htpp://localhost:${process.env.PORT}`)
})

