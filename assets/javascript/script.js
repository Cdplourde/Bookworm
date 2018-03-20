//append new row to HTML. Takes in a selector and an ID name
function appendRow(selector, id) {
    $(selector).append("<div class='row' id='" + id + "'></div>");
}

//append new column to HTML. Takes in a selector, what gets inserted in the div, column specifics, and an ID name
function appendCol(selector, inner, col, id) {
    $(selector).append("<div class='col" + col + "' id='" + id + "'>" + inner + "</div>");
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
        console.log(response);
        var books = response.items;
        console.log(book);
        appendRow(".container", "searchResults");
        for (var i = 0; i < books.length; i++) {
            //TODO display book info
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