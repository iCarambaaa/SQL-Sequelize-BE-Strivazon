import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from "cors";
import {connectDB} from "./db/index.js"

const server = express();

server.use(cors());
server.use(express.json())





console.table(listEndpoints(server))

const {PORT} = process.env

server.listen(PORT, async () => {
    console.log("listening on port:", PORT)
    await connectDB()                          // calling DB connection from sequelize instance

})

server.on("error", (error) => {
    console.log("Server is stopped ", error);
  
  });  
