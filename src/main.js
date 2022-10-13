import "@logseq/libs";

// import React from "react";
// import * as ReactDOM from "react-dom/client";
// import "./index.css";
import xs from 'xstream'
import {app} from "./app"
import {run} from '@cycle/run'
import {withState} from '@cycle/state'
import {makeDOMDriver} from '@cycle/dom'

import { logseq as PL } from "../package.json";

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

const pluginId = PL.id;

const makeLogseqDriver = ({
  model,
  mainUIInlineStyle,
  style,
  uiItem,
}) => {
  if (!!model) {  
    logseq.provideModel(model)
  } 
  if (!!mainUIInlineStyle) {    
    logseq.setMainUIInlineStyle(mainUIInlineStyle)
  }
  if (!!style) {    
    logseq.provideStyle(style)
  }

  if (!!uiItem) {
    logseq.App.registerUIItem('toolbar', uiItem)
  }

  const logseqDriver = in$ => {
    in$.addListener({
      next: message => {
        console.log('logseq-driver', message)
      },
      error: (e) => { console.error('logseq-driver', e) },
      complete: () => { console.info('logseq-driver', 'completed') }
    })
  
    const out$ = xs.create({
      start: listener => {
        produceEvent(listener.next)
      },
      stop: () => {}
    })

    return out$
  }
  
  return logseqDriver
}

let dispose;

function main() {
  console.info(`#${pluginId}: MAIN`);

  const openIconName = "template-plugin-open";
  
  function createModel() {
    return {
      show() {
        logseq.showMainUI();
      },
    };
  }

  const logseqOptions = {
    model: createModel(),
    mainUIInlineStyle: {
      zIndex: 11
    },
    style: css`   
      .${openIconName} {
        opacity: 0.55;
        font-size: 20px;
        margin-top: 4px;
      }

      .${openIconName}:hover {
        opacity: 0.9;
      }
    `,
    uiItem: {
      key: openIconName,
      template: `
        <div data-on-click="show" class="${openIconName}">⚙️</div>
      `,
    }
  }
  
  dispose = run(withState(app), {DOM: makeDOMDriver('#app'), logseq: makeLogseqDriver(logseqOptions) })

  // const root = ReactDOM.createRoot(document.getElementById("app")!);

  // root.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // );

  // function createModel() {
  //   return {
  //     show() {
  //       logseq.showMainUI();
  //     },
  //   };
  // }

  // logseq.provideModel(createModel());
  // logseq.setMainUIInlineStyle({
  //   zIndex: 11,
  // });

  // const openIconName = "template-plugin-open";

  // logseq.provideStyle(css`
  //   .${openIconName} {
  //     opacity: 0.55;
  //     font-size: 20px;
  //     margin-top: 4px;
  //   }

  //   .${openIconName}:hover {
  //     opacity: 0.9;
  //   }
  // `);

  // logseq.App.registerUIItem("toolbar", {
  //   key: openIconName,
  //   template: `
  //     <div data-on-click="show" class="${openIconName}">⚙️</div>
  //   `,
  // });
}

logseq.ready(main).catch(console.error);
