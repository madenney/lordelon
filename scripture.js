

var isMobile;

var preparations = function(){

    determineIsMobile();
    Object.keys(interpretations).forEach(function(interpretation){
        console.log(interpretation)
        var _replacement = `<span id=${interpretation} class="test">${interpretation}</span>`
        var replacement = document.createElement("span");
        replacement.innerHTML = interpretation;
        replacement.id = interpretation;
        replacement.className = "test";
        Object.keys(interpretations[interpretation].decorations).forEach(function(decoration){
            console.log("decoration:",decoration)
            replacement.style[decoration] = interpretations[interpretation].decorations[decoration]
        })
        document.body.innerHTML =
            document.body.innerHTML.replace(interpretation,replacement.outerHTML);

        //(function(_interpretation){console.log('asdf',_interpretation);document.getElementById(_interpretation).addEventListener("click",function(){
        //    //interpretations[interpretation].action ? interpretations[interpretation]["action"]() : overlay(interpretation);
        //    overlay(_interpretation);
        //});})(interpretation);
    })
    var x = document.getElementsByClassName("test")
    console.log("x:", x)
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
    var overlay = document.getElementById("overlay");
    var title = document.getElementById("overlay-title");
    var pretext = document.getElementById("overlay-pretext");
    var body = document.getElementById("overlay-body");
    overlay.style.display = "block";
    title.innerHTML = word;
    pretext.innerHTML = interpretations[word].interpretation.pretext;
    body.innerHTML = interpretations[word].interpretation.body;

    overlay.addEventListener('click', function(){
        overlay.style.display = "none";
    })
}

var showTwitterOverlay = function(){
    var overlay = document.getElementById("twitter-overlay");
    overlay.style.display = "block";

    overlay.addEventListener('click', function(){
        overlay.style.display = "none";
    })

    var twitter = document.getElementById("twitter-box");
    var h = twitter.clientHeight;
    console.log('clientHeight',h)
    var f = twitter.offsetHeight;
    console.log('offsetHeight',f)
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

var definitions = {
    hallowed: {
        title: '"Hallowed"',
        label: "adjective",
        content: "greatly revered and honored"
    },
    mars: {
        title: "Mars",
        label: "planet",
        content: "The land upon which our grandchildren will live"
    }
}
