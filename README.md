# Covid Colors (covid-colors)

See the [live version here](https://pomalley.github.io/covid-colors/#/).

This is a simple browser-only website for tracking COVID-19 data in Massachusetts. Users can create configurations of towns to be weighted together to provide an average case rate and test positivity, and set color-based thresholds.

It is based on the ["Riding the Waves" article on Your Local Epidemiologist](https://yourlocalepidemiologist.substack.com/p/riding-the-waves-a-framework-for?s=r); the idea being it will quickly tell which column you are in.

## How to Use

Choose the towns contributing to your measurement (aka "config") by selecting them from the dropdown. Set a name for your config by clicking on the `[unnamed config]` title, and save the config. For example, I have a "public transit" config consisting of Arlington, Somerville, and Cambridge, where I ride the bus and subway.

The color of the config name is the overall color code for that config; the average case rate and positivity percentage are computed from the component towns, and the worse category of the two is used. You can adjust the weights of the individual towns if, for example, you feel that you have a relatively small exposure in one relative to the others.

You can create as many configs as you like, for different scenarios (work, school, transit, etc). The configs are saved in the browser, so you'll need to re-enter them on a new device, or if you clear your browser data.

## Data Source

COVID-19 rates in Massachussetts municipalities are published by the MA DPH every Thursday, and consist of an average over the past two weeks. Therefore, the data presented here are a lagging indicator of your actual exposure, especially as the latest report gets older. Historical data are available by changing the "Report Date" dropdown at the bottom.

A separate process pulls the data daily from the DPH site and puts it in a public Google Drive folder, from which this site reads.

## Technical details

This uses the [Quasar framework](https://quasar.dev/), and all data retrieval and computation is done client-side. It can therefore be hosted entirely statically, such as in a Github repository's [Github Page](https://pages.github.com/).

To hack on it, clone the repo and fire up your `npm` or `yarn`:

```bash
# Install dependencies, including Quasar.
yarn
# or
npm install
```

```bash
# Run the dev mode
quasar dev
# hosts on localhost:3000
```

```bash
# Build for production
quasar build
```

For deployment, simply copy the `build` output (everything in the `dist/spa` directory) to wherever it will be hosted. For github pages, this is simply the `docs/` directory (and then push the changes back to github).

This project is under the MIT license, so do what you like with it.
