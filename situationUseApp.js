function newAppStored() {
    if (confirm("Please finish setting up your new app. Once you have done so, click 'ok'.\n" +
        "If you click 'cancel', you will stay on the current page.")) {
        //alert("The prototype thinks that you use a Facebook app.\nPlease review its settings...");
        window.location.href = "/settings?tab=applications&section=active";
    }
}

function newAppStoredError() {
    alert("There was an error while storing the name of the app you used... We are assuming that you are using Pinterest.");
    setTimeout(function () {
        window.location.href = "/settings?tab=applications&section=active";
    }, 5000);
}

setTimeout(function () {
    alert("Prototype loaded.");
    var browsingResultPagelet = document.getElementById('browse_result_area');
    var browsingResults = browsingResultPagelet.querySelectorAll('div[data-vistracking][data-insertion-position]');

    //useNowButtons = document.getElementById('browse_result_area').querySelectorAll('a[data-gt]');
    for (i=0; i<browsingResults.length; i++) {
        browsingResults[i].querySelector('a[data-gt]').addEventListener('click', function () {
            var newApp;
            try {
                newApp = this.parentNode.nextSibling.querySelector('a').innerText;
            } catch (e) {
                alert("Couldn't get the app name...");
                //newApp = "Pinterest";
            }
            // store the app name in the settings under "newApp"
            window.localStorage.setItem('fbApp_newApp', newApp);
            //browser.storage.local.set(newApp).then(newAppStored, newAppStoredError);
            setTimeout(function () { newAppStored(); }, 1000);
        });
    }
}, 1000);
