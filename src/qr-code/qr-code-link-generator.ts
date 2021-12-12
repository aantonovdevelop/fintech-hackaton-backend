import {UserID, UserStorage} from "../user/user.entity";
import {QRCode} from "./qr-code";

export class QRCodeLinkGenerator {
    constructor(private readonly userStorage: UserStorage) {
    }

    public async generateQRCodeLink(userId: UserID): Promise<string> {
        const user = await this.userStorage.getById(userId);

        if (!user.paymentInformation) {
            throw Error(`User with id ${userId} doesn't have a payment information`);
        }

        return new QRCode(user).link;
    }
}
