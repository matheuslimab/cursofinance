import { 
    createContext, 
    ReactNode, 
    useContext, 
    useState,
    useEffect
} from 'react';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo?: string;
    locale: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>; 
    signInWithApple(): Promise<void>;
    signWithFacebook(): Promise<void>;
    signOut(): Promise<void>;
    isLoading: boolean;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps){

    const [user, setUser] = useState<User>({} as User);
    const [isLoading, setIsLoading] = useState(true);

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: "354894892714137",
        responseType: ResponseType.Code
    });

    useEffect(() => {
        async function loadStorageDataUser() : Promise<void> {
            const userStoraged = await AsyncStorage.getItem('@artikoo:user'); 

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }

            setIsLoading(false);
        }

        loadStorageDataUser();
    }, []);


    async function signWithFacebook() {
        
        await promptAsync();

        console.log('REQUEST');
        console.log(request);
        console.log('-----------------------------------------')

        console.log('RESPONSE');
        console.log(response);
        console.log('-----------------------------------------')

    }

    async function signInWithGoogle() {

        try {
            
            // tipo de resposta = queremos o token para abrir uma sessão de login
            const RESPONSE_TYPE = 'token'; 
            const SCOPE = encodeURI('profile email');

            // EndPoint API Oauth2
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            // Start Session
            const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if(type == 'success'){

                const URI_USERINFO = "https://www.googleapis.com/oauth2/v1/userinfo";
                const response = await fetch(`${URI_USERINFO}?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();

                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    lastName: userInfo.family_name,
                    photo: userInfo.picture,
                    locale: userInfo.locale
                };

                setUser(userLogged);
                await AsyncStorage.setItem("@artikoo:user", JSON.stringify(userLogged));

            }

        } catch (error) {
            throw new Error(error as string);
        }

    } 

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if(credential){

                const nameUser = credential!.fullName?.givenName!;

                const userLogged = {
                    id: String(credential.user),
                    email: credential!.email!,
                    name: credential!.fullName?.givenName!,
                    lastName: credential!.fullName!.familyName!,
                    photo: `https://ui-avatars.com/api/?background=random&name=${encodeURI(nameUser)}`,
                    locale: 'pt-BR'
                }

                setUser(userLogged);
                await AsyncStorage.setItem("@artikoo:user", JSON.stringify(userLogged));
            }

        } catch (error) {
            throw new Error(error as string);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem("@artikoo:user");
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signInWithApple,
            signWithFacebook,
            signOut,
            isLoading
        }}>
            { children }
        </AuthContext.Provider>
    )
}


function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth};