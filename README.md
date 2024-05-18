# 1. Introduction

In this assignment, several features have been developed for an interactive quiz app using React and Firebase. These features include log in functionality using Google authentication, live chat support and FAQs using Firebase Database and Firestore, and the hinting system.

# 2. Methodology

## Tech Stack

- React: a JavaScript library used for building user interfaces based on components.
- Bootstrap: a CSS framework used to style the application.
- Firebase: a platform that offers different services, like Google authentication, real-time database, and hosting. It is helpful for building the backend of the application.

## Features Developed

### 1. Login

The tickets I created for this feature are:

1. Create login page:

- Create a login component - add login.js inside src/components
- Define the basic structure of the component
- Import component into App.js
- Create a style file - add Login.css inside src/components
- Import the style into Login.js
- Define the style for the login component

2. Implement login functionality:

- Configure Google authentication in Firebase
- Import routing dependencies (Route, BrowserRouter, Routes) into App.js
- Import dependencies (GoogleAuthProvider, signInWithPopup, auth) into Login.js
- Write onClick function for the button in Login.js
- Write PublicRoute and PrivateRoute components to check if the user is authenticated and if so, then take users to the questions

3. Admin implementation:

- Create utils folder
- Create adminUtils.js
- Add ADMIN_UID const with the ID of the admin
- Create isAdmin function to check whether the ID of the user logged in is the same as the admin ID. If so, the function returns true.
- Send the user object to QuestionPage.js as prop from App.js
- Import isAdmin function into QuestionPage.js

### 2. Live Chat Support

The tickets I created for this feature are:

1. Implement video functionality:

- Inside HintsSection.js create 2 functions: handleVideoClick and handleCloseVideo
- Add the handleVideoClick function to onClick for each button
- Create a new component VideoSection.js in the src/components folder
- Create VideoSection.css file and import it into VideoSection.js
- Define the structure and the style of the VideoSection component
- Import VideoSection component into HintsSection.js
- Use conditional rendering to show the component and pass the handleCloseVideo function as a prop

2. Implement confused functionality:

- Create the html and style of the input to be shown when users click on Confused
- Create handleConfusedClick function to conditional render the text input
- Make sure that users can only send one message per video by querying the collection "Messages" in the database for messages with the same user id as the logged user and video id of the video clicked.
- Create handleCancelClick to clear and close the input
- Create handleSendClick to store the message in Firebase

3. Show message box:

- Create MessageBox component
- Conditionally render the component into QuestionPage.js based on the selected message and pass the necessary props (selectedMessage, user, handleMessageIconClick, isUserAdmin)
- Fetch replies from Firestore:
  - Inside the MessageBox component, use useEffect hook to fetch the replies for the selected message from the "replies" subcollection
  - Use onSnapshot listener to listen for real-time updates to the replies
  - Store the replies using the setReplies function
- In the JSX of the MessageBox component, map over the replies and render them
- Style the component and apply conditional styling to differentiate between user and admin replies

4. Implement reply functionality:

- Add input field and optional image upload to the MessageBox component
- Write handleReplyMessageChange function to handle the input changes
- Write handleImageUpload function to handle the image upload
- Write handleSendReply function to send the reply message to Firestore and update the message document to mark it as replied using the updateDoc function

### 3. FAQ Section

The tickets I created for this feature are:

1. Implement FAQ functionality:

- Create a new collection in Firestore called FAQs to store the frequently asked questions, including the answer , the video ID, and an optional image
- In the MessageBox component, add a button "Add to FAQ" next to each admin reply
- Create handleAddToFaq function to handle the click event of the button. Retrieve the answer, video ID, and image URL (if available), and create a new document in the FAQs collection using the addDoc function
- Create the FAQSection component to display the FAQs of a specific video and pass necessary props (videoID)
- Use the useEffect hook to fetch the FAQS from the collection based on the videoId and use the where clause to filter the FAQs
- Store the FAQs using the setFAQs function
- In the JSX map over the faqs array and render each faq displaying the answer and image
- Style the FAQ item
- In the VideoSection component, conditionally render the FAQSection component based on the presence of FAQs

### 4. Hinting System

The tickets I created for this feature are:

1. Add answer percentage:

- Update the Firestore data structure: within the "answers" subcollection add a new field called selectionCount to each answer document.
- Retrieve the selectionCount field value for each answer and calculate the total selection count in the getAnswers function in AnswerSection.js
- Write togglePercentage function
- Add Show Percentage button
- Add answer percentage next to the answers only when showPercentage is true

# 3. Evaluation

All the required features requested by the assignment have been successfully implemented. Users can log in using their Google accounts, send messages to the admin in the live chat, view FAQs and the answer percentage. The features seem to be working as intendend. However, the application still requires styling improvements. For example, the chat box currently has a basic style. Also, the video component has to be integrated with the actual video content and styled accordingly. At the moment, the video is represented by a placeholder grey box. Apart from the styling, it also requires more testing to cacth eventual bugs that have not been noticed during the development process.
The log in feature has been implemented using Google Authentication and sign in with pop up provided by Firebase. Once the user logs in, Firebase returns a token and the user data, which are then stored in the application.
The live chat and FAQs features have been implemented using Firebase real-time database. When a user sends a message for a video, the message is stored in the Firebase database with the user id, the video id, the text, the timestamp, a replied field that functions as a boolean flag, and the image url in case the user chooses to upload one along with their message, which is then stored in Firebase storage. When a user sends a message, the flag is set to false. This ensures that users cannot send other messages until they receive a reply. Once the admin replies to the question, the flag is updates to true and users are allowed to send other messages. If the user sending the message is the admin, they have the option to add their reply as an FAQ entry. The FAQ is then stored in the Firebase database with the video id, the answer text, and the image url (in case there is an image).
For the hinting system, an additional field has been added to each answer object in the database. This field keeps track of the number of times each answer has been selected by users. For testing purposes, a random number has been assigned to this field to simulate user selections. On the front end, the application retrieves the selection count for each answer and then calculates the percentage of users who have chosen each answer.
