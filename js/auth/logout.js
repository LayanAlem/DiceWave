  document.getElementById("logoutBtnN").addEventListener("click", function(event) {
    event.preventDefault(); 
    localStorage.removeItem("loggedInUserDiceWave"); 
    window.location.href = "../../pages/auth/login.html";
  });