let order = JSON.parse(localStorage.getItem("order"));
let date = new Date(order.createdAt);
document.getElementById("orderId").innerText = order.id;
// document.getElementById("orderDate").innerText = order.orderDate;
document.getElementById("orderDate").innerText = date.toLocaleString();
document.getElementById("orderStatus").innerText = order.status;
document.getElementById("totalAmount").innerText = order.totalAmount;


//GST 5% and delivery charge 40
let itemTotal = order.totalAmount;

let gst = itemTotal * 0.05;
let delivery = 40;

let finalTotal = itemTotal + gst + delivery;

document.getElementById("gst").innerText = gst.toFixed(2);
document.getElementById("delivery").innerText = delivery;
document.getElementById("finalTotal").innerText = finalTotal.toFixed(2);

// let list = document.getElementById("billItems");

// order.items.forEach(item => {
//     list.innerHTML += `
//         <li>
//             ${item.food.name} - ${item.price} - ${item.quantity}
//         </li>
//     `;
// });

let list = document.getElementById("billItems");

order.items.forEach(item => {

    let itemTotal = item.price * item.quantity;

    list.innerHTML += `
        <tr>
            <td>${item.food.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${itemTotal}</td>
        </tr>
    `;
});

function goHome(){
    window.location.href = "/";
}