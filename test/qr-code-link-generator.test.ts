import assert from "assert";
import {Registration} from "../src/registration";
import {InMemoryUserStorage} from "../external/storages/user-storage/in-memory";
import {InMemoryPaymentInformationStorage} from "../external/storages/payment-information-storage/in-memory";
import {QRCodeLinkGenerator} from "../src/qr-code/qr-code-link-generator";

describe("QRCodeLinkGenerator", function () {
    describe(".generateQRCodeLink", function () {
        it("should generate qr-code link for registered user", async function () {
            const userStorage = new InMemoryUserStorage()
            const paymentInformationStorage = new InMemoryPaymentInformationStorage();
            const registration = new Registration(userStorage, paymentInformationStorage);
            const user = await registration.registration({
                email: "some@user.mail",
                password: "some_password",
                firstName: "User",
                lastName: "Test",
            });
            await registration.providePaymentInformation(user.id, {qrId: "some_qr_id", memberId: "some_member_id"})
            const sut = new QRCodeLinkGenerator(userStorage);

            const result = await sut.generateQRCodeLink(user.id);

            assert.strictEqual(result, `http://ec2-3-249-21-214.eu-west-1.compute.amazonaws.com/payment.html?userId=${user.id}`);
        });
    });
});
