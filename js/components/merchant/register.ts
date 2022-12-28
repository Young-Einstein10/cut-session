import api from "../../lib/api/index.js";
import Component from "../../lib/component.js";
import { navigateTo } from "../../router/index.js";
import store from "../../store/index.js";
import { updateAuthLoadingState } from "../../store/slices/authSlice.js";
import {
  $,
  $ID,
  clearAllErrors,
  displayErrorMessage,
} from "../../utils/helpers.js";
import { getObjectKeys, validateForm } from "../../validations/helpers.js";
import { Params } from "../merchant/dashboard.js";

export default class Register extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });
  }

  fields = [
    {
      type: "text",
      label: "Name",
      name: "name",
      placeholder: "name",
    },
    {
      type: "text",
      label: "Username",
      name: "username",
      placeholder: "Username",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "email",
    },
    {
      type: "text",
      label: "City of Operation",
      name: "cityOfOperation",
      placeholder: "City of Operation",
    },
    {
      type: "text",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Phone Number",
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "dob",
      placeholder: "Date of Birth",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "Password",
    },
  ];

  renderInputFields() {
    const result = this.fields
      .map(
        (field) => `
      <div class="mt-3">
        <label class="block font-semibold">${field.label}</label>
        <input
          type="${field.type}"
          name="${field.name}"
          data-${field.name.toLowerCase()}="${field.name}"
          placeholder="${field.placeholder}"
          class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
        />
        <span class="error-msg text-red-600 text-xs mt-2"></span>
      </div>
    `
      )
      .join("")
      .toString();

    return result;
  }

  async handleUserRegistration(event: SubmitEvent) {
    event.preventDefault();

    const nameField = $("[data-name='name']") as HTMLInputElement;
    const usernameField = $("[data-username='username']") as HTMLInputElement;
    const emailField = $("[data-email='email']") as HTMLInputElement;
    const cityOfOperationField = $(
      "[data-cityofoperation='cityOfOperation']"
    ) as HTMLInputElement;
    const phoneNumberField = $(
      "[data-phonenumber='phoneNumber']"
    ) as HTMLInputElement;
    const dobField = $("[data-dob='dob']") as HTMLInputElement;
    const passwordField = $("[data-password='password']") as HTMLInputElement;

    try {
      const payload = {
        name: nameField.value,
        username: usernameField.value,
        email: emailField.value,
        cityOfOperation: cityOfOperationField.value,
        phoneNumber: phoneNumberField.value,
        dob: dobField.value,
        password: passwordField.value,
      };

      clearAllErrors(Object.keys(payload));

      const errors = await validateForm(payload, "registerMerchant");

      if (getObjectKeys(errors).length > 0) {
        displayErrorMessage(errors);
        return;
      }

      store.dispatch(updateAuthLoadingState(true));

      const response = await api.auth.registerMerchant(payload);

      console.log(response);

      store.dispatch(updateAuthLoadingState(false));

      navigateTo("login");
    } catch (error) {
      store.dispatch(updateAuthLoadingState(false));
      console.log(error);
    }
  }

  async handleFormSubmission() {
    const form = $ID("register-user-form") as HTMLFormElement;

    form.addEventListener("submit", this.handleUserRegistration);
  }

  methods() {
    this.handleFormSubmission();
  }

  render() {
    let isLoading = store.getState().auth.isLoading;

    this.element!.innerHTML = `
    <section class="register__section">
      <div
        class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
      >
        <form id="register-user-form" class="relative py-3 sm:w-96 mx-auto text-center">
          <span class="text-3xl font-medium">Register</span>
          <div class="mt-4 bg-white shadow-md rounded-lg text-left">
            <div class="h-2 bg-slate-700 rounded-t-md"></div>
            <div class="px-8 py-6">
              ${this.renderInputFields()}
  
              <button
                type="submit"
                class="mt-4 bg-slate-700 text-white py-2 px-6 rounded-md w-full"
              >
                ${isLoading ? "Submitting" : "Register"}
              </button>
            </div>
          </div>
        </form>

        <p class="text-center mt-2">
          Already have an account? <a href="/merchant/login" class="hover:underline" data-link>Log In</a>
        </p>
      </div>
    </section>
    `;

    this.methods();
  }
}
