enum UserRoles {
  FRONTEND_DEVELOPER = "Frontend Developer",
  BACKEND_DEVELOPER = "Backend Developer",
  QA_ENGINEER = "QA Engineer",
  DESIGNER = "Designer",
  MANAGER = "Manager",
  HR = "HR",
}

type User = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  role: UserRoles | "";
  lastLogin: string;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
};

export type { User };
export { UserRoles };
