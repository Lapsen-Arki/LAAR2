import { Server, Socket, Namespace } from "socket.io";
import { Message } from "../../types/typesBackend";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
  // private chatCollection: CollectionReference<Message>;
  private io: Namespace;

  constructor(io: Server /* chatCollection: CollectionReference<Message> */) {
    this.io = io.of("/"); // Use the root namespace
    // this.chatCollection = chatCollection;

    this.setupWebSocket(); // Log a custom identifier or the name property
    console.log("Namespace identifier:", "chattirobotti");
  }

  private setupWebSocket() {
    this.io.on("connection", (socket: Socket) => {
      console.log("Client connected");

      socket.on("userMessage", async (text: string) => {
        console.log(`Received message from client: ${text}`);

        // Handle the user's message and generate a response
        const response = await this.addUserMessageAndGenerateResponse(
          text,
          socket
        );
        console.log("Response generated:", response);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  public async addUserMessageAndGenerateResponse(
    text: string,
    socket: Socket
  ): Promise<Message> {
    const userMessage: Message = {
      id: uuidv4(),
      senderId: "User1",
      receiverId: "LAAR Chattirobotti",
      message: text,
      text: `Käyttäjä: ${text}`,
      isUser: true,
      timestamp: new Date(),
    };

    // Generate a response based on the user's message
    const responsePromise: Promise<Message> =
      this.generateResponseBasedOnUserInput(text);
    const response = await responsePromise;
    // Emit a response to the connected clients
    socket.emit("chatMessage", response);

    // Add user message to Firestore collection
    // await addDoc(this.chatCollection, userMessage);

    return responsePromise;
  }

  public async getWeatherForecast(
    city: string,
    userInput: string
  ): Promise<string> {
    const apiKey = "ae3540e7b39c73afea67013f29e7cf71";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      const forecastData: Forecast[] = response.data.list;

      // Mapping of English weather descriptions to Finnish translations
      const weatherTranslations: { [key: string]: string } = {
        "clear sky": "selkeä taivas",
        "few clouds": "muutamia pilviä",
        "scattered clouds": "hajanaisia pilviä",
        "broken clouds": "pilvien seassa",
        "overcast clouds": "pilvinen",
        "light rain": "kevyt sade",
        "moderate rain": "kohtalainen sade",
        "heavy rain": "rankka sade",
        "light snow": "kevyt lumisade",
        "moderate snow": "kohtalainen lumisade",
        "heavy snow": "runsas lumisade",
        thunderstorm: "ukonilma",
      };

      // Organize forecasts by weekdays
      const organizedForecasts: {
        [key: string]: { description: string; temperature: number }[];
      } = {};

      forecastData.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000); // Convert timestamp to milliseconds
        const weekday = new Intl.DateTimeFormat("fi-FI", {
          weekday: "long",
        }).format(date);

        const weatherDescription = forecast.weather[0].description;
        const translatedWeather =
          weatherTranslations[weatherDescription] || weatherDescription;
        const temperature = forecast.main.temp;

        if (!organizedForecasts[weekday]) {
          organizedForecasts[weekday] = [];
        }

        organizedForecasts[weekday].push({
          description: translatedWeather,
          temperature,
        });
      });
      if (/tänään/i.test(userInput)) {
        // User asked about today's weather
        const today = new Intl.DateTimeFormat("fi-FI", {
          weekday: "long",
        }).format(new Date());
        const todayForecast = organizedForecasts[today];
        if (todayForecast && todayForecast.length > 0) {
          return `Tänään: ${todayForecast
            .map(
              (forecast) =>
                `${forecast.description}, lämpötila: ${forecast.temperature}°C`
            )
            .join("\n")}`;
        } else {
          return "Tiedot tänään säästä eivät ole saatavilla.";
        }
      } else {
        // Combine the organized forecasts into a single string with line breaks
        const weeklyForecast = Object.keys(organizedForecasts)
          .map(
            (day) =>
              `${day}: ${organizedForecasts[day]
                .map(
                  (forecast) =>
                    `${forecast.description}, lämpötila: ${forecast.temperature}°C`
                )
                .join("\n")}`
          )
          .join("\n");

        return `Viikon sääennuste:\n${weeklyForecast}`;
      }
    } catch (error: any) {
      console.error("Error fetching weather data:", error.message);
      return "Anteeksi, en pysty tuomaan sääennustetta juuri nyt. Yritä myöhemmin uudelleen.";
    }
  }

  private async generateResponseBasedOnUserInput(
    userInput: string | { message: string }
  ): Promise<Message> {
    let userMessage: string;

    // Check if userInput is an object and has a 'message' property
    if (typeof userInput === "object" && userInput.message) {
      console.log("Received user message object:", userInput);

      // Extract the message property
      userMessage = userInput.message;
    } else if (typeof userInput === "string") {
      // If userInput is a string, use it as is
      userMessage = userInput;
    } else {
      console.error(
        "Invalid user input. Expected string or { message: string }."
      );
      // Provide a default response or handle the case as needed
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message: "Default response: Invalid user input.",
        text: "LAAR Chattirobotti: Default response: Invalid user input.",
        isUser: false,
        timestamp: new Date(),
      };
    }

    // Now you can safely use toLowerCase on userMessage
    const lowerCaseInput = userMessage.toLocaleLowerCase("fi-FI");

    if (lowerCaseInput.includes("ruoka")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message:
          "Tässä on joitain terveellisiä ruokavaihtoehtoja lapsille: hedelmät, vihannekset, täysjyväviljat ja maitotuotteet. Niiden kasvun kannalta on välttämätöntä tarjota tasapainoinen ruokavalio.",
        text: "LAAR Chattirobotti: Tässä on joitain terveellisiä ruokavaihtoehtoja lapsille: hedelmät, vihannekset, täysjyväviljat ja maitotuotteet. Niiden kasvun kannalta on välttämätöntä tarjota tasapainoinen ruokavalio.",
        isUser: false,
        timestamp: new Date(),
      };
    } else if (/sää/i.test(lowerCaseInput)) {
      const cityMatch = lowerCaseInput.match(/\bsää\b(.+)/);
      const city = cityMatch ? cityMatch[1] : "Helsinki";

      const weatherResponse = await this.getWeatherForecast(
        city,
        lowerCaseInput
      );
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message: weatherResponse,
        text: `LAAR Chattirobotti: ${weatherResponse}`,
        isUser: false,
        timestamp: new Date(),
      };
    } else if (lowerCaseInput.includes("terveys")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message:
          "Säännölliset terveystarkastukset ovat lapsille tärkeitä. Rokotukset, hammashoito ja näöntarkastukset ovat myös tärkeitä. Edistä terveellisiä tapoja ja opeta heille henkilökohtaista hygieniaa.",
        text: "LAAR Chattirobotti: Säännölliset terveystarkastukset ovat lapsille tärkeitä. Rokotukset, hammashoito ja näöntarkastukset ovat myös tärkeitä. Edistä terveellisiä tapoja ja opeta heille henkilökohtaista hygieniaa.",
        isUser: false,
        timestamp: new Date(),
      };
    } else if (lowerCaseInput.includes("kasvatus")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message:
          "Positiivinen vanhemmuus, rajojen asettaminen ja hyvä roolimalli ovat tärkeitä. Kannusta hyvään käytökseen ja anna opastusta. Myös viestintä ja laatuaika ovat tärkeitä.",
        text: "LAAR Chattirobotti: Positiivinen vanhemmuus, rajojen asettaminen ja hyvä roolimalli ovat tärkeitä. Kannusta hyvään käytökseen ja anna opastusta. Myös viestintä ja laatuaika ovat tärkeitä.",
        isUser: false,
        timestamp: new Date(),
      };
    } else if (lowerCaseInput.includes("lelut")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message:
          "Lelut ovat tärkeitä lapsen kehitykselle. Ne voivat auttaa heitä oppimaan ja kehittymään. Valitse leluja, jotka ovat turvallisia ja sopivia lapsen ikään.",
        text: "LAAR Chattirobotti: Lelut ovat tärkeitä lapsen kehitykselle. Ne voivat auttaa heitä oppimaan ja kehittymään. Valitse leluja, jotka ovat turvallisia ja sopivia lapsen ikään.",
        isUser: false,
        timestamp: new Date(),
      };
    } else if (lowerCaseInput.includes("leikit")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message: "gameRecommendations",
        text: "LAAR Chattirobotti: Tässä muutamia leikkejä lapsille: piiloleikki, pallopelejä, askartelu ja lautapelit. Valitse lapsesi mieltymysten mukaan ja varmista, että leikit ovat turvallisia ja ikäryhmälle sopivia.",
        isUser: false,
        timestamp: new Date(),
      };
    } else if (lowerCaseInput.includes("moikka")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message: "Kiitos keskustelusta ja mukavaa päivänjatkoa!",
        text: "LAAR Chattirobotti: Kiitos keskustelusta ja mukavaa päivänjatkoa!",
        isUser: false,
        timestamp: new Date(),
      };
    } else if (lowerCaseInput.includes("kiitos")) {
      return {
        id: uuidv4(),
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message: "Ole hyvä! Miten muuten voin auttaa sinua?",
        text: "LAAR Chattirobotti: Ole hyvä! Miten muuten voin auttaa sinua?",
        isUser: false,
        timestamp: new Date(),
      };
    }

    // Default response if no specific topic is identified
    return {
      id: uuidv4(),
      senderId: "LAAR Chattirobotti",
      receiverId: "User1",
      message: `Moi, Miten voin auttaa sinua parhaiten?`,
      text: `LAAR Chattirobotti: Moi, Miten voin auttaa sinua parhaiten?`,
      isUser: false,
      timestamp: new Date(),
    };
  }
}

export default ChattirobottiService;
