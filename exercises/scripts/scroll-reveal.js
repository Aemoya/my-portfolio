/*
Neurotically detailed comments for scripts/scroll-reveal.js

This JavaScript file implements the scroll-triggered animation using the
Intersection Observer API. It detects when specific elements enter the
viewport and then applies a CSS class to trigger a visual transition.
*/

document.addEventListener('DOMContentLoaded', () => {
    /*
    This line ensures that the JavaScript code only runs after the entire
    HTML document has been completely loaded and parsed.
    - 'DOMContentLoaded' is an event fired when the initial HTML document
      has been completely loaded and parsed, without waiting for stylesheets,
      images, and subframes to finish loading.
    - Using an arrow function `()` => `{}` as the second argument defines
      the function to be executed when the event occurs.
    This is crucial because the script needs to access the DOM elements
    (like sections), and they must exist in the document before the script
    tries to find them.
    */

    // 1. Select all elements that need to be animated
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal-section');
    /*
    - `document.querySelectorAll()` is a method that returns a static (non-live)
      NodeList representing a list of the document's elements that match the
      specified group of selectors.
    - `'.scroll-reveal-section'` is the CSS selector. It targets all HTML
      elements that have the class `scroll-reveal-section` applied to them.
    - `scrollRevealSections` is a constant variable that will hold this NodeList.
      This NodeList behaves much like an array, allowing us to iterate over
      the selected elements.
    */

    // 2. Define the Intersection Observer options
    const observerOptions = {
        root: null,
        /*
        - `root`: This property specifies the element that is used as the viewport
          for checking visibility of the target.
        - `null` (default value) means the browser's viewport (the visible part
          of the web page) will be used as the root. This is typically what we want
          for scroll-triggered animations.
        */
        rootMargin: '0px',
        /*
        - `rootMargin`: This property defines a margin around the `root` element.
          It allows you to grow or shrink the root's bounding box before computing
          intersections. It's like adding padding to the root's viewport.
        - `'0px'` means no extra margin is added. An element is considered
          intersecting as soon as any part of it enters the actual viewport.
          You could use, for example, `'-50px'` to make the animation trigger
          50 pixels *before* the element reaches the very edge of the viewport,
          or `'0px 0px -100px 0px'` to trigger when the bottom of the element
          is 100px from the bottom of the viewport.
        */
        threshold: 0.2
        /*
        - `threshold`: This property is a single number or an array of numbers
          between 0.0 and 1.0, representing the percentage of the target element's
          visibility at which the observer's callback function should be executed.
        - `0.2` (or 20%) means the callback will fire when 20% of the target element
          is visible within the root (viewport).
          - `0` means as soon as even one pixel of the target is visible.
          - `1.0` means the entire target element must be visible.
        Choosing `0.2` ensures the animation triggers a bit before the section
        is fully in view, making the reveal feel more natural and progressive.
        */
    };

    // 3. Define the callback function for the Intersection Observer
    const observerCallback = (entries, observer) => {
        /*
        - `entries`: An array of `IntersectionObserverEntry` objects. Each entry
          represents a change in intersection status for one of the observed target elements.
        - `observer`: A reference to the `IntersectionObserver` instance itself.
          This is useful if you want to unobserve elements from within the callback.
        */
        entries.forEach(entry => {
            /*
            - `entries.forEach()` iterates over each `entry` in the `entries` array.
              Since multiple observed elements might change their intersection status
              simultaneously (e.g., if you scroll very fast), the `entries` array
              can contain more than one entry.
            */
            if (entry.isIntersecting) {
                /*
                - `entry.isIntersecting`: A boolean property that is `true` if the
                  target element is currently intersecting with the root, and `false` otherwise.
                  This is the core condition to check if an element has entered the viewport.
                */
                entry.target.classList.add('visible');
                /*
                - `entry.target`: A reference to the DOM element that is currently
                  intersecting (or not intersecting).
                - `classList.add('visible')`: The `classList` property allows
                  manipulating the CSS classes of an element. `add('visible')`
                  applies the 'visible' class to the target element.
                  In `scroll-reveal.css`, the `.scroll-reveal-section.visible` rule
                  defines the final animated state (opacity 1, transform translateY(0)),
                  and the `transition` property on `.scroll-reveal-section` ensures
                  this change happens smoothly.
                */
                observer.unobserve(entry.target);
                /*
                - `observer.unobserve(element)`: Stops observing a specific target element.
                  This is important for performance and to ensure the animation
                  only triggers once per section. Once a section has become visible
                  and animated, we no longer need to observe it. This prevents the
                  animation from re-triggering if the user scrolls past it and then
                  scrolls back up, and saves browser resources.
                */
            }
            // else {
            //     // Optional: If you wanted elements to animate out when they leave the viewport,
            //     // you could uncomment the line below and add a corresponding CSS rule.
            //     // entry.target.classList.remove('visible');
            // }
        });
    };

    // 4. Create a new Intersection Observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    /*
    - `new IntersectionObserver()` creates a new instance of the Intersection Observer.
    - It takes two arguments:
      1. The `observerCallback` function: This function will be executed whenever
         the observed elements' intersection status changes.
      2. The `observerOptions` object: This object defines how the observer
         should detect intersections (e.g., which root to use, margins, thresholds).
    */

    // 5. Start observing each target element
    scrollRevealSections.forEach(section => {
        /*
        - `scrollRevealSections.forEach()` iterates over each HTML element
          (which are our <section> elements) in the `scrollRevealSections` NodeList.
        */
        observer.observe(section);
        /*
        - `observer.observe(targetElement)`: Tells the `IntersectionObserver` instance
          to start monitoring the specified `targetElement` for changes in its
          intersection status with the root.
        - For each section found, we tell our `observer` to watch it.
        */
    });
});
