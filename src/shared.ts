import * as I from "./Interfaces";
 export const getOptionValues = (): Promise<I.SampleData> => new Promise((resolve)=> {
  chrome.storage.sync.get(['optionMessage'], (data) => {
    const {optionMessage} = data
    const result  = {optionMessage}
    resolve(result)
  })
})

