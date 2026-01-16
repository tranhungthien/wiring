// --- 1) Symbolic -> number parser (limited to your stamp format) ---
function exprToComplex(expr) {
  if (expr == null) return math.complex(0, 0);

  if (typeof expr === "number") return math.complex(expr, 0);

  if (math.typeOf?.(expr) === "Complex") return expr;

  const s = String(expr).trim();
  if (!s || s === "0") return math.complex(0, 0);

  const normalized = s.replace(/\bj\b/g, "i");

  let v;
  try {
    v = math.evaluate(normalized);
  } catch (e) {
    throw new Error(`Bad expression "${expr}": ${e.message}`);
  }

  const t = math.typeOf(v);

  if (t === "number") return math.complex(v, 0);
  if (t === "Complex") return v;
  if (t === "BigNumber" || t === "Fraction") return math.complex(Number(v), 0);

  throw new Error(`Unsupported result type "${t}" for expression "${expr}"`);
}

// --- 2) Pretty print ---
function printMatrixSimple(title, M, digits = 6) {
  const fmt = (x) => {
    if (typeof x !== "number" || !Number.isFinite(x)) return String(x);
    // trim -0.000000 to 0
    const v = Math.abs(x) < 1e-15 ? 0 : x;
    return v.toFixed(digits);
  };

  console.log(`\n=== ${title} ===`);
  console.log(M.map((row) => row.map(fmt).join("\t")).join("\n"));
}

// --- 3) Convert + invert using math.js, print both ---
function convertInvertAndPrint({ A }, digits = 6) {
  const A_num = A.map((row) => row.map(exprToComplex)); // symbolic -> numeric
  //const A_inv = math.inv(A_num).valueOf(); // inverse

  const A_inv = safeInverse(A_num, {
    stage: "MNA",
    note: "inverting nodal matrix",
  });
  
  // printMatrixSimple("A_num", A_num, digits);
  // printMatrixSimple("A_inv", A_inv, digits);

  return { A_num, A_inv };
}

