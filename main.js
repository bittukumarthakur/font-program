const fs = require("fs");

const textFile = fs.readFileSync("font.txt", "utf-8");
const lines = textFile.trim().split("\n");
const fontWidth = lines[0];
const fontHeight = lines[1];
const sentence = lines[2];
const font = lines.slice(3);

const chunk = function (line, size) {
    const chunk = [];
    let startIndex = 0;
    let endIndex = size;

    for (let index = 0; index < line.length / size; index++) {
        chunk.push(line.slice(startIndex, endIndex))
        startIndex += size
        endIndex += size;
    }
    return chunk;
}

const getCharCode = function (char) {
    const alphatbetCode = {
        a: 0, b: 1, c: 2, d: 3, e: 4,
        f: 5, g: 6, h: 7, i: 8, j: 9,
        k: 10, l: 11, m: 12, n: 13, o: 14,
        p: 15, q: 16, r: 17, s: 18, t: 19,
        u: 20, v: 21, w: 22, x: 23, y: 24,
        z: 25
    };

    return alphatbetCode[char];
}

const aToz = font.map(function (line,) {
    return chunk(line, 4);
});

const getChar = function (char) {
    const styleChar = [];
    const code = getCharCode(char);
    styleChar.push(aToz[0][code])
    styleChar.push(aToz[1][code])
    styleChar.push(aToz[2][code])
    styleChar.push(aToz[3][code])
    styleChar.push(aToz[4][code])

    return styleChar;
};

// myjoin([[1,2], [3,4]]) ==> [[1,3], [2,4]]
// myjoin([[1,2,3], [1,2,3]]) ==> [[1,1], [2,2], [3,3]]

const mapper = function (array) {
    const result = [];

    for (let index = 0; index < array[0].length; index++) {
        const currentElement = array[index];
        // const tempChar = [];
        let tempChar = "";

        for (let b = 0; b < array.length; b++) {
            // tempChar.push(array[b][index]);
            tempChar += array[b][index];
        }

        result.push(tempChar);
    }
    return result;
};

const main = function () {
    const word = process.argv[2];

    const styleName = word.split("").map(function (char) {
        return getChar(char);
    });

    return mapper(styleName).join("\n");
}

console.log(main());