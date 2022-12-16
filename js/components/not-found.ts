import Component from "../lib/component";
import { $ID } from "../utils/helpers";
import { Params } from "./merchant/dashboard";

export default class NotFound extends Component {
  constructor(params: Params) {
    super({
      element: $ID("app") as HTMLElement,
      params,
    });
  }

  render() {
    this.element!.innerHTML = `
        <section class="notfound__section">
            <h1 class="text-4xl">Page Not Found</h1>
        </section>
    `;
  }
}
