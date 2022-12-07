import Component from "../lib/component";

export default class MerchantDashboard extends Component {
  constructor() {
    super({
      element: document.getElementById("app") as HTMLElement,
    });
  }

  methods() {
    console.log("From the Count Component");
    setTimeout(() => {
      console.log("Logged after 1 seconds");
    }, 100);
    console.log("Logged immediately component mounts");
  }

  /**
   * React to state changes and render the component's HTML
   *
   * @returns {void}
   */
  render() {
    // let suffix = store.state.items.length !== 1 ? "s" : "";
    // let emoji = store.state.items.length > 0 ? "🙌" : "😢";

    this.methods();

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
    
    </section>
    <!-- --------------- DASHBOARD SECTION END --------------- -->    
    `;
  }
}
