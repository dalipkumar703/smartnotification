
const setDOMInfo = info => {
  console.log("item",info)
  // chrome.action.setBadgeText(
  //   {
  //     text: '5',
  //   },
  // )
  chrome.storage.local.set({ info: info}).then(()=>{
    console.log('value set')
  }).catch((error)=>{
    console.log("eror in value",error)
  })

      const newDiv = document.createElement("div");
      newDiv.class= "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      info && ['connection','messages','notification'].forEach((item)=>{
       
        const newContent = document.createElement('div')
        const text = document.createTextNode(`${item}: ${info[item].value || 0}`)
        newContent.appendChild(text)
        newDiv.appendChild(newContent);
        const br = document.createElement("br");
        newDiv.appendChild(br)
    })
    const currentDiv = document.getElementById('linkedin');
    const parent = document.getElementById('container');
    const notificationDetailDiv = document.getElementById('notifications-details')
    
    const messageDetailDiv = document.getElementById('messages-details')


    const notificationDDiv = document.createElement('div')
    const messageDDiv = document.createElement('div')

    info && info.notificationDetails.map((notificationItem)=>{
      
      const newContent = document.createElement('div')
      newContent.classList.add("notification-list-item")
      const text = document.createTextNode(`${notificationItem}`)
      newContent.appendChild(text)
      notificationDDiv.appendChild(newContent);
      const br = document.createElement("br");
      br.classList.add("notification-list-item")

      notificationDDiv.appendChild(br)
    })


    info && info.messageDetails.map((messageItem)=>{
      const newContent = document.createElement('div')
      const text = document.createTextNode(`${messageItem}`)
      newContent.appendChild(text)
      messageDDiv.appendChild(newContent);
      const br = document.createElement("br");
      messageDDiv.appendChild(br)
    })
    parent.insertBefore(newDiv, currentDiv.nextSibling);
    notificationDetailDiv.appendChild(notificationDDiv)
    messageDetailDiv.appendChild(messageDDiv)
    
  };
const getMessagesName = ()=> {
  return document.getElementsByClassName('msg-conversation-listitem__participant-names')
}
const getNotificationName = () =>{
  return document.getElementsByClassName('nt-card')
}
const notificationUpdates =  () => {
  console.log("inside notification updates")
    const data = document.querySelectorAll('.notification-badge--show')
    const notificationList = {connection: {}, messages: {}, notification: {}, messageDetails:[], notificationDetails:[], filterNotifications:[]}
    data.forEach((notificationItem)=>{
        const identifyNode = notificationItem.children[1]
        if (identifyNode.innerHTML.includes('network')){
         notificationList.connection.value = notificationItem.children[0]?.innerText
        }
        if(identifyNode.innerHTML.includes('message')){
          notificationList.messages.value = notificationItem.children[0]?.innerText

        }
        if(identifyNode.innerHTML.includes('new notifications')){
          notificationList.notification.value = notificationItem.children[0]?.innerText

        }
    })

    //get notifications details
    const notificationsResult = document.querySelectorAll('.nt-card')
    console.log("notifi",notificationsResult)
    notificationsResult.forEach((notificationItem)=>{
      notificationList.notificationDetails.push(notificationItem.innerText)
    })
    //get message details
    const messageDetails = document.querySelectorAll('.msg-conversation-listitem__participant-names')
    console.log("notifi",messageDetails)
    messageDetails.forEach((notificationItem)=>{
      notificationList.messageDetails.push(notificationItem.innerText)
    })

    // get filter notifications
    notificationsResult.forEach((item)=>{
      console.log("item",item)
      if(item.children && item.children[0]?.children[0].ariaLabel?.includes('profile')){
          console.log("true")
          notificationList.filterNotifications.push(item.innerText)
      }
  })
    // const messagesResult = getMessagesName()
    // const notificationsResult = getNotificationName()
    // notificationList.messageDetails = document.querySelectorAll('.msg-conversation-listitem__participant-names');
    // notificationList.notificationDetails = ;
    console.log("ok", notificationList)
    return notificationList;


    
}
chrome.tabs.query({
  currentWindow: true
}, tabs => {
  console.log('tabs',tabs)
  // ...and send a request for the DOM info...
  tabs.forEach( (tabEach, index)=>{
    // let tabInfo = await chrome.tabs.get(tabEach.id);

    console.log("info",tabEach);
    try{
      if(tabEach.url.includes('linkedin')){
        chrome.scripting
        .executeScript({
          target : {tabId : tabEach.id},
          func : notificationUpdates,
        })
        .then((result) => {
          console.log("injected a function", result)
          setDOMInfo(result[0].result)
         })
      }
      
    } catch(error){
      console.log("err",error)
    }
   
window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
   
        console.log("page")
        // chrome.tabs.sendMessage(
        //   tabEach.id,
        //   {from: 'popup', tabs},
        //   // ...also specifying a callback to be called 
        //   //    from the receiving end (content script).
        //   function (response){
        //     if (!chrome.runtime.lastError) {
        //       // if you have any response
        //       setDOMInfo(response)
        //   } else {
        //       // if you don't have any response it's ok but you should actually handle
        //       // it and we are doing this when we are examining chrome.runtime.lastError
        //   }
           
        //   });
        // try { 
        //   const page = await chrome.runtime.getBackgroundPage()
        //   console.log("page",page)
        // } catch (error){
        //   console.log('err',error)
        // }
      
       
      })
     
    });
   
  });

