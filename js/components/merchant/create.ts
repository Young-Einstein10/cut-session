import Component from "../../lib/component";
import store from "../../store";
import { $ID, checkAuthentication, logOut } from "../../utils/helpers";

export default class CreateSession extends Component {
  constructor() {
    super({
      element: $ID("app") as HTMLElement,
    });

    checkAuthentication();
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", logOut);
  }

  methods() {
    this.handleLogout();
  }

  render() {
    this.element!.innerHTML = `
    <!-- --------------- DASHBOARD SECTION START --------------- -->
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

            <form>
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
                        type="datetime-local"
                        name="startsAt"
                        data-startsat="startsAt"
                        class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                    />
                </div>

                <div class="mb-6">
                    <label class="font-medium">Ends At</label>
                    <input
                        type="datetime-local"
                        name="endsAt"
                        data-startsat="endsAt"
                        class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                    />
                </div>

                <button class="w-full h-12 bg-slate-900 text-sm text-white rounded-md px-4 py-2 hover:bg-slate-800">
                    Save
                </button>
            </form>
        </div>
    </section>
    <!-- --------------- DASHBOARD SECTION END --------------- -->    
    `;

    this.methods();
  }
}
