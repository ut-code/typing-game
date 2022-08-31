let question = ["foo", "bar", "hogehoge", "fugafuga", "piyopiyo"];// 問題

// 配列をシャッフルする。
function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}
question = shuffle(question);

let answer = "";// 現在の到達状況
let word_num = 0;// 何問目か
let correct = 0;// 正答文字数
let miss = 0;// ミスタイプ数
let cnt = 0;// 何文字目か
let isStarted = false;// 始まったか
let time = 0;// 時間


document.getElementById("miss").textContent = "ミスタイプ数：" + miss + "回";
document.getElementById("correct").textContent = "正しいタイプ数：" + correct + "回";
document.getElementById("time").textContent = "経過時間：" + time + "秒";

document.addEventListener('keydown', (event) => {// 何かキーが押されたら、実行 https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event
    if (event.key === question[word_num][cnt]) {// 正答時
        answer = answer + event.key;
        cnt++;
        correct++;
    } else if (65 <= event.keyCode && event.keyCode <= 90) {// 不正解の時
        miss++;
    }
    if (cnt == question[word_num].length) {// 次の問題へ
        word_num++;
        answer = "";
        cnt = 0;
        if (word_num === question.length) document.write("終了! 時間" + time + "秒");
    }
    if (event.key === " " && isStarted === false) {// スペースが押されたら、時間計測
        isStarted = true;
        setInterval(() => {
            time++;
            document.getElementById("time").textContent = "経過時間：" + time + "秒";
        }, 1000);
    }
    document.getElementById("question").textContent = question[word_num];
    document.getElementById("answer").textContent = answer;
    document.getElementById("miss").textContent = "ミスタイプ数：" + miss + "回";
    document.getElementById("correct").textContent = "正しいタイプ数：" + correct + "回";
})
