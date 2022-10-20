export default async function script() {
  // ユーザーの入力情報を受け取る関数
  async function postCook() {
    // JSON形式でmain.jsから受信
    const username = document.getElementById("username").value;
    const qnumber = document.getElementById("qnumber").value;
    const json = JSON.stringify({ username: username, qnumber: qnumber });
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/cookSave`, // https://github.com/ut-code/typescript-react-node-template/blob/master/frontend/src/App.tsx を参照
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      }
    );

    document.write(username + " " + qnumber);
    window.location.href = "/basic";
  }
  document.getElementById("play-button").onclick = postCook;
}
