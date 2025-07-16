/** @jsx m */

import m, { Component } from "mithril";
import "./App.css";
import InputRenderer from "./components/InputRenderer";
import Button from "./components/Button";
import Match from "../shared/match";

export const App = (): Component => {
  let input = "";
  let matches: Match[] = [];

  return {
    oninit: async () => {
      matches = await m.request({
        method: "GET",
        url: "http://localhost:3001/api/matches",
      });
    },
    view: () => [
      m("h1", "My Mithril TypeScript App"),
      m("div.container", [
        m("h2", "Live Football Scores"),
        matches.map((match) =>
          m(
            "div",
            { style: "margin:10px;padding:10px;border:1px solid gray;" },
            [
              m("div", `${match.homeTeam} vs ${match.awayTeam}`),
              m("div", `Score: ${match.score}`),
              m("div", `Date: ${new Date(match.utcDate).toLocaleString()}`),
            ]
          )
        ),
      ]),
      m(InputRenderer, {
        value: input,
        oninput: (v: string) => (input = v),
      }),
      m(Button, { onclick: () => alert("Button clicked!") }),
    ],
  };
};
