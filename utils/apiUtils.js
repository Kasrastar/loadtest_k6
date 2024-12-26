import http from 'k6/http';

class URLGenerator {
    constructor(domain, protocol) {
      this.domain = domain;
      this.protocol = protocol;
    }
    
    buildQueryString(params) {
      if (!params || typeof params !== 'object' || Object.keys(params).length === 0) {
        return '';
      }
      return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    }

    generateURL(subdomain, path) {
      const url = `${this.protocol}://${subdomain}.${this.domain}${path}`;
      return url;
    }
  }


export class RequestGeneratorFactory {
  static createRequestGenerator(domain, protocol, product) {
    const {name, subdomain, path, payload } = product;
    const urlGeneratorObj = new URLGenerator(domain, protocol);

    // Here we handle URL generation for each type of product
    switch (name) {
      case 'tour':
        return new TourRequestGenerator(urlGeneratorObj, subdomain, path, payload);
      case 'villa':
        return new VillaRequestGenerator(urlGeneratorObj, subdomain, path, payload);
      case 'dom-hotel':
        return new DomHotelRequestGenerator(urlGeneratorObj, subdomain, path, payload);
      case 'int-hotel':
        return new IntHotelRequestGenerator(urlGeneratorObj, subdomain, path, payload);
      default:
        throw new Error(`No generator found for product: ${name}`);
    }
  }
}

class TourRequestGenerator {
  constructor(urlGenerator, subdomain, path, payload) {
    this.urlGenerator = urlGenerator;
    this.subdomain = subdomain;
    this.path = path;
    this.payload = payload;
  }

  generateRequest() {
    const url = this.urlGenerator.generateURL(this.subdomain, this.path)
     
    const response = http.post(
      url,
      JSON.stringify(
        this.payload
      ),
      { 
        headers: { 
          'Content-Type': 'application/json', 
          'channel': 'website',
          'clientId': 'website'
        } 
      }
    )

    return response;
  }
}

class VillaRequestGenerator {
  constructor(urlGenerator, subdomain, path, payload) {
    this.urlGenerator = urlGenerator;
    this.subdomain = subdomain;
    this.path = path;
    this.payload = payload;
  }

  generateRequest() {

    const city_id = this.payload.city_id  
    delete this.payload.city_id  
    const params = this.urlGenerator.buildQueryString(this.payload)
    const url = this.urlGenerator.generateURL(this.subdomain, this.path + city_id + params )

    const headers = {
      'Content-Type': 'application/json',
      'channel': 'website',
      'clientId': 'website',
    }

    const response = http.get(
      url,
      { headers }
    )

    return response;

  }

}

class DomHotelRequestGenerator {
  constructor(urlGenerator, subdomain, path, payload) {
    this.urlGenerator = urlGenerator;
    this.subdomain = subdomain;
    this.path = path;
    this.payload = payload;
  }

  generateRequest() {
    const params = this.urlGenerator.buildQueryString(this.payload)
    const url = this.urlGenerator.generateURL(this.subdomain, this.path + params)
    const headers = {
      'Content-Type': 'application/json',
      'channel': 'website',
      'clientId': 'website',
    }

    const response = http.get(
      url,
      { headers }
    )

    return response;
  }
}

class IntHotelRequestGenerator {
  constructor(urlGenerator, subdomain, path, payload) {
    this.urlGenerator = urlGenerator;
    this.subdomain = subdomain;
    this.path = path;
    this.payload = payload;
  }

  generateRequest() {

    const city_id = this.payload.city_id
    delete this.payload.city_id;
    const url = this.urlGenerator.generateURL(this.subdomain, this.path.replace('city_id', city_id))
    const headers = {
      'Content-Type': 'application/json',
      'channel': 'website',
      'clientId': 'website',
    }

    const response = http.post(
      url,
      JSON.stringify(
        this.payload
      ),
      { headers }
    )

    return response;
  }
}