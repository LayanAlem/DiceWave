function login(){
    event.preventDefault();

    const email      = document.getElementById('email').value;
    const password   = document.getElementById('password').value;

    let ecommerceData = JSON.parse(localStorage.getItem('diceWave')) || { users : [] };
    let users = ecommerceData.users || [];

    let foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
        localStorage.setItem('loggedInUserDiceWave', JSON.stringify(foundUser));
        window.location.href = "../../index.html";
    } else {
        alert("Invalid Email or Password");
    }
}