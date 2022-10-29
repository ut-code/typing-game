export default async function script(listItems) {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/fetchScore`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
    }
  );
  // わざわざstringにしてからobjectにしている...
  let tmp = await response.text();
  let data = JSON.parse(tmp);
  let rank = 1;
  for (let listItem of listItems) {
    if (data.score == listItem.score) {
      break;
    } else {
      rank++;
    }
  }

  document.getElementById("time").textContent = "時間" + data.time + "秒";
  document.getElementById("score").textContent = "スコア" + data.score + "点";
  document.getElementById("yourRank").textContent = "順位" + rank + "位";
  document.getElementById("name").textContent = data.username;
}
