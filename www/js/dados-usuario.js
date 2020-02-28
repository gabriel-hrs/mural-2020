/* Definir um observador do estado de autenticação e coletar dados do usuário.

Observação:
Deve ser carregado em toda página que exibir dados do usuário. */
firebase.auth().onAuthStateChanged( function( user ) {
    if ( user ) {
        var uid = user.uid;
        var nome = user.nome;
        var email = user.email;
        var foto = user.foto;
        var tipo = user.tipo;
        var uid = user.uid;
        var estado = user.estado;
        var cidade = user.cidade;
    } else {
        alert( 'Faça o login' );
        window.location.assign( 'index.html' );
    }
});