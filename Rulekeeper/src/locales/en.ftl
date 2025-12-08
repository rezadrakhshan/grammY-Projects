start = 👋 Hi there! I’m RuleKeeper — your friendly helper for managing Telegram groups.

    Here’s what I can do for you:
    • Keep group rules clear & easy to follow  
    • Greet new members with a warm welcome  
    • Stop spam and unwanted links 🚫  
    • Keep your group clean, safe & organized ✨  

    👉 Add me to your group and let’s make it awesome together!

button = 
	.addGroup = ➕ Add me to your group

new_text = ⚠️ Heads up!

    To keep your group running smoothly, RuleKeeper needs full admin powers.  
    Please check that:  
    • RuleKeeper is promoted to Admin  
    • It can delete unwanted messages  
    • It can restrict or pin members  
    • It can manage chat info and messages  

    ✅ Once that’s done, you’re all set — enjoy a cleaner, safer group! 🎉

bot_removed= ⚠️ Attention

    RuleKeeper has been removed from this group:
    • Group Name: { $group_title }
    • Group ID: { $group_id }

    All settings and data linked to this group have been cleared from the database.

    👉 If this happened by mistake, no worries! You can add RuleKeeper back anytime using the group’s invitation link.

set_for_admin = ✅ RuleKeeper is now an admin here!

    Thanks for giving me admin access 🙌  
    I can now help keep your group safe and organized:  
    • Remove spam 🚫  
    • Enforce rules 📜  
    • Welcome new members 👋  
    • Keep everything tidy ✨  

    ⚙️ Use /settings anytime to customize how RuleKeeper works for your group.


welcome_successful = 🎉 Success!

    Your welcome message has been updated.  
    New members will now see your custom greeting when they join the group 👋


welcome_unsuccessful = ⚠️ Oops!  

    I couldn’t update the welcome message.  
    Please check that your message isn’t empty or too long, then try again ✨



info = 📘 *About RuleKeeper*

    RuleKeeper is your smart Telegram assistant — built to make group management simple and stress‑free.  

    ⚙️ *Key Features:*  
    • Friendly auto‑welcome & farewell messages 👋  
    • Strong anti‑spam & flood protection 🚫  
    • Easy rule enforcement system 📜  
    • Helpful admin activity logs 📝  
    • Multi‑language support 🌍  

    ✨ Add RuleKeeper to your group and enjoy a cleaner, safer community!

rules_successful = ✅ Rules updated successfully!

    📜 Use /rules anytime to check the latest group rules.

rules_unsuccessful = ❌ Oops!  

    I couldn’t update the rules.  
    Please check that your message isn’t empty, then try again later ✨

show_rules = 📜 *Group Rules*

    { $rules }

    ⚠️ Violating these rules may result in warnings or removal from the group.

    🕹 Managed by *RuleKeeper Bot*  
    Use /set_rules to update these rules.

rules_notfound = Use /set_rules to update these rules.


just_group = ⚠️ Heads up!

    This command only works inside a group chat.  
    👉 Please add me to your group or run this command there.


only_admin = 🚫 Hold on!

    This command is only for group admins.  
    👑 Admins can change settings and manage rules.


settings = 
	.text =🛡️ Group Protection Settings

        Here you can manage RuleKeeper’s protection features.  
        Toggle the options below to customize how your group stays safe and organized ✨
	.option1 = 🛡️ Anti-Spam
	.option2 = 🚫 Bad Words Filter
	.option3 = 🔗 Link Filter
	.option4 = 📤 Forward Filter
	.ai = 👾 AI Assistant 
	.gif = 🖼️ Gif Filter
	.edit = 💬 Edit Message
	.video = 📽️ Video Filter
	.pic = 📷 Picture Filter
	.music = 🎵 Music Filter
	.sticker = 🪽 Sticker Filter
	.location = 🗺️ Location Filter
	.voice = 🔊 Voice Filter
	.poll = 📈 Poll Filter



