# Interactive Modal UI

## Overview

This project implements a modal component with interactive buttons and smooth hover animations. The goal is to create a clean and controlled user interface component with predictable visual behavior and clear typography inside the modal.

## Technologies Used

- HTML
- CSS
- JavaScript

## Modal Button Typography

Typography inside the modal is adjusted to strengthen visual hierarchy. Font size and font weight are increased compared to default button styling.

These properties are scoped to the modal container to prevent unintended changes to other buttons in the application.

## Customization

The following aspects can be modified:

- Hover scale intensity
- Transition duration and easing
- Modal button font size
- Modal button font weight

Adjustments should remain moderate to preserve usability and perceived performance.

## Design Considerations

- Transitions are short to maintain responsiveness.
- Scaling relies on "transform" to prevent reflow.
- Typography changes are scoped to the modal container.
- Structure, style, and behavior remain separated for maintainability.

## Accessibility Notes

For production use, the modal should include:

- The attribute "aria-modal" set to true
- The attribute role="dialog"
- Keyboard support for closing with the 'Escape' key
- Focus trapping while the modal is open

## License

This project is provided for learning and demonstration purposes.