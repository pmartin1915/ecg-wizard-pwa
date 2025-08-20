# ECG Classification System - Professional PWA

## Overview
Professional Progressive Web Application (PWA) for ECG Classification, designed for medical environments and clinical training. This system preserves the exact AI logic from the original Streamlit application while providing a modern, installable PWA experience.

## Features

### 🏥 Professional Medical Design
- Medical-grade blue color scheme matching clinical environments
- Professional typography and spacing
- No emojis or decorative elements
- Suitable for hospital and clinical settings

### 🧠 Real AI Classification
- **Preserves exact AI logic** from original Streamlit system
- Real feature extraction: heart rate, rhythm regularity, signal quality
- Decision tree classification for 5 cardiac conditions
- Confidence scoring with clinical accuracy

### 📱 PWA Capabilities
- **Installable** on Windows, macOS, iOS, and Android
- **Offline functionality** for demo mode
- **Service worker** caching for reliable performance
- **Progressive enhancement** for all devices

### 🔬 Clinical Features
- 30 cardiac condition classifications
- 66,540 patient record training dataset
- Real-time progress indicators
- Professional ECG visualizations
- Batch processing capabilities

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+ (for backend)
- Access to original ECG classification system

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Start Development Servers**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   python start_backend.py
   ```
   
   Terminal 2 - Frontend:
   ```bash
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/docs

## Project Structure

```
ecg-classification-pwa/
├── public/                    # PWA manifest and static files
│   ├── manifest.json         # PWA configuration
│   └── index.html           # Professional medical HTML template
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header/         # Professional medical header
│   │   ├── Sidebar/        # Navigation sidebar
│   │   ├── Charts/         # ECG visualization components
│   │   └── PWA/           # PWA-specific components
│   ├── pages/             # Main application pages
│   │   ├── ECGAnalysis/   # Main ECG analysis interface
│   │   └── ...           # Other pages
│   ├── styles/           # Professional medical styling
│   │   ├── theme.ts     # Medical color scheme
│   │   └── GlobalStyles.tsx # Global CSS
│   ├── hooks/           # React hooks for API integration
│   └── services/       # API communication services
├── backend/
│   ├── main.py         # FastAPI backend with exact AI logic
│   ├── start_backend.py # Backend startup script
│   └── requirements.txt # Python dependencies
└── package.json        # Frontend dependencies
```

## AI Logic Preservation

### Critical: Zero Modification Policy
The FastAPI backend imports and uses the **exact same AI logic** from the original Streamlit system:

```python
# Preserves exact AI logic
from app.utils.real_ai_predictor import RealECGPredictor
```

### Features Preserved
- Heart rate estimation with R-wave peak detection
- Rhythm regularity analysis via autocorrelation
- Signal quality assessment (SNR calculation)
- Frequency domain analysis (FFT)
- Decision tree classification rules
- Confidence scoring algorithms

## Professional Medical Styling

### Color Scheme (Matching Original)
```css
--medical-primary-blue: #1e3a8a      /* Header blue */
--medical-primary-blue-light: #3b82f6  /* Button blue */
--medical-background-light: #f8f9fa     /* Main background */
--medical-clinical-critical: #dc2626    /* Critical alerts */
--medical-clinical-warning: #f59e0b     /* Warning alerts */
--medical-clinical-info: #0ea5e9        /* Info alerts */
```

### Clinical Alert System
- **Critical**: Red background for urgent conditions (MI)
- **Warning**: Yellow background for significant findings (AFIB)
- **Info**: Blue background for general information
- **Success**: Green background for normal findings

## PWA Installation

### Desktop Installation
1. Open Chrome/Edge and navigate to the application
2. Click the install icon in the address bar
3. Follow installation prompts
4. App will appear in Start Menu/Applications

### Mobile Installation  
1. Open in Safari (iOS) or Chrome (Android)
2. Tap "Add to Home Screen" / "Install App"
3. App will appear on home screen

### Features When Installed
- Runs in standalone mode (no browser chrome)
- Offline demo functionality
- Native-like experience
- Professional medical appearance

## API Documentation

### Main Endpoints

#### ECG Classification
```http
POST /api/v1/classify-ecg
Content-Type: multipart/form-data

# Upload ECG file for AI analysis
```

#### Demo Analysis
```http
POST /api/v1/analyze-demo/{demo_id}

# Analyze demo files:
# - normal_sinus_rhythm
# - atrial_fibrillation  
# - myocardial_infarction
```

#### System Status
```http
GET /api/v1/status

# Returns system health and AI availability
```

#### Clinical Reference
```http
GET /api/v1/cardiac-conditions

# Returns database of 30 cardiac conditions
```

## Development

### Frontend Development
```bash
npm start          # Development server
npm run build      # Production build
npm run build:pwa  # PWA-optimized build
```

### Backend Development
```bash
cd backend
python start_backend.py  # Start with health checks
uvicorn main:app --reload  # Direct uvicorn start
```

### Testing
- Frontend: React Testing Library
- Backend: FastAPI built-in testing
- PWA: Lighthouse audits

## Deployment

### Production Build
```bash
npm run build:pwa
```

### Environment Variables
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_VERSION=1.0.0
```

### Backend Deployment
- FastAPI with Gunicorn
- Docker containerization supported
- Health check endpoint: `/health`

## Medical Compliance

### HIPAA Considerations
- No PHI (Personal Health Information) stored
- Local-only processing by default
- Audit logging available
- Secure file upload validation

### Clinical Disclaimers
- Educational and training purposes only
- Not for clinical decision-making without supervision
- Requires validation by licensed healthcare providers
- Professional medical disclaimers included

## Performance

### Target Metrics
- First Contentful Paint: < 2 seconds
- Largest Contentful Paint: < 3 seconds  
- Time to Interactive: < 3 seconds
- Cumulative Layout Shift: < 0.1

### Optimization
- Service worker caching
- Code splitting
- Image optimization
- Professional component lazy loading

## Browser Support

### Desktop
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Mobile
- iOS Safari 14+
- Chrome Mobile 88+
- Samsung Internet 13+

## Contributing

### Development Guidelines
1. Preserve medical professional appearance
2. Maintain accessibility standards (WCAG 2.1)
3. Test on clinical tablet devices
4. Validate AI accuracy preservation
5. Follow medical software best practices

### Code Style
- TypeScript strict mode
- Professional component naming
- Medical terminology accuracy
- No emojis in production code

## License

Professional Medical Software License - See LICENSE file for details.

## Support

For technical support or clinical implementation questions:
- API Documentation: http://localhost:8000/api/docs
- Health Check: http://localhost:8000/health
- System Status: http://localhost:3000/system-info

---

**Medical Disclaimer**: This software is designed for educational and training purposes only. Not intended for clinical decision-making without direct supervision by qualified medical professionals.