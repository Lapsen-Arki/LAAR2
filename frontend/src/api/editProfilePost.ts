import axios from 'axios';

const saveUserData = async (userData, navigate) => {
  try {
    // Lisää tarkistus, että kaikki tarvittavat tiedot ovat saatavilla
    if (!userData.childName || !userData.birthdate || !userData.avatar || !userData.accessRights) {
      console.error('Kaikki tarvittavat tiedot eivät ole saatavilla');
      return;
    }

    // Lähetä POST-pyyntö backendiin tallentaaksesi tiedot
    const response = await axios.post('../backend/src/api/controllers/editProfile', userData);
    
    // Tarkista, että tallennus onnistui ja saat tarvittaessa vastauksen backendiltä
    if (response.data.message === 'Profiili päivitetty onnistuneesti') {
      console.log('Tiedot tallennettu onnistuneesti');
      // Ohjaa käyttäjä Profile.tsx -näkymään
      navigate('/profile', { replace: true });
    } else {
      console.error('Tallennus epäonnistui');
      // Voit näyttää virheilmoituksen käyttäjälle, jos tallennus epäonnistuu
    }
  } catch (error) {
    console.error('Tietojen tallennus epäonnistui', error);
    // Voit näyttää virheilmoituksen käyttäjälle, jos tallennus epäonnistuu
  }
};

export { saveUserData };
