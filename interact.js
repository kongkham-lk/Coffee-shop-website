"use strict";

window.onload = init;

var orderPage = document.querySelector("div.order");
var button = document.querySelector("button.white.nav");
var buttonMobile = document.querySelector("div.nav nav.nav li.hide");
var close = document.querySelector("div.container img");
var cofMenu = document.querySelectorAll("section.main div.left li");
var desMenu = document.querySelectorAll("section.main div.right li");
var menuPageButton = document.querySelectorAll("section.main div.eachMenu div.menuDetail button.plus.white");
var menuPageSpan = document.querySelectorAll("section.main div.eachMenu div.menuDetail button.plus.white span");
var menuPicL = document.querySelector("section.main img.right-pic");
var menuPicR1 = document.querySelector("section.main img.left-pic");
var menuPicR2 = document.querySelector("section.main div.right img");

function init() {	
	/* pop order page and close it*/
	button.addEventListener("click", fadeIn);
	buttonMobile.addEventListener("click", fadeIn);
	close.addEventListener("click", fadeOut);
	
	
	for (var i = 0; i < cofMenu.length; i++) {
	   	/* change picture when hover on the menu name - home page */
		cofMenu[i].addEventListener("mouseenter", changePicCoff);
		desMenu[i].addEventListener("mouseenter", changePicDess);
		/* track order and add to the order button - home page */
		cofMenu[i].addEventListener("click", eachOrder);
		desMenu[i].addEventListener("click", eachOrder);
	}
	
	
	for (var j = 0; j < menuPageButton.length; j++) {
		/* track order and add to the order button - menu page */
		menuPageSpan[j].addEventListener("click", eachOrder);
	}
}

/* pop-up order screen method */
function fadeIn() {
	addToOrder();
	var op = 0.1;  // initial opacity
    orderPage.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        orderPage.style.opacity = op;
        orderPage.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 5);
}

/* close order screen method */
function fadeOut() {
	var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            orderPage.style.display = 'none';
        }
        orderPage.style.opacity = op;
        orderPage.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 5);
	var orderContainer = document.querySelector("div.order div.container");
}

/* change picture function for only coffee menu method */
function changePicCoff(e){
	var count = e.target.querySelector("span").innerText;
	var coffeePic = "coffee";
	
	/* getting menu's name only to update the picture file */
	if (count == "") {
		coffeePic = e.target.innerText;
	} else {
		coffeePic = e.target.innerText.slice(0, e.target.innerText.indexOf(' '));
	}
	
	menuPicL.src = "img/coffee/" + coffeePic + "-1.png";
	
	/* change display pic back everytime is not hover */
	e.target.addEventListener("mouseleave", resetPicCof);
	
	/* if there is a click, do not change display photo */
	e.target.addEventListener("click", function() {
		menuPicL.src = "img/coffee/" + coffeePic + "-1.png";
		e.target.removeEventListener("mouseleave", resetPicCof);
	});
}

function resetPicCof() {
	menuPicL.src = "https://images.pexels.com/photos/4669217/pexels-photo-4669217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
}

/* change picture function for only coffee menu method */
function changePicDess(e){
	var count = e.target.querySelector("span").innerText;
	var dessertPic = "dessert";
	
	/* getting menu's name only to update the picture file */
	if (count == "") {
		dessertPic = e.target.innerText;
	} else {
		dessertPic = e.target.innerText.slice(0, e.target.innerText.indexOf(' '));
	}
	
	menuPicR1.src = "img/dessert/" + dessertPic + "-1.png";
	menuPicR2.src = "img/dessert/" + dessertPic + "-1.png";
	
	/* change display pic back everytime is not hover */
	e.target.addEventListener("mouseleave", resetPicDes);
	
	/* if there is a click, do not change display photo */
	e.target.addEventListener("click", function() {
		menuPicR1.src = "img/dessert/" + dessertPic + "-1.png";
		menuPicR2.src = "img/dessert/" + dessertPic + "-1.png";
		e.target.removeEventListener("mouseleave", resetPicDes);
	});
}

function resetPicDes() {
	menuPicR1.src = "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
	menuPicR2.src = "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
}

/* track each order */
function eachOrder(e) {
	/* verify which page's element is passed in */
	var span = e.target.querySelector("span");
	if (span == null) {
		var span = e.target.parentElement.querySelector("span");
	}
	
	var buttonSpan = button.parentElement.querySelector("span");
	var buttonCount = buttonSpan.innerText;
	var count = span.innerText;
	
	/* verify which page's element is passed in */
	if (buttonCount == "") {		
		buttonCount = 0;
	}
	if (count == "" || count == "+") {
		count = 0;
	}
	
	/* unhide element */
	span.style.display = "inline-block";
	buttonSpan.style.display = "inline-block";
	
	/* track order and update */
	count++;
	buttonCount++;
	span.innerText = count;
	buttonSpan.innerText = buttonCount;
}

function addToOrder() {
	/* get popup order list container, create its componemt and set class's name */
	var orderList = document.querySelector("div.order div.container div.orderList");
	orderList.innerHTML = "";

	/* collecting all the ordered list's detail */
	/* verify which page's element is passed in */
	var lis = document.querySelectorAll("section.main li");
	var page = "index";
	if (lis.length == 0) {
		var lis = document.querySelectorAll("section.main div.menuDetail button.plus.white");
		page = "menu";
	}
	
	var str, name, amount, price;
	var sumAmount = 0;
	var sumPrice = 0;
	
	for (var i = 0; i < lis.length; i++) {
		/* verify which page's element is passed in and create element base on the pass-in element*/
		if (page == "index") {
			str = lis[i].innerText;
			name = str.slice(0, str.indexOf(' '))
			amount = parseInt(str.slice(str.indexOf(' ')));
			price = parseFloat(lis[i].getAttribute("class"));
		} else {
			name = lis[i].parentElement.querySelector("div h4").innerText;
			amount = parseInt(lis[i].querySelector("span").innerText);
			var priceStr = lis[i].parentElement.querySelector("div h5").innerText;
			price = parseFloat(priceStr.slice(priceStr.indexOf(" ")));
		}
		
		/* set the amount/count to number */
		if (amount == "" || amount == "+") {
			amount = 0;
		}
		
		/* do nothing if there is no order */
		if (amount > 0) {
			orderList.style.display = "block";
			
			price = Number(price * amount).toFixed(2);
			
			var eachOrder = "<div><h5><b>" + name + "</b> <span>x" + amount + "</spa></h5><h5>$ " + price + "</h5></div>";
			
			orderList.innerHTML += eachOrder;
			
			orderList.querySelector("div").setAttribute("class", "eachOrder");
			
			sumAmount += amount;
			sumPrice = Number(parseFloat(price) + parseFloat(sumPrice)).toFixed(2);
		}
	}
	
	/* update total amount and total price */
	var totalAmount = document.querySelector("div.order div.container div.totalPrice h5 span.amount");
	var totalPrice = document.querySelector("div.order div.container div.totalPrice h5.totalPrice");
	
	totalAmount.innerText = "x"+ sumAmount;
	totalPrice.innerText = "$ " + sumPrice;
}
