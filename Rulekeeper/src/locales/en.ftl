start = 👋 Hello! I'm RuleKeeper — your smart Telegram group management assistant.

    I can help you:
    • Manage group rules  
    • Welcome new members  
    • Prevent spam and unwanted links  
    • And keep everything clean & organized!

     Add me to your group to get started 👇

button = 
	.addGroup = ➕ Add me to your group

new_text = ⚠️ Important!

    To manage this group properly, RuleKeeper needs *full admin permissions*.
    Please make sure:
    • RuleKeeper is promoted to Admin
    • It can delete messages
    • It can restrict and pin members
    • It can manage messages and chat info

    Once done, you’re all set! 🎉

bot_removed= ⚠️ Attention

    RuleKeeper has been removed from the group:
    Group Name: { $group_title }
    Group ID: { $group_id }

    All settings and group data for this group have been deleted from the database.

    If this was a mistake, you can add RuleKeeper back to the group at any time using the invitation link.

set_for_admin = ✅ RuleKeeper is now an admin in this group!

    Thank you for granting admin access.  
    Now I can help you manage the group — remove spam, enforce rules, welcome new members, and keep everything organized!

    Use /settings to configure features and customize RuleKeeper’s behavior.

welcome_successful = 🎉 The welcome message has been successfully updated!
     New members will now see your custom message when they join the group.


welcome_unsuccessful = ⚠️ Failed to set the welcome message.
     Please make sure your message isn’t empty or too long, and try again.



info = 📘 *RuleKeeper Information*

   RuleKeeper is a powerful Telegram bot designed to help you manage and protect your groups with ease.

   ⚙️ *Main Features:*
   • Auto-welcome & farewell messages  
   • Anti-spam and flood protection  
   • Rule enforcement system  
   • Admin activity logs  
   • Multi-language support  

   👑 *Bot Info:*
🚫 Bad Word Filter - Current List

Total words: 5

1️⃣ reza
2️⃣ ali
3️⃣ spam
4️⃣ test
5️⃣ mmd

Use /removeFilter <word> to remove any word from this list.
      • Version: 10.0  
      • Developer: thedshxn  
      • Framework: grammY.js  

    💡 Use /help to see all available commands

rules_successful = ✅ Rules have been successfully updated!

     📜 Use /rules anytime to view the current group rules.

rules_unsuccessful = ❌ Failed to update the rules.

     Please make sure your message isn't empty or try again later.

show_rules = 📜 *Group Rules*

    { $rules }

    ⚠️ Violating these rules may result in warnings or removal from the group.

    🕹 Managed by *RuleKeeper Bot*  
    Use /se_rules to update these rules.

rules_notfound = Use /se_rules to update these rules.


just_group = ⚠️ This command can only be used inside a group chat.

     Please add me to your group or use this command there.


only_admin = 🚫 You must be an admin to use this command.

   Only group admins can change settings or manage rules.


settings = 
	.text = Here you can manage RuleKeeper’s group protection features.
           Toggle each option below to customize how your group is protected.
	.option1 = 🛡️ Anti-Spam
	.option2 = 🚫 Bad Words Filter
	.option3 = 🔗 Link Filter
	.option4 = 📤 Forward Filter


filter_words =
    .text = 🚫 *Bad Word Filter*

        Enable this feature to automatically detect and delete messages that contain offensive or inappropriate words.
        Group admins can manage their own custom word list using simple commands.

        🧩 *Commands:*

        • /addFilter — Adds a new word to the group’s bad word list.  
        • /removeFilter — Removes a specific word from the bad word list.  
        • /filterList — Shows the current list of all filtered (banned) words in this group.  
        • /clearFilter — Deletes all words from the group’s bad word list.

        💡 *Example:*  
        /addFilter f,shit  
        /removeFilter fuck

    .add = ✅ Word Added Successfully!
    .removed = ✅ Word Removed Successfully!
    .clear = ✅ Bad Word List Cleared Successfully!
    .list = 🚫 *Bad Word Filter - Current List*

        Total words: { $count }

        { $words }

        Use /removeFilter <word> to remove any word from this list.



warning = 
	.reply_required = ❗️You must reply to a user's message to issue a warning.
	.group_not_found = ⚠️ Group settings not found.
	.received = ⚠️ The user has received warni { $current } of { $max }.
	.first_warning = ⚠️ The user has received their first warnin{ $current }/{ $max }).
	.muted = 🔇 The user has been muted due to exceeding the warning limit.
	.error = ❌ An error occurred while issuing a warning.


set_max = 
	.success = ✅ Warning limit successfully set to { $count }.
	.error = ⚠️ Failed to set warning limit. Please try again or check your input


unwarn =
	.success = ✅ One warning has been removed from the user. Remaining warnings: { $count }.
	.error = ℹ️ This user has no active warnings to remove.


mute = 
	.past = ⛔️ The timestamp is already in the past. 
	.invalid = ❗️Invalid input.
	.format1 = { $days } day(s), { $hours } hour(s), { $minutes } minute(s).
	.format2 = { $hours } hour(s), { $minutes } minute(s)
	.format3 = { $minutes } minute(s)
	.result = 📅 *Mute until:* { $until }\n⏳ *Remaining:* { $remaining }


unmute = You're back in the conversation! Feel free to join in 🎉
isUnmute = Looks like they’re already part of the conversation 
ban = 🚷 User has been sent on a little vacation from the group. Let's keep things chill here😊

unban = 
	.text = 🎉 Welcome back! The user is no longer banned and free to participate again.
	.notFound = 🤔 Hmm… I couldn’t find that user. Please check the username or ID and try again.

anti-spam-on = 🛡️ Spam Shield Activated!
anti-spam-off = 😴 Spam Shield Snoozing

spam-mute 🚫 @{ $user }, You are being spamming! Please wait before sending more messages.
