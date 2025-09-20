//Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA8DV-mC-s-Vw9L3GqrK-xicVzvVyhr9tU",
    authDomain: "little-corner-3c73d.firebaseapp.com",
    projectId: "little-corner-3c73d",
    storageBucket: "little-corner-3c73d.appspot.com",
    messagingSenderId: "763428297149",
    appId: "1:763428297149:web:08e66d194dd8cc31281ad4",
    measurementId: "G-QS8NDFH6L5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const loginButton = document.getElementById('login-button');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const adminFormContainer = document.getElementById('admin-form-container');
const memoryForm = document.getElementById('memory-form');
const addMemoryForm = document.getElementById('add-memory-form');
const memorySelect = document.getElementById('memory-select');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');
const saveButton = document.getElementById('save-memory');

// Function to populate the dropdown for editing/deleting
function populateMemoryDropdown() {
    db.collection("memories").orderBy("date", "desc").get().then((querySnapshot) => {
        memorySelect.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const memory = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = `${memory.title} - ${memory.date.toDate().toLocaleDateString()}`;
            memorySelect.appendChild(option);
        });
    });
}

// Listen for login state changes
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in, show the form
        adminFormContainer.style.display = 'none';
        memoryForm.style.display = 'block';
        populateMemoryDropdown(); // Populate dropdown on login
    } else {
        // No user is signed in, show login form
        adminFormContainer.style.display = 'block';
        memoryForm.style.display = 'none';
    }
});

// Handle login
loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Logged in:", userCredential.user.email);
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Handle form submission (add/update memory)
addMemoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = document.getElementById('date-input').value;
    const title = document.getElementById('title-input').value;
    const body = document.getElementById('body-input').value;
    const docId = saveButton.dataset.docId;

    if (docId) {
        // Update existing memory
        db.collection("memories").doc(docId).update({
            date: new Date(date),
            title: title,
            body: body,
        })
        .then(() => {
            alert("Memory updated successfully!");
            addMemoryForm.reset();
            saveButton.textContent = 'Save Memory'; // Change button back
            delete saveButton.dataset.docId; // Remove doc ID
            populateMemoryDropdown(); // Refresh dropdown
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
            alert("Failed to update memory.");
        });
    } else {
        // Add new memory
        db.collection("memories").add({
            date: new Date(date),
            title: title,
            body: body,
        })
        .then(() => {
            alert("Memory saved successfully!");
            addMemoryForm.reset();
            populateMemoryDropdown(); // Refresh dropdown
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert("Failed to save memory.");
        });
    }
});


// Handle edit button click (load memory into form)
editButton.addEventListener('click', () => {
    const memoryId = memorySelect.value;
    db.collection("memories").doc(memoryId).get().then((doc) => {
        if (doc.exists) {
            const memory = doc.data();
            document.getElementById('date-input').value = memory.date.toDate().toISOString().split('T')[0];
            document.getElementById('title-input').value = memory.title;
            document.getElementById('body-input').value = memory.body;
            // Change save button to an update button
            saveButton.textContent = 'Update Memory';
            saveButton.dataset.docId = doc.id; // Store doc ID for updating
        }
    });
});

// Handle delete button click
deleteButton.addEventListener('click', () => {
    const memoryId = memorySelect.value;
    if (confirm("Are you sure you want to delete this memory?")) {
        db.collection("memories").doc(memoryId).delete().then(() => {
            alert("Memory deleted successfully!");
            populateMemoryDropdown(); // Refresh dropdown
        }).catch((error) => {
            console.error("Error removing document: ", error);
            alert("Failed to delete memory.");
        });
    }
});