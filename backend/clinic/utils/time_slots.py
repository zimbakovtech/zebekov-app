from datetime import datetime, timedelta
from ..models import Shift, Appointment

def generate_available_slots(doctor, date):
    # Get the doctor's shift for the given date
    shift = Shift.objects.filter(doctor=doctor, start_date__lte=date, end_date__gte=date).first()
    if not shift:
        return []

    # Define shift start and end times (example: 9 AM to 5 PM)
    shift_start = datetime.combine(date, datetime.strptime('09:00', '%H:%M').time())
    shift_end = datetime.combine(date, datetime.strptime('17:00', '%H:%M').time())

    # Get existing appointments for the doctor on the given date
    appointments = Appointment.objects.filter(doctor=doctor, date=date)

    # Generate 30-minute slots
    slots = []
    current_time = shift_start
    while current_time < shift_end:
        slot_end = current_time + timedelta(minutes=30)
        # Check if the slot overlaps with any existing appointment
        is_available = True
        for appointment in appointments:
            appt_start = datetime.combine(date, appointment.start_time)
            appt_end = datetime.combine(date, appointment.end_time)
            if (current_time < appt_end and slot_end > appt_start):
                is_available = False
                break
        if is_available:
            slots.append((current_time.time(), slot_end.time()))
        current_time = slot_end

    return slots 