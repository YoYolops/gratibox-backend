import faker from "faker";

export function createUser() {
    return {
        name: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    }
}