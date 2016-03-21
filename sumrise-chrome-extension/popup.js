function getCurrentTabUrl(callback) {
    //Query tabs
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    //Queries the chrome API for the tab then returns it's url
    chrome.tabs.query(queryInfo, funciton(tabs) {
        var tab = tabs[0];
        callback(tab.url);
    });
};
