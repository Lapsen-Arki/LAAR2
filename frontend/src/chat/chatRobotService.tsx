import { robotAnswers } from './robotAnswers';
import { Message } from '../types/typesFrontend';

class ChatRobotService {
  private onMessageReceivedCallback: ((response?: Message | Message[]) => void) | null = null;

  public setOnMessageReceived(callback: (response?: Message | Message[]) => void): void {
    console.log('Setting onMessageReceived callback');
    this.onMessageReceivedCallback = callback;
  }

  public clearOnMessageReceived(): void {
    console.log('Clearing onMessageReceived callback');
    this.onMessageReceivedCallback = null;
  }

  public addUserMessageAndGenerateResponse(userMessage: string): void {
    console.log('Adding user message and generating response');
    if (userMessage.trim() !== "") {
      const response = this.generateResponse(userMessage);
      if (response && this.onMessageReceivedCallback) {
        console.log('Sending response to callback:', response);
        this.onMessageReceivedCallback(response);
      } else {
        console.log('No response generated or no callback set.');
      }
    } else {
      console.log('User message is empty.');
    }
  }

  private generateResponse(userMessage: string): Message | undefined {
    console.log('Generating response for user message:', userMessage);
    const trimmedUserMessage = userMessage.trim().toLowerCase();
    
    // Tulosta trimmedUserMessage varmistamaan, että se on odotetussa muodossa
    console.log('Trimmed user message:', trimmedUserMessage);

    // Tulosta robotAnswers-objektin avaimet, jotta voit tarkistaa, vastaako trimmedUserMessage odotettua avainta
    console.log('Robot answers keys:', Object.keys(robotAnswers));

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
        console.log('Generated response:', response);
        return response;
    } else {
        console.log('No response generated for user message:', userMessage);
        // Jos ei vastausta, tulosta trimmedUserMessage ja robotAnswers avaimet 
        // varmistaaksesi, että olet määritellyt vastauksen odotetulle käyttäjäviestille
        console.log('Trimmed user message:', trimmedUserMessage);
        console.log('Robot answers keys:', Object.keys(robotAnswers));
    }
    return undefined;
  }
}

export default ChatRobotService;