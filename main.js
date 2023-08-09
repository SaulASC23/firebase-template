/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessagesDiv = document.getElementById("all-messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");
// Will move message into database but we have to write the function ourselves
sendButton.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event) {
    // prevents the page from refreshing
    event.preventDefault();

    // create an object with the data we want to add to our database
    const username = usernameInput.value;
    const message = messageInput.value;


    const messageData = {
        USERNAME: username,
        MESSAGE: message
    }

    console.log(messageData);

    // pushes our JSON(messageData) data to the database
    database.push(messageData);

    // reset the value of the input elements
    messageInput.value = "";
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
// called one time for each row in database on page load and each entry
database.on('child_added', addMessage); 

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessage(rowData) {
    // gets the value in the database row
    const row = rowData.val();

    const name = row.USERNAME;
    const message = row.MESSAGE;

    console.log('Name: ', name, 'Message: ', message);

    const messageDiv = makeSingleMessageHTML(name, message);

    allMessagesDiv.appendChild(messageDiv);
}

/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt) {
    // creates a parent div to hold entire username + message line
    const parentDiv = document.createElement("div");

    const messageP = document.createElement("p");

    // update the inner HTML to include the username
    messageP.innerHTML = `${usernameTxt} : ${messageTxt}`;
    
    // adds the message
    parentDiv.appendChild(messageP);

    return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */