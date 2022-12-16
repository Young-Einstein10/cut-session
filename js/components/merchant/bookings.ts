import { SessionBookingProps } from "../../lib/api/studioSessions";
import Component from "../../lib/component";
import store from "../../store";
import { handleFetchBookings } from "../../utils/functions";
import { $ID, checkAuthentication } from "../../utils/helpers";

export default class MerchantBookings extends Component {
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
      <tr>
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
        <td class="border-b border-slate-900 p-4 pl-8 text-black">
                <button class="book-session-btn underline">     
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

  methods() {}

  render() {
    let isLoading = store.getState().merchant.isLoading;
    let bookings = store.getState().merchant.bookings.data || [];

    this.element!.innerHTML = `
        <!-- --------------- DASHBOARD SECTION START --------------- -->
        <section class="dashboard__section">
          <!-- NAVBAR -->
          <header class="h-16 flex items-center border-b border-slate-800 px-4">
            <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
              <p class="text-2xl font-bold">CutSession</p>
              
                <div class="flex items-center">
                    <button id="my-bookings" class="hover:underline mr-4">Bookings</button>
                    <button id="logout-btn" class="hover:underline">Log Out</button>
                </div> 
            </nav>
          </header>
        
          ${isLoading ? this.loadingTemplate() : this.mainTemplate(bookings)}
        </section>
        <!-- --------------- DASHBOARD SECTION END --------------- -->    
        `;

    this.methods();
  }
}
