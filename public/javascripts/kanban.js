var Console = function() {
    var c = $("#console");
    var log = function(msg) {
      c.append("<br/><strong>"+msg+"</strong>");
    };
    return {
        log: log
    }
}();

$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {
    Console.log("textStatus : " + textStatus);
    Console.log("errorThrown : " + errorThrown);
    Console.log("responseText : " + XMLHttpRequest.responseText);
}});

var Kanbanlacho = function() {

    var kanban_board = $("#kanban");

    var criar_quadro = function(feature) {
        kanban_board.append(
             $('<div></div>').attr("id", feature.status).addClass("quadro")
        );
    };
    var adicionar_no_quadro = function(quadro, feature) {
        quadro.append(
            $('<div></div>').attr("id", feature.id).text(feature.title).addClass(feature.status)
        );
    };

    var montar_quadro = function(feature) {
        var quadro = $("#"+feature.status);
        if(quadro.length == 0) {
            criar_quadro(feature);
            quadro = $("#"+feature.status);
        }
        adicionar_no_quadro(quadro, feature);

    };

    var montar_kanban = function() {
        var kanban_id = $(this).val();
        $.getJSON('projects/'+kanban_id+'/features.json', function(json) {
            kanban_board.html("");
            $.each(json, function(i,item){
                montar_quadro(item.feature);
            });
        });
    };

    var escolher_projetos = function() {
        $.getJSON('projects.json', function(json) {
            $.each(json, function(i,item){
                $('#projects').append(
                    $('<option></option>').val(item.project.id).html(item.project.name).click(montar_kanban)
                );
            });
        });
    };

    return {
        escolher_projetos: escolher_projetos
    };
}();

$(function(){
    Kanbanlacho.escolher_projetos();
});

