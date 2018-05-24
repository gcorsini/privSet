/*
This file defines the gui elements of the prototype.
 */

/*
// use it as follows: nudge([{text: "Button1", press: myOnPressFunction1(), type: buttonType}, {text: "Button2", press: myOnPressFunction2()}, ...], false)
// buttonType can be sap.m.ButtonType.Transparent or instead of Transparent: Accept,Reject,Default,Back,Up
// If button should display an image, then 'icon: sap.ui.core.IconPool.getIconURI("save")' can be added.
// If button are sometimes disabled, then use 'enabled: false' and 'enabled: true'.
// To define the width of a button use 'width'
function nudge(listOfButtons, wedgeRequired = false) {
    //numOfButtons how many buttons does the nudge require
    //listOfButtons what is each button called and what happens when it gets pressed
    //wedgeRequired does the nudge need to contain a wedge?
    toolbar = new sap.m.OverflowToolbar("privSecNudge");
    if (wedgeRequired) { toolbar.addContent(wedge()); };
    listOfButtons.forEach( function(button) {
        nudgeButton = new sap.m.Button(button);
        toolbar.addContent(nudgeButton);
    });
    return toolbar;
}
*/

function wedge(pagelet) {
    allGroups = [
        {name:"public", numberOfFriends:"everyone on and off facebook", value:"300645083384735"},
        {name:"friends", numberOfFriends:"all my friends", value: "291667064279714"},
        {name:"only me", numberOfFriends:"0", value: "286958161406148"}];
    // default is group "friends" except, there is the group "allFriendsExcept"
    var defaultGroup = 1;
    var allFriendsExcept = JSON.parse(window.localStorage.getItem('fbList_excludeEx'));
    if(allFriendsExcept !== null) {
        // default is group "allFriendsExcept", if it exists
        defaultGroup = 3;
        allGroups.push(allFriendsExcept);
    }
    var allGroupIdentifiers = JSON.parse(window.localStorage.getItem('fbList_groupIdentifiers'));
    if(allGroupIdentifiers !== null) {
        for(i=0; i < allGroupIdentifiers.length; i++) {
            var group = allGroupIdentifiers[i];
            group.users = JSON.parse(window.localStorage.getItem('fbList_'+group.fbId));
            if(group !== null)
                allGroups.push(group);
        }
    }

    //generate a li (to be appended to a ul)
    var listEle = document.createElement('li');
    listEle.style = "display: grid; grid-gap: 5px;";
    // include all groups
    // by default selected group should get attribute: background-color: #4267b2; and all text should be white and lightgrey
    for(i=0; i<allGroups.length; i++) {
        var columLocation = (i % 5)+1;
        var rowLocation = (Math.floor(i/5))+1;
        var groupDiv = document.createElement('div');
        groupDiv.setAttribute('data-group-value', allGroups[i].value);
        groupDiv.title = allGroups[i].name;
        var styleInfo = "grid-column-start: "+columLocation+"; grid-row-start: "+rowLocation+";";
        groupDiv.style = styleInfo;
        groupDiv.className = "standardGroupContainer";
        var groupUl = document.createElement('ul');
        groupUl.style = "list-style-type:none; overflow: hidden;";
        var groupName = document.createElement('li');
        groupName.setAttribute('data-selector-group', "groupName");
        //groupName.title = "groupName";
        groupName.innerText = allGroups[i].name;
        groupName.className = "standardTitle";
        var numFriends = document.createElement('li');
        numFriends.setAttribute('data-selector-lightText', "lightText");
        //numFriends.title = "lightText";
        numFriends.innerText = allGroups[i].numberOfFriends;
        numFriends.className = "standardLight";
        // set default styles
        if (i==defaultGroup) {
            groupDiv.id = "selected";
            groupName.id = "selectedWhite";
            numFriends.className = "selectedLightgrey";
            pagelet.querySelector('input[name^=privacy][type="hidden"]').value = allGroups[i].value;
        }

        groupUl.appendChild(groupName);
        groupUl.appendChild(numFriends);


        if (allGroups[i].hasOwnProperty('users')) {
            var groupUsers = allGroups[i].users;
            for (j = 0; j < groupUsers.length; j++) {
                // Currently we want at most 5 users
                if (j == 4)
                    break;
                var userLi = document.createElement('li');
                //userLi.title = "lightText";
                userLi.setAttribute('data-selector-lightText', "lightText");
                userLi.className = "standardLight";
                userLi.innerText = groupUsers[j].name;
                var userImg = document.createElement('img');
                userImg.className = "tinyImages";
                userImg.src = groupUsers[j].imgSrc;
                if (j % 2 == 0)
                    userImg.style = "float:right;";
                else
                    userImg.style = "float:left;";

                // set default styles
                if (i == defaultGroup) {
                    userLi.id = "selectedLightgrey";
                }
                userLi.appendChild(userImg);
                groupUl.appendChild(userLi);
            }
        }
        groupDiv.appendChild(groupUl);

        groupDiv.onclick = function () {
            // Remove previously selected elements
            listEle.querySelector('#selected').removeAttribute('id');
            listEle.querySelector('#selectedWhite').removeAttribute('id');
            var allLightGreyElements = listEle.querySelectorAll('.selectedLightgrey');
            for (i=0; i<allLightGreyElements.length; i++) {
                allLightGreyElements[i].className = "standardLight";
            }
            // Add attributes to newly selected elements.
            this.id = "selected";
            this.querySelector('li[data-selector-group="groupName"]').id = "selectedWhite";
            var allLightTextElements = this.querySelectorAll('li[data-selector-lightText="lightText"]');
            for (i=0; i<allLightTextElements.length; i++) {
                allLightTextElements[i].className = "selectedLightgrey";
            }

            pagelet.querySelector('input[name^=privacy][type="hidden"]').value = this.getAttribute('data-group-value');
        }

        listEle.appendChild(groupDiv);
//if numberOfFriends exists, then use it. Otherwise count how many users there are
        // contains all the group. Don't forget to add onclick for each group, which sets the value of
        // <input autocomplete="off" name="privacy[10204254894751712]" value="286958161406148" id="u_6q_7" type="hidden">
        // correctly (as there is no id, use 'name="privacy[*]' in relationship and 'name="privacyx"' in timeline
    }

    var listElementsToBeHidden = pagelet.querySelector('ol').childNodes;
    for (i=0; i<listElementsToBeHidden.length; i++) {
        listElementsToBeHidden[i].style.visibility = "hidden";
        listElementsToBeHidden[i].style.display='none';
    }
    pagelet.querySelector('ol').appendChild(listEle);
    //pagelet.querySelector('.composerAudienceWrapper').style.display='none';
    //after all groups are included, then add custom, which is more complicated, because onclick has to be correctly handled.
    // Therefore return the custom element and add the onclick after creating the wedge.
}

