//Default exports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//making passwords secure using .env
dotenv.config({ path: "./.env" });

//importing files
const indexFile = require("./api/index.js");
const { data } = require("./api/graphQLQuery");
//initialising server
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

indexFile;

app.get("/", async (req, res) => {
    // data().then((resp) => res.send(JSON.stringify(resp)));
    // .then((data) => res.send(data));
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
