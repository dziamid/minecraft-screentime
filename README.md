# About
Apple Screen Time only applies to the Launcher and not the Game itself
https://bugs.mojang.com/browse/MCL-14705?page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel&showAll=true
This project addresses this problem by forcefully exiting Minecraft outside the allowed time frame.
Designed for Mac OS only 

# How to use

1. Fork and lone project to any dir, e.g. home: `git clone https://github.com/<your-username>/minecraft-screentime`
2. Install NodeJS 14+: `brew install node`
3. Install dependencies: `npm install`
4. Create .env file `cp .env.example .env` and change DOWNTIME_FILE env var value to point to your project
5. Adjust allowed timeframe in downtime.json file using GitHub edit interface (https://github.com/<your-username>/minecraft-screentime/edit/main/src/downtime.json) 
6. Create launchd job (this will create a launchd file): `npm run plist:load`
7. Test launchd job immediately by running `npm run plist:test`, Minecraft should remain open or close depending on current time and downtime.json value. Check out log files in the root (*.log) for any issues. 
8. You can adjust downtime value by editing downtime.json file on Github (https://github.com/<your-username>/minecraft-screentime/edit/main/src/downtime.json)