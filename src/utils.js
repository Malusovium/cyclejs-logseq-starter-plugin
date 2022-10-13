// import { LSPluginUserEvents } from "@logseq/libs/dist/LSPlugin.user";
// import React from "react";

// let _visible = logseq.isMainUIVisible;

// function subscribeLogseqEvent<T extends LSPluginUserEvents>(
//   eventName: T,
//   handler: (...args: any) => void
// ) {
//   logseq.on(eventName, handler);
//   return () => {
//     logseq.off(eventName, handler);
//   };
// }

// const subscribeToUIVisible = (onChange: () => void) =>
//   subscribeLogseqEvent("ui:visible:changed", ({ visible }) => {
//     _visible = visible;
//     onChange();
//   });

// export const useAppVisible = () => {
//   return React.useSyncExternalStore(subscribeToUIVisible, () => _visible);
// };


let _visible = logseq.isMainUIVisible;

function subscribeLogseqEvent(
  eventName,
  handler
) {
  logseq.on(eventName, handler);
  return () => {
    logseq.off(eventName, handler);
  };
}

const subscribeToUIVisible = (onChange) =>
  subscribeLogseqEvent("ui:visible:changed", ({ visible }) => {
    _visible = visible;
    onChange();
  });

// TODO connect with cycle/js via driver or something?
// const useAppVisible = () => {
//   return React.useSyncExternalStore(subscribeToUIVisible, () => _visible);
// };

export {
  useAppVisible
}
