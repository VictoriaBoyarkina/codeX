import { User, UserRoles } from "@/types";
import { isObject, toStringValue } from "@/utils/helper";

const toUserRole = (role: unknown) => {
  if (Object.values(UserRoles).includes(role as UserRoles)) {
    return role as UserRoles;
  }
  return "" as const;
};

const toUser = (response: unknown): User | null => {
  if (!isObject(response) || !response.user) {
    return null;
  }

  const {
    id,
    firstName,
    lastName,
    nickname,
    email,
    role,
    lastLogin,
    lastActivity,
    createdAt,
    updatedAt,
  } = response.user;

  return {
    id: toStringValue(id),
    firstName: toStringValue(firstName),
    lastName: toStringValue(lastName),
    nickname: toStringValue(nickname),
    email: toStringValue(email),
    role: toUserRole(role),
    lastLogin: toStringValue(lastLogin),
    lastActivity: toStringValue(lastActivity),
    createdAt: toStringValue(createdAt),
    updatedAt: toStringValue(updatedAt),
  };
};

export { toUser };
