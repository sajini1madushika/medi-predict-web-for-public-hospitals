from db import db

# Simple seed script to insert mock patient data for P-3001

PATIENT_ID = "P-3001"

def seed():
    col = db.get_collection('medicines')
    col.insert_one({'patient_id': PATIENT_ID, 'name': 'Paracetamol', 'dose': '500mg', 'schedule': 'Morning and Night'})
    col = db.get_collection('exercise')
    col.insert_one({'patient_id': PATIENT_ID, 'activity': 'Walking', 'duration_minutes': 30})
    col = db.get_collection('diet')
    col.insert_one({'patient_id': PATIENT_ID, 'instructions': 'Reduce sugar and salt; eat more vegetables.'})
    col = db.get_collection('comments')
    col.insert_one({'patient_id': PATIENT_ID, 'doctor': 'Dr. Perera', 'comment': 'Follow up in 2 weeks.'})
    print('Seeded mock data for', PATIENT_ID)

if __name__ == '__main__':
    seed()
