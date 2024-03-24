/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello From Hirwa Arnold!");
});

const createNotification = ((notification) => {
    return admin.firestore.collection('notifications')
    .add(notification)
    .then(doc => console.log("notification added", doc));
})

exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc => {

        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(Notification)
})

exports.userJoined = functions.auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
            .doc(user.id).get().then(doc => {
                const newUser = doc.data();
                const notification = {
                    content: "Joined User",
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);
            })
})
