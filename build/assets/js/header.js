function initHeaderAuth() {
    const token = localStorage.getItem("access_token");
    const userMenu = document.getElementById("userMenu");

    if (token && userMenu) {
        userMenu.classList.remove("d-none");
    }
}

// Logout handler
document.addEventListener("click", (e) => {
    if (e.target.id === "logoutBtn") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "login.html";
    }
});
