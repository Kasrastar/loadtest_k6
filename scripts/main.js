import { RequestGeneratorFactory } from '../utils/apiUtils.js';
import { check } from 'k6';

const config = JSON.parse(open('../config/config.json'));  
const protocol = config.protocol;
const domain = config.domain;


export const options = {

  vus: 1,
  duration: '10m',
  iterations: 1,
};

export default function() {  

  config.products.forEach(product => {
    if (product.active) {

      const requestGenerator = RequestGeneratorFactory.createRequestGenerator(domain, protocol, product)
      const response = requestGenerator.generateRequest()


      console.log(`[${product.name}] Response: ${response.body}`);
      check(response, {
        'is status 200': (r) => r.status === 200,
        // Add additional checks if necessary
      });
    }
  });
}
