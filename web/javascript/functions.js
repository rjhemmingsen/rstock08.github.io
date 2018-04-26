/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global firebase */
var ref = firebase.database().ref("/");
var userRef = ref.child("users");

ref.child("/message").on("value",function(snap)
{
  var msg = snap.val();
  
  switch(msg)
  {
    case "ready":
      break;
    case "enroll":
      //do enroll shit
      alert("this is just a test. everything done on pi");
      ref.child("message").set("ready");
      break;
    default:
      alert("technical difficulty: invalid message");
      ref.child("message").set("ready");
      break;
  }

});

function enrollFinger()
{
  var ID = parseInt(document.getElementById("fingerID").value);

  if( ID < 0 || ID > 127 || isNaN(ID) )
  {
    alert("invalid fingerID");
    return;
  }
  else
  {
      userRef.once("value",function(snap)
  {
    if( !snap.hasChild(ID.toString()) )
    { //SHOULD ALSO DO SOME CHECKS FOR EMPTY FIELDS
      userRef.child(ID).set(
      {
        email : document.getElementById("emailInput").value,
        password : document.getElementById("passwordInput").value,
        firstName : document.getElementById("fNameInput").value,
        lastName : document.getElementById("lNameInput").value,
        address : document.getElementById("addressInput").value,
        zipcode : document.getElementById("zipcodeInput").value,
        city : document.getElementById("cityInput").value,
        state : document.getElementById("stateInput").value
      });
      alert("place finger on fingerprint scanner and click OK to continue");
      ref.child("message").set("enroll");
    }
  
  else
    alert("ID exists already");
  });
  }
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