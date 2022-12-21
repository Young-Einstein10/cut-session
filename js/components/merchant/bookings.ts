import { logOut } from "./../../utils/helpers";
import { SessionBookingProps } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import { handleFetchBookings } from "../../utils/functions";
import { $, $ID, $ll, checkAuthentication } from "../../utils/helpers";
import ldCover from "ldcover";

interface ModalProps {
  toggle: () => void;
}

export default class MerchantBookings extends Component {
  modal: ModalProps | null = null;
  selectedBooking?: SessionBookingProps;

  constructor() {
    super({
      element: $ID("app") as HTMLElement,
    });

    checkAuthentication();

    const merchantId = localStorage.getItem("merchantId") as string;
    handleFetchBookings({ merchant: merchantId });
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

  mainTemplate(bookings: SessionBookingProps[]) {
    return `
        <div class="max-w-3xl w-full mx-auto">
            <div class="relative rounded-xl overflow-auto">
                <div class="shadow-sm overflow-hidden my-8">
                    <div>
                    <h2 class="text-2xl font-bold mb-8">All Bookings</h2>

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
    `;
  }

  onClickViewBookingDetail(self: typeof this) {
    self?.modal?.toggle();

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
    logoutBtn.addEventListener("click", () => logOut("merchant"));
  }

  setupListeners() {
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
          this.onClickViewBookingDetail(this);
        })
      );
    }
  }

  methods() {
    this.handleLogout();
    this.setupListeners();

    this.modal = new ldCover({ root: "#modal" });
  }

  render() {
    let isLoading = store.getState().merchant.isLoading;
    let bookings = store.getState().merchant.bookings.data || [];

    this.element!.innerHTML = `
        <section class="bookings__section">
          <!-- NAVBAR -->
          <header class="h-16 flex items-center border-b border-slate-800 px-4">
            <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
            <a href="/merchant/dashboard" data-link>
            <p class="text-2xl font-bold">CutSession</p>
          </a>
              
                <div class="flex items-center">
                    <button id="my-bookings" class="hover:underline mr-4">Bookings</button>
                    <button id="logout-btn" class="hover:underline">Log Out</button>
                </div> 
            </nav>
          </header>

          <div id="modal">
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
        
          ${isLoading ? this.loadingTemplate() : this.mainTemplate(bookings)}
        </section>
        `;

    this.methods();
  }
}