filter_words =
    .text = 🚫 *Bad Word Filter*

        Turn this on to automatically catch and delete messages with offensive or inappropriate words.  
        Group admins can easily manage their own custom word list using simple commands.  

        🧩 *Commands:*  
        • /addFilter — Add a new word to the bad word list  
        • /removeFilter — Remove a specific word from the list  
        • /filterList — Show all currently filtered (banned) words  
        • /clearFilter — Delete all words from the bad word list  

        💡 *Example:*  
        /addFilter test,badword  
        /removeFilter badword

    .add = ✅ Done! The word has been added.
    .removed = ✅ Done! The word has been removed.
    .clear = ✅ All set! The bad word list is now empty.
    .list = 🚫 *Bad Word Filter - Current List*

        Total words: { $count }

        { $words }

        Use /removeFilter <word> to remove any word from this list.



warning = 
    .reply_required = ❗️ You must reply to a user's message.
    .group_not_found = ⚠️ Group settings not found.
    .received = ⚠️ The user has received warning { $current } of { $max }.
    .first_warning = ⚠️ The user has received their first warning ({ $current }/{ $max }).
    .muted = 🔇 The user has been muted after exceeding the warning limit.
    .error = ❌ An error occurred while issuing the warning.


set_max = 
    .success = ✅ Warning limit set successfully to { $count }.
    .error = ⚠️ Failed to set warning limit. Please check your input and try again.


unwarn =
    .success = ✅ One warning removed from the user. Remaining warnings: { $count }.
    .error = ℹ️ This user has no active warnings to remove.


mute = 
    .past = ⛔️ The timestamp is already in the past.
    .invalid = ❗️ Invalid input.
    .format1 = { $days } day(s), { $hours } hour(s), { $minutes } minute(s).
    .format2 = { $hours } hour(s), { $minutes } minute(s).
    .format3 = { $minutes } minute(s).
    .result = 📅 *Mute until:* { $until }\n⏳ *Remaining:* { $remaining }

unmute = ✅ You’re back in the conversation! Feel free to join in 🎉
isUnmute = ℹ️ Looks like this user is already part of the conversation.
ban = 🚷 User has been removed from the group. Let’s keep things chill here 😊

unban = 
    .text = 🎉 Welcome back! The user is no longer banned and can participate again.
    .notFound = 🤔 Hmm… I couldn’t find that user. Please check the username or ID and try again.

anti-spam-on = 🛡️ Spam Shield Activated!
anti-spam-off = 😴 Spam Shield Snoozing

spam-mute 🚫 @{ $user }, You are being spamming! Please wait before sending more messages.

link-block = 
	.off = ✅ Link blocking has been turned off! 
	.on = 🚫 Link blocking is now active!

forward-block = 
	.on = 🚫 Forwarded messages are now blocked!  
	.off = ✅ Forwarded messages are allowed again!

leaderboard = 
	.header = 🌟 Hey friends, here’s our chat leaderboard!
	.footer = Keep the good vibes rolling 💕 — who’s climbing up next week? 🚀
	.message = messages

ai = 
	.inActive = AI Assistant is currently inactive 💤
	.active = AI Assistant is now active 🎉

lang = 
	.text = ✨ Please pick your preferred language below. I’ll make sure all messages feel natural to you.
	.fa = 🇮🇷 فارسی
	.en = 🇬🇧 English
	.ru = 🇷🇺 Русский

active = This feature is now active and ready to go.
deactivate = This feature has been turned off. You can enable it again anytime.


user_info = 
	.text =  👤 <b>User Info</b>
		 ID: {$id}
		 Name: {$first_name} {$last_name}
		 Username: @{$username}
		 Premium: {$is_premium}

		 Status: {$status}

		 Photos: {$photo_total}
 
help_title = 📘 Help Center
settings_cmd = Open bot settings
addFilter_cmd = Add a filtered word
removeFilter_cmd = Remove a filtered word
clearFilter_cmd = Clear all filters
filterList_cmd = Show all filters
help_cmd = Show help menu
info_cmd = Show bot info
get_info_cmd = Show user info (reply only)
language_cmd = Change bot language
leaderboard_cmd = Show user rankings
mute_cmd = Mute a user (reply)
unmute_cmd = Unmute a user
ban_cmd = Ban a user
unban_cmd = Unban a user
set_rules_cmd = Set group rules
rules_cmd = Show group rules
start_cmd = Start using the bot
warn_cmd = Warn a user
set_max_cmd = Set max warnings
unwarn_cmd = Remove a warning
