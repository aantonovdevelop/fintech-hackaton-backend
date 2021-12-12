import assert from "assert";
import {Registration} from "../src/registration";
import {User} from "../src/user/user.entity";
import {InMemoryUserStorage} from "../external/storages/user-storage/in-memory";
import {InMemoryPaymentInformationStorage} from "../external/storages/payment-information-storage/in-memory";

describe("Registration", function () {
    describe(".registration", function () {
        it("should register new user and store it to a storage", async function () {
            const sut = new Registration(new InMemoryUserStorage(), new InMemoryPaymentInformationStorage());

            const result = await sut.registration({
                email: "some@user.mail",
                password: "some_password",
                firstName: "User",
                lastName: "Test",
            });

            assert.strictEqual(typeof result.id, "string");
        });
    });

    describe(".providePaymentInformation", function () {
        it("should provide payment information for existing user", async function () {
            const sut = new Registration(new InMemoryUserStorage(), new InMemoryPaymentInformationStorage());
            const user = await sut.registration({
                email: "some@user.mail",
                password: "some_password",
                firstName: "User",
                lastName: "Test",
            });

            const result = await sut.providePaymentInformation(user.id, {memberId: "some_member_id", qrId: "some_qr_id"});

            assert.strictEqual(result.id, user.id);
            assert.strictEqual(result.paymentInformation?.memberId, "some_member_id");
            assert.strictEqual(result.paymentInformation?.qrId, "some_qr_id");
        });
    });
});
