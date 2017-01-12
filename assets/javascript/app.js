var topics = [  'Great Pyramid of Giza',
				'Hanging Gardens of Babylon',
				'Statue of Zeus at Olympia',
				'Temple of Artemis at Ephesus',
				'Mausoleum at Halicarnassus',
				'Colossus of Rhodes',
				'Lighthouse of Alexandria' ];
const apiKey = "dc6zaTOxFJmzC";
const url = "http://api.giphy.com/v1/gifs/search"

var ptrSideBarNav;
var ptrTextInput;
var ptrAddButton;
var ptrGiffZone;

window.onload = function() {
    console.log( "application startup" );
    
    ptrSideBarNav = document.querySelector(".sidebar-nav");
    ptrTextInput = document.querySelector("#textinput");
    ptrAddButton = document.getElementById("add");
    ptrGiffZone = document.querySelector("#giffs-here");
    
    ptrAddButton.addEventListener( "click", addTopic );
    setup();
}

function addTopic(e) {
    var text = document.getElementById("textinput").value;
    console.log( "Text input: " + text );
    addTopicLi( text );
    ptrTextInput.value = "";
    activateLinks();
}

function setup() {
    for ( var i = 0; i<topics.length - 1; i++ ) {
        addTopicLi( topics[i] );
    }
    activateLinks();
}

function addTopicLi( pTopic ) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href="#";
    a.dataset.searchTerm = pTopic;
    a.innerHTML = pTopic;
    li.appendChild( a );
    ptrSideBarNav.appendChild( li );
}

function activateLinks() {
    var links = document.querySelectorAll("li a");
    links.forEach( t => t.removeEventListener( "click", showGiffies ));
    links.forEach( t => t.addEventListener( "click", showGiffies ) );
}

function showGiffies(e) {
    ptrGiffZone.innerHTML = "";
    ptrGiffZone.innerHTML = this.dataset.searchTerm;
    var searchTerm = this.dataset.searchTerm;
    var parameters = "?q=" + searchTerm.split(' ').join("+");
    var queryURL = url;
    parameters += "&limit=10";
    parameters += "&rating=g";
    parameters += "&api_key=dc6zaTOxFJmzC"
    queryURL += parameters;
    console.log( queryURL );
    getGiffs( queryURL );
}

function getGiffs( pURL ) {
    console.log( "GetGiffs: ", pURL );
    $.ajax( { 'url': pURL } )
    .done( function( response, status ) {
        console.log( status );
        console.log( response.data.length );
        console.log( response );
        //ptrGiffZone.innerHTML = JSON.stringify( response );
        displayGiffs( response.data );
    })
    .error( function(e) {
       console.log( e ); 
    });
}

function displayGiffs( pData ) {
    for ( var i = 0 ; i < pData.length - 1; i++ ) {
        var img = document.createElement("img");
//        console.log( pData[i] );
        img.src = pData[i].images.fixed_height_still.url;
        img.classList = "giff";
        img.dataset.state="still";
        img.dataset.animated = pData[i].images.fixed_height.url;
        img.dataset.still = pData[i].images.fixed_height_still.url;
        ptrGiffZone.appendChild( img );
    }
    activateGiffs();

}

function activateGiffs() {
    console.log( "Activating giffs" );
    var giffList = document.querySelectorAll(".giff");
    console.log( giffList );
    giffList.forEach( g => g.addEventListener("click", switchState ));
}

function switchState(e) {
    console.log( this );
    var state = this.dataset.state;
    var still = this.dataset.still;
    var active = this.dataset.animated;
    
    if ( state === "still" ) {
        this.dataset.state = "active";
        this.src = active;
    } else {
        this.dataset.state = "still";
        this.src = still;
    }
}

// Need to put images in a div and add the rating under the image;











