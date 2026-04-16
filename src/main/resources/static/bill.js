// LOAD DATA (ORDER OR CART)
let order = JSON.parse(localStorage.getItem("order"));
let cart = JSON.parse(localStorage.getItem("cart"));


// BILL RENDERING
let list = document.getElementById("billItems");

if (order) {
    // ===== AFTER ORDER PLACED =====

    let date = new Date(order.createdAt);

    document.getElementById("orderId").innerText = order.id;
    document.getElementById("orderDate").innerText = date.toLocaleString();
    document.getElementById("orderStatus").innerText = order.status;
    document.getElementById("totalAmount").innerText = order.totalAmount;

    let itemTotal = order.totalAmount;
    let gst = itemTotal * 0.05;
    let delivery = 40;
    let finalTotal = itemTotal + gst + delivery;

    document.getElementById("gst").innerText = gst.toFixed(2);
    document.getElementById("delivery").innerText = delivery;
    document.getElementById("finalTotal").innerText = finalTotal.toFixed(2);

    order.items.forEach(item => {
        let total = item.price * item.quantity;

        list.innerHTML += `
            <tr>
                <td>${item.food.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${total}</td>
            </tr>
        `;
    });

} else if (cart) {
    // ===== BEFORE ORDER (CART VIEW) =====

    document.getElementById("orderId").innerText = "Not Generated Yet";
    document.getElementById("orderDate").innerText = new Date().toLocaleString();
    document.getElementById("orderStatus").innerText = "Pending";

    let itemTotal = 0;

    Object.values(cart).forEach(item => {
        let total = item.price * item.quantity;
        itemTotal += total;

        list.innerHTML += `
            <tr>
                <td>${item.food.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${total}</td>
            </tr>
        `;
    });

    document.getElementById("totalAmount").innerText = itemTotal;

    let gst = itemTotal * 0.05;
    let delivery = 40;
    let finalTotal = itemTotal + gst + delivery;

    document.getElementById("gst").innerText = gst.toFixed(2);
    document.getElementById("delivery").innerText = delivery;
    document.getElementById("finalTotal").innerText = finalTotal.toFixed(2);

} else {
    alert("No cart data found!");
}

// PAYMENT LOGIC

let selectedPaymentMethod = null;

function selectPayment(method, element) {
    selectedPaymentMethod = method;

    // remove old selection
    const cards = document.querySelectorAll('.payment-card');
    cards.forEach(card => card.classList.remove('selected'));

    // add new selection
    element.classList.add('selected');

    // enable button
    document.getElementById("confirmBtn").disabled = false;
}

// CONFIRM ORDER

function confirmOrder() {

    if (!selectedPaymentMethod) {
        alert("Please select a payment method!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart"));
    const userId = localStorage.getItem("userId");

    if (!cart) {
        alert("Cart is empty!");
        return;
    }

    fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            items: Object.values(cart),
            paymentMethod: selectedPaymentMethod
        })
    })
    .then(res => res.json())
    .then(data => {

        // save order
        localStorage.setItem("order", JSON.stringify(data));

        // clear cart
        localStorage.removeItem("cart");

        alert("Order placed successfully!\nPayment: " + selectedPaymentMethod);

        // reload to show order details
        window.location.reload();
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong!");
    });
}


// GO HOME

function goHome(){
    window.location.href = "/";
}