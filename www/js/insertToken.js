$(document).ready(function() {

    // =========== CAMPOS =====================
    var token = $("#token");
    var erro = "";

    $(".sendToken").on("submit", function(event) {
  
      event.preventDefault();
    
        firebase
        .database()
        .ref("Tokens")
        .on("value", function(snapshot) {
    
        snapshot.forEach(function(item) {
            if(item.val().key == token.val()){
                alert("token válido do tipo: "+item.val().tipo);
            }else{
                erro = "Token inválido";
            }
        });

        if(erro !== ""){
            alert(erro);
            erro = "";
        }
       
    });
  
    });
  
    
  
  });
  
  