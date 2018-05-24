//alert("Lists of Friends loaded.");
/*document.arrive("div.fbFriendListMemberBoxContent", function() {
    alert("Lists of Friends loaded.");
    // 'this' refers to the newly created element
});*/
var listId = window.location.href.split('/').pop();
setTimeout(function () {
    //alert("Prototype loaded... "+listId);
    if(document.body.contains(friendList = document.body.querySelector("div#friend_list_members_box"))) {
        computeAllFriends(friendList);
    }
}, 1000);
//alert("List of Friends with id:\n"+listId);
/*
let myInterval = window.setInterval(function () {
    let node = document.body.querySelector('div.fbFriendListMemberBoxContent');
    if (document.body.contains(node)) {
        //alert("Element finally exists!");
        //node.style.border = "5px solid green";
        window.clearInterval(myInterval);
        computeAllFriends(node);
    }
}, 100);
*/
//if(waitForElement('div.fbFriendListMemberBoxContent')) alert("Waiting successfull...");

//alert("Prototype loaded...");
function computeAllFriends(node) {
    //.split('(').pop().split(')').shift()
    var totalNumberOfFriendsOnList = "0";
    try {
        totalNumberOfFriendsOnList = node.querySelector('div').querySelector('div').querySelector('div').innerText.match(/\d+/)[0];
    } catch (e) {

    }

    var allFriends = node.querySelector('ul').childNodes;

    var friends = [];
// gather info about each friend
    for (i = 0; i < allFriends.length; i++) {
        var friend = {};
        var friendAnchor = allFriends[i].getElementsByTagName('a')[0];
        if(friendAnchor !== undefined) {
            //friend.name = friendAnchor["data-tooltip-content"];
            friendImg = friendAnchor.getElementsByTagName('img')[0];
            friend.name = friendImg.alt;
            friend.href = friendAnchor.href;
            friend.imgSrc = friendImg.src;

            friends.push(friend);
            //alert("Complete " + friend.name + " data:\n" + friend);
        } else {
            //alert("Unexisting friend...");
            var friendSpan = allFriends[i].querySelector('span[aria-label]');
            friendImg = friendSpan.getElementsByTagName('img')[0];
            friend.name = friendImg.alt;
            //friend.href = friendAnchor.href;
            friend.imgSrc = friendImg.src;

            friends.push(friend);
        }
    }

    window.localStorage.setItem('fbList_'+listId, JSON.stringify(friends));
    var allLists = JSON.parse(window.localStorage.getItem('fbList_groupIdentifiers'));
    if (allLists !== null) {
        for (i = 0; i < allLists.length; i++) {
            if (allLists[i].fbId.toString() == listId) {
                allLists[i].numberOfFriends = totalNumberOfFriendsOnList;
                allLists[i].traversed = true;
                window.localStorage.setItem('fbList_groupIdentifiers', JSON.stringify(allLists));
                break;
            }
        }
    }
    //alert("all users:\n" + JSON.stringify(friends));
    //group.users = friends;//JSON.parse(friends);
    //alert("Group of all users:\n" + JSON.stringify(group.users));
    window.location.href = "/bookmarks/lists/";
    // can not use window.history.back(), because the script of allList.js is then not executed correctly.
}