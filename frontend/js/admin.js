// Add these methods to your API class first
API.getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
};

API.searchUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    return response.json();
};

API.updateUser = async (id, userData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return response.json();
};

API.deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};

// Admin Dashboard functionality
let users = [];
const modal = document.getElementById('editModal');
const closeBtn = document.getElementsByClassName('close')[0];

async function loadUsers() {
    try {
        users = await API.getUsers();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.username || 'N/A'}</td>
            <td>${user.email}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="openEditModal('${user.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function searchUser() {
    const searchId = document.getElementById('userSearch').value;
    if (!searchId) {
        loadUsers();
        return;
    }

    try {
        const user = await API.searchUser(searchId);
        displayUsers([user]);
    } catch (error) {
        console.error('Error searching user:', error);
        alert('User not found');
    }
}

function openEditModal(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('editUserId').value = userId;
        document.getElementById('editEmail').value = user.email;
        modal.style.display = 'block';
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('editUserForm').onsubmit = async function(e) {
    e.preventDefault();
    const userId = document.getElementById('editUserId').value;
    const email = document.getElementById('editEmail').value;

    try {
        await API.updateUser(userId, { email });
        modal.style.display = 'none';
        loadUsers();
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Error updating user');
    }
}

async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            await API.deleteUser(userId);
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    }
}

// Load users when page loads
document.addEventListener('DOMContentLoaded', loadUsers);
