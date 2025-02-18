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
        
        // Handle direct url visits (deep links)
        // The popstate event is fired when the user navigates through browser history
        // e.g. when clicking browser back/forward buttons or using history.back()/forward()
        window.addEventListener("popstate", () => {
            const path = window.location.pathname || "/"; 
            Router.go(path, false); // Don't add to history since this is a history navigation
        });

        // Handle the initial url
        Router.go(window.location.pathname);
    },

    go: (path, addToHistory = true) => {
        const route = Router.routes.find((route) => route.path === path);
        let pageElement = null;
        if (route) {
            history.pushState(null, "", path);
            switch (route.view) {
                case "Home":
                    pageElement = document.createElement("h1");
                    pageElement.innerHTML = "Home";
                    console.log("Home Page Element:==== ", pageElement);
                    break;
                case "Order":
                    pageElement = document.createElement("h1");
                    pageElement.innerHTML = "About";
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
             window.scrollX = 0;
             window.scrollY = 0;

            // Remove all existing elements from the body and add the new page element
            document.querySelector("main").innerHTML = "";
            document.querySelector("main").appendChild(pageElement);
        }

        // Add the route to the history
        if (addToHistory) {
            history.pushState(null, "", path);
        }
    },
    
}