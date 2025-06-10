import moment from "moment";
import { useCallback, useEffect, useState } from "react";


const useFetchTimes = (date, isSunday) => {
  const [timesData, setTimesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTimes = useCallback(
    async (selectedDate) => {
      setIsLoading(true);
      setError(null);
      if (!selectedDate) {
        setIsLoading(false);
        return; // Don't fetch if no date is selected
      }
    
     try {
        // Simulate an API call delay
        await new Promise(resolve => setTimeout(resolve, 700));

        // --- All tasks for selected day in timeline (Example Data Generation) ---
        const tasksForDay = [];
        const baseMoment = moment(selectedDate);

        // Generate a random number of tasks for the day (e.g., 2 to 6 tasks)
        const numTasks = Math.floor(Math.random() * 5) + 2;

        const possibleStartHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // Common work hours

        for (let i = 0; i < numTasks; i++) {
          const startHour = possibleStartHours[Math.floor(Math.random() * possibleStartHours.length)];
          const startMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45 minutes

          // Create start time
          const startTimeMoment = baseMoment.clone().hour(startHour).minute(startMinute).second(0);

          // Random duration for the task (e.g., 30 to 120 minutes)
          const durationMinutes = Math.floor(Math.random() * 10) * 15 + 30; // 30, 45, ..., 120 minutes

          // Calculate end time
          const endTimeMoment = startTimeMoment.clone().add(durationMinutes, 'minutes');

          tasksForDay.push({
            id: `${selectedDate}-${i}-${startTimeMoment.format('HHmm')}`,
            title: `${['Meeting', 'Coding', 'Break', 'Planning', 'Review'][Math.floor(Math.random() * 5)]}`,
            description: `Details for Task ${i + 1} on ${selectedDate}`,
            startTime: startTimeMoment.format('HH:mm'),
            endTime: endTimeMoment.format('HH:mm'),
            status: ['completed', 'pending', 'in-progress'][Math.floor(Math.random() * 3)],
          });
        }

        // Sort tasks by their start time to create a chronological timeline
        tasksForDay.sort((a, b) => {
          const timeA = moment(a.startTime, 'HH:mm');
          const timeB = moment(b.startTime, 'HH:mm');
          return timeA.diff(timeB);
        });

        // Update the state with the tasks for the selected date
        // Use a functional update to ensure we're working with the latest state
        setTimesData(prevData => ({
          ...prevData,
          [selectedDate]: tasksForDay,
        }));

      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    
    },
    []
  ); // Dependencies for useCallback

  useEffect(() => {

    if (date && !isSunday) {
      fetchTimes(date);
    }
  }, [date, fetchTimes]);

  return { timesData, isLoading, error, fetchTimes };
};

export default useFetchTimes;
