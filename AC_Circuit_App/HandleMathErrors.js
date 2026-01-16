function shape2D(M) {
  if (!Array.isArray(M) || !Array.isArray(M[0])) return null;
  return [M.length, M[0].length];
}

function isRagged2D(M) {
  if (!Array.isArray(M) || !Array.isArray(M[0])) return true;
  const cols = M[0].length;
  return M.some((r) => !Array.isArray(r) || r.length !== cols);
}

function shapeOfB(b) {
  // Accept [N] or [[...]] or [[x],[y],...]
  if (Array.isArray(b) && !Array.isArray(b[0])) return [b.length, 1]; // treat as column
  if (Array.isArray(b) && Array.isArray(b[0])) return [b.length, b[0].length];
  return null;
}

function assertMulCompatible(A, b) {
  if (isRagged2D(A))
    throw new Error("Ainv is not a valid rectangular 2D matrix");
  const Ash = shape2D(A);
  const Bsh = shapeOfB(b);
  if (!Ash) throw new Error("Ainv must be a 2D array");
  if (!Bsh) throw new Error("b must be a vector [N] or matrix [N×1]");

  const [ar, ac] = Ash;
  const [br, bc] = Bsh;
  if (ac !== br)
    throw new Error(
      `Dimension mismatch: Ainv is ${ar}×${ac}, b is ${br}×${bc}`
    );
}

function toMathError(err, context = {}) {
  const msg = err?.message ?? String(err);
  const code =
    /dimension|shape|size/i.test(msg) ? "DIMENSION_MISMATCH" :
    /unexpected|parse/i.test(msg) ? "PARSE_ERROR" :
    "MATH_ERROR";

  return { ok: false, code, message: msg, context, raw: err };
}

function safeMultiply(Ainv, b, context = {}) {
  try {
    assertMulCompatible(Ainv, b);

    // If b is [N], math.js will treat it as a vector; often you want [N×1].
    const bCol = (Array.isArray(b) && !Array.isArray(b[0]))
      ? b.map(x => [x])
      : b;

    const x = math.multiply(Ainv, bCol);
    return { ok: true, value: x };
  } catch (err) {
    return toMathError(err, { op: "multiply", ...context });
  }
}


