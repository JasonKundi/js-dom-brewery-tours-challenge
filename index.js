const state = {
  breweries: [],
};

function clear() {
  ulEl.innerHTML = "";
  formInputEl.value = "";
}

function render() {
  clear()
  listenToSelectStateForm();
  renderBreweryList();
}

const form1 = document.querySelector("#select-state-form");
const formInputEl = document.querySelector("#select-state");
const formInputValue = formInputEl.value;

function listenToSelectStateForm() {
  form1.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = "https://api.openbrewerydb.org/breweries?by_state=";

    fetch(url + formInputValue)
      .then(function (response) {
        console.log("raw response", response);
        return response.json();
      })
      .then(function (breweries) {
        state.breweries = breweries;
        console.log(breweries);
      });
    render();
  });
}

const formFilter = document.querySelector("#filter-by-type-form")
const filterInputValue = document.querySelector("#filter-by-type")

function checkBreweryType(brewery) {
  for (const brewery of state.breweries) {
    if (brewery.brewery_type == "Micro") {
      return true
    }
    if (brewery.brewery_type == "Regional") {
      return true
    }
    if (brewery.brewery_type == "Brewpub") {
      return true
    }
  }
  
}

function listenToFilterByTypeForm() {
  formFilter.addEventListener("change", function(event) {
    event.preventDefault();

    const filterInputValue = checkBreweryType(brewery);
    const urlByType = `${formInputValue}&by_type=`;
    
    fetch(urlByType + filterInputValue)
      .then(function (response) {
        console.log("raw response", response);
        return response.json();
      })
      .then(function (breweries) {
        state.breweries = breweries;
        console.log(breweries);
      });
    render();
  });


}

const ulEl = document.querySelector("#breweries-list");

function renderBreweryList() {
  for (const brewery of state.breweries) {
    const liEl = document.createElement("li");
    const h2El = document.createElement("h2");
    h2El.innerText = brewery.name;

    const divEl = document.createElement("div");
    divEl.classList.add("type");
    divEl.innerText = brewery.brewery_type;

    const sectionEl = document.createElement("section");
    sectionEl.classList.add("address");

    const h3El = document.createElement("h3");
    h3El.innerText = "Address:";
    const pEl = document.createElement("p");
    pEl.innerText = brewery.street;
    const pEl2 = document.createElement("p");
    pEl2.innerText = brewery.state + brewery.postal_code;

    const sectionEl2 = document.createElement("section");
    sectionEl2.classList.add("phone");
    const h3El2 = document.createElement("h3");
    h3El2.innerText = "Phone:";
    const pEl3 = document.createElement("p");
    pEl3.innerText = brewery.phone;

    const sectionEl3 = document.createElement("section");
    sectionEl3.classList.add("link");
    const aTag = document.createElement("a");
    aTag.innerText = brewery.website_url;

    liEl.append(h2El, divEl, sectionEl, h3El, pEl, pEl2, sectionEl2, h3El2, pEl3, sectionEl3, aTag);
    ulEl.append(liEl);

  }
  
}

render();
