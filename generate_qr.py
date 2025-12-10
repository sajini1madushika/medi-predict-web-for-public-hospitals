"""Generate a QR PNG for patient id P-3001 using qrcode package"""
from pathlib import Path
import qrcode

OUT_DIR = Path(__file__).parent / 'samples'
OUT_DIR.mkdir(exist_ok=True)
img = qrcode.make('P-3001')
outfile = OUT_DIR / 'qr_patient.png'
img.save(outfile)
print('Saved QR to', outfile)
