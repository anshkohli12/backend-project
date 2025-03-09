const { readJsonFile, writeJsonFile } = require('../util/fileUtils');

const getBlogs = async (req, res) => {
    try {
        const { blogs } = await readJsonFile('blogs.json');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { blogs } = await readJsonFile('blogs.json');
        const blog = blogs.find(b => b.id === parseInt(req.params.id));
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const { blogs } = await readJsonFile('blogs.json');
        const newBlog = {
            id: blogs.length + 1,
            ...req.body
        };
        blogs.push(newBlog);
        await writeJsonFile('blogs.json', { blogs });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { blogs } = await readJsonFile('blogs.json');
        const id = parseInt(req.params.id);
        const index = blogs.findIndex(b => b.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blogs[index] = { ...blogs[index], ...req.body, id };
        await writeJsonFile('blogs.json', { blogs });
        res.json(blogs[index]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { blogs } = await readJsonFile('blogs.json');
        const id = parseInt(req.params.id);
        const index = blogs.findIndex(b => b.id === id);
        if (index === -1) {
            return res.status(200).json({ message: "Blog not found" });
        }
        blogs.splice(index, 1);
        await writeJsonFile('blogs.json', { blogs });
        res.json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
