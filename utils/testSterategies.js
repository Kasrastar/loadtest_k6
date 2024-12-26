import { check } from 'k6';


class BaseTestSterategy {
  execute(response) {
    throw new Error("Execute method must be implemented")
  }
}

class StatusCodeValidationStrategy extends BaseTestSterategy {
  execute(response) {
    return check(response, {
      'is status 200': (r) => r.status === 200,
    });
  }
}

class SchemaValidationStrategy extends BaseTestSterategy {
  constructor() {
    super();
  }
  
  execute(productName, response) {
    
    let isValid = true

    if (productName == "villa") {
      isValid = this.villaValidateSchema(response.json());
    } 
    
    return check(response, {
      'response schema is valid': () => isValid,
    });
  }
  
  villaValidateSchema(responseBody) {
    if (!responseBody || typeof responseBody !== 'object') {
      return false;
    }
  
    if (typeof responseBody.success !== 'boolean') {
      console.log('Invalid type for "success": expected boolean');
      return false;
    }
  
    if (typeof responseBody.total !== 'number' || !Number.isInteger(responseBody.total)) {
      console.log('Invalid type for "total": expected integer');
      return false;
    }
  
    if (!Array.isArray(responseBody.data)) {
      console.log('Invalid type for "data": expected array');
      return false;
    }
  
    if (responseBody.data.length === 0) {
      console.log('Data array is empty');
      return false;
    }
  }
}

export function selectStrategy(apiName) {
  const strategies = {
    "tour": [new StatusCodeValidationStrategy()],
    "villa": [new StatusCodeValidationStrategy(), new SchemaValidationStrategy()],
    "dom-hotel": [],
    "int-hotel": [new StatusCodeValidationStrategy()],
  };

  return strategies[apiName] || [new StatusCodeValidationStrategy()];
}