import { RequestGeneratorFactory } from '../utils/apiUtils.js';
import { selectStrategy } from '../utils/testSterategies.js';

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
      
      const strategies = selectStrategy(product.name);
      strategies.forEach(strategy => strategy.execute(response)) 
    }
  });
}
