import { Message } from "../types/typesFrontend";
import axios from 'axios';
import { saveToSessionStorage, loadFromSessionStorage } from './storageUtils';



// Define the forecast interface
interface Forecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

class ChattirobottiService {
  private onMessageReceived: (messages: Message | Message[]) => void;
  private incomingMessageHandler: (() => void) = () => {};

  constructor() {
    this.onMessageReceived = () => {};
  }

  
  
 // public setIncomingMessageHandler(callback: () => void) {
 //   this.incomingMessageHandler = callback;
 // }
  
  public receiveMessage() {
    this.incomingMessageHandler();
  }

  public setOnMessageReceived(callback: (response?: Message | Message[]) => void) {
    this.onMessageReceived = callback;
  }

  public clearOnMessageReceived() {
    this.onMessageReceived = () => {};
  }

  public handleSingleMessage(messages: Message | Message[]) {
    if (Array.isArray(messages)) {
      messages.forEach((message) => this.onMessageReceived(message));
    } else {
      this.onMessageReceived(messages);
    }
  }

 public handleIncomingMessages(callback: () => void) {
    this.incomingMessageHandler = callback;
  }

  private saveMessagesToSessionStorage(messages: Message[]) {
    saveToSessionStorage('chatMessages', messages);
  }

  private loadMessagesFromSessionStorage(): Message[] {
    const storedMessages = loadFromSessionStorage('chatMessages') || [];
    return storedMessages;
  }

  public async addUserMessageAndGenerateResponse(text: string): Promise<Message> {
    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: 'User1',
      receiverId: 'LAAR Chattirobotti',
      message: text,
      text: `Käyttäjä: ${text}`,
      isUser: true,
      timestamp: new Date(),
    };

    // Generate a response based on the user's message
    console.log('Generating response based on user input:', text);
    const response = await this.generateResponseBasedOnUserInput(text);
    console.log('Generated response:', response);

    // Add user message to sessionStorage
    const storedMessages = this.loadMessagesFromSessionStorage();
    storedMessages.push(userMessage, response);
    this.saveMessagesToSessionStorage(storedMessages);


     // Log stored messages
  console.log('Stored messages in sessionStorage:', storedMessages);

    // Check if onMessageReceived is defined before calling it
    if (this.onMessageReceived) {
      // Call onMessageReceived with the user message and the generated response
      this.onMessageReceived([userMessage, response]);
    }

   

    return response;
  }


  
  // Method to fetch weather forecast data from the OpenWeatherMap API

  public async getWeatherForecast(city: string, userInput: string): Promise<string> {
    const apiKey = 'ae3540e7b39c73afea67013f29e7cf71';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await axios.get(apiUrl);
      const forecastData: Forecast[] = response.data.list;
  
      // Mapping of English weather descriptions to Finnish translations
      const weatherTranslations: { [key: string]: string } = {
        'clear sky': 'selkeä taivas',
        'few clouds': 'muutamia pilviä',
        'scattered clouds': 'hajanaisia pilviä',
        'broken clouds': 'pilvien seassa',
        'overcast clouds': 'pilvinen',
        'light rain': 'kevyt sade',
        'moderate rain': 'kohtalainen sade',
        'heavy rain': 'rankka sade',
        'light snow': 'kevyt lumisade',
        'moderate snow': 'kohtalainen lumisade',
        'heavy snow': 'runsas lumisade',
        'thunderstorm': 'ukonilma',
      };
  
      // Organize forecasts by weekdays
      const organizedForecasts: { [key: string]: { description: string; temperature: number }[] } = {};
  
      forecastData.forEach((forecast) => {
        
        const date = new Date(forecast.dt * 1000); // Convert timestamp to milliseconds
        const weekday = new Intl.DateTimeFormat('fi-FI', { weekday: 'long' }).format(date);
  
        const weatherDescription = forecast.weather[0].description;
        const translatedWeather = weatherTranslations[weatherDescription] || weatherDescription;
        const temperature = forecast.main.temp;
  
        if (!organizedForecasts[weekday]) {
          organizedForecasts[weekday] = [];
        }
  
        organizedForecasts[weekday].push({ description: translatedWeather, temperature });
      });
      if (/tänään/i.test(userInput)) {

        // User asked about today's weather
        const today = new Intl.DateTimeFormat('fi-FI', { weekday: 'long' }).format(new Date());
        const todayForecast = organizedForecasts[today];
        if (todayForecast && todayForecast.length > 0) {
          return `Tänään: ${todayForecast.map(forecast => `${forecast.description}, lämpötila: ${forecast.temperature}°C`).join('\n')}`;
        } else {
          return 'Tiedot tänään säästä eivät ole saatavilla.';
        }
      } else {
        
      // Combine the organized forecasts into a single string with line breaks
      const weeklyForecast = Object.keys(organizedForecasts)
        .map(day => `${day}: ${organizedForecasts[day].map(forecast => `${forecast.description}, lämpötila: ${forecast.temperature}°C`).join('\n')}`)
        .join('\n');
  
      return `Viikon sääennuste:\n${weeklyForecast}`;
    } 
    } catch (error) {
      
      return 'Anteeksi, en pysty tuomaan sääennustetta juuri nyt. Yritä myöhemmin uudelleen.';
    }
  }
  
 

