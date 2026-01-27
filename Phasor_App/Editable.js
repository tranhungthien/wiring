//=============================================
//                Label Mixin
//         Selectable(Editable(Input))
//=============================================
const Editable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.isEditing = false;
      this.isCommit = false;
      this.inputText = String(this.value);
    }

    commitEdit() {
      // turn input into numerical data
      if (!this.isEditing) return;

      const t = this.inputText.trim();
      if (!t) return;

      const v = parseFloat(t);
      if (!isNaN(v) && isFinite(v)) {
        this.value = v;
        //console.log("inside editable: ", v);
      }
      // Used in Detectable
      this.isCommit = true;
    }

    stopEditing() {
      this.isEditing = false;
      this.inputText = "";
    }

    keyPressed() {
      if (!this.isEditing) return;

      if (keyCode === BACKSPACE || keyCode === DELETE) {
        this.inputText = this.inputText.slice(0, -1);
        return false;
      }
      if (keyCode === ENTER || keyCode === RETURN) {
        this.commitEdit();
        this.stopEditing();
        return false;
      }
      if (keyCode === ESCAPE) {
        this.stopEditing();
        return false;
      }

      const ch = key;
      if (
        (ch >= "0" && ch <= "9") ||
        ch === "." ||
        ch === "-" ||
        ch === "e" ||
        ch === "E"
      )
        this.inputText += ch;
    }
  };
