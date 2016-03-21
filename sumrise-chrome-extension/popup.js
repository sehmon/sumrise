var baseUrl = "http://localhost:8000/"

function getCurrentTabUrl(callback) {
    //Query tabs
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    //Queries the chrome API for the tab then returns it's url
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        callback(tab.url);
    });
};

function fillUrlField(url){
    document.getElementById('urlText').value = url;
}

function sendApiRequest(url, callback, errorCallback){
    console.log("Sending API request with url: " + url);
    var http = new XMLHttpRequest();
    var apiUrl = baseUrl+"api/article";
    // var params = "url=" + url;

    $.post(apiUrl, {
        url: url
    }, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });

    // http.responseType = 'json';
    // http.onload = function(e){
    //     var response = http.response;
    //     if(!response){
    //         errorCallback("No response from API");
    //         return;
    //     } 
    //     console.log(response);
    //     callback(response);
    // }
    // http.onerror = function(e){
    //     console.log("Error: " + e);
    // }
    //
    // http.open("POST", apiUrl, true);
    // http.send(params);
}

function alertMe(){
    alert("Alerts working");
}

function submitSummary(){
    console.log("Submitting Summary");
    url = document.getElementById('urlText').value;

    sendApiRequest(url, function(response){
        console.log(response);
    }, function(error){
        console.log(error);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    getCurrentTabUrl(function(url){
        fillUrlField(url);
    });

    var submit = document.getElementById('submitButton');
    submit.addEventListener('click', function(){
        submitSummary();
    });
});

