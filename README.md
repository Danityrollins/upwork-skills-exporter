# Upwork Skills Exporter

A small Chrome extension I built to research what clients are hiring for on Upwork.

Open an Upwork job search, browse the results, and click **Export skills**. The extension counts every skill tag on the page and downloads a CSV ranked by how often each skill appears. I use it to decide which skills to feature on my profile and which services to package.

## How it works

- `content.js` scans the job cards for skill tags and keeps a running count. A `MutationObserver` re-scans when Upwork loads new results without a page refresh.
- `popup.js` sends an `exportSkills` message to the page when you click the button.
- The CSV (`Skill, Times Found`) is generated in the browser and downloaded as `upwork_skills.csv`. No data leaves your machine.

## Install (developer mode)

1. Download or clone this repo.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and pick this folder.
4. Go to an Upwork job search page, then click the extension icon → **Export skills**.

## Built with

Manifest V3 · JavaScript · Chrome Extensions API

---
Made by **Fajuyi Daniel** · [Portfolio](https://danityrollins.github.io) · [Upwork](https://www.upwork.com/freelancers/~01708bffbb8b6d5771) · [Fiverr](https://www.fiverr.com/s/Bb8o4mG)
