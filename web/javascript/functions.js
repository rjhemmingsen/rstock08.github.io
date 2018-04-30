/* global firebase */

var ref = firebase.database().ref("/");
var userRef = ref.child("users");


var dayCounts = 
{
  "Sunday" : 0,
  "Monday" : 0,
  "Tuesday" : 0,
  "Wednesday" : 0,
  "Thursday" : 0,
  "Friday" : 0,
  "Saturday" : 0
}

userRef.child("0/history").once("value",function(snap)
{
  snap.forEach(function(nestSnap)
    {
      console.log(getDayOfTheWeek(nestSnap.key));
      for( var time in nestSnap.val() )
      {
        console.log(time);
        dayCounts[getDayOfTheWeek(nestSnap.key)]+=1;
      }
    });
  console.log(dayCounts);
});

//message listener
ref.child("message").on("value",function(snap)
{
  var msg = snap.val();
  
  switch(msg)
  {
    case "idle":
      break;
    case "ready":  //ignore; pi will listen
      break;
    case "enroll":  //ignore; pi will listen
      break;
    case "phase1":  //first placement of finger
      alert("please place your finger on the scanner and click OK");
      break;
    case "phase2":  //second placement
      alert("remove finger and place again, then click OK");
      break;
    case "enrollsuccess":  //success. create account
      enrollUser();
      alert("congratulations! you are set");
      ref.child("message").set("idle");
      break;
    case "error:enroll":  //operation failed from pi
      alert("something went wrong. please try again!");
      ref.child("message").set("enroll");
      break;
    case "error:overflow":  //ID > 127 on pi
      alert("too many users in this household");
      ref.child("message").set("idle");
      break;
    case "error:exists":  //fingerprint model exists on scanner memory
      alert("it seems fingerprint already exists! please try again");
      ref.child("message").set("idle");
      break;
    case "error:nomatch":  //finger models did not match
      alert("fingerprints do not match! please try again");
      ref.child("message").set("idle");    
      break;
    case "error:sensor":  //fingerprint sensor error
      alert("fingerprint scanner failed to initialise. please try again.\nif this problem persists, please contact customer service");
      ref.child("message").set("idle");
      break;
    default:
      alert("technical difficulty: invalid message. sorry about that!");
      ref.child("message").set("idle");
      break;
  }
});
//enroll function will update messages and pi should listen
function enrollUser()
{  
  ref.once("value",function(snap)
  {
    var newID = parseInt(snap.child("householdCount").val()) + 1;
    ref.child("householdCount").set(newID);

    if( newID > 127 )
      alert("Too many people registered for this household");
    else
    { 
      var accountType = "common";
      if( newID === 1 )
        accountType = "admin";
      var dateNow = new Date();
      userRef.child(newID).set(
      {
        'email' : document.getElementById("emailInput").value,
        'password' : document.getElementById("passwordInput").value,
        'firstName' : document.getElementById("fNameInput").value,
        'lastName' : document.getElementById("lNameInput").value,
        'dob' : document.getElementById("dobInput").value,
        'address' : document.getElementById("addressInput").value,
        'zipcode' : document.getElementById("zipcodeInput").value,
        'city' : document.getElementById("cityInput").value,
        'state' : document.getElementById("stateInput").value,
        'phone' : document.getElementById("phoneInput").value,
        'dateRegistered' : dateNow.toJSON(),
        'accountType' : accountType
      });
    }
  });
}

function showHistory()
{
  //table string builder
  var myTablehtmlBuilder = "<table><tr><th style='color: #000fff;'>Entry History</th></tr>";
  //this only gets user 0 history
  //can do something like string builder to get specific user 
  userRef.child("0/history").once("value",function(snap)
  {
    snap.forEach(function(nestSnap)
    {
      for ( var time in nestSnap.val() )
        myTablehtmlBuilder += "<tr><td>" + nestSnap.key + " @ " + time + "</td></tr>";
    });
    myTablehtmlBuilder += "</table>"; 
    document.getElementById('myTable').innerHTML = myTablehtmlBuilder;
  });
}

function showFailed()
{
  var myTablehtmlBuilder = "<table><tr><th style='color: #770770;'>Failed Attempt History</th></tr>";
  ref.child("failed").once("value",function(snap)
  {
    snap.forEach(function(nestSnap)
    {
      
      for ( var time in nestSnap.val() )
        myTablehtmlBuilder += "<tr><td>" + nestSnap.key + " @ " + time + "</td></tr>";
    });
    myTablehtmlBuilder += "</table>"; 
    document.getElementById('failedAttemptTable').innerHTML = myTablehtmlBuilder;
  });  
}

function enrollMessage()
{
  ref.child("message").set("enroll");
}

function readyMessage()
{
  ref.child("message").set("ready");
  alert("place finger on scanner now");
}

function getDayOfTheWeek(dateString)
{
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  //adding a space to the end of the date string lets JS parse as UTC string
  var date = new Date(dateString+" ");
  return days[date.getDay()];
}

function login(){
 
    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password"].value;
    
    ref.firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage + errorCode);

        window.location.replace("http://localhost:8080/Project-IoT/createaccount.jsp");

        // ...
    }); 
    
    window.alert("Success!");
    
    window.location.replace("http://localhost:8080/Project-IoT/forgotpassword.jsp");
    
    //window.alert("Success!");
    
    //ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    //    console.log(snapshot.val());
    //    snapshot.forEach(function(data) {
    //        console.log(data.key);
    //    });
    //});
    
    /*
    if(userRef.orderByChild('email').equalTo(email)){
        
        window.location.replace("http://localhost:8080/Project-IoT/createaccount.jsp");
    }
    else{
        window.location.replace("http://localhost:8080/Project-IoT/forgotpassword.jsp");
    }*/
}