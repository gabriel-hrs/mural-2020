jQuery(document).ready(function($) {

  /* Campo do tipo Select2 para Fonte do registro */
  // $( "#fonte-field" ).select2({
  //     theme: "bootstrap"
  // });
  
  if($("#temas option").val() && $("#fonte-field option").val() && $("#resumo").val() !== ""){      
    $("#nextBtn").addClass("btn-orange");    
  }  

  /* Select de temas */
  firebase.database().ref("Temas").on("value", function(snapshot) {
    $(".tab .select-field").html("");
    
    var temas = "<select class='form-control' id='temas'>";
    temas += "<option class='option-select' value='' placeholder='#tema' selected>#tema</option>";
   
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

      sendImage.on('change',function(e){
        let file = e.target.files[0];

        let reader = new FileReader();
        reader.onload = function (element) {
          $('#formato-imagem').css({'background-color':`#E83F3C`});
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
        storageRef.child( `${uid}/Registros/${nomeImagem}` ).getDownloadURL().then( function( url ) {
          let data_registro = {
              uid: firebase.auth().currentUser.uid,
              // nome_professor: nome,
              imagem: nomeImagem,
              url_imagem: url,
              tema: $( "#temas option:selected" ).val(),
              resumo: $( "#descricao-tema" ).val(),
              serie: $("#serie-aluno").val(),
              escola: $("#escola-aluno").val(),
              fonte: $( "#fonte-field option:selected" ).val(),
          };

          let data_imagem = {
              imagem: nomeImagem,
              url_imagem: url
          };

          firebase.database().ref().child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Registros" ).set( data_imagem );
          firebase.database().ref().child( "Registros/" + data_registro.tema ).set( data_registro ).then( function() {
            console.log( "Upload realizado com sucesso!" );
            document.getElementById("regForm").submit();
            window.location.assign( "mural.html" );
          });
        });
      });
    }
  });
});

/* Validação do Multi Step Form */
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) { // A última tab
    document.getElementById("nextBtn").innerHTML = "Enviar";
  } else {
    document.getElementById("nextBtn").innerHTML = "➝";
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("form-control");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    } else {
      y[i].className += " finish";
      valid = true;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("btn-confirm")[currentTab].className += " btn-orange";
  }
  return valid; // return the valid status
}
