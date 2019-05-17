 import * as I from '../Interfaces'
 import { getOptionValues } from '../shared.js'

  // const xhr = new XMLHttpRequest()
  let activeTab : chrome.tabs.Tab
  // const SUCCESS_COLOR = '#35B558'
  // const ERROR_COLOR = '#EC008C'

  // Once the page loads do the init. That way the order of the scripts isn't important
  document.addEventListener('DOMContentLoaded', async () => {
    await init()
    activeTab = await getActiveTab()
  })

  /**
   * We need to init the app to
   * 1. get any stored options data
   * 2. add a listener for the message sent by the content script 
   * 3. Add a handler to the onclick action of the button 
   */
  const init = async () => {
    const userOptions :I.SampleData = await getOptionValues()
    const {optionMessage} = userOptions
    getOptionDisplay().innerHTML = optionMessage
    addListenerForContentScript()
    addRetireOnClick()
    hideResponseArea()
  }

  /**
   * On click handler for the click me button
   * Starts the process by showing the progress spinner
   * and firing off the message to request data from the target page
   */
  const addRetireOnClick = () => {
    getRetireButton().onclick = () => {
      showProgressSpinner()
      requestPageInfo()
    }
  }

  /**
   * Send a message to our content script 
   * It will try to find an element with a class of 'title' 
   * Then it will send a message with an action property of "titleAvailable"
   * addListenerForContentScript() above added a listener for that message
   */
  const requestPageInfo = ():void => {
    chrome.tabs.sendMessage(activeTab.id as number, {execute: 'getTitleData'})
  }

  /**
   * Once the content script processes our request for page data it will send
   * us a message with a response property set to "titleAvailable"
   */
  const addListenerForContentScript = ():void => {
    chrome.runtime.onMessage.addListener((request) => {
  if (request.response === 'titleAvailable') {

        const {title} = request.payload
        getResponseAlert().innerHTML = `Processed the click: ${title}`
        // sendRestGet(title) // example of doing api call -
        //Here we'll just show the value 
        hideProgressSpinner()
        showResponseArea()
      }
    })
  }

  /**
   * Get the data from storage and bundle it into a payload object
   * and send it as a parameter in a get request.
   * This is just an example. You would need a back-end server
   * to handle this request
   */
  // const sendRestGet = async (title:string): Promise<void> => {
  //   xhr.onreadystatechange = handleStateChange
  //   const userOptions = await getOptionValues() // method from shared.js
  //   const {message} = userOptions

  //   const payload = {
  //     message,
  //     courseUrl: encodeURIComponent(activeTab.url as string),
  //     title
  //   }
  //   const payloadMsg = `payloadString=${JSON.stringify(payload)}`
  //   const getMessage = `https://${targetHost}/someroute?${payloadMsg}` //NOT you need to customize this line for your endpoint
  //   console.log('Message to be sent:', getMessage)
  //   xhr.open('GET', getMessage, true)
  //   xhr.send()
  // }

  /**
   * THE FINAL STAGE - the handler called when a response to our API get
   * request is received.
   */
  // const handleStateChange = ():void => {
  //   const SUCCESS = 200
  //   const READY_STATE_DONE = 4
  //   if (xhr.readyState !== READY_STATE_DONE) {
  //     return
  //   }
  //   hideProgressSpinner()
  //   let color = ERROR_COLOR
  //   const response = JSON.parse(xhr.response)

  //   setResponseAlert(response)
  //   if (xhr.status === SUCCESS && response.rowAdded) {
  //     color = SUCCESS_COLOR
  //   }
  //   // set some element on page with color
  // }

  const getActiveTab = ():Promise<chrome.tabs.Tab> =>
    new Promise((resolve) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => resolve(tabs[0]))
    })


  // const setResponseAlert = (response:XMLHttpRequest["response"]):void => {
  //   const alert = getResponseAlert()

  //   if (response.rowAdded) {
  //     alert.classList.add('alert-success')
  //   } else {
  //     alert.classList.add('alert-warning')
  //   }

  //   alert.innerHTML = response.message
  //   alert.classList.add('d-block')
  // }
  const showResponseArea = (): void => {
    getResponseAlert().classList.remove('d-none')
  }

  const hideResponseArea= (): void => {
    getResponseAlert().classList.add('d-none')
  }

  const showProgressSpinner = (): void => {
    getProgressElement().classList.remove('d-none')
  }

  const hideProgressSpinner = (): void => {
    getProgressElement().classList.add('d-none')
  }

  const getRetireButton = () => document.getElementById('clickMe') as HTMLElement
  const getOptionDisplay = () => document.getElementById('optionDisplay') as HTMLElement
  const getResponseAlert = () => document.getElementById('response') as HTMLInputElement
  const getProgressElement = () => document.getElementById('navProgress') as HTMLElement

