keymap={65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z"};

question="question";
result="";
miss=0;
cnt=0;
document.getElementById("question").textContent=question;
document.onkeydown=(evt)=>{
    let kc;
    if(document.all){
        kc=event.keyCode;
    }else{
        kc=evt.which;
    }
    if(keymap[kc]===question[cnt]){
        result=result+keymap[kc];
        cnt++;
    }else{
        miss++;
    }
    document.getElementById("answer").textContent=result;
    document.getElementById("miss").textContent=miss.toString();
}
