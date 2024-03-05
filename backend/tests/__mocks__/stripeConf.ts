import { CreateCustomer, CustomerData, CreateSubscription } from "../testTypes";
import { faker } from "@faker-js/faker";
class StripeMock {
  data: { [cusomerId: string]: CustomerData };
  constructor() {
    this.data = {};
  }

  customers = {
    create: (data: CreateCustomer) => {
      if (data.source === "test_failure_token") {
        // Simulate a failure
        return Promise.reject({
          type: "card_error",
          message: "Your card was declined",
        });
      } else {
        const customerId = "cus_" + faker.string.alphanumeric({ length: 10 });
        this.data[customerId] = { id: customerId, ...data };
        return Promise.resolve({ id: customerId });
      }
    },
    retrieve: (customerId: string) => {
      return Promise.resolve(this.data[customerId]);
    },
  };

  subscriptions = {
    create: (data: CreateSubscription) => {
      const subscriptionId = "sub_" + faker.string.alphanumeric({ length: 10 });
      return Promise.resolve({ id: subscriptionId });
    },
  };

  // ... Implement other Stripe API methods as needed
}

export default function stripeConf() {
  return new StripeMock();
}
