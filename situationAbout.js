//alert("Situation about loaded.");
//multiple attributes [][], but attribute in child element [] [] (space in between)

setTimeout(function () {
    alert("Prototype loaded. If you click 'Cancel' after an edit, please click on 'Family and Relationships' again before trying to edit another relation.");
    checkBoxForExExists = false;
    listEle = document.querySelector("a[data-testid=\"nav_all_relationships\"]");
    listEle.addEventListener('click', function () { setTimeout( function () { situationAboutRelationship(); }, 1000); } );
}, 1000);

function makeEditButtonsMoreInteractive(eButtons, pagelet) {
    for(i=0; i<eButtons.length;i++) {
        eButtons[i].addEventListener('click', function () {
            //alert("Edit Button clicked...");

            setTimeout( function () {
                clickedEditButton(eButtons, pagelet);
            }, 1000);
        });
    }
}

function situationAboutRelationship() {
    if (document.body.contains(relationshipPagelet = document.getElementById("pagelet_relationships"))) {
        editButtons = relationshipPagelet.querySelectorAll('a[ajaxify][href]:not([role="button"]):not([id])');
        //alert("Found a totoal of "+editButtons.length+" buttons...");
        makeEditButtonsMoreInteractive(editButtons, relationshipPagelet);
//        relationshipDiv = relationshipPagelet.firstChild.getElementsByClassName("fbProfileEditExperiences")[0];
//        familyDiv = relationshipPagelet.querySelector('div#family-relationships-pagelet').getElementsByClassName("fbProfileEditExperiences")[0];
//        relationshipDiv.addEventListener('click', function () { setTimeout( function () { heartbroken(relationshipPagelet); }, 1000); } );
    }
}

function clickedEditButton(eButtons, pagelet) {
/*    pagelet.querySelector('button[name="__cancel__"]').addEventListener('click', function () {
        setTimeout( function () {

            makeEditButtonsMoreInteractive(eButtons, pagelet);
        }, 1000);
    });*/
    var editForm = pagelet.querySelector('form');
    var partnerInfo;
    nameOfEx = editForm.querySelector('input[role="combobox"]').value;
    try {
        fbIdOfEx = editForm.querySelector('input[name="partner"]').value;
    } catch (e) {
        fbIdOfEx = editForm.querySelector('input[name="family_id[]"]').value;
    } finally {
        partnerInfo = {name:nameOfEx, id:fbIdOfEx};
    }
    //alert("Name of Partner/Family member: "+nameOfEx+"\nFacebook id: "+fbIdOfEx);

    relationshipSelector = editForm.querySelector('select');

    /*
    singleValue = 'value="1"';
    petValue = 'value="242"';

    try {
        relationshipSelector.querySelector('option['+singleValue+']').addEventListener('click', function () {
            alert("This doesn't work on Chrome...");
            heartbroken(pagelet, partnerInfo);
        });
    } catch (e) {
        relationshipSelector.querySelector('option['+petValue+']').addEventListener('click', function () {
            heartbroken(pagelet, partnerInfo);
        });
    }*/

    relationshipSelector.addEventListener('change', function () {
            if ((this.options[this.selectedIndex].value === "1") ||
                (this.options[this.selectedIndex].value === "242"))
                heartbroken(pagelet, partnerInfo);
        });
}

