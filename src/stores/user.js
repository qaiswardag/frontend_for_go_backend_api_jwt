import { defineStore } from 'pinia';
import { vueFetch } from '@/composables/vueFetch';

const {
  handleData: handleDataUser,
  fetchedData: fetchedDataUser,
  isError: isErrorUser,
  error: errorUser,
  errors: errorsUser,
  isLoading: isLoadingUser,
  isSuccess: isSuccessUser,
} = vueFetch();

const {
  handleData: handleDataSignOut,
  fetchedData: fetchedDataSignOut,
  isError: isErrorSignOut,
  error: errorSignOut,
  errors: errorsSignOut,
  isLoading: isLoadingSignOut,
  isSuccess: isSuccessSignOut,
} = vueFetch();

const {
  handleData: handleDataSignIn,
  fetchedData: fetchedDataSignIn,
  isError: isErrorSignIn,
  error: errorSignIn,
  errors: errorsSignIn,
  isLoading: isLoadingSignIn,
  isSuccess: isSuccessSignIn,
} = vueFetch();

const {
  handleData: handleDataSignUp,
  fetchedData: fetchedDataSignUp,
  isError: isErrorSignUp,
  error: errorSignUp,
  errors: errorsSignUp,
  isLoading: isLoadingSignUp,
  isSuccess: isSuccessSignUp,
} = vueFetch();

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    backendUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  getters: {
    getUser: (state) => state.user,
    getIsLoading: (state) => state.isLoading,
    getBackendUrl: (state) => state.backendUrl,
  },
  actions: {
    setUser(payload) {
      this.user = payload;
    },
    setIsLoading(payload) {
      this.isLoading = payload;
    },
    setBackendUrl(payload) {
      this.backendUrl = payload;
    },

    // Sign in user
    async setLoadUserSignIn(userForm) {
      const { email, password } = userForm;
      try {
        this.setUser({
          fetchedData: fetchedDataSignIn,
          isError: isErrorSignIn,
          error: errorSignIn,
          errors: errorsSignIn,
          isLoading: isLoadingSignIn,
          isSuccess: isSuccessSignIn,
        });

        const data = await handleDataSignIn(
          `${this.getBackendUrl}/user/sign-in`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
          {
            additionalCallTime: 1000,
          }
        );

        this.setUser({
          fetchedData: fetchedDataSignIn,
          isError: isErrorSignIn,
          error: errorSignIn,
          errors: errorsSignIn,
          isLoading: isLoadingSignIn,
          isSuccess: isSuccessSignIn,
        });
      } catch (error) {
        console.error(`Error:`, error);
      }
    },

    // Sign up user
    async setLoadUserSignUp(userForm) {
      const { username, firstName, lastName, email, password } = userForm;
      console.log('username eeer:', username);
      try {
        this.setUser({
          fetchedData: fetchedDataSignUp,
          isError: isErrorSignUp,
          error: errorSignUp,
          errors: errorsSignUp,
          isLoading: isLoadingSignUp,
          isSuccess: isSuccessSignUp,
        });

        const data = await handleDataSignUp(
          `${this.getBackendUrl}/user/sign-up`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password,
            }),
          },
          {
            additionalCallTime: 1000,
          }
        );

        this.setUser({
          fetchedData: fetchedDataSignUp,
          isError: isErrorSignUp,
          error: errorSignUp,
          errors: errorsSignUp,
          isLoading: isLoadingSignUp,
          isSuccess: isSuccessSignUp,
        });
      } catch (error) {
        console.error(`Error:`, error);
      }
    },

    // Get authenticated user
    async setLoadUser() {
      this.setUser({
        fetchedData: fetchedDataUser,
        isError: isErrorUser,
        error: errorUser,
        errors: errorsUser,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
      });
      try {
        await handleDataUser(
          `${this.getBackendUrl}/user/user`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
          {
            additionalCallTime: 1000,
          }
        );

        this.setUser({
          fetchedData: fetchedDataUser,
          isError: isErrorUser,
          error: errorUser,
          errors: errorsUser,
          isLoading: isLoadingUser,
          isSuccess: isSuccessUser,
        });
      } catch (error) {
        console.error(`Error`, error);
      }
    },

    // Sign out user
    async setUserSignOut(payload) {
      this.setUser({
        handleData: handleDataSignOut,
        fetchedData: fetchedDataSignOut,
        isError: isErrorSignOut,
        error: errorSignOut,
        errors: errorsSignOut,
        isLoading: isLoadingSignOut,
        isSuccess: isSuccessSignOut,
      });

      try {
        const data = await handleDataSignOut(
          `${this.getBackendUrl}/user/sign-out`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
          {
            additionalCallTime: 1000,
          }
        );

        // Update state directly instead of committing mutations
        this.setUser(null);
      } catch (error) {
        console.error(`Error:`, error);
      }
    },
  },
});
