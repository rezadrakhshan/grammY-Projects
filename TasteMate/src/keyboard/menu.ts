import { InlineKeyboard } from "grammy";

export const menu = new InlineKeyboard().text("🍔 View Menu", "menu").text("🧾 New Order", "new-order")
.row()
.text("🚖 Track My Order", "track-order").text("💬 Contact Support", "contact")
.row()
.text("📍 My Locations", "location")
