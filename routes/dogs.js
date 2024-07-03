const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { checkPassword } = require('../middlewares/auth_middleware');

const prisma = new PrismaClient();
const router = express.Router();

// Get all dogs
router.get('/', async (req, res) => {
    try{
        const dogs = await prisma.dog.findMany();
        res.json(dogs);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
// Get a dog by id
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