import {addPathPrefixToImgSrc} from './jsonUtils.js'

// Make sure the Document is done loading before running the function ready()
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Fetch the item data from the JSON file
    fetch('../e.commerce.website/items/shop.json')
        .then(response => response.json())
        .then(data => {
            const items = addPathPrefixToImgSrc(data, 'e.commerce.website/');

            // Generate shop items dynamically
            const shopElement = document.getElementsByClassName('shop')[0];

            for (let item of items) {
                item = `
                <div class="product text-center col-lg-3 col-md-4 col-12">
                    <img class="img-shop img-fluid mb-3" src="${item.imgSrc}" alt="error">
                    <div class="star">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <h5 class="p-name">${item.title}</h5>
                    <h4 class="p-price">${item.price}</h4>
                    <button class="buy-btn add-to-cart-btn">Add to Cart</button>
                </div>`

                // Add item element to the shop
                shopElement.insertAdjacentHTML('afterbegin', item);
            }

            // Add event listeners to the buttons
            const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
            for (let button of addToCartButtons) {
                button.addEventListener('click', addToCartClicked);
            }
        })
        .catch(error => {
            console.error('Error fetching item data:', error);
        });
}

// Retreiving item's data
function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement;
    const title = shopItem.getElementsByClassName('p-name')[0].innerText;
    const price = shopItem.getElementsByClassName('p-price')[0].innerText;
    const imgSrc = shopItem.getElementsByClassName('img-shop')[0].src;
    addItemToCart(title, price, imgSrc);
}

function addItemToCart(title, price, imgSrc) {
    const cartItem = {
        title: title,
        price: price,
        imgSrc: imgSrc
    };

    // Retrieve existing cart items from localStorage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        alert('Item has already been added to the cart!');
        return;
    }

    // Add the item to the cart
    cartItems.push(cartItem);

    // Store the updated cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart!');
}
