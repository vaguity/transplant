# Activate

Activate is a JS module designed to handle changing classes of elements with simple interactions by only adding data attributes and classes to elements. Usually JS or jQuery would be written to handle these cases, but this collection of helper functions is designed to take care of those cases.

An example can be found at `dist/overview.html`.

## Instructions for use

- Add the `activate` class to all elements within the scope of your interactions. This includes menus and clickable elements
- Add the `activate-active` class to whichever elements should start in an active state
- Add a base class to all target elements, such as `slide`. Add specific classes to each element as well, such as `slide-1`, `slide-2`, or you can use class names such as `plan` and `create`
- Add a base class to all menu elements, such as `slide-nav` and add specific classes, such as `slide-nav-1`, `slide-nav-2`, or you can use class names such as `plan` and `create`
- Add a `data-activate` attribute to all the links to specify the element's class which should be activated (for example, `slide-1`)
- Add a `data-activate-base` attribute to all the links to specify all the elements in the group (for example, `slide`)
- Add a `data-activate-menu` attribute to all the links to to specify the menu element's class which should be activated (for example, `slide-nav-1`)
- Add a `data-activate-menu-base` attribute to all the links to specify all the elements in the menu group (for example, `slide-nav`)


## Styling

Style active states with the `&.activate-active` class added to your base styles.
