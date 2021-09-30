//Default exports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//making passwords secure using .env
dotenv.config({ path: "./.env" });

//importing files
const indexFile = require("./api/index.js");
//initialising server
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

indexFile;

app.get("/", async (req, res) => {
    res.send("Working");
});
// starting the server
app.listen(process.env.PORT, () => {
    console.log(`
            ####################################
            🛡️  Server listening on port: ${process.env.PORT} 🛡️
            ####################################
        `);
});
