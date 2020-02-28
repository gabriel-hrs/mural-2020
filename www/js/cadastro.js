$(document).ready(function() {
  // =========== CAMPOS =====================
  var userPhoto = $("#photo");
  var userName = $("#user");
  var userEmail = $("#email");
  var userState = $("#states");
  var userCity = $("#user-city");
  var userPassword = $('#user-password');
  var userConfrimPassword = $('#user-confirm-password');

  var image = "";
  var imageName = "";

  userPhoto.on('change',function(e){

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = function (element) {
      $('.btn-circle').css({'background-image':`url('${element.target.result}')`});
    };
    
    reader.readAsDataURL(file);

    image = file;
    imageName = file.name;

  });
  

  $('.page-title').text(`Cadastro ${localStorage.getItem("userType")}`);

  $(".btn-confirm").on("click", function(event) {

    event.preventDefault();

    if(userPassword.val() == userConfrimPassword.val()){
      
      firebase.auth().createUserWithEmailAndPassword(userEmail.val(), userPassword.val())
      .then(function(sucess){
  
        create(
          firebase.auth().currentUser.uid,
          userName.val(), 
          userState.val(), 
          userCity.val(),
          localStorage.getItem("userType"),
          userPhoto.val(),
        );

        let setStorage = firebase.storage().ref(`${firebase.auth().currentUser.uid}/${imageName}`).put(image);

        setStorage.on('state_changed',
        function ProgressEvent(snapshot){
          var percentagem = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${percentagem}%`);
        },
        function error(err){
          console.log(err);
        },
        function complete(){ 
          console.log('Upload realizado com sucesso!');
          window.location.assign("mural.html");
        });
  
      }).catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        
      });

    } else{
      console.log("Senhas diferentes!");
    }

  });

  function create(id, nome, estado, cidade, tipo, imagem_perfil) {
    let data = {
      id: id,
      nome: nome,
      estado: estado,
      cidade: cidade,
      tipo: tipo,
      imagem_perfil: imagem_perfil
    };
    return firebase
      .database()
      .ref()
      .child("Usuarios/"+firebase.auth().currentUser.uid)
      .set(data);
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
