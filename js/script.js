const container = document.getElementById("product-container");

(function($) {

  "use strict";

  var searchPopup = function() {
      // open search box
      $('.secondary-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

  // Preloader
  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-img"), {
      keepImg: true,
    });
  }

  // Tab Section
  var initTabs = function() {
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // document ready
  $(document).ready(function() {
    searchPopup();
    initPreloader();
    initTabs();
    initJarallax();

    jQuery(document).ready(function($) {
      jQuery('.stellarnav').stellarNav({
        position: 'right'
      });
    });

    $(".user-items .icon-search").click(function(){
      $(".search-box").toggleClass('active');
      $(".search-box .search-input").focus();
    });
    $(".close-button").click(function(){
      $(".search-box").toggleClass('active');
    });

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      pagination: {
        el: "#billboard .swiper-pagination",
        clickable: true,
      },
    });

    var swiper = new Swiper(".two-column-swiper", {
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
    });

    var swiper = new Swiper("#featured-products .product-swiper", {
      pagination: {
        el: "#featured-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        999: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1299: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper("#featured-products .product-swiper-two", {
      pagination: {
        el: "#featured-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        999: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1299: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper("#flash-sales .product-swiper", {
      pagination: {
        el: "#flash-sales .product-swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        999: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1299: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: {
        nextEl: ".next-button",
        prevEl: ".prev-button",
      },
    });

    var thumb_slider = new Swiper(".thumb-swiper", {
      slidesPerView: 1,
    });
    var large_slider = new Swiper(".large-swiper", {
      spaceBetween: 10,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    // Initialize Isotope
    var $grid = $('.entry-container').isotope({
      itemSelector: '.entry-item',
      layoutMode: 'masonry'
    });
    $grid.imagesLoaded().progress(function() {
      $grid.isotope('layout');
    });

    $(".gallery").colorbox({
      rel:'gallery'
    });
    
    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585,
    });

  });

})(jQuery);


//////////////////////omar section///////////////////////
document.addEventListener('DOMContentLoaded', function() {
  const categoryFiles = {
    All: "../data_json/All-Games.json",
    Mind: "../data_json/Mind-Games.json",
    Kids: "../data_json/Kids-Games.json",
    E: "../data_json/E-Games.json",
    Board: "../data_json/Board-Games.json",
    Puzzles: "../data_json/Puzzles.json"
  };

  function loadCategory(category) {
    console.log(`Loading category: ${category}`);
    const jsonFile = categoryFiles[category];
    if (!jsonFile) {
      console.error(`No JSON file found for category: ${category}`);
      return;
    }

    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="loadCategory('${category}')"]`).classList.add('active');

    fetch(jsonFile)
    .then(response => response.json())
    .then(products => {
        container.innerHTML = "";
        products.forEach(product => {
            let template = document.createElement('template');
            template.id = 'product-template';
            template.innerHTML = 
              `<div class="product-item col-lg-3 col-md-6 col-sm-6" >
                <div class="image-holder">
                  <img src="${product.image}" alt="" class="product-image"style="height:300px;object-fit:fill;!important">
                </div>
                <div class="cart-concern">
                  <div class="cart-button d-flex justify-content-between align-items-center">
                    <button type="button" class="btn-wrap cart-link d-flex align-items-center" 
                      onclick="addToCart(${product.id})">Add to cart 
                      <i class="icon icon-arrow-io"></i></button>

                    <button type="button" class="wishlist-btn" 
                      id="fav-btn-${product.id}" 
                      onclick="addToFav(${product.id})">
                      <i class="fa-solid fa-heart" id="fav-icon-${product.id}"></i>
                    
                    </button>
                  </div>
                </div>
                <div class="product-details">
                  <h3 class="product-name">${product.game_name}</h3>
                  <p class="product-price">${product.price} <span class="currency">JD</span></p>
                  <p class="product-description">${product.description}</p>
                </div>
              </div>`
            ;

            let card = template.content.cloneNode(true);
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading products:", error));
  }

  function addToCart(productId) {
    try {
        let loginUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));
        if (!loginUser || !loginUser.id) {
            alert("Please login to add items to cart");
            return;
        }

        const userId = loginUser.id;

        let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
        
        let cart = diceWave.cart || [];

        const exists = cart.some(item => item.userId === userId && item.productId === productId);
        if (!exists) {
            cart.push({ userId, productId });
            diceWave.cart = cart;

            localStorage.setItem("diceWave", JSON.stringify(diceWave));
            alert("Added to cart completed");
        } else {
            alert("Product already in cart");
        }
    } catch (error) {
        alert("An error occurred while adding to cart. Please Login");
        console.error(error);
    }
  }

  function addToFav(productId) {
    try {
        let loginUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));
        if (!loginUser || !loginUser.id) {
            alert("Please login to manage your favorites");
            return;
        }

        const userId = loginUser.id;
        let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
        let fav = diceWave.fav || [];

        const index = fav.findIndex(item => item.userId === userId && item.productId === productId);
        if (index === -1) {
            fav.push({ userId, productId });
            console.log("Added to favorites:", { userId, productId });
        } else {
            fav.splice(index, 1);
            console.log("Removed from favorites:", { userId, productId });
        }

        diceWave.fav = fav;
        localStorage.setItem("diceWave", JSON.stringify(diceWave));
        updateFavButton(productId);
    } catch (error) {
        alert("An error occurred while managing favorites. Please Login");
        console.error(error);
    }
  }

  function updateFavButton(productId) {
    let loginUser = JSON.parse(localStorage.getItem('loggedInUserDiceWave'));
    if (!loginUser || !loginUser.id) return;

    const userId = loginUser.id;
    let diceWave = JSON.parse(localStorage.getItem('diceWave')) || {};
    let fav = diceWave.fav || [];

    const isFavorite = fav.some(item => item.userId === userId && item.productId === productId);
    const favButton = document.getElementById(`fav-btn-${productId}`);
    const favIcon = document.getElementById(`fav-icon-${productId}`);

    if (favButton && favIcon) {
        if (isFavorite) {
            favButton.classList.add("active");
            favButton.innerHTML = `<i class="fa-solid fa-heart" id="fav-icon-${productId}" style="color: red;"></i>`;
        } else {
            favButton.classList.remove("active");
            favButton.innerHTML = `<i class="fa-solid fa-heart" id="fav-icon-${productId}" style="color: inherit;"></i>`;
        }
    }
  }

  window.loadCategory = loadCategory;
  window.addToCart = addToCart;
  window.addToFav = addToFav;
  loadCategory('All');
});
