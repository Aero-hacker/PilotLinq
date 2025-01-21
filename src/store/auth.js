import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import jwtDecode from "jwt-decode";

export const useAuth = create(
  persist(
    (set) => ({
      user: {
        user_id: null,
        token: null,
        refresh: null,
        role: "Default_Role",
      },
      isAuthenticated: false,
      afterLogin: (token, refresh, role) => {
        const decodedToken = jwtDecode(token);
        set(() => ({
          user: {
            user_id: decodedToken?.user_id,
            token,
            refresh,
            role,
          },
          isAuthenticated: true,
        }));
      },
      logOut: async () => {
        set(() => ({
          user: {
            token: null,
            refresh: null,
            role: "Default_Role",
            user_id: null,
          },
          isAuthenticated: false,
        }));

        window.location.href = "/login";
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
