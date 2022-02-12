// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAsPfJnbFpkbbqd9B-mkP31EYQDIh5-BdQ",
    authDomain: "modern-js-27837.firebaseapp.com",
    projectId: "modern-js-27837"
  });

  var db = firebase.firestore();

  class Chatroom {
    constructor(room, username){
      this.room = room;
      this.username = username;
      this.chats = db.collection('chats');
      this.unsub;
    }
    async addChat(message){
      // format a chat object
      const now = new Date();
      const chat = {
        message: message,
        username: this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
      };
      // save the chat document
      const response = await this.chats.add(chat);
      return response;
    }
    getChats(callback){
      this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type === 'added'){
              callback(change.doc.data());
            }
          });
      });
    }
    updateName(username){
      this.username = username;
      localStorage.setItem('username', username);
    }
    updateRoom(room){
      this.room = room;
      console.log('room updated');
      if(this.unsub){
        this.unsub();
      }
    }
  }