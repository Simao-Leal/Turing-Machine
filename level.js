let triangle, square, circle;
let round = 1;
let available_queries = 3;
let total_queries = 0;
let submited = false;

const letter2column = {"A":5, "B":6, "C":7, "D":8, "E":9, "F":10};

const params = new URLSearchParams(window.location.search);
const level_number = params.get('number');

// Source - https://stackoverflow.com/a
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-18, License - CC BY-SA 4.0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// I cannot, for the life of me, understand how this works. Thanks GPT!
const url = new URL(`./assets/level${level_number}/info.json`, import.meta.url);
const info = await (await fetch(url)).json();
const no_verifiers = info.number_of_verifiers;

const dir = `./assets/level${level_number}/verifiers.js`;

let verifiers = await import(dir);

// load
$("#results-dialog").hide();

$("#title").text(`Nível ${level_number}`);

["A", "B", "C", "D", "E", "F"].slice(0, no_verifiers).forEach( verifier => {
    $("#imageGrid").append(
        `
        <label class="img-card muted" data-verifier="${verifier}">
                <span class="tag">${verifier}</span>
                <img src="assets/level${level_number}/${verifier}.png">
                <img class="badge badge--yes" src="assets/yes.png">
                <img class="badge badge--no" src="assets/no.png">
        </label>
        `
    );
    $("#resultsTable thead tr").append(`<th>${verifier}</th>`);
    $('#resultsTable tbody').html('<tr><td>Ronda 1' + '<td></td>'.repeat(3 + no_verifiers)+'</tr>');
});

//unmute lock button when all radio buttons are selected
$(".panel .number-list input[type=radio]").change( () => {
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
            $(this).removeClass("show-yes show-no").addClass("muted");
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
    $(".panel .number-list input[type=radio]").each(function(){
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
    $('#resultsTable tr:last').after(`<tr><td>Ronda ${round}` + '<td></td>'.repeat(3 + no_verifiers) + '</tr>');
    // unlock code
    $("#lock").removeClass("locked");
    $(".number-list input[type=radio]").each(function(){
        $(this).removeClass("locked");
        this.disabled = false;
        this.checked = false;
    })

});

// TODO: for results, if available_queries == 3, then round = round - 1


const overlay = document.getElementById('solution-overlay');
const openBtn = document.getElementById('solutionBtn');
const form    = document.getElementById('solutionForm');
const input   = document.getElementById('solutionInput');
const cancel  = document.getElementById('solCancel');

function lockScroll() {
  const doc = document.documentElement;
  const scrollBar = window.innerWidth - doc.clientWidth; // scrollbar width
  doc.style.overflow = 'hidden';
  if (scrollBar > 0) doc.style.paddingRight = scrollBar + 'px';
}
function unlockScroll() {
  const doc = document.documentElement;
  doc.style.overflow = '';
  doc.style.paddingRight = '';
}


function openOverlay() {
overlay.hidden = false;
// lock background scroll (optional)
document.documentElement.style.overflow = 'hidden';
lockScroll();
}
function closeOverlay() {
if(submited) return; //can't close overlay if the solution has been submitted
overlay.hidden = true;
document.documentElement.style.overflow = '';
unlockScroll();
}

// open
openBtn?.addEventListener('click', (e) => {
// if you're using muted/aria-disabled, guard:
if (openBtn.matches('.muted, [aria-disabled="true"]')) return;
e.preventDefault();
openOverlay();
});


// cancel / backdrop click / ESC
cancel?.addEventListener('click', closeOverlay);
overlay?.addEventListener('click', (e) => {
if (e.target === overlay) closeOverlay(); // backdrop
});
document.addEventListener('keydown', (e) => {
if (!overlay.hidden && e.key === 'Escape') closeOverlay();
});

// unlock button when all radios are selected
$("#solution-overlay .number-list input[type=radio]").change( () => {
    if($("input[name=sol-valTriangle]:checked").val()!=undefined 
        && $("input[name=sol-valSquare]:checked").val()!=undefined
        && $("input[name=sol-valCircle]:checked").val()!=undefined) 
    {
        $("#submit").removeClass("muted")
    }
});

// submit
$("#submit").click(async function() {
    submited = true;
    $('#go-back').hide();
    $('#final-results').hide();
    // load layout
    ["A", "B", "C", "D", "E", "F"].slice(0, no_verifiers).forEach( verifier => {
        $("#final-results-table thead tr").append(`<th>${verifier}</th>`);
        $('#final-results-table tbody').html('<tr>' + '<td><div class="loader icon"></div></td>'.repeat(no_verifiers) + '</tr>');
    });


    $("#solution-dialog").hide();
    $("#results-dialog").show();

    triangle = Number($("input[name=sol-valTriangle]:checked").val());
    $('#result-triangle').text(triangle);
    square = Number($("input[name=sol-valSquare]:checked").val());
    $('#result-square').text(square);
    circle = Number($("input[name=sol-valCircle]:checked").val());
    $('#result-circle').text(circle);

    let allTrue = true;
    for (const [i, ver] of ["A", "B", "C", "D", "E", "F"].slice(0, no_verifiers).entries()) {
        await sleep(750);
        let thisVerifier = verifiers[ver](triangle, square, circle);
        allTrue = allTrue && thisVerifier;
        if(thisVerifier){
            $(`#final-results-table tbody tr td:nth-child(${i + 1})`).html('<img src="assets/yes.png" class="icon"></img>');
        } else {
            $(`#final-results-table tbody tr td:nth-child(${i + 1})`).html('<img src="assets/no.png" class="icon"></img>');
        }
    }
    if(allTrue){
        $('#level-result').html('<img src="assets/yes.png" class="big"></img>');
        if(available_queries == 3) round--;
        $('#final-results p').text(`Rondas: ${round} | Questões: ${total_queries}`)
        $('#final-results').show();
    } else {
        $('#level-result').html('<img src="assets/no.png" class="big"></img>');
    }
    $('#go-back').show();
});

$('#go-back').click( () => {
    document.location.href = 'index.html';
});