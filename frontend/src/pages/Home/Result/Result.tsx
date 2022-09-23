import { useEffect, useState } from "react";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

let i: number = 1;
// const listItems: string[] = ['りんご', 'バナナ', 'みかん'];

export default function Result() {
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      <head>
        <title>結果</title>
      </head>
      <body>
        <div class="flex">
          <div class="yourResults">
            <p id="finish">終了!</p>
            <p id="time">時間秒</p>
            <p id="score">スコア点</p>
          </div>
          <div class="rankBoard">
            <p id="results">結果</p>
            <table id="ranking">
              {/* {i=1} */}
              <tr>
                <th>1</th>
                <th>Guest</th>
                <th>100</th>
              </tr>
              <tr>
                <th>2</th>
                <th>Guest</th>
                <th>80</th>
              </tr>
              {/* <% i=1 %>
              <% for (let listItem of listItems) {%>
              <tr><th><%= i %></th><th><%= listItem.username %></th><th><%= listItem.score %></th></tr>
              <% i++ %>
              <% } %> */}
            </table>
            <a href="/">戻る</a>
          </div>
        </div>
      </body>
    </>
  );
}
