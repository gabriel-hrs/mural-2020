/* Tabs */
$(document).ready(function() {
    $("#alunos").on("click", function() {
        $(".slide-tab").toggleClass("active");
        $("#slide-alunos").toggleClass("active");
        $("#slide-temas").toggleClass("active");
    });

    $("#temas").on("click", function() {
        $(".slide-tab").toggleClass("active");
        $("#slide-alunos").toggleClass("active");
        $("#slide-temas").toggleClass("active");
    });

    $(".config-aluno").on("click", function() {
        $(".aluno-link").toggleClass("toggle-left");
    });
});