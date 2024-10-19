import { useState, useEffect } from 'react';

interface Slot {
  time: string;
  booked: boolean;
}

interface DaySlots {
  date: string;
  slots: Slot[];
}

interface CalendarComponentProps {
  onSlotSelect: (date: string, time: string) => void;
}

const CalendarComponent = ({ onSlotSelect }: CalendarComponentProps) => {
  const [weekDays, setWeekDays] = useState<DaySlots[]>([]);

  // Funktion för att generera 30-minuters slots mellan 08:00 och 19:00
  const generateSlots = (startTime: string, endTime: string): Slot[] => {
    const slots: Slot[] = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);

    while (currentTime < end) {
      const timeString = currentTime.toISOString().substr(11, 5); // "08:00" format
      slots.push({ time: timeString, booked: false });
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return slots;
  };

  // Funktion för att generera en veckovy med slots för varje dag
  const generateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      days.push({
        date: dayString,
        slots: generateSlots("08:00", "19:00")
      });
    }
    setWeekDays(days);
  };

  useEffect(() => {
    generateWeekDays();
  }, []);

  const handleSlotClick = (date: string, time: string) => {
    onSlotSelect(date, time); // Kallar på en funktion för att hantera slot-val
  };

  return (
    <div className='w-full'>
      <h2 className='p-2'>Kalender för veckan</h2>
      <div className="calendar flex justify-center space-x-4">
        {weekDays.map((day, index) => (
          <div key={index} className="day-column flex flex-col border">
            <h3 className='py-2'>{day.date}</h3>
            {day.slots.map((slot, idx) => (
              <div
                key={idx}
                className={`slot ${slot.booked ? 'booked' : ''}`}
                onClick={() => handleSlotClick(day.date, slot.time)}
                style={{ padding: '10px', cursor: 'pointer', backgroundColor: slot.booked ? '#f5f5f5' : '#fff' }}
              >
                {slot.time}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
