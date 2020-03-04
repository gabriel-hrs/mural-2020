$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            
            firebase.database().ref( "Usuarios" ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if( item.val().uid == uid ) {
                        localStorage.setItem( "userType", item.val().tipo );
                        console.log(localStorage.getItem( "userType" ));
                    }

                    if ( localStorage.getItem( "userType" ) == "professor" ) {
                        $(".menu-bar a[href$='minha-historia.html").parent().css('display', 'none');
                        $(".menu-bar a[href$='turmas.html']").parent().css('display','block');

                        $(".menu-bar .add-registro").css('display', 'none');
                        $(".menu-bar #btn-toggle").parent().css('display', 'block');
                    } else {
                        $(".menu-bar a[href$='turmas.html']").parent().css('display','none');
                        $(".menu-bar a[href$='minha-historia.html']").parent().css('display','block');

                        $(".menu-bar .add-registro").css('display', 'flex');
                        $(".menu-bar #btn-toggle").parent().css('display', 'none');
                    }
                });
            }); 
        }
    });
});