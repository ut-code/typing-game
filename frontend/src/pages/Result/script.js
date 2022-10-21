export default async function script() {
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
  document.getElementById("time").textContent = "時間" + data.time + "秒";
  document.getElementById("score").textContent = "スコア" + data.score + "点";
}
