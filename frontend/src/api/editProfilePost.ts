import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/* 
I don't know what kind of format is userData
Please add typing, for now any 
- Esa
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
const saveUserData = async (userData: any) => {

  // React Hook "useNavigate" is called in function "saveUserData" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate(); // Alusta useNavigate

  try {
    // Lähetä POST-pyyntö backendiin tallentaaksesi tiedot
    const response = await axios.post('../backend/src/api/controllers/editProfile', userData);
    
    // Tarkista, että tallennus onnistui ja saat tarvittaessa vastauksen backendiltä
    if (response.data.message === 'Tallennus onnistui') {
      // Ohjaa käyttäjä Profile.tsx -näkymään
      navigate('/profile');
    }
  } catch (error) {
    console.error('Tietojen tallennus epäonnistui', error);
    // Voit näyttää virheilmoituksen käyttäjälle, jos tallennus epäonnistuu
  }
};

export { saveUserData };
