# About
Apple Screen Time only applies to the Launcher and not the Game itself
https://bugs.mojang.com/browse/MCL-14705?page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel&showAll=true
This project addresses this problem by forcefully exiting Minecraft outside the allowed time frame.
Designed for Mac OS only 

# How to use

1. Clone project to any dir, e.g. home: `git clone https://github.com/dziamid/minecraft-screentime`
2. Install NodeJS 14+: `brew install node`
3. Install dependencies: `npm install`
4. Adjust allowed timeframe in 
5. Create launchd job (this will create a launchd file): `npm run launchd`