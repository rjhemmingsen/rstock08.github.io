/*NOTE: all of these only work if running from an HTTP server*/
//test make user in firebase
function makeUserAuth()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  console.log("make auth: " + email + " " + password);
  firebase.auth().createUserWithEmailAndPassword(email,password);
}
//test sign in
function signIn()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  console.log("attempting sign in: " + email + " ...");

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error)
  {
    var errorCode = error.code;
    var errorMessage = error.message;
  }).then(function()  //this is because the auth() functions are asyncronous. so this will wait
  {
    if( firebase.auth().currentUser === null )
      alert("fail to log in!");
    else
      alert("sign in!");  
  });
}
//test sign out
function signOut()
{
  firebase.auth().signOut().then(function() //same asynchronous callbacks
  {
    console.log('Signed Out');
  }, function(error) 
  {
    console.error('Sign Out Error', error);
  });
}
//used in the HTML body's onload property
function checkSession()
{
  //NOTE: set timeout only needed @ large intervals for when using debugger, otherwise keep small (@ least 500 ms)
  setTimeout(function(){ alert("Hello " + firebase.auth().currentUser.email); }, 500);
}
