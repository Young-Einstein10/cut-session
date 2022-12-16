import api from "../../lib/api";
import { BookingPayload } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import { updateLoadingState } from "../../store/slices/merchantSlice";
import { $, $ID, checkAuthentication, logOut } from "../../utils/helpers";
import { Params } from "./studio-sessions";
import { navigateTo } from "../../router";
import { notifyError, notifySuccess } from "../../lib/toast";
import { isAxiosError } from "axios";

export default class BookSession extends Component {
  params?: Params | undefined;

  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    this.params = { ...params };
    checkAuthentication();
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", () => logOut("user"));
  }

  async handleSessionBooking(sessionId: string) {
    const titleField = $("[data-title='title']") as HTMLInputElement;
    const notesField = $("[data-notes='notes']") as HTMLInputElement;

    const [dd, mm, yyyy] = new Date().toLocaleDateString().split("/");
    const bookingDate = `${yyyy}-${mm}-${dd}`;

    try {
      const payload: BookingPayload = {
        title: titleField!.value,
        notes: notesField!.value,
        sessionId: "6f5e6405-cdep-465e-ac98-144889426e37" || sessionId,
        userId:
          "6f5e6405-bbec-qaep-ac98-144889426e37" ||
          (localStorage.getItem("userId") as string),
        date: bookingDate,
      };

      store.dispatch(updateLoadingState(true));

      const response = await api.studioSession.bookStudioSession(payload);

      console.log(response);

      store.dispatch(updateLoadingState(false));

      notifySuccess("Booking reserved successfully.");

      navigateTo("/user/dashboard");
    } catch (error) {
      store.dispatch(updateLoadingState(false));
      console.log(error);
      if (isAxiosError(error)) {
        notifyError(error.response?.data.message || "An error occurred");
      }
    }
  }

  async handleFormSubmission() {
    const form = $ID("book-session-form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSessionBooking(this.params!.id);
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
            <h2 class="text-2xl text-center font-bold my-8">Book A Session</h2>

            <form id="book-session-form">
              <div class="mb-6">
                <label class="font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  data-title="title"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>

              <div class="mb-6">
                <label class="font-medium block">Notes</label>
                <textarea
                  name="notes"
                  rows="6"
                  data-notes="notes"
                  class="border block w-full px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                ></textarea>
              </div>

              <div>
                <button class="w-full h-12 bg-slate-900 text-sm text-white rounded-md px-4 py-2 hover:bg-slate-800">
                  ${isLoading ? "Booking..." : "Make Booking"}
                </button>
              </div>
            </form>
        </div>
      </section>
    `;

    this.methods();
  }
}
