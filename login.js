const ADMIN_PASSWORD = "123456";

document.getElementById("loginBtn").addEventListener("click", () => {

    const password = document.getElementById("password").value.trim();

    if (password === ADMIN_PASSWORD) {

        sessionStorage.setItem("admin", "true");

        window.location.href = "admin.html";

    } else {

        alert("❌ Wrong Password");

    }

});
