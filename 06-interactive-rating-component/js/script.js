"use strict";

console.log("test");

// 1. set up initial state variables and functions
// 2. check if the button was pressed but no selection
// 3. if selection true, hide first div, show thank you div
// 4. in thank you div, display selected rate in text
// 5. setup exit thank you, hide it and show the initial rating div

//1. state variables
const containerRate = document.querySelector(".container-rate");
const containerThanks = document.querySelector(".container-thanks");
const rate = document.querySelectorAll(".rate");
const submitBtn = document.querySelector(".submit-btn");
const submitRate = document.querySelector(".submit-rate");
const event = ["click", "keydown"];
let rating;

// 1. defing functions
//for close and open
const hideWindow = function (container) {
  container.classList.add("hidden");
};

const showWindow = function (container) {
  container.classList.remove("hidden");
};

// for removing class rating buttons
const removeSelectedClass = function () {
  for (let i = 0; i < rate.length; i++) {
    rate[i].classList.remove("selected");
  }
};

// for selected rating buttons

const addSelectedClass = function () {
  removeSelectedClass();
  this.classList.add("selected");
};

for (let i = 0; i < rate.length; i++) {
  rate[i].addEventListener("click", addSelectedClass);
}

//2
//check if submit is pressed
submitBtn.addEventListener("click", function () {
  for (let i = 0; i < rate.length; i++) {
    if (rate[i].classList.contains("selected")) {
      rating = Number(rate[i].textContent);
      // 3. if selection true, hide first div, show thank you div
      hideWindow(containerRate);
      showWindow(containerThanks);
      // 4. in thank you div, display selected rate in text
      submitRate.textContent = rating;
    }
  }
});

// 5. setup exit thank you, hide it and show the initial rating div
// container click
containerThanks.addEventListener("click", function () {
  hideWindow(containerThanks);
  showWindow(containerRate);
  removeSelectedClass();
});

//escape key
document.addEventListener("keydown", function (event) {
  //console.log(event);
  if (event.key === "Escape" && containerRate.classList.contains("hidden")) {
    hideWindow(containerThanks);
    showWindow(containerRate);
    removeSelectedClass();
  }

  if (event.key === "Escape" && containerThanks.classList.contains("hidden")) {
    removeSelectedClass();
  }
});

// extra: if the user wants to exit the rating without submiting
// document.addEventListener("click", function () {
//   removeSelectedClass();
// });
