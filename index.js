const state = {
  breweries: [],
};

function clear() {
  ulEl.innerHTML = "";
  formInputEl.value = "";
}

function render() {
  listenToSelectStateForm();
  renderBreweryList();
}

const form1 = document.querySelector("#select-state-form");
const formInputEl = document.querySelector("#select-state");

function listenToSelectStateForm() {
  form1.addEventListener("submit", function (event) {
    event.preventDefault();
    const formInputValue = formInputEl.value;
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

const ulEl = document.querySelector("#breweries-list");

function renderBreweryList() {
  clear();
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

    liEl.append(h2El, divEl, sectionEl, sectionEl2, sectionEl3);
    sectionEl.append(h3El, pEl, pEl2);
    sectionEl2.append(h3El2, pEl3);
    sectionEl3.append(aTag);
    ulEl.append(liEl);
  }
}

render();
