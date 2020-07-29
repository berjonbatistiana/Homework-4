let $answerButtons = document.querySelectorAll(".answer-btn");

$answerButtons.forEach(element => { element.addEventListener('click', x => {
    let me = x.target;
    $answerButtons.forEach(x => {
        x.style.backgroundColor = "#343a40"; x.removeAttribute("selected");
    });
    me.style.backgroundColor = "#64a973";
    me.setAttribute("selected", "");
})});