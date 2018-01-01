toast = (event) =>{
    var div = document.createElement('div')
    div.id = 'toast'
    div.className = 'show-toast'
    var text = document.createTextNode(event)
    div.appendChild(text)
    document.body.appendChild(div)
  
    setTimeout(() => {
      div.className = div.className.replace("show-toast","")
      div.parentNode.removeChild(div)
    }, 3000)
  }   
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
  hasWhiteSpace = (s)=> {
      return  /\s/g.test(s);
    }
  
   function renderNavTemplate(tpl){
    document.getElementById('nav').innerHTML = tpl
  }
   function renderTemplate(tpl){
      document.getElementById('content').innerHTML = tpl     
  }
  
  
  
  
      
  
  
  
  
  function forgotPasswordController(){
  
  }
    
   function loginController () {
  if(document.getElementById('login-form')){
    document.getElementById('login-form').addEventListener('submit',e=>{
      
        var url = 'https://localhost/avrora/backend/login'
        var username = document.getElementById('usernameLogin').value
        var password = document.getElementById('passwordLogin').value
       
         var payload = JSON.stringify({username,password})
         var xhr = new XMLHttpRequest()
         xhr.open("POST", url, true)
         xhr.setRequestHeader("Content-type", "application/json")
         xhr.send(payload)
         xhr.onreadystatechange = function() {
    
          if(xhr.status == 401)
          {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("uid");   
            window.location.href = "#/login"
          }
          if(xhr.readyState == 1){
            
    
            document.getElementById('loading').style = 'display:block;';
    
          } 
          if(xhr.readyState == 4 && xhr.status == 200) {
    
            if (xhr.responseText === undefined) {
              return false
            }
                document.getElementById('loading').style = 'display:none;';
                var json = JSON.parse(xhr.response)
                if(json.status === 'Account is banned')
                {
                  window.location.href = "#/login"
                  toast(json.status)
                }
                else if(json.status === 'Incorrect utilisateur et\ou mot de passe'){
                  window.location.href = "#/login"
                  toast(json.status)
                }
                else if(json.status === 'Wrong credentials'){
                  window.location.href = "#/login"
                  toast(json.status)
                }else{
                  sessionStorage.setItem("username", json.username);
                  sessionStorage.setItem("uid", json.id);
                  sessionStorage.setItem("token", json.token);
                  connection.extra.fullName = sessionStorage.getItem("username");
                  window.location.href = "#/home"
                }
                     
             }
        
    
         xhr.onerror = (err) =>{
          console.log(err) 
            
         }   
    
    
        }
    
        e.preventDefault()
    })
  }
  
  }
  
  loginPage = () => {
    return `
    <title>S\'indentifier</title>
    <form id="login-form" novalidate>
    <div class="login-class">
    <label id="usernameLogin-label">Utilisateur</label>
    <input type="text" name="usernameLogin" id="usernameLogin">
    </div>
    <div class="login-class">
    <label id="passwordLogin-label">Votre mot de passe</label>
    <input type="password" name="passwordLogin" id="passwordLogin">
    </div><br/>
    <button class="button-login"  id="login-button" type="submit" name="Se connecter">Se connecter</button>
    <p><a style="cursor:pointer;" onclick="redirectToForgotPassword()" >J'ai oublié mon mot de passe.</a></p>
    </p>
    </form> 
    `
  }
  registerController =  ()=> {
    listenRegisterEmail = () =>{
      
      ValidateRegisterEmail()
    }
    
    listenRegisterUsername = () =>{
      
      ValidateRegisterUsername()
    }
    
    listenRegisterPassword= () =>{
     
      ValidateRegisterPassword()
    }
  
      
  if( document.getElementById('usernameRegister') || document.getElementById('passwordRegister') || document.getElementById('emailRegister')){
    document.getElementById('usernameRegister').addEventListener("keyup", listenRegisterUsername,false)
    document.getElementById('passwordRegister').addEventListener("keyup", listenRegisterPassword,false)
    document.getElementById('emailRegister').addEventListener("keyup", listenRegisterEmail,false)
    ValidateRegisterUsername= () => {
      if(document.getElementById('usernameRegister').value!==''){
        if(document.getElementById('usernameRegister').value.length < 3){
          document.getElementById('usernameRegister-label').style = 'color:#ff0000'
          document.getElementById('usernameRegister-label').innerText = 'Votre nom de l\'utilisateur doit contenir au moins 3 character et sans espaces!'
        }else{
          if(!hasWhiteSpace(document.getElementById('usernameRegister').value)){
            document.getElementById('usernameRegister-label').innerText = 'Votre nom de l\'utilisateur est valide !'
            document.getElementById('usernameRegister-label').style.color ='#2eb82e'
          }else{
            document.getElementById('usernameRegister-label').style = 'color:#ff0000'
            document.getElementById('usernameRegister-label').innerText = 'Votre nom de l\'utilisateur contient un/des espace(s) !'
          }
        }
        
    }else{
      document.getElementById('usernameRegister-label').innerText = 'Votre nom de l\'utilisateur est requise !'
      document.getElementById('usernameRegister-label').style = 'color:#ff0000'
    }
  
    }
    ValidateRegisterPassword = () =>{
      if(document.getElementById('passwordRegister').value !==''){
        if(document.getElementById('passwordRegister').value.length < 5 ){
          document.getElementById('passwordRegister-label').style = 'color:#ff0000'
          document.getElementById('passwordRegister-label').innerText = 'Votre mot de passe doit contenir au moins 5 character et/ou chiffre!'
        }else{
          if(!hasWhiteSpace(document.getElementById('passwordRegister').value)){
            document.getElementById('passwordRegister-label').innerText = 'Votre mot de passe est valide !'
            document.getElementById('passwordRegister-label').style.color = '#2eb82e'
          }else{
            document.getElementById('passwordRegister-label').style = 'color:#ff0000'
            document.getElementById('passwordRegister-label').innerText = 'Votre mot de passe contient un/des espace(s) !'
          }
        }
      }else{
        document.getElementById('passwordRegister-label').innerText = 'Mot de passe est requis !'
        document.getElementById('passwordRegister-label').style = 'color:#ff0000'
      }
  }
  
  ValidateRegisterEmail = ()  => {
  
  
  if(document.getElementById('emailRegister').value !== ''){
          
        {  
          if(!hasWhiteSpace(document.getElementById('emailRegister').value)){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('emailRegister').value)){
              if(!hasWhiteSpace(document.getElementById('emailRegister').value)){
                document.getElementById('emailRegister-label').innerText = 'L\'email est valide !'
                document.getElementById('emailRegister-label').style.color='#2eb82e'
                register = (e) => {
               
                    var url = 'https://localhost/avrora/backend/register'
                    var username = document.getElementById('usernameRegister').value
                    var email = document.getElementById('emailRegister').value
                    var password = document.getElementById('passwordRegister').value
                     var payload = JSON.stringify({username,email,password})
                     const xhr = new XMLHttpRequest()
                     xhr.open("POST", url, true)
                     xhr.setRequestHeader("Content-type", "application/json")
                     xhr.send(payload)
                     
                     xhr.onreadystatechange = function() {
                      if(xhr.status == 401)
                      {
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("username");
                        sessionStorage.removeItem("uid"); 
                        window.location.href = "#/login"  
                      }
                      if(xhr.readyState == 1){
                        
              
                        document.getElementById('loading').style = 'display:block;';
                
                      } 
                      
                         if(xhr.readyState == 4 && xhr.status == 200) {
                     
                          var a  = JSON.parse(xhr.responseText)
                         if(a.status === "L\'Utilisateur a été créer !")
                         {
                           window.location.href = "#/login"
                           toast(a.status)
                         }else{
                          window.location.href = "#/register"
                          toast(a.status) 
                         }
     
                          document.getElementById('loading').style = 'display:none;';
                      
                         
                         }
                           
                     }
                     xhr.onerror = (err) =>{
                         
                         var error = JSON.parse(err.status)
                         console.log(error)
                       
    
                     }
                     e.preventDefault()
  
               
               }
              }else{
                document.getElementById('emailRegister-label').innerText = 'L\'email contient un/des espace(s) !'
                document.getElementById('emailRegister-label').style = 'color:#ff0000'
              }
            }else{
              document.getElementById('emailRegister-label').innerText = 'L\'email n\'est pas valide !'
              document.getElementById('emailRegister-label').style = 'color:#ff0000'
            } 
          }else{
            document.getElementById('emailRegister-label').innerText = 'L\'email contient un/des espace(s) !'
            document.getElementById('emailRegister-label').style = 'color:#ff0000'
          }
        
        }
      }else{
        document.getElementById('emailRegister-label').innerText = 'L\'email est requis !'
        document.getElementById('emailRegister-label').style = 'color:#ff0000'
      }    
    
  }
  }
  
  
  
  
  }
    
  
  
    
    
  
  
  
  
  
   
  
  
  
  
    redirectToForgotPassword = () => {
      
    }
  
    redirectToRegister = () => {
      
    }
  
  
    registerPage = () => {
        return `
        <title>S\'inscrire</title>
        <form id="register-form" onsubmit="register(event)" novalidate>
                <div class="register-class">
                <label id="emailRegister-label">Votre adresse d'email</label>
                <input type="email" name="emailRegister"id="emailRegister">
                </div>
              <div class="register-class">
              <label id="usernameRegister-label">Utilisateur</label>
              <input type="text"  id="usernameRegister" />       
                </div>
                <div class="register-class">
                <label id="passwordRegister-label">Votre mot de passe</label>
                <input type="password" name="passwordRegister" id="passwordRegister">
                </div><br/>
               
                    <button class="but" id="register-button" type="submit" name="S'inscrire">
                    S'inscrire</button>
                </form>  
     
        `
     }
  
  
  authController= () => {
  
  
             if(sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == null || sessionStorage.getItem("username") == "" || sessionStorage.getItem("username") == null || sessionStorage.getItem("uid") == "" || sessionStorage.getItem("uid") == null){
             
           
              document.getElementById('menu').innerHTML = `
  
         <a href="#/login">S'indentifier</a>
         <a href="#/register">S'inscrire</a>
              `
           
             }else {
          
        
               document.getElementById('menu').innerHTML = `
            
               <a>Connecté comme: <strong>${sessionStorage.getItem("username") !=="" ?sessionStorage.getItem("username").toUpperCase() : "NoN" }</strong></a>
               <a id="logout" href="#">Déconnexion</a>
    
             `
             
                document.getElementById('logout').addEventListener('click',e =>{
                  e.preventDefault()
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("username");
                  sessionStorage.removeItem("uid");
                  
                  window.location.href = '#/login'
                    toast('Vous etes déconnecter !')
             
                 })
            
             }
  
        
  
  }
  authPage = ()=>{
    return `
    <div class="topnav" id="myTopnav">
    <a id="homePage" href="#/home" title="Space">Mon Space</a>
    <span id="menu"></span>
    <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a>
    </div>` 
   }
  
   homePage = () =>{
     return `
     <div class="action">
     <input type="text" id="room-id">
     <button style="display:block" id="open-room">Open Room</button>
     <span id="deli"></span>
     <button id="join-room">Join Room</button>
     <div class="room-url" id="url-room"></div>
     
</div>
<br>
<div class="messages" id="messages">
<div id="chat-container">      
 <div width="40%" height="40%" class="chat-output"></div>
 <div id="img"></div>
</div>
</div>

<input class="send" id="input-text-chat" placeholder=""type="text"></input>
<div id="share-file">📷</div>
     `
   }
   renderTemplate(homePage())
  
  
  
   function getRoute ()  {
    renderNavTemplate(authPage())
    authController()
    loginController()
    registerController()
    if (window.location.href === 'https://localhost/space/' || window.location.href === 'https://github.com/extremety1989/space') {
      window.location.href = "#/login";
    }else if(document.location.hash === '#/home'){
     
   renderTemplate(homePage())
    
  
      
    }else if(document.location.hash === '#/logout'){
      logout()
  
      
    }else if(document.location.hash === '#/login'){
      
      renderTemplate(loginPage())
           loginController()
         
  
    }else if(document.location.hash === '#/register'){
      renderTemplate(registerPage())
   
           registerController()
         
  
    }else{
   
       renderTemplate(homePage())
      
       
    }
  }
  
  (function(){  
   
      window.addEventListener('hashchange',getRoute,false) 
      getRoute()    
  }())
  
  
  
  
