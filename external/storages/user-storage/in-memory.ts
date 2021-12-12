import {User, UserID, UserStorage} from "../../../src/user/user.entity";

export class InMemoryUserStorage implements UserStorage {
    private userIdToUser = new Map<UserID, User>();
    private emailToUserId = new Map<string, UserID>();

    public async add(user: User): Promise<User> {
        this.userIdToUser.set(user.id, user);
        this.emailToUserId.set(user.email, user.id);

        return user;
    }

    public async getByCredentials(email: string, password: string): Promise<User> {
        if (this.emailToUserId.has(email)) {
            const user = this.userIdToUser.get(this.emailToUserId.get(email) as UserID);

            if (user && user.password === password) {
                return user;
            }
        }

        throw Error("There is no user with such email or password");
    }

    public async getById(id: UserID): Promise<User> {
        if (this.userIdToUser.has(id)) {
            return this.userIdToUser.get(id) as User;
        }

        throw Error(`There is no user with such id ${id}`);
    }

    public async update(user: User): Promise<User> {
        this.userIdToUser.set(user.id, user);

        return user;
    }
}
