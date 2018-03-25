
// Initialize Firebase (Noora)
var config = {
    apiKey: "AIzaSyAjjcKnoXzzUCIHrh2yBZTCLRD5hJEJgm4",
    authDomain: "project-1-bookworm.firebaseapp.com",
    databaseURL: "https://project-1-bookworm.firebaseio.com",
    projectId: "project-1-bookworm",
    storageBucket: "project-1-bookworm.appspot.com",
    messagingSenderId: "957625014750"
 
 
  }; 
  firebase.initializeApp(config);
  // Get a reference to the database service
var database = firebase.database();
var books = [];
//append new row to HTML. Takes in a selector and an ID name
function appendRow(selector, id) {
    $(selector).append("<div class='row' id='" + id + "'></div>");
}
//append new column to HTML. Takes in a selector, what gets inserted in the div, column specifics (EX. "-md-6"), and an ID name
function appendCol(selector, id, col) {
    $(selector).append("<div class='col" + col + "' id='" + id + "'></div>");
}
function googleQuery(title) {
    var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + title;
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log("response: " + response);
    //     createRow();
    //     createCol();
    // });
    $.get(queryURL).then(function(response) {
        books = response.items;
        console.log(books);
        //create new row and column for results
        appendRow(".container");
        appendCol(".row:last-of-type", "results-col");
        $("#results-col").append("<ul id='results'></ul>")
        for (var i = 0; i < books.length; i++) {
            var book = books[i].volumeInfo;
            var thumbnail = book.imageLinks.smallThumbnail;
             var reviews = book.averageRating;
            var authors = book.authors; //LOOP THROUGH
            var pageCount = book.pageCount;
            var publishDate = book.publishedDate;
            var title = book.title;
            var description = book.description;
            $("#results").append("<li id='book" + i + "'></li>");
            $("#book" + i).html(`
                <h3 id="book${i}title">${title}</h3>
               <button class="btn btn-sm btn-primary book-btn" id="addbtn" data-index="${i}">Save</button>
                <br />
                <img src="${thumbnail}" class="book-image" />
                <p class="book-description">Description: ${description}</p>
                <p class="book-authors">Author: ${authors}</p>
                <p class="book-rating">Page Counts: ${pageCount}</P>
                <p class="book-rating">Rating: ${reviews}</P>
                <p class="book-published">First Published date: ${publishDate}</p>  
            `);
            //"<h3 id='book" + i + "title'>" + title + "</h3>");
        }
    });
}
function semanticQuery() {
}
function addBookToLibrary(book) {
    console.log('added book', book);
    database.ref('/library').push(book);
}
//search click event
$(document).on("click", "#searchBtn", function() { //TODO: get element ID
    event.preventDefault();
    var title = $("#inlineFormInput").val().trim();
    console.log(title);
    // googleQuery($("#inlineFormInput").text().trim());
    googleQuery(title);
})
$(document).on("click", ".book-btn", function() {
    var index = $(this).attr('data-index');
    var book = books[index].volumeInfo;
    console.log('book', book);
    addBookToLibrary(book);
})

 
  database.ref('/library').on("child_added", function (Snapshot, prevChildKey) {
    console.log(Snapshot.val());
    var thumbnail = Snapshot.val().thumbnail;
    var averageRating = Snapshot.val().averageRating;
    var authors = Snapshot.val().authors;
    var pageCount = Snapshot.val().pageCount;
    var publishDate = Snapshot.val().publishedDate;
    var title = Snapshot.val().title;
    var description = Snapshot.val().description;
   
    
 
    // Add each Book's data into the table
    $("#collection-table > tbody").append("<tr><td>" + title + "</td><td>" + authors+ "</td><td>" +
       averageRating + "</td><td>" + pageCount + "</td><td>" + publishDate + "</td></tr>" );
    
    });
