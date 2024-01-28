const timeValues = [
    ["year", 31556952],
    ["month", 2629746],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1]
];

function humanDelta(delta) {
    if (Math.floor(delta) === 0) {
        return "0 seconds";
    }

    const texts = [];

    timeValues.forEach(([name, factor]) => {
        const value = Math.floor(delta / factor);

        if (value !== 0) {
            texts.push(`${value} ${name}${value !== 1 ? "s" : ""}`);
            delta -= value * factor;
        }
    });

    return joinCommaAnd(texts);
}

// https://github.com/Ruelf/Eclipse/blob/206b4a34446dc211328900c6f6bc8d9448ec2c9f/utils/functions.py#L46-L50
function joinCommaAnd(array) {
    if (array.length > 2) {
        return `${array.slice(0, array.length - 1).join(", ")} and ${array[array.length - 1]}`;
    } else {
        return array.join(" and ");
    }
}

// HTML stuff
document.addEventListener('DOMContentLoaded', () => {
    console.log('e');

    const input = document.querySelector("input");
    const div = document.querySelector("p");

    oninput = () => div.innerText = humanDelta(input.value);

    oninput();
});
