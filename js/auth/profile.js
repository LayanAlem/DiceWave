document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));

    if (!loggedInUser) {
        window.location.href = "../../pages/auth/login.html";
    } else {
        document.getElementById('userName').innerText = loggedInUser.fName + " " + loggedInUser.lName;
        document.getElementById('email').innerText = loggedInUser.email;
        document.getElementById('phoneNumber').innerText = loggedInUser.phoneNumber;
        document.getElementById('address').innerText = loggedInUser.address;
    }

    let logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem('loggedInUserDiceWave');
            window.location.href = "../../index.html";
        });
    }
});
