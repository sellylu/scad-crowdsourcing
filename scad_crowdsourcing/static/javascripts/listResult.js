var questionId = [];

function displayQuestions() {
    Google_Spreadsheet_Key = '1je3nXk0TxmtOGNVw_83tM3xskjnSr9HJ4kMbzDndNFs';
    url = 'https://spreadsheets.google.com/feeds/cells/' + Google_Spreadsheet_Key + '/1/public/values?alt=json-in-script&callback=?';
    
    var result;
    
    $.getJSON(url, function(data) {
              result = data.feed.entry;
              }).then(function(){
                      for(var i = 0; i < result.length; i++)
                      questionId.push(result[i].gs$cell.$t);
                      for(var i = 0; i < questionId.length; i++) {
                      FB.api("/" + questionId[i], function(response) {
                             if(response && !response.error) {
                             
                             $("#result-list").append('<a href="/results/' + response.id + '" class="list-group-item">' + response.message + '</a>');
                             }
                             });
                      }
                      });
}

function seeResults(item) {
    window.location.assign('/results/'+ item.getAttribute("id"));
}

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function(response) {
                      statusChangeCallback(response);
                      });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        displayQuestions();
    } else if (response.status === 'not_authorized') {
        if(confirm('Please log ' + 'into this app.'))
            FB.login(function(response) {
                     // TODO
                     }, {scope: 'publish_actions'});
    } else {
        alert('Please log ' + 'into Facebook.')
    }
}


window.fbAsyncInit = function() {
    FB.init({
            appId      : '879242695464021',
            xfbml      : true,
            version    : 'v2.5'
            });
    checkLoginState();
};