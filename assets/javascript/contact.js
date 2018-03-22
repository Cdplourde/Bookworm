

 // 1. Global Variables and Functions
 var counting = 0;
 var checkingThatDataExists = 0;
 

  
 
  // 2. Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjjcKnoXzzUCIHrh2yBZTCLRD5hJEJgm4",
    authDomain: "project-1-bookworm.firebaseapp.com",
    databaseURL: "https://project-1-bookworm.firebaseio.com",
    projectId: "project-1-bookworm",
    storageBucket: "project-1-bookworm.appspot.com",
    messagingSenderId: "957625014750"

      
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
 

 

 
 // 5. Button for adding contact info/message
  $("#submitContact").on("click", function() {
     
  event.preventDefault();

    // Grabs user input
    var contactName = $("#inputName").val().trim();
    var contactEmail = $("#inputEmail").val().trim();
    var contactMessage = $("#inputMessage").val().trim();
 
 
   
    // Creates local "temporary" object for holding contact info data
    var newContact = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    };
  
    // sends contact data to the database
    database.ref('/contact-us').push(newContact);
  
    // Clears all of the text-boxes
    $("#inputName").val("");
    $("#inputEmail").val("");
    $("#inputMessage").val("");
  
 
  
    // Prevents moving to new page
    return false;
  });	