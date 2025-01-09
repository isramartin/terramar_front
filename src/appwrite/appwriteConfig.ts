import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Cambia con tu endpoint
  .setProject("670e1fc7001519b1d314"); // Cambia con tu projectId

const account = new Account(client);

export { client, account };
