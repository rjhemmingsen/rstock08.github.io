/*NOTE: all of these only work if running from an HTTP server*/

function makeUserAuth()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  console.log("make auth: " + email + " " + password);
  firebase.auth().createUserWithEmailAndPassword(email,password);
}

function signIn()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  console.log("attempting sign in: " + email + " ...");

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error)
  {
    var errorCode = error.code;
    var errorMessage = error.message;
  }).then(function()
  {
    if( firebase.auth().currentUser === null )
      alert("fail to log in!");
    else
      alert("sign in!");  
  });
}


function signOut()
{
  firebase.auth().signOut().then(function() 
  {
    console.log('Signed Out');
  }, function(error) 
  {
    console.error('Sign Out Error', error);
  });
}

function checkSession()
{
  //NOTE: set timeout only needed @ large intervals for when using debugger, otherwise keep small (@ least 500 ms)
  setTimeout(function(){ alert("Hello " + firebase.auth().currentUser.email); }, 500);
}