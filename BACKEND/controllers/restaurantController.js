const { readJsonFile, writeJsonFile } = require('../util/fileUtils');

const getRestaurants = async (req, res) => {
    try {
        const { restaurants } = await readJsonFile('restaurants.json');
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const { restaurants } = await readJsonFile('restaurants.json');
        const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const { restaurants } = await readJsonFile('restaurants.json');
        const newRestaurant = {
            id: restaurants.length + 1,
            ...req.body
        };
        restaurants.push(newRestaurant);
        await writeJsonFile('restaurants.json', { restaurants });
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const { restaurants } = await readJsonFile('restaurants.json');
        const index = restaurants.findIndex(r => r.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        restaurants[index] = { ...restaurants[index], ...req.body, id: parseInt(req.params.id) };
        await writeJsonFile('restaurants.json', { restaurants });
        res.json(restaurants[index]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const { restaurants } = await readJsonFile('restaurants.json');
        const index = restaurants.findIndex(r => r.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        restaurants.splice(index, 1);
        await writeJsonFile('restaurants.json', { restaurants });
        res.status(204).json("Deleted Successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
