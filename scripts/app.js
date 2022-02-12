// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateName = document.querySelector('.new-name');
const notif = document.querySelector('.update-mssg');
const roomButton = document.querySelector('.chat-rooms');

//update chat room
roomButton.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// check localstorage for names
const username = localStorage.username ? localStorage.username : 'anonysous';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// loading messages to the dom
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message);
    newChatForm.reset();
});

// update name
updateName.addEventListener('submit', e => {
    e.preventDefault();
    const newName = updateName.name.value.trim();
    chatroom.updateName(newName);
    updateName.reset();
    notif.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => notif.innerText = '', 3000)
});

// get chats & render
chatroom.getChats(data => chatUI.render(data));