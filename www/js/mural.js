$(document).ready(function() {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var db = firebase.database();
    var uid = firebase.auth().currentUser.uid;
    // console.log(firebase.auth().currentUser);

    var image_name = "";

    db.ref('Usuarios').child(uid).on('value', function(snapshot) {
        snapshot.forEach(function(item) {
            image_name = item.val().imagem_perfil;
            // console.log(image_name);
            // console.log(snapshot.val());
            // localStorage.setItem("imagem", image_name);
        });
    });
    
    storageRef.child(`${uid}/${image_name}`).getDownloadURL().then(function(downloadUrl){
        $("#top-bar .btn-circle").css({'background-image':`url('${downloadUrl}')`});
        // console.log(downloadUrl);
    });
});