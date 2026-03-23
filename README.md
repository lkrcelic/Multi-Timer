# Multi-Timer App

A React-based multi-timer application with flip clock display, designed for projector/distance viewing. Perfect for managing multiple table timers in restaurants, events, or any scenario requiring simultaneous countdown tracking.

## Features

- **Flip Clock Display** - Classic flip clock design with black panels and grey digits
- **Multiple Timers** - Support for 1-10 timers with automatic grid layout
- **Easy Controls**:
  - Single click: Start/Pause timer
  - Double click: Restart timer
  - Right click: Set custom time or delete timer
- **Visual Alerts** - Red blinking when timer expires
- **Large UI** - All controls optimized for distance viewing (projector-friendly)
- **Toggle Labels** - Show/hide "Table X" labels on demand
- **Dynamic Management** - Add or remove timers on the fly

## How to Run

### Development Mode

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Production Build

1. **Build the app:**

   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

   Or simply push to GitHub and connect your repository to Vercel for automatic deployments.

## Usage

1. **Setup Screen** - On first launch, select the number of tables (1-10) and set the initial time
2. **Timer Controls**:
   - Click a timer to start/pause
   - Double-click to restart
   - Right-click for options (set time, delete)
3. **Add Timer** - Click the `+` button in the bottom-right corner
4. **Toggle Labels** - Use the button in the top-left to show/hide table numbers

## Tech Stack

- React 18
- Vite
- CSS (no external UI libraries)
# Multi-Timer
