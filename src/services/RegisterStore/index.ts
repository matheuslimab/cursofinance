import { app } from '../../config/firebase';
import { getFirestore, setDoc, doc, collection } from 'firebase/firestore';


interface TypeRegisterTransation {
    id: string;
    name: string;
    amount: string;
    description: string;
    category: {
        key: string;
        name: string;
        icon: string;
    };
    type: string;
    date: Date;
}

export default {

    storeTransation: async (data : TypeRegisterTransation) => {

        

        
    }

}