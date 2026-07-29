/**
 * Menu page copy — loaded from content/menu-page.json.
 * Edit that JSON file to change marketing text (no CMS required).
 */
import menuPageJson from "../../../content/menu-page.json";

export const menuContent = menuPageJson;

export type MenuContent = typeof menuContent;
