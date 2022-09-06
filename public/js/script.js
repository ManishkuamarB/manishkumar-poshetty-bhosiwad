let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
function fun1() {
    var price = document.getElementById("priceid").innerText;
    var count = document.getElementById("itemid").value;
    var title = document.getElementById("item").innerText;
    var total = (parseInt(price) * parseInt(count)) + 33.0;
    localStorage.setItem("total", total);
    localStorage.setItem("ProductName", title);
    localStorage.setItem("ProdutPrice", price);
    localStorage.setItem("ProductCount", count);
    alert(`YOUR ORDER is ${title} price is ${price} with count of ${count}`)
    location.href = 'orderdetail.html'
}

function orderreciept() {

    var productName = document.getElementById("productName");
    var produtPrice = document.getElementById("productPrice");
    var productCount = document.getElementById("productCount");
    var totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = `Pay Now ₹${localStorage.getItem("total")}`
    productCount.innerHTML = localStorage.getItem("ProductCount");
    productName.innerHTML = localStorage.getItem("ProductName");
    produtPrice.innerHTML = `₹${localStorage.getItem("ProdutPrice")}`;
    sessionStorage.setItem("totalPrice",totalPrice)
}
