let user = JSON.parse(localStorage.getItem("user"));


if (!user) {
    window.location.href = "/";  // Redirect to login if no user data
} else {
    document.getElementById("name").innerText = user.username;
    document.getElementById("email").innerText = user.email;
}
function logout(){
    localStorage.clear();
    window.location.href = "/";
}

function goHome(){
    window.location.href = "/";
}