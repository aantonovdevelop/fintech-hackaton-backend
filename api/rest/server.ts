import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {InMemoryUserStorage} from "../../external/storages/user-storage/in-memory";
import {InMemoryPaymentInformationStorage} from "../../external/storages/payment-information-storage/in-memory";
import {Registration} from "../../src/registration";
import {PaymentLinkGenerator} from "../../src/payment-link/payment-link-generator";
import {QRCodeLinkGenerator} from "../../src/qr-code/qr-code-link-generator";

const application = express();

application.use(cors({origin: "*"}));
application.use(bodyParser.json());

const userStorage = new InMemoryUserStorage()
const paymentInformationStorage = new InMemoryPaymentInformationStorage();
const registration = new Registration(userStorage, paymentInformationStorage);
const paymentLinkGenerator = new PaymentLinkGenerator(userStorage);
const qrCodeLinkGenerator = new QRCodeLinkGenerator(userStorage);

application.post("/registration", async (req, res) => {
    try {
        return res.send(await registration.registration(req.body));
    } catch (err) {
        return res.status(500).send(err);
    }
});

application.post("/sign-in", async (req, res) => {
    try {
        return res.send(await registration.signIn(req.body.email, req.body.password));
    } catch (err) {
        return res.status(500).send(err);
    }
});

application.post("/payment-info/:userId", async (req, res) => {
    try {
        return res.send(await registration.providePaymentInformation(req.params.userId, req.body));
    } catch (err) {
        return res.status(500).send(err);
    }
});

application.get("/payment-link/:userId/:sum", async (req, res) => {
    try {
        return res.send(await paymentLinkGenerator.generatePaymentLink(req.params.userId, req.params.sum));
    } catch (err) {
        console.error(JSON.stringify(err));

        return res.status(500).send(err);
    }
});

application.get("/qr-code-link/:userId", async (req, res) => {
    try {
        return res.send(await qrCodeLinkGenerator.generateQRCodeLink(req.params.userId));
    } catch (err) {
        console.error(JSON.stringify(err));

        return res.status(500).send(err);
    }
});

application.listen(3000, () => console.log(`Server started..`));
