import { useEffect, useState } from "react";
import "./style.css";
// @ts-ignore
import script from "./script";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Stack } from "react-bootstrap";

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
      <div>
        <Stack gap={3}>
          <div class="yourResults">
            <p>結果</p>
            <p id="time"></p>
            <p id="score"></p>
          </div>
          <div class="rankBoard">
            <Table striped id="ranking">
              {/* {i=1} */}
              <thead name="ranking-head">
                <tr>
                  <th>順位</th>
                  <th>ユーザ</th>
                  <th>得点</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
              {/* <% i=1 %>
              <% for (let listItem of listItems) {%>
              <tr><th><%= i %></th><th><%= listItem.username %></th><th><%= listItem.score %></th></tr>
              <% i++ %>
              <% } %> */}
            </Table>
          </div>
          <div>
            <Button href="/" variant="secondary">
              Back
            </Button>
          </div>
        </Stack>
      </div>
      <footer>
        <hr></hr>
        <p>© Copyright 2022 ut.code();</p>
      </footer>
    </>
  );
}