function init() {
    alert("Init was called.");

    var storedList = browser.storage.local.get(['fbListsOfFriends'], function(result) {
        var lists = JSON.stringify(result.fbListsOfFriends).toString();
        alert("Result of get: "+ result);
/*        if (lists === undefined) {
            alert("List is undefined. Has to be generated."); //Please visit \n\nhttps://www.facebook.com/bookmarks/lists/ \n\nto generate them.");
            // Go to https://www.facebook.com/bookmarks/lists/
            window.location.href = 'https://www.facebook.com/bookmarks/lists/';

        } else alert("Got the list: "+ lists);*/
        console.log('Getting local fbListsOfFriends returned ' + result.key);
        return lists;
    });
    storedList.then(results => {
        alert(("Result of get is: "+results));
    });
}

/*
Usage:
element to find a type of element
#myId to find an element with id=myId
.myClass to find an element with class=myClass
parent > child
[attribute] find an element where attribute exists
[attribute='Property'] find an element with attribute='Property'
 */

function waitForElement(queryString) {
    alert("Setting Interval...");
    var myInterval = setInterval(elementAvailable(queryString), 10);
    return myInterval;
    
    function elementAvailable(myQueryString) {
        alert("Checking if the element exists...");
        if (document.body.contains(document.querySelector(queryString))) {
            alert("The element exists.");
            clearInterval(myInterval);
        }
    }
}
