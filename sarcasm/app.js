const textarea = document.querySelector("textarea");
const div = document.querySelector("#r");

oninput = () => {
    div.innerText = textarea.value.replace(/\w+/g, (word => word
        .split("")
        .map((x, i) => i % 2 ? x.toUpperCase() : x.toLowerCase())
        .join(""))
    );
};
