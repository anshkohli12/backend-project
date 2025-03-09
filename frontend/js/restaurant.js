document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('id');

    if (!restaurantId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const restaurant = await API.getRestaurantMenu(restaurantId);
        renderRestaurantDetails(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
    }
});

function renderRestaurantDetails(restaurant) {
    const container = document.getElementById('restaurant-details');
    
    const html = `
        <div class="restaurant-header">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="restaurant-info">
                <h1>${restaurant.name}</h1>
                <p>${restaurant.cuisine} • ${restaurant.rating} ★</p>
                <p>${restaurant.location}</p>
            </div>
        </div>
        <div class="menu-sections">
            ${restaurant.menu.map(section => `
                <div class="menu-section">
                    <h2>${section.category}</h2>
                    <div class="menu-items">
                        ${section.itemList.map(item => `
                            <div class="menu-item">
                                <img src="${item.imgPath}" alt="${item.name}">
                                <div class="menu-item-details">
                                    <h3>${item.name}</h3>
                                    <p class="rating">${item.rating} ★</p>
                                    <p class="desc">${item.desc}</p>
                                    <p class="price">₹${item.price}</p>
                                    <button class="add-to-cart" onclick = "addToCart('${item.name}',${item.price})">Add to Cart</button>
                                </div>
                            </div>
                        `).join('')
                        }
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

async function addToCart(name, price) {
    try {
        // For demo purposes, using a hardcoded userId
        const userId = 'user123';
        const item = {
            itemId: Date.now().toString(), // Using timestamp as temporary ID
            name,
            price,
            quantity: 1
        };
        
        await API.addToCart(userId, item);
        alert('Item added to cart!');
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart');
    }
}

