import { GetBookingPayload } from "./../../lib/api/studioSessions";
import { SessionBookingProps } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import {
  handleFetchBookings,
  handleFetchMerchants,
} from "../../utils/functions";
import { $, $ID, $ll, checkAuthentication, logOut } from "../../utils/helpers";
import { Params } from "./studio-sessions";
import ldCover from "ldcover";

interface ModalProps {
  toggle: () => void;
}

export default class SessionBookings extends Component {
  viewModal: ModalProps | null = null;
  selectedBooking?: SessionBookingProps;

  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });

    checkAuthentication();
    handleFetchMerchants();
  }

  loadingTemplate() {
    return `
      <div class="mt-4 max-w-4xl w-full mx-auto">
        <div class="text-center">
          <p class="text-lg italic font-medium">Loading...</p>
        </div>
      </div>
    `;
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
          Booking Ref
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

  renderTableRows(data: SessionBookingProps[]) {
    console.log({ data });
    return data
      .map(
        (booking, i) => `
      <tr data-bookingid="${booking.bookingId}">
        <td class="border-b border-slate-900 p-4 pl-8 text-black">${i + 1}</td>
        <td class="border-b border-slate-900 p-4 pl-8 text-black">
          ${booking.bookingRef}
        </td>
        <td class="border-b border-slate-900 p-4 text-black">${
          booking.startsAt
        }</td>
        <td class="border-b border-slate-900 p-4 pr-8 text-black">
          ${booking.endsAt}
        </td>
        <td class="border-b border-slate-900 pr-4 pl-8 text-black">
                <button class="view-booking-details py-2 underline">     
                    view
                </button>
        </td>
      </tr>
    `
      )
      .join("")
      .toString();
  }

  searchBookingsForm() {
    let studios =
      store
        .getState()
        .merchant.studio?.data?.filter((studio) =>
          Boolean(studio.merchantId)
        ) || [];

    return `
      <form class="session_bookings_search my-6">
        <div class="booking-filters mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <label for="city" class="block">
            <span>City</span>
            <input
              id="city"
              data-city="city"
              class="border-slate-900 text-sm mt-2 px-4 py-2 border-solid border w-full h-12"
              type="text"
              placeholder="Enter City"
              required
            />
          </label>

          <div>
            <label for="merchant" class="font-medium">Merchant</label>
            <select id="merchant" name="merchant" data-merchant="merchant" class="border border-slate-900 border-solid w-full h-12 px-3 mt-2" required>
              <option value="" hidden>Select Merchant</option>
                ${studios
                  .map(
                    (studio) => `
                      <option value="${studio.merchantId}">
                        ${studio.name}
                      </option>`
                  )
                  .join("")
                  .toString()}
            </select>
          </div>

          <div>
            <label for="period" class="font-medium">Period</label>
            <select id="period" name="period" data-period="period" class="border border-slate-900 border-solid w-full h-12 px-3 mt-2" required>
              <option value="" hidden>Select Period</option>
              <option value="single">Single Date</option>
              <option value="range">Date Range</option>
            </select>
          </div>

          <div class="date"></div>
          <div class="range-1"></div>
          <div class="range-2"></div>
        
            <div class="">
              <button class="w-full bg-slate-900 text-sm text-white rounded-none px-6 py-2 h-12">
                Search
              </button>
            </div>
        </div>

      </form>
    `;
  }

  mainTemplate(bookings: SessionBookingProps[]) {
    let isSearching = store.getState().merchant.isLoading;

    return `
      <div class="max-w-4xl w-full mx-auto px-4">
        <h4 class="font-bold text-md my-4">Search Bookings:</h4>

        ${this.searchBookingsForm()}

        ${
          isSearching
            ? `
            <div class="mt-2 text-center">
              <p class="text-lg italic font-medium">Searching...</p>
            </div>
          `
            : `
              <div class="max-w-3xl w-full mx-auto">
                <div class="relative rounded-xl overflow-auto">
                    <div class="shadow-sm overflow-hidden my-8">
                        <div>
                        <h2 class="font-bold text-md mb-8">All Bookings</h2>

                        <table
                            class="border-collapse border border-solid border-slate-900 table-auto w-full text-sm"
                        >
                            <thead>
                            ${this.renderTableHeaders()}
                            </thead>
                            <tbody>
                            ${this.renderTableRows(bookings)}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
              </div> 
            `
        }
      </div>
    `;
  }

  onClickViewBookingDetail(self: typeof this) {
    self?.viewModal?.toggle();

    const booking = self?.selectedBooking;

    ($(".modal-content") as HTMLDivElement).innerHTML = `
      <p class="mb-4">
        <strong>Booking Ref:</strong>
        <span>${booking?.bookingRef}</span> 
      </p> 

      <p class="mb-4">
        <strong>Title:</strong>
        <span>${booking?.title}</span> 
      </p> 

      <p class="mb-4">
        <strong>Notes:</strong>
        <span>${booking?.notes}</span> 
      </p> 

      <p class="mb-4">
        <strong>Starts At:</strong>
        <span>${booking?.startsAt}</span> 
      </p> 

      <p class="mb-4">
        <strong>Ends At:</strong>
        <span>${booking?.endsAt}</span> 
      </p> 

      <p>
        <strong>Date:</strong>
        <span>${booking?.date}</span> 
      </p> 
    `;
  }

  handleLogout() {
    const logoutBtn = $ID("logout-btn") as HTMLButtonElement;
    logoutBtn.addEventListener("click", () => logOut("user"));
  }

  formSearchListeners() {
    $("[data-period='period']")?.addEventListener("change", (e) => {
      const value = (e.target as HTMLSelectElement).value as "single" | "range";

      if (value === "single") {
        // console.log($('.booking-filters .date'))

        $(".booking-filters .date")!.innerHTML = `
        <label for="singledate" class="font-medium">Date</label>
        <input 
          type="date" id="singledate" name="singledate" data-singledate="singledate" class="border border-slate-900 border-solid w-full h-12 px-3 mt-2" required
        >      
        `;

        $(".booking-filters .range-1")!.innerHTML;
        $(".booking-filters .range-2")!.innerHTML;
      }

      if (value === "range") {
        $(".booking-filters .date")!.innerHTML = "";

        $(".booking-filters .range-1")!.innerHTML = `
          <label for="range-1" class="font-medium">Range 1</label>
          <input 
            type="date" id="range-1" name="range-1" data-range1="range1" class="border border-slate-900 border-solid w-full h-12 px-3 mt-2" required
          >      
        `;

        $(".booking-filters .range-2")!.innerHTML = `
          <label for="range-2" class="font-medium">Range 2</label>
          <input 
            type="date" id="range-2" name="range-2" data-range2="range2" class="border border-slate-900 border-solid w-full h-12 px-3 mt-2" required
          >
        `;
      }
    });
  }

  async handleFormSearchSubmission(e: SubmitEvent) {
    e.preventDefault();

    const city = ($("[data-city='city']") as HTMLInputElement)!;
    const merchant = $("[data-merchant='merchant']") as HTMLSelectElement;
    const period = $("[data-period='period']") as HTMLSelectElement;
    const date = $("[data-singledate='singledate']") as HTMLInputElement;
    const range1 = $("[data-range1='range1']") as HTMLInputElement;
    const range2 = $("[data-range2='range2']") as HTMLInputElement;

    let payload: GetBookingPayload = {
      city: city.value,
      merchant: merchant.value,
    };

    if (period.value === "single") {
      payload.period = date.value;
    }

    if (period.value === "range") {
      payload.period = `${range1.value}:${range2.value}`;
    }

    await handleFetchBookings(payload);
  }

  viewBookingDetailsListeners() {
    const bookings = store.getState().merchant.bookings.data || [];

    if (bookings.length > 0) {
      const btnList = $ll(".view-booking-details");
      btnList.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const bookings = store.getState().merchant.bookings.data || [];
          const tr = (e.target as HTMLButtonElement).parentElement
            ?.parentElement as HTMLTableRowElement;
          const bookingId = tr.dataset.bookingid;
          const data = bookings.find(
            (booking) => booking.bookingId === bookingId
          );

          this.selectedBooking = data;
          console.log(this);
          this.onClickViewBookingDetail(this);
        })
      );
    }
  }

  setupListeners() {
    // Listener for 'Period' Select
    this.formSearchListeners();

    ($(".session_bookings_search") as HTMLFormElement)?.addEventListener(
      "submit",
      this.handleFormSearchSubmission
    );

    this.viewBookingDetailsListeners();
  }

  methods() {
    this.handleLogout();
    this.setupListeners();

    this.viewModal = new ldCover({ root: "#view-modal" });
  }

  render() {
    let bookings = store.getState().merchant.bookings.data || [];

    this.element!.innerHTML = `
        <section class="bookings__section">
          <!-- NAVBAR -->
          <header class="h-16 flex items-center border-b border-slate-800 px-4">
            <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
              <p class="text-2xl font-bold">
                <a href="/user/dashboard" data-link>
                  CutSession
                </a>
              </p>  
              
                <div class="flex items-center">
                    <button id="my-bookings" class="hover:underline mr-4">Session Bookings</button>
                    <button id="logout-btn" class="hover:underline">Log Out</button>
                </div> 
            </nav>
          </header>

          <div id="view-modal">
            <div class="base w-full !max-w-xl">
              <div class="inner">
                <div class="body">
                  <header class="px-6 py-4 border-b border-slate-900">
                      <h2 class="font-bold text-lg">Booking Details</h2>
                  </header>

                  <div class="modal-content mt-6 px-6 pb-6"></div>
                </div>
              </div>
            </div>
          </div>
        
          ${this.mainTemplate(bookings)}
        </section>
        `;

    this.methods();
  }
}
