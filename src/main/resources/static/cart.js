let userId = null;
let cart = {};
let currentRestaurantId = null;
let allRestaurants = [];

window.onload = function () {

    const user = localStorage.getItem("user");

    if (user) {
        const parsedUser = JSON.parse(user);

        userId = parsedUser.id;

        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("appPage").classList.remove("hidden");

        loadRestaurants();
        setUserUI();  
    }
};
//-------- SET USER UI --------
function setUserUI() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.querySelector(".username").innerText = user.username;
        document.querySelector(".user-circle").innerText =
            user.username.charAt(0).toUpperCase();
    }
}


// -------- LOGIN --------
function login() {
    fetch("/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        })
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(err => { throw new Error(err); });
        }
        return res.json();
    })
   .then(data => {
    userId = data.id;

    localStorage.setItem("user", JSON.stringify(data));

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");

    loadRestaurants();
    setUserUI();  
})
    .catch(err => {
        alert(err.message);
    });
}
// -------- SIGNUP --------

function signup() {

    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let username = document.getElementById("signupName").value;

    //  Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter valid email (example: abc@gmail.com)");
        return;
    }

    //  Password validation
    if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
    }

    //  Username validation
    if (username.includes(" ")) {
        alert("Username should not contain spaces");
        return;
    }

    fetch("/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Signup successful!");
        showLogin();
    });
}



// -------- SWITCH --------
function showSignup(){
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");
}

function showLogin(){
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

// -------- Hamburger Menu --------
function toggleMenu(){
    document.getElementById("menu").classList.toggle("hidden");
}

//--------- ORDER HISTORY --------
function goToHistory(){
    window.location.href = "order-history.html";
}

function goToProfile(){
    window.location.href = "profile.html";
}

function goToHelp(){
    window.location.href = "help.html";
}
// -------- LOAD RESTAURANTS --------
// function loadRestaurants() {
//     fetch("/restaurants")
//     .then(res => res.json())
//     .then(data => {
//         let div = document.getElementById("restaurants");
//         div.innerHTML = "";

//         data.forEach(r => {
//             div.innerHTML += `
//                 <div class="card" onclick="loadFood(${r.id})">
//                     <h3>${r.name}</h3>
//                     <p>${r.category}</p>
//                 </div>
//             `;
//         });
//     });
// }

function loadRestaurants() {
    fetch("/restaurants")
    .then(res => res.json())
    .then(data => {

        allRestaurants = data; //  store original data

        displayRestaurants(data); //  show all initially
    });
}

function displayRestaurants(data) {
    let div = document.getElementById("restaurants");
    div.innerHTML = "";

    data.forEach(r => {
        div.innerHTML += `
            <div class="card" onclick="loadFood(${r.id})">
                <h3>${r.name}</h3>
                <p>${r.category}</p>
            </div>
        `;
    });
}
// -------- FILTER CATEGORY --------

function filterCategory(category) {

    // highlight active button
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    // filtering logic
    if (category === "") {
        displayRestaurants(allRestaurants);
        return;
    }

    let filtered = allRestaurants.filter(r =>
        r.category === category
    );

    displayRestaurants(filtered);
}

// -------- SEARCH RESTAURANTS --------
function searchRestaurants() {
    let keyword = document.querySelector(".search-box").value.toLowerCase();

    let filtered = allRestaurants.filter(r =>
        r.name.toLowerCase().includes(keyword)
    );

    displayRestaurants(filtered);
}

// -------- LOAD FOOD --------
function loadFood(id) {
    fetch("/food/" + id)
    .then(res => res.json())
    .then(data => {
        let div = document.getElementById("food");
        div.innerHTML = "";

        data.forEach(f => {
            div.innerHTML += `
                <div class="card">
                    <h3>${f.name}</h3>
                    <p>&#8377;${f.price}</p>
                    <button onclick="addToCart(${f.id}, '${f.name}', ${f.price}, ${id})">Add</button>
                </div>
            `;
        });
    });
}

// -------- CART --------
function addToCart(foodId, name, price, restaurantId) {

    //  Restrict multiple restaurants
    if (currentRestaurantId && currentRestaurantId !== restaurantId) {
        alert("You can only order from one restaurant at a time!");
        return;
    }

    currentRestaurantId = restaurantId;

    if (cart[foodId]) {
        cart[foodId].quantity += 1;
    } else {
        cart[foodId] = {
            foodId: foodId,
            name: name,
            price: price,
            quantity: 1
        };
    }

    renderCart();
}

function increaseQty(id) {
    cart[id].quantity++;
    renderCart();
}

function decreaseQty(id) {
    if (cart[id].quantity > 1) {
        cart[id].quantity--;
    } else {
        delete cart[id];
    }

    // Reset restaurant if cart empty
    if (Object.keys(cart).length === 0) {
        currentRestaurantId = null;
    }

    renderCart();
}

function removeItem(id) {
    delete cart[id];

    if (Object.keys(cart).length === 0) {
        currentRestaurantId = null;
    }

    renderCart();
}

function renderCart() {
    let list = document.getElementById("cart");
    list.innerHTML = "";

    let total = 0;

    Object.values(cart).forEach(item => {
        total += item.price * item.quantity;

        list.innerHTML += `
            <li>
                ${item.name} | &#8377;${item.price}

                <button onclick="decreaseQty(${item.foodId})">-</button>
                ${item.quantity}
                <button onclick="increaseQty(${item.foodId})">+</button>

                <button onclick="removeItem(${item.foodId})">Remove</button>
            </li>
        `;
    });

    list.innerHTML += `<h3>Total: &#8377;${total}</h3>`;
}

// -------- ORDER --------
function placeOrder() {

    if (Object.keys(cart).length === 0) {
        alert("Cart is empty!");
        return;
    }

    //  Store cart temporarily
    localStorage.setItem("cart", JSON.stringify(cart));

    //  Redirect to bill page (NO API CALL HERE)
    window.location.href = "bill.html";
}

// -------- LOGOUT --------
function logout() {
    localStorage.removeItem("user");
    location.reload();
}
