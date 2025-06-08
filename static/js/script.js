fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));

// Function to show contact support form in chat
function showContactSupport() {
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = "I need help from support";
    messagesContainer.appendChild(userMessage);
    
    // Create contact form message
    const contactMessage = document.createElement('div');
    contactMessage.classList.add('message', 'bot-message');
    contactMessage.innerHTML = `
        <strong>Contact Our Support Team</strong>
        <p>Please fill out the form below and we'll get back to you within 24 hours.</p>
        
        <form id="support-contact-form" class="contact-form">
            <div class="form-group">
                <label for="contact-name">Name</label>
                <input type="text" id="contact-name" required placeholder="Your name">
            </div>
            
            <div class="form-group">
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" required placeholder="your@email.com">
            </div>
            
            <div class="form-group">
                <label for="contact-subject">Subject</label>
                <select id="contact-subject" required>
                    <option value="">Select a topic</option>
                    <option value="order">Order Issue</option>
                    <option value="product">Product Information</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="account">Account Support</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea id="contact-message" rows="4" required placeholder="Please describe your issue..."></textarea>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="submit-btn">Send Message</button>
                <button type="button" class="cancel-btn" onclick="cancelContactForm()">Cancel</button>
            </div>
        </form>
    `;
    
    messagesContainer.appendChild(contactMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add form submission handler after form is in the DOM
    const supportForm = document.getElementById('support-contact-form');
    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitContactForm();
    });
    
    // Add styles for contact form
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .contact-form {
            background: #fff;
            border-radius: 8px;
            padding: 15px;
            margin-top: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            font-weight: 500;
            margin-bottom: 5px;
            color: #444;
            font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: #6b48ff;
            box-shadow: 0 0 0 3px rgba(107, 72, 255, 0.15);
            outline: none;
        }
        
        .form-actions {
            display: flex;
            gap: 10px;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #4a6fa8, #6b48ff);
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .cancel-btn {
            background: #f1f1f1;
            color: #555;
            border: none;
            padding: 10px 18px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .cancel-btn:hover {
            background: #e5e5e5;
        }
        
        .success-message {
            text-align: center;
            padding: 20px 0;
        }
        
        .success-message i {
            font-size: 48px;
            color: #4CAF50;
            margin-bottom: 15px;
            display: block;
        }
    `;
    document.head.appendChild(formStyles);
}

// Function to handle contact form submission
function submitContactForm() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Here you would typically send this data to your backend
    console.log('Contact form submitted:', { name, email, subject, message });
    
    // Remove the form
    const formContainer = document.getElementById('support-contact-form').parentNode;
    
    // Display success message
    formContainer.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you, ${name}!</h3>
            <p>Your message has been sent. Our support team will contact you at ${email} within 24 hours.</p>
            <p>Reference #: SUPP-${Math.floor(Math.random() * 100000)}</p>
            <button class="quick-reply-btn" onclick="acknowledgeContact()">
                <i class="fas fa-thumbs-up"></i> Got it
            </button>
        </div>
    `;
}

// Function to cancel contact form
function cancelContactForm() {
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Add bot message
    const cancelMessage = document.createElement('div');
    cancelMessage.classList.add('message', 'bot-message');
    cancelMessage.textContent = "No problem! Is there anything else I can help you with?";
    messagesContainer.appendChild(cancelMessage);
    
    // Add quick replies
    const quickReplies = document.createElement('div');
    quickReplies.classList.add('quick-replies');
    quickReplies.innerHTML = `
        <button class="quick-reply-btn" onclick="getCategories()">
            <i class="fas fa-tshirt"></i> Browse Products
        </button>
        <button class="quick-reply-btn" onclick="viewCart()">
            <i class="fas fa-shopping-cart"></i> View Cart
        </button>
    `;
    
    messagesContainer.appendChild(quickReplies);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to acknowledge the contact form submission
function acknowledgeContact() {
    const messagesContainer = document.querySelector('.chat-messages');
    
    const followUpMessage = document.createElement('div');
    followUpMessage.classList.add('message', 'bot-message');
    followUpMessage.innerHTML = `
        <p>While you wait for our support team's response, is there anything else I can help you with?</p>
        <div class="quick-replies">
            <button class="quick-reply-btn" onclick="getCategories()">
                <i class="fas fa-tshirt"></i> Browse Products
            </button>
            <button class="quick-reply-btn">
                <i class="fas fa-question-circle"></i> Check FAQs
            </button>
            <button class="quick-reply-btn" onclick="viewCart()">
                <i class="fas fa-shopping-cart"></i> View Cart
            </button>
        </div>
    `;
    
    messagesContainer.appendChild(followUpMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Replace the existing Contact Support button's onclick handler
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.quick-reply-btn');
    contactButtons.forEach(button => {
        if (button.textContent.includes('Contact Support')) {
            button.onclick = showContactSupport;
        }
    });
});

// Function to show today's deals
function showTodaysDeals() {
    if (!allProducts) {
        showErrorMessage("Product data is still loading. Please try again in a moment.");
        return;
    }
    
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = "Show me today's deals";
    messagesContainer.appendChild(userMessage);
    
    // Create loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'bot-message');
    loadingMessage.textContent = "Finding the best deals for today...";
    messagesContainer.appendChild(loadingMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    setTimeout(() => {
        // Remove loading message
        messagesContainer.removeChild(loadingMessage);
        
        // Sort products by discount percentage (highest first)
        const dealsProducts = [...allProducts.products]
            .filter(product => product.discountPercentage > 15) // Only products with >15% discount
            .sort((a, b) => b.discountPercentage - a.discountPercentage)
            .slice(0, 6); // Take top 6 deals
        
        if (dealsProducts.length === 0) {
            showBotMessage("Sorry, there are no special deals available today. Check back tomorrow!");
            return;
        }
        
        // Get hours remaining in the day
        const now = new Date();
        const hoursRemaining = 23 - now.getHours();
        const minutesRemaining = 59 - now.getMinutes();
        
        // Display deals
        const dealsMessage = document.createElement('div');
        dealsMessage.classList.add('message', 'bot-message');
        
        // Create deals container with header
        dealsMessage.innerHTML = `
            <div class="deals-container">
                <div class="deals-header">
                    <div class="deals-title">
                        <i class="fas fa-bolt" style="color: #FFD700;"></i> 
                        <span>TODAY'S FLASH DEALS</span>
                    </div>
                    <div class="deals-countdown">
                        Ends in: <span class="countdown-timer">${hoursRemaining}h ${minutesRemaining}m</span>
                    </div>
                </div>
                <div class="deals-products"></div>
            </div>
        `;
        
        // Add deals products
        const dealsProductsContainer = dealsMessage.querySelector('.deals-products');
        
        dealsProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('deal-product-card');
            
            // Calculate discount amounts
            const price = product.price || 0;
            const discountPercentage = product.discountPercentage || 0;
            const discountedPrice = (price * (1 - discountPercentage/100)).toFixed(2);
            const savedAmount = (price - discountedPrice).toFixed(2);
            
            productCard.innerHTML = `
                <div class="deal-product-image">
                    ${product.thumbnail ? 
                        `<img src="${product.thumbnail}" alt="${product.title || 'Product'}">` : 
                        '<div class="no-image">No image</div>'}
                    <div class="deal-badge">-${Math.round(discountPercentage)}%</div>
                </div>
                <div class="deal-product-info">
                    <h4 class="deal-product-title">${product.title || 'Untitled Product'}</h4>
                    <div class="deal-product-rating">
                        ${product.rating ? `${product.rating.toFixed(1)} ⭐` : ''} 
                    </div>
                    <div class="deal-product-price">
                        <span class="deal-current-price">$${discountedPrice}</span>
                        <span class="deal-original-price">$${price.toFixed(2)}</span>
                    </div>
                    <div class="deal-savings">You save: $${savedAmount}</div>
                </div>
            `;
            
            productCard.addEventListener('click', () => showProductDetails(product));
            dealsProductsContainer.appendChild(productCard);
        });
        
        messagesContainer.appendChild(dealsMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add CSS for deals styling
        const dealsStyles = document.createElement('style');
        dealsStyles.textContent = `
            .deals-container {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                margin-top: 10px;
                border: 1px solid #f0f0f0;
            }
            
            .deals-header {
                background: linear-gradient(135deg, #FF6B6B, #FF8E53);
                color: white;
                padding: 12px 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .deals-title {
                font-weight: 600;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .deals-countdown {
                font-size: 0.9rem;
                background: rgba(255,255,255,0.15);
                padding: 5px 10px;
                border-radius: 20px;
                display: flex;
                align-items: center;
            }
            
            .countdown-timer {
                font-weight: 600;
                margin-left: 4px;
            }
            
            .deals-products {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
                padding: 15px;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .deal-product-card {
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 6px rgba(0,0,0,0.06);
                border: 1px solid #f0f0f0;
                transition: all 0.2s;
                cursor: pointer;
            }
            
            .deal-product-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-color: #e0e0e0;
            }
            
            .deal-product-image {
                height: 140px;
                position: relative;
                overflow: hidden;
            }
            
            .deal-product-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .deal-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background: #FF6B6B;
                color: white;
                padding: 3px 8px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 0.8rem;
                box-shadow: 0 2px 5px rgba(255,107,107,0.3);
            }
            
            .deal-product-info {
                padding: 12px;
            }
            
            .deal-product-title {
                margin: 0 0 5px;
                font-size: 0.95rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .deal-product-rating {
                color: #888;
                font-size: 0.8rem;
                margin-bottom: 8px;
            }
            
            .deal-product-price {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 4px;
            }
            
            .deal-current-price {
                font-weight: bold;
                font-size: 1.1rem;
                color: #FF6B6B;
            }
            
            .deal-original-price {
                text-decoration: line-through;
                color: #888;
                font-size: 0.85rem;
            }
            
            .deal-savings {
                font-size: 0.8rem;
                color: #4CAF50;
            }
            
            @media (max-width: 500px) {
                .deals-products {
                    grid-template-columns: 1fr;
                }
                
                .deals-header {
                    flex-direction: column;
                    gap: 8px;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(dealsStyles);
    }, 1000);
}

// Connect the Today's Deals button to the function
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.quick-reply-btn');
    contactButtons.forEach(button => {
        if (button.textContent.includes("Today's Deals")) {
            button.onclick = showTodaysDeals;
        }
    });
    
    // Also load products data if not already loaded
    if (!allProducts) {
        preloadProductData();
    }
});


// Add this code at the end of the script section, before the closing </script> tag

// Function to show the AI search interface
function searchWithAI() {
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = "I want to search for products with AI";
    messagesContainer.appendChild(userMessage);
    
    // Create AI search message
    const searchMessage = document.createElement('div');
    searchMessage.classList.add('message', 'bot-message');
    searchMessage.innerHTML = `
        <div class="ai-search-container">
            <p><strong>Search with AI Assistant</strong></p>
            <p>Describe what you're looking for in natural language, and our AI will find the perfect products for you.</p>
            <div class="ai-search-input">
                <input type="text" id="ai-search-query" placeholder="E.g., 'I need a waterproof phone under $500'" class="ai-search-field">
                <button class="ai-search-button" onclick="executeAISearch()">
                    <i class="fas fa-search"></i> Search
                </button>
            </div>
            <p class="ai-search-examples">Try: "red shoes for running" or "kitchen gadgets for small apartments"</p>
        </div>
    `;
    
    messagesContainer.appendChild(searchMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Focus on the search input
    setTimeout(() => {
        document.getElementById('ai-search-query').focus();
        
        // Add event listener for Enter key
        document.getElementById('ai-search-query').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executeAISearch();
            }
        });
    }, 100);
    
    // Add styles for AI search
    const aiSearchStyles = document.createElement('style');
    aiSearchStyles.textContent = `
        .ai-search-container {
            background: #f9f9ff;
            border-radius: 12px;
            padding: 15px;
            border: 1px solid #e0e0ff;
        }
        
        .ai-search-input {
            display: flex;
            margin: 15px 0;
        }
        
        .ai-search-field {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #6b48ff;
            border-radius: 8px 0 0 8px;
            font-size: 14px;
        }
        
        .ai-search-button {
            background: linear-gradient(135deg, #4a6fa8, #6b48ff);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
            font-weight: 500;
        }
        
        .ai-search-examples {
            color: #666;
            font-size: 13px;
            font-style: italic;
        }
        
        .ai-search-results {
            margin-top: 15px;
        }
        
        .ai-suggested-product {
            background: white;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            border: 1px solid #eaeaea;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .ai-suggested-product:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .ai-thinking {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b48ff;
            font-style: italic;
        }
        
        .ai-thinking-dots {
            display: flex;
        }
        
        .ai-thinking-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #6b48ff;
            margin: 0 2px;
            animation: ai-thinking 1.4s infinite ease-in-out both;
        }
        
        .ai-thinking-dot:nth-child(1) { animation-delay: -0.32s; }
        .ai-thinking-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes ai-thinking {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(aiSearchStyles);
}

// Function to execute the AI search
function executeAISearch() {
    const query = document.getElementById('ai-search-query').value.trim();
    
    if (!query) {
        alert("Please enter a search query");
        return;
    }
    
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Add user message with the search query
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = query;
    messagesContainer.appendChild(userMessage);
    
    // Show thinking indicator
    const thinkingMessage = document.createElement('div');
    thinkingMessage.classList.add('message', 'bot-message');
    thinkingMessage.innerHTML = `
        <div class="ai-thinking">
            <span>AI is searching for products</span>
            <div class="ai-thinking-dots">
                <div class="ai-thinking-dot"></div>
                <div class="ai-thinking-dot"></div>
                <div class="ai-thinking-dot"></div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(thinkingMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Make API call to Power Platform Copilot Studio
    const apiEndpoint = "https://default2c5bdaf48ff24bd9bd547c50ab2195.90.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/crec9_productInfoBot/conversations";
    
    fetch(`${apiEndpoint}?api-version=2022-03-01-preview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: query
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Remove thinking message
        messagesContainer.removeChild(thinkingMessage);
        
        // Process and display results
        displayAISearchResults(data, query);
    })
    .catch(error => {
        console.error('Error with AI search:', error);
        
        // Remove thinking message
        messagesContainer.removeChild(thinkingMessage);
        
        // Show error message and fallback to local search
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'bot-message');
        errorMessage.innerHTML = `
            <p>Sorry, I couldn't connect to the AI search service. Let me search our local catalog instead.</p>
        `;
        messagesContainer.appendChild(errorMessage);
        
        // Perform fallback local search
        performLocalSearch(query);
    });
}

// Function to display AI search results
function displayAISearchResults(data, query) {
    const messagesContainer = document.querySelector('.chat-messages');
    
    const resultsMessage = document.createElement('div');
    resultsMessage.classList.add('message', 'bot-message');
    
    // Check if API returned valid response with products
    if (data && data.products && data.products.length > 0) {
        resultsMessage.innerHTML = `
            <p>Here are products that match your search for: <strong>${query}</strong></p>
            <div class="ai-search-results"></div>
        `;
        
        const resultsContainer = resultsMessage.querySelector('.ai-search-results');
        
        data.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('ai-suggested-product');
            productCard.innerHTML = `
                <h4>${product.name || product.title}</h4>
                <p>${product.description ? product.description.substring(0, 100) + '...' : 'No description available'}</p>
                <div class="product-price">$${product.price}</div>
            `;
            
            productCard.addEventListener('click', function() {
                // Find product in local catalog if available
                if (allProducts && allProducts.products) {
                    const localProduct = allProducts.products.find(p => 
                        p.title.toLowerCase() === product.name.toLowerCase() || 
                        p.title.toLowerCase().includes(product.name.toLowerCase())
                    );
                    
                    if (localProduct) {
                        showProductDetails(localProduct);
                    } else {
                        // Create temporary product object if not in local catalog
                        showProductDetails({
                            id: product.id || Date.now(),
                            title: product.name || 'Product',
                            description: product.description || 'No description available',
                            price: product.price || 0,
                            discountPercentage: product.discountPercentage || 0,
                            rating: product.rating || 4.5,
                            stock: product.stock || 100,
                            brand: product.brand || '',
                            category: product.category || 'AI Search Results'
                        });
                    }
                }
            });
            
            resultsContainer.appendChild(productCard);
        });
    } else {
        // Fallback to local search if API didn't return products
        resultsMessage.innerHTML = `
            <p>I couldn't find exact matches from our AI service for: <strong>${query}</strong></p>
            <p>Let me search our local catalog instead...</p>
        `;
        messagesContainer.appendChild(resultsMessage);
        
        // Try local search as fallback
        performLocalSearch(query);
        return;
    }
    
    messagesContainer.appendChild(resultsMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to perform local search as fallback
function performLocalSearch(query) {
    if (!allProducts || !allProducts.products) {
        showErrorMessage("Product data is not available. Please try again later.");
        return;
    }
    
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Create loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'bot-message');
    loadingMessage.textContent = "Searching local product catalog...";
    messagesContainer.appendChild(loadingMessage);
    
    setTimeout(() => {
        // Remove loading message
        messagesContainer.removeChild(loadingMessage);
        
        // Perform simple search on local products
        const searchTerms = query.toLowerCase().split(' ');
        const matchedProducts = allProducts.products.filter(product => {
            const productText = `${product.title} ${product.description} ${product.category} ${product.brand}`.toLowerCase();
            return searchTerms.some(term => productText.includes(term));
        }).slice(0, 6); // Limit to 6 results
        
        if (matchedProducts.length === 0) {
            const noResultsMsg = document.createElement('div');
            noResultsMsg.classList.add('message', 'bot-message');
            noResultsMsg.innerHTML = `
                <p>I couldn't find any products matching: <strong>${query}</strong></p>
                <p>Please try a different search term or browse our categories.</p>
                <button class="quick-reply-btn" onclick="getCategories()">
                    <i class="fas fa-list"></i> Browse Categories
                </button>
            `;
            messagesContainer.appendChild(noResultsMsg);
        } else {
            const resultsMessage = document.createElement('div');
            resultsMessage.classList.add('message', 'bot-message');
            resultsMessage.innerHTML = `
                <p>Here are products that match your search for: <strong>${query}</strong></p>
                <div class="product-list product-suggestions"></div>
            `;
            
            const productList = resultsMessage.querySelector('.product-list');
            
            matchedProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-card');
                
                const price = product.price || 0;
                const discountPercentage = product.discountPercentage || 0;
                const discountedPrice = (price * (1 - discountPercentage/100)).toFixed(2);
                
                productItem.innerHTML = `
                    <div class="product-image">
                        ${product.thumbnail ? 
                            `<img src="${product.thumbnail}" alt="${product.title}">` : 
                            '<div class="no-image">No image</div>'}
                    </div>
                    <div class="product-info">
                        <h4>${product.title}</h4>
                        <div class="product-price">$${discountedPrice}</div>
                    </div>
                `;
                
                productItem.onclick = function() {
                    showProductDetails(product);
                };
                
                productList.appendChild(productItem);
            });
            
            messagesContainer.appendChild(resultsMessage);
        }
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
}


// Add this after your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add scroll-to-bottom button
    const chatbotContainer = document.querySelector('.chatbot-container');
    const scrollToBottomBtn = document.createElement('button');
    scrollToBottomBtn.className = 'scroll-to-bottom';
    scrollToBottomBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    scrollToBottomBtn.setAttribute('aria-label', 'Scroll to latest messages');
    chatbotContainer.appendChild(scrollToBottomBtn);
    
    // Add new message indicator
    const newMessageIndicator = document.createElement('div');
    newMessageIndicator.className = 'new-message-indicator';
    newMessageIndicator.textContent = 'New messages';
    newMessageIndicator.setAttribute('aria-live', 'polite');
    chatbotContainer.appendChild(newMessageIndicator);
    
    // Set up scroll monitoring for chat
    setupChatScrolling();
    
    // Add ARIA attributes for better accessibility
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.setAttribute('role', 'log');
    chatMessages.setAttribute('aria-live', 'polite');
    chatMessages.setAttribute('aria-relevant', 'additions');
    chatMessages.setAttribute('aria-label', 'Chat messages');
});

