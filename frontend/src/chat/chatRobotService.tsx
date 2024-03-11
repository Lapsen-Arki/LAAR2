import axios from 'axios';
import { robotAnswers } from './robotAnswers';
import { Message } from '../types/typesFrontend';

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
  private async getWeatherForecast(city: string): Promise<string> {
    const apiKey = '6bd0bbdc51b704199932e3d3f9fa6f48';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    console.log('API URL:', apiUrl); // Debugging
  
    try {
      const response = await axios.get(apiUrl);
      const forecastData: Forecast[] = response.data.list;
  
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
  
      const organizedForecasts: { [key: string]: { time: string; description: string; temperature: number; }[] } = {};
  
      forecastData.forEach((forecast) => {
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
  
      // Lasketaan eri viikonpäivien lukumäärä
      //const uniqueWeekdays = Object.keys(organizedForecasts).length;
      //console.log('Eri viikonpäivien lukumäärä:', uniqueWeekdays);
      //console.log('Viikonpäivät:', Object.keys(organizedForecasts));
  
      let weeklyForecast = '';
      for (const day of Object.keys(organizedForecasts)) {
        weeklyForecast += `<b>${day}</b>:<br />`;
        const forecasts = organizedForecasts[day].map(forecast => `klo ${forecast.time}, ${forecast.description}, lämpötila: ${forecast.temperature}°C`).join('<br />');
        weeklyForecast += `${forecasts}<br /><br />`;
      }
  
      return `<br /><br /><big><b>6 päivän sääennuste:</b></big><br /><br />${weeklyForecast}`;
    } catch (error) {
      console.error('Error in getWeatherForecast:', error);
      return 'Anteeksi, en pysty tuomaan sääennustetta juuri nyt. Yritä myöhemmin uudelleen.';
    }
  }
  // Weather forecast data from the OpenWeatherMap API end


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

  if (/sää|weather/i.test(trimmedUserMessage)) {
    try {
      let weatherData;

      if (/tänään|today/i.test(trimmedUserMessage)) {
        weatherData = await this.getWeatherForecast('Helsinki today');
      } else {
        weatherData = await this.getWeatherForecast('Helsinki');
      }

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
      console.error('Error fetching weather data:', (error as Error).message)
      return undefined;
    }
  }

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