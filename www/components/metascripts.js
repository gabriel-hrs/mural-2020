function makeHead(title, exceptionsCSS, exceptionsJS){

    let head = `
    
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover">
    <title>${title}</title>

    <!-- ============== STYLES ================= -->
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    `
    if(exceptionsCSS !== undefined){
        head += exceptionsCSS;
    }

    let scripts = `
    
    <!-- ============== SCRIPTS ================= -->
    <script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-database.js"></script>
    <script type="text/javascript" src="js/db.js"></script>
    <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="js/teste.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    
    `

    if(exceptionsJS !== undefined){
        scripts += exceptionsJS;
    }

    document.querySelector('head').innerHTML = head;
    document.querySelector('body').insertAdjacentHTML('afterEnd', scripts);
}

