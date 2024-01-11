(() => {
    const btnStart = document.querySelector("button");
    const btn3D = document.querySelector(".btn-3D");
    const genius = document.querySelector(".genius");
    const areas = Array.from(document.querySelectorAll(".blue, .red, .yellow, .green"));
    const info = document.querySelector(".info");
    const myScore = document.querySelector(".score");
    const randomAreas = new Set();
    let numberRandom = null;
    let score = 0;

    function showMessage(message, inf = "") {
        myScore.textContent = message;
        info.textContent = inf;
        score = 0;
    }

    function gameOver() {
        randomAreas.clear();
        btnStart.disabled = false;
        btnStart.textContent = "Iniciar";

        showMessage("Você perdeu!", `Você fez ${score} pontos`);
        areas.forEach(area => area.classList.remove("area"));
        areas.forEach(area => area.removeEventListener("click", checkClickedArea));
    }

    function checkClickedArea(event) {
        if(areas[numberRandom] === event.target) {
            myScore.textContent = `Pontuação: ${++score}`;

            randomAreas.delete(areas[numberRandom]);
            shuffleOrder();

        } else {
            console.log(randomAreas)
            gameOver();
        }
    }

    function shuffleOrder() {
        numberRandom = Math.floor(Math.random() * 4);
        randomAreas.add(areas[numberRandom]);

        console.log(randomAreas)
        lightArea(numberRandom);
    }

    function lightArea(index) {
        // atribui o número 1 se o valor do index for 0
        let number = index | 1;
        const time = 200 + (number * 100);
        const colorShadow = areas[index].className.replace(" area", "");


        areas[index].classList.add("selected");

        if(genius.classList.contains("view3D")) {
            genius.style.boxShadow = `0px 4px 4px ${colorShadow}, 0px 13px 8px #101010`;
        }
        
        setTimeout(() => {
            areas[index].classList.remove("selected");
            genius.style.boxShadow = "initial";
        }, time)

        console.log(time)
    }


    function start() {
        randomAreas.clear()
        shuffleOrder();
        showMessage("Pontuação:");
        btnStart.disabled = true;
        btnStart.textContent = "Desabilitado";

        areas.forEach(area => area.classList.add("area"));
        areas.forEach(area => area.addEventListener("click", checkClickedArea));
    }
    
    function apply3DTransform() {
        genius.classList.toggle("view3D");
    }
    
    btnStart.addEventListener("click", start);
    btn3D.addEventListener("click", apply3DTransform);
})()