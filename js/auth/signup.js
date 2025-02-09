function saveUser() {
    const userData = getUserInput();

    if (!validateUserData(userData)) {
        return;
    }

    let ecommerceData = JSON.parse(localStorage.getItem('diceWave')) || { users: [] };
    
    if (isEmailExists(ecommerceData.users, userData.email)) {
        alert("The email already exists");
        event.preventDefault();
        return;
    }

    saveToLocalStorage(ecommerceData, userData);
    window.location.href = "../../pages/auth/login.html";
    alert("Data Saved Successfully");
}

function getUserInput() {
    return {
        id: crypto.randomUUID(),
        fName: document.getElementById('fName').value.trim(),
        lName: document.getElementById('lName').value.trim(),
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        address: document.getElementById('address').value,
        password: document.getElementById('password').value,
        rePassword: document.getElementById('rePassword').value
    };
}

function validateUserData(user) {
    if (!user.fName || !user.lName || !user.email || !user.phoneNumber || !user.address || !user.password || !user.rePassword) {
        alert("All fields are required");
        event.preventDefault();
        return false;
    }

    if (!/^[A-Z][a-z]{0,7}$/.test(user.fName)) {
        alert("First name must start with a capital letter and be a maximum of 8 characters");
        event.preventDefault();
        return false;
    }

    if (!/^[A-Z][a-z]{0,7}$/.test(user.lName)) {
        alert("Last name must start with a capital letter and be a maximum of 8 characters");
        event.preventDefault();
        return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
        alert("Please enter a valid email address");
        event.preventDefault();
        return false;
    }

    if (!/^(077|078|079)\d{7}$/.test(user.phoneNumber)) {
        alert("Phone number must be 10 digits and start with 077, 078, or 079");
        return false;
    }

    if (!/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(user.password)) {
        alert("Password must be at least 8 characters long, contain at least one uppercase letter, and one special characters.");
        event.preventDefault();
        return false;
    }

    if (!/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(user.password)) {
        alert("Password must be at least 8 characters long, contain at least one uppercase letter, and one special characters.");
        event.preventDefault();
        return false;
    }

    if (user.password !== user.rePassword) {
        alert("The password and re-password do not match");
        event.preventDefault();
        return false;
    }

    return true;
}

function isEmailExists(users, email) {
    return users.some(user => user.email === email);
}

function saveToLocalStorage(ecommerceData, user) {
    ecommerceData.users.push({
        id: user.id,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        password: user.password
    });

    localStorage.setItem('diceWave', JSON.stringify(ecommerceData));
}