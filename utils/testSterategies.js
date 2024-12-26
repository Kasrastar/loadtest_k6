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

class SchemaValidationStrategy extends BaseTestStrategy {
  constructor(schema) {
    super();
    this.schema = schema;
  }
  
  execute(response) {
    const isValid = this.validateSchema(response.json(), this.schema);
    return check(response, {
      'response schema is valid': () => isValid,
    });
  }
  
  validateSchema(data, schema) {
    // Needes to be implemented tomarrow
  }
}

export function selectStrategy(apiName) {
  const strategies = {
    "tour": [new StatusCodeValidationStrategy()],
    "villa": [new StatusCodeValidationStrategy()],
    "dom-hotel": [],
    "int-hotel": [new StatusCodeValidationStrategy()],
  };

  return strategies[apiName] || [new StatusCodeValidationStrategy()];
}