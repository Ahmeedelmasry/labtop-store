//Nav transform on scrolling //Scroll to top button
let nav = document.querySelector(".navbar");
let scroller = document.querySelector(".scroller i");

window.onscroll = function () {
    if (window.scrollY >= 300) {
      scroller.style.opacity = .5;
      scroller.style.display = "block";
  }
  if (window.scrollY < 300) {
    scroller.style.opacity = 0
    scroller.style.display = "none";
}
}
$(function () {
  'use strict';
  //Calc Body Padding Depending on Navbar Height
  $("body").css("paddingTop" , $(".navbar").innerHeight());

      //Element scroll using data attribute
      $(".navbar li a").click(function(e) {
        e.preventDefault();

        $('html , body').animate({
            scrollTop: $('#' + $(this).data("scroll")).offset().top - 200
        } , 500);
    }); 

    //Sync navbar links with sections

    $(window).scroll(function () {

      $('.block').each(function() {

          if ($(window).scrollTop() >= $(this).offset().top - $(".navbar").innerHeight() - 200 ) {

              let blockId = $(this).attr('id');

              $('.navbar li a').removeClass("active");
              
              $('.navbar li a[data-scroll="' + (blockId) + '"]').addClass('active');

          }
          if ($(window).scrollTop() < 100) {
            $('.navbar li a').removeClass("active");
          }
      })
  })

  //View Each Category Product When Click On View Button
  //Lenovo Products
  $(".lenovo-btn").click(function(e) {
    e.preventDefault()
    if ($(".lenovo-products").css("display") === "none") {
      $(".lenovo-products").fadeIn(1000);
      $('html , body').animate({
        scrollTop: ($(".lenovo-products").offset().top - 50) 
    } , 500);
    }
    else {
      $(".lenovo-products").fadeOut(1000);
      $('html , body').animate({
        scrollTop: ($(".lenovo").offset().top - 150) 
    } , 500);
    }
  });
  //Dell Products
  $(".dell-btn").click(function(e) {
    e.preventDefault()
    if ($(".dell-products").css("display") === "none") {
      $(".dell-products").fadeIn(1000);
      $('html , body').animate({
        scrollTop: ($(".dell-products").offset().top - 50) 
    } , 500);
    }
    else {
      $(".dell-products").fadeOut(1000);
      $('html , body').animate({
        scrollTop: ($(".dell").offset().top - 150) 
    } , 500);
    }
  });
  //HP Products
  $(".hp-btn").click(function(e) {
    e.preventDefault()
    if ($(".hp-products").css("display") === "none") {
      $(".hp-products").fadeIn(1000);
      $('html , body').animate({
        scrollTop: ($(".hp-products").offset().top - 50) 
    } , 500);
    }
    else {
      $(".hp-products").fadeOut(1000);
      $('html , body').animate({
        scrollTop: ($(".hp").offset().top - 150) 
    } , 500);
    }
  });
  //Top Products
  $(".top-btn").click(function(e) {
    e.preventDefault()
    if ($(".top-products").css("display") === "none") {
      $(".top-products").fadeIn(1000);
      $('html , body').animate({
        scrollTop: ($(".top-products").offset().top - 50) 
    } , 500);
    }
    else {
      $(".top-products").fadeOut(1000);
      $('html , body').animate({
        scrollTop: ($(".top").offset().top - 150) 
    } , 500);
    }
  });
})


$(scroller).on('click' , function() {
  window.scrollTo(0 , 0 )
});
//Responsive nav
let respIcon = document.querySelector(".responsive .icon");
let respMenu = document.querySelector(".responsive .icon ul");
let overlay = document.querySelector(".overlayy");

overlay.onclick = function () {
    overlay.style.display = "none";
    productV.style.display = "none";
    cartSection.style.transform = "translateY(-20%)";
    cartSection.style.height = "0%";
}

