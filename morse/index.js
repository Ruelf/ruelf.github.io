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


const encode = string => string
    .toLowerCase()
    .split("")
    .map(c => (morse.find(([x]) => x === c) || {1: c})[1])
    .join(" ");


const decode = string => string
    .split("\n")
    .map(line => line
        .split(" ")
        .map(m => (morse.find(([_, x]) => x === m) || [m])[0])
        .join("")
    )
    .join("\n");

// HTML

const input = {
    text: document.querySelector("#text"),
    morse: document.querySelector("#morse")
};

oninput = ({ target }) => {
    if (target.id === "text") {
        input.morse.value = encode(input.text.value);
    } else {
        input.text.value = decode(input.morse.value);
    }
}
