'use strict';
const Player_1 = {
  score: 0,
  TempcurrentScore: 0,
  Player_Name: 'Player 1',
};
const Player_2 = {
  score: 0,
  TempcurrentScore: 0,
  Player_Name: 'Player 2',
};
function TakeRandomDice() {
  return Math.floor(Math.random() * 5 + 1);
}

//def DATA and Elments

const btn_newGame = document.querySelector('.btn--new');
const btn_rollDice = document.querySelector('.btn--roll');
const btn_holdPoints = document.querySelector('.btn--hold');
const section_all_playerContainer = document.querySelectorAll('.player');
const img_diceImage = document.querySelector('.dice');
const data_all_TempcurretnScore = document.querySelectorAll('.current-score');
const data_all_Score = document.querySelectorAll('.score');
const data_all_remScore = document.querySelectorAll('.remscore');
const data_all_winNumbers = document.querySelectorAll('.WinsNumber');

let Turn; //0=>player1   1=>player2
let dice_number;
const PlayerObjects = [Player_1, Player_2];
const MAX_POINTS_TO_WIN = 97;
const PATH_JS_TO_IMAGES_DICE = 'images';
//Events :

btn_rollDice.addEventListener('click', RollDiceLogic);
btn_holdPoints.addEventListener('click', HoldPointLogic);
btn_newGame.addEventListener('click', NewGameLogic);

//functions :
function RollDiceLogic() {
  if (Turn === undefined) {
    StartGame();
    return;
  }

  const currentPlayer = PlayerObjects[Turn];
  dice_number = TakeRandomDice();
  change_Roll_Image(dice_number);

  if (dice_number === 1) {
    currentPlayer.TempcurrentScore = 0;
    alert(`SHIT!\nYOU[Player_${currentPlayer.Player_Name}] Gotcha 1 😒`);
  } else {
    currentPlayer.TempcurrentScore += dice_number;
  }

  //submit to WebPage
  data_all_TempcurretnScore[Turn].innerHTML = currentPlayer.TempcurrentScore;

  if (dice_number === 1) NextTurn();
}

function HoldPointLogic() {
  const currentPlayer = PlayerObjects[Turn];
  currentPlayer.score += currentPlayer.TempcurrentScore;
  currentPlayer.TempcurrentScore = 0;

  //submit DATA to Webpage
  data_all_Score[Turn].innerHTML = currentPlayer.score;
  data_all_TempcurretnScore[Turn].innerHTML = currentPlayer.TempcurrentScore;

  if (currentPlayer.score >= MAX_POINTS_TO_WIN) {
    WinGame();
  } else {
    NextTurn();
  }
}

function NewGameLogic() {
  section_all_playerContainer[Turn].classList.remove('player--active');
  Turn = undefined;
  data_all_TempcurretnScore[0].innerHTML =
    data_all_TempcurretnScore[1].innerHTML =
    data_all_Score[0].innerHTML =
    data_all_Score[1].innerHTML =
    Player_1.TempcurrentScore =
    Player_2.TempcurrentScore =
    Player_1.score =
    Player_2.score =
      0;

  StartGame();
}

function change_Roll_Image(num) {
  let str = '';
  switch (num) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      str = `dice-${num}.png`;
      break;
    default:
      alert('IM ERROR!!![IN change_Roll_Image_function]');
      break;
  }

  img_diceImage.src = PATH_JS_TO_IMAGES_DICE + '/' + str;
}

function NextTurn() {
  section_all_playerContainer[Turn].classList.remove('player--active');
  data_all_remScore[Turn].innerHTML =
    'To Win : ' + (MAX_POINTS_TO_WIN - PlayerObjects[Turn].score);

  Turn = (Turn + 1) % 2;

  section_all_playerContainer[Turn].classList.add('player--active');
}

function StartGame() {
  alert('EVEN : PLAYER_1\nODD : PLAYER_2');
  const temp = Math.floor(Math.random() * 99 + 1);
  alert(`[${temp}]\n` + (temp % 2 === 0 ? 'PLAYER_1' : 'PLAYER_2'));
  Turn = temp % 2 === 0 ? 0 : 1;
  section_all_playerContainer[Turn].classList.add('player--active');
  btn_newGame.innerHTML = '🔄 New game--RESET--';

  const all_ex = document.querySelectorAll('.btn:not(.btn--new)');
  for (let x of all_ex) x.disabled = false;

  data_all_remScore[0].innerHTML = data_all_remScore[1].innerHTML =
    'To Win : ' + MAX_POINTS_TO_WIN;

  const players = document.querySelectorAll('.name');

  players[0].classList.remove('WINNER_ICON');
  players[1].classList.remove('WINNER_ICON');
  players[0].classList.remove('LOOSER_ICON');
  players[1].classList.remove('LOOSER_ICON');

  section_all_playerContainer[0].classList.remove('winner_back');
  section_all_playerContainer[1].classList.remove('winner_back');
  section_all_playerContainer[0].classList.remove('looser_back');
  section_all_playerContainer[1].classList.remove('looser_back');
}
function WinGame() {
  alert(
    'HoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoO\n' +
      PlayerObjects[Turn].Player_Name +
      '\nWINS!!!!'
  );
  const all_ex = document.querySelectorAll('.btn:not(.btn--new)');
  for (let x of all_ex) x.disabled = true;

  img_diceImage.src = PATH_JS_TO_IMAGES_DICE + '/dice-97.png';
  document.querySelectorAll('.name')[Turn].classList.add('WINNER_ICON');
  document
    .querySelectorAll('.name')
    [(Turn + 1) % 2].classList.add('LOOSER_ICON');

  console.log(data_all_winNumbers);

  data_all_winNumbers[Turn].innerHTML += '👑';

  section_all_playerContainer[Turn].classList.add('winner_back');
  section_all_playerContainer[(Turn + 1) % 2].classList.add('looser_back');
}
