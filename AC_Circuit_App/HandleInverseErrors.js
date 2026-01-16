function shape2D(M) {
  if (!Array.isArray(M) || !Array.isArray(M[0])) return null;
  return [M.length, M[0].length];
}

function isRagged2D(M) {
  if (!Array.isArray(M) || !Array.isArray(M[0])) return true;
  const cols = M[0].length;
  return M.some((r) => !Array.isArray(r) || r.length !== cols);
}

function toMathError(err, context = {}) {
  const msg = err?.message ?? String(err);

  let code = "MATH_ERROR";
  if (/dimension|shape|size|square/i.test(msg)) code = "DIMENSION_MISMATCH";
  else if (/singular|invertible|determinant/i.test(msg))
    code = "SINGULAR_MATRIX";

  return { ok: false, code, message: msg, context, raw: err };
}

function safeInv(A, context = {}) {
  try {
    // Basic validation (better messages than math.js)
    if (isRagged2D(A))
      throw new Error("A is not a valid rectangular 2D matrix");
    const sh = shape2D(A);
    if (!sh) throw new Error("A must be a 2D array");
    const [r, c] = sh;
    if (r === 0 || c === 0) throw new Error("A must be non-empty");
    if (r !== c) throw new Error(`A must be square to invert (got ${r}×${c})`);

    // debug
    console.log("strings in A before inv:", countStringCells(A));
    // Invert
    const Ainv = math.inv(A).valueOf();

    // Optional sanity check: detect NaN/Infinity results (math.js may not throw)
    // Works for number or math.Complex entries
    const bad = (x) => {
      if (typeof x === "number") return !Number.isFinite(x);
      if (math.typeOf(x) === "Complex")
        return !Number.isFinite(x.re) || !Number.isFinite(x.im);
      return false;
    };

    for (let i = 0; i < Ainv.length; i++) {
      for (let j = 0; j < Ainv[0].length; j++) {
        if (bad(Ainv[i][j]))
          throw new Error(
            "Inverse produced non-finite values (matrix may be singular/ill-conditioned)"
          );
      }
    }

    return { ok: true, value: Ainv };
  } catch (err) {
    // Upgrade common “singular” cases if math.js message hints it
    return toMathError(err, { op: "inv", AShape: shape2D(A), ...context });
  }
}

function safeInverse(A) {
  const invRes = safeInv(A, { stage: "MNA", note: "inverting nodal matrix" });

  if (!invRes.ok) {
    //console.warn(invRes.code, invRes.message, invRes.context);
    msg.set(invRes.code, invRes.message);
    return false;
  } else {
    return invRes.value;
  }
}

function countStringCells(A) {
  let n = 0;
  for (const row of A) for (const v of row) if (typeof v === "string") n++;
  return n;
}
