"use strict";

// variables
let startingWithQuery = false;
let searchingWordQuery = false;
let countriesNames;
let countriesData;

// selectors
const loader = document.querySelector('#loading');
const totalResult = document.querySelector('.header__results');
const result = document.querySelector('.results');
const totalCountries = document.querySelector('.header__total');
const startingWord = document.getElementById('starting-word');
const searchWord = document.getElementById('search-word');

const searchInput = document.getElementById('search-input');
const searchInputContainer = document.getElementById('main__search');

// modal selectors
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');


// data from api
async function getData(){

  const countriesAPI = 'https://restcountries.com/v2/all';

  try {
    let countries = await fetch(countriesAPI);
    return await countries.json()
  } catch (error) {
    removeLoading();
    result.innerHTML = 'Cannot connect to the server'
    return;
    //console.log(error.message)
  } finally {
    removeLoading();   
  }
}

async function renderData() {
  displayLoading()
  let countries = await getData();
  countriesNames = countries.map(country =>  country.name);
  countriesData = countries.map(country => country);
  totalCountries.innerText = `Total number of countries: ${countriesNames.length}`;
  display(countriesNames, false);
}

renderData()

// FUNCTIONS

// population number format
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// show modal

function showBox(e) {
  let query = e.target.id;
  let result = countriesData.filter((country) => country.name === query);
  //console.log(result)
  let html = `
  <div class="modal-header">
    <h1>${result[0].name}</h1>
    <button id="close-button" class="close-button">&times;</button>
  </div>
  <div class="modal-content">
    <div class="modal-content__flag">
    <img src="${result[0].flags.png}" alt="${result[0].name} flag">
    </div>
    <div class="modal-content__info">
      <p>Population: ${numberWithCommas(result[0].population)}</p>
      <p>Capital: ${result[0].capital} </p>
      <p>Languages: ${result[0].languages?.map(language => language.name)} </p>
      <p>Currencies: ${result[0].currencies?.map(currency => currency.name)}</p>
    </div>
  </div>`;
  modal.innerHTML = html;
  openModal(modal);
  overlay.addEventListener('click', closeModal)
  document.querySelector('#close-button').addEventListener('click', closeModal)
  
}

function openModal() {
  if(modal === null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal() {
  modal.classList.toggle('active');
  overlay.classList.toggle('active');
}



// display data
function display(data, sorting) {
  result.innerHTML = "";

  // if(sorting) data.reverse();

  const filteredData = countriesData.filter(country => data.includes(country.name));

  filteredData.forEach((country) => {
    let countryBox = document.createElement('div');
    countryBox.classList.add('country');
    countryBox.innerHTML = `
        <div class="country__box">
            <div class="country__flag">
            <a class="country__link"><img src="${country.flags.png}" alt="${country.name} flag" id="${country.name}"> </a>
            </div>
            <p>${country.name}</p>
        </div>     
    `;
    result.appendChild(countryBox)
  });

  const countryBoxes = result.querySelectorAll('a');
  countryBoxes.forEach((box) => box.addEventListener('click', showBox))
}


//search with starting letters
function startingWordFunction() {
  startingWord.classList.toggle('selected');
  searchWord.classList.remove('selected');
  startingWithQuery = !startingWithQuery;
  searchingWordQuery = false;
  searchInputContainer.classList.remove('hidden')
  searchInput.placeholder = "Search with any starting letter...";
  display(countriesNames);
}

//search containing word
function searchWordFunction() {
  startingWord.classList.remove('selected');
  searchWord.classList.toggle('selected');
  searchingWordQuery = !searchingWordQuery;
  startingWithQuery = false;
  searchInputContainer.classList.remove('hidden')
  searchInput.placeholder = "Search with any country containing...";
  display(countriesNames);
}

//set reverse sorting
function sortingReverseFunction() {
  sortingReverse = !sortingReverse;
  sortButton.classList.toggle('selected');  
}

// filter list
function filterList(){
  let result = countriesNames;
  
  const filter = searchInput.value.toLowerCase();

  if(startingWithQuery) {
    result = countriesNames.filter((country) => country.toLowerCase().startsWith(filter));
    totalResult.innerText = `Total countries starting with ${filter.toUpperCase()}: ${result.length}`;
    display(result);  
  } else if(searchingWordQuery) {
    result = countriesNames.filter((country) => country.toLowerCase().includes(filter));
    totalResult.innerText = `Total countries containing ${filter.toUpperCase()}: ${result.length}`;
    
    display(result);  
  } 

  display(result, sortingReverse);
}

// show loader
function displayLoading(){
  loader.classList.add('display')
}

// remove loader
function removeLoading(){
  loader.classList.remove('display')
}

// events
startingWord.addEventListener('click', () => {startingWordFunction(); searchInput.value = ""})
searchWord.addEventListener('click', () => {searchWordFunction(); searchInput.value = ""})
searchInput.addEventListener('input', filterList)

