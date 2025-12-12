# GitHub Pages Configuration for us-soccer-calendars

To enable GitHub Pages for this repository:

1. Go to your repository settings on GitHub
2. Navigate to **Settings > Pages**
3. Under "Build and deployment":
   - Set **Source** to "Deploy from a branch"
   - Set **Branch** to "main" and select the folder as "public"
4. Click Save

Your site will be published at: `https://tylermachado.github.io/us-soccer-calendars/`

## How it works

- The GitHub Actions workflow (`generate-calendars.yml`) runs on a schedule (every Sunday) and on manual trigger
- It fetches the latest MLS schedule and generates `.ics` calendar files
- If changes are detected, it commits and pushes them automatically
- GitHub Pages serves the static files from the `public/` folder
- Users can visit the site and download `.ics` files for their favorite teams
