

var isMobile;
var actions = {};
var preparations = function(){

    determineIsMobile();
    Object.keys(interpretations).forEach(function(interpretation){
        console.log(interpretation)
        var _replacement = `<span id=${interpretation} class="test">${interpretation}</span>`
        var replacement = document.createElement("span");
        replacement.innerHTML = interpretation;
        replacement.id = interpretation;
        replacement.className = "interpreted";
        Object.keys(interpretations[interpretation].decorations).forEach(function(decoration){
            replacement.style[decoration] = interpretations[interpretation].decorations[decoration]
        })
        document.body.innerHTML =
            document.body.innerHTML.replace(interpretation,replacement.outerHTML);
    })
    var x = document.getElementsByClassName("interpreted")
    for(var i = 0; i < x.length; i++){
        x[i].addEventListener("click",function(e){
            overlay(e.target.id)
        })
    }
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
    console.log(interpretations[word])
    if(interpretations[word].action){
       return actions[interpretations[word].action]()
    }
    var overlay = document.getElementById("overlay");
    var title = document.getElementById("overlay-title");
    var pretext = document.getElementById("overlay-pretext");
    var body = document.getElementById("overlay-body");
    var subtext = document.getElementById("overlay-subtext");

    overlay.style.display = "block";
    title.innerHTML = interpretations[word].interpretation.title
    pretext.innerHTML = interpretations[word].interpretation.pretext;
    body.innerHTML = interpretations[word].interpretation.body;
    if(interpretations[word].interpretation.link){
        subtext.innerHTML = `<a href="${interpretations[word].interpretation.link}" target="_blank" rel="noopener noreferrer">${interpretations[word].interpretation.subtext}</a>`
    } else {
        subtext.innerHTML = interpretations[word].interpretation.subtext
    }

    overlay.addEventListener('click', function(){
        overlay.style.display = "none";
    })
}

actions.showTwitterOverlay = function(){
    console.log("action function");
    var overlay = document.getElementById("twitter-overlay");
    overlay.style.display = "block";
    overlay.addEventListener('click', function(){
        overlay.style.display = "none";
    })
}



document.addEventListener("DOMContentLoaded", preparations );

var debouncer = false;
window.onresize = function(x){
    if(debouncer){
        clearTimeout(debouncer);
    }
    debouncer = setTimeout( function(){
        clearDomListeners();
        preparations();
        debouncer = false;
    }, 500 )
}

var clearDomListeners = function(){
    console.log("YOU NEED TO CLEAR YOUR DOM LISTENERS")
}

