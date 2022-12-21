import { StudioSessionProps } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import { navigateTo } from "../../router";
import store from "../../store";
import { handleFetchSessions } from "../../utils/functions";
import { $ID, checkAuthentication, logOut, routeTo } from "../../utils/helpers";

export type Params = { [k: string]: string };

export default class MerchantDashboard extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    checkAuthentication();

    const merchantId =
      "6f5e6405-bbec-465e-ac98-144889426e37" ||
      localStorage.getItem("merchantId");

    handleFetchSessions(merchantId as string);
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
      navigateTo("create");
    });
  }

  handleUserBookingsRoute() {
    const userBookingsBtn = $ID("all-bookings") as HTMLButtonElement;

    userBookingsBtn.addEventListener("click", (e) =>
      navigateTo(`${location.pathname}/bookings`)
    );
  }

  async handleCopyWidgetBtn() {
    const merchantId = localStorage.getItem("merchantId");
    return navigator.clipboard
      .writeText(
        `<script src="https://cdn.jsdelivr.net/gh/Young-Einstein10/cut-session@main/js/cut-session-widget.min.js" data-merchantId="${merchantId}" data-widget></script>`
      )
      .then(() => console.log("copied"))
      .catch((err) => {
        window.alert("Error copying script");
        console.log(err);
      });
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", () => logOut("merchant"));
  }

  methods() {
    this.handleCreateSession();
    $ID("copy-widget-btn")?.addEventListener("click", this.handleCopyWidgetBtn);
    // this.handleUserBookingsRoute();
    this.handleLogout();
  }

  render() {
    let sessions: StudioSessionProps[] =
      store.getState().merchant.sessions || [];

    this.element!.innerHTML = `
    <!-- --------------- DASHBOARD SECTION START --------------- -->
    <section class="dashboard__section">
      <header class="h-16 flex items-center border-b border-slate-800 px-4">
        <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
          <a href="/merchant/dashboard" data-link>
            <p class="text-2xl font-bold">CutSession</p>
          </a>

          <div class="flex items-center">
            <button class="hover:underline mr-4">
              <a href="${location.pathname}/bookings" data-link>Bookings</a>
            </button>
            <button id="logout-btn" class="hover:underline">Log Out</button>
          </div>
        </nav>
      </header>
    

      <div class="max-w-3xl w-full mx-auto">
        <div class="widget-container mt-8">
          <h2 class="text-2xl font-bold">Embeddable Widget</h2>

          <div class="mt-4">
            <p>Copy the script below and add to the body of your index.html page to include an embeddable widget in your website:</p>

            <blockquote class="mt-2 text-sm px-4 py-4 rounded-full overflow-x-auto border border-solid border-slate-600 flex items-center justify-between">
                <span class="text-sm flex-shrink-0 flex-grow">
                  <code class="text-xs flex-shrink-0 italic">
                    <span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">src</span><span class="o">=</span><span class="s">"https://...js" data-merchantId="&lt;YOUR_MERCHANT_ID&gt;" data-widget</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
                      </span></span>
                  </code>
                </span>
                  
                <button id="copy-widget-btn" class="hover:underline flex-shrink-0">
                  Copy
                </button>
            </blockquote>
          </div>
        </div>

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
