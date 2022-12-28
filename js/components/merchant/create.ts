import {
  clearAllErrors,
  displayErrorMessage,
  isWeekend,
} from "./../../utils/helpers";
import { SessionType } from "./../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import {
  $,
  $ID,
  checkAuthentication,
  isWeekDays,
  logOut,
} from "../../utils/helpers";
import { Params } from "./dashboard";
import { updateLoadingState } from "../../store/slices/merchantSlice";
import { notifySuccess } from "../../lib/toast";
import { navigateTo } from "../../router";
import api from "../../lib/api";
import { isEqual, addMinutes } from "date-fns";
import { getObjectKeys, validateForm } from "../../validations/helpers";

type TimeSlot = "45" | "60" | "90";

export default class CreateSession extends Component {
  sessionType: SessionType;
  selectedTimeSlot: TimeSlot;
  startsAt: string;
  endsAt: string;

  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    checkAuthentication();
  }

  async handleSessionCreation() {
    const typeField = $("[data-type='type']") as HTMLInputElement;
    const timeSlotField = $("[data-timeslot='timeslot']") as HTMLSelectElement;
    const startsAtField = $("[data-startsat='startsAt']") as HTMLInputElement;
    const endsAtField = $("[data-endsat='endsAt']") as HTMLInputElement;

    const merchantId = localStorage.getItem("merchantId") as string;

    try {
      const initialData = {
        type: typeField.value as SessionType,
        timeslot: timeSlotField.value as TimeSlot,
        startsAt: startsAtField.value,
        endsAt: endsAtField.value,
      };

      clearAllErrors(Object.keys(initialData));

      const errors = await validateForm(initialData, "createSession");

      if (getObjectKeys(errors).length > 0) {
        displayErrorMessage(errors);
        return;
      }

      const { timeslot, ...payload } = initialData;

      store.dispatch(updateLoadingState(true));

      const response = await api.studioSession.createStudioSession(
        merchantId,
        payload
      );

      console.log(response);

      store.dispatch(updateLoadingState(false));

      notifySuccess("Session created successfully.");

      navigateTo("/merchant/dashboard");
    } catch (error) {
      store.dispatch(updateLoadingState(false));
      console.log(error);
    }
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", () => logOut("merchant"));
  }

  async handleFormSubmission() {
    const form = $ID("create-session") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSessionCreation();
    });
  }

  updateTimeFields(state: boolean) {
    // Starts At
    ($("[data-startsat='startsAt']") as HTMLInputElement).disabled = state;

    // Ends At
    ($("[data-endsat='endsAt']") as HTMLInputElement).disabled = state;
  }

  validateTime(value: string): { message?: string } {
    let errors = {};

    if (this.sessionType === "WeekDay" && !isWeekDays(value)) {
      errors = {
        message: "Sessions can only be within 9am - 8pm on WeekDays",
      };
    }

    if (this.sessionType === "WeekEnd" && !isWeekend(value)) {
      errors = {
        message: "Sessions can only be within 10am - 10pm on WeekEnd",
      };
    }
    return errors;
  }

  validateTimeSlot(timeValue: string): { message?: string } {
    let errors = {};

    const startsAt = new Date(`01/01/2011 ${this.startsAt}`);
    const endsAt = new Date(`01/01/2011 ${timeValue}`);

    if (this.selectedTimeSlot) {
      const result = addMinutes(startsAt, parseInt(this.selectedTimeSlot));

      // If added minutes is not equal to the time entered, return error
      if (!isEqual(result, endsAt)) {
        errors = {
          message: `Time entered must be a ${this.selectedTimeSlot} minute duration`,
        };
      }
    }

    return errors;
  }

  setupFieldListeners() {
    // ============Session Type=======================
    $("[data-type='type']")?.addEventListener("change", (e) => {
      this.sessionType = (e.target as HTMLSelectElement).value as SessionType;
    });

    // ============Time Slot=======================
    $("[data-timeslot='timeslot']")?.addEventListener("change", (e) => {
      const value = (e.target as HTMLSelectElement).value as TimeSlot;
      this.selectedTimeSlot = value;

      value ? this.updateTimeFields(false) : this.updateTimeFields(true);
    });

    // ============Starts At=======================
    $("[data-startsat='startsAt']")?.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      const value = target.value;

      const errors = this.validateTime(value);

      if (getObjectKeys(errors).length > 0) {
        if (target.nextElementSibling) {
          target.nextElementSibling.innerHTML = `${errors.message}`;
        }
        return;
      } else {
        // Clear Errors
        target.nextElementSibling!.innerHTML = "";
      }

      this.startsAt = value;
    });

    // ============Ends At=======================
    $("[data-endsat='endsAt']")?.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      const value = target.value;

      const errors = this.validateTime(value);
      const errors2 = this.validateTimeSlot(value);

      if (
        getObjectKeys(errors).length > 0 ||
        getObjectKeys(errors2).length > 0
      ) {
        if (target.nextElementSibling) {
          target.nextElementSibling.innerHTML = `${
            errors.message || errors2.message
          }`;
        }
        return;
      } else {
        // Clear Errors
        target.nextElementSibling!.innerHTML = "";
      }

      this.endsAt = value;
    });
  }

  methods() {
    this.setupFieldListeners();
    this.handleFormSubmission();
    this.handleLogout();
  }

  render() {
    let isLoading = store.getState().merchant.isLoading;

    this.element!.innerHTML = `
    <section class="dashboard__section">
      <!-- NAVBAR -->
          <header class="h-16 flex items-center border-b border-slate-800 px-4">
            <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
                <a href="/merchant/dashboard" data-link>
                  <p class="text-2xl font-bold">CutSession</p>
                </a>
              
                <div class="flex items-center">
                    <button class="hover:underline mr-4">
                      <a href="/merchant/bookings" data-link>Bookings</a>
                    </button>
                    <button id="logout-btn" class="hover:underline">Log Out</button>
                </div> 
            </nav>
          </header>
        
      <div class="max-w-xl w-full mx-auto">
          <h2 class="text-2xl text-center font-bold my-8">Create New Sessions</h2>

            <form id="create-session">
                <div class="mb-6">
                    <label for="type" class="font-medium">Session Type</label>
                    <select id="type" name="type" data-type="type" class="border w-full h-12 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" >
                      <option value="" hidden>Select a Type</option>
                      <option value="WeekDay">WeekDay</option>
                      <option value="WeekEnd">WeekEnd</option>
                    </select>
                    <span class="error-msg text-red-600 text-xs mt-2"></span>
                </div>

                <div class="mb-6">
                    <label for="timeslot" class="font-medium">Time Slot</label>
                    <select id="timeslot" name="timeslot" data-timeslot="timeslot" class="border w-full h-12 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" >
                      <option value="" hidden>Select a Time Slot</option>
                      <option value="45">45m</option>
                      <option value="60">60m</option>
                      <option value="90">90m</option>
                    </select>
                    <span class="error-msg text-red-600 text-xs mt-2"></span>
                </div>

                <div class="mb-6">
                    <label class="font-medium">Starts At</label>
                    <input
                        type="time"
                        name="startsAt"
                        data-startsat="startsAt"
                        class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                        disabled
                        
                    />
                    <span class="error-msg text-red-600 text-xs mt-2"></span>
                </div>

                <div class="mb-6">
                    <label class="font-medium">Ends At</label>
                    <input
                        type="time"
                        name="endsAt"
                        data-endsat="endsAt"
                        class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                        disabled
                        
                    />
                    <span class="error-msg text-red-600 text-xs mt-2"></span>
                </div>

                <button class="w-full h-12 bg-slate-900 text-sm text-white rounded-md px-4 py-2 hover:bg-slate-800">
                  ${isLoading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    </section>
    `;

    this.methods();
  }
}
