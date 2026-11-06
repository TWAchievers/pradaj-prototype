# Pradaj Global Consult prototype

A real estate frontend for a client review and a beginner vibe coding class. It uses React, TypeScript, Tailwind CSS and Vite.

All six property records and prices are fictional and marked DEMO / NOT FOR SALE. The images are generated illustrations. The inspection form only simulates a request. The phone and WhatsApp links use the supplied real business contact. The official logo was supplied by Pradaj for this prototype.

## Start here

Local hosting runs the site on your own computer. Each student downloads the source from GitHub and starts their own copy. The localhost address belongs to the computer running the site.

Install Node.js 24 LTS from https://nodejs.org and VS Code from https://code.visualstudio.com. Node.js includes npm, which installs the project's dependencies. Internet access is needed for the initial installation.

1. Download this repository with **Code → Download ZIP**, or extract the source ZIP supplied by your instructor.
2. Extract the ZIP. Open the folder containing `package.json` in VS Code using **File → Open Folder**. If there are two folders inside one another, open the inner project folder.
3. Choose **Terminal → New Terminal** in VS Code.
4. Run these commands one at a time.

```sh
node --version
npm --version
npm ci
npm run dev
```

`npm ci` installs exactly the dependency versions recorded in `package-lock.json`. `npm run dev` starts the development server. Open the Local address printed by Vite in your browser, normally `http://localhost:5173`. Vite may choose another port if that one is busy.

Keep the terminal open while working. Save a source file and the browser will update. Press **Ctrl+C** in the terminal to stop the server. Next time, open the same folder and run `npm run dev`. Run `npm ci` again when the dependency lockfile changes or dependencies need reinstalling.

If Windows PowerShell says `npm.ps1 cannot be loaded because running scripts is disabled`, use the terminal dropdown in VS Code to create a **Command Prompt** terminal, then run the commands there.

If the terminal says it cannot find `package.json`, open the correct project folder. If it cannot find `node` or `npm`, install Node.js and reopen VS Code. `index.html` is the entry point for Vite. Start the development server to view the editable source project.

## Upload the project through the GitHub website

1. Sign in at https://github.com and create a new repository named `pradaj-prototype`.
2. Choose visibility. A private repository lets you control access through invitations. A public repository lets anyone view and download the source. For the initial class and client review, a private repository is a reasonable starting point.
3. Create the repository. In the empty repository, choose **uploading an existing file**. In a repository with files, choose **Add file → Upload files**.
4. Open the extracted project folder on your computer. Upload its contents so `package.json`, `README.md`, `index.html`, `src`, `public` and `scripts` sit directly at the repository root.
5. Include `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore` and `.nvmrc`. Windows File Explorer can show dotfiles. macOS Finder uses **Command+Shift+.** to show hidden files.
6. For this package, the dependency folder and build output are already excluded. If you are uploading a folder you have run locally, omit `node_modules` and `dist` from the upload. Keep `.gitignore` in the repository so Git-based workflows also exclude them.
7. Enter a commit message such as `Add Pradaj classroom prototype`, then commit the files.
8. Check that opening the repository shows `package.json` directly and the README displays the setup instructions.

Upload the extracted files so students can browse and edit individual source files on GitHub. The ZIP itself is useful for downloading and sharing the package.

GitHub stores the code. An online website address requires a separate hosting step such as GitHub Pages or Cloudflare Pages. Students can run the project locally as soon as they have access to the repository.

## Give students access

For a private repository, open its **Settings**, find **Collaborators** under access, and invite each student's GitHub username. Students accept the invitation before downloading the repository. For a public repository, share the repository URL.

Students can use **Code → Download ZIP**, extract it, and follow the setup instructions above. If they already use Git, they can use **Code → HTTPS** to copy the clone URL, then run `git clone` with that URL and open the downloaded folder. Cloning a private repository requires GitHub authentication.

Each downloaded copy runs independently. Changes made in a student's folder stay on that computer until uploaded or pushed to GitHub.

## Understand the files

| File or folder | Purpose |
| --- | --- |
| `src/data.ts` | Six fictional listings, filtering, prices and contact helpers |
| `src/components.tsx` | Shared navigation, search form, cards, buttons and footer |
| `src/screens.tsx` | Home, catalogue, property details, inspection, About and Contact screens |
| `src/main.tsx` | App entry point and navigation between screens using URL fragments |
| `src/styles.css` | Layout, typography, colours, mobile styles and keyboard focus |
| `public/images` | Official PNG logo, generated WebP property illustrations and closer gallery crops |
| `index.html` | HTML entry point that loads the React app |
| `package.json` | Dependencies and commands |
| `package-lock.json` | Exact dependency versions for repeatable installation |
| `.gitignore` | Files and folders Git should exclude |

## First classroom exercise

1. Start the site and explore the navigation.
2. Search for undeveloped land with a maximum budget of ₦20,000,000. The Emene sample should be the only result.
3. Open it, advance the gallery and choose **Try inspection request**. The property should be preselected.
4. Submit an empty form, then enter fictional details and a future date. Confirm that the result explicitly describes a simulation.
5. Open `src/screens.tsx`. Find `Find your place` in the homepage heading. Change it to `Discover your place`, save, and look at the browser.
6. Restore the original wording. Explain which file changed and why that changed the page.
7. Open `src/data.ts`. Find the Emene sample price. Change it temporarily, then check how the budget filter responds. Restore the price afterwards.
8. Narrow the browser window, open the menu, use Tab to move between controls, and test a filter combination with no matches.

A useful AI instruction for students is “Explain how the property search works across data.ts, components.tsx and screens.tsx. Use simple English and show the relevant functions before suggesting any changes.”

## Check and build

```sh
npm run build
```

This runs the TypeScript check and creates the static site in `dist`. After a successful build, run this to view the built version locally.

```sh
npm run preview
```

Open the address printed in the terminal. To create a single HTML file for an offline presentation, build first and then run this command.

```sh
npm run package-preview
```

It creates `Pradaj-Preview.html` in the project folder with the fonts and images embedded. Open that generated file directly in a browser. WhatsApp and phone actions still require the appropriate external connection or application.

## Documentation

- Vite setup and local development — https://vite.dev/guide/
- Upload files to GitHub — https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Invite collaborators — https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/inviting-collaborators-to-a-personal-repository
