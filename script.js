
const setDOMInfo = info => {
  console.log("item",info)


      const newDiv = document.createElement("div");
      newDiv.class= "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      info && ['connection','messages','notification'].forEach((item)=>{
        // const newContent = document.createTextNode(item);
      //   const newContent = document.createElement('a');
      // const linkText = document.createTextNode("Read More");
      // newContent.appendChild(linkText);
      // newContent.title = item.link;
      // newContent.class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      // newContent.href = item.link;
      // newContent.style = 'color:blue'
      // newContent.addEventListener('click', function(e) {
      //   // window.open(item,'_tab')
      //   e.preventDefault()
      //   e.stopPropagation();
      //   let handle = window.open(item.link);
      //   handle.blur();
      //   window.focus();
      //   // window.open(item,'_blank','noopener')
      // });
      // const textArr = item.link.split('/')
      // const textDesc = textArr[textArr.length - 1] ? textArr[textArr.length - 1].split('-').join(' ') :textArr[textArr.length - 2].split('-').join(' ')
      // console.log("text",textDesc)
      // const upperCaseTextDesc = textDesc.charAt(0).toUpperCase() + textDesc.slice(1);
      // const linkDesc = document.createTextNode(upperCaseTextDesc);
      //   // add the text node to the newly created div
      //   newDiv.appendChild(linkDesc)
        const newContent = document.createElement('div')
        const text = document.createTextNode(`${item}: ${info[item].value}`)
        newContent.appendChild(text)
        newDiv.appendChild(newContent);
        const br = document.createElement("br");
        newDiv.appendChild(br)
    })
    const currentDiv = document.getElementById('linkedin');
    const parent = document.getElementById('container');

    
  


    info && info.notificationDetails.map((notificationItem)=>{
      const newContent = document.createElement('div')
      const text = document.createTextNode(`${notificationItem}`)
      newContent.appendChild(text)
      newDiv.appendChild(newContent);
      const br = document.createElement("br");
      newDiv.appendChild(br)
    })


    info && info.messageDetails.map((messageItem)=>{
      const newContent = document.createElement('div')
      const text = document.createTextNode(`${messageItem}`)
      newContent.appendChild(text)
      newDiv.appendChild(newContent);
      const br = document.createElement("br");
      newDiv.appendChild(br)
    })
    parent.insertBefore(newDiv, currentDiv.nextSibling);
    
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
    const notificationList = {connection: {}, messages: {}, notification: {}, messageDetails:[], notificationDetails:[]}
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