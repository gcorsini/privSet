//alert("Situation timeline.");
/* if(document.body.contains(existingElem = document.body.querySelector('a[data-testid="left_nav_item_Friend Lists"]'))) {
    //let newElem = document.body.querySelector('a[data-testid="left_nav_item_Friend Lists"]');
    existingElem.onclick = function () {
        //alert("On Click called.");
        window.location.href = existingElem.href;
    };
    alert("Element exists already.");
} else {
    document.arrive('a[data-testid="left_nav_item_Friend Lists"]', function(newElem) {
        //alert("Situation timeline..\n"+newElem.title);
        newElem.onclick = function () {
            alert("On Click called.")
            //window.location.href = newElem.href;
        };
        alert("Element just arrived.");
        // 'this' refers to the newly created element
    });
} */

/*
alert("Situation timeline.");
allListsNode = document.body.querySelector('a[data-testid="left_nav_item_Friend Lists"]');
//alert("Situation timeline.");

allListsNode.onclick = function () {
    alert("Situation timeline.");
    window.location.href = allListsNode.href;
};*/
setTimeout(function () {
    alert("Prototype loaded.");
    postField = document.getElementById("feedx_sprouts_container");
//if (postField === null) { postField = document.getElementById("timeline_composer_container"); };
    postField.addEventListener('click', function () {
        /*
        var inputField = postField.querySelector('div .clearfix .navigationFocus');
        inputField.addEventListener('keypress', function () {
            situationSelector(postField);
        });
        inputField.addEventListener('paste', function () {
            situationSelector(postField);
        }); */
        setTimeout( function () { situationSelector(postField); }, 300);
    } );
    var anchorFriendList = document.querySelector('a[href="/bookmarks/lists/"]');
//if (postField === null) { postField = document.getElementById("timeline_composer_container"); };
    anchorFriendList.addEventListener('click', function () { window.location.href = anchorFriendList.href } );
    document.arrive('a[href^="/search/apps"]', function(newElem) {
        //alert("Newly arrived element:\n"+newElem.href);
        newElem.onclick = function () {
            alert("On Click called.");
            window.location.href = newElem.href;
        };
    });
}, 1000);

// This function checks which situation is currently encountered.
function situationSelector(ele) {
    if (!document.body.contains(document.getElementById("myCheckButton"))) {
//onkeydown und onpaste for .clearfix .navigationFocus parent parent
        //alert("Situation Selector.");
        // if button next exists, it should work normaly.
        // When pressing post, the text should be checked. If it contains the dangerous link,
        // it should not share it with settings public, friends (or some other too big group).
        // If three times drunk, then post it to only me and make popup to indicate that it should be reviewed later.
        // if there is a 'next' button, then store the entered text uppon clicking it.
        var timelineText;
        var checkButton = document.createElement("button");
        checkButton.id = "myCheckButton";
        var spanInButton = document.createElement('span');
        spanInButton.className = "";
        spanInButton.innerText="Post (with prototype)";
        checkButton.appendChild(spanInButton);

        if (document.body.contains(tmp = ele.querySelector("div.uiContextualLayerParent"))) {
            if (document.body.contains(nextButton = tmp.querySelector('button'))) {
                nextButton.addEventListener('click', function () {
                    timelineText = ele.querySelector("div[data-contents=\"true\"]").querySelector("span[data-text=\"true\"]").innerHTML;
                    var postButton = ele.querySelector('button[type="submit"]');
                    checkButton.className = postButton.className;
                    postButton.style.visibility = "hidden";
                    postButton.style.display='none';

                    checkButton.addEventListener('click', function () {
                        if (inputIsHarmfulLink(timelineText)) {
                            radical(ele, postButton);
                        }
                        else if (!isCorrectlySpelled(timelineText)) {
                            drunk(ele, postButton);
                        }
                        // else if (postingAllNight()) { addict(); }
                        else { postButton.click(); }
                    });

                });
            } else {
                finishSettingUp(ele, checkButton);
            }

        } else {
            var postButton = ele.querySelector('button[type="submit"]');
            checkButton.className = postButton.className;
            //myPostButton.removeClass(" _42fr");
            checkButton.addEventListener('click', function () {
                // TODO this might break at any moment.
                timelineText = ele.querySelector('[name="xhpc_message_text"]');
                //timelineText = ele.querySelector("div[data-contents=\"true\"]").querySelector("span[data-text=\"true\"]").innerHTML;
                if (inputIsHarmfulLink(timelineText)) {
                    radical(ele, postButton);
                }
                else if (!isCorrectlySpelled(timelineText)) {
                    drunk(ele, postButton);
                }
                // else if (postingAllNight()) { addict(); }
                else { postButton.click(); }
            });

            postButton.style.visibility = "hidden";
            postButton.style.display='none';
            var postButtonParent = postButton.parentNode;
            postButtonParent.appendChild(checkButton);
            //postButtonParent.replaceChild(checkButton, postButton);

            var postButtonAncestor = postButton.closest('[class="clearfix"]').parentNode;
            var createdDiv = document.createElement('div');
            var listForWedge = document.createElement('ol');
            createdDiv.appendChild(listForWedge);
            postButtonAncestor.parentNode.insertBefore(createdDiv, postButtonAncestor);
            //postButtonParent.parentNode.appendChild(listForWedge);

            wedge(ele);
            alert("Ready for posting.");

        }
        //parentOfPostButton.appendChild(checkButton);
    }
}

