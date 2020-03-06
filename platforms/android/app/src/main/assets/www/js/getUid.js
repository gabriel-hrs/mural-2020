/* Pegar todos os uid's */
window.getUid = function(){
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            let uidList = [];
            firebase.database().ref("Usuarios").on("value", function(snapshot) {
                snapshot.forEach( function( item ) {
                    if( item.val() != "" ) {
                        uid = item.val();
                        uidList.push(uid);
                        uid++;
                    }
                });
                return uidList;
            });
            console.log(uidList);
        }
    });
};

/* Chamar globalmente a função */
// window.getUid();