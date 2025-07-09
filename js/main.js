var nameInput=document.getElementById("nameS");
var mailInput=document.getElementById("mailS");
var mailLoginInput=document.getElementById("mail");
var passwordInput=document.getElementById("passwordS");
var passwordLoginInput=document.getElementById("password");
var incorrect=document.getElementById("incorrect");
var loginBtn=document.getElementById("login");
var home =document.getElementById("home");
var username=document.getElementById("username");
var logoutBtn=document.getElementById("logout");
var already=document.getElementById("already");





if(localStorage.getItem('data')){
    var signUpList =JSON.parse(localStorage.getItem('data'));
}else{
    signUpList=[];
}

function addSignUp(){

    var isExist = signUpList.some(function(user) {
        return user.mail === mailInput.value;
    });

    if (isExist) {
        incorrect.classList.remove("d-none");
        already.classList.remove("d-none");
        return;
    }
    if(validation(nameInput)&&validation(mailInput)&&validation(passwordInput)){
        var sign={
            name:nameInput.value,
            mail:mailInput.value,
            password:passwordInput.value
        }
        
        signUpList.push(sign);
        localStorage.setItem('data' ,JSON.stringify(signUpList));

        incorrect.classList.add("d-none");
        localStorage.setItem('currentUser', sign.name);

        window.location.href = "index.html";
            
        
    }
    else{
        console.log("Validation failed!");
        incorrect.classList.remove("d-none");
        already.classList.add("d-none");


    }
        
}

function cleardata(){
    nameInput.value='';
    mailInput.value='';
    passwordInput.value='';
}


function validation(element){
    var vailInputs={
        nameS:/^[\u0600-\u06FF\w\s]{3,50}$/i,
        mailS:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        passwordS:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    };
    var val = vailInputs[element.id].test(element.value);

    if (val) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        element.nextElementSibling.classList.add("d-none");

        return true;
    }
    else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");

        return false;


    }

    
}






function login(){

    var loginData={
        mail:mailLoginInput.value,
        password:passwordLoginInput.value

    }
    var found = false;

    for (var i = 0; i < signUpList.length; i++) {
        if (signUpList[i].mail === loginData.mail && signUpList[i].password === loginData.password)
        {
            found = true;
            localStorage.setItem('currentUser', signUpList[i].name); 
            window.location.href = "home.html";
            break;
        }
    }

    if (!found) {
        incorrect.classList.remove("d-none");
    }
    else{
        incorrect.classList.add("d-none");

    }
}

function displayUserName() {
    var name = localStorage.getItem('currentUser'); 
    if (name) {
        document.getElementById("username").innerText = name; 
    }
}
window.onload = function () {
    displayUserName();
};

function logout() {
    localStorage.removeItem('currentUser'); 
    window.location.href = "index.html";
}
