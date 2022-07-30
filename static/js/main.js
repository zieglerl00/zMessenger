// CSRF TOKEN
// ---------------------------------------------------------------------------------------------------------------------

function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, 10) == ('csrftoken' + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}

// GET MESSAGES FOR EACH ROOM AND REFRESH EVERY 0.5s
// ---------------------------------------------------------------------------------------------------------------------

const chatBox = document.getElementById("chats");
let currentRoom;

function getRoom(roomId) {
    if (currentRoom !== roomId) {
        clearTimeout(refresher)
    }
    currentRoom = roomId;
    fetch(`/room/${roomId}`)
        .then((response) => response.json())
        .then((data) => {
            userArr = []
            messageArr = []
            chatBox.innerHTML = "";
            let counter  = 0;
            JSON.parse(data.users).forEach(e => {
                userArr.push({
                    "username": e.fields.username,
                    "pk": e.pk
                })
            })
            JSON.parse(data.data).forEach(e => {
                let messageDiv = document.createElement("div")
                let element = document.createElement("p");
                let userInMessage = document.createElement("p")

                messageDiv.setAttribute("id", "messageDiv")
                chatBox.append(messageDiv);
                messageDiv.append(userInMessage)
                messageDiv.append(element)

                userInMessage.setAttribute("id", "userInMessage")
                userInMessage.innerText = userArr[counter].username

                element.setAttribute("id", "message");
                element.innerText = e.fields.message;

                messageArr.push(e.fields.message)
                counter += 1
            })
        })
        .then((data) => {
            refresherFun()
        })
}

let userArr = []
let messageArr = []
let refresher;
let refreshTime = 400;

function refresherFun() {
    refresher = setTimeout(() => {
        let objDiv = document.getElementById("chats");
        objDiv.scrollTop = objDiv.scrollHeight;
        getRoom(currentRoom)
    }, refreshTime)
}

// SEND MESSAGES
// ---------------------------------------------------------------------------------------------------------------------

function sendMessage() {
    let csrf_cookieValue = getCSRFToken();
    let message = document.getElementById("message-box").value
    fetch(`/send-message/${currentRoom}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_cookieValue,
        },
        body: JSON.stringify({
            "msg": message
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const textarea = document.getElementById("message-box");
textarea.addEventListener("keyup", (event) => {
    console.log(event.key)
})
