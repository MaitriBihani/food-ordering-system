let userId = localStorage.getItem("userId");

fetch(`/order/user/${userId}`)
    .then(res => res.json())
    .then(data => {

        let container = document.getElementById("orders");

        data.forEach(order => {

            let date = new Date(order.createdAt).toLocaleString();

            let itemsHtml = "";

            order.items.forEach(item => {
                itemsHtml += `
                    <li>${item.food.name} - ${item.quantity}</li>
                `;
            });

            container.innerHTML += `
                <div class="card">
                    <h3>Order #${order.id}</h3>
                    <p>Date: ${date}</p>
                    <p>Status: ${order.status}</p>
                    <p>Total: ${order.totalAmount}</p>

                    <ul>${itemsHtml}</ul>
                </div>
            `;
        });
    });

function goHome(){
    window.location.href = "/";
}