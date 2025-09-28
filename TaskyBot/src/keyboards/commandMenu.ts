export async function setCommandMenu(bot:any) {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Start / show welcome' },
    { command: 'language', description: 'Change bot language' },
  ]);
}
