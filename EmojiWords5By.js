
const definitions = {
    A: "0111010001111111000110001", B: "1111010001111101000111110", C: "1111110000100001000011111", D: "1110010010100011001011100", E: "1111110000111001000011111",
    F: "1111110000111001000010000", G: "1111110000100111000111111", H: "1000110001111111000110001", I: "1111100100001000010011111", J: "1111100100001001010001000",
    K: "1001010100110001010010010", L: "1000010000100001000011111", M: "0101010101101011000110001", N: "1000111001101011001110001", O: "1111110001100011000111111",
    P: "1111110001111111000010000", Q: "1111110001101011001011101", R: "1111010001111101001010001", S: "1111110000111110000111111", T: "1111100100001000010000100",
    U: "1000110001100011000111111", V: "1000110001010100101000100", W: "1000110001101011010101010", X: "1000101010001000101010001", Y: "1000101010001000010000100",
    Z: "1111100010001000100011111", 1: "0010001100001000010011111", 2: "1111100001111111000011111", 3: "1111100001001110000111111", 4: "1000110001111110000100001",
    5: "1111110000111100000111110", 6: "1111110000111111000111111", 7: "1111100010001000100010000", 8: "0111010001011101000101110", 9: "1111110001111110000100001",
    0: "0111010001100011000101110", '<': "0011001100110000110000110", '>': "1100001100001100110011000", '!': "0010000100001000000000100", '?': "1111000001001100010000100",
    '"': "0011000110011000000000000", "'": "0001000010001000000000000", ':': "0010000100000000010000100", ';': "0010000100000000010001000", '(': "0011001000100000100000110",
    ')': "0110000010000010001001100", '-': "0000000000011100000000000", '_': "0000000000000000000001110", '=': "0000001110000000111000000", '+': "0000000100011100010000000",
    '[': "0111001000010000100001110", ']': "0111000010000100001001110", '|': "0010000100001000010000100", '\\': "1000001000001000001000001", '/': "0000100010001000100010000",
    '.': "0000000000000000000000100", ',': "0000000000000000010001000", '@': "0000000000000000000000000", '#': "0101011111010101111101010", "$": "1111110100111110010111111",
    "%": "1000100010001000100010001", "^": "0010001010100010000000000", "&": "0000000000000000000000000", "*": "0101000100010100000000000","`": "0100000100000000000000000",
    "~": "1010001010000000000000000"
}

const args = process.argv.slice(2);
if(args[0] == undefined || args[1] == undefined || args[2] == undefined){
    console.log("Usage: node convert.js [text] [blank space emoji] [filler emoji]");
    process.exit(1);
}

if (typeof String.prototype.replaceAll == "undefined") {  
    String.prototype.replaceAll = function(match, replace) {  
      return this.replace(new RegExp(match, 'g'), () => replace);  
    }  
  }

function wordToSquares(word){

    let output = [args[1].repeat(6 * word.length + 3), args[1].repeat(6 * word.length + 3)];
    word = word.toUpperCase();
    for(let i = 0; i < 5; i++){
        let temp = "";
        [...word].forEach((letter, index) => {
           if(letter != " ") temp += letterToSquares(definitions[letter], i);
           else(temp += args[1].repeat(5));
           if(index != word.length - 1) temp += args[1];
        });
        output.push(args[1].repeat(2) + temp + args[1].repeat(2));
    }
    
    output.push(args[1].repeat(6 * word.length + 3));
    output.push(args[1].repeat(6 * word.length + 3));

    return output;

}

function letterToSquares(def, index){
    let defSpec = chunkString(5, def)[index];
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