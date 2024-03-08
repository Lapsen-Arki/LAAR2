import { robotAnswers } from './robotAnswers';
import { Message } from '../types/typesFrontend';

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

  public addUserMessageAndGenerateResponse(userMessage: string): void {
    //('Adding user message and generating response');
    if (userMessage.trim() !== "") {
      const response = this.generateResponse(userMessage);
      if (response && this.onMessageReceivedCallback) {
        //('Sending response to callback:', response);
        this.onMessageReceivedCallback(response);
      } else {
        //('No response generated or no callback set.');
      }
    } else {
      //('User message is empty.');
    }
  }

  private generateResponse(userMessage: string): Message | undefined {
    //('Generating response for user message:', userMessage);
    const trimmedUserMessage = userMessage.trim().toLowerCase();
    
    // Tulosta trimmedUserMessage varmistamaan, että se on odotetussa muodossa
    //('Trimmed user message:', trimmedUserMessage);

    // Tulosta robotAnswers-objektin avaimet, jotta voit tarkistaa, vastaako trimmedUserMessage odotettua avainta
    //('Robot answers keys:', Object.keys(robotAnswers));

    if (trimmedUserMessage in robotAnswers) {
        const responseMessage = robotAnswers[trimmedUserMessage];
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
    } else {
        //('No response generated for user message:', userMessage);

        // Jos ei vastausta, tulosta trimmedUserMessage ja robotAnswers avaimet 
        // varmistaaksesi, että olet määritellyt vastauksen odotetulle käyttäjäviestille

        //('Trimmed user message:', trimmedUserMessage);
        //('Robot answers keys:', Object.keys(robotAnswers));
    }
    return undefined;
  }
}

export default ChatRobotService;