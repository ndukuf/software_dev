const list = document.getElementsByClassName("list")[0];
const newReminder = document.getElementById("newReminder");

// Create reminder function (Template Card)
function createReminder(id, message) {
    // Error handling
    if (message && message.length > 45) {
        alert("We only support 45 characters");
        return;
    } else if (!message) {
        alert("Please enter a Reminder");
        return;
    }

    const li = document.createElement("li");
    li.id = id;
    li.className = "reminder";
    const div = document.createElement("div");
    div.className = "text";
    div.innerText = message;

    // Actions container
    const actionContainer = document.createElement("div");
    actionContainer.className = "actions";

    // Have the check and delete buttons
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn-check";
    checkBtn.innerText = "Checked";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.innerText = "Delete";

    // Events handler functions
    checkBtn.addEventListener("click", function () {
        if (li.id == id) {
            div.style.textDecoration = "line-through";
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (li.id == id) {
            list.removeChild(li);
            
            // Send AJAX request to delete reminder from the database
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "delete_reminder.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Reminder deleted successfully");
                } else {
                    console.log("Error deleting reminder");
                }
            };
            xhr.send("id=" + id);
        }
    });

    // Append the buttons for actions
    actionContainer.appendChild(checkBtn);
    actionContainer.appendChild(deleteBtn);
    // Append all the elements in Li
    li.appendChild(div);
    li.appendChild(actionContainer);

    return li;
}

newReminder.addEventListener("click", function () {
    let message = prompt("Please enter a Reminder");
    let id = Math.floor(Math.random() * 100);
    let reminder = createReminder(id, message);
    list.appendChild(reminder);

    // Send AJAX request to insert reminder into the database
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert_reminder.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Reminder added successfully");
        } else {
            console.log("Error adding reminder");
        }
    };
    xhr.send("message=" + message);
});
