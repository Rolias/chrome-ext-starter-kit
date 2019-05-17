const sampleData = 'default option data - try saving your own'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    optionMessage:sampleData,
  }, () => {
  })
})

chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {urlContains: 'www.pluralsight.com/'},
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }])
})