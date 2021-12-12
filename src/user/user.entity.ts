import {v4 as uuid} from "uuid";
import {PaymentInformation} from "../payment-information/payment-information.entity";

export type UserID = string;

export interface UserStorage {
    add(user: User): Promise<User>;

    getById(id: UserID): Promise<User>;

    getByCredentials(email: string, password: string): Promise<User>;

    update(user: User): Promise<User>;
}

export type UserDTO = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class User implements UserDTO {
    public readonly id: UserID;
    public readonly email: string;
    public readonly password: string;
    public readonly firstName: string;
    public readonly lastName: string;
    public paymentInformation?: PaymentInformation;

    protected constructor(userData: UserDTO) {
        this.id = uuid();
        this.email = userData.email;
        this.password = userData.lastName;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
    }

    public update(storage: UserStorage): Promise<User> {
        return storage.update(this);
    }

    public static async create(userData: UserDTO, storage: UserStorage): Promise<User> {
        return storage.add(new User(userData));
    }

    public static async getById(id: UserID, storage: UserStorage): Promise<User> {
        return storage.getById(id);
    }

    public static async getByCredentials(email: string, password: string, storage: UserStorage): Promise<User> {
        return storage.getByCredentials(email, password);
    }
}
