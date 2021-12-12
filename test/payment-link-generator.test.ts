import assert from "assert";
import {InMemoryUserStorage} from "../external/storages/user-storage/in-memory";
import {InMemoryPaymentInformationStorage} from "../external/storages/payment-information-storage/in-memory";
import {Registration} from "../src/registration";
import {PaymentLinkGenerator} from "../src/payment-link/payment-link-generator";
import {PaymentInformationDTO} from "../src/payment-information/payment-information.entity";

describe("PaymentLinkGenerator", function () {
    describe(".generatePaymentLink", function () {
        it("should generate payment link with expected sum for registered user with payment information", async function () {
            const paymentInformation: PaymentInformationDTO = {
                qrId: "some_qr_id",
                memberId: "some_member_id",
            };
            const userStorage = new InMemoryUserStorage()
            const paymentInformationStorage = new InMemoryPaymentInformationStorage();
            const registration = new Registration(userStorage, paymentInformationStorage);
            const user = await registration.registration({
                email: "some@user.mail",
                password: "some_password",
                firstName: "User",
                lastName: "Test",
            });
            await registration.providePaymentInformation(user.id, paymentInformation);
            const sut = new PaymentLinkGenerator(userStorage);

            const result = await sut.generatePaymentLink(user.id, "10000");

            assert.strictEqual(result, `https://qr.nspk.ru/${paymentInformation.qrId}?type=01&bank=${paymentInformation.memberId}&sum=10000&CRC=2D33`);
        });
    });
});
