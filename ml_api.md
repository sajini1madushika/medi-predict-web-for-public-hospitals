# ML API (Phase-2 Placeholder)

## Endpoint
- POST `/predict/lab-values`

### Request (application/json)
```
{
  "hba1c": number?,
  "fasting_glucose": number?,
  "creatinine": number?,
  "egfr": number?,
  "ast": number?,
  "alt": number?,
  "bilirubin_total": number?,
  "sodium": number?,
  "potassium": number?
}
```

### Response (mock for now)
```
{
  "risks": {
    "diabetes": "High|Prediabetes|Normal",
    "hypertension": "Stage-1|Normal",
    "kidney_status": "Borderline|Normal",
    "liver_status": "Abnormal|Normal",
    "electrolytes": "Critical|Normal",
    "summary": "..."
  },
  "bot_reply": "Optional; first reply text from Rasa"
}
```

## Implementation Notes
- Logic is in `backend_fastapi/ml/risk_mock.py` as a simple rule-based summarizer.
- The backend automatically forwards the summary and values to Rasa REST webhook with metadata for a patient-friendly explanation.
- Later we will replace `risk_mock` with real models under `backend_fastapi/ml/` and keep the same API contract.
