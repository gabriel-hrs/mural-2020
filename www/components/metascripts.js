function makeHead(title, exceptionsCSS, exceptionsJS){

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

    let scriptsList = new Array(
        {
            src:'https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'https://www.gstatic.com/firebasejs/7.8.2/firebase-auth.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'https://www.gstatic.com/firebasejs/7.8.2/firebase-database.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'https://www.gstatic.com/firebasejs/7.8.2/firebase-storage.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'js/db.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'https://code.jquery.com/jquery-3.4.1.slim.min.js',
            integrity:'sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n',
            crossorgin:'anonymous'
        },
        {
            src:'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
            integrity:'sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo',
            crossorgin:'anonymous'
        },
        {
            src:'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
            integrity:'sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6',
            crossorgin:'anonymous'
        },
        {
            src:'https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'js/toggle-menu.js',
            integrity:"none",
            crossorgin:"none"
        },
        {
            src:'js/turmas.js',
            integrity:"none",
            crossorgin:"none"
        },
    );

    if(exceptionsJS !== undefined){
        exceptionsJS.forEach(element => {
            scriptsList.push({src:element, integrity:"none", crossorgin:"none"}); 
        });
    }

    
    scriptsList.forEach(scriptObject => {
        if(scriptObject.integrity == "none"){

            script = document.createElement("SCRIPT");
            script.src = scriptObject.src;
            document.querySelector('body').appendChild(script);

        }else{

            script = document.createElement("SCRIPT");
            script.src = scriptObject.src;
            script.integrity =  scriptObject.integrity;
            script.crossOrigin = scriptObject.crossorgin;
            document.querySelector('body').appendChild(script);

        }
    });
}

    // <!-- ============== SCRIPTS ================= -->
    // <script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"></script>
    // <script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-database.js"></script>
    // <script type="text/javascript" src="js/db.js"></script>
    // <script type="text/javascript" src="js/teste.js"></script>
    // <script type="text/javascript" src="js/login.js"></script>
    // <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    // <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    // <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    // <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
