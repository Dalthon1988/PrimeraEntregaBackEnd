import app from './app.js';
import { init } from '../socket.js';

const PORT = 4040;

const httpServer = app.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)});

init (httpServer)
    console.log(`Server running in http://localhost:${PORT}`)
