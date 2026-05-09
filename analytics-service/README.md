# Analytics Service for Kakeibo
# Advanced financial analysis and reporting

## 📊 Purpose

This service handles:
- Advanced trend analysis
- Predictive analytics
- Anomaly detection
- Complex report generation
- Google Sheets integration
- Power BI connectivity
- Data visualization preparation

## 🚀 Running

```bash
# Development
python -m uvicorn app.main:app --reload --port 8001

# Production
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8001
```

## 📡 API Endpoints

### Health
- `GET /` - Service info
- `GET /health` - Health check

### Analytics (coming soon)
- `POST /analyze/trends` - Trend analysis
- `POST /analyze/predictions` - Predictive analytics
- `POST /analyze/anomalies` - Anomaly detection
- `POST /export/sheets` - Export to Google Sheets
- `POST /export/powerbi` - Export to Power BI

## 🔗 Communication

This service communicates with the main TypeScript backend at `http://localhost:8000`.

Receives:
- User transaction data
- Category information
- Time period filters

Sends back:
- Analysis results
- Formatted reports
- Export-ready data
