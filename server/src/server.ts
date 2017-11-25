import * as http from 'http';
import * as fs from 'fs';

import * as App from './express/server';
import { host, port} from './express/config';

export class Server {
  public port: number = port || 4400;
  public host: string = host || '127.0.0.1';
  public socket: string;

  public srv: http.Server;

  constructor(private app: any) {
    // this.host = <string> this.config.get('http.host');
    // this.socket = <string> this.config.get('http.socket');
  }
  public getListening() {
    return this.socket ? this.socket : this.host + ':' + this.port;
  }

  public run(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.srv = http.createServer(this.app);

      if (this.socket) {

        this.srv.listen(this.socket);
      } else {
        this.srv.listen(this.port, this.host);
      }

      this.srv.on('listening', () => {

        if (this.socket) {
          setTimeout(() => {
            fs.chmodSync(this.socket, 666);
          }, 1000);
        }

        resolve(this);
      });

      this.srv.on('error', (e: NodeJS.ErrnoException): void => {

        reject({ on: 'error', e });
        // this.close().then( () => {
        // 	resolve({on: 'error', e });
        // });
      });
    });
  }
}

const worker = new Server(App).run().catch((msg) => {
  console.error(msg);
}).then((server) => {
  console.log('Listening on ' + server.getListening());

});
