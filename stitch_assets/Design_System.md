# Design System Documentation

## 1. Overview & Creative North Star: "The Botanical Laboratory"

This design system is built upon the Creative North Star of **"The Botanical Laboratory."** This concept rejects the sterile, boxy aesthetic of traditional enterprise software in favor of an experience that feels like a high-end scientific journal merged with a premium lifestyle brand. 

To achieve this, we move beyond "standard" UI through **Organic Brutalism**. We utilize wide, generous gutters, intentional asymmetry in data layouts, and overlapping elements that mimic a researcher’s desk—where physical samples and digital data coexist. By using a sophisticated interplay of lush emeralds and clinical slate grays, we evoke a sense of deep-rooted trust and cutting-edge precision.

## 2. Colors: Tonal Depth & The "No-Line" Rule

The color strategy is designed to feel immersive rather than restrictive. We utilize the palette to guide the eye through importance and biological vitality.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off the UI. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` component should sit on a `surface` background to define its edges. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
- **Level 1 (The Desk):** Use `surface` (`#f8faf9`) as the global backdrop.
- **Level 2 (The Sheet):** Use `surface-container-low` (`#f2f4f3`) for primary content areas.
- **Level 3 (The Specimen):** Use `surface-container-highest` (`#e1e3e2`) for active selection states or high-focus data points.

### Signature Textures & Glassmorphism
- **The "Glass" Layer:** Use semi-transparent variants of `surface_container_lowest` with a `backdrop-filter: blur(20px)` for floating navigation bars or contextual overlays. This creates a "frosted glass" effect that keeps the organic leaf imagery visible but legible.
- **Signature Gradients:** To provide "visual soul," all primary CTAs and hero headers should utilize a subtle linear gradient (135°) from `primary` (`#006331`) to `primary_container` (`#147e43`). This prevents the UI from feeling flat and clinical.

## 3. Typography: Editorial Precision

The typography scale utilizes **Manrope** for display elements to provide a modern, high-end editorial feel, and **Inter** for technical data to ensure maximum legibility in field conditions.

- **Display & Headline (Manrope):** Used for classification results and major section titles. These should be set with tight tracking (-2%) to feel authoritative and bespoke.
- **Title & Body (Inter):** Used for scientific descriptions, disease symptoms, and metadata.
- **Labels (Inter):** Small, all-caps treatments with generous letter-spacing (+5%) should be used for metadata tags (e.g., "LATITUDE," "TIMESTAMP") to evoke the feeling of a lab-printed label.

| Level | Font | Size | Token |
| :--- | :--- | :--- | :--- |
| **Display Large** | Manrope | 3.5rem | `display-lg` |
| **Headline Medium** | Manrope | 1.75rem | `headline-md` |
| **Title Medium** | Inter | 1.125rem | `title-md` |
| **Body Large** | Inter | 1rem | `body-lg` |
| **Label Small** | Inter | 0.6875rem | `label-sm` |

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are a last resort. This system relies on **Tonal Layering** to convey hierarchy.

- **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift.
- **Ambient Shadows:** When a floating element (like a FAB or floating modal) is required, use extra-diffused shadows. 
    - **Shadow Color:** `#191c1c` at 6% opacity.
    - **Shadow Blur:** 40px to 60px.
- **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in high-glare outdoor environments), use the `outline-variant` (`#bfcaba`) at **20% opacity**. Never use 100% opaque borders.

## 5. Components: Bespoke Ag-Tech Primitives

### Buttons
- **Primary:** Linear gradient (`primary` to `primary_container`), `on_primary` text, and `xl` (1.5rem) rounded corners.
- **Secondary:** Surface-tinted. No border. Use `secondary_container` background with `on_secondary_container` text.
- **Tertiary:** Text-only with `primary` color, used for low-emphasis actions like "View Source."

### Cards & Classification Results
- **Constraint:** Forbid the use of divider lines.
- **Execution:** Separate "Disease Name" from "Confidence Score" using a background shift to `surface-container-high` for the score badge. Use the `lg` (1rem) corner radius for cards.
- **The "Specimen Card":** For pepper leaf analysis, use a `surface-container-lowest` card with an inset image. The image should have a `md` (0.75rem) corner radius to feel "held" by the card.

### Input Fields
- **Search & Filter:** Use `surface-container-low` with a subtle `outline-variant` (20% opacity) "Ghost Border." Focus states should transition the background to `surface-container-lowest` rather than just changing the border color.

### Bespoke Component: "The Analysis HUD"
A glassmorphic overlay component that appears during the camera scanning phase. Use a `surface` blur (40px) at 40% opacity with `primary_fixed` icons to guide the user's leaf alignment.

## 6. Do's and Don'ts

### Do
- **Use White Space as a Tool:** Allow data to breathe. If a screen feels crowded, increase the vertical margin using the `xl` (1.5rem) scale.
- **Embrace Asymmetry:** Align high-level stats to the left and botanical imagery to the right to break the "grid-template" feel.
- **Prioritize Tonal Shifts:** Always ask: "Can I define this section with a background color change instead of a line?"

### Don't
- **Don't Use Pure Black:** Use `on_surface` (`#191c1c`) for text to maintain a sophisticated, slate-like tone.
- **Don't Use Standard Shadows:** Avoid "drop shadows" that look like 2010-era web design. If it doesn't look like ambient light, don't use it.
- **Don't Use Sharp Corners:** Every interaction point should feel organic. Stick strictly to the `DEFAULT` (0.5rem) through `xl` (1.5rem) rounding scale.