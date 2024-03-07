// ==UserScript==
// @name         Better Debank
// @namespace    BetterDebank
// @version      0.1
// @description  Remove scam tx from transactions list
// @author       https://github.com/lxhyl
// @match        https://debank.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=debank.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  function getScamNodeClassName() {
    const elements = document.getElementsByTagName('div')
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const className = element.className
      if (
        className && className.startsWith('History_scam')
      ) {
        return element.parentNode.parentNode.className
      }
    }
  }

  function removeNodesWithClass(className) {
    if (!className) return
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
      element.remove();
    });
  }

  let targetClassName = '';
  const timer = setInterval(() => {
    targetClassName = getScamNodeClassName();
    if (targetClassName) {
      targetClassName = targetClassName.split(" ")[1]
      removeNodesWithClass(targetClassName)
      clearInterval(timer);
    }
  }, 1000);
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