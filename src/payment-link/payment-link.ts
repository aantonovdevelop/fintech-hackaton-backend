import {crc16} from "node-crc";
import {PaymentInformation} from "../payment-information/payment-information.entity";

export class PaymentLink {
    private readonly host: string;
    private readonly qrType: string;
    private readonly cur: string;

    constructor(private readonly paymentInformation: PaymentInformation, private readonly sum: string) {
        this.host = "qr.nspk.ru";
        this.qrType = "01";
        this.cur = "RUB";
    }

    public get link(): string {
        return this.signedLink();
    }

    private signedLink(): string {
        return `${this.notSignedLink}&CRC=${crc16(Buffer.from(this.notSignedLink, "utf8")).toString("hex").toUpperCase()}`;
    }

    private get notSignedLink(): string {
        return `https://${this.host}/${this.paymentInformation.qrId}?type=${this.qrType}&bank=${this.paymentInformation.memberId}&sum=${this.sum}`
    }
}
