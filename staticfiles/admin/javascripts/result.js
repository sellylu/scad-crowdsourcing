var id;
var question;
var likes;
var answers = [];

function displayResult(){
    tmp = window.location.pathname.split("/");
    id = tmp[tmp.length-1];
    FB.api("/" + id, {"fields": "message, comments{from{picture}, like_count, message}, created_time, likes.summary(true)"}, function(response) {
        if(response && !response.error) {
        question = response.message;
		$("#question").text(question);
		likes = response.likes.summary.total_count;
        for(var i = 0; i < response.comments.data.length; i++) {
        	var answer = {
			"mesg": response.comments.data[i].message,
			"pic": response.comments.data[i].from.picture.data.url,
			"likes": response.comments.data[i].like_count
			};
        	answers.push(answer);
			$("#answer-list").append('<li class="list-group-item"><img src="' + answers[i].pic + '" class="img-thumbnail"><span class="badge">' + answers[i].likes + '</span>&nbsp;' + answers[i].mesg + '</li>');
        }
		if(answers.length == 0)
		$("#answer-list").append('<li class="list-group-item" style="text-align: center;">There\'s no reply yet!</li>');
        }
    });
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
        displayResult();
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
