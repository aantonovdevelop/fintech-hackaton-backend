import {UserID, UserStorage} from "../user/user.entity";
import {PaymentLink} from "./payment-link";

export class PaymentLinkGenerator {
    constructor(private readonly userStorage: UserStorage) {
    }

    public async generatePaymentLink(userId: UserID, sum: string): Promise<string> {
        const user = await this.userStorage.getById(userId);

        if (!user.paymentInformation) {
            throw Error("User doesn't have payment information");
        }

        return new PaymentLink(user.paymentInformation, sum).link;
    }
}
