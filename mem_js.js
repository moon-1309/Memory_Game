let cards = document.querySelectorAll('.card');
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;


function shuffle()
{
    cardArray.forEach((card) => {
        let randonIndex = Math.floor(Math.random() * cardArray.length);
        card.style.order =  randonIndex;
        console.log(card.children,randonIndex);
        card.children[1].style.backgroundImage = `url(${card.getAttribute('data-image')})`;
    });
}

function flipCard()
{
    if(lockCard) return;
    if(this === firstCard) return;
    

    this.classList.add("flip");

    if(!flippedCard)
    {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}


function checkForMatch()
{
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? disableCards() : unflipCards();
}


// function disableCards()
// {
//      firstCard.classList.add("matched");
//     secondCard.classList.add("matched");

//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeE ventListener('click', flipCard);
//     resetBoard();
// }

function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        resetBoard();
    }, 600);
}


function unflipCards()
{
    lockCard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard()
{
    [flippedCard, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startGame()
{
    shuffle();
    cards.forEach((card)=> card.addEventListener('click', flipCard));
}

startGame();