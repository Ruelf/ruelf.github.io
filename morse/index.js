const morse = [
   ["a", ".-"],
   ["b", "-..."],
   ["c", "-.-."],
   ["d", "-.."],
   ["e", "."],
   ["f", "..-."],
   ["g", "--."],
   ["h", "...."],
   ["i", ".."],
   ["j", ".---"],
   ["k", "-.-"],
   ["l", ".-.."],
   ["m", "--"],
   ["n", "-."],
   ["o", "---"],
   ["p", ".--."],
   ["q", "--.-"],
   ["r", ".-."],
   ["s", "..."],
   ["t", "-"],
   ["u", "..-"],
   ["v", "...-"],
   ["w", ".--"],
   ["x", "-..-"],
   ["y", "-.--"],
   ["z", "--.."],
   ["0", "-----"],
   ["1", ".----"],
   ["2", "..---"],
   ["3", "...--"],
   ["4", "....-"],
   ["5", "....."],
   ["6", "-...."],
   ["7", "--..."],
   ["8", "---.."],
   ["9", "----."],
   [".", ".-.-.-"],
   [",", "--..--"],
   ["?", "..--.."],
   ["'", ".----."],
   ["!", "-.-.--"],
   ["/", "-..-."],
   ["(", "-.--."],
   [")", "-.--.-"],
   ["&", ".-..."],
   [":", "---..."],
   [";", "-.-.-."],
   ["=", "-...-"],
   ["+", ".-.-."],
   ["-", "-....-"],
   ["_", "..--.-"],
   ["\"", ".-..-."],
   ["$", "...-..-."],
   ["@", ".--.-."],
   ["\u00bf", "..-.-"],
   ["\u00a1", "--...-"],
   [" ", "/"]
];


function encode(string) {
    return string
        .toLowerCase()
        .split("")
        .map(char => {
            for (i = 0; i < morse.length; i++) {
                if (morse[i][0] === char) {
                    return morse[i][1];
                }
            }
            return char;
        })
        .join(" ");
}

function decode(string) {
    return string
        .split(" ")
        .map(m => {
            for (i = 0; i < morse.length; i++) {
                if (morse[i][1] === m) {
                    return morse[i][0];
                }
            }
            return m;
        })
        .join("");
}

// HTML

const input = {
    text: document.querySelector("#text"),
    morse: document.querySelector("#morse")
};

oninput = event => {
    if (event.target.id === "text") {
        input.morse.value = encode(input.text.value);
    } else {
        input.text.value = decode(input.morse.value);
    }
}