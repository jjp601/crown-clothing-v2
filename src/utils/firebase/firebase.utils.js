import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwKKD9AVKalD-00K2I4WJCH7Qs-qyma4k",
  authDomain: "crown-clothing-v2-db.firebaseapp.com",
  projectId: "crown-clothing-v2-db",
  storageBucket: "crown-clothing-v2-db.appspot.com",
  messagingSenderId: "746815471986",
  appId: "1:746815471986:web:c37cd2416051295f6a1deb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            })
        } catch (err) {
            console.log('Error creating the user', err.message);
        }
    }

    return userDocRef;
}