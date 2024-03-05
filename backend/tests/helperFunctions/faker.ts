import { faker } from "@faker-js/faker";
import { ChildProfile, User } from "../testTypes";
export function generateChildProfile(
  creatorId: string,
  options?: {
    accessRights?: boolean;
    avatar?: string;
    birthdate?: string;
    childName?: string;
  }
): ChildProfile {
  return {
    accessRights: options?.accessRights ?? false, // Use provided value or default to false
    creatorId,
    avatar: options?.avatar ?? faker.image.avatar(),
    birthdate: faker.date.past().toISOString(),
    childName: options?.childName ?? faker.person.firstName(),
  };
}
export function generateUser(options?: {
  uid?: string;
  email?: string;
  password?: string;
  name?: string;
}): User {
  return {
    uid: options?.uid ?? faker.string.uuid(),
    email: options?.email ?? faker.internet.email(),
    password: options?.password ?? faker.internet.password(),
    name: options?.name ?? faker.person.firstName(),
  };
}
