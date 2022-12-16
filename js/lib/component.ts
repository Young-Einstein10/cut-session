import { Params } from "../components/merchant/dashboard";
import store from "../store";

export interface ComponentProps {
  render: () => void;
  element: HTMLElement;
  params?: Params;
}

export default class Component {
  element: HTMLElement | null;
  params?: Params;

  constructor(props: Partial<ComponentProps> = {}) {
    let self = this;

    this.params = props.params;

    // We're setting a render function as the one set by whatever inherits this base
    // class or setting it to an empty by default. This is so nothing breaks if someone
    // forgets to set it.
    this.render = this.render || function () {};

    store.subscribe(() => {
      console.log(store.getState());
      self.render();
    });

    // Store the HTML element to attach the render to if set
    if (props.hasOwnProperty("element")) {
      this.element = props.element || null;
    }
  }

  render() {}
}
