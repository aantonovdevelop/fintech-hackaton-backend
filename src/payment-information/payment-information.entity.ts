import {v4 as uuid} from "uuid";
import {User} from "../user/user.entity";

export type PaymentInformationID = string;

export type PaymentInformationDTO = {
    qrId: string;
    memberId: string;
}

export interface PaymentInformationStorage {
    add(user: User, paymentInformation: PaymentInformation): Promise<PaymentInformation>;
}

export class PaymentInformation implements PaymentInformationDTO {
    public readonly id: PaymentInformationID;
    public readonly qrId: string;
    public readonly memberId: string;

    protected constructor(paymentInformationData: PaymentInformationDTO) {
        this.id = uuid();
        this.qrId = paymentInformationData.qrId;
        this.memberId = paymentInformationData.memberId;
    }

    public static async create(user: User, paymentInformationData: PaymentInformationDTO, paymentInformationStorage: PaymentInformationStorage): Promise<PaymentInformation> {
        return paymentInformationStorage.add(user, new PaymentInformation(paymentInformationData));
    }
}
