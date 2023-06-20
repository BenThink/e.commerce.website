// Make sure the Document is done loading before running the function ready()
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Retrieve existing cart items from localStorage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTableBody = document.querySelector('.tbody-content');

    cartItems.forEach(item => {
        const row = createCartItemRow(item);
        cartTableBody.append(row);
        updateCartTotal();
    });

    // Quantity Input based on localStorage
    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let quantity of quantityInputs) {
        const title = quantity.closest('.tr-row').querySelector('h5').innerText;
        const storedQuantity = getStoredQuantity(title);
        if (storedQuantity) {
            quantity.value = storedQuantity;
            updateCartItemTotal(quantity);
        }
        quantity.addEventListener('change', quantityChanged);
    }

    // Trash Icon
    const removeCartItemIcons = document.getElementsByClassName('fa-trash-alt');
    for (let icons of removeCartItemIcons) {
        icons.addEventListener('click', removeCartItem);
    }
    // Remove Button
    const removeCartItemButtons = document.getElementsByClassName('btn-light');
    for (let buttons of removeCartItemButtons) {
        buttons.addEventListener('click', removeCartItem);
    }

    // Apply Coupon Button
    document.getElementById('apply-coupon-button').addEventListener('click', applyCoupon);

    // Proceed To Checkout
    document.getElementsByClassName('btn-checkout')[0].addEventListener('click', checkout);

    // Update cart total after changing values in cart items
    updateCartTotal();
}

// Create Cart Item Row
function createCartItemRow(item) {
    const { title, price, imgSrc } = item;

    const cartRow = document.createElement('tr');
    cartRow.classList.add('tr-row');

    const cartRowContents = `
    <td><button class="btn btn-light"><i class="fas fa-trash-alt"></i></button></td>
    <td><img class="w-100 h-100" src="${imgSrc}" alt="error"></td>
    <td>
        <h5>${title}</h5>
    </td>
    <td>
        <h5 class="cart-price">${price}</h5>
    </td>
    <td><input class="w-25 pl-1 cart-quantity-input" type="number" value="1"></td>
    <td>
        <h5 class="cart-row-total">${price}</h5>
    </td>`;
    cartRow.innerHTML = cartRowContents;

    return cartRow;
}

// Quantity Change
function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartItemTotal(input);
    updateCartTotal();

    const title = input.closest('.tr-row').querySelector('h5').innerText;
    storeQuantity(title, input.value);
}

// Update Cart Item Total
function updateCartItemTotal(input) {
    const cartRow = input.closest('.tr-row');
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantity = input.value;
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const totalElement = cartRow.getElementsByClassName('cart-row-total')[0];
    const total = price * quantity;
    totalElement.innerText = '$' + Math.round(total * 100) / 100;
}

// Remove Item from Cart
function removeCartItem(event) {
    const tr = event.target.closest('.tr-row');
    if (tr) {
        // Retrieve the item title
        const titleElement = tr.querySelector('h5');
        const title = titleElement.innerText;

        // Remove the item form the cartItems array in localStorage
        removeItemLocalStorage(title);

        // Clear the stored quantity for the removed item
        clearStoredQuantity(title);

        // Remove the item from DOM
        tr.remove();
    }
    updateCartTotal();
}

// Clear stored quantity for the item
function clearStoredQuantity(title) {
    const storedQuantities = JSON.parse(localStorage.getItem('storedQuantities')) || {};
    delete storedQuantities[title];
    localStorage.setItem('storedQuantities', JSON.stringify(storedQuantities));
}

// Remove Local Storage
function removeItemLocalStorage(title) {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the index of the item to remove
    const itemIndex = cartItems.findIndex(item => item.title === title);

    if (itemIndex !== -1) {
        // Remove the item from the cartItems array
        cartItems.splice(itemIndex, 1);

        // Store the updated cart items in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert('Item removed from Cart!');
    }
}

// Proceed To Checkout
function checkout() {
    // Retrieve cart from localStorage || initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        alert("There are no items in Cart! \nReturn to Shop.");
        return (window.location.href = 'shop.html');
    }

    alert('Thank you for your purchase!');

    // Clearing the Cart in DOM
    const cartItemsContainer = document.getElementsByClassName('tbody-content')[0];
    while (cartItemsContainer.hasChildNodes()) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild);
    }

    // Clear cart items from local storage
    localStorage.removeItem('cartItems');

    // Clear stored quantities
    clearStoredQuantities();

    updateCartTotal();
}

// Clear stored quantities
function clearStoredQuantities() {
    localStorage.removeItem('storedQuantities');
}

// Applying Coupon 
let couponApplied = false; // Flag variable to track if the coupon has been applied
function applyCoupon() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        alert("The coupon cannot be used if there are no items in Cart!");
        document.getElementById('coupon-input').value = ''; // Clear the field after typed coupon
        return;
    }

    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value;

    if (couponCode === 'discount12') {
        if (!couponApplied) {
            couponApplied = true;
            applyDiscount(12);
        } else {
            alert('The coupon has already been applied!');
        }
    } else {
        alert('The coupon does not exist!');
    }
    couponInput.value = ''; // Clear the field after typed coupon
}

// Coupon Discount Function
function applyDiscount(discountPercentage) {
    const totalPriceElement = document.getElementsByClassName('cart-price-total')[0];
    const totalPrice = parseFloat(totalPriceElement.innerText.replace('$', ''));
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const discountedPrice = totalPrice - discountAmount;

    // Update the total price with the discount applied
    totalPriceElement.innerText = '$' + Math.round(discountedPrice * 100) / 100;

    alert('Coupon applied successfully. Your total has been discounted by ' + discountPercentage + '%.');
}

// Store Quantity in localStorage
function storeQuantity(title, quantity) {
    const storedQuantities = JSON.parse(localStorage.getItem('storedQuantities')) || {};
    storedQuantities[title] = quantity;
    localStorage.setItem('storedQuantities', JSON.stringify(storedQuantities));
}

// Retrieve Quantity from localStorage
function getStoredQuantity(title) {
    const storedQuantities = JSON.parse(localStorage.getItem('storedQuantities')) || {};
    return storedQuantities[title];
}

// Update Cart Total
function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('tbody-content')[0];
    const cartRows = cartItemContainer.getElementsByClassName('tr-row');
    let total = 0;
    for (let rows of cartRows) {
        const priceElement = rows.getElementsByClassName('cart-price')[0];
        const quantityElement = rows.getElementsByClassName('cart-quantity-input')[0];
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = quantityElement.value;
        total += price * quantity;
    }

    // Subtotal Price
    document.getElementsByClassName('cart-price-subtotal')[0].innerText = '$' + Math.round(total * 100) / 100;

    // Shipping Price
    const shippingPriceElement = document.getElementsByClassName('shipping-price')[0];
    let shippingPrice = 0;

    if (cartRows.length > 0) {
        shippingPrice = 3.10;
    }
    shippingPriceElement.innerText = '$' + shippingPrice;

    // Total Price
    const totalPrice = document.getElementsByClassName('cart-price-total')[0];
    totalPrice.innerText = '$' + Math.round((total + shippingPrice) * 100) / 100;
}