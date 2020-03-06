$(document).ready(function() {
  
  /* Função de Cadastro */
  var userPhoto = $( "#photo" );
  var userName = $( "#user" );
  var userEmail = $( "#email" );
  var userPassword = $( "#user-password" );
  var userConfirmPassword = $( "#user-confirm-password" );
  var storage = firebase.storage();
  var storageRef = storage.ref();

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

  $( ".page-title" ).text( `Cadastro ${localStorage.getItem( "userType" )}` ); // Exibir do LocalStorage o tipo de usuário no título da página

  /* Exibir cidade e estado de acordo com os dados do token */
  $("#user-city").val(localStorage.getItem( "cidadeTurma" ));
  $("#user-city").attr("placeholder", localStorage.getItem( "cidadeTurma" ));
  console.log(localStorage.getItem( "estadoTurma" ));
  $("#states").find(".estado").each(function(){
    if( $(this).val() == localStorage.getItem( "estadoTurma" )) {
      $(this).prop('selected', true);
    }
  });

  /* Cadastrar novo usuário */
  $( ".btn-confirm" ).on( "click", function( event ) {
    event.preventDefault();

    if( userPassword.val() == userConfirmPassword.val() ){
      firebase.auth().createUserWithEmailAndPassword( userEmail.val(), userPassword.val() ).then( function( sucess ){
      
        let setStorage = firebase.storage().ref( `${firebase.auth().currentUser.uid}/Perfil/${imageName}` ).put( image ); // Guardar no LocalStorage a foto do usuário

        setStorage.on( "state_changed",
        function ProgressEvent( snapshot ) {
          var porcentagem = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
          alert(`${porcentagem}%`);
        },
        function error( error ) {
        console.log( error );
        },
        function complete() { 
          storageRef.child( `${firebase.auth().currentUser.uid}/Perfil/${imageName}` ).getDownloadURL().then( function( url ) {
            localStorage.setItem( "nome", userName.val() );
            localStorage.setItem( "imagem", imageName );
            localStorage.setItem( "url", url );

            let data_user = {
              uid: firebase.auth().currentUser.uid,
              nome: userName.val(),
              email: userEmail.val(), 
              estado: localStorage.getItem( "estadoTurma" ),
              cidade: localStorage.getItem( "cidadeTurma" ),
              tipo: localStorage.getItem("userType"),
              escola: localStorage.getItem("escolaTurma"),
              serie: localStorage.getItem("serieTurma"),
            };

            let data_foto = {
              foto_perfil: imageName,
              url: url
            };

            firebase.database().ref().child("Usuarios/" + firebase.auth().currentUser.uid ).set( data_user );
            firebase.database().ref().child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Perfil" ).set( data_foto ).then( function() {
              alert( "Upload realizado com sucesso!" );
              window.location.assign( "mural.html" );
            });
          });
        });
      }).catch( function( error ) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    } else {
      console.log( "Senhas diferentes!" );
    }
  });
});