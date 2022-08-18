question=["question","foo","bar","hogehoge","fugafuga","piyopiyo"];// 問題
answer="";// 現在の到達状況
word_num=0;// 何問目か
correct=0;// 正答文字数
miss=0;// ミスタイプ数
cnt=0;// 何文字目か
document.addEventListener('keydown',(event)=>{// 何かキーが押されたら、実行 https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event
    if(event.key===question[word_num][cnt]){// 正答時
        answer=answer+event.key;
        cnt++;
        correct++;
    }else if(65<=event.keyCode && event.keyCode<=90){// 不正解の時
        miss++;
    }
    if(cnt==question[word_num].length){// 次の問題へ
        word_num++;
        answer="";
        cnt=0;
        if(word_num===question.length)document.write("終了");
    }
    document.getElementById("question").textContent=question[word_num];
    document.getElementById("answer").textContent=answer;
    document.getElementById("miss").textContent=miss;
    document.getElementById("correct").textContent=correct;
})
