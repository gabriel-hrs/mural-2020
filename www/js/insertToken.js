$(document).ready(function() {

    // =========== CAMPOS =====================
    var token = $("#token");
    var erro = "";

    $(".send-token").on("click", function(event) {
  
      event.preventDefault();
    
        firebase
        .database()
        .ref("Tokens")
        .on("value", function(snapshot) {
    
            snapshot.forEach(function(item) {
                if(item.val().key == token.val()) {
                    localStorage.setItem("userType", item.val().tipo);
                    window.location.assign("cadastro.html");
                } else {
                    erro = "Token inválido";
                }
            });

            if(erro !== "") {
                alert(erro);
                erro = "";
            }
        
        });
    });
}); 