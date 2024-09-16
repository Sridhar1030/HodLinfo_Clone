import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import axios from "axios";
import Crypto from "./models/crypto.js"; // Adjust import based on your schema file

const app = express();

// Enable CORS for all requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

// Fetch and store crypto data
app.get("/fetch-crypto", async (req, res) => {
    try {
        const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
        const data = Object.values(response.data).slice(0, 10); // Top 10 results

        await Crypto.deleteMany(); // Clear existing data

        const cryptoData = data.map((item) => ({
            name: item.name,
            last: item.last,
            buy: item.buy,
            sell: item.sell,
            volume: item.volume,
            base_unit: item.base_unit,
        }));

        await Crypto.insertMany(cryptoData); // Insert new data
        res.send("Data fetched and stored in MongoDB");
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

// Hello World
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Retrieve stored crypto data
app.get("/cryptos", async (req, res) => {
    try {
        const cryptos = await Crypto.find();
        res.json(cryptos);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
