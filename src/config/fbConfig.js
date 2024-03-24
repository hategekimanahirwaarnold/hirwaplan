import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Replace this with your own config details
var config = {
  apiKey: "your key",
  authDomain: "your domain",
  projectId: "your id",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true, merge: true });

export default firebase 
