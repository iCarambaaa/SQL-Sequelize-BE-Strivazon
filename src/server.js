import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from "cors";
import {connectDB} from "./db/index.js"
import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./lib/errorHandlers.js";
import productsRouter from "./services/products/index.js"
import reviewsRouter from "./services/reviews/index.js"


const server = express();

server.use(cors());
server.use(express.json())

server.use("/products", productsRouter)
server.use("/products/:id/reviews", reviewsRouter)

// *********************** ERROR MIDDLEWARES ***************************

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


console.table(listEndpoints(server))

const {PORT} = process.env

server.listen(PORT, async () => {
    console.log("listening on port:", PORT)
    await connectDB()                                                                // calling DB connection from sequelize instance
    

})

server.on("error", (error) => {
    console.log("Server is stopped ", error);
  
  });  
