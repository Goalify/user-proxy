import http from 'http';
import app from './app';

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running on port ${port}`);
});
