# ShopAssist – AI-Powered E-commerce Chatbot

ShopAssist is a modern, AI-powered e-commerce chatbot web application. It helps users discover products, browse categories, manage their shopping cart, and get instant support—all through a conversational interface. The project demonstrates a full-stack approach using Flask, HTML/CSS/JS, and integration with Microsoft Power Platform for AI search.

---

## Table of Contents

- [ShopAssist – AI-Powered E-commerce Chatbot](#shopassist--ai-powered-e-commerce-chatbot)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Running the Application](#running-the-application)
  - [Usage Guide](#usage-guide)
  - [Dummy Data](#dummy-data)
  - [AI Integration](#ai-integration)
  - [Accessibility](#accessibility)
  - [Development \& Testing](#development--testing)
  - [License](#license)

---

## Features

- **Conversational Shopping**: Chatbot interface for product discovery and support
- **AI-Powered Search**: Natural language product search via Microsoft Power Platform
- **Category Browsing**: Browse and filter products by category
- **Shopping Cart**: Add, remove, and update items in your cart
- **Deals & Promotions**: View special offers and discounts
- **FAQ & Support**: Access help and contact support
- **Responsive & Accessible**: Works on all devices, with keyboard and screen reader support

---

## Project Structure

```
Uplyft/
├── static/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   └── script.js         # Client-side JavaScript
│   └── products.json         # Dummy product data (local fallback)
├── templates/
│   ├── index.html            # Main chatbot UI
│   └── faq.html              # FAQ/help page
├── index.py                  # Flask backend application
├── requirements.txt          # Python dependencies
├── README.md                 # Project documentation
├── points.txt                # (Sample/bonus file)
├── vercel.json               # (Deployment config, if using Vercel)
└── Uplyft Full Stack Intern Case Study_Internshala June 2025.pdf
```

---

## Installation & Setup

### Prerequisites

- Python 3.8+
- pip (Python package manager)

### Steps

1. **Clone the repository**

   ```powershell
   git clone <your-repo-url>
   cd Uplyft
   ```

2. **Create a virtual environment (recommended)**

   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install dependencies**

   ```powershell
   pip install -r requirements.txt
   ```

---

## Running the Application

1. **Start the Flask server**

   ```powershell
   python index.py
   ```

2. **Open your browser** and go to [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

---

## Usage Guide

- **Open the chat**: Click the "Chat with us" button at the bottom right.
- **Browse products**: Use quick reply buttons or type your query.
- **Search with AI**: Click "Search with AI" and enter a natural language query (e.g., "Show me waterproof watches under $100").
- **View product details**: Click on any product card to see more info and add to cart.
- **Manage cart**: Add, remove, or update items. Proceed to checkout from the cart view.
- **Get help**: Use the FAQ/help button or type your question.

---

## Dummy Data

- **products.json** in `/static/` contains sample product data used for local browsing and fallback.
- **Structure Example:**

  ```json
  {
    "products": [
      {
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      }
      // ...more products
    ]
  }
  ```

- **Fallback API**: If the local file is missing, the app fetches from [DummyJSON](https://dummyjson.com/products).

---

## AI Integration

- **AI Search**: Integrates with Microsoft Power Platform Copilot Studio for natural language product search.
- **How it works**: User queries are sent to the Copilot Studio endpoint. If the AI is unavailable, the app falls back to local search.
- **Configuration**: For full AI features, set up your Power Platform credentials in a `.env` file (see requirements.txt for related packages).

---

## Accessibility

- **Keyboard navigation**: Tab, Enter, and arrow keys supported throughout the chat UI.
- **Screen reader support**: ARIA roles and live regions for chat messages.
- **Scroll-to-bottom button**: Appears when new messages arrive and user is scrolled up.
- **Color contrast**: Designed for readability and accessibility.

---

## Development & Testing

- **Linting**: `flake8` for code style
- **Formatting**: `black` for auto-formatting
- **Testing**: `pytest`, `pytest-flask` for backend tests
- **Recommended workflow**:

  ```powershell
  flake8
  black .
  pytest
  ```

---

## License

This project is for educational and demonstration purposes. For commercial use, please contact the author.

---

**Developed for Uplyft Full Stack Intern Case Study – June 2025**
