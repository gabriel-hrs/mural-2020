$(document).ready(function() {

    /* Botão Switch Toggle do formulário de tema */
    // $("#toggle-check").bootstrapToggle();

    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var nome = user.nome;
            var storage = firebase.storage();
            var storageRef = storage.ref();

            /* Função de cadastro de tema */
            $( "#imagem" ).change(function(){
                $( ".perfil" ).removeClass("default-photo");
            });

            objImagem = "";
            nomeImagem = "";
            $( "#imagem" ).on('change',function(e){
                let file = e.target.files[0];
            
                let reader = new FileReader();
                reader.onload = function (element) {
                  $('.btn-circle').css({'background-image':`url('${element.target.result}')`});
                };
                reader.readAsDataURL(file);
            
                objImagem = file;
                nomeImagem = file.name;
            });

            $( ".btn-confirm" ).on( "click", function( novoTema ) {
                novoTema.preventDefault();

                let setStorage = firebase.storage().ref( `${firebase.auth().currentUser.uid}/Temas/${nomeImagem}` ).put( objImagem ); // Guardar no LocalStorage a foto do usuário
        
                setStorage.on( "state_changed",
                function ProgressEvent( snapshot ) {
                    var porcentagem = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                    alert(`${porcentagem}%`);
                },
                function error( error ) {
                    console.log( error );
                },
                function complete() { 
                    storageRef.child( `${uid}/Temas/${nomeImagem}` ).getDownloadURL().then( function( url ) {
                        let data_tema = {
                            uid: firebase.auth().currentUser.uid,
                            // nome_professor: nome,
                            imagem: nomeImagem,
                            url_imagem: url,
                            nome: $( "#nome-tema" ).val(),
                            descricao: $( "#descricao-tema" ).val()
                        };
            
                        let data_imagem = {
                            imagem: nomeImagem,
                            url_imagem: url
                        };

                        firebase.database().ref().child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Temas" ).set( data_imagem );
                        firebase.database().ref().child( "Temas/" + data_tema.nome ).set( data_tema ).then( function() {
                            console.log( "Upload realizado com sucesso!" );
                            window.location.assign( "temas.html" );
                        });
                    });
                    
                });                    

                // function sendData() {
                    
                // }

                // return sendData();
                // Para enviar os dados preciso retornar a função sendData, mas assim não redireciona a página
                // Caso tente redirecionar antes, a função não é executada pois já está em outra página
                // window.location.assign( "temas.html" );
            });
        }
    });   
});