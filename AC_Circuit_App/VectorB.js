function buildRHSVector(rowLabels, components, asColumn = true) {
  const byId = new Map(components.map(c => [c.id, c]));

  const b = rowLabels.map((label) => {
    const isVsrcRow = typeof label === "string" && /^V/i.test(label);
    if (!isVsrcRow) return math.complex(0, 0);

    const src = byId.get(label);
    if (!src) throw new Error(`No component found for voltage source row "${label}"`);

    return src.value; // already math.complex({ r, phi })
  });

  return asColumn ? b.map(v => [v]) : b;
}