private async generateResponseBasedOnUserInput(userInput: string | { message: string }): Promise<Message> {
  let userMessage: string;

  // Check if userInput is an object and has a 'message' property
  if (typeof userInput === 'object' && userInput.message) {
    console.log('Received user message object:', userInput);

    // Extract the message property
    userMessage = userInput.message;
  } else if (typeof userInput === 'string') {
    // If userInput is a string, use it as is
    userMessage = userInput;
  } else {
    console.error('Invalid user input. Expected string or { message: string }.');

    // Provide a default response or handle the case as needed
    return {
      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Default response: Invalid user input.',
      text: 'LAAR Chattirobotti: Default response: Invalid user input.',
      isUser: false,
      timestamp: new Date(),
    };
  }

  // Now you can safely use toLowerCase on userMessage
  const lowerCaseInput = userMessage.toLocaleLowerCase('fi-FI');

  console.log('Lowercased User Input:', lowerCaseInput);

  if (lowerCaseInput.includes('ruoka')) {
    console.log('Handling the "ruoka" condition');

    // Additional logs to check the flow
    console.log('Generating response for "ruoka"...');
  
    // Handle the 'ruoka' condition
    return {

      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Tässä on joitain terveellisiä ruokavaihtoehtoja lapsille: hedelmät, vihannekset, täysjyväviljat ja maitotuotteet. Niiden kasvun kannalta on välttämätöntä tarjota tasapainoinen ruokavalio.',
      text: 'LAAR Chattirobotti: Tässä on joitain terveellisiä ruokavaihtoehtoja lapsille: hedelmät, vihannekset, täysjyväviljat ja maitotuotteet. Niiden kasvun kannalta on välttämätöntä tarjota tasapainoinen ruokavalio.',
      isUser: false,
      timestamp: new Date(),
    };
  } else if (/sää/i.test(lowerCaseInput)) {
    // Handle the 'sää' condition
    const cityMatch = lowerCaseInput.match(/\bsää\b(.+)/);
    const city = cityMatch ? cityMatch[1] : 'Helsinki';

    const weatherResponse = await this.getWeatherForecast(city, lowerCaseInput);
    return {

      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: weatherResponse,
      text: `LAAR Chattirobotti: ${weatherResponse}`,
      isUser: false,
      timestamp: new Date(),
    };
  } else if (lowerCaseInput.includes('terveys')) {
    // Handle the 'terveys' condition
    return {

      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Säännölliset terveystarkastukset ovat lapsille tärkeitä. Rokotukset, hammashoito ja näöntarkastukset ovat myös tärkeitä. Edistä terveellisiä tapoja ja opeta heille henkilökohtaista hygieniaa.',
      text: 'LAAR Chattirobotti: Säännölliset terveystarkastukset ovat lapsille tärkeitä. Rokotukset, hammashoito ja näöntarkastukset ovat myös tärkeitä. Edistä terveellisiä tapoja ja opeta heille henkilökohtaista hygieniaa.',
      isUser: false,
      timestamp: new Date(),
    };
  } else if (lowerCaseInput.includes('kasvatus')) {
    // Handle the 'kasvatus' condition
    return {

      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Positiivinen vanhemmuus, rajojen asettaminen ja hyvä roolimalli ovat tärkeitä. Kannusta hyvään käytökseen ja anna opastusta. Myös viestintä ja laatuaika ovat tärkeitä.',
      text: 'LAAR Chattirobotti: Positiivinen vanhemmuus, rajojen asettaminen ja hyvä roolimalli ovat tärkeitä. Kannusta hyvään käytökseen ja anna opastusta. Myös viestintä ja laatuaika ovat tärkeitä.',
      isUser: false,
      timestamp: new Date(),

    };
  } else if (lowerCaseInput.includes('lelut')) {
    // Handle the 'lelut' condition
    return {

      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Lelut ovat tärkeitä lapsen kehitykselle. Ne voivat auttaa heitä oppimaan ja kehittymään. Valitse leluja, jotka ovat turvallisia ja sopivia lapsen ikään.',
      text: 'LAAR Chattirobotti: Lelut ovat tärkeitä lapsen kehitykselle. Ne voivat auttaa heitä oppimaan ja kehittymään. Valitse leluja, jotka ovat turvallisia ja sopivia lapsen ikään.',
      isUser: false,
      timestamp: new Date(),
    };
  } else if (lowerCaseInput.includes('leikit')) {
    // Handle the 'leikit' condition
    return {
      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'gameRecommendations',
      text: 'LAAR Chattirobotti: Tässä muutamia leikkejä lapsille: piiloleikki, pallopelejä, askartelu ja lautapelit. Valitse lapsesi mieltymysten mukaan ja varmista, että leikit ovat turvallisia ja ikäryhmälle sopivia.',
      isUser: false,
      timestamp: new Date(),
    };
  } else if (lowerCaseInput.includes('moikka')) {
    // Handle the 'moikka' condition
    return {

      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Kiitos keskustelusta ja mukavaa päivänjatkoa!',
      text: 'LAAR Chattirobotti: Kiitos keskustelusta ja mukavaa päivänjatkoa!',
      isUser: false,
      timestamp: new Date(),
    };
  } else if (lowerCaseInput.includes('kiitos')) {
    // Handle the 'kiitos' condition
    return {
      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: 'Ole hyvä! Miten muuten voin auttaa sinua?',
      text: 'LAAR Chattirobotti: Ole hyvä! Miten muuten voin auttaa sinua?',
      isUser: false,
      timestamp: new Date(),
    };
  } else if (lowerCaseInput.includes('profiili')) {
    // Handle the 'create new profile' condition
    
    const profileCreationLink = 'https://lapsen-arki.fi/profile';
    
    return {
        id: Date.now().toString(),
        senderId: 'LAAR Chattirobotti',
        receiverId: 'User1',
        message: `Tietysti! Luodaksesi uuden profiilin, käy profiilin luomissivullamme: [${profileCreationLink}]`,
        text: `LAAR Chattirobotti: Tietysti! Luodaksesi uuden profiilin, käy profiilin luomissivullamme: [${profileCreationLink}]`,
        isUser: false,
        timestamp: new Date(),
    };
} else if (lowerCaseInput.includes('lasten rokotusohjelma')) {
  // Handle the 'lasten rokotusohjelma' condition

  let age = 'kaikki ikäryhmät';
  if (lowerCaseInput.includes('2 kk')) {
      age = '2 kk';
  } else if (lowerCaseInput.includes('3 v')) {
      age = '3 v';
  } else if (lowerCaseInput.includes('5 v')) {
      age = '5 v';
  } else if (lowerCaseInput.includes('12 kk')) {
      age = '12 kk';
  } else if (lowerCaseInput.includes('12–18 kk')) {
      age = '12–18 kk';
  } else if (lowerCaseInput.includes('6 kk–6 v')) {
      age = '6 kk–6 v';
  } else if (lowerCaseInput.includes('1,5-11 v')) {
      age = '1,5-11 v';
  } else if (lowerCaseInput.includes('4 v')) {
      age = '4 v';
  } else if (lowerCaseInput.includes('6 v')) {
      age = '6 v';
  } 

const introText = `Tässä taulukossa näet tämänhetkisen Suomen kansallisen rokotusohjelman.

Rokotusohjelmaa noudattamalla lapsi saa suojan useita vakavia tauteja vastaan. 
Rokotusohjelma on suunniteltu suojaamaan lapsia ja nuoria vakavilta taudeilta ja niiden jälkitaudeilta. 
Rokotusohjelma on maksuton ja sen tarkoituksena on suojata lapsia ja nuoria vakavilta taudeilta ja niiden jälkitaudeilta.`;


const vaccinationSchedule = `


| Ikä           | Rok. Lyhenne | Suoj. Tauti                                                                                                      |
|:-------------:|:------:|
| 2 kk          | RV           | Rotavirusripuli                                                                                                  |
| 3 kk          | PCV          | Pneumokokkibakteerin aiheuttama aivokalvontulehdus, keuhkokuume, verenmyrkytys ja korvatulehdus                  |
| 3 kk          | RV           | Rotavirusripuli                                                                                                  |
| 3 kk          | DTaP-IPV-Hib  | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio ja Hib-taudit, kuten aivokalvontulehdus, kurkunkannen tulehdus ja verenmyrkytys |
| 5 kk          | PCV          | Pneumokokkibakteerin aiheuttama aivokalvontulehdus, keuhkokuume, verenmyrkytys ja korvatulehdus                  |
| 5 kk          | RV           | Rotavirusripuli                                                                                                  |
| 5 kk          | DTaP-IPV-Hib  | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio ja Hib-taudit, kuten aivokalvontulehdus, kurkunkannen tulehdus ja verenmyrkytys |
| 12 kk         | PCV          | Pneumokokkibakteerin aiheuttama aivokalvontulehdus, keuhkokuume, verenmyrkytys ja korvatulehdus                  |
| 12 kk         | DTaP-IPV-Hib  | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio ja Hib-taudit, kuten aivokalvontulehdus, kurkunkannen tulehdus ja verenmyrkytys |
| 12 - 18 kk    | MPR          | Tuhkarokko, sikotauti, vihurirokko                                                                               |
| 6 kk - 6 v    | Influenssa   | Kausi-influenssa (vuosittain)                                                                                    |
| 1,5-11 v      | VAR          | Vesirokko                                                                                                        |
| 4 v           | DTaP-IPV     | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio                                                                    |
| 6 v           | MPRV         | Tuhkarokko, sikotauti, vihurirokko, vesirokko                                                                    |

  `;

  return {
      id: Date.now().toString(),
      senderId: 'LAAR Chattirobotti',
      receiverId: 'User1',
      message: introText  +  vaccinationSchedule,
      text: `LAAR Chattirobotti: Lasten Rokotusohjelma (${age})\n${introText}${vaccinationSchedule}`,
      isUser: false,
      timestamp: new Date(),
  };
}




  // Default response if no specific topic is identified
  return {
    id: Date.now().toString(),
    senderId: 'LAAR Chattirobotti',
    receiverId: 'User1',
    message: `Moi, Miten voin auttaa sinua parhaiten?`,
    text: `LAAR Chattirobotti: Moi, Miten voin auttaa sinua parhaiten?`,
    isUser: false,
    timestamp: new Date(),
  };
}
}
export default ChattirobottiService;