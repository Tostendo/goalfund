import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { auth, db } from "../config/firebase";
import { createUser, updateUser, getUser } from "../api/user";
import firebase from "firebase";
const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}
export const useAuth: any = () => {
  return useContext(authContext);
};
// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const signUp = async ({ username, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        sendVerificationMail();
        return createUser({
          uid: response.user.uid,
          email,
          username,
          emailVerified: false,
        });
      })
      .then((user) => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const update = async (updateData: any) => {
    console.info("user is: ", user, updateData);
    return updateUser(user, updateData)
      .then(() => {
        return getUser(user);
      })
      .then((user) => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signIn = async ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return getUser(response.user);
      })
      .then((user) => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signOut = async () => {
    setUser(false);
    return auth.signOut();
  };

  const sendPasswordResetEmail = async ({ email }) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  const sendVerificationMail = async () => {
    auth.currentUser.sendEmailVerification({
      url:
        process.env.NEXT_PUBLIC_VERIFICATION_REDIRECT_URL ||
        "http://localhost:3000/dashboard",
    });
  };

  const handleAuthStateChanged = async (user: firebase.User) => {
    if (user) {
      setUser(await getUser(user));
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) =>
          setUser({ ...doc.data(), emailVerified: user.emailVerified || false })
        );
      return () => unsubscribe();
    }
  }, []);
  return {
    user,
    update,
    signIn,
    signUp,
    signOut,
    sendVerificationMail,
    sendPasswordResetEmail,
  };
};
