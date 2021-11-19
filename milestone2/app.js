// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");  // give name of html element, will look for very first input. it stores object with info on the html
var myMovieList = document.querySelector("ul");
var movieTable = document.querySelector("tbody");

// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;
    // Step 2: Create an empty <li></li>
    var li = document.createElement("li"); // <li></li>   this will create a set of tags for you

    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    var textToInsert = document.createTextNode(userTypedText); // have to wrap text in text node before you can enter it into an li

    // Step 4: Insert text into li
    // <li>Harry Potter </li>
    li.appendChild(textToInsert);

    // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
    myMovieList.appendChild(li);
    
    // create object to store movie titles & # times watched, check if movie title is already in
    let movieObj = {};
    
    // put user input userTypedText to lower case
    userTypedText = userTypedText.toLowerCase();

    // check if movie is in object
    if(userTypedText in movieObj){ // movie in object, increment count
        movieObj[userTypedText]++;
    } else { // movie not in object, insert into object, set count to 1
        movieObj.userTypedText = 1; 
    }

    // produce a table from movieObj with the movie name and the number of times watched
    // movieN = movieName
    let table = Object.keys(movieObj).map(movieN => `<tr> <td>${movieN}</td>   <td>${movieObj[movieN]}</td> </tr>`).join;
    
    // assign modified String 'table' to tbody using innerHTML
    tbody.innerHTML(table);

    // Step 6: Call the clearInput function to clear the input field
    clearInput();
}


/* make html table 
    use innerHTML
    have js String
    the js string has html in it

    ex
    unorderedlist.innerHTML

    figure out how to dynamically create that string

    use map and innerHTML
    ----------
    create a js object that keeps track of the movie name and number of times
    let movieobj
    movieObj[userInput]++;

    -- turning it into html

    object.keys 
    this will give you the keys within the object
    the map operator works with a list
    call map on object.keys

    Object.keys(movieObj).map(m => `<li> ${m} </li>`).join('')

    will return somthing like
    <li>spiderman</li>
    turn that into a table 
*/