function heartbroken(pagelet, partnerInfo) {
    //alert("Name of Ex: "+partnerInfo.name+"\nFacebook id: "+partnerInfo.id);

    /*    if(document.body.contains(sel = pagelet.querySelector("select.relationSelector[name=\"status\"]"))) {
            alert("Heartbroken situation.");
        }
        */
    // Create a checkbox asking if the Ex should be excluded from future posts
    containerExcludeEx = document.createElement("li");
    excludeExCheckBox = document.createElement("input");
    excludeExCheckBox.type = "checkbox";
    excludeExCheckBox.checked = false;
    labelExcludeEx = document.createElement("label");
    labelExcludeEx.appendChild(document.createTextNode("Exclude Ex from future posts?"));
    /*labelExcludeEx.onclick = function () {
        excludeExCheckBox.checked = !(excludeExCheckBox.checked);
    };*/
    containerExcludeEx.appendChild(excludeExCheckBox);
    containerExcludeEx.appendChild(labelExcludeEx);
    excludeExCheckBox.onchange = function () {
    //containerExcludeEx.onclick = function () {
        if (excludeExCheckBox.checked) {
            alert("The prototype will now exclude the selected person. Please be a bit patient...");

            //  custom will be returned from wedge...
            var friendListSelection = editForm.querySelector('a[role="button"][rel="toggle"]');
            friendListSelection.addEventListener('click', function () {
                setTimeout(function () {
                    customList = document.body.querySelectorAll('div.uiScrollableAreaContent ul[role="menu"]');
                    customList = customList[customList.length - 1];
                    customList = customList.querySelector('li[aria-haspopup="true"]').previousSibling;
                    customList.click();
                    //alert("Should open custom list.");

                    setTimeout(function () {
                        excludeSomeoneAria = document.body.querySelector('div[aria-labelledby="customHiddenFrom"]');
                        elementRequiringAddition = excludeSomeoneAria.querySelector('div.tokenarea');

                        //Reverse Engineered FB behavior to exclude someone.
                        parentSpan = document.createElement('span');
                        parentSpan.className = "removable uiToken";

                        exSpan = document.createElement('span');
                        exSpan.className = "uiTokenText";
                        exSpan.innerHTML = nameOfEx;
                        parentSpan.appendChild(exSpan);

                        inputExId = document.createElement('input');
                        inputExId.value = fbIdOfEx;
                        inputExId.name = "hiddenfrom[]";
                        inputExId.autocomplete = "off";
                        inputExId.type = "hidden";
                        parentSpan.appendChild(inputExId);

                        inputExName = document.createElement('input');
                        inputExName.value = nameOfEx;
                        inputExName.name = "text_hiddenfrom[]";
                        inputExName.autocomplete = "off";
                        inputExName.type = "hidden";
                        parentSpan.appendChild(inputExName);

                        anchorRemover = document.createElement('a');
                        anchorRemover.href = "#";
                        anchorRemover['aria-label'] = "Remove " + nameOfEx;
                        anchorRemover.className = "remove uiCloseButton uiCloseButtonSmall";
                        parentSpan.appendChild(anchorRemover);

                        elementRequiringAddition.appendChild(parentSpan);
                        elementRequiringAddition.removeAttribute('class');
                        elementRequiringAddition.className = "tokenarea";
                        /*inputField = excludeSomeoneAria.querySelector('div.innerWrap').querySelector('input');
                        inputField.click();
                        inputField.value = nameOfEx;
                        excludeSomeoneAria.querySelector('input[name="text_hiddenfrom[]"]').querySelector('class="tokenarea hidden_elem"')
                        excludeSomeoneAria.querySelector('ul[role="listbox"]').childNodes[0].click();*/

                        excludeSomeoneAria.closest('form').querySelector('button').click();
                        /*setTimeout(function () {
                            saveButton.click();
                        }, 1000);*/
                    }, 2000);


                }, 500);
            });
            friendListSelection.click();
            //customList = document.body.querySelectorAll('div.uiScrollableAreaContent ul[role="menu"] li[aria-haspopup="true"] a[aria-haspopup="true"]')[0];//editForm.querySelector('a[data-hover="tooltip" data-tooltip-alignh="right"]').querySelector('li[aria-haspopup="true"]').previousSibling;

        }
    };

    var editForm = pagelet.querySelector('form');
    editForm.querySelector('ul').insertBefore(containerExcludeEx, pagelet.querySelector('ul li').nextSibling);

    saveButton = editForm.querySelector('button[name="__submit__"]');
    myFakeSaveButton = document.createElement("button");
    myFakeSaveButton.className = saveButton.className;
    myFakeSaveButton.innerHTML = "Save";
    saveButton.parentNode.insertBefore(myFakeSaveButton, saveButton.nextSibling);
    //saveButton.remove();
    saveButton.parentNode.removeChild(saveButton);

    myFakeSaveButton.onclick = function () {
        newExcludeSelection = editForm.querySelector('input[name^="privacy"]');
        var excludeSettings = {
            name: "friends except Ex",
            numberOfFriends:"all my friends -1",
            value: newExcludeSelection.value
        }
        //alert("Will try to store these settings of value: \n"+excludeSettings.value);
        window.localStorage.setItem('fbList_excludeEx', JSON.stringify(excludeSettings));
        //browser.storage.local.set(excludeSettings);

    };
    //get the button save in onclick
    //selected, Text "Exclude Ex from future posts?"
    // If checked,
    // when changing relationship to single add checkbox to exclude ex from future posts (enabled by default)
    // do the same for family to pet

    /*list = par1.closest('ul');
    replacedElements = list.childNodes[1];
    replacedElements.setAttribute('style="display: none"');
    hiddenInput = list.getElementsByTagName('input');
    wedgeProps = "{text: 'Friend Selector', press: update(par1, hiddenInput)}";
    buttonList = ["{text: 'Exclude', press: openExcludePanel()}", "{text: 'Cancel', press: }", "{text: 'Submit', press: }"]
    // in this nudge, the settingsSetter isn't required.
    list.appendChild(nudge());*/

}
