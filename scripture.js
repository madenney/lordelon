
var overlay, title, pretext, body, subtext, twitterOverlay, chapter, footer
var actions = {};

var interpret = function(){
    var lines = document.getElementsByTagName("p");
    Object.keys(interpretations).forEach(function(word){
        var replacement = document.createElement("span");
        replacement.innerHTML = word;
        replacement.id = word;
        replacement.className = "interpreted";
        Object.keys(interpretations[word].decorations).forEach(function(decoration){
            replacement.style[decoration] = interpretations[word].decorations[decoration]
        });
        for(var i = 0; i < lines.length; i++){
            if(lines[i].innerHTML.indexOf(word) != -1){
                lines[i].innerHTML = lines[i].innerHTML.replace(word,replacement.outerHTML);
                break;
            }
        }
    });
    var interpreted = document.getElementsByClassName("interpreted");
    for(var i = 0; i < interpreted.length; i++){
        interpreted[i].addEventListener("click",function(e){
            showOverlay(e.target.id);
            gtag('event', 'button_click', {'label': e.target.id});
        });
    }
}

var showOverlay = function(word){
    if(interpretations[word].action){
       return actions[interpretations[word].action]();
    }
    overlay.style.display = "block";
    chapter.style.filter = "blur(5px)";
    footer.style.filter = "blur(5px)";
    title.innerHTML = interpretations[word].interpretation.title;
    pretext.innerHTML = interpretations[word].interpretation.pretext;
    body.innerHTML = interpretations[word].interpretation.body;
    if(interpretations[word].interpretation.link){
        subtext.innerHTML = `<a href="${interpretations[word].interpretation.link}" target="_blank" rel="noopener noreferrer">${interpretations[word].interpretation.subtext}</a>`;
    } else {
        subtext.innerHTML = interpretations[word].interpretation.subtext;
    }
}

actions.showTwitterOverlay = function(){
    twitterOverlay.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function(){
    chapter = document.getElementById("chapter");
    footer = document.getElementById("footer");
    overlay = document.getElementById("overlay");
    title = document.getElementById("overlay-title");
    pretext = document.getElementById("overlay-pretext");
    body = document.getElementById("overlay-body");
    subtext = document.getElementById("overlay-subtext");
    twitterOverlay = document.getElementById("twitter-overlay");

    overlay.addEventListener("click",function(e){
        overlay.style.display = "none";
        chapter.style.filter = "none";
        footer.style.filter = "none";
    })

    twitterOverlay.addEventListener("click",function(e){
        twitterOverlay.style.display = "none";
    });

    interpret();
});

