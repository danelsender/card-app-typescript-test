# working notes

## prereqs

Installed NodeJS

- Required to be installed twice before it worked

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.12.0".
nvm current # Should print "v22.12.0".

# Verify npm version:
npm -v # Should print "10.9.0".
```

## getting going

Following the README.md I ran

```bash
npm install
```

to get the backend up, returned

```bash
> card-app-typescript-test@0.0.0 prepare
> husky install

husky - Git hooks installed

added 90 packages, and audited 91 packages in 6s

30 packages are looking for funding
  run `npm fund` for details

3 vulnerabilities (1 moderate, 2 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
npm notice
npm notice New major version of npm available! 10.9.0 -> 11.0.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.0.0
npm notice To update run: npm install -g npm@11.0.0
npm notice
```

To fix I followed the suggestions and ran

```bash
npm audit fix
```

this seemed to have worked and returned

```bash
changed 4 packages, and audited 91 packages in 2s

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Continue with the README.md

```bash
npm run prisma-setup
```

returns

```bash
npm error Missing script: "prisma-setup"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /Users/delsender/.npm/_logs/2025-01-02T13_04_13_950Z-debug-0.log
```

Run the `backend` and `frontend` in their respective directories

# darkMode

## prereqs

To switch to dark mode I am initially adding a button. Later I will move the button into the settings dialog.

For the switch and the dark mode toggle I am using the [Material UI ](https://mui.com/material-ui/?srsltid=AfmBOorURagA0xY21WpVzTHhcc9kxXEolrDDFz5gNNDwbGZcc1fkUc_I) framework

required install

```bash
npm install @mui/material @emotion/react @emotion/styled
```

the switch itself requires

```bash
npm install react-switch
```

the guide I am following can be found [here](https://semaphoreci.com/blog/dark-mode-reactjs-material-ui#:~:text=To%20toggle%20between%20the%20light,it%20in%20the%20App%20component.).

# adding the switch

Making use of the `tailwind` `darkMode` option in `tailwind.config.js` as a `selector` (this replaced the `class` option recently). Now `className` options can be differentiated between `light` and `dark`.

I _was_ using he MUI to handle the dark mode with `ThemeProvider` and `CSSBaseLine` but opted for the `tailwind` solution instead as it was easier to deal with the compnents.

So far the switch exists only as a switch. Must be in a `settings dialog`. I want to put this in the nav bar, left hand side.

Dialog is now created and sat at the top of the page. BUT dark mode does not take effect to the dialog box...

# adding field to database

- First open the `schema.prisma` file
- Add the field, in this case `scheduled_for DateTime`
- Save the file
- Run `npm prisma migrate --name added_scheduled_for` note in this case you will lose all data, to avoid this make a copy of the database and then add the field to it
- Run `npm run dev`

# Changes to the card

- `text-center` the meeting title
- Removed the emojis for text, more clear
- Removed the media functions on the text and buttons to avoid weird overlaps when changing the page size
- When trying to `useNavigate()` to get back to the All Entries page after updating, the page was not re-rendering, how to fix...?
- Making `className`s to cut down on repeated code
- Only abstracted the `entryBox` and `inputText` for new cards and card edits, no need to increase do much else
