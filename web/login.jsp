<!-- 
    Document   : login
    Created on : Apr 17, 2018, 12:44:45 AM
    Author     : ReedS
-->

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<script type="text/javascript" src="javascript/functions.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.6.2/firebase-auth.js"></script>
<script>
    intitializeFireBase();
</script>

<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

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
        <link rel='stylesheet' href='css/style.css'>
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