//Product View
let productBtn = document.querySelectorAll("section .card a");
let viewClose = document.querySelector(".view-close");
let productV = document.querySelector(".product-view");
let productImg = document.querySelector(".product-view img");
let productTitle = document.querySelector(".product-view h3");
let productPrice = document.querySelector(".product-view p");
let cartSection = document.querySelector(".cart")
let cartFeild = document.querySelector(".cart .cart-feild");
let addCart = document.querySelector(".product-view .product-det button");
let cartIcon = document.querySelector(".navbar .cart-icon");
let cartExit = document.querySelector(".cart .exit");
let empty = document.querySelector(".cart h2");
let buyNow = document.querySelector(".cart .buy-now");

cartIcon.onclick = function() {
  cartSection.style.transform = "translateY(0%)";
  cartSection.style.height = "100%";
  overlay.style.display = "block";
  overlay.style.zIndex = 1000;
  if (cartFeild.innerHTML !== "") {
    empty.style.display = "none";
    buyNow.style.display = "block";
  }
  else {
    empty.style.display = "block";
    buyNow.style.display = "none";
  }
};

buyNow.onclick = function (e) {
  if (cartFeild.innerHTML === "") {
    e.preventDefault();
  }
}

cartExit.onclick = function() {
  cartSection.style.transform = "translateX(100%)";
  overlay.style.display = "none";
  overlay.style.zIndex = 200;
}

viewClose.onclick = function () {
    overlay.style.display = "none";
    productV.style.display = "none";
}
productBtn.forEach(e => {
  e.addEventListener("click" , e => {
    e.preventDefault();
    overlay.style.display = "block";
    overlay.style.zIndex = 1000
    productV.style.display = "flex";
    productImg.setAttribute("src" , document.querySelector (e.target.dataset.product).getAttribute("src"));
    productTitle.innerText =  document.querySelector (e.target.dataset.title).innerText;
    productPrice.innerText =  document.querySelector (e.target.dataset.price).innerText;
  })
});

//Start Cart

//Empty Array To Store The item
let arrayOfItems = [];

//Check if there is item in local storage
if(localStorage.getItem("items")) {
  arrayOfItems = JSON.parse(localStorage.getItem("items"));
}



getDataFromLocalStorage();
//add Item 
addCart.onclick = function (e) {

        addItemToArray();
        e.preventDefault();

};

//Click On Item Element
cartFeild.addEventListener("click" , function (e) {
    //Delete Button
    if(e.target.classList.contains("del")) {
        //Remove Element From Local Storage
        deleteItemWith(e.target.parentElement.getAttribute("data-id"));
        //remove element from page 
        e.target.parentElement.remove();
    }
})

function addItemToArray() {
    //Item data
    const item = {
        title: productTitle.innerText,
        price: productPrice.innerText,
        img: productImg.getAttribute("src"),
        id: Date.now(),
    };
    //push items to array of items
    if (arrayOfItems.push(item)) {
      cartFeild.style.display = "flex";
    }
    addElementsToPgaeFrom(arrayOfItems);
    //Add items to Local Storage
    addDataToLocalStorageFrom(arrayOfItems);
}
function addElementsToPgaeFrom(arrayOfItems) {
    //Looping array of items
    cartFeild.innerHTML = "";
    arrayOfItems.forEach (function (item) {
        //Create main div of new items
        let div = document.createElement("div");
        div.className = "item";
        div.setAttribute("data-id" , item.id);
        //Create Img
        let img = document.createElement("img");
        img.setAttribute("src" , item.img);
        img.className = "cart-img";
        div.appendChild(img);
        //Create title
        let title = document.createElement("h3");
        title.appendChild(document.createTextNode(item.title));
        title.className = "cart-title";
        div.appendChild(title)
        //Create price
        let price = document.createElement("p");
        price.appendChild(document.createTextNode(item.price));
        price.className = "cart-price";
        div.appendChild(price);
        //Create Delete Btn
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        //Append Btn To Div
        div.appendChild(span);
        //Add items div to item container
        cartFeild.appendChild(div);
    });
    //Function Done
};


function addDataToLocalStorageFrom(arrayOfItems) {
    localStorage.setItem("items" , JSON.stringify(arrayOfItems));
};
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("items");
    if (data) {
        let items = JSON.parse(data);
        addElementsToPgaeFrom(items);
    }
}

function deleteItemWith(itemId) {
    arrayOfItems = arrayOfItems.filter((item) => item.id !=itemId);
    addDataToLocalStorageFrom(arrayOfItems);
}