function finishSettingUp(ele, myPostButton) {

    var postButton = ele.querySelector('button[type="submit"]');
    //class="_1mf7 _4r1q _4jy0 _4jy3 _4jy1 _51sy selected _42ft _42fr"
    //class="_1mf7 _4r1q _4jy0 _4jy3 _4jy1 _51sy selected _42ft"
    myPostButton.className = postButton.className;
    //myPostButton.removeClass(" _42fr");
    myPostButton.addEventListener('click', function () {
        timelineText = ele.querySelector("div[data-contents=\"true\"]").querySelector("span[data-text=\"true\"]").innerHTML;
        if (inputIsHarmfulLink(timelineText)) {
            radical(ele, postButton);
        }
        else if (!isCorrectlySpelled(timelineText)) {
            drunk(ele, postButton);
        }
        // else if (postingAllNight()) { addict(); }
        else { postButton.click(); }
    });

    postButton.style.visibility = "hidden";
    postButton.style.display='none';
    var postButtonParent = postButton.parentNode;
    postButtonParent.appendChild(myPostButton);
    //postButtonParent.replaceChild(myPostButton, postButton); //.appendChild(myPostButton);

    wedge(ele.querySelector('div.uiContextualLayerParent'));
    alert("Ready for posting.");
    //postButton.parentNode.appendChild(checkButton);
    //postButton.style.visibility = "hidden";

}

function inputIsHarmfulLink(text) {
    link1 = "https://i.imgflip.com/1483uu.jpg";
    if(text.indexOf(link1) !== -1) { return true; }
    else { return false; }
}

function isCorrectlySpelled(text) {
    numberOfTypos = 0;
    words = text.split(' ');

    for (i=0; i < words.length; i++) {
        words[i] = words[i].replace(/\W+/g, '');
        if (!checkword(words[i])) { numberOfTypos = numberOfTypos + 1; }
    }

    //alert("Number of incorrect words: "+numberOfTypos);
    // If there are 0 or 1 typos, then the text is correctly spelled.
    return (2 > numberOfTypos);
}

function checkword(word) {
    if(word.indexOf("drunk") !== -1) return false;
    else return true;
}

function drunk(ele, fbPostButton) {
    alert("You seem drunk. Therefore, you'd better review who you want to share this post with later...");
    // Select group only me
    ele.querySelector('div[title="only me"]').click();
    //setTimeout(function () {
    fbPostButton.click();
    //}, 400);
}

function radical(ele, fbPostButton) {
    var selectedGroup = ele.querySelector('div#selected');
    //alert("Selected group value: "+selectedGroup.getAttribute('data-group-value'));
    if ((selectedGroup.getAttribute('data-group-value').indexOf("300645083384735") !== -1)
        || (selectedGroup.getAttribute('data-group-value').indexOf("291667064279714") !== -1))
        alert("You shouldn't post such content to a wide audience. Please select a smaller group.");
    else
        fbPostButton.click();
    
}

function addict(ele, fbPostButton) {
    alert("Addict situation.");
}
