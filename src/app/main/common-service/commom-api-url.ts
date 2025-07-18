export class BaseAPIUrl {

    // localUrl: string = "https://backend.faiop.com/apis/"
    // stagingUrl: string = "https://backend.faiop.com/apis/"
    // productionUrl: string = "https://backend.faiop.com/apis/";
    localUrl: string = "http://localhost/apis/"
    stagingUrl: string = "http://localhost/apis/"
    productionUrl: string = "http://localhost/apis/";
    constructor() { }

    getUrl(urlType: number) {
      if (urlType == 1) {
        return this.localUrl
      } else if (urlType == 2) {
        return this.stagingUrl
      } else {
        return this.productionUrl
      }
    }
  }

  export const baseURLType: number = 3
