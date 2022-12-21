import { IClientProps, UserProps } from "../../lib/api/auth";
import Component from "../../lib/component";
import { navigateTo } from "../../router";
import store from "../../store";
import {
  handleFetchMerchants,
  handleSearchMerchants,
} from "../../utils/functions";
import {
  $,
  $ID,
  $ll,
  checkAuthentication,
  logOut,
} from "../../utils/helpers.js";
import { Params } from "../merchant/dashboard";

export default class UserDashboard extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    console.log(params);

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
    logoutBtn.addEventListener("click", () => logOut("user"));
  }

  handleStudioClick() {
    const studioItemList = $ll("article.studio-item");

    studioItemList.forEach((studioItem) => {
      studioItem?.addEventListener("click", (e) => {
        const href = (e.target as HTMLElement).getAttribute("data-href");

        if (href) {
          return navigateTo(href);
        }

        return "";
      });
    });
  }

  handleUserBookingsRoute() {
    const userBookingsBtn = $ID("my-bookings") as HTMLButtonElement;

    userBookingsBtn.addEventListener("click", (e) =>
      navigateTo(`${location.pathname}/bookings`)
    );
  }

  methods() {
    this.handleStudioSearch();
    // this.handleUserBookingsRoute();
    this.handleStudioClick();
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
      <article class="studio-item px-4 sm:px-6 py-6 mb-8 rounded-xl hover:cursor-pointer hover:shadow-md" data-studio-id="${studio.merchantId}" data-href="${location.pathname}/${studio.merchantId}">
        <a>
          <div>
            <div class="flex flex-col sm:flex-row flex-wrap justify-between sm:items-center">
              <p class="text-2xl font-medium">${studio.name}</p>
              <p>${studio.phoneNumber}</p>
            </div>

            <div class="flex flex-col sm:flex-row flex-wrap justify-between sm:items-center italic text-slate-500">
              <span class="flex-wrap flex-shrink">${studio.email}</span>
              <span>${studio.cityOfOperation}</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  mainTemplate(studios: IClientProps["data"]) {
    let isSearching = store.getState().merchant.isSearching;

    return `
      <div class="max-w-4xl w-full mx-auto px-4">
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
      </div>
    `;
  }

  render() {
    let isLoading = store.getState().merchant.isLoading;
    let studios =
      store
        .getState()
        .merchant.studio?.data?.filter((studio) =>
          Boolean(studio.merchantId)
        ) || [];

    this.element!.innerHTML = `
    <!-- --------------- DASHBOARD SECTION START --------------- -->
    <section class="dashboard__section">
      <!-- NAVBAR -->
      <header class="h-16 flex items-center border-b border-slate-800 px-4">
        <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
          <a href="/user/dashboard" data-link>
            <p class="text-2xl font-bold">CutSession</p>
          </a>
          
          <div class="flex items-center">
              <button id="session-bookings" class="hover:underline mr-4">
                <a href="/user/session-bookings" data-link>
                  Session Bookings
                </a>
              </button>
              <button id="logout-btn" class="hover:underline">Log Out</button>
          </div>       
        </nav>
      </header>
    
      ${isLoading ? this.loadingTemplate() : this.mainTemplate(studios)}
    </section>
    <!-- --------------- DASHBOARD SECTION END --------------- -->    
    `;

    this.methods();
  }
}
