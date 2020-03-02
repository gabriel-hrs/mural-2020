$(document).ready(function() {

    /* Tabs de Login e Cadastro */
    $( "#cadastro" ).on( "click" , function() {
        $( ".slide-tab" ).toggleClass( "active" );
        $( "#slide-cadastro" ).toggleClass( "active" );
        $( "#slide-login" ).toggleClass( "active" );
    });

    $( "#login" ).on( "click", function() {
        $( ".slide-tab" ).toggleClass( "active" );
        $( "#slide-cadastro" ).toggleClass( "active" );
        $( "#slide-login" ).toggleClass( "active" );
    });

    $( ".login-tab" ).on( "click", function() {
        $( ".slide-tab" ).toggleClass( "active" );
        $( "#slide-cadastro" ).toggleClass( "active" );
        $( "#slide-login" ).toggleClass( "active" );
    });

    /* Função de Login */
    var email = $( "#email" );
    var senha = $( "#senha" );

    $( ".enter-login" ).on( "click", function( event ) {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword( email.val(), senha.val() ).then( function() {
            alert( "Login realizado com sucesso!" );
            window.location = "mural.html";
        }).catch( function( error ) {
            var errorCode = error.code; 
            var errorMessage = error.message; 
            if ( errorCode === "auth/wrong-password" ) { 
                alert( "Senha incorreta." );
            } else { 
                alert( errorMessage ); 
            } 
        });
    });

    /* Função de Token */
    var token = $( "#token" );
    var error = "";

    $( ".send-token" ).on( "click", function( event ) {
      event.preventDefault();
    
        firebase.database().ref( "Tokens" ).on( "value", function( snapshot ) {
            snapshot.forEach( function( item ) {
                if( item.val().key == token.val() ) {
                    localStorage.setItem( "userType", item.val().tipo );
                    window.location.assign( "cadastro.html" );
                } else {
                    error = "Token inválido";
                }
            });

            if(error !== "") {
                alert(error);
                error = "";
            }
        });
    });
});