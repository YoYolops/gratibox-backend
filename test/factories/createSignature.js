import faker from "faker";

export function createSignature(userId, productId, planId) {
    return {
        userId,
        productId,
        addressee: faker.internet.userName(),
        cep: "58900000",
        day: 1,
        complement: "",
        planId
    }
}