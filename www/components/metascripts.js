function makeHead(title, exceptionsCSS){

    let head = `
    
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover">
    <title>${title}</title>

    <!-- ============== STYLES ================= -->
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="stylesheet" type="text/css" href="css/mural.css">
    <link rel="stylesheet" type="text/css" href="css/notificacoes.css">
    <link rel="stylesheet" type="text/css" href="css/cadastro.css">
    <link rel="stylesheet" type="text/css" href="css/config-tema.css">
    <link rel="stylesheet" type="text/css" href="css/config-turma.css">
    <link rel="stylesheet" type="text/css" href="css/enviar-registro.css">
    <link rel="stylesheet" type="text/css" href="css/temas.css">
    <link rel="stylesheet" type="text/css" href="css/perfil.css">
    <link rel="stylesheet" type="text/css" href="css/minha-historia.css">
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <link rel="stylesheet" type="text/css" href="css/turmas.css">
    <link rel="stylesheet" type="text/css" href="css/turma.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css">
    <link rel="stylesheet" href="css/select2.css">
    <link rel="stylesheet" href="css/select2-bootstrap.css">
    `

    if(exceptionsCSS !== undefined){
        exceptionsCSS.forEach(element => {
            head += `<link rel="stylesheet" type="text/css" href="${element}">`; 
        });
    }

    document.querySelector('head').innerHTML = head;
}