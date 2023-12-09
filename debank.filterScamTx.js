// ==UserScript==
// @name         Better Debank
// @namespace    BetterDebank
// @version      0.1
// @description  Remove scam tx from transactions list
// @author       https://github.com/lxhyl
// @match        https://debank.com/profile/*/history
// @icon         https://www.google.com/s2/favicons?sz=64&domain=debank.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const targetClassName = 'History_error__2pz9g';

  function removeNodesWithClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
      element.remove();
    });
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode.nodeType === 1) {
          removeNodesWithClass(targetClassName);
        }
      });
    });
  });

  const observerConfig = {
    childList: true,
    subtree: true 
  };

  observer.observe(document.body, observerConfig);

  removeNodesWithClass(targetClassName);
})();