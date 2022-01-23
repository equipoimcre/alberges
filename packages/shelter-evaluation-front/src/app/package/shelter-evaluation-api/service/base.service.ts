import { environment } from "src/environments/environment";

export class BaseService {

  protected path: string | undefined;

  getUrl(uri: string) {
    return `${environment.api.shelterEvaluation.host}/${this.path}/${uri}`
  }
}