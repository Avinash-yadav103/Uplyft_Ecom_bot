// Gemini AI integration for product search

// Get the API key from a global variable that should be set by the server
const GEMINI_API_KEY = window.GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Check if API key is available
if (!GEMINI_API_KEY) {
    console.warn("Gemini API key not found. AI search will use fallback mode.");
}

// Function to handle Search with AI button click
function searchWithAI() {
    const messagesContainer = document.querySelector('.chat-messages');
    const aiModeMessage = document.createElement('div');
    aiModeMessage.classList.add('message', 'bot-message');
    aiModeMessage.innerHTML = "🔍 <strong>AI Search Mode activated!</strong> Describe what you're looking for, and I'll find the perfect products for you.";
    messagesContainer.appendChild(aiModeMessage);
    
    // Set flag to indicate AI search mode is active
    sessionStorage.setItem('aiSearchMode', 'active');
    
    // Focus the input field
    document.querySelector('.chat-input input').focus();
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to call Gemini API
async function queryGeminiAPI(userQuery) {
    try {
        // For demo purposes, we'll use dummyjson API instead of actual Gemini API
        // In production, replace this with actual Gemini API call
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const allProducts = data.products;
        
        // Simple keyword matching (Gemini would do more sophisticated matching)
        const query = userQuery.toLowerCase();
        let matchedProducts = allProducts.filter(product => {
            return (
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });
        
        // Limit to 3 products
        matchedProducts = matchedProducts.slice(0, 3);
        
        // If no matches, show random products
        if (matchedProducts.length === 0) {
            matchedProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
            return {
                text: `<p>I couldn't find exact matches for "${userQuery}", but here are some popular items you might like:</p>`,
                products: matchedProducts
            };
        }
        
        return {
            text: `<p>Based on your search for "${userQuery}", I found these products that might interest you:</p>`,
            products: matchedProducts
        };
    } catch (error) {
        console.error("Error in AI query:", error);
        throw error;
    }
}

// Function to create product cards
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    // Add product image
    const productImage = document.createElement('img');
    productImage.src = product.thumbnail || 'https://via.placeholder.com/150';
    productImage.alt = product.title;
    productCard.appendChild(productImage);
    
    // Add product info
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    
    const productTitle = document.createElement('h4');
    productTitle.textContent = product.title;
    productInfo.appendChild(productTitle);
    
    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productInfo.appendChild(productPrice);
    
    productCard.appendChild(productInfo);
    
    // Add click handler for product details
    productCard.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    return productCard;
}

// Function to show product details in chat
function showProductDetails(product) {
    const messagesContainer = document.querySelector('.chat-messages');
    const productDetailMessage = document.createElement('div');
    productDetailMessage.classList.add('message', 'bot-message');
    
    let discountInfo = '';
    if (product.discountPercentage > 0) {
        discountInfo = `<span style="color: #ff6b6b; font-weight: bold;">Save ${product.discountPercentage.toFixed(1)}%!</span>`;
    }
    
    productDetailMessage.innerHTML = `
        <div style="margin-bottom: 10px;">
            <strong>${product.title}</strong><br>
            <span style="font-size: 0.9em;">${product.description}</span><br>
            <div style="margin-top: 5px;">
                <strong>$${product.price.toFixed(2)}</strong> ${discountInfo}<br>
                <span style="font-size: 0.8em;">Rating: ${product.rating}/5 ⭐ | ${product.stock} in stock</span>
            </div>
        </div>
        <div class="quick-replies" style="margin-top: 10px;">
            <button class="quick-reply-btn" onclick="addToCart('${product.id}')">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button class="quick-reply-btn">
                <i class="fas fa-heart"></i> Save for Later
            </button>
        </div>
    `;
    
    messagesContainer.appendChild(productDetailMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to add product to cart
function addToCart(productId) {
    const messagesContainer = document.querySelector('.chat-messages');
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('message', 'bot-message');
    confirmationMessage.innerHTML = `Product added to cart! <a href="#">View Cart</a>`;
    messagesContainer.appendChild(confirmationMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}