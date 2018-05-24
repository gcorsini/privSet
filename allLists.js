//alert("All List loaded.");

/*querySelectorString = "div#bookmarksSeeAllEntSection";
if(document.body.contains(existingElem = document.body.querySelector(querySelectorString))) {
    //let newElem = document.body.querySelector('a[data-testid="left_nav_item_Friend Lists"]');
    alert("Element exists already.");
    existingElem.onclick = function () {
        //alert("On Click called.");
        window.location.href = existingElem.href;
    };
} else {
    document.arrive(querySelectorString, function(newElem) {
        alert("Element just arrived.");
        //alert("Situation timeline..\n"+newElem.title);
        newElem.onclick = function () {
            alert("On Click called.")
            //window.location.href = newElem.href;
        };
        // 'this' refers to the newly created element
    });
}*/
storedAllLists = JSON.parse(window.localStorage.getItem('fbList_groupIdentifiers'));
if (storedAllLists !== null) {
    var numberOfTraversedList=0;
    for (i=0; i < storedAllLists.length; i++) {
        if(!storedAllLists[i].traversed) {
            window.location.href = storedAllLists[i].href;
        } else
            numberOfTraversedList++;
    }
    if (numberOfTraversedList === storedAllLists.length) {
        var confirmationQuestion = "Do you want the prototype to re-generate all your lists?\n\n" +
            "- Ok will remove all the lists curently stored.\n" +
            "- Cancel will just show you the page normally.\n";
        if (confirm(confirmationQuestion)) {
            storedAllLists = JSON.parse(window.localStorage.getItem('fbList_groupIdentifiers'));
            if (storedAllLists !== null) {
                for (i = 0; i < storedAllLists.length; i++) {
                    window.localStorage.removeItem('fbList_' + storedAllLists[i].fbId);
                }
            }
            window.localStorage.removeItem('fbList_groupIdentifiers');
            if(confirm("If you want to re-generate all your lists, click ok."))
                window.location.reload(true);
        } else
            alert("Thank you for your patience. We are done =)");
    }
} else {
    setTimeout(function () {
        alert("Prototype loaded. Please be patient until all your lists have been traversed.");
        var allLists = document.body.querySelector("div#bookmarksSeeAllEntSection");

        if(document.body.contains(allLists)) {
            computeAllLists(allLists);
        }
    }, 1000);
}

/*
document.arrive("div#bookmarksSeeAllEntSection", function(newElem) {
    //alert("All List loaded.\n"+newElem.id);
    computeAllLists(newElem);
    // 'this' refers to the newly created element
});*/
/*
function intervalChecker(queryString) {
    alert("Interval Checker called.");
    let node = document.body.querySelector(queryString);
    if (document.body.contains(node)) {
        alert("Found the element.");
        window.clearInterval(myInterval);
        computeAllLists(node);
    } //else myInterval;
}
let myInterval = window.setInterval(intervalChecker, 1000, 'div#bookmarksSeeAllEntSection');
*/
//setTimeout( function () { alert("Test"); }, 500);
function computeAllLists(node) {
    let groupList = [];
    //groupList.name = 'fbListsOfFriends';
    flList = node.querySelector('ul');
    childrenFlList = flList.childNodes;

    let group;
    for (i = 0; i < childrenFlList.length; i++) {
        group = {};
        //group.id = i;
        groupAnchor = childrenFlList[i].querySelector('a[href^="/lists/"]');//.getElementsByTagName('a')[0];
        group.name = groupAnchor.title;
        group.fbId = childrenFlList[i].id.split("_").pop();
        group.href = groupAnchor.href;//"/lists/" + group.fbId;
        group.traversed = false;
        //group.storageId = 'fbList_'+group.fbId;
        //alert("Group " + group.name + " has href:\n/lists/" + group.id);
        // Go to the page of the list.
        //window.location.href = "/lists/" + group.id; //group.href;
        groupList.push(group);//JSON.stringify(group);
    }
    window.localStorage.setItem('fbList_groupIdentifiers', JSON.stringify(groupList));
    window.location.href = group.href;
    //alert("All groups:\n"+JSON.stringify(groupList));
/*    browser.storage.local.get("fbListsOfFriends").then(function (item) {
        alert("My stored groups:\n"+JSON.stringify(item));
    });*/
/*
    var jsonString = JSON.stringify(crawledList);
    var jsonObject = JSON.parse(jsonString);

    browser.storage.local.set({'fbListsOfFriends': jsonObject}, function () {
        alert("The list " + jsonObject + " was just stored.");
        console.log('Setting local fbListsOfFriends to ' + jsonObject);
    });
    */
}
