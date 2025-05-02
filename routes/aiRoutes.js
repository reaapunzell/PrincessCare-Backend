import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post("/recommend", async (req, res) => {
    const { cycleData } = req.body;

    try{
        const response = await axios.post()
    }
})