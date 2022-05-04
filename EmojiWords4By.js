const definitions = {
    A: "1111100111111001", B: "1110101110011111", C: "1111100010001111", D: "1110100110011111", E: "1111111010001111",
    F: "1111100011101000", G: "1111100010011111", H: "1001100111111001", I: "1111010001001111", J: "1111001000101110",
    K: "1001111010011001", L: "1000100010001111", M: "1111101110011001", N: "1001110110111001", O: "1111100110011111",
    P: "1111100111111000", Q: "1111100110101101", R: "1111100111101001", S: "1111100000011111", T: "1111010001000100",
    U: "1001100110011111", V: "1001100110100110", W: "1001100110111111", X: "1001011001101001", Y: "1001111100011111",
    Z: "1111001001001111", 1: "0110111001101111", 2: "1111001110001111", 3: "1111011000111111", 4: "1011111100110011",
    5: "1111110000111110", 6: "1000111110111111", 7: "1111001101100100", 8: "0111110110111111", 9: "1111101111110011",
    0: "1111101110111111",
}

const args = process.argv.slice(2);
if(args[0] == undefined || args[1] == undefined || args[2] == undefined){
    console.log("Usage: node convert.js [text] [blank space emoji] [filler emoji]");
    process.exit(1);
}

String.prototype.replaceAll = function(match, replace) {return this.replace(new RegExp(match, 'g'), () => replace);}

function wordToSquares(word){

    let output = [args[1].repeat(5 * word.length + 3), args[1].repeat(5 * word.length + 3)];
    word = word.toUpperCase();
    for(let i = 0; i < 4; i++){
        let temp = "";
        [...word].forEach((letter, index) => {
           if(letter != " ") temp += letterToSquares(definitions[letter], i);
           else(temp += args[1].repeat(4));
           if(index != word.length - 1) temp += args[1];
        });
        output.push(args[1].repeat(2) + temp + args[1].repeat(2));
    }
    
    output.push(args[1].repeat(5 * word.length + 3));
    output.push(args[1].repeat(5 * word.length + 3));

    return output;

}

function letterToSquares(def, index){
    let defSpec = chunkString(4, def)[index];
    return defSpec.replaceAll('1', args[2]).replaceAll('0', args[1]);
}

function chunkString(nSize, strToChunk) {
    let result = [];
    let chars = String(strToChunk).split('');

    for(let i = 0; i < (String(strToChunk).length / nSize); i++) {
        result = result.concat(chars.slice(i*nSize,(i+1)*nSize).join(''));
    }
    return result
}

console.log(wordToSquares(args[0]).join("\n"));