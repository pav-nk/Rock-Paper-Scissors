// ui - elements

const navigation = document.querySelector('.navigation');

const playerResultPicture = document.querySelector('.card--player > .icon');
const computerResultPicture = document.querySelector('.card--computer > .icon');

const playerResultCount = document.querySelector('.card--player span');
const computerResultCount = document.querySelector('.card--computer span');

const subTitle = document.querySelector('.sub-title');
const description = document.querySelector('.description');

const options = ["scissors", "paper", "rock"];

let roundCount = 0;
const maxRound = 5;

const score = {
    player: 0,
    computer: 0,
};

function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}

function getComputerChoice() {
    return options[getRandomNumber()];
}

function updateViewSelection(playerSelection, computerSelection) {
    playerResultCount.textContent = score.player;
    computerResultCount.textContent = score.computer;

    playerResultPicture.setAttribute("src", `./icons/${playerSelection}.svg`);
    computerResultPicture.setAttribute("src", `./icons/${computerSelection}.svg`);
}

function updateTextMessage({ title, desc }) {
    subTitle.textContent = title;
    description.textContent = desc;
}

function generateMessage(playerSelection, computerSelection, key) {
    const message = {
        title: null,
        desc: null,
    };

    switch (key) {
        case 'tie':
            message.title = "It's a tie!";
            message.desc = `${playerSelection} ties with ${computerSelection}`;
            break;
        case 'player':
            message.title = "You won!";
            message.desc = `${playerSelection} beats ${computerSelection}`;
            break;
        case 'computer':
            message.title = "You lost!";
            message.desc = `${playerSelection} is beaten by ${computerSelection}`;
            break;
    }

    return message;
}

function playRound(playerSelection, computerSelection) {
    let isPlayerWon = false;
    switch (playerSelection) {
        case 'paper':
            isPlayerWon = computerSelection === 'rock';
            break;
        case 'rock':
            isPlayerWon = computerSelection === 'scissors';
            break;
        case 'scissors':
            isPlayerWon = computerSelection === 'paper';
            break;
    }
    if (isPlayerWon) {
        score.player += 1;
        updateTextMessage(generateMessage(playerSelection, computerSelection, 'player'));
        updateViewSelection(playerSelection, computerSelection);
    } else {
        score.computer += 1;
        updateTextMessage(generateMessage(playerSelection, computerSelection, 'computer'));
        updateViewSelection(playerSelection, computerSelection);
    }
};

function game() {

    navigation.addEventListener('click', (event) => {
        const target = event.target;
        if (roundCount < maxRound) {
            const computerSelection = getComputerChoice();
            let playerSelection = null;
            switch (target.dataset.btn) {
                case 'rock':
                    playerSelection = 'rock';
                    break;
                case 'scissors':
                    playerSelection = 'scissors';
                    break;
                case 'paper':
                    playerSelection = 'paper';
                    break;
                default:
                    return;
            };
            if (computerSelection !== playerSelection) {
                roundCount += 1;
                playRound(playerSelection, computerSelection);
            } else {
                updateTextMessage(generateMessage(playerSelection, computerSelection, 'tie'));
                updateViewSelection(playerSelection, computerSelection);
            }
        } else {
            const { player, computer } = score;
            const endOfTheGame = {
                title: 'The game is over',
                desc: player > computer ? 'You won!' : 'You lost!',
            };
            updateTextMessage(endOfTheGame);
        }
    });
};


game();