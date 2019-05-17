
import { getOptionValues } from '../shared.js'
import * as I from '../Interfaces'

  document.addEventListener('DOMContentLoaded', () => {
    initOptions()
  })

  /**
   * Get the values from storage and write them to the form
   * Set up the click handler on the Save button
   * to retrieve all the values and write them to storage
   */
  const initOptions = async () => {

    const data  = await getOptionValues()
    console.log(`Data: ${JSON.stringify(data)}`);
    sendStoredValuesToForm(data)
    const saveButton = getSaveButton()
    if (saveButton == null) {
      console.error('The save button was null')
    } else {
      saveButton.addEventListener('click', () => sendFormValuesToStorage())
    }
    const cancelButton = getCancelButton()
    if (cancelButton == null){
      console.error('The cancel button was null');
    }else{
      cancelButton.addEventListener('click', () => window.close())
    }

  }

  const sendFormValuesToStorage = () => {
    const optionMessage = (getOnlyOption() as HTMLInputElement).value

    chrome.storage.sync.set(
      {optionMessage},
      () => {
        const msg = `Saved:${optionMessage}`
        const saveResponseElement = document.getElementById('saveResponse') as HTMLInputElement
        saveResponseElement.placeholder = msg
        console.log(msg)
      }
    )
  }

  const sendStoredValuesToForm = (data:I.SampleData ) : void => {
    getOnlyOption().value = data.optionMessage

  }

  const getOnlyOption = ()=> document.getElementById('onlyOption') as HTMLInputElement
  const getSaveButton = () => document.getElementById('saveButton') as HTMLElement
  const getCancelButton = () => document.getElementById('cancelButton') as HTMLElement
