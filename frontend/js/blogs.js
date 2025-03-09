document.addEventListener('DOMContentLoaded', loadBlogs);

async function loadBlogs() {
    try {
        const blogs = await API.getBlogs();
        const blogsGrid = document.getElementById('blogs-grid');
        
        // Sample food blog images
        const foodImages = [
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
            'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
            'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
            'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
            'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
        ];
        
        blogs.forEach((blog, index) => {
            // Assign a random image from the array if blog doesn't have one
            blog.image = blog.image || foodImages[index % foodImages.length];
            const blogCard = createBlogCard(blog);
            blogsGrid.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

function createBlogCard(blog) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    article.innerHTML = `
        <div class="blog-image">
            <img src="${blog.image}" alt="${blog.title}" onerror="this.src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'">
        </div>
        <div class="blog-content">
            <h2>${blog.title}</h2>
            <p class="blog-excerpt">${blog.excerpt || blog.content.substring(0, 150)}...</p>
            <div class="blog-meta">
                <span class="blog-author">By ${blog.author || 'FoodieExpress'}</span>
                <span class="blog-date">${new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div class="blog-footer">
                <span class="blog-category">${blog.category || 'Food & Dining'}</span>
                <a href="blog.html?id=${blog.id}" class="read-more">Read More →</a>
            </div>
        </div>
    `;
    
    return article;
}
