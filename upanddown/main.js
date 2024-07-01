//랜덤 번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다.
//랜덤 번호가 유저번호보다 작다면 Down
//랜덤 번호가 유저번호보다 크다면 Up
//Reset 버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다 쓰면 게임이 끝난다.(더 이상 추측 불가, 버튼이 Disable이 됨)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 입력하면 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById('play-button');
// console.log('playButton 값: ', playButton);
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let arrayHistory = [];
let gameOver = false;
let chanceArea = document.getElementById('chances-area');

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);

function pickRandomNum() {
  previousNum = Math.random() * 100;
  computerNum = Math.floor(previousNum) + 1;

  console.log('정답: ', computerNum, ', 원래 값:', previousNum);
}

function play() {
  let userValue = userInput.value;
  console.log(userValue);
  if (!userValue) {
    resultArea.textContent = '값을 입력해주세요'; //이건 방법을 더 알아보아야겠습니다.
  } else if (userValue < computerNum) {
    resultArea.textContent = 'UP!!!!';
  } else if (userValue > computerNum) {
    resultArea.textContent = 'DOWN!!!!!!';
  } else {
    resultArea.textContent = '맞추셨습니다!!!';
  }
  if (userValue > 0 && userValue <= 100) {
    if (arrayHistory.includes(userValue)) {
      resultArea.textContent = '이미 입력했던 숫자에요!';
    } else {
      arrayHistory.push(userValue);
      chances--;
    }
  } else {
    resultArea.textContent = '범위 초과! 1부터 100까지 값을 입력해주세요.';
  }
  if (chances < 1) {
    gameOver = true;
  } else {
    gameOver = false;
  }
  if (gameOver) {
    playButton.disabled = true;
  }
  console.log('chances: ', chances);
  chanceArea.textContent = `남은 기회: ${chances}번`;
}
function reset() {
  //user input 창이 깨끗하게 정리되고
  userInput.value = '';
  //새로운 번호가 생성되고
  pickRandomNum();

  resultArea.textContent = '결과 값이 여기에 나옵니다!';
  chances = 5;
  arrayHistory = [];
  playButton.disabled = false;
  gameOver = false;
}
pickRandomNum();

