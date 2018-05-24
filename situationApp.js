//forward apps to its settings when clicking on use now.
// <a role="button" class="_42ft _4jy0 _4jy3 _517h _51sy" href="https://www.pinterest.com/" data-gt="{&quot;appid&quot;:&quot;274266067164&quot;,&quot;fbsource&quot;:&quot;1101&quot;,&quot;ref&quot;:&quot;search_typeahead&quot;,&quot;type&quot;:&quot;click2canvas&quot;}" data-bt="{&quot;ct&quot;:&quot;view&quot;}" target="_blank" rel="nofollow" data-lynx-mode="asynclazy" data-lynx-uri="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.pinterest.com%2F&amp;h=ATMShL9jRloo54kCGF7YAtohZBwPjBBf8vZM-ByuYeGVXm7OGWsa2L-k02xmWu6cbsURPGT54fsiOwz6Yx4ZGwbOEBpf-BheGwrt8ByM2rc">Use Now</a>
// if settings newApp=true
//forward to https://www.facebook.com/settings?tab=applications&section=active
// id="SettingsPage_Content" -> (either has attribute tabindex, or search img) <div class="_2_ks" tabindex="0" role="button"><img class="_3y18 img" src="https://scontent-amt2-1.xx.fbcdn.net/v/t39.2081-6/c0.0.49.49/p48x48/851575_10151604494267165_1137059041_n.png?_nc_cat=0&amp;oh=ab98a77959f4247194753232c207811b&amp;oe=5B8917F9" alt="" width="48" height="48"><div class="_3y19" style="min-height: 48px;"><div class="_3y1k ellipsis">Pinterest</div><div class="_3-lo ellipsis">View and edit</div></div></div>
if (window.location.href.indexOf('?tab=applications&section=active') !== -1) {
    setTimeout(function () {
        //alert("Prototype loaded.");
        // get the following line from the settings under "newApp"
        var appOfInterest = window.localStorage.getItem('fbApp_newApp');
        if (appOfInterest !== null) {
            alert("Prototype loaded.\nWe think that you use a new Facebook app...\nPlease review its settings.");
            //alert("The new app is:\n" + appOfInterest);
            var appsSettingsContent = document.querySelector("#SettingsPage_Content");
            //var allApps = appsSettingsContent.querySelectorAll("div[tabindex]");
            for (i = 0; i < appsSettingsContent.querySelectorAll("div[tabindex]").length; i++) {
                tabSelector = "div[tabindex=\"" + i + "\"]>div>div";
                tabSelected = appsSettingsContent.querySelector(tabSelector);
                if (tabSelected.innerHTML.toLowerCase() == appOfInterest.toLowerCase()) {
                    tabSelected.click();
                    window.localStorage.removeItem('fbApp_newApp');
                    break;
                }
            }

        }
        /*
        browser.storage.local.get("newApp").then(function (key, value) {
            alert("Key: "+key+"\nValue: "+value);
            appOfInterest = "Pinterest";
            if (value == "") {
                value = "Pinterest";
                alert("There was an issue while getting the app name. We assume you used:\n"+value);
            }
            else {
                appOfInterest = value;
                alert("The app used was:\n"+value);
            }
        });
        appsSettingsContent = document.querySelector("#SettingsPage_Content");
        for(i=0; i<appsSettingsContent.querySelectorAll("div[tabindex]").length; i++) {
            tabSelector = "div[tabindex=\""+i+"\"]";
            tabSelected = appsSettingsContent.querySelector(tabSelector).querySelector("div").querySelector("div");
            if (tabSelected.innerHTML.toLowerCase()==appOfInterest.toLowerCase()) {
                tabSelected.click();
                break;
            }
        } */
    }, 1000);
}

/*function situationSelector() {

    gamer();

}


function gamer() {
    alert("Gamer situation.");

}*/