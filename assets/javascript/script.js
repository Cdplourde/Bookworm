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
        var books = response.items;
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
                <img src="${thumbnail}" class="book-image" />
                <p class="book-description">Description: ${description}</p>
                <p class="book-authors">Author: ${authors}</p>
                <p class="book-rating">Rating: ${reviews}</P>
                <p class="book-published">First Published date: ${publishDate}</p>  
            `);
            //"<h3 id='book" + i + "title'>" + title + "</h3>");
        }
    });
}
function semanticQuery() {

}

//search click event
$(document).on("click", "#searchBtn", function() { //TODO: get element ID
    event.preventDefault();
    var title = $("#inlineFormInput").val().trim();
    console.log(title);
    // googleQuery($("#inlineFormInput").text().trim());
    googleQuery(title);
})

