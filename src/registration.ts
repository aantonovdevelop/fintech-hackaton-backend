import {User, UserDTO, UserID, UserStorage} from "./user/user.entity";
import {
    PaymentInformation,
    PaymentInformationDTO,
    PaymentInformationStorage,
} from "./payment-information/payment-information.entity";

export class Registration {
    constructor(private readonly userStorage: UserStorage, private readonly paymentInformationStorage: PaymentInformationStorage) {
    }

    public async registration(userData: UserDTO): Promise<User> {
        return User.create(userData, this.userStorage);
    }

    public async signIn(email: string, password: string): Promise<User> {
        return User.getByCredentials(email, password, this.userStorage);
    }

    public async providePaymentInformation(userId: UserID, paymentInformationData: PaymentInformationDTO): Promise<User> {
        const user = await this.userStorage.getById(userId);

        user.paymentInformation = await PaymentInformation.create(user, paymentInformationData, this.paymentInformationStorage);

        return user.update(this.userStorage);
    }
}
