import { environment } from "src/environments/environment";

export class BaseService {

  getUrl(uri: string) {
    return `${environment.api.shelterEvaluation.host}/${uri}`
  }
}