document.getElementById("authLink").addEventListener("click", function (event) {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));

    if (!loggedInUser) {
        window.location.href = "../../pages/auth/login.html";
    } else {
        window.location.href = "../../pages/auth/profile.html";
    }
});

//edite by nadien
    document.addEventListener("DOMContentLoaded", function() {
      loadFeedbacks();
    });
  
    document.getElementById('addFeedbackBtn').addEventListener('click', function() {
      let formContainer = document.getElementById('feedbackFormContainer');
      formContainer.style.display = (formContainer.style.display === "block") ? "none" : "block";
    });
 

  
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      let name = document.getElementById('name').value;
      let message = document.getElementById('message').value;
  
      let feedback = {
        name: name,
        message: message
      };
  
      saveFeedback(feedback);
      addFeedbackToPage(feedback);
  
      document.getElementById('feedbackFormContainer').style.display = "none";
      document.getElementById('feedbackForm').reset();
    });

    function saveFeedback(feedback) {
      let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
    
      if (!Array.isArray(diceWave.feedbacks)) {
        diceWave.feedbacks = [];
      }
    
      diceWave.feedbacks.push(feedback);
      localStorage.setItem('diceWave', JSON.stringify(diceWave));
    }

    function loadFeedbacks() {
      let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
      let feedbacks = diceWave.feedbacks || [];
    
      feedbacks.forEach(feedback => addFeedbackToPage(feedback));
    }
  
    function addFeedbackToPage(feedback) {
      let feedbackList = document.getElementById('feedback-list');
      let newFeedback = document.createElement('div');
      newFeedback.classList.add('swiper-slide');
      newFeedback.innerHTML = `
        <div class="testimonial-detail">
          <p>“${feedback.message}”</p>
          <div class="author-detail">
            <div class="name">${feedback.name}</div>
          </div>
        </div>
      `;
      feedbackList.appendChild(newFeedback);
      
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        fetch("../../data_json/best-salary.json")
          .then(response => response.json())
          .then(products => {
            const container = document.getElementById("products-container");
      
            products.forEach(product => {
              const productHTML = `
              <div class="swiper-slide">
                <div class="product-item">
                  <img src="${product.image}" alt="${product.alt}" class="product-image" style="width:90%;height:350px;object-fit:fill;!important">
                  <div class="product-detail">
                    <h3 class="product-title">
                      ${product.category}
                    </h3>
                  </div>
                </div>
                </div>
              `;
              container.innerHTML += productHTML;
            });
          })
          .catch(error => console.error("Error loading products:", error));
      });      
