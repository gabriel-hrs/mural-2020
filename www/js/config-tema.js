$(document).ready(function() {

    /* Botão Switch Toggle do formulário de tema */
    // $("#toggle-check").bootstrapToggle();

    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var nome = user.nome;

            /* Função de cadastro de tema */
            $( "#imagem" ).change(function(){
                $( ".perfil" ).removeClass("default-photo");
            });

            imagem = "";
            nomeImagem = "";
            $( "#imagem" ).on('change',function(e){
                let file = e.target.files[0];
            
                let reader = new FileReader();
                reader.onload = function (element) {
                  $('.btn-circle').css({'background-image':`url('${element.target.result}')`});
                };
                reader.readAsDataURL(file);
            
                imagem = file;
                nomeImagem = file.name;
            });

            $( ".btn-confirm" ).on( "click", function( novoTema ) {
                novoTema.preventDefault();

                let data_tema = {
                    uid: firebase.auth().currentUser.uid,
                    // nome_professor: nome,
                    imagem: $( "#imagem" ).val(),
                    nome: $( "#nome-tema" ).val(),
                    descricao: $( "#descricao-tema" ).val()
                };
    
                let data_imagem = {
                    imagem: $( "#imagem" ).val()
                };

                let setStorage = firebase.storage().ref( `${firebase.auth().currentUser.uid}/Temas/${nomeImagem}` ).put( imagem ); // Guardar no LocalStorage a foto do usuário
        
                setStorage.on( "state_changed",
                function ProgressEvent( snapshot ) {
                    var porcentagem = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                    alert(`${porcentagem}%`);
                },
                function error( error ) {
                    alert( error );
                },
                function complete() { 
                    alert( "Upload realizado com sucesso!" );
                    window.location.assign( "temas.html" );
                });                    

                function sendData() {
                    firebase.database().ref().child( "Temas/" + data_tema.nome ).set( data_tema );
                    firebase.database().ref().child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Temas" ).set( data_imagem );
                }

                return sendData();
                // Para enviar os dados preciso retornar a função sendData, mas assim não redireciona a página
                // Caso tente redirecionar antes, a função não é executada pois já está em outra página
                window.location.assign( "temas.html" );
            });
        }
    });   
});