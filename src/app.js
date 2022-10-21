// import React, { useRef } from "react";
// import { useAppVisible } from "./utils";

// function App() {
//   const innerRef = useRef<HTMLDivElement>(null);
//   const visible = useAppVisible();
//   if (visible) {
//     return (
//       <main
//         className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center"
//         onClick={(e) => {
//           if (!innerRef.current?.contains(e.target as any)) {
//             window.logseq.hideMainUI();
//           }
//         }}
//       >
//         <div ref={innerRef} className="text-size-2em">
//           Welcome to [[Logseq]] Plugins!
//         </div>
//       </main>
//     );
//   }
//   return null;
// }

import {div} from '@cycle/dom'
import { logseq_action, logseq_select } from 'cyclejs-logseq-driver'
import xs from 'xstream'
import dropRepeats from 'xstream/extra/dropRepeats'

const make_transaction = ({amount, from, to}) => ({uuid, amount, from, to})
const make_account = ({uuid, credit, debit}) => ({uuid, credit, debit}) 

const model = ({logseq, state}) => {
  const init$ = xs.of((prev_state) => prev_state === undefined ? (
    { transactions: []
    , accounts: []
    }
  ) : prev_state)
  
  const accounts$ =
    logseq_select
    (logseq)
    (['db', 'q'])
    ('accounts')
    . debug('acounts$')
    . mapTo((a) => a)
  
  const transactions$ =
    logseq_select
    (logseq)
    (['db', 'q'])
    ('transactions')
    . debug('transactions$')
    . mapTo((a) => a)
  
  // console.log(accounts$)

  return xs.merge(init$, accounts$, transactions$)
}

// const  
const logseq_actions = ({logseq, state}) => {
  const init$ =
    xs.of(
    logseq_action
    (['db', 'on_changed'])
    ('changes')
    ()
  )
  
  const get_accounts$ =
    state
    . stream
    . compose(dropRepeats())
    . mapTo(
      logseq_action
      (['db', 'q'])
      ('accounts')
      ('(or (page-property finey-account INTERNAL) (page-property finey-account EXTERNAL))')
    )
  
  const get_transactions$ =
    xs.of(
      logseq_action
      (['db', 'q'])
      ('transactions')
      ('(property type [[finey-transaction]])')
    )


  return xs.merge(init$, get_accounts$, get_transactions$)
}

const app = ({logseq, state}) => {
  // console.log(sources)
  // sources.logseq.map((a) => a.stringify())
  // sources.logseq.setDebugListener(console.log())
  // console.log(sources.logseq)
  let state_reducers$ = model({logseq, state})

  // let show$ = logseq
  // .debug('logseq_message')
  // .map((a) => JSON.stringify(a))
  // // .debug('something')
  // .map((a) => ({
  //   action: ['ui', 'show_message'],
  //   data: a
  // }))
  
  // template
  // let a$ = xs.of({action: [], data: ''})
  // get info
  // let a$ = xs.of({action: ['logseq', 'base_info']})
  // query all #A
  // let a$ = xs.of({action: ['db', 'q'], data: '(and [[A]] [[B]])'})
  // let a$ = xs.of({action: ['app', 'set_fullscreen']})

  return ({
    DOM: xs.of(div('hi')),
    logseq:
      xs.merge
        ( xs.never()
        , logseq_actions({logseq, state})
        // , a$
        // , show$
        ).debug('well'),
    state: state_reducers$
    // logseq: query$
  })
}

export {
  app
}