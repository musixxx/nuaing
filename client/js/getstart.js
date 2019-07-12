$(document).ready(function(){
  checkSignIn()
})


function checkSignIn(){
  if (localStorage.token) {
    $("#getting-started").hide();
    $("#home").show();
  } else {
    $("#getting-started").show();
    $("#home").hide();
  }
}

$("#btn-register").click(function(){
  $("#form-register").show();
  $("#form-signin").hide();
});

$("#btn-login").click(function(){
  $("#form-signin").show();
  $("#form-register").hide();
});