// Add these functions at the end of your script
function setupChatScrolling() {
    const messagesContainer = document.querySelector('.chat-messages');
    const scrollToBottomBtn = document.querySelector('.scroll-to-bottom');
    const newMessageIndicator = document.querySelector('.new-message-indicator');
    
    if (!messagesContainer || !scrollToBottomBtn || !newMessageIndicator) return;
    
    // Track if user has scrolled up from bottom
    let isUserScrolledUp = false;
    
    // Function to check if chat is scrolled to bottom
    function isScrolledToBottom() {
        const tolerance = 30; // pixels tolerance
        return (messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight) < tolerance;
    }
    
    // Function to scroll to bottom
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        isUserScrolledUp = false;
        scrollToBottomBtn.classList.remove('visible');
        newMessageIndicator.classList.remove('visible');
    }
    
    // Set up scroll event
    messagesContainer.addEventListener('scroll', function() {
        if (isScrolledToBottom()) {
            isUserScrolledUp = false;
            scrollToBottomBtn.classList.remove('visible');
        } else {
            isUserScrolledUp = true;
            scrollToBottomBtn.classList.add('visible');
        }
    });
    
    // Set up click event for scroll-to-bottom button
    scrollToBottomBtn.addEventListener('click', scrollToBottom);
    
    // Add keyboard navigation for the chat
    messagesContainer.addEventListener('keydown', function(e) {
        // Page Up/Down navigation
        if (e.key === 'PageUp') {
            messagesContainer.scrollTop -= messagesContainer.clientHeight;
        } else if (e.key === 'PageDown') {
            messagesContainer.scrollTop += messagesContainer.clientHeight;
        } else if (e.key === 'Home') {
            messagesContainer.scrollTop = 0;
        } else if (e.key === 'End') {
            scrollToBottom();
        }
    });
    
    // Make the messages container focusable for keyboard navigation
    messagesContainer.tabIndex = 0;
    
    // Override the showBotMessage function to include scroll behavior
    window.originalShowBotMessage = window.showBotMessage || function(){};
    
    window.showBotMessage = function(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.innerHTML = message;
        
        messagesContainer.appendChild(messageElement);
        
        // If user has scrolled up, show new message indicator
        if (isUserScrolledUp) {
            newMessageIndicator.classList.add('visible');
            
            // Hide indicator after 5 seconds
            setTimeout(() => {
                newMessageIndicator.classList.remove('visible');
            }, 5000);
        } else {
            // Otherwise scroll to bottom
            scrollToBottom();
        }
        
        return messageElement;
    };
    
    // Add a MutationObserver to watch for new messages
    const chatObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                // If user has scrolled up, show indicator
                if (isUserScrolledUp) {
                    newMessageIndicator.classList.add('visible');
                    
                    // Hide indicator after 5 seconds
                    setTimeout(() => {
                        newMessageIndicator.classList.remove('visible');
                    }, 5000);
                } else {
                    // Otherwise scroll to bottom
                    scrollToBottom();
                }
            }
        });
    });
    
    // Start observing
    chatObserver.observe(messagesContainer, { childList: true });
}

