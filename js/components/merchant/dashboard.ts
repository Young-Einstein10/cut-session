import { StudioSessionProps } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import {
  handleFetchMerchants,
  handleFetchSessions,
} from "../../utils/functions";
import { $ID, checkAuthentication, logOut, routeTo } from "../../utils/helpers";

export default class MerchantDashboard extends Component {
  constructor() {
    super({
      element: $ID("app") as HTMLElement,
    });

    checkAuthentication();
    // handleFetchMerchants().then(resp => {
    //   const merchantId = resp?.data.find(user => user.merchantId)
    // })

    handleFetchSessions("6f5e6405-bbec-465e-ac98-144889426e37");
  }

  renderTableHeaders() {
    return `
      <tr>
        <th
          class="border-b border-slate-900 font-medium p-4 pl-8 pt-4 pb-3 text-black text-left"
        >
          Type
        </th>
        <th
          class="border-b border-slate-900 font-medium p-4 pt-4 pb-3 text-black text-left"
        >
          Starts At
        </th>
        <th
          class="border-b border-slate-900 font-medium p-4 pr-8 pt-4 pb-3 text-black text-left"
        >
          Ends At
        </th>
      </tr>
    `;
  }

  renderTableRows(data: StudioSessionProps[]) {
    return data
      .map(
        (session) => `
      <tr>
        <td class="border-b border-slate-900 p-4 pl-8 text-black">
          ${session.type}
        </td>
        <td class="border-b border-slate-900 p-4 text-black">${session.startsAt}</td>
        <td class="border-b border-slate-900 p-4 pr-8 text-black">
          ${session.endsAt}
        </td>
      </tr>
    `
      )
      .join("")
      .toString();
  }

  handleCreateSession() {
    const createSessionBtn = $ID("create-session") as HTMLButtonElement;
    createSessionBtn.addEventListener("click", () => {
      routeTo("create");
    });
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", logOut);
  }

  methods() {
    this.handleCreateSession();
    this.handleLogout();
  }

  render() {
    let sessions: StudioSessionProps[] =
      store.getState().merchant.sessions || [];

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
    

      <div class="max-w-3xl w-full mx-auto">
        <div class="flex justify-between items-center mt-8 mb-4">
          <h2 class="text-2xl font-bold">All Available Sessions</h2>
          <button id="create-session" 
          class="bg-slate-900 text-sm text-white rounded-md px-4 py-2 hover:bg-slate-800"     
          >Create Session</button>
        </div>

        <div class="relative rounded-xl overflow-auto">
          <div class="shadow-sm overflow-hidden my-8">
            <table
              class="border-collapse border border-solid border-slate-900 table-auto w-full text-sm"
            >
              <thead>
                ${this.renderTableHeaders()}
              </thead>
              <tbody>
                ${this.renderTableRows(sessions)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </section>
    <!-- --------------- DASHBOARD SECTION END --------------- -->    
    `;

    this.methods();
  }
}
