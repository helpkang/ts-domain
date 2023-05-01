import { PaymentService } from "./PaymentService";
import { PaymentServiceClient } from "./PaymentServiceClient";

  describe("PaymentServiceClient", () => {
    test("should process payment correctly", async () => {
      const paymentServiceMock: PaymentService = {
        charge: jest.fn().mockResolvedValue(true),
      };
      const paymentServiceClient = new PaymentServiceClient(paymentServiceMock);
      const result = await paymentServiceClient.processPayment(100, "4242424242424242");
      expect(result).toBe(true);
      expect(paymentServiceMock.charge).toHaveBeenCalledWith(100, "4242424242424242");
    });
  });
  