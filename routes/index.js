const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     APIInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: Dog Breeds API
 *         madeby:
 *           type: string
 *           example: Alberto Ocaranza
 *         madein:
 *           type: string
 *           example: 03/07/2024
 *         version:
 *           type: string
 *           example: 1.0.2
 *         repository:
 *           type: string
 *           example: https://github.com/evilelliot/dogbreeds-api
 *         runningsince:
 *           type: string
 *           example: 03/07/2024
 *         description:
 *           type: string
 *           example: This is a small read-only API which stores different dog breeds register by the FCI and it's base data was recovered from Pavel Ivashkov's repository containing a CSV with dog breeds data scrapped from the official FCI website.
 *         dedicatedto:
 *           type: string
 *           example: Dedicated to @ninoxander, my life's fuel and all the things I love in this world.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API Info
 *     description: Retrieve general information about the API
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIInfo'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => { 
    try{
        const info = await prisma.aPI_Info.findMany();
        res.json(info);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
