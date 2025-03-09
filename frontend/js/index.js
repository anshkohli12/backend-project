document.addEventListener('DOMContentLoaded', async () => {
    try {
        const restaurants = await API.getRestaurants();
        const container = document.getElementById('restaurants-container');
        
        restaurants.forEach(restaurant => {
            const card = createRestaurantCard(restaurant);
            container.innerHTML += card;
        });
    } catch (error) {
        console.error('Failed to load restaurants:', error);
    }
});

function createRestaurantCard(restaurant) {
    return `
        <div class="restaurant-card" data-restaurant-id="${restaurant.id}" style="cursor: pointer;">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="card-content">
                <div>
                    <h3>${restaurant.name}</h3>
                    <p class="card-cuisine">${restaurant.cuisine}</p>
                    <div class="card-details">
                        <div class="card-rating">
                            <i class="fas fa-star"></i>
                            <span>${restaurant.rating}</span>
                        </div>
                        <div class="card-info">
                            <span>${restaurant.deliveryTime || 20} mins</span>
                            <span>•</span>
                            <span>₹${restaurant.minOrder || 100} min order</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="view-menu-btn">View Menu</button>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('click', function(e) {
    const card = e.target.closest('.restaurant-card');
    if (card) {
        const restaurantId = card.dataset.restaurantId;
        if (restaurantId) {
            console.log('Navigating to restaurant:', restaurantId);
            window.location.href = `./restaurant.html?id=${restaurantId}`;
        } else {
            console.error('No restaurant ID found on card');
        }
    }
});
