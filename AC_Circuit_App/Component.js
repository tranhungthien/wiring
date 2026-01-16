//=============================================
//               Component Mixin
//  Component(Rotatable(Draggable(Placeable)))
//=============================================
const Component = (Base) =>
  class extends Base {
    constructor(unit, ...args) {
      super(...args);
      this._id = null;
      this._idLabel = null;
      this._isProbing = false;
      this.unit = String(unit).toLowerCase();
      //----------- not ideal -------------
      this.voltageLabel = new Label(this.c, 0, "V", true);
      this.currentLabel = new Label(this.c, 0, "A", true);

      Object.assign(this, {
        frequencyLabel: null,
        phaseLabel: null,
        impedanceLabel: null,
        reactiveLabel: null,
      });

      const unitKey = String(unit).toLowerCase();

      const cfg = {
        v: {
          voltageLabel: { symbol: "V", value: 0, polar: false },
          currentLabel: { symbol: "A", value: 0, polar: true },
          frequencyLabel: { symbol: "Hz", value: 50, polar: false },
          phaseLabel: { symbol: "°", value: 0, polar: false },
        },
        r: {
          voltageLabel: { symbol: "V", value: 0, polar: true },
          currentLabel: { symbol: "A", value: 0, polar: true },
          impedanceLabel: { symbol: "Ω", value: 1, polar: false },
        },
        l: {
          voltageLabel: { symbol: "V", value: 0, polar: true },
          currentLabel: { symbol: "A", value: 0, polar: true },
          impedanceLabel: { symbol: "Ω", value: 1, polar: false },
          reactiveLabel: { symbol: "H", value: 1, polar: false },
        },
        c: {
          voltageLabel: { symbol: "V", value: 0, polar: true },
          currentLabel: { symbol: "A", value: 0, polar: true },
          impedanceLabel: { symbol: "Ω", value: 1, polar: false },
          reactiveLabel: { symbol: "F", value: 1, polar: false },
        },
      }[unitKey];

      if (cfg) {
        for (const [prop, { symbol, value, polar }] of Object.entries(cfg)) {
          this[prop] = new Label(this.c, value, symbol, polar);
        }
      }
      this.uVoltageToGroundLabel = new Label(
        this.u,
        0,
        "V₀",
        true,
        true,
        17,
        "blue" //"royalblue"
      );
      this.vVoltageToGroundLabel = new Label(
        this.v,
        0,
        "V₀",
        true,
        true,
        17,
        "green" //"seagreen"
      );
    }

    reset() {
      this.u.id = "";
      this.v.id = "";
      this.u.voltage = math.complex(0, 0);
      this.v.voltage = math.complex(0, 0);
      this.currentLabel.value = math.complex(0, 0);
    }

    get id() {
      return this._id;
    }

    get idLabel() {
      return this._idLabel;
    }

    get probe() {
      return this._isProbing;
    }

    set id(id) {
      this._id = id;
    }

    set idLabel(label) {
      this._idLabel = label;
    }

    set probe(isProbing) {
      this._isProbing = isProbing;
    }
  };
