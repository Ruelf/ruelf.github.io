const textarea = document.querySelector("textarea");
const div = document.querySelector("div");

oninput = () => {
    div.innerText = textarea.value
        .split("\n")
        .map(line => line
            .split(" ")
            .map(word => word
                .split("")
                .map((x, i) => i % 2 ? x.toUpperCase() : x.toLowerCase())
                .join("")
            )
            .join(" ")
        )
        .join("\n");
};
