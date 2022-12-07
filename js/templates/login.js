export default `
  <!-- --------------- LOGIN SECTION START --------------- -->
  <section class="login__section">
    <div
      class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
    >
      <form class="relative py-3 sm:w-96 mx-auto text-center">
        <span class="text-3xl font-medium">Login</span>
        <div class="mt-4 bg-white shadow-md rounded-lg text-left">
          <div class="h-2 bg-slate-700 rounded-t-md"></div>
          <div class="px-8 py-6">
            <div class="mt-3">
              <label class="block font-semibold">Email</label>
              <input
                type="text"
                placeholder="Email"
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

  <script>
    console.log('Logging from the Login Template)
  </script>
  <!-- --------------- LOGIN SECTION END --------------- -->
`;
