
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpaSWPslUS5Bz8i8H1w3x-6HoY5iD5qno",
  authDomain: "gamezone-unifor.firebaseapp.com",
  projectId: "gamezone-unifor",
  storageBucket: "gamezone-unifor.firebasestorage.app",
  messagingSenderId: "881775091190",
  appId: "1:881775091190:web:2bc03c0ce720100025fbd7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "games"));
    const games = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Documento bruto:', data); 
      
      games.push({ 
        id: doc.id, 
        ...data,
        name: data.title,              
        platform: data.console,         
        image: data.imageUrl || data.imagemUrl || "", 
        brand: data.console,             
        category: data.category,
        oldPrice: data.price,            
        price: data.price,               
        description: data.description,
        releaseYear: data.releaseYear,
        stock: data.stock
      });
    });
    console.log('Jogos carregados do Firebase:', games);
    return games;
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    throw error;
  }
};

export { db };