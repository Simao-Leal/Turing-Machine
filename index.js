let params = new URLSearchParams(window.location.search);
const number_of_levels = 5;

let global_solved = 0;
let global_rounds = 0;
let global_queries = 0;

for(let n = 1; n <= number_of_levels; n++){
    if(params.has(`lvl${n}`)){
        let [solved, rounds, queries] = params.get(`lvl${n}`).split(",");
        $('#level-list').append(`<a class="btn muted level-selector"><span>Nível ${n}</span><span class="btn-results"><img src="assets/${solved=='y' ? 'yes' : 'no'}.png" class="icon"></img>${solved=='y' ? `<span>Rondas: ${rounds} | Questões: ${queries}</span>` : ''}</span></a>`);
        if(solved == 'y'){
            global_solved++;
            global_rounds += Number(rounds);
            global_queries += Number(queries);
        }
    } else {
        params.set('number', n);
         $('#level-list').append(`<a class="btn arrow level-selector" href="./level.html?${params.toString()}"><span>Nível ${n}</span></a>`);
    }
}
$('#global-solved').text(global_solved);
$('#global-rounds').text(global_rounds);
$('#global-queries').text(global_queries);