import app from "./app"
import { config } from "dotenv"

config()

let port: string

if(process.env.PORT){
    port = process.env.PORT
}else{
    port = "5000"
}

app.listen(parseInt(port), '0.0.0.0', function(){
    console.log(`Listening on port ${port}`)
})