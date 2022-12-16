import Component from "../../lib/component";
import store from "../../store";
import { $ID, checkAuthentication } from "../../utils/helpers";
import { Params } from "./studio-sessions";

export default class UserDashboard extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    console.log(params);

    checkAuthentication();
  }

  loadingTemplate() {
    return `
      <main class="mt-4 max-w-4xl w-full mx-auto">
        <div class="text-center">
          <p class="text-lg italic font-medium">Loading...</p>
        </div>
      </main>
    `;
  }

  mainTemplate() {}

  methods() {}

  render() {
    let isLoading = store.getState().merchant.isLoading;
    let studios = store.getState().merchant.studio?.data || [];

    this.element!.innerHTML = `
        <!-- --------------- DASHBOARD SECTION START --------------- -->
        <section class="dashboard__section">
          <!-- NAVBAR -->
          <header class="h-16 flex items-center border-b border-slate-800 px-4">
            <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
              <p class="text-2xl font-bold">CutSession</p>
              
              <div class="flex items-center">
                <button id="my-bookings" class="hover:underline mr-4">My Bookings</button>
                <button id="logout-btn" class="hover:underline">Log Out</button>
            </div>        </nav>
          </header>
        
          ${isLoading ? this.loadingTemplate() : this.mainTemplate(studios)}
        </section>
        <!-- --------------- DASHBOARD SECTION END --------------- -->    
        `;

    this.methods();
  }
}
