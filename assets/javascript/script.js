//append new row to HTML. Takes in a selector and an ID name
function appendRow(selector, id) {
    $(selector).append("<div class='row' id='" + id + "'></div>");
}

//append new column to HTML. Takes in a selector, what gets inserted in the div, column specifics (EX. "-md-6"), and an ID name
function appendCol(selector, id, colClass, col) {
    $(selector).append("<div class='" + colClass + " col" + col + "' id='" + id + "'></div>");
}

function createResults() {

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
    $.get(queryURL)
    .done(function(response) {
        console.log(response);
        //only run code if there are more than 0 results
        $("#results-row1").remove();
        $("#results-row2").remove();
        if (response.totalItems !== 0) {
            var books = response.items;
            //create new row and column for results
            var numRows = 1;
            var numCols = books.length;
            for (var i = 1; i < numRows + 1; i++) {
                appendRow(".container", "results-row" + i);
                for (var j = 1; j < numCols + 1; j++) {
                    appendCol("#results-row" + i, "results" + i + "-col" + j, "book-results-col", "-2");
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
                console.log(book);
                if (objKeys.indexOf("imageLinks") !== -1) {
                    var thumbnail = book.imageLinks.smallThumbnail;
                }
                else {
                    var thumbnail = "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg";
                }
                var reviews = book.averageRating;
                if (objKeys.indexOf("authors") !== -1) {
                    var author = book.authors[0];
                }
                else {
                    var author = "No Author Listed"
                }
                var pageCount = book.pageCount;
                var publishDate = book.publishedDate;
                var title = book.title;
                if (title.length < 40) {
                    $("#book" + (i + 1)).html("<p>" + title + "</p><i class='fas fa-plus'></i><img src='" + thumbnail + "'></p>" + author);  
                }      
                else {
                    title = title.slice(0, 40);
                    title = title + "..."
                    $("#book" + (i + 1)).html("<p>" + title + "</p><i class='fas fa-plus'></i><img src='" + thumbnail + "'></p>" + author);  
                }       
            }   
        }
        else {
            //if no results are found tell the user
            appendRow(".container", "results-row1");
            appendCol(".row:last-of-type", "results-col", "book-results-col");
            $("#results-col").append("<h2>No results! :-(</h2>")
        }
    });
}
function semanticQuery(title) {

}

//search click event
$(document).on("click", "#searchBtn", function() { //TODO: get element ID
    event.preventDefault();
    var title = $("#inlineFormInput").val().trim();
    console.log(title);
    // googleQuery($("#inlineFormInput").text().trim());
    googleQuery(title);
})