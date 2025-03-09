document.addEventListener('DOMContentLoaded', loadBlog);

const sampleImages = {
    related: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg'
    ],
    default: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
};

async function loadBlog() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        
        if (!blogId) {
            window.location.href = 'blogs.html';
            return;
        }

        const blog = await API.getBlogById(blogId);
        displayBlog(blog);
        displayRelatedPosts();
    } catch (error) {
        console.error('Error loading blog:', error);
    }
}

function displayBlog(blog) {
    const blogContent = document.getElementById('blog-content');
    
    blogContent.innerHTML = `
        <article class="blog-post">
            <h1>${blog.title}</h1>
            <div class="blog-meta">
                <span class="blog-author">By ${blog.author || 'FoodieExpress'}</span>
                <span class="blog-date">${new Date(blog.date).toLocaleDateString()}</span>
                <span class="blog-category">${blog.category || 'Food & Dining'}</span>
            </div>
            <div class="blog-image">
                <img src="${blog.image || sampleImages.default}" alt="${blog.title}" 
                     onerror="this.src='${sampleImages.default}'">
            </div>
            <div class="blog-body">
                ${blog.content}
            </div>
            <div class="blog-tags">
                <span class="tag">Food</span>
                <span class="tag">Recipes</span>
                <span class="tag">Cooking</span>
                <span class="tag">Dining</span>
            </div>
        </article>
    `;
}

function displayRelatedPosts() {
    const relatedPosts = document.createElement('div');
    relatedPosts.className = 'related-posts';
    relatedPosts.innerHTML = `
        <h3>Related Posts</h3>
        <div class="related-posts-grid">
            ${sampleImages.related.map((img, index) => `
                <article class="related-post-card">
                    <div class="related-post-image">
                        <img src="${img}" alt="Related Post ${index + 1}">
                    </div>
                    <div class="related-post-content">
                        <h4>Amazing Food Blog Post ${index + 1}</h4>
                        <p>Discover more about food and cuisine...</p>
                        <a href="#" class="read-more">Read More →</a>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
    
    document.querySelector('.blog-detail-container').appendChild(relatedPosts);
}
