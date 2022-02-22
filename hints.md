1. Add the submit event listener to the form and console.log the value of the search input when the users submits the form. (done)

2. Inside the submit event listener from step 1, make a fetch request to the breweries API to find breweries in the state the user searched for. For example, if the user has typed in "ohio", your fetch request should go to: https://api.openbrewerydb.org/breweries?by_state=ohio. Console.log the the response from the server so you see what type of data is returned. (done)

3. Store the list of breweries you got back from the server on a property in your state object. (done)

4. Write a render function that updates the DOM with the list of breweries stored in the state. Call that function when you get the response from the server. (done)
5. Make sure your render function is clearning the list of brewries before it updates the page so that if the user performs a second search, the results of the first search are removed before adding the new results. (done)

5. Add a change event listener to the brewery type filter dropdown. Inside the event handler, log out the value of the filter the user has selected. 

6. Store the value of the filter on your state object. Inside the event handler you added on step 5 you want to load the breweries from the server again with the filter applied, AND the current state value and then re-render the page. For example, if the user has searched for breweries in ohio and then selected type "micro" you'd want your fetch request to go to: https://api.openbrewerydb.org/breweries?by_state=ohio&by_type=micro

To do this, you might want to take the code to make the fetch call you created in step 2 and move it in to it's own function. Inside that function when you construct your URL you can then also check the value of the filter on the state object. So if the type filter is not empty, add "&by_type=" to the URL as well and then add the value of the filter from the state. 


const state = {
  breweries: [],
  breweryByType: [],
};

const ulEl = document.querySelector("#breweries-list");
const form1 = document.querySelector("#select-state-form");
const formInputEl = document.querySelector("#select-state");
const formInputValue = formInputEl.value;
const formFilter = document.querySelector("#filter-by-type-form");
const filterInput = document.querySelector("#filter-by-type");
const url = "https://api.openbrewerydb.org/breweries?by_state=";
const filterInputValue = filterInput.value;
const urlByType = `${url} + ${formInputValue} + &by_type=`;

function renderBreweryList() {
  for (const brewery of state.breweries) {
    console.log(brewery);
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

    liEl.append(
      h2El,
      divEl,
      sectionEl,
      h3El,
      pEl,
      pEl2,
      sectionEl2,
      h3El2,
      pEl3,
      sectionEl3,
      aTag
    );
    ulEl.append(liEl);
  }

}

function clear() {
  ulEl.innerHTML = "";
  formInputEl.value = "";
}

function render() {
  clear();
  renderBreweryList();
}

function listenToSelectStateForm() {
  form1.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(url + formInputValue)
      .then(function (response) {
        console.log("raw response", response);
        return response.json();
      })
      .then(function (brewery) {
        state.breweries = brewery;
        console.log(brewery);
      });
    render();
  });
}

function listenToFilterByTypeForm() {
  formFilter.addEventListener("change", function (event) {
    event.preventDefault();

    fetch(urlByType + 
      filterInputValue)
      .then(function (response) {
        console.log("raw response", response);
        return response.json();
      })
      .then(function (breweryByType) {
        state.breweries = breweryByType;
        console.log(breweryByType)
      });
    render();
  });
}

render();
