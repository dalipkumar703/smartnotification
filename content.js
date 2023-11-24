// const url = window.location.href
let notificationResult = {test:'ok'}
// function getNotificationList() {
//     const data = document.querySelectorAll('.notification-badge--show')
//     const notificationList = {connection: {}, messages: {}, notification: {}}
//     data.forEach((notificationItem)=>{
//         const identifyNode = notificationItem.children[1]
//         if (identifyNode.innerHTML.includes('network')){
//          notificationList.connection.value = notificationItem.children[0]?.innerText
//         }
//         if(identifyNode.innerHTML.includes('message')){
//           notificationList.messages.value = notificationItem.children[0]?.innerText

//         }
//         if(identifyNode.innerHTML.includes('notification')){
//           notificationList.notification.value = notificationItem.children[0]?.innerText

//         }
//     })
// return notificationList;
    
// }
// if(url.includes('linkedin')){
//     notificationResult = getNotificationList()
// }
console.log("running")
   // Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    console.log("msg",msg,sender)
    if ((msg.from === 'popup')) {
      
      // Collect the necessary data. 
      // (For your specific requirements `document.querySelectorAll(...)`
      //  should be equivalent to jquery's `$(...)`.)
    //       const newDiv = document.createElement("div");
    // result.forEach((item)=>{
    //     const newContent = document.createTextNode(item);
    
    //     // add the text node to the newly created div
    //     newDiv.appendChild(newContent);
    // })
  
      // Directly respond to the sender (popup), 
      // through the specified callback.
      response(notificationResult);
    }
  });
    //  create a new div element
   
    //  // and give it some content
     
    
    //  // add the newly created element and its content into the DOM
    //  const currentDiv = document.getElementById("emailVerify");
    //  document.body.insertBefore(newDiv, currentDiv);


