import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const saveUserData = async (userData) => {
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
