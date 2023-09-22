import { faker } from "@faker-js/faker";

export const CREATE_USER_DATA = {
    username: faker.string.sample(),
    password: faker.string.sample()
}