let triangle, square, circle;
let round = 1;
let available_queries = 3;
let total_queries = 0;

const letter2column = {"A":5, "B":6, "C":7, "D":8, "E":9, "F":10};

import { verifiers } from "./assets/level1/verifiers.js"

//unmute lock button when all radio buttons are selected
$(".number-list input[type=radio]").change( () => {
    if($("input[name=valTriangle]:checked").val()!=undefined 
        && $("input[name=valSquare]:checked").val()!=undefined
        && $("input[name=valCircle]:checked").val()!=undefined) 
    {
        $("#lock").removeClass("muted")
    }
});

function update_round() {
    $("#query-counter").text(`Questões restantes: ${available_queries}`);
    if(available_queries == 3) {
        $("#end-round").removeClass("primary").addClass("muted");
        $(".img-card").each(function() {
            $(this).removeClass("muted show-yes show-no");
        });
    }
    else if(available_queries == 2 || available_queries == 1) {
        $("#end-round").removeClass("muted");
    } else if(available_queries == 0) {
        $("#end-round").addClass("primary");
        $(".img-card").each(function() {
            if(!$(this).is('.show-yes, .show-no')){
                $(this).addClass('muted');
            }
        });
    }
}

//lock code
$("#lock").click( () => {
    //lock all uncheck radio buttons
    $(".number-list input[type=radio]").each(function(){
        if(!this.checked){
            this.disabled = true;
        } else {
            $(this).addClass("locked")
        }
    })
    $("#lock").addClass("muted locked")

    //unmute verifiers
    $(".img-card").each( function(){
        $(this).removeClass("muted");
    })

    //put code in table
    triangle = Number($("input[name=valTriangle]:checked").val());
    square = Number($("input[name=valSquare]:checked").val());
    circle = Number($("input[name=valCircle]:checked").val());

    $("#resultsTable tbody tr:last td:nth-child(2)").text(triangle);
    $("#resultsTable tbody tr:last td:nth-child(3)").text(square);
    $("#resultsTable tbody tr:last td:nth-child(4)").text(circle);
});

//click verifier
$(".img-card").click( function(e) {
    // if it isn't disabled - stupid safari bug
    if($(this).is('.show-yes, .show-no, .muted')){
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
    }

    // else
    let ver = $(this).data('verifier');
    if(verifiers[ver](triangle, square, circle)){
        $(this).addClass("show-yes");
        $(`#resultsTable tbody tr:last td:nth-child(${letter2column[ver]})`).html('<img src="assets/yes.png" class="icon"></img>');
    } else {
        $(this).addClass("show-no");
        $(`#resultsTable tbody tr:last td:nth-child(${letter2column[ver]})`).html('<img src="assets/no.png" class="icon"></img>');
    }
    total_queries++;
    available_queries--;
    update_round();
});

// next round
$("#end-round").click(function() {
    round++;
    $("#round-counter").text(`Ronda ${round}`);
    available_queries = 3;
    update_round();
    $('#resultsTable tr:last').after(`<tr><td>Ronda ${round}` + '<td></td>'.repeat(9)); //TODO replace with number of verifiers
    // unlock code
    $("#lock").removeClass("locked");
    $(".number-list input[type=radio]").each(function(){
        $(this).removeClass("locked");
        this.disabled = false;
        this.checked = false;
    })

});

// TODO: for results, if available_queries == 3, then round = round - 1