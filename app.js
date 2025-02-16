import API from "./services/API.js";
import Store from "./services/Store.js";
import { loadMenuData } from "./services/Menu.js";

// The store should be accessible to all the files in the app not to single module
window.app = {}; // create single object to store all the app data
app.store = Store;

window.addEventListener('DOMContentLoaded', async () => {
    /* 
    Since loadMenuData() is an async operation:
    - Without await: console.log runs immediately before data loads (shows null)
    - With await: code pauses until data is loaded, then console.log shows the data
    This is why we need await when we want to use the async result immediately
    */
    await loadMenuData();
    console.log("Store: ", app.store.menu);
});

