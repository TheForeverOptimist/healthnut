"use server";

import {
  AzureKeyCredential,
  ChatRequestMessage,
  OpenAIClient,
} from "@azure/openai";

async function transcript(prevState: any, formData: FormData) {
  console.log("PREVIOUS STATE:", prevState);

  const id = Math.random().toString(36);

  if (
    process.env.AZURE_API_KEY === undefined ||
    process.env.AZURE_ENDPOINT === undefined ||
    process.env.AZURE_DEPLOYMENT_NAME === undefined ||
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined
  ) {
    console.error("Azure credentials not set");
    return {
      sender: "",
      response: "Azure credentials not set",
    };
  }

  const file = formData.get("audio") as File;

  if (file.size === 0) {
    return {
      sender: "",
      response: "No audio file provided",
    };
  }
  console.log(">>", file);

  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);

  //----- get audio transcription from Azure Whisper AI --- //

  const client = new OpenAIClient(
    process.env.AZURE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_API_KEY)
  );

  const result = await client.getAudioTranscription(
    process.env.AZURE_DEPLOYMENT_NAME,
    audio
  );

  console.log(`Transcription: ${result.text}`);

  //--- get chat completion --//

  const messages: ChatRequestMessage[] = [
    {
      role: "system",
      content:
        "You are a patient assistant that mirrors how a doctor would act named Ellie. In the first response to a user you will introduce yourself saying Hi, I'm Ellie! I'd like to send a special hello to the team at Sully, I'm here to help you create a pre-visit medical note. The subsequent response to the user will be a maximum of 2 questions to help craft a concise well structured pre-visit note for the physician with a detailed history of the patient. Your next and final response will be the medical note. If you feel you have enough information prior to asking all 4 questions to create an optimal medical note then generate the medical note. The final output should be a well structured pre-visit medical note for the physician. If the user asks follow up questions that are not related to crafting the medical note, reply with I'm here to help your physician create a medical note I cannot answer that. Always speak courteously and empathetically.",
    },
    {
      role: "user",
      content: result.text,
    },
  ];

  const completions = await client.getChatCompletions(
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME,
    messages,
    { maxTokens: 800 }
  );

  const response = completions.choices[0].message?.content;

  console.log(prevState.sender, "+++", result.text);

  return {
    sender: result.text,
    response: response,
    id,
  };
}

export default transcript;
