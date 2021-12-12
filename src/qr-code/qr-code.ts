import {User} from "../user/user.entity";

export class QRCode {
    private readonly host = "https://some-host";

    constructor(private readonly user: User) {
    }

    public get link(): string {
        return `${this.host}/${this.user.id}`;
    }
}
