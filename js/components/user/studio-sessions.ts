import { StudioSessionProps } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import { navigateTo } from "../../router";
import store from "../../store";
import { handleFetchSessions } from "../../utils/functions";
import { $, $ID, $ll, checkAuthentication, logOut } from "../../utils/helpers";

export type Params = { [k: string]: string };

export default class StudioSessions extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    const studioId = params.id.split("/")[0];

    checkAuthentication();
    handleFetchSessions(studioId);
  }

  renderTableHeaders() {
    return `
      <tr>
        <th class="border-b border-slate-900 font-medium p-4 pl-8 pt-4 pb-3 text-black text-left">
          S/N
        </th>
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
        <th
        class="border-b border-slate-900 font-medium p-4 pr-8 pt-4 pb-3 text-black text-left"
      >
        Actions
      </th>
      </tr>
    `;
  }

  renderTableRows(data: StudioSessionProps[]) {
    return data
      .map(
        (session, i) => `
      <tr>
        <td class="border-b border-slate-900 p-4 pl-8 text-black">${i + 1}</td>
        <td class="border-b border-slate-900 p-4 pl-8 text-black">
          ${session.type}
        </td>
        <td class="border-b border-slate-900 p-4 text-black">${
          session.startsAt
        }</td>
        <td class="border-b border-slate-900 p-4 pr-8 text-black">
          ${session.endsAt}
        </td>
        <td class="border-b border-slate-900 p-4 pl-8 text-black">
                <button class="book-session-btn bg-slate-900 text-sm text-white rounded-md px-4 py-2 hover:bg-slate-800">     
                    Book
                </button>
        </td>
      </tr>
    `
      )
      .join("")
      .toString();
  }

  handleCreateSession() {
    const bookSessionBtn = $ID("book-session") as HTMLButtonElement;
    bookSessionBtn.addEventListener("click", () => {
      //   navigateTo("create");
    });
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", () => logOut("user"));
  }

  methods() {
    const bookSessionBtnList = $ll("button.book-session-btn");

    bookSessionBtnList.forEach((btn) => {
      btn.addEventListener("click", () => {
        navigateTo(`${location.pathname}/book`);
      });
    });

    this.handleLogout();
  }

  render() {
    let sessions: StudioSessionProps[] =
      store.getState().merchant.sessions || [];
    const weekDaySessions = sessions.filter(
      (session) => session.type === "WeekDay"
    );
    const weekEndSessions = sessions.filter(
      (session) => session.type === "WeekEnd"
    );

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
        <div class="relative rounded-xl overflow-auto">
          <div class="shadow-sm overflow-hidden my-8">
            <div>
              <h2 class="mb-4 font-medium">Sessions available during weekdays.</h2>
              <table
                class="border-collapse border border-solid border-slate-900 table-auto w-full text-sm"
              >
                <thead>
                  ${this.renderTableHeaders()}
                </thead>
                <tbody>
                  ${this.renderTableRows(weekDaySessions)}
                </tbody>
              </table>
            </div>


            <div class="mt-12">
              <h2 class="mb-4 font-medium">Sessions available during weekend.</h2>

              <table
                class="border-collapse border border-solid border-slate-900 table-auto w-full text-sm"
              >
                <thead>
                  ${this.renderTableHeaders()}
                </thead>
                <tbody>
                  ${this.renderTableRows(weekEndSessions)}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </section>
    <!-- --------------- DASHBOARD SECTION END --------------- -->    
    `;

    this.methods();
  }
}
