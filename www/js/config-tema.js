$(document).ready(function() {

    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            objImagem = "";
            nomeImagem = "";

            /* Função de cadastro de tema */
            $( "#imagem" ).change(function(){
                $( ".perfil" ).removeClass("default-photo");
            });
            
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
            });
        }
    });   
});