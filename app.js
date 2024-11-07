const addBtns = document.querySelectorAll(".addBtn");
const counters = document.querySelectorAll(".counter");
const urCart = document.querySelector(".ur-cart");
const urCarts = document.querySelector(".ur-carts");
const MyCarts = document.querySelector(".carts");
const totalDisplay = document.querySelector(".Tprice");
const confirmOrderBtn = document.querySelector(".confirm-order");
const confirmationMessage = document.querySelector(".order-confirmation"); // Add your confirmation message element

let cartCount = 0;

function updateCartCount(change) {
    cartCount += change;
    if (cartCount < 0) {
        cartCount = 0;
    }
    document.getElementById("updateCart").textContent = `(${cartCount})`;
}

function calculateTotalPrice() {
    let total = 0;
    document.querySelectorAll(".addedPrice").forEach(price => {
        total += parseFloat(price.textContent.replace('$', ''));
    });
    totalDisplay.textContent = `$${total.toFixed(2)}`;
}

function updateCartItem(cartItem, count) {
    const price = parseFloat(cartItem.querySelector(".pri").textContent.replace('@ $', ''));
    const totalPrice = price * count;
    cartItem.querySelector(".amount").textContent = `${count}x`;
    cartItem.querySelector(".addedPrice").textContent = `$${totalPrice.toFixed(2)}`;
    calculateTotalPrice();
}

function addToCart(key, dessert) {
    const title = dessert.querySelector(".title").textContent;
    const currentPrice = dessert.querySelector(".price").textContent;
    
    let existingItem = MyCarts.querySelector(`[data-key="${key}"]`);
    if (existingItem) {
        let count = parseInt(existingItem.querySelector(".amount").textContent.replace('x', ''));
        count += 1;
        updateCartItem(existingItem, count);
    } else {
        const createNewCart = `
            <div class="cart" data-key="${key}">
                <div>
                    <h4 class="title">${title}</h4>
                    <div class="prices">
                        <span class="amount">1x</span>
                        <p class="pri"><span>@ </span>${currentPrice}</p>
                        <p class="addedPrice">${currentPrice}</p>
                    </div>
                </div>
                <div class="img">
                    <img src="assets/images/icon-remove-item.svg" class="remove" onclick="removeCartItem(${key}, 1)">
                </div>
            </div>
            <hr style="width: 100%; margin: 1rem 0;">
        `;
        MyCarts.innerHTML += createNewCart;
        updateCartCount(1); // Increment overall cart count only if a new item is added
    }
    calculateTotalPrice();
}

function removeCartItem(key, count) {
    let item = MyCarts.querySelector(`[data-key="${key}"]`);
    if (item) {
        updateCartCount(-count);
        item.nextElementSibling.remove(); // Remove <hr>
        item.remove();
        calculateTotalPrice();
        if (cartCount === 0) {
            resetCart();
        }
        // Reset the counter button and the add button for the respective item
        counters[key].style.display = "none";
        addBtns[key].style.display = "flex";
    }
}

function resetCart() {
    urCart.style.display = "flex";
    urCarts.style.display = "none";
    addBtns.forEach(btn => btn.style.display = "flex");
    counters.forEach(counter => counter.style.display = "none");
}

addBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        btn.style.display = "none";
        counters[index].style.display = "flex";
        urCart.style.display = "none";
        urCarts.style.display = "flex";

        const dessert = btn.closest(".dessert");
        addToCart(index, dessert);
        
        // Reset count to 1 after re-adding the item
        let numDisplay = counters[index].querySelector(".num");
        let count = 1;
        numDisplay.textContent = count;
    });
});

// Counter
counters.forEach((counter, index) => {
    let numDisplay = counter.querySelector(".num");
    let count = 1;
    numDisplay.textContent = count;

    counter.querySelector(".inc").addEventListener("click", () => {
        if (count < 9) {
            count++;
            numDisplay.textContent = count;
            updateCartCount(1);
            addToCart(index, counter.closest(".dessert"));
        }
    });

    counter.querySelector(".dec").addEventListener("click", () => {
        if (count > 1) {
            count--;
            numDisplay.textContent = count;
            updateCartCount(-1);
            const cartItem = MyCarts.querySelector(`[data-key="${index}"]`);
            if (cartItem) {
                updateCartItem(cartItem, count);
            }
        } else if (count === 1) {
            count--;
            updateCartCount(-1);
            removeCartItem(index, 1);
            counters[index].style.display = "none";
            addBtns[index].style.display = "flex";

            // Reset count to 1 for the next addition
            numDisplay.textContent = 1;
        }
    });
});

// Show confirmation message
confirmOrderBtn.addEventListener("click", () => {
    confirmationMessage.style.display = "block";
    resetCart(); // Reset the cart after confirming the order
});

    counter.querySelector(".dec").addEventListener("click", () => {
        if (count > 1) {
            count--;
            numDisplay.textContent = count;
            updateCartCount(-1);
            const cartItem = MyCarts.querySelector(`[data-key="${index}"]`);
            if (cartItem) {
                updateCartItem(cartItem, count);
            }
        } else if (count === 1) {
            count--;
            updateCartCount(-1);
            removeCartItem(index, 1);
            counters[index].style.display = "none";
            addBtns[index].style.display = "flex";

            // Reset count to 1 for the next addition
            numDisplay.textContent = 1;
        }
    });
