function toEngineering(x, opts = {}) {
  const {
    sigFigs = 4,
    useSI = true,
    unit = "",
    micro = "µ",
  } = opts;

  if (!Number.isFinite(x)) return String(x); // "NaN", "Infinity", "-Infinity"
  if (x === 0) return unit ? `0 ${unit}` : "0";

  const sign = x < 0 ? "-" : "";
  let v = Math.abs(x);

  // exponent in multiples of 3
  let exp = Math.floor(Math.log10(v) / 3) * 3;

  // scale into [1, 1000)
  let m = v / Math.pow(10, exp);

  // round to sig figs
  const decimals = Math.max(0, sigFigs - 1 - Math.floor(Math.log10(m)));
  m = Number(m.toFixed(decimals));

  // rounding can push 999.9... -> 1000, so renormalize
  if (m >= 1000) {
    m /= 1000;
    exp += 3;
  }

  // format mantissa without trailing zeros
  let mant = m.toString();
  if (mant.includes(".")) mant = mant.replace(/\.?0+$/, "");

  const siMap = {
    "-24": "y",
    "-21": "z",
    "-18": "a",
    "-15": "f",
    "-12": "p",
    "-9": "n",
    "-6": micro,
    "-3": "m",
    "0": "",
    "3": "k",
    "6": "M",
    "9": "G",
    "12": "T",
    "15": "P",
    "18": "E",
    "21": "Z",
    "24": "Y",
  };

  let suffix;
  if (useSI && Object.prototype.hasOwnProperty.call(siMap, String(exp))) {
    suffix = siMap[String(exp)];
    // use space between value and prefix/unit: "1.2 kV"
    const u = unit ? `${suffix}${unit}` : suffix;
    return u ? `${sign}${mant} ${u}` : `${sign}${mant}`;
  } else {
    // e-notation fallback
    const u = unit ? ` ${unit}` : "";
    return `${sign}${mant}e${exp}${u}`;
  }
}
