import { CreateStudioSessionPayload } from "./../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import { $, $ID, checkAuthentication, logOut } from "../../utils/helpers";
import { Params } from "./dashboard";
import { updateLoadingState } from "../../store/slices/merchantSlice";
import { notifySuccess } from "../../lib/toast";
import { navigateTo } from "../../router";
import api from "../../lib/api";

export default class CreateSession extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    checkAuthentication();
  }

  async handleSessionCreation() {
    const typeField = $("[data-type='type']") as HTMLInputElement;
    const startsAtField = $("[data-startsat='startsAt']") as HTMLInputElement;
    const endsAtField = $("[data-endsat='endsAt']") as HTMLInputElement;

    const merchantId = localStorage.getItem("merchantId") as string;

    try {
      const payload: CreateStudioSessionPayload = {
        endsAt: endsAtField.value,
        startsAt: startsAtField.value,
        type: typeField.value as CreateStudioSessionPayload["type"],
      };

      console.log(payload);

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

  methods() {
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
          <p class="text-2xl font-bold">CutSession</p>
          <button id="logout-btn" class="hover:underline">Log Out</button>
        </nav>
      </header>
        
      <div class="max-w-xl w-full mx-auto">
          <h2 class="text-2xl text-center font-bold my-8">Create New Sessions</h2>

            <form id="create-session">
                 <div class="mb-6">
                    <label class="font-medium">Session Type</label>
                    <select data-type="type" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                    >
                        <option value="WeekDay">WeekDay</option>
                        <option value="WeekEnd">WeekEnd</option>
                    </select>
                </div>

                <div class="mb-6">
                    <label class="font-medium">Starts At</label>
                    <input
                        type="time"
                        name="startsAt"
                        data-startsat="startsAt"
                        class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                    />
                </div>

                <div class="mb-6">
                    <label class="font-medium">Ends At</label>
                    <input
                        type="time"
                        name="endsAt"
                        data-endsat="endsAt"
                        class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                    />
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
