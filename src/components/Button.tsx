import m, { Component, Vnode } from "mithril";

interface Attrs {
  onclick: () => void;
}

const Button: Component<Attrs> = {
  view: ({ attrs }: Vnode<Attrs>) => (
    <button class="button" onclick={attrs.onclick}>
      Click Me
    </button>
  ),
};

export default Button;
