import { environment } from '../environments/environment';
console.log('ENV', environment);
export default {
  api: environment.api
}