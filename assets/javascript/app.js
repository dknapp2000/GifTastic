var topics = [  'Great Pyramid of Giza',
				'Hanging Gardens of Babylon',
				'Statue of Zeus at Olympia',
				'Temple of Artemis at Ephesus',
				'Mausoleum at Halicarnassus',
				'Colossus of Rhodes',
				'Lighthouse of Alexandria' ];
var ptrSideBarNav;
var ptrTextInput;
var ptrAddButton;

window.onload = function() {
    console.log( "application startup" );
    
    ptrSideBarNav = document.querySelector(".sidebar-nav");
    ptrTextInput = document.querySelector("#textinput");
    ptrAddButton = document.getElementById("add");
    
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
    console.log( this.dataset.searchTerm );
}