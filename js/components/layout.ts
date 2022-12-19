import Component from "../lib/component";
import { $ID } from "../utils/helpers";
import { Params } from "./merchant/dashboard";

export default class Layout extends Component {
  constructor(params: Params) {
    super({
      element: $ID("root") as HTMLElement,
      params,
    });
  }

  render() {
    this.element!.innerHTML = `
        <main>
            <header class="h-16 flex items-center border-b border-slate-800 px-4">
                <nav class="flex justify-between items-center max-w-4xl w-full mx-auto">
                <p class="text-2xl font-bold">CutSession</p>

                <div class="flex items-center">
                    <button class="hover:underline mr-4">
                    <a href="${location.pathname}/bookings" data-link>Bookings</a>
                    </button>
                    <button id="logout-btn" class="hover:underline">Log Out</button>
                </div>
                </nav>
            </header>

            <section id="app"></section>
        </main>
    `;
  }
}