// Update the existing scrollTop calls to use our enhanced scroll function
const originalAppendChild = Element.prototype.appendChild;
Element.prototype.appendChild = function() {
    const result = originalAppendChild.apply(this, arguments);
    
    // If this is the chat messages container and a message was added
    if (this.classList && this.classList.contains('chat-messages') && 
        arguments[0].classList && 
        (arguments[0].classList.contains('bot-message') || arguments[0].classList.contains('user-message'))) {
        
        // Get scroll state
        const isScrolledToBottom = (this.scrollHeight - this.scrollTop - this.clientHeight) < 30;
        
        // Scroll if at bottom or message is from user
        if (isScrolledToBottom || arguments[0].classList.contains('user-message')) {
            setTimeout(() => {
                this.scrollTop = this.scrollHeight;
            }, 100);
        }
    }
    
    return result;
};

// Add at the end of your script
function enhanceChatAccessibility() {
    // Add keyboard support for quick reply buttons
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
    quickReplyBtns.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        
        // Allow activation with Enter or Space keys
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Make the chat input more accessible
    const chatInput = document.querySelector('.chat-input input');
    const submitButton = document.querySelector('.chat-input button');
    
    if (chatInput && submitButton) {
        chatInput.setAttribute('aria-label', 'Type your message');
        submitButton.setAttribute('aria-label', 'Send message');
        
        // Submit on Enter
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                submitButton.click();
            }
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceChatAccessibility();
});