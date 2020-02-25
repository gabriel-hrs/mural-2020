$(document).ready(function() {

  // =========== CAMPOS =====================
  var userName = $("#user");
  var userState = $("#states");
  var userCity = $("#user-city");
  var userPassword = $('#user-password');
  var userConfrimPassword = $('#user-confirm-password');

  $(".btn-confirm").on("click", function(event) {

    event.preventDefault();

    if(userPassword.val() == userConfrimPassword.val()){
      
      firebase.auth().createUserWithEmailAndPassword(email, userPassword.val())
      .then(function(sucess){
  
        create(
          userName.val(), 
          userState.val(), 
          userCity.val()
        );
  
      }).catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        
      });

    }else{
      console.log("Senhas diferentes!")
    }

  });

  function create(nome) {
    let data = {
      nome: nome,
      senha: senha
    };
    return firebase
      .database()
      .ref()
      .child("Usuarios")
      .push(data);
  }


  firebase
    .database()
    .ref("Usuarios")
    .on("value", function(snapshot) {
      $(".userList").html("");

      var lista = "<tr>";
      lista += "<th> Nome </th>";
      lista += "<th> Senha </th>";
      lista += "</tr>";

      snapshot.forEach(function(item) {
        lista += "<tr>";
        lista += "<td>" + item.val().nome + "</td>";
        lista += "<td>" + item.val().senha + "</td>";
        lista += "</tr>";
      });

      $(".userList").html(lista);
    });
});
