import {User} from "../user/user.entity";

export class QRCode {
    private readonly host = "http://ec2-3-249-21-214.eu-west-1.compute.amazonaws.com/payment.html";

    constructor(private readonly user: User) {
    }

    public get link(): string {
        return `${this.host}?userId=${this.user.id}`;
    }
}
