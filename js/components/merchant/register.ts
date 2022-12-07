import Component from "../../lib/component.js";

export default class Register extends Component {
  constructor() {
    super({
      element: document.getElementById("app") as HTMLElement,
    });
  }

  methods() {
    console.log("From the Register Component");
    setTimeout(() => {
      console.log("Logged after 1 seconds");
    }, 100);
    console.log("Logged immediately component mounts");
  }

  render() {
    this.element!.innerHTML = `
    <!-- --------------- LOGIN SECTION START --------------- -->
    <section class="register__section">
      <div
        class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
      >
        <form class="relative py-3 sm:w-96 mx-auto text-center">
          <span class="text-3xl font-medium">Register</span>
          <div class="mt-4 bg-white shadow-md rounded-lg text-left">
            <div class="h-2 bg-slate-700 rounded-t-md"></div>
            <div class="px-8 py-6">
              <div class="mt-3">
                <label class="block font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <div class="mt-3">
                <label class="block font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="username"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <div class="mt-3">
                <label class="block font-semibold">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <div class="mt-3">
                <label class="block font-semibold">City of Residence</label>
                <input
                  type="text"
                  placeholder="cityOfResidence"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <div class="mt-3">
                <label class="block font-semibold">Phone Number</label>
                <input
                  type="text"
                  placeholder="phoneNumber"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <div class="mt-3">
                <label class="block font-semibold">Date Of Birth</label>
                <input
                  type="date"
                  placeholder="dob"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <div class="mt-3">
                <label class="block font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
              </div>
  
              <button
                type="submit"
                class="mt-4 bg-slate-700 text-white py-2 px-6 rounded-md w-full"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <!-- --------------- LOGIN SECTION END --------------- -->
    `;

    this.methods();
  }
}
