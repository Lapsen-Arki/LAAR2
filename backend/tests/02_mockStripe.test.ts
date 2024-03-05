import { describe, beforeAll, it, expect } from "@jest/globals";
import request from "supertest";
import { server } from "./setupTests";
import stripeConf from "../src/config/stripeClient";
const stripe = stripeConf();
let customerId = "";
describe("MockStripe", () => {
  describe("Create customer", () => {
    it("Create customer with invalid token", async () => {
      try {
        const customer = await stripe.customers.create({
          email: "testmail@test.com",
          source: "test_failure_token",
        });
      } catch (error: any) {
        expect(error.type).toBe("card_error");
      }
    });
    it("Create customer with valid token", async () => {
      try {
        const customer = await stripe.customers.create({
          email: "testmail@test.com",
          source: "tok_visa",
        });
      } catch (error: any) {
        console.log(error);
      }
    });
  });
  describe("Create subscription", () => {
    it("Create subscription with valid customer", async () => {
      try {
        const customer = await stripe.customers.create({
          email: "testmail@test.com",
          source: "tok_visa",
        });
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ plan: "price_1ObLeAK45umi2LZd5XwwYvam" }],
          trial_period_days: 14,
          cancel_at_period_end: true,
        });
        customerId = customer.id;
        expect(subscription.id).toBeDefined();
      } catch (error: any) {
        console.log(error);
      }
    });
  });
  describe("Retrieve customer", () => {
    it("Retrieve customer with valid id", async () => {
      try {
        const customer = await stripe.customers.retrieve(customerId);
        expect(customer.id).toBe(customerId);
      } catch (error: any) {
        console.log(error);
      }
    });
  });
});
