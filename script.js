let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timer;
let seconds = 0;
let moves = 0;

function startTimer() {
        clearInterval(timer);
        seconds = 0;
        document.getElementById("timer").textContent = seconds;
        timer = setInterval(() => {
        seconds++;
        document.getElementById("timer").textContent = seconds;
        }, 1000);
};

function createCards() {
        matched = 0;
        moves = 0;
        document.getElementById("score").textContent = matched;
        const images = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        images.sort(() => Math.random() > 0.5 ? 1 : -1);
        const cardsContainer = document.querySelector(".cards");
        cardsContainer.innerHTML = "";
        images.forEach(num => {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `
                <div class="view front-view"><img src="images/que_icon.png"></div>
                <div class="view back-view"><img src="images/img-${num}.png"></div>`;
        card.addEventListener("click", flipCard);
        cardsContainer.appendChild(card);
        });
        startTimer();
};

function shuffleCard() {
        createCards();
        document.getElementById("winPopup").style.display = "none";
};

function flipCard() {
        if (this !== cardOne && !disableDeck) {
        this.classList.add("flip");
        moves++;
        if (!cardOne) {
                cardOne = this;
                return;
        }
        cardTwo = this;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
        }
};

function matchCards(img1, img2) {
        if (img1 === img2) {
        matched++;
        document.getElementById("score").textContent = matched;
        if (matched === 8) {
                clearInterval(timer);
                document.getElementById("moveCount").textContent = moves;
                document.getElementById("winTime").textContent = `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
                document.getElementById("winPopup").style.display = "block";
        }
                cardOne = cardTwo = null;
                disableDeck = false;
        } else {
                setTimeout(() => {
                    cardOne.classList.remove("flip");
                    cardTwo.classList.remove("flip");
                    cardOne = cardTwo = null;
                        disableDeck = false;
                }, 1200);
        }
};
createCards();
