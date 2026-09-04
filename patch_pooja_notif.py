import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

import_statement = "import { useNotifications } from '../../context/NotificationContext';\nimport { useEffect } from 'react';"
content = content.replace("import { usePlanGate }", import_statement + "\nimport { usePlanGate }")

logic = """
  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkUpcomingPoojas = () => {
      const notifiedKey = 'sb_notified_poojas';
      let notifiedIds: string[] = [];
      try {
        notifiedIds = JSON.parse(localStorage.getItem(notifiedKey) || '[]');
      } catch (e) {}

      const now = new Date();
      let newlyNotified = false;

      poojas.forEach(pooja => {
        const dStr = pooja.bookingDate || pooja.tithiDate;
        if (!dStr) return;
        
        // Parse time if possible, otherwise use 00:00
        let poojaDate = new Date(dStr);
        if (pooja.timeSlot) {
            const timeMatch = pooja.timeSlot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (timeMatch) {
                let hours = parseInt(timeMatch[1]);
                const mins = parseInt(timeMatch[2]);
                const isPM = timeMatch[3].toUpperCase() === 'PM';
                if (isPM && hours < 12) hours += 12;
                if (!isPM && hours === 12) hours = 0;
                poojaDate.setHours(hours, mins, 0, 0);
            }
        }

        const diffHours = (poojaDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (diffHours > 0 && diffHours <= 24 && !notifiedIds.includes(pooja.id)) {
          addNotification({
            title: 'Upcoming Pooja Reminder',
            message: `${pooja.poojaName} for ${pooja.devoteeName} is scheduled in less than 24 hours.`,
            type: 'info'
          });
          notifiedIds.push(pooja.id);
          newlyNotified = true;
        }
      });

      if (newlyNotified) {
        localStorage.setItem(notifiedKey, JSON.stringify(notifiedIds));
      }
    };

    checkUpcomingPoojas();
    const interval = setInterval(checkUpcomingPoojas, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [poojas, addNotification]);

  const currentMonth = new Date().getMonth();
"""

content = content.replace("  const currentMonth = new Date().getMonth();", logic)

with open(filepath, 'w') as f:
    f.write(content)
