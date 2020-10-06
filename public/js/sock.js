var name = names;
console.log(name);
let cook = document.cookie;
cook = cook.slice(4, cook.length)


const socket = io("http://localhost:3000", {
  query: {
    token: cook,
  },
});
let matchedname = undefined;
const chatContainer = document.querySelector("#messages");
const reqbutton = document.getElementById("sendrequest");

// Connection Event Handler
socket.on("connect", function () {
  console.log("Connected to server");
  socket.emit("joinRoom", {
    name: name,
  });
});

// Message Event Handler
socket.on("message", function (message) {
  console.log(message);
  const newNode = document.createElement("div");
  newNode.innerHTML = `<b>${message.name}:&nbsp;</b> ${message.text}`;
  document.getElementById("messages").appendChild(newNode);
  chatContainer.scrollTop = chatContainer.scrollHeight;

});

// User Left Event Handler
socket.on("user_left", disableChatBox);

function disableChatBox() {
  document.querySelector(".butt2").disabled = true;
  document.querySelector("textarea").disabled = true;
}

// Form Submission Event Handler

let message_input = document.getElementById("message_input");

document.getElementById("message_input_form").onsubmit = function (e) {
  e.preventDefault();
  let chattext = message_input.value.trim();
  if (chattext.length) {
    socket.emit("message", {
      name: name,
      text: chattext,
    });
  }
  document.getElementById("message_input").value = "";
};
message_input.value = "";
message_input.focus();

reqbutton.addEventListener("click", (e) => {
  e.preventDefault();
});
