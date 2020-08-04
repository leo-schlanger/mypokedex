import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../services/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@MyPokedex:token',
        '@MyPokedex:user',
      ]);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        if (!value.user) {
          throw new Error('user not found');
        }

        firebase
          .database()
          .ref(`users/${value.user.uid}`)
          .once('value', async (snapshot) => {
            const user: User = {
              id: snapshot.key || '',
              name: snapshot.val().name,
              email: snapshot.val().email,
              avatar_url: snapshot.val().avatar_url,
            };

            await AsyncStorage.multiSet([
              ['@MyPokedex:token', snapshot.val().email],
              ['@MyPokedex:user', JSON.stringify(user)],
            ]);

            setData({token: snapshot.val().email, user});
          });
      });
  }, []);

  const signOut = useCallback(async () => {
    await firebase.auth().signOut();

    await AsyncStorage.multiRemove(['@MyPokedex:token', '@MyPokedex:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@MyPokedex:user', JSON.stringify(user));

      firebase.database().ref(`users/${user.id}`).update({
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      });

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{user: data.user, loading, signIn, signOut, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
