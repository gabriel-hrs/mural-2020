$(document).ready(function() {
  // =========== CAMPOS =====================
  var userPhoto = $("#photo");
  var userName = $("#user");
  var userEmail = $("#email");
  var userState = $("#states");
  var userCity = $("#user-city");
  var userPassword = $('#user-password');
  var userConfrimPassword = $('#user-confirm-password');

  userPhoto.on('change',function(e){

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = function (element) {
      $('.btn-circle').css({'background-image':`url('${element.target.result}')`});
    };
    
    reader.readAsDataURL(file);

  });

  $('.page-title').text(`Cadastro ${localStorage.getItem("userType")}`);

  $(".btn-confirm").on("click", function(event) {

    event.preventDefault();

    if(userPassword.val() == userConfrimPassword.val()){
      
      firebase.auth().createUserWithEmailAndPassword(userEmail.val(), userPassword.val())
      .then(function(sucess){
  
        create(
          userPhoto.val(),
          userName.val(), 
          userState.val(), 
          userCity.val()
        );
  
      }).catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        
      });

    } else{
      console.log("Senhas diferentes!");
    }

  });

  function create(foto, nome, estado, cidade) {
    let data = {
      foto: foto,
      nome: nome,
      estado: estado,
      cidade: cidade
    };
    return firebase
      .database()
      .ref()
      .child("Usuarios")
      .push(data);
  }

});

//   firebase
//     .database()
//     .ref("Usuarios")
//     .on("value", function(snapshot) {
//       $(".userList").html("");

//       var lista = "<tr>";
//       lista += "<th> Nome </th>";
//       lista += "<th> Senha </th>";
//       lista += "</tr>";

//       snapshot.forEach(function(item) {
//         lista += "<tr>";
//         lista += "<td>" + item.val().nome + "</td>";
//         lista += "<td>" + item.val().senha + "</td>";
//         lista += "</tr>";
//       });

//       $(".userList").html(lista);
//     });
// 
