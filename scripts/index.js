const dispDom = (boardP, btP, msgP) => {
  document.getElementById("board").style.display = boardP;
  document.getElementById("bt").style.display = btP;
  document.getElementById("msg").style.display = msgP;
}

//폭탄이 있는 위치를 나타내는 배열
let num = [];

/* 폭탄섞기 누르면 */
// 폭탄 섞기 실행
const boxShuffle = () => {
  for (let i = 0; i < num.length; i++) {
    let idx1 = Math.floor(Math.random() * 9);
    let idx2 = Math.floor(Math.random() * 9);

    if (idx1 != idx2) {
      let temp = num[idx1];
      num[idx1] = num[idx2];
      num[idx2] = temp;
    }
  }
  shuffleFlag = true;
  init();
  console.log(num);
};

//폭탄이 섞였는지 체크하는 flag변수
let shuffleFlag = false;

//박스를 선택한 순서를 기록하는 배열
let selNum = [];

// 메세지 출력 함수
const msgShow = (m) => {
  const msg = document.getElementById('msg');
  msg.innerHTML = `<h2>${m}</h2>`;
}
/* 박스 누르면(show) 
1. 셔플여부 확인
  - 안 섞었으면 섞으라고 하기
<섞었을 때>
2. selNum 요소 기록하기
  - selNum.length로 cnt 체크
3. 이미지 보여주기(0:하트/1:폭탄)
단, 성공(cnt=8) 시 1도 하트
*/

const show = (click) => {
  
  // 셔플여부 확인
  if (!shuffleFlag) {
    msgShow('Shuffle please');
    return;
  }

  // selNum 취합 및 length 확인
  if (!selNum.includes(click)) selNum.push(click);
  console.log(selNum, selNum.length);
  
  // 클릭 박스에 따라 그림표시
  let imgSrc = null;
  if(num[click-1]==0) {
    imgSrc = 'heart';
  } else {
    imgSrc = 'bomb';
    shuffleFlag = false;
    msgShow('FAIL😢');
  }

  document.getElementById(`box${click}`).innerHTML = `<img src="./images/${imgSrc}.png">`;
  
  // 성공체크
  if (selNum.length == 8) {
    let fn = [1,2,3,4,5,6,7,8,9].filter((i) => !selNum.includes(i));
    console.log(fn[0]);
    document.getElementById(`box${fn[0]}`).innerHTML = `<img src="./images/heart.png">`;
    shuffleFlag = false;
    msgShow('SUCCESS😍');
  }

}

// 초기화 함수
const init = () => {
  msgShow(" ");

  for (let i = 1; i <= 9; i++) {
    document.getElementById(`box${i}`).innerHTML = `${i}`;
  }

  selNum = [];
}

/* DOM이 로드된 후에 클릭이벤트 연결*/
document.addEventListener("DOMContentLoaded", () => {

  // 기본세팅
  boxShuffle();
  shuffleFlag = false;
  cnt = 0;

  //DOM이 로드가 되면 반복문을 이용하여 num을 [0,0,0,0,0,0,0,0,1]로 초기화
  num.sort();
  for (let s = 0; s < 9; s++) {
    (s == 8) ? num[s] = 1 : num[s] = 0;
  }
  console.log(num);

});