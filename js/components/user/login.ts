import { LoginPayload } from "../../lib/api/auth.js";
import api from "../../lib/api/index.js";
import Component from "../../lib/component.js";
import { navigateTo } from "../../router/index.js";
import store from "../../store/index.js";
import {
  updateCredentials,
  updateAuthLoadingState,
} from "../../store/slices/authSlice.js";
import {
  $,
  $ID,
  clearAllErrors,
  displayErrorMessage,
} from "../../utils/helpers.js";
import { isAxiosError } from "axios";
import { notifyError, notifySuccess } from "../../lib/toast.js";
import { getObjectKeys, validateForm } from "../../validations/helpers.js";

export default class Login extends Component {
  constructor() {
    super({
      element: $ID("app") as HTMLElement,
    });
  }

  displayErrorMessage(errors) {
    console.log(errors);
  }

  async handleUserLogin(event: SubmitEvent) {
    event.preventDefault();

    const usernameField = $("[data-username='username']") as HTMLInputElement;
    const passwordField = $("[data-password='password']") as HTMLInputElement;

    try {
      const payload: LoginPayload = {
        username: usernameField!.value,
        password: passwordField!.value,
        accessType: "USER",
      };

      clearAllErrors(Object.keys({ username: "", password: "" }));

      const errors = await validateForm(payload, "login");

      if (getObjectKeys(errors).length > 0) {
        displayErrorMessage(errors);
        return;
      }

      store.dispatch(updateAuthLoadingState(true));

      const response = await api.auth.login(payload);

      console.log(response);

      store.dispatch(updateAuthLoadingState(false));
      store.dispatch(
        updateCredentials({ isAuthenticated: true, token: response.data.token })
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      notifySuccess("Logged In Successfully.");

      navigateTo("/user/dashboard");
    } catch (error) {
      store.dispatch(updateAuthLoadingState(false));
      console.log(error);

      if (isAxiosError(error)) {
        notifyError(error.response?.data.message || "An error occurred");
      }
    }
  }

  async handleFormSubmission() {
    const form = $ID("login-form") as HTMLFormElement;
    form.addEventListener("submit", this.handleUserLogin);
  }

  async methods() {
    this.handleFormSubmission();
  }

  render() {
    let isLoading = store.getState().auth.isLoading;

    this.element!.innerHTML = `
        <!-- --------------- LOGIN SECTION START --------------- -->
        <section class="login__section">
        <div
            class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
        >
            <form id="login-form" class="relative py-3 sm:w-96 mx-auto text-center">
            <span class="text-3xl font-medium">User Login</span>
            <div class="mt-6 bg-white shadow-md rounded-lg text-left">
                <div class="h-2 bg-slate-700 rounded-t-md"></div>
                <div class="px-8 py-6">
                <div class="mt-3">
                    <label class="block font-semibold">Username</label>
                    <input
                      type="text"
                      name="username"
                      data-username="username"
                      placeholder="Username"
                      class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                      required
                    />
                    <span class="error-msg text-red-600 text-xs mt-2"></span>
                </div>
    
                <div class="mt-3">
                    <label class="block font-semibold">Password</label>
                    <input
                      type="password"
                      name="password"
                      data-password="password"
                      placeholder="Password"
                      class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                      required
                    />
                    <span class="error-msg text-red-600 text-xs mt-2"></span>
                </div>
    
                <button
                    type="submit"
                    class="mt-4 bg-slate-700 text-white py-2 px-6 rounded-md w-full"
                >
                    ${isLoading ? "Submitting" : "Login"}
                </button>
                </div>
            </div>
            </form>

            <p class="text-center">
              Are you a <span class="font-bold">Merchant</span> ? <a href="/merchant/login" class="hover:underline" data-link>Log In here</a>
            </p>

            <p class="mt-4 text-center">
              Don't have an account? <a href="/user/register" class="hover:underline" data-link>Register</a>
            </p>
        </div>
        </section>
        <!-- --------------- LOGIN SECTION END --------------- -->
    `;

    this.methods();
  }
}
