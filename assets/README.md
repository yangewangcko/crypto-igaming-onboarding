# Brand assets

`logo.svg` is a **placeholder** wordmark. Replace it with the official Checkout.com logo files.

## To swap in the real logo
1. Drop the official SVG/PNG files here (e.g. `logo.svg`, `logo-white.svg`, `mark.svg`).
2. The site references `assets/logo.svg` in the header and footer of `index.html`.
   - The footer applies a white filter (`brightness(0) invert(1)`) so a **dark/blue** logo displays white on the dark footer. If you add a dedicated white logo, point the footer `<img>` at it and remove that filter in `css/styles.css`.

## Brand tokens
Defined in `css/styles.css` under `:root`:
- Blue `#006CFF` · Ink `#10141f` · White `#ffffff`

Confirm these against the official brand guidelines before launch.

## Logo variants received (from Charles)
Blue-on-white · dark-on-white · white-on-blue · white-on-dark, plus horizontal and stacked lockups.
