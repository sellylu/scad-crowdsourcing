(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

(function(){
 $("#search-bar").keyup(function(event){
                        if(event.keyCode == 13) {
                        $("#publish-btn").click();
                        }
                        });
 })();
 
var output = '';
 
function postQuestion(output) {
    FB.api('/me/feed', 'post', {message: output}, function(response) {
           if(!response || response.error) {
           alert('Error occrued');
           } else {
           $.get("https://script.google.com/macros/s/AKfycbytnfJCnkXSVU_1X7VRktbdLxdhtony1RWHIqI3X41JntcI864/exec",
                 {"id": response.id}).then(function() {
                                           alert('Post Successed!');
                                           window.location.assign('/');
                                           });
           //alert('Post Successed!');
           //window.location.assign('/');
           }
           });
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
                    output = $("#search-bar").val();
                    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        
        postQuestion(output);

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
};