# EAN-13 Barcode Generator  
### A React & Vite Frontend Application
---
🔗 Live Demo: https://ean13-barcode-generator.netlify.app/
---

## Abstract

This project presents a **client-side EAN-13 barcode generator** implemented using **React** and **Vite**.
The application validates numeric input, computes missing checksum digits according to the EAN‑13 standard,
and renders a standards-compliant barcode as an SVG without relying on backend services.

The repository is documented in an **academic / university style**, emphasizing architectural clarity,
algorithmic correctness, and React lifecycle reasoning.

---

## 1. Introduction

EAN‑13 is an international standard for product identification. A valid code consists of:
- 12 data digits
- 1 checksum digit

The checksum allows scanners to detect common input errors.
This application demonstrates how such validation can be implemented entirely on the client side.

---

## 2. Functional Overview

### Functional Requirements

- Accept numeric user input
- Validate EAN‑13 codes
- Automatically compute missing checksum digits
- Render barcodes in real time
- Allow SVG export

### Non‑Functional Properties

- No backend dependency
- Deterministic behavior
- Resolution‑independent rendering (SVG)
- Responsive UI layout

---

## 3. User Interface Structure

The UI is divided into three logical sections:

1. **Header** – communicates application purpose  
2. **Input & Control Panel** – user interaction and validation feedback  
3. **Output Section** – barcode visualization  

This structure follows the classical **input → processing → output** model.

---

## 4. Project Structure

```
src/
├── components/
│   ├── BarcodeGenerator.jsx
│   └── BarcodeGenerator.css
├── App.jsx
├── main.jsx
└── index.css
```

---

## 5. Technologies Used

| Technology | Purpose |
|----------|--------|
| React | Declarative UI framework |
| Vite | Development server and bundler |
| JsBarcode | Barcode generation |
| SVG | High‑quality vector output |
| CSS | Styling and layout |

---

## 6. Algorithmic Background: EAN‑13 Checksum

Digits are processed from left to right:

- Odd positions → weight 1
- Even positions → weight 3

The checksum digit ensures the total sum is divisible by 10, enabling error detection.

---

## 7. Code Architecture

### Input Normalization
Non‑numeric characters are removed before validation to ensure correctness.

### Validation Strategy

| Input Length | Behavior |
|-------------|----------|
| 12 digits | Checksum computed automatically |
| 13 digits | Checksum validated |
| Other | Rejected |

---

## 8. React Hooks – Internal Mechanisms

### `useState`
Stores mutable component state and triggers re‑rendering when updated.

### `useRef`
Provides persistent access to a DOM element without triggering re‑renders.
Used here to pass the SVG node to JsBarcode.

### `useMemo`
Caches derived values (validated EAN object) and avoids unnecessary recalculation.

### `useEffect`
Executes side effects after rendering.
Ensures barcode generation occurs only when the SVG element exists.

---

## 9. Data Flow & Component Lifecycle

### Data Flow Diagram

```
User Input
    ↓
useState
    ↓
useMemo (validation)
    ↓
Conditional Rendering
    ↓
useEffect (barcode generation)
    ↓
SVG Output
```

This reflects React’s **unidirectional data flow** model.

---

## 10. Build & Execution

```bash
npm install
npm run dev
```

```bash
npm run build
```

---

## 11. Deployment

The project can be deployed to static hosting platforms such as GitHub Pages by publishing the `dist/` directory.

---

## 12. Extensions

- Additional barcode formats
- PNG/PDF export
- Unit tests
- Accessibility improvements

---

## 13. Conclusion

This project demonstrates the integration of algorithmic validation,
React Hooks, and SVG rendering in a clean, maintainable frontend architecture.
It is well suited for academic coursework and portfolio presentation.

---

## License

MIT License
