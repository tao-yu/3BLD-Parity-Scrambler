
scramblers['333'].initialize(null, Math);

var myStorage = window.localStorage;

if (myStorage.getItem("amount") == null){
    document.getElementById("amount").value = 50;
} else {
    document.getElementById("amount").value = parseInt(myStorage.getItem("amount"));
}
function get333scramble(){
    return scramblers["333"].getRandomScramble();
}



function parity(scramble){
    var qtm = alg.cube.countMoves(scramble, {metric:"obqtm"})
    return qtm % 2 == 0? false : true;
}

function changeParity(scramble){
    scramble = scramble.trim();
    
    switch (scramble[scramble.length - 1]){
        case "'":
            return scramble.substring(0, scramble.length-1) + "2";
        case "2":
            return scramble.substring(0, scramble.length-1);
        default:
            return scramble + "2";
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
                else {
                    scrambles.push(changeParity(scramble))
                }
            }
        case 'forceNoParity':
            while (scrambles.length < amount){
                var scramble = get333scramble();
                if (!parity(scramble)){
                    scrambles.push(scramble);
                    
                } 
                else {
                    scrambles.push(changeParity(scramble))
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
        case 'cornersOnlyUFUR':
            while (scrambles.length < amount){
                var scramble = scramblers["333"].getCornerScramble();
                var x = Math.round(Math.random());
                if (x){
                    scramble += "U R U R' U R U2 R'";
                    scramble = obfusticate(scramble);
                    scrambles.push(scramble);
                } else {
                    scrambles.push(scramble);
                }
            }
        case 'edgesOnlyUFRUBR':
            while (scrambles.length < amount){
                var scramble = scramblers["333"].getEdgeScramble();
                var x = Math.round(Math.random());
                if (x){
                    scramble += "R U2 R' U' R U2 L' U R' U' L";
                    scramble = obfusticate(scramble);
                    scrambles.push(scramble);
                } else {
                    scrambles.push(scramble);
                }
            }
    }
    return scrambles;
}

function displayScrambles(){
    
    var amount = parseInt(document.getElementById("amount").value);
    var e = document.getElementById("mode");
    if (e.selectedIndex == -1){
        alert("Please select a scramble mode");
        return;
    }
    var mode = e.options[e.selectedIndex].value;
    
    var scrambles = generateScrambles(amount, mode).join("\n");
    
    var textArea = document.getElementById("scrambles");
    
    textArea.value = scrambles;
    selectScrambles()
    
}

function selectScrambles(){
    var textArea = document.getElementById("scrambles");
    textArea.focus();
    textArea.select();
    
}

function logParities(){
    var scrambles = document.getElementById("scrambles").value.split("\n");
    var i = 0
    for(; i < scrambles.length; i++){
        console.log(parity(scrambles[i]))
    }
}