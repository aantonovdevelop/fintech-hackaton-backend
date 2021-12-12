import {
    PaymentInformation, PaymentInformationID,
    PaymentInformationStorage,
} from "../../../src/payment-information/payment-information.entity";
import {User, UserID} from "../../../src/user/user.entity";

export class InMemoryPaymentInformationStorage implements PaymentInformationStorage {
    private readonly paymentInformationIdToPaymentInformation = new Map<PaymentInformationID, PaymentInformation>();
    private readonly userIdToPaymentInformationId = new Map<PaymentInformationID, UserID>();

    public async add(user: User, paymentInformation: PaymentInformation): Promise<PaymentInformation> {
        this.paymentInformationIdToPaymentInformation.set(paymentInformation.id, paymentInformation);
        this.userIdToPaymentInformationId.set(user.id, paymentInformation.id);

        return paymentInformation;
    }
}
