import API from "./API.js";

export const loadMenuData = async () => {
    app.store.menu = await API.fetchMenu();
}