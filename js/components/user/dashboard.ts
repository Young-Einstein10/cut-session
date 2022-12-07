import { IClientProps, UserProps } from "../../lib/api/auth";
import Component from "../../lib/component";
import store from "../../store";
import {
  handleFetchMerchants,
  handleSearchMerchants,
} from "../../utils/functions";
import { $, $ID, checkAuthentication, logOut } from "../../utils/helpers.js";

export default class UserDashboard extends Component {
  constructor() {
    super({
      element: document.getElementById("app") as HTMLElement,
    });

    checkAuthentication();
    handleFetchMerchants();
  }

  handleStudioSearch() {
    const searchForm = $(".studio_search") as HTMLFormElement;
    const searchInput = $("[data-search='search']") as HTMLInputElement;

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!searchInput.value) return;

      handleSearchMerchants(searchInput.value);
    });
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", logOut);
  }

  methods() {
    this.handleStudioSearch();
    this.handleLogout();
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

  studioItemTemplate(studio: UserProps) {
    return `
      <!-- STUDIO ITEM START -->
      <div class="p-6 shadow-md rounded-xl mb-8">
        <div>
          <div class="flex justify-between items-center">
            <p class="text-2xl font-medium">${studio.name}</p>
            <p>${studio.phoneNumber}</p>
          </div>

          <div class="flex justify-between items-center italic text-slate-500">
            <span class="">${studio.email}</span>
            <span>${studio.cityOfOperation}</span>
          </div>

          <div class="mt-4">
            <button
              class="bg-slate-900 text-sm text-white rounded-md px-4 py-2 hover:bg-slate-800"
              data-merchantid='${studio.merchantId}'
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>
      <!-- STUDIO ITEM END -->
    `;
  }

  mainTemplate(studios: IClientProps["data"]) {
    let isSearching = store.getState().merchant.isSearching;

    return `
    <main class="max-w-4xl w-full mx-auto">
    <p class="my-4">Popular Studios Available:</p>

    <form class="studio_search my-6 flex items-center">
      <label class="w-full">
        <input
          data-search="search"
          class="border-slate-900 px-4 py-2 border-solid border-[1px] w-full h-12"
          type="text"
          placeholder="Search studios by name / city"
        />
      </label>

      <button
        class="ml-4 bg-slate-900 text-sm text-white rounded-none px-6 py-2 h-12"
      >
        Search
      </button>
    </form>

    ${
      isSearching
        ? `
        <div class="mt-2 text-center">
          <p class="text-lg italic font-medium">Searching...</p>
        </div>
      `
        : `<div class="studio__list mt-2">
      ${studios
        .map((studio) => this.studioItemTemplate(studio))
        .join("")
        .toString()}
      </div>`
    }
  </main>
    `;
  }

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
          <button class="hover:underline">Log Out</button>
        </nav>
      </header>
    
      ${isLoading ? this.loadingTemplate() : this.mainTemplate(studios)}
    </section>
    <!-- --------------- DASHBOARD SECTION END --------------- -->    
    `;

    this.methods();
  }
}
