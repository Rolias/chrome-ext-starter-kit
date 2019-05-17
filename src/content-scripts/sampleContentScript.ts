import * as I from "../Interfaces";

  chrome.runtime.onMessage.addListener(request => {
    if (request.execute === 'getTitleData') {
      console.log("Trying to get title data from the page");
      const result = getTitle()
      chrome.runtime.sendMessage({response: 'titleAvailable', payload: result})
    }
  })

  const getTitle  = (): I.SamplePageScrapeData => {
    const titleElement = document.querySelector('title')
    let title = ''
    if (titleElement !== null) {
      title = titleElement.innerHTML
    }
    return {title}
  }

