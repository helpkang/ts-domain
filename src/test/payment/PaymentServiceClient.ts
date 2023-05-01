import { PaymentService } from "./PaymentService";

export class PaymentServiceClient
{
  constructor(private paymentService: PaymentService ) { }

  async processPayment(amount: number, cardNumber: string): Promise<boolean>
  {
    return this.paymentService.charge(amount, cardNumber);
  }
}
