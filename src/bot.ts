import { token, owners, mongo } from './config';
import Client from './client';

const client: Client = new Client({ token, owners });
client.start();

export default client;
