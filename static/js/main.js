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
let currentRoom = "";
let firstLoadMessages = true;
let oldMessagesArr = [];
const userColorArr = ["user-color1", "user-color2", "user-color3", "user-color4", "user-color5", "user-color6", "user-color7", "user-color8", "user-color9"]
let oldRoomId = "";

function getRoom(roomId) {

    let chatBoxWithMessages = document.getElementById("chats")
    let childMessages = chatBoxWithMessages.childNodes
    document.getElementById(`room${roomId}`).classList.add("active-room")
    if (oldMessagesArr.length !== childMessages.length) {
        console.log("odd")
        let objDiv = document.getElementById("chats");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    if (currentRoom !== roomId) {
        if (oldRoomId.length !== 0) {
            document.getElementById(`room${roomId}`).classList.add("active-room")
            document.getElementById(`room${oldRoomId}`).classList.remove("active-room")
        }
        oldRoomId = roomId
        clearTimeout(refresher)
        firstLoadMessages = true;
    }
    currentRoom = roomId;
    fetch(`/room/${roomId}`)
        .then((response) => response.json())
        .then((data) => {
            userArr = []
            chatBox.innerHTML = "";
            let counter = 0;
            oldMessagesArr = messageArr
            messageArr = []
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

                userInMessage.classList.add("user-color4")
                userInMessage.classList.add("font-bold")

                messageDiv.setAttribute("id", "messageDiv")
                chatBox.append(messageDiv);
                messageDiv.append(userInMessage)
                messageDiv.append(element)
                messageDiv.classList.add("shadow-lg")

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
let refreshTime = 800;

function refresherFun() {
    refresher = setTimeout(() => {
        getRoom(currentRoom)
    }, refreshTime)
}

// SEND MESSAGES
// ---------------------------------------------------------------------------------------------------------------------

function sendMessage() {
    let csrf_cookieValue = getCSRFToken();
    let message = document.getElementById("message-box").value
    if (message.length === 0) {
        return
    }
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
            const messageDelete = document.getElementById("message-box")
            messageDelete.value = "";
        })
        .catch((error) => {
            console.error('Error:', error);
            const messageDelete = document.getElementById("message-box")
            messageDelete.value = "";
        });
}
