$(document).ready(function() {
  
  /* Função de Cadastro */
  var userPhoto = $( "#photo" );
  var userName = $( "#user" );
  var userEmail = $( "#email" );
  var userState = $( "#states" );
  var userCity = $( "#user-city" );
  var userPassword = $( "#user-password" );
  var userConfirmPassword = $( "#user-confirm-password" );

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

  $( ".btn-confirm" ).on( "click", function( event ) {
    event.preventDefault();

    if( userPassword.val() == userConfirmPassword.val() ){
      firebase.auth().createUserWithEmailAndPassword( userEmail.val(), userPassword.val() )
      .then( function( sucess ){
        createUser(
          firebase.auth().currentUser.uid,
          userName.val(),
          userEmail.val(), 
          userState.val(), 
          userCity.val(),
          localStorage.getItem("userType"),
          localStorage.getItem("escolaTurma"),
          localStorage.getItem("serieTurma"),
        );

        if( userPhoto !== "" ) {
          createImagesPerfil(
            imageName
          );

          if( localStorage.getItem( "userType" ) == 'professor' ) {
            localStorage.setItem( "nomeProf", userName.val() );
            localStorage.setItem( "imagemProf", imageName );
            // localStorage.setItem( "urlProf", url.val() );
          } else if ( localStorage.getItem( "userType" ) == 'aluno' ) {
            localStorage.setItem( "nomeAluno", userName.val() );
            localStorage.setItem( "imagemAluno", imageName );
            // localStorage.setItem( "urlAluno", url.val() );
          }
        
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
            alert( "Upload realizado com sucesso!" );
            window.location.assign( "mural.html" );
          });
        }
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

  function createUser( uid, nome, email, estado, cidade, tipo, escola, serie ) {
    let data = {
      uid: uid,
      nome: nome,
      email: email,
      estado: estado,
      cidade: cidade,
      tipo: tipo,
      escola: escola,
      serie: serie
    };
    return firebase
    .database()
    .ref()
    .child( "Usuarios/" + firebase.auth().currentUser.uid )
    .set( data );
  }

  function createImagesPerfil( foto_perfil ){
    let data = {
      foto_perfil: foto_perfil
    };
    return firebase
    .database()
    .ref()
    .child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Perfil" )
    .set( data );
  }
});