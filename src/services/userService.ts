import type { User } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

const userService = {
  getAll: async (): Promise<ResponseDirect<User[]>> => {
    const response = await fetch(`/users`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<User[]>;
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`/users/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<User>;
  },
};

export default userService;
