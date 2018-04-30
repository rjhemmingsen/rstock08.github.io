<!-- 
    Document   : login
    Created on : Apr 17, 2018, 12:44:45 AM
    Author     : ReedS
-->

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
String logPage, logSet, profilePage, profileSet;
if (session.getAttribute("email") != null) {
    profilePage = "profile.jsp";
    profileSet = "Profile";
    logPage = "logout.jsp";
    logSet = "Logout";
} else {
    logPage = "login.jsp";
    logSet = "Login";
    profilePage = "";
    profileSet = "";
}
%>

<html>
    <head>
        
        <title>Login Form</title>
        
        
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        
        <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-database.js"></script>
        //<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js"></script>
        //<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-functions.js"></script>
        
        <script>
          // Initialize Firebase
          var config = 
          {
            apiKey: "AIzaSyDojrbgT5Frg2UjTKQTTIrDAFi7mCXEDKQ",
            authDomain: "team3-iot-project-test.firebaseapp.com",
            databaseURL: "https://team3-iot-project-test.firebaseio.com",
            projectId: "team3-iot-project-test",
            storageBucket: "team3-iot-project-test.appspot.com",
            messagingSenderId: "858962275276"
          };
          firebase.initializeApp(config);
        </script>

        <script type="text/javascript" src="javascript/functions.js"></script>
    </head>
    <body>
        
        <header>
            <img class='banner' src="images/banner.jpg" alt="Clouds Banner" >
        </header>
        
        <ul>
          <li><a href="index.jsp">Home</a></li>
          <li><a href="location.jsp">Hourly</a></li>
          <li style="float:right"><a href="<%=profilePage%>"><%=profileSet%></a></li>
          <li style="float:right"><a href="<%=logPage%>"><%=logSet%></a></li>
        </ul>
        
        
        <div class="login">
            <form method="post" name="login" action="javascript:login()">
                <input type="text" placeholder="email" name="email" required>  
                <input type="password" placeholder="password" name="password" required>
                <br>
                <a href="createaccount.jsp" class="accountoption">Create Account</a>
                <br> 
                <a href="forgotpassword.jsp" class="accountoption">Forgot Password</a>
                <input type="submit" value="Sign In">
            </form>
        </div>
    </body>
</html>

