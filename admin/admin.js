// Add your Firebase project configuration here
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
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
const saveMemoryButton = document.getElementById('save-memory');

// Listen for login state changes
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in, show the form
        adminFormContainer.style.display = 'none';
        memoryForm.style.display = 'block';
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

// Handle form submission
saveMemoryButton.addEventListener('click', (e) => {
    e.preventDefault();
    const date = document.getElementById('date-input').value;
    const title = document.getElementById('title-input').value;
    const body = document.getElementById('body-input').value;

    db.collection("memories").add({
        date: new Date(date),
        title: title,
        body: body,
        // You would add image upload logic here
    })
    .then((docRef) => {
        alert("Memory saved successfully!");
        document.getElementById('date-input').value = '';
        document.getElementById('title-input').value = '';
        document.getElementById('body-input').value = '';
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Failed to save memory.");
    });
});