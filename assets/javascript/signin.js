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
$("#signUp").on("click", function() {
     
 event.preventDefault();

   // Grabs user input
   var userEmail = $("#userEmail").val().trim();
   var userPassword = $("#userPassword").val().trim();
   


  
   // Creates local "temporary" object for holding contact info data
   var signUp = {
     Email: userEmail,
    Password : userPassword,
     
   };
 
   // sends contact data to the database
   database.ref('/sign-up').push(signUp);
 
   // Clears all of the text-boxes
   $("#userEmail").val("");
   $("#userPassword").val("");
  
 

 
   // Prevents moving to new page
   return false;
 });

 // 5. Button for adding contact info/message
 $("#signIn").on("click", function() {
    
    event.preventDefault();
   
      // Grabs user input
      var userEmail = $("#userEmail").val().trim();
      var userPassword = $("#userPassword").val().trim();
      
   
   
     
      // Creates local "temporary" object for holding contact info data
      var signIn = {
        Email: userEmail,
       Password : userPassword,
        
      };
    
      // sends contact data to the database
      database.ref('/sign-in').push(signIn);
    
      // Clears all of the text-boxes
      $("#userEmail").val("");
      $("#userPassword").val("");

        // Prevents moving to new page
   return false;
    });