const settings = document.getElementsByClassName('settings')
console.log("settings",settings)
settings[0]?.addEventListener('click',() => { 
  const newDiv = document.createElement('div')
  const newContent = document.createElement('div')
  const isExistRadio = document.getElementsByClassName('radio-select')
  if (!isExistRadio[0]){
    newDiv.classList.add("radio-select");
    const text = document.createTextNode("select notification by user only")
    const x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.setAttribute("id", "radio-notification");
    x?.addEventListener('click',(event)=>{
      console.log("event",event.target.checked)
      if (event.target.checked){
        chrome.storage.local.get(["info"]).then((result) => {
          const filterNotifications = result.info.filterNotifications
          
         document.querySelectorAll('.notification-list-item').forEach((el)=>el.remove())
         const notificationDDiv = document.createElement('div')
         console.log("filter",filterNotifications)
         filterNotifications &&filterNotifications.map((notificationItem)=>{
          console.log("inside filter",notificationItem)
          const newContent = document.createElement('div')
          newContent.classList.add("notification-list-item")
          const text = document.createTextNode(`${notificationItem}`)
          newContent.appendChild(text)
          notificationDDiv.appendChild(newContent);
          const br = document.createElement("br");
          
          br.classList.add("notification-list-item")
          notificationDDiv.appendChild(br)
        })
        const notificationDetailDiv = document.getElementById('notifications-details')
        notificationDetailDiv.appendChild(notificationDDiv)
         console.log("Value currently is " +  JSON.stringify(result.info.notificationDetails));

        });
      } else {
        document.querySelectorAll('.notification-list-item').forEach((el)=>el.remove())
        chrome.storage.local.get(["info"]).then((result) => {
          const notificationResult = result.info.notificationDetails
          const notificationDDiv = document.createElement('div')
          console.log("filter",notificationResult)
          notificationResult &&notificationResult.map((notificationItem)=>{
           console.log("inside filter",notificationItem)
           const newContent = document.createElement('div')
           newContent.classList.add("notification-list-item")
           const text = document.createTextNode(`${notificationItem}`)
           newContent.appendChild(text)
           notificationDDiv.appendChild(newContent);
           const br = document.createElement("br");
           br.classList.add("notification-list-item")
           notificationDDiv.appendChild(br)
         })
         const notificationDetailDiv = document.getElementById('notifications-details')
         notificationDetailDiv.appendChild(notificationDDiv)        })
          
      }
    })
    newContent.appendChild(text)
    newContent.appendChild(x)
    newDiv.appendChild(newContent);
    const br = document.createElement("br");
    newDiv.appendChild(br)
    const parent = document.getElementById('notifications-settings');
    parent.appendChild(newDiv);
  } else {
    document.querySelectorAll('.radio-select').forEach(e => e.remove());
  }
  
})

