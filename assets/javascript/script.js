var isbn;
//this array holds the book information from the api calls
var bookArr = [{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
}, 
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
},
{
    bookTitle: "",
    bookThumbnail: "",
    bookSmallThumbnail: "",
    bookAuthor: "",
    bookPublished: "",
    bookRating: "",
    bookPages: "",
    bookDescription: ""
}]

//append new row to HTML. Takes in a selector and an ID name
function appendRow(selector, id) {
    $(selector).append("<div class='row' id='" + id + "'></div>");
}

//append new column to HTML. Takes in a selector, what gets inserted in the div, column specifics (EX. "-md-6"), and an ID name
function appendCol(selector, id, colClass, col, data) {
    $(selector).append("<div class='" + colClass + " col" + col + "' id='" + id + "' data-booknumber = '" + data + "'></div>");
}

function booksrunQuery(isbn) { //TODO finish API call
    var queryURL = "http://booksrun.com/api/price/buy/" + isbn + "?key=z2q4intug8z3yvnfv87e";
    $.get(queryURL)
    .done(function(response) {
        console.log(response);
    });
}

function googleQuery(title) {
    var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + title;
    $.get(queryURL)
    .done(function(response) {
        console.log(response);
        //online run code if there are more than 0 results
        $("#results-row1").remove();
        $("#results-row2").remove();
        if (response.totalItems !== 0) {
            var books = response.items;
            //create new row and column for results
            var numRows = 1;
            var numCols = books.length;
            for (var i = 1; i < numRows + 1; i++) {
                appendRow(".results-container", "results-row" + i);
                for (var j = 1; j < numCols + 1; j++) {
                    appendCol("#results-row" + i, "results" + i + "-col" + j, "book-results-col", "-2", j);
                }
            }
            for (var j = 1; j < numCols + 1; j++) {
                $("#results1-col" + j).append("<div id='book" + j + "'></div>");
            } 
            //get info for each book
            for (var i = 0; i < books.length; i++) {
                var book = books[i].volumeInfo;
                //grab key names to verify certain keys exist
                var objKeys = Object.keys(book);
                //grab book title
                if (objKeys.indexOf("title") !== -1) {
                    bookArr[i].bookTitle = book.title;
                }
                //grab book thumbnail
                if (objKeys.indexOf("imageLinks") !== -1) {
                    bookArr[i].bookSmallThumbnail = book.imageLinks.smallThumbnail;
                    bookArr[i].bookThumbnail = book.imageLinks.thumbnail;
                }
                else {
                    var thumbnail = "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg";
                }
                //grab book author
                if (objKeys.indexOf("authors") !== -1) {
                    bookArr[i].bookAuthor = book.authors[0];
                }
                //grab book publish date
                if (objKeys.indexOf("publishedDate") !== -1) {
                    bookArr[i].bookPublished = book.publishedDate;
                }
                //grab book rating
                if (objKeys.indexOf("averageRating") !== -1) {
                    bookArr[i].bookRating = book.averageRating;
                }
                //grab book number of pages
                if (objKeys.indexOf("pageCount") !== -1) {
                    bookArr[i].bookPages = book.pageCount;
                }
                //grab book description
                if (objKeys.indexOf("description") !== -1) {
                    bookArr[i].bookDescription = book.description;
                }
                //reduce title length if too long
                if (bookArr[i].bookTitle.length < 40) {
                    $("#book" + (i + 1)).html("<p>" + bookArr[i].bookTitle + "</p><i class='fas fa-plus'></i><img src='" + bookArr[i].bookSmallThumbnail + "' class='resultImages'></p>" + bookArr[i].bookAuthor);  
                }      
                else {
                    bookArr[i].bookTitle = bookArr[i].bookTitle.slice(0, 40);
                    bookArr[i].bookTitle = bookArr[i].bookTitle + "..."
                    $("#book" + (i + 1)).html("<p>" + bookArr[i].bookTitle + "</p><i class='fas fa-plus'></i><img src='" + bookArr[i].bookSmallThumbnail + "' class='resultImages'></p>" + bookArr[i].bookAuthor);  
                }     
            }
        }
        else {
            //if no results are found tell the user
            appendRow(".results-container", "results-row1");
            appendCol(".row:last-of-type", "results-col", "book-results-col");
            $("#results-col").append("<h2>No results! :-(</h2>")       
        }
    });
}

//search click event
$(document).on("click", "#searchBtn", function() { //TODO: get element ID
    $(".results-container").empty();
    $(".results-container").css({"max-width": "none", "margin-top": "0px", "padding": "0px", "border": "none", "background-color": "transparent"});
    event.preventDefault();
    var title = $("#inlineFormInput").val().trim();
    console.log(title);
    // googleQuery($("#inlineFormInput").text().trim());
    googleQuery(title);
})

$(document).on("click", ".book-results-col", function() {
    bookNum = $(this).attr("data-booknumber") - 1;
    console.log(bookNum);
    $("#results-row1").empty();
    $(".results-container").css({"max-width": "1000px", "margin-top": "15px", "padding": "20px", "border": "2px solid black", "background-color": "rgba(255, 255, 224, 0.688)"});
    appendCol("#results-row1", "book-selected-col1", "null", "-12");
    $("#book-selected-col1").append("<h2>" + bookArr[bookNum].bookTitle + "</h2>");
    $("#results-row1").after("<div class='row' id='results-row2'></div>")
    appendCol("#results-row2", "book-selected-col2", "null", "-3");
    $("#book-selected-col2").append("<img src='" + bookArr[bookNum].bookThumbnail + "' class='imageLarge'>");
    appendCol("#results-row2", "book-selected-col3", "null", "-9");
    $("#book-selected-col3").append("<p id='description'>" + bookArr[bookNum].bookDescription + "</p>");
    $("#results-row2").after("<div class='row' id='results-row3'></div>")
    $("#results-row3").append("<p>Author: " + bookArr[bookNum].bookAuthor);
    $("#results-row3").append("<p>Pages: " + bookArr[bookNum].bookPages);
    $("#results-row3").append("<p>Rating: " + bookArr[bookNum].bookRating + " / 5");
    $("#results-row3").append("<p>Published: " + bookArr[bookNum].bookPublished);
    $("#results-row3").after("<div class='row' id='results-row4'></div>")
    $("#results-row4").append("<button class='btn btn-default'>Rent Hard Copy");
    $("#results-row4").append("<button class='btn btn-default'>Rent Audiobook");
});
