export const plistLabel = `com.minecraft`;
export const plistPath = `~/Library/LaunchAgents/${plistLabel}.plist`;

export const plist = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
 <dict>
  <key>Label</key>
  <string>${plistLabel}</string>
  <key>WorkingDirectory</key>
  <string>${process.cwd()}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/npm</string>
    <string>start</string>
  </array>
  <key>StartInterval</key>
  <integer>15</integer>
  <key>StandardErrorPath</key>
  <string>${process.cwd()}/stderr.log</string>  
  <key>StandardOutPath</key>
  <string>${process.cwd()}/stdout.log</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string><![CDATA[${process.env.PATH}]]></string>
  </dict>
 </dict>
</plist>
`.trim();
