'use strict';

//MaxRateUser
function GetMaxRate() {
  let MaxR;
  let flag = false;
  do {
    if (flag) alert('ERROR!');
    MaxR = prompt('Bede MAX SCORE![MIN&default:20]');
    if (!flag) flag = true;

    if (MaxR === null) break;
  } while (MaxR === undefined || isNaN(+MaxR) || +MaxR < 20);
  if (MaxR === null) MaxR = 20;
  else MaxR = Math.floor(MaxR);

  return MaxR;
}
const MaxRateNumber = GetMaxRate();
// const MaxRateNumber = 20;

//HTML DOM
const doc_body = document.body;
const MaxRate_Text = document.querySelector('.MaxRate');
const btn_again = document.querySelector('.again');
const hiddenNumberDiv = document.getElementsByClassName('number')[0];
const Game_Message = document.querySelector('.message');
const score_rate = document.querySelector('.score');
const Highscore_rate = document.querySelector('.highscore');
const input_user = document.querySelector('.guess');
const btn_check = document.querySelector('.check');

//WEB DATA
MaxRate_Text.innerHTML = MaxRateNumber;
score_rate.innerHTML = MaxRateNumber;
const RandomNumber = Math.floor(Math.random() * MaxRateNumber + 1);
// hiddenNumberDiv.innerHTML = RandomNumber;
let score = MaxRateNumber;
let Highscore = 0;

//EVENTS

btn_check.addEventListener('click', function () {
  if (input_user.value.trim() === '') {
    alert('مردی ی عدد باید بزنی خووووووب');
    return;
  }
  const userGusses = Math.floor(+input_user.value);

  if (userGusses === RandomNumber) {
    //edits
    Game_Message.textContent = '🤬  از کجا فهمیدی';
    doc_body.style.backgroundColor = '#60b347';
    btn_check.disabled = true;
    hiddenNumberDiv.innerHTML = RandomNumber;

    if (Highscore < score) {
      Highscore = score;
      Highscore_rate.innerHTML = Highscore;
    }
  } else {
    if (score > 1) {
      Game_Message.textContent =
        userGusses > RandomNumber
          ? '🙃بهم الهام شد که پایینتره'
          : '🥸حالا که دارم فکر میکنم باید بالاتر بری';
    } else {
      Game_Message.textContent = '😂😂😂باختی برار';
      btn_check.disabled = true;
      doc_body.style.backgroundColor = 'red';
      hiddenNumberDiv.innerHTML = RandomNumber;
    }
    score--;
    score_rate.innerHTML = score;
  }
});

btn_again.addEventListener('click', function () {
  score = MaxRateNumber;
  score_rate.innerHTML = MaxRateNumber;
  hiddenNumberDiv.innerHTML = '?';

  btn_check.disabled = false;
  input_user.value = '';
  input_user.focus();
  const RandomNumber = Math.floor(Math.random() * MaxRateNumber + 1);
  doc_body.style.backgroundColor = '#222';
  Game_Message.textContent = 'Start guessing...';
});
