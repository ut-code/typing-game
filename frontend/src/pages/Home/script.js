export default async function script() {
  // ユーザーの入力情報を受け取る関数
  async function postCook() {
    // JSON形式でmain.jsから受信
    // const json = JSON.stringify({ username: username, qnumber: qnumber });
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/cookSave`, // https://github.com/ut-code/typescript-react-node-template/blob/master/frontend/src/App.tsx を参照
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    );

    // テキストを取り出し、objectに
    // const x = await response.text();
    // let username = JSON.parse(await response.text().username);
    // let qnumber = JSON.parse(await response.text().qnumber);
    window.location.href = "/basic";
  }
  document.getElementById("play-button").onclick = postCook;
  //   postCook();
}
