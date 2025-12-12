# MLS Downloadable Calendars - GitHub Pages Edition

This project hosts MLS calendar files on GitHub Pages with automated calendar generation via GitHub Actions.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Navigate to **Pages** in the left sidebar
4. Under "Build and deployment":
   - Set **Source** to "Deploy from a branch"
   - Set **Branch** to `main`
   - Set **Folder** to `/public`
5. Click **Save**

Your site will be published at: `https://tylermachado.github.io/us-soccer-calendars/`

### 2. GitHub Actions Workflow

The workflow (`.github/workflows/generate-calendars.yml`) is already configured to:

- **Run automatically** every Sunday at 12:00 AM UTC
- **Allow manual triggering** via the Actions tab
- Generate updated `.ics` files for all MLS teams
- Automatically commit and push changes if calendars are updated

### 3. Manual Calendar Generation

To regenerate calendars locally:

```bash
npm install
npm run generate
```

This will update all `.ics` files in the `public/` folder.

## How It Works

1. The GitHub Actions workflow fetches the latest MLS schedule from the official API
2. It generates `.ics` calendar files for each team using the `ics` library
3. If changes are detected, it commits and pushes them back to the repository
4. GitHub Pages serves the files from the `public/` folder

## Features

- 📅 Pre-generated `.ics` files for all 29 MLS teams
- 🔄 Automatically updated weekly via GitHub Actions
- 📱 Works with Apple Calendar, Google Calendar, Outlook, and more
- 🚀 Hosted for free on GitHub Pages
- 📝 No backend server needed

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Backend**: Node.js (for local calendar generation)
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## Files

- `public/` - Static website and calendar files served by GitHub Pages
- `scripts/generateMLS.js` - Script to fetch MLS data and generate `.ics` files
- `public/frontend.js` - Client-side script to build the calendar download links
- `.github/workflows/generate-calendars.yml` - GitHub Actions workflow configuration
