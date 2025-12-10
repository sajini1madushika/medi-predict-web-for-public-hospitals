# Data Mapping (Lab Values)

## Keys and Units
- hba1c: %
- fasting_glucose: mg/dL
- creatinine: mg/dL
- egfr: mL/min/1.73m^2
- ast: U/L (aka SGOT)
- alt: U/L (aka SGPT)
- bilirubin_total: mg/dL
- sodium: mmol/L (Na)
- potassium: mmol/L (K)

## Regex Patterns (initial)
- HbA1c: `\b(hb.?a1c|glycated hemoglobin)\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- Fasting glucose: `\b(fasting (plasma )?glucose|fbs|fasting sugar)\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- Creatinine: `\bcreatinine\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- eGFR: `\begfr\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- AST: `\b(ast|sgot)\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- ALT: `\b(alt|sgpt)\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- Bilirubin total: `\bbilirubin( total)?\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- Sodium: `\b(sodium|na)\b[:\s]*([0-9]+(?:\.[0-9]+)?)`
- Potassium: `\b(potassium|k)\b[:\s]*([0-9]+(?:\.[0-9]+)?)`

## Normalization
- Parsed numeric strings converted to float.
- Missing or unparsable values omitted; frontend shows empty editable fields for user entry.

## Storage
- `lab_reports` collection stores: filename, document_type, extracted, units, engine, confidence, manual_review, created_at.
- `lab_predictions` collection stores: input, risks, created_at.

## Future
- Add reference ranges per lab and flag out-of-range values.
- Map alternative spellings (e.g., Sinhala labels) and multilingual support.
- Extend to additional markers (lipids, CBC, CRP, etc.).
