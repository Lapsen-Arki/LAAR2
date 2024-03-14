import axios from 'axios';
import { robotAnswers } from './robotAnswers';
import { Message } from '../types/typesFrontend';
import * as stringSimilarity from 'string-similarity';



interface Forecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}


class ChatRobotService {
  private onMessageReceivedCallback: ((response?: Message | Message[]) => void) | null = null;

  public setOnMessageReceived(callback: (response?: Message | Message[]) => void): void {
    //('Setting onMessageReceived callback');
    this.onMessageReceivedCallback = callback;
  }

  public clearOnMessageReceived(): void {
    //('Clearing onMessageReceived callback');
    this.onMessageReceivedCallback = null;
  }
  
  // This method fetches weather forecast data from the OpenWeatherMap API
  private async getWeatherForecast(city: string, type: 'today' | 'week' = 'today'): Promise<string> {
    const apiKey = '6bd0bbdc51b704199932e3d3f9fa6f48';
    let apiUrl: string;

    // Tarkistetaan, löytyykö annettu kaupunki OpenWeatherMapin tietokannasta
    const cityExists = await this.checkCityExistence(city, apiKey);
  
    // Jos kaupunkia ei löydy, palautetaan virheviesti
    if (!cityExists) {
      return '<p>Anteeksi, annettua kaupunkia ei löydy. Ole hyvä ja tarkista kaupungin nimi.</p> <p>Käytäthän muotoa: "<b>sää kaupunki</b>" tai "<b>viikon sää kaupunki</b>".</p>';
    }
  
    if (type === 'today') {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=3`;
    } else if (type === 'week') {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    } else {
      throw new Error('Invalid type specified.');
    }
  
    //'API URL:', apiUrl);
  
    try {
      const response = await axios.get(apiUrl);
      const responseData = response.data;
  
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
  
      const todayDate = new Date().toLocaleDateString('fi-FI', { weekday: 'long' });
  
      let todayForecast = `Tässä on ${type === 'today' ? 'tämän päivän' : '6 päivän'} sää kaupungista ${city}:<br /><br />`;
  
      if (type === 'today') {
        responseData.list.forEach((forecast: Forecast) => {
          const date = new Date(forecast.dt * 1000);
          const weekday = new Intl.DateTimeFormat('fi-FI', { weekday: 'long' }).format(date);
          if (weekday === todayDate) {
            const time = new Intl.DateTimeFormat('fi-FI', { hour: 'numeric', minute: 'numeric' }).format(date);
            const weatherDescription = forecast.weather[0].description;
            const translatedWeather = weatherTranslations[weatherDescription] || weatherDescription;
            const temperature = forecast.main.temp;
            todayForecast += `${time}: ${translatedWeather}, lämpötila: ${temperature}°C<br />`;
          }
        });
      } else if (type === 'week') {
        const organizedForecasts: { [key: string]: { time: string; description: string; temperature: number; }[] } = {};
  
        responseData.list.forEach((forecast: Forecast) => {
          const date = new Date(forecast.dt * 1000);
          const weekday = new Intl.DateTimeFormat('fi-FI', { weekday: 'long' }).format(date);
          const time = new Intl.DateTimeFormat('fi-FI', { hour: 'numeric', minute: 'numeric' }).format(date);
  
          const weatherDescription = forecast.weather[0].description;
          const translatedWeather = weatherTranslations[weatherDescription] || weatherDescription;
          const temperature = forecast.main.temp;
  
          if (!organizedForecasts[weekday]) {
            organizedForecasts[weekday] = [];
          }
  
          organizedForecasts[weekday].push({ time, description: translatedWeather, temperature });
        });
  
        for (const day of Object.keys(organizedForecasts)) {
          todayForecast += `${day}:<br />`;
          const forecasts = organizedForecasts[day].map(forecast => `${forecast.time}, ${forecast.description}, lämpötila: ${forecast.temperature}°C`).join('<br />');
          todayForecast += `${forecasts}<br /><br />`;
        }
      }
  
      return todayForecast;
    } catch (error) {
      console.error('Error in getWeatherForecast:', error);
      return '<p>Anteeksi, en pysty tuomaan sääennustetta juuri nyt. Yritä myöhemmin uudelleen.<br /> Voit myös ottaa yhteyttä info@lapsen-arki.fi.<br /> Kiitos kärsivällisyydestä!</p>';
    }
  }
  // Weather forecast data from the OpenWeatherMap API end
  // tarkistetaan kaupunki
  private async checkCityExistence(city: string, apiKey: string): Promise<boolean> {
    let cityExists = false;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
      // Tarkistetaan, onko vastaus onnistunut ja löytyykö kaupunki
      cityExists = response.status === 200;
    } catch (error) {
      // Jos tulee virhe, kaupunkia ei löydy
    }
    return cityExists;
  }


  public async addUserMessageAndGenerateResponse(userMessage: string): Promise<void> {
    //('Adding user message and generating response');
    if (userMessage.trim() !== "") {
      const response = await this.generateResponse(userMessage);
      if (response && this.onMessageReceivedCallback) {
        const resolvedResponse = await Promise.resolve(response) as Message | Message[]; 
         // If response is a single Message, wrap it in an array
      const messagesToSend = Array.isArray(resolvedResponse) ? resolvedResponse : [resolvedResponse];
      //('Sending response to callback:', messagesToSend);
      this.onMessageReceivedCallback(messagesToSend);
        
      }
    } 
  }




  private async generateResponse(userMessage: string): Promise<Message | undefined> {
    //('Generating response for user message:', userMessage);
    const trimmedUserMessage = userMessage.trim().toLowerCase();

    // Check if there is a direct response for the trimmed user message
    if (robotAnswers[trimmedUserMessage]) {
      const responseMessage = robotAnswers[trimmedUserMessage];
      const response: Message = {
        id: Date.now().toString(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User",
        message: responseMessage,
        text: `LAAR Chattirobotti: ${responseMessage}`,
        timestamp: new Date(),
        isUser: false,
      };
      return response;
    }


     // Iterate over the keys of robotAnswers and check for keywords
     for (const keyword of Object.keys(robotAnswers)) {
      if (trimmedUserMessage.includes(keyword.toLowerCase())) {
        const responseMessage = robotAnswers[keyword];
        const response: Message = {
            id: Date.now().toString(),
            senderId: "LAAR Chattirobotti",
            receiverId: "User",
            message: responseMessage,
            text: `LAAR Chattirobotti: ${responseMessage}`,
            timestamp: new Date(),
            isUser: false
        };
        //('Generated response:', response);
        return response;
    } 
  }
  

// Iterate over the keys of robotAnswers and check for keywords
const userKeywords = Object.keys(robotAnswers);
const matches = stringSimilarity.findBestMatch(trimmedUserMessage.toLowerCase(), userKeywords.map(k => k.toLowerCase()));

if (matches.bestMatch.rating > 0.5) {
  const bestMatchKeyword = userKeywords[matches.bestMatchIndex];
  const responseMessage = robotAnswers[bestMatchKeyword];
  const response: Message = {
    id: Date.now().toString(),
    senderId: "LAAR Chattirobotti",
    receiverId: "User",
    message: responseMessage,
    text: `LAAR Chattirobotti: ${responseMessage}`,
    timestamp: new Date(),
    isUser: false,
  };
  return response;
}

  // SÄÄ JATKUU
  if (/sää|weather/i.test(trimmedUserMessage)) {
    try {
      let city = 'Helsinki';
      let type: 'today' | 'week' = 'today';
  
      const cityMatch = trimmedUserMessage.match(/sää (.+)/i);
      const typeMatch = trimmedUserMessage.match(/(tänään|today|viikon|week)/i);
      if (cityMatch && cityMatch[1]) {
        city = cityMatch[1];
      }
      if (typeMatch && /viikon|week/i.test(typeMatch[1])) {
        type = 'week';
      }
  
      const weatherData = await this.getWeatherForecast(city, type);
  
      const response: Message = {
        id: Date.now().toString(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User",
        message: weatherData,
        text: `LAAR Chattirobotti: ${weatherData}`,
        timestamp: new Date(),
        isUser: false,
      };
      return response;
    } catch (error) {
      console.error('Error handling weather request:', error);
      return;
    }
  }
// SÄÄ LOPPUU

    // Handle the case when no specific keyword is matched
    const defaultResponseMessage = 'En ymmärtänyt kysymystäsi. Voisitko kertoa lisää?';
    const defaultResponse: Message = {
      id: Date.now().toString(),
      senderId: "LAAR Chattirobotti",
      receiverId: "User",
      message: defaultResponseMessage,
      text: `LAAR Chattirobotti: ${defaultResponseMessage}`,
      timestamp: new Date(),
      isUser: false,
    };
    return defaultResponse;
  }

} 
export default ChatRobotService;