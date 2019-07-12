if (localStorage.token) {
  $("#getting-started").hide();
  $("#home").show();
}

$("#btn-register").click(function(){
  $("#form-register").show();
  $("#form-signin").hide();
});

$("#btn-login").click(function(){
  $("#form-signin").show();
  $("#form-register").hide();
});

