import { check } from 'k6';
import http from 'k6/http';
// import { loadConfig } from '../utils/apiUtils.js';

const config = JSON.parse(open('../config/config.json'));  
const protocol = config.protocol;
const domain = config.domain;


export const options = {

  vus: 1,
  duration: '10m',
  iterations: 1,
};

export default function() {  

  config.apis.forEach(api => {
    if (api.active) {
      let url = `${protocol}://${api.subdomain}.${domain}${api.path}`;
      let response = http.post(
        url, 
        JSON.stringify(
          api.payload
        ), 
        { 
          headers: { 
            'Content-Type': 'application/json', 
            'channel': 'website',
            'clientId': 'website'
          } 
        }
      );
      
      console.log(response.body)
      check(response, {
        'is status 200': (r) => r.status === 200,
        // You can add more checks here as needed
      });
    }
  });
}
