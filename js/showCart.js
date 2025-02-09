let allProducts = [];

async function loadProducts() {
    try {
        const response = await fetch("../data_json/All-Games.json");
        allProducts = await response.json();
        console.log(allProducts);
        showCart();
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function showCart() {
    try {
        let loginUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));
        if (!loginUser || !loginUser.id) {
            alert("Please login to view your cart");
            return;
        }

        const userId = loginUser.id;
        let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
        console.log(diceWave);
        let cart = diceWave.cart || [];
        let userCartItems = cart.filter(item => item.userId === userId);

        console.log(userCartItems);
        let cartContainer = document.getElementById('cart-container');
        let totalPriceElement = document.getElementById('total-price');
        
        if (!cartContainer) {
            alert("Cart container not found!");
            return;
        }

        cartContainer.innerHTML = "";
        let totalPrice = 0;

        userCartItems.forEach(cartItem => {
            console.log(cartItem.productId);
            let product = allProducts.find(product => product.id == cartItem.productId);
            if (!product) {
                console.log('Product not found');
                return;
            }
            totalPrice += product.price;
            console.log(product);

            let cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="card mb-3" style="max-width: 100%; margin-bottom:50px;!important">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.game_name}" style="object-fit:fill;height:250px;width:100%;!important">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.game_name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><small class="text-body-secondary">${product.price}</small></p>
                                <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>

            `;
            console.log(cartItemElement);
            cartContainer.append(cartItemElement);
        });

        totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} JD`;
    } catch (error) {
        alert("An error occurred while loading the cart");
        console.error(error);
    }
}

function removeFromCart(productId) {
    try {
        let loginUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));
        if (!loginUser || !loginUser.id) {
            alert("Please login to modify your cart");
            return;
        }

        const userId = loginUser.id;
        let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
        let cart = diceWave.cart || [];

        let newCart = cart.filter(item => !(item.userId === userId && item.productId === productId));
        diceWave.cart = newCart;
        localStorage.setItem("diceWave", JSON.stringify(diceWave));

        showCart();
    } catch (error) {
        alert("An error occurred while removing item from cart");
        console.error(error);
    }
}

loadProducts();
