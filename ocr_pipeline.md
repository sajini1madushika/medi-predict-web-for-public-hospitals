# OCR Pipeline

## Overview
- Accepts PDF or image (jpg/png) via `POST /ocr/lab-report` as multipart/form-data.
- Detects document type, extracts text using:
  - PDF text extraction (`pypdf`) first.
  - Fallback to PaddleOCR for images (if installed). No Dockerfile changes; if engine unavailable, returns 503 with clear message.
- Parses clinical values using regex mappers (see Data Mapping) and returns editable structure, units, and metadata.

## Response Shape
```
{
  "document_type": "pdf" | "image",
  "pages": [ { "page": 1, "text": "...", "confidence": number | null } ],
  "extracted": { "hba1c": 7.2, ... },
  "units": { "hba1c": "%", ... },
  "meta": {
    "engine": "pdf-text" | "paddleocr" | "none",
    "parsed_at": "ISO-8601",
    "confidence": number | null,
    "manual_review": true | false
  }
}
```

## Confidence + Manual Review
- For images, average OCR confidence is computed from PaddleOCR detections.
- Manual review flag is true if confidence is missing or < 0.6.

## Storage
- Stores a record in `lab_reports` collection with filename, document type, extracted fields, units, engine, confidence, manual_review, created_at.

## Future Enhancements
- Add pdf rasterization (pdf2image) when needed (poppler required) to OCR scanned PDFs.
- Extend regex parsers and unit normalization.
- Email -> Attachment -> OCR ingestion path.
