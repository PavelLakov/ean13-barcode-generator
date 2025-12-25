import React, { useEffect, useMemo, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import "./BarcodeGenerator.css";

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

// EAN-13 checksum from first 12 digits
function computeEAN13CheckDigit(first12) {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = Number(first12[i]);
    // positions are 1..12; even positions weight 3
    const position = i + 1;
    sum += position % 2 === 0 ? digit * 3 : digit;
  }
  const mod = sum % 10;
  return mod === 0 ? 0 : 10 - mod;
}

function normalizeEANInput(raw) {
  const digits = onlyDigits(raw);

  if (digits.length === 12) {
    const check = computeEAN13CheckDigit(digits);
    return { ok: true, ean13: digits + String(check), note: "Check digit auto-added." };
  }

  if (digits.length === 13) {
    const expected = computeEAN13CheckDigit(digits.slice(0, 12));
    const actual = Number(digits[12]);
    if (expected !== actual) {
      return { ok: false, ean13: digits, error: `Invalid check digit. Expected ${expected}.` };
    }
    return { ok: true, ean13: digits, note: "Valid EAN-13." };
  }

  return { ok: false, ean13: digits, error: "Enter 12 digits (auto checksum) or 13 digits (validated)." };
}

export default function BarcodeGenerator() {
  const [input, setInput] = useState("5901234123457");
  const svgRef = useRef(null);

  const parsed = useMemo(() => normalizeEANInput(input), [input]);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous barcode
    while (svgRef.current.firstChild) svgRef.current.removeChild(svgRef.current.firstChild);

    if (!parsed.ok) return;

    JsBarcode(svgRef.current, parsed.ean13, {
      format: "ean13",
      displayValue: true,
      fontSize: 20,
      margin: 12,
      height: 90,
    });
  }, [parsed]);

  const handleDownloadSVG = () => {
    if (!parsed.ok || !svgRef.current) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `ean13_${parsed.ean13}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="barcode-page">
      <h1 className="title">
        Generate a <span>Barcode</span> (EAN13) in React
      </h1>

      <div className="panel">
        <label className="label" htmlFor="eanInput">
          EAN-13 (12 or 13 digits)
        </label>

        <div className="row">
          <input
            id="eanInput"
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 5901234123457"
            inputMode="numeric"
          />

          <button className="btn" onClick={handleDownloadSVG} disabled={!parsed.ok}>
            Download SVG
          </button>
        </div>

        <p className={`hint ${parsed.ok ? "ok" : "bad"}`}>
          {parsed.ok ? parsed.note : parsed.error}
        </p>
      </div>

      <div className="barcode-card">
        <svg ref={svgRef} className="barcode-svg" />
      </div>
    </div>
  );
}
