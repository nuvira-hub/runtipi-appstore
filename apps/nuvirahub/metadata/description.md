## NuviraHub server

NuviraHub is an open-source remote desktop app for Windows, macOS and Linux. This app runs your own NuviraHub server: the apps on your computers sign in to it to find each other, connect directly when they can, and relay the session through it when they cannot. No account is needed.

Open the app after installing it: its page shows the address to enter in the NuviraHub apps (Settings, Server), the port to forward on your router to reach your computers from outside your home network, and what to back up.

The server uses port 21116, UDP and TCP. Keep the app on that port: the UDP port is fixed, so a different port in the app settings would split the two.

Back up the `data` folder of the app: it holds the server's identity (its certificate and key, which the apps pin), the devices and the settings.

- Download the apps: https://nuvirahub.dev/en/download/
- Guide: https://nuvirahub.dev/en/guide/
- Source code and issues: https://github.com/nuvira-hub/nuvira
