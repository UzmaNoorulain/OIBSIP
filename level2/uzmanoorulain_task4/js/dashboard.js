
let user =
sessionStorage.getItem(
"loggedInUser"
);



if(!user){

location.href="index.html";

}



document.getElementById("user")
.innerText =
user;



document.getElementById("logout")
.onclick=function(){


sessionStorage.removeItem(
"loggedInUser"
);


location.href="index.html";


};
