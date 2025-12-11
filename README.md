# LaserPulse Calc

A precision calculator for laser material processing applications. Calculates pulses per spot, overlap percentage, and energy density based on repetition rate, scanning speed, and spot size.

**🚀 Live Demo: [pulse.laserphotonics.uk](https://pulse.laserphotonics.uk/)**

## Features

- Real-time calculation of laser processing parameters
- Interactive visualization of pulse overlap
- Unit conversion support (kHz/MHz, mm/s - m/min, μm/mm)
- Clean, responsive interface
- Instant results with no setup required

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/laserpulse-calc)

### Quick Deploy

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Vercel will automatically:
   - Fork the repository
   - Configure the build settings
   - Deploy your application

### Manual Deployment

1. Install [Vercel CLI](https://vercel.com/cli):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Run Locally

**Prerequisites:** Node.js 18+

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd laserpulse-calc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## License

MIT
