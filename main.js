    document.querySelector(".control-button span").onclick = function () {
    let yourName = prompt("Enter your name !") || "Unknown!";

    localStorage.setItem("playerName", yourName);

    let players = JSON.parse(localStorage.getItem("allPlayers")) || [];

    if (!players.includes(yourName)) {

        players.push(yourName);
        
        localStorage.setItem("allPlayers", JSON.stringify(players));
    }

    document.querySelector(".Player-name .name").innerHTML = yourName;

    document.getElementById("start").play();

    document.querySelector(".control-button").remove();

    document.querySelector(".Number-attempts span").innerHTML = "0";
}


// let timerNum

// let timer = 25

let derution = 1000

let blockCon = document.querySelector(".contanier-game")

let block = Array.from(blockCon.children)

let orderArr = Array.from(Array(block.length).keys())

shiffl(orderArr)

block.forEach((blo , index) => {

    blo.style.order = orderArr[index]

    blo.addEventListener("click", function(){

        isFllip(blo)

    })

})

function isFllip(select) {

    select.classList.add("is-fllip")

    let sel = block.filter(ele => ele.classList.contains("is-fllip"))

    if (sel.length === 2) {
        
        stopClick()

        check(sel[0], sel[1])
    }

    
}

function stopClick() {
    
    blockCon.classList.add("noClick")

    setTimeout(() => {
        
        blockCon.classList.remove("noClick")

    }, 700);

    // setInterval(() => {
        
    //     blockCon.classList.add("noClick")

    // }, 25000);

}


function shiffl(array) {
    
    let current = array.length,
            temp,
            random;

    while (current > 0) {
        
        random = Math.floor(Math.random() * current)

        current--

        temp = array[current]

        array[current] = array[random]

        array[random] = temp
    }

    return array
}

function check(first, second) {
    
    let tryAtt = document.querySelector(".Number-attempts span")

    if (first.dataset.tech === second.dataset.tech) {

        first.classList.remove("is-fllip")
        second.classList.remove("is-fllip")

        first.classList.add("match")
        second.classList.add("match")

        document.getElementById("seccess").play()

        
    } else {
        
        tryAtt.innerHTML = parseInt(tryAtt.innerHTML) + 1

        setTimeout(() => {
            
            first.classList.remove("is-fllip")
            second.classList.remove("is-fllip")
            
        }, derution);

        document.getElementById("fail").play()
    }

    let allMatched = block.every(card => card.classList.contains("match"));

    if (allMatched) {

        setTimeout(() => {
        
        let player = document.querySelector(".Player-name .name").innerHTML;

        document.getElementById("end").play()

        done(player); 

    }, 800);
}
}

function done(player) {

    let model = document.querySelector(".well")

    let overlay = document.getElementById("overlay1");

    let tryAtt1 = document.querySelector(".Number-attempts span").innerHTML

    model.style.display = "block";
    
    overlay.style.display = "block";

    document.querySelector(".msg ").innerHTML =`🎉 Well done, ${player} 👏! You won after ${tryAtt1} mistakes 🙄
        Try again and be better! 😘`

    document.querySelector(".close").onclick = function () {
        
        model.style.display = "none"

        overlay.style.display = "none"
    }

    window.onclick = function (event) {
        
        if (event.target == model) {
            
            model.style.display = "none";

            overlay.style.display = "none";

        }
    }

}

// function startGame() {

//     timerNum
    
//     timer = 25

//     document.getElementById("tim").textContent = timer

//     timerNum = setInterval(() => {
        
//         timer--

//         document.getElementById("tim").textContent = timer

//         if (timer <= 0) {
            
//             clearInterval(timerNum)

//             blockCon.classList.add("noClick")

//             document.getElementById("start").play()

//             alert("⏰ Time's up! Game Over.");

//         }

//     }, derution);

// }