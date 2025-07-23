import { io } from "socket.io-client";
import SERVER_URL from "./SERVER_URL"
export const socket = io(`https://${SERVER_URL}`);
