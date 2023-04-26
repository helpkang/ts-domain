export interface PaymentService
{
  charge(amount: number, cardNumber: string): Promise<boolean>;
}
