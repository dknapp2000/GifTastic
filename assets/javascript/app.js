var topics = [  'Great Pyramid of Giza',
			        	'Hanging Gardens of Babylon',
			        	'Statue of Zeus at Olympia',
			        	'Temple of Artemis at Ephesus',
			        	'Mausoleum at Halicarnassus',
			        	'Colossus of Rhodes',
			        	'Lighthouse of Alexandria' ];
const apiKey = "dc6zaTOxFJmzC";
const url = "https://api.giphy.com/v1/gifs/search"

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

	$(document).on("keypress","#textinput.form-control.input-md", function(e) {
		var key = e.charCode || e.which;
		if (key!==13) return;
		addTopic(e);
	});

    setup();
}

function addTopic(e) {
	var text = ptrTextInput.value;
	ptrTextInput.value = "";
    addTopicLi( text );
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
    var searchTerm = this.dataset.searchTerm;
    var parameters = "?q=" + searchTerm.split(' ').join("+");
    var queryURL = url;
    parameters += "&limit=10";
    parameters += "&rating=g";
    parameters += "&api_key=dc6zaTOxFJmzC"
    queryURL += parameters;
    getGiffs( queryURL );
}

function getGiffs( pURL ) {
    $.ajax( { 'url': pURL } )
    .done( function( response, status ) {
        // console.log( status );
        // console.log( response.data.length );
        // console.log( response );
        displayGiffs( response.data );
    })
    .error( function(e) {
       console.log( e );
    });
}

function displayGiffs( pData ) {
    for ( var i = 0 ; i < pData.length - 1; i++ ) {
		var giffHeight = pData[i].images.fixed_height_still.height;
		var giffWidth = pData[i].images.fixed_height_still.width;
		var span = document.createElement("span");
		span.id=pData[i].id;
		span.classList="giff-container";
        var img = document.createElement("img");
        img.src = pData[i].images.fixed_height_still.url;
        img.classList = "giff";
        img.dataset.state="still";
        img.dataset.animated = pData[i].images.fixed_height.url;
        img.dataset.still = pData[i].images.fixed_height_still.url;
		span.appendChild( img );
		var p = document.createElement("span");
		p.classList="rating";
		p.innerHTML = pData[i].rating.toUpperCase();
		span.appendChild( p );
        ptrGiffZone.appendChild( span );
    }
    activateGiffs();
}

function activateGiffs() {
    var giffList = document.querySelectorAll(".giff");
    giffList.forEach( g => g.addEventListener("click", switchState ));
}

function switchState(e) {
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
