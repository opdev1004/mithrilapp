import m, { Component, Vnode } from "mithril";

interface Attrs {
  value: string;
  oninput: (val: string) => void;
}

const InputRenderer: Component<Attrs> = {
  view: ({ attrs }: Vnode<Attrs>) => (
    <>
      <div class="container">
        <input
          type="text"
          placeholder="Type Input to Render"
          value={attrs.value}
          oninput={(e: InputEvent) =>
            (attrs.value = (e.target as HTMLInputElement).value)
          }
        />
        <div class="output">You typed: {attrs.value}</div>
      </div>
    </>
  ),
};

export default InputRenderer;
