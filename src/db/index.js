import { Sequelize } from "sequelize"; // import sequelize Constructor

const {PGPORT, PGUSER, PGDATABASE, PGPASSWORD, PGHOST, NODE_ENV} = process.env // destructure .env

const sequelize = new Sequelize( PGDATABASE, PGUSER, PGPASSWORD, { // create instance 
    port: PGPORT,
    host: PGHOST,
    dialect: "postgres",                     // important because could be as well mysql etc.
    ...(NODE_ENV === "production" && {      // sets different behavoir for diff environments
        dialectOptions: {                  // production requirements
            ssl: {
                requiered: true,
                rejectUnauthorized: false,
            }
        }
    })

})


export const connectDB = async()=> {            // use instance to build db connection
    try {
        await sequelize.authenticate()         // check setup // can provide {logging: false} as parameter to switch off logging in console
        console.log("DB is authenticated")
        await sequelize.sync()                // establish connection
        console.log("DB is established")

    } catch(error) {
        console.log(error)
    }
}

export default sequelize