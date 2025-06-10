import { calendarTheme } from "@/helpers";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import EventTimelineList from "../components/EventTimeLineList";
import useFetchTimes from "../hooks/useFetchTasks";
import useSelectedDate from "../hooks/useSelectedDate";

const DateComponent = () => {
  const currentDate = new Date();
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const { selectedDate, handleDayPress, isSunday, markedDates } =
    useSelectedDate(currentDate);
  const { timesData, isLoading, error } = useFetchTimes(selectedDate, isSunday);

  const getMarkedDates = useCallback(() => {
    const initialMarkedDates = markedDates || {}; // Use existing markedDates or default to empty object
    const daysToMark = [1, 2, 3, 4, 5]; // Monday, Tuesday, Friday
    const todayMoment = moment();
    let updatedMarkedDates = { ...initialMarkedDates }; // Copy existing marked dates

    for (let i = -180; i <= 180; i++) {
      const date = todayMoment.clone().add(i, "days");
      const dateString = date.format("YYYY-MM-DD");
      const dayOfWeek = date.day();

      if (daysToMark.includes(dayOfWeek)) {
        updatedMarkedDates[dateString] = {
          ...updatedMarkedDates[dateString],
          marked: true,
          dotColor: "#00adf5",
        };
      }
    }
    return updatedMarkedDates;
  }, [markedDates]);
  const eventsForSelectedDay = useMemo(() => {
    return timesData && timesData[selectedDate] ? timesData[selectedDate] : [];
  }, [timesData, selectedDate]);
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarList
          style={styles.calendar}
          theme={calendarTheme}
          onVisibleMonthsChange={(months) => {}}
          current={currentDate.toDateString()}
          futureScrollRange={2}
          markedDates={getMarkedDates()}
          onDayPress={handleDayPress}
          showScrollIndicator
          pastScrollRange={0}
          horizontal
          pagingEnabled
          minDate={currentDate.toDateString()}
          hideExtraDays
        />
      </View>
      <View style={styles.timesAndDetails}>
        <EventTimelineList
          events={eventsForSelectedDay}
          isLoading={isLoading}
          isSunday={isSunday}
          error={error}
          selectedDate={selectedDate} // Pass selectedDate for loading message
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notWorkingDays: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  notWorkingDaysContent: {
    fontSize: 20,
    color: "white",
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  calendarContainer: {
    marginTop: 0,
    width: "100%",
  },
  calendar: {
    paddingTop: 50,
    borderWidth: 1,
    borderColor: "gray",
    display: "flex",
    width: "100%",
  },
  timesAndDetails: {
    flex:1
  },
  buttonContainer: {
    marginTop: 5,
  },
});

export default DateComponent;
