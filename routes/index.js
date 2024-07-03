const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => { 
    try{
        const info = await prisma.aPI_Info.findMany();
        res.json(info);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
