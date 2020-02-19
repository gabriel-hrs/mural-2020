$(document).ready(function() {
  var userName = $("#user");
  var userPassword = $("#userPassword");
  var userPasswordConfirm = $("#userPassword2");

  $(".btn-confirm").on("click", function(event) {
    event.preventDefault();
    create(userName.val(), userPassword.val());
  });

  function create(nome, senha) {
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
