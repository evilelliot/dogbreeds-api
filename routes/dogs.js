const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { checkPassword } = require('../middlewares/auth_middleware');

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Dog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the dog.
 *         name:
 *           type: string
 *           description: Name of the dog breed.
 *         group:
 *           type: string
 *           description: Group of the dog breed.
 *         section:
 *           type: string
 *           description: Section of the dog breed.
 *         country:
 *           type: string
 *           description: Country of origin of the dog breed.
 *         fci_url:
 *           type: string
 *           description: URL to the FCI (Fédération Cynologique Internationale) page for the dog breed.
 *         image_url:
 *           type: string
 *           format: uri
 *           description: URL to an image of the dog breed.
 *         pdf_url:
 *           type: string
 *           format: uri
 *           description: URL to a PDF document related to the dog breed.
 *       required:
 *         - name
 */

// Get all dogs
/**
 * @swagger
 * /dogs:
 *   get:
 *     summary: Get all dogs
 *     description: Retrieve a list of all dog breeds.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
    try{
        const dogs = await prisma.dog.findMany();
        res.json(dogs);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
// Get a dog by id
/**
 * @swagger
 * /dogs/{id}:
 *   get:
 *     summary: Get a dog by ID
 *     description: Retrieve information about a specific dog breed by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the dog breed to retrieve.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const dog = await prisma.dog.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(dog);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
// Get a dog by name
/**
 * @swagger
 * /dogs/name/{name}:
 *   get:
 *     summary: Get a dog by name
 *     description: Retrieve information about a specific dog breed by its name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the dog breed to retrieve.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/name/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const dog = await prisma.dog.findFirst({
            where: {
                name: name
            }
        });
        if (dog) {
            res.json(dog);
        } else {
            res.status(404).json({ message: 'Dog not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get all dogs by group
/**
 * @swagger
 * /dogs/group/{group}:
 *   get:
 *     summary: Get dogs by group
 *     description: Retrieve a list of dog breeds belonging to a specific group.
 *     parameters:
 *       - in: path
 *         name: group
 *         required: true
 *         schema:
 *           type: string
 *         description: Group name to filter dog breeds.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 *       500:
 *         description: Internal Server Error
 */
router.get('/group/:group', async (req, res) => {
    const { group } = req.params;
    try {
        const dogs = await prisma.dog.findMany({
            where: {
                group: group
            }
        });
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get all dogs by section
/**
 * @swagger
 * /dogs/section/{section}:
 *   get:
 *     summary: Get dogs by section
 *     description: Retrieve a list of dog breeds belonging to a specific section.
 *     parameters:
 *       - in: path
 *         name: section
 *         required: true
 *         schema:
 *           type: string
 *         description: Section name to filter dog breeds.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 *       500:
 *         description: Internal Server Error
 */
router.get('/section/:section', async (req, res) => {
    const { section } = req.params;
    try {
        const dogs = await prisma.dog.findMany({
            where: {
                section: section
            }
        });
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 
// Get all dogs by country
/**
 * @swagger
 * /dogs/country/{country}:
 *   get:
 *     summary: Get dogs by country
 *     description: Retrieve a list of dog breeds originating from a specific country.
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name to filter dog breeds.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 *       500:
 *         description: Internal Server Error
 */
router.get('/country/:country', async (req, res) => {
    const { country } = req.params;
    try {
        const dogs = await prisma.dog.findMany({
            where: {
                country: country
            }
        });
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Register a new dog
/**
 * @swagger
 * /dogs:
 *   post:
 *     summary: Register a new dog
 *     description: Create a new entry for a dog breed in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               group:
 *                 type: string
 *               section:
 *                 type: string
 *               country:
 *                 type: string
 *             example:
 *               name: Labrador Retriever
 *               group: Sporting Group
 *               section: Retrievers
 *               country: Canada
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', checkPassword, async (req, res) => {
    const { name, group, section, country } = req.body;
        try {
            const dog = await prisma.dog.create({
                data: {
                name: name,
                group: group,
                section: section,
                country: country
            }
        });
        res.json(dog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;