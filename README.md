# NuviraHub app store for Runtipi

This [Runtipi](https://runtipi.io) app store has one app: the server of [NuviraHub](https://nuvirahub.dev), an open-source remote desktop app for Windows, macOS and Linux. The apps on your computers sign in to the server to find each other, connect directly when they can, and relay the session through it when they cannot. No account is needed.

## Add the store

In Runtipi, open **Settings**, **App Stores**, **Add appstore**, and enter:

- Name: `NuviraHub`
- URL: `https://github.com/nuvira-hub/runtipi-appstore`

NuviraHub then appears in the App Store.

## After installing

Open the app: its page shows the address to enter in the NuviraHub apps (Settings, Server), the port to forward on your router to reach your computers from outside your home network, and what to back up.

The server uses port 21116, UDP and TCP. Keep the app on that port, because the UDP port is fixed and a different port in the app settings would split the two.

Back up the `data` folder of the app (`app-data/nuvirahub/nuvirahub/data` in your Runtipi folder). It holds the server's identity, which the apps pin, along with the devices and the settings.

The apps for your computers are at <https://nuvirahub.dev/en/download/>.

## Updates

Each NuviraHub release updates the app here. Use **Update App Stores** in the Runtipi settings, then update the app from its page.

## Problems

Open an issue in [nuvira-hub/nuvira](https://github.com/nuvira-hub/nuvira/issues).

## License

The files of this store are under the MIT license. NuviraHub itself is under the AGPL-3.0.
