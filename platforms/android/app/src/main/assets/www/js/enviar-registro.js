jQuery(document).ready(function($) {

  /* Campo do tipo Select2 para Fonte do registro */
  // $( "#fonte-link" ).select2({
  //     theme: "bootstrap"
  // });
  
  if($("#temas option").val() && $("#fonte-link option").val() && $("#resumo").val() !== ""){      
    $("#nextBtn").addClass("btn-orange");    
  } 

  let registro_fonte = localStorage.getItem( "fonteRegistro" );

  console.log(registro_fonte);

  if( registro_fonte !== null ) {
    $("#fonte-text").css("display", "none");
    $("#fonte-link").css("display", "inline");
    $("#fonte-link").val(registro_fonte);
  }

  $( "#escola-aluno" ).click( function() {
    alert("O campo exibe automaticamente a escola do aluno.");
  });

  $( "#serie-aluno" ).click( function() {
    alert("O campo exibe automaticamente a série do aluno.");
  });

  /* Select de temas */
  firebase.database().ref("Temas").on("value", function(snapshot) {
    $(".tab .select-field").html("");
    
    var temas = "<select class='form-control' id='temas'>";
    temas += "<option class='option-select' value='' placeholder='#tema' selected>Selecione um #tema</option>";
   
    snapshot.forEach(function( tema ) {
      temas += `<option class='option-select' value='${tema.val().nome}'>#${tema.val().nome}</option>`;
    });
    
    temas += "</select>";
    $(".tab .select-field").html(temas);
  });

  /* Autocomplete de série e escola */
  firebase.auth().onAuthStateChanged( function( user ) {
    if ( user ) {
      var uid = user.uid;
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var sendImage = $( "#formato-imagem" );
      var image = "";
      var imageName = "";
      var nomeAluno = localStorage.getItem("nome");
      var imagemAluno = localStorage.getItem("imagem");
      var tipo = localStorage.getItem("userType");
      var urlAluno = localStorage.getItem("url");

      sendImage.on('change',function(e){
        let file = e.target.files[0];

        let reader = new FileReader();
        reader.onload = function() {
          $('#formato-imagem').css("background-color: #E83F3C;");
        };
        reader.readAsDataURL(file);

        image = file;
        imageName = file.name;
      });  

      $("#fonte-text").on('change',function(){
        console.log( $(this).val() );
      });

      console.log( localStorage.getItem( "url" ) );
      console.log( localStorage.getItem( "imagem" ) );
      console.log( localStorage.getItem( "nome" ) );

      firebase.database().ref("Usuarios").on("value", function(snapshot) {       
        snapshot.forEach(function( item ) {
          if( item.val().uid == uid ) {
            $("#serie-aluno").val(item.val().serie);
            $("#serie-aluno").attr("placeholder", item.val().serie);

            $("#escola-aluno").val(item.val().escola);
            $("#escola-aluno").attr("placeholder", item.val().escola);
          }
        });
      });
            
      /* Validação do Multi Step Form */
      var currentTab = 0; 
      showTab(currentTab);

      function showTab(n) {
        $(".tab").eq(n).css({
          "display": "block"
        });
        
        if (n == 0) {
          $("#prevBtn").css({
            "display": "none"
          });
        } else {
          $("#prevBtn").css({
            "display": "inline"
          });
        }
      }

      $("#prevBtn").on("click", function(){
        nextPrev(-1);
      });

      $("#nextBtn").on("click", function(){
        nextPrev(1);
      });

      function nextPrev(n) {
        var x = $(".tab");

        if ( n == 1 && !validateForm() ) {
          return false;
        }
        
        x.eq(currentTab).css({
          "display": "none"
        });

        currentTab = currentTab + n;
        
        if (currentTab >= x.length) {
          sendRegistro();
        }
        
        showTab(currentTab);
      }

      function validateForm() {
        var x, y, i, valid = true;
        x = $(".tab");
        y = x.eq(currentTab).find(".form-control");
        
        for (i = 0; i < y.length; i++) {
          
          if ( y.eq(i).value == "" ) {
            y.eq(i).addClass("invalid");
            valid = false;
          } else {
            y.eq(i).addClass("finish");
            valid = true;
          }
        }
        
        if (valid) {
          $(".btn-confirm").eq(currentTab).addClass("btn-orange");
        }
        return valid;
      }

     function sendRegistro() {
        let setStorage = firebase.storage().ref( `${firebase.auth().currentUser.uid}/Registros/${imageName}` ).put( image ); // Guardar no LocalStorage a foto do usuário
          setStorage.on( "state_changed",
          function ProgressEvent( snapshot ) {
            var porcentagem = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
            alert(`${porcentagem}%`);
          },
          function error( error ) {
            console.log( error );
          },
          function complete() {   
            console.log($( "#fonte-text" ).val());         
            storageRef.child( `${firebase.auth().currentUser.uid}/Registros/${imageName}` ).getDownloadURL().then( function( url ) {
              let data_registro = {
                uid: firebase.auth().currentUser.uid,
                nome_aluno: localStorage.getItem( "nome" ),
                imagem_aluno: localStorage.getItem( "imagem" ),
                url_aluno: localStorage.getItem( "url" ),
                imagem: imageName,
                url: url,
                tema: $( "#temas option:selected" ).val(),
                resumo: $( "#resumo-registro" ).val(),
                serie: $("#serie-aluno").val(),
                escola: $("#escola-aluno").val(),
                // fonte: $( "#fonte-text" ).val(),
                status: 'enviado'
              };

              let data_imagem = {
                imagem: imageName,
                url: url
              };

              let data_notificacao = {
                uid: firebase.auth().currentUser.uid,
                imagem: localStorage.getItem( "imagem" ),
                url: localStorage.getItem( "url" ),
                nome: localStorage.getItem( "nome" ),
                nome_turma: $( "#escola-aluno" ).val(),
                mensagem: ' enviou um novo registro. Esperando por avaliação do professor.',
                status: 'enviado',
                tipo: tipo,
                data: Date.now()
              };

              firebase.database().ref().child( "Notificações/Professor/" + firebase.auth().currentUser.uid ).set( data_notificacao );            
              firebase.database().ref().child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Registros" ).set( data_imagem );
              firebase.database().ref().child( "Registros/" + data_registro.serie + "/" + firebase.auth().currentUser.uid ).set( data_registro ).then( function() {
                console.log( "Upload realizado com sucesso!" );
                window.location.assign( "mural.html" );
              });
            });
          });
      }
    }
  });
});