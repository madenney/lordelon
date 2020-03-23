
console.log("Revelations")

var isMobile;

var spreadTheWord = function(){
    console.log("Spreading the Word");

    determineIsMobile();

    var hallowed = document.getElementById("hallowed");
    hallowed.addEventListener('click',function(e){
        overlay("hallowed")
    });
}

var determineIsMobile = function(){
    isMobile = screen.width < 650;
    console.log(screen.width);
    if(isMobile){
        console.log("Mobile Device")
    } else {
        console.log("Desktop");
    }
}

var overlay = function(word){
    var overlay = document.getElementById("overlay");
    var title = document.getElementById("overlay-title");
    var label = document.getElementById("overlay-label");
    var message = document.getElementById("overlay-message");
    overlay.style.display = "block";
    title.innerHTML = definitions[word].title;
    label.innerHTML = definitions[word].label;
    message.innerHTML = definitions[word].content;

    overlay.addEventListener('click', function(){
        overlay.style.display = "none";
    })
}

document.addEventListener("DOMContentLoaded", spreadTheWord );

var debouncer = false;
window.onresize = function(x){
    console.log(x);
    if(debouncer){
        clearTimeout(debouncer);
    }
    debouncer = setTimeout( function(){
        clearDomListeners();
        spreadTheWord();
        debouncer = false;
    }, 500 )
}

var clearDomListeners = function(){
    console.log("YOU NEED TO CLEAR YOUR DOM LISTENERS")
}

var definitions = {
    hallowed: {
        title: '"Hallowed"',
        label: "adjective",
        content: "greatly revered and honored"
    },
    quibble: {
        title: '"Quibble"',
        label: "verb",
        content: "disagree over minor issues"
    }
}