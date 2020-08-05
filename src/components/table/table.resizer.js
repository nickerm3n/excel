import {$} from "@core/dom";

export function tableResizer(event, $root) {
  if (event.target.dataset.resize) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const type = $resizer.data.resize;
    let value;

    document.onmousemove = (e) => {
      if (type === "col") {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: delta * -1 + 'px'})
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: delta * -1 + 'px'})
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === "col") {
        cells.forEach((col) => $(col).css({ width: value + "px" }));
        $resizer.css({right: "0"});
      } else {
        $parent.css({height: value + 'px'});
        $resizer.css({bottom: "0"});
      }
    }
  }
}
