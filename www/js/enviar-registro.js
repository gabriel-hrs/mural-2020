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
      temas += `<option class='option-select' value=#${tema.val().nome}>#${tema.val().nome}</option>`;
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
      var nomeAluno = localStorage.getItem("nomeAluno");
      console.log(nomeAluno);
      var imagemAluno = localStorage.getItem("imagemALuno");
      var tipo = localStorage.getItem("userType");
      // var urlAluno = user.Imagens.Perfil.url_foto_perfil;

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

      $( "#nextBtn" ).on( "click", function( novoTema ) {
        novoTema.preventDefault();
        var clicks = $(this).data('clicks');
        
        if (clicks) {        
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
            storageRef.child( `${firebase.auth().currentUser.uid}/Registros/${imageName}` ).getDownloadURL().then( function( url ) {
              let data_registro = {
                uid: firebase.auth().currentUser.uid,
                nome_aluno: nameUser,
                imagem: imageName,
                url_imagem: url,
                nome_turma: $( "#escola" ).val(),
                tema: $( "#temas option:selected" ).val(),
                resumo: $( "#descricao-tema" ).val(),
                serie: $("#serie-aluno").val(),
                escola: $("#escola-aluno").val(),
                fonte: $( "#fonte-link option:selected" ).val(),
                status: 'enviado'
              };

              let data_imagem = {
                imagem: imageName,
                url_imagem: url
              };

              let data_notificacao = {
                uid: firebase.auth().currentUser.uid,
                imagem: imagemAluno,
                // url_imagem_aluno: urlAluno,
                nome_aluno: nomeAluno,
                nome_turma: $( "#escola" ).val(),
                mensagem: ' enviou um novo registro. Esperando por avaliação do professor.',
                status: 'enviado',
                tipo: tipo,
                data: firebase.database.ServerValue.TIMESTAMP
              };

              firebase.database().ref().child( "Notificações/Professor" + data_notificacao.uid ).set( data_notificacao );            
              firebase.database().ref().child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Registros" ).set( data_imagem );
              firebase.database().ref().child( "Registros/" + data_registro.serie + "/" + data_registro.uid ).set( data_registro ).then( function() {
                console.log( "Upload realizado com sucesso!" );
                document.getElementById("regForm").submit();
                window.location.assign( "mural.html" );
              });
            });
          });
        }
        $(this).data("clicks", !clicks);
      });
    }
  });
});

/* Validação do Multi Step Form */
var currentTab = 0; 
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");

  if (n == 1 && !validateForm()) return false;
  
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  
  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("form-control");
  
  for (i = 0; i < y.length; i++) {
    
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    } else {
      y[i].className += " finish";
      valid = true;
    }
  }
  
  if (valid) {
    document.getElementsByClassName("btn-confirm")[currentTab].className += " btn-orange";
  }
  return valid;
}