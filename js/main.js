{

  const wordsJapanese = [
    '熊本',
    '福岡',
    '大分',
    '長崎',
    '佐賀',
    '宮崎',
    '鹿児島'
  ];

  const words = [
    'kumamoto',
    'fukuoka',
    'ooita',
    'nagasaki',
    'saga',
    'miyazaki',
    'kagoshima'  
  ];
  let word;
  let loc;
  let scoreNum;
  let missNum;
  const timeLimit = 10 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const score = document.createElement('span');
  score.id = 'score';
  const miss = document.createElement('span');
  miss.id = 'miss';
  const japaneseTarget = document.getElementById('japaneseTarget');
  let num;
  

  function start() {
    countDown = 3;
    info.innerHTML = '';
    var startTimer = setInterval(function(){
      target.innerHTML = countDown;
      countDown--;
      if(countDown < 0){
         clearInterval(startTimer);
         num = Math.floor(Math.random() * words.length);
         updateTarget(num);
         startTime = Date.now();
         updateTimer();
         }
    },1000);
  }

  function updateTarget(num) {
    console.log(num);
    japaneseTarget.textContent = wordsJapanese[num];
    word = words[num];
    target.innerHTML = "<span style='color: skyblue'>" + word.substring(0,loc) + "</span>" + word.substring(loc);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    const info = document.getElementById('info');
    info.innerHTML = "残り時間: <span id='timer'>" + (timeLeft / 1000).toFixed() + "</span>";

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 1000);

    if(timeLeft < 0) {
      isPlaying = false;

      clearTimeout(timeoutId);
      japaneseTarget.textContent = '';
      info.innerHTML = "残り時間: <span id='timer'>" + 0 + "</span>";
      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {
    const accuracy = scoreNum + missNum === 0 ? 0 : scoreNum / (scoreNum + missNum) * 100;
    alert(`${scoreNum} letters, ${missNum} misses, ${accuracy.toFixed(2)}% accuracy`);
  }

  window.addEventListener('click', ()=> {
    if(isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    scoreNum = 0;
    missNum = 0;
    score.textContent = scoreNum;
    miss.textContent = missNum;
    // let num = Math.floor(Math.random() * words.length);
    // japaneseTarget.textContent = wordsJapanese[num];
    // target.textContent = words[num];
    // word = words[num];
    start();
  });

  window.onkeydown = function(e){
    if(isPlaying !== true) {
      return;
    }

    if(e.key === word.charAt(loc)) {
      loc++;
      if(loc === word.length) {
        num = Math.floor(Math.random() * words.length);
        japaneseTarget.textContent = wordsJapanese[num];
        word = words[num];
        loc = 0;
      }
      updateTarget(num);
      scoreNum++;
      score.textContent = scoreNum;
    } else {
      missNum++;
      miss.textContent = missNum;
    }
  };
}