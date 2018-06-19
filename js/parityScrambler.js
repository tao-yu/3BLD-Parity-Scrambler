
scramblers["333"].initialize()
function get333scramble(){
    return scramblers["333"].getRandomScramble().scramble_string;
}

function parity(scramble){
    var qtm = alg.cube.countMoves(scramble, {metric:"obqtm"})
    return qtm % 2 == 0? false : true;
}

function changeParity(scramble){
    scramble = scramble.trim();
    
    switch (scramble[scramble.length - 1]){
        case "'":
        case "2":
            return scramble.substring(0, scramble.length-1);
        default:
            return scramble + "'";
    }
}

function generateScrambles(amount, mode){
    var textArea = document.getElementById("scrambles").value;
    var scrambles = [];
    switch (mode){
        case 'forceParity':
            while (scrambles.length < amount){
                var scramble = get333scramble();
                if (parity(scramble)){
                    scrambles.push(scramble);
                }
                
            }
        case 'forceNoParity':
            while (scrambles.length < amount){
                var scramble = get333scramble();
                if (!parity(scramble)){
                    scrambles.push(scramble);
                    
                }
            }
        case 'indicate':
            while (scrambles.length < amount){
                var scramble = get333scramble();
                if (parity(scramble)){
                    scrambles.push("(p) " + scramble);
                }
                else {
                    scrambles.push("(np) " + scramble);
                }
            }
    }
    return scrambles;
}

function displayScrambles(){
    var amount = parseInt(document.getElementById("amount").value);
    var e = document.getElementById("mode");
    var mode = e.options[e.selectedIndex].value;
    
    var scrambles = generateScrambles(amount, mode).join("\n");
    
    var textArea = document.getElementById("scrambles");
    textArea.value = scrambles;
    textArea.focus()
    textArea.setSelectionRange(0, scrambles.length)
    
}