import API from "./services/API.js";
import Store from "./services/Store.js";

// The store should be accessible to all the files in the app not to single module
window.app = {}; // create single object to store all the app data
app.store = Store;

window.addEventListener('DOMContentLoaded', async () => {
    // get the menu from the API
    const menu = await API.fetchMenu();
    app.store.menu = menu;

    console.log("Store: ",app.store.menu);
});

