const BASE_URL = 'http://localhost:5000';

class API {
    static async getRestaurants() {
        const response = await fetch(`${BASE_URL}/restaurants`);
        return response.json();
    }

    static async login(credentials) {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }

    static async getRestaurantMenu(id) {
        const response = await fetch(`${BASE_URL}/restaurants/${id}`);
        return response.json();
    }

    static async submitContact(formData) {
        const response = await fetch(`${BASE_URL}/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        return response.json();
    }

    static async register(userData) {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    static async getCart(userId) {
        const response = await fetch(`${BASE_URL}/cart/${userId}`);
        return response.json();
    }

    static async addToCart(userId, item) {
        const response = await fetch(`${BASE_URL}/cart/${userId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        return response.json();
    }

    static async updateCartItem(userId, itemId, quantity) {
        const response = await fetch(`${BASE_URL}/cart/${userId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemId, quantity })
        });
        return response.json();
    }

    static async removeFromCart(userId, itemId) {
        const response = await fetch(`${BASE_URL}/cart/${userId}/remove/${itemId}`, {
            method: 'DELETE'
        });
        return response.json();
    }

    static async clearCart(userId) {
        const response = await fetch(`${BASE_URL}/cart/${userId}/clear`, {
            method: 'DELETE'
        });
        return response.json();
    }

    static async getUsers() {
        const response = await fetch(`${BASE_URL}/users`);
        return response.json();
    }

    static async searchUser(id) {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        return response.json();
    }

    static async updateUser(id, userData) {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    static async deleteUser(id) {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }

    static async getBlogs() {
        const response = await fetch(`${BASE_URL}/blogs`);
        return response.json();
    }

    static async getBlogById(id) {
        const response = await fetch(`${BASE_URL}/blogs/${id}`);
        return response.json();
    }

    static async createBlog(blogData) {
        const response = await fetch(`${BASE_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });
        return response.json();
    }

    static async updateBlog(id, blogData) {
        const response = await fetch(`${BASE_URL}/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });
        return response.json();
    }

    static async deleteBlog(id) {
        const response = await fetch(`${BASE_URL}/blogs/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
}
