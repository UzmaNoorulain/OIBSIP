// SHA-256 hashing

async function hashPassword(password){

const encoder = new TextEncoder();

const data = encoder.encode(password);

const hash = await crypto.subtle.digest(
"SHA-256",
data
);


return Array.from(
new Uint8Array(hash)
)
.map(b=>b.toString(16).padStart(2,"0"))
.join("");

}



// Registration

const registerForm =
document.getElementById("registerForm");


if(registerForm){


registerForm.addEventListener(
"submit",
async e=>{


e.preventDefault();


let username =
document.getElementById("username").value;


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



let error =
document.getElementById("registerError");


let success =
document.getElementById("registerSuccess");



if(password.length < 8 ||
!/\d/.test(password)){


error.innerText =
"Password must contain minimum 8 characters and one number";


return;

}




let users =
JSON.parse(localStorage.getItem("users")) || [];



let exists =
users.find(
user=>user.email===email
);



if(exists){

error.innerText =
"User already exists";


return;

}




let hashed =
await hashPassword(password);



users.push({

username,

email,

password:hashed

});



localStorage.setItem(
"users",
JSON.stringify(users)
);



success.innerText =
"Registration successful. Redirecting...";


setTimeout(()=>{

location.href="index.html";

},1500);



});


}





// Login


const loginForm =
document.getElementById("loginForm");



if(loginForm){


loginForm.addEventListener(
"submit",
async e=>{


e.preventDefault();



let email =
document.getElementById("loginEmail").value;


let password =
document.getElementById("loginPassword").value;


let error =
document.getElementById("loginError");



let users =
JSON.parse(localStorage.getItem("users"))
|| [];



let hashed =
await hashPassword(password);



let user =
users.find(
u=>
u.email===email &&
u.password===hashed
);



if(!user){

error.innerText =
"Invalid email or password";


return;

}



sessionStorage.setItem(
"loggedInUser",
user.username
);



location.href="dashboard.html";


});


}