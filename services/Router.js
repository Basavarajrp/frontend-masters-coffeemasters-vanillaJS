export const Router = {
    routes: [
        { path: "/", view: "Home" },
        { path: "/order", view: "Order" },
        { path: "/product/:id", view: "Product" },
    ],

    init: () => {
        /**
         * If we don't avoid the default behavior, the page will reload 
         * and the router will not work. We want to avoid the default behavior
         * because we want to use the router to navigate to the new page. 
         * We want to avoid the page reload(requesting server that page), and want to keep 
         * same page but change the content of the page with new URL.
         */
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                Router.go(href);
            });
        });
        
        // Handle browser history navigation (back/forward buttons)
        window.addEventListener("popstate", () => {
            // Don't call preventDefault() here
            // Just handle the navigation based on current pathname
            // Do not add to history, since this is a history navigation not the router navigation
            Router.go(window.location.pathname, false);
        });

        // Handle initial page load
        Router.go(window.location.pathname);
    },

    go: (path, addToHistory = true) => {
        const route = Router.routes.find((route) => route.path === path);
        let pageElement = null;
        if (route) {
            if (addToHistory) {
                // Only push to history if it's a new navigation
                history.pushState({ path }, '', path);
            }

            switch (route.view) {
                case "Home":
                    pageElement = document.createElement("h1");
                    pageElement.innerHTML = "Home";
                    console.log("Home Page Element:==== ", pageElement);
                    break;
                case "Order":
                    pageElement = document.createElement("h1");
                    pageElement.innerHTML = "Order";
                    console.log("Order Page Element:==== ", pageElement);
                    break;
                case "Product":
                    // Get the product id from the path and display the product details
                    if (path.includes("/product/")) {
                        const productId = path.split("/product/")[1];
                        pageElement = document.createElement("h1");
                        pageElement.innerHTML = `Product ${productId}`;
                    }
                    break;
            }
        } else {
            pageElement = document.createElement("h1");
            pageElement.innerHTML = "404 Not Found";
        }

        console.log("Page Element:==== ", pageElement);
        if (pageElement) {
             // reset the position of the page element
             window.scrollTo(0, 0);

            // Remove all existing elements from the body and add the new page element
            document.querySelector("main").innerHTML = "";
            document.querySelector("main").appendChild(pageElement);
        }
    },
    
}