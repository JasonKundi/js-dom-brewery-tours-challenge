1. Add the submit event listener to the form and console.log the value of the search input when the users submits the form.

2. Inside the submit event listener from step 1, make a fetch request to the breweries API to find breweries in the state the user searched for. For example, if the user has typed in "ohio", your fetch request should go to: https://api.openbrewerydb.org/breweries?by_state=ohio. Console.log the the response from the server so you see what type of data is returned.

3. Store the list of breweries you got back from the server on a property in your state object.

4. Write a render function that updates the DOM with the list of breweries stored in the state. Call that function when you get the response from the server. 
5. Make sure your render function is clearning the list of brewries before it updates the page so that if the user performs a second search, the results of the first search are removed before adding the new results.

5. Add a change event listener to the brewery type filter dropdown. Inside the event handler, log out the value of the filter the user has selected. 

6. Store the value of the filter on your state object. Inside the event handdler you added on step 5 you want to load the breweries from the server again with the filter applied, AND the current state value and then re-render the page. For example, if the user has searched for breweries in ohio and then selected type "micro" you'd want your fetch request to go to: https://api.openbrewerydb.org/breweries?by_state=ohio&by_type=micro

To do this, you might want to take the code to make the fetch call you created in step 2 and move it in to it's own function. Inside that function when you construct your URL you can then also check the value of the filter on the state object. So if the type filter is not empty, add "&by_type=" to the URL as well and then add the value of the filter from the state. 