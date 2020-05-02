
console.log("Revelations")

var isMobile;

var main = function(){
    console.log("Spreading the Word");

    determineIsMobile();

    var hallowed = document.getElementById("hallowed");
    var mars = document.getElementById("mars");
    var tweet = document.getElementById("tweet");

    hallowed.addEventListener('click',function(e){
        overlay("hallowed")
    });

    // TODO: SPEED THIS UP
    mars.addEventListener('click', function(){

        const marsPicture =  document.getElementById("mars-picture");
        marsPicture.style.display = "block";
        marsPicture.addEventListener('click',function(){
            marsPicture.style.display = "none";
        });
    });

    tweet.addEventListener('click', function(){
        showTwitterOverlay();
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



document.addEventListener("DOMContentLoaded", main );

var debouncer = false;
window.onresize = function(x){
    console.log(x);
    if(debouncer){
        clearTimeout(debouncer);
    }
    debouncer = setTimeout( function(){
        clearDomListeners();
        main();
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