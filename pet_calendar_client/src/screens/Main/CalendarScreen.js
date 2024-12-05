import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import MainScreensWrapper from '../../components/MainScreensWrapper';
import { TouchableOpacity } from 'react-native';

const CalendarScreen = () => {
  const [calendarKey, setCalendarKey] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  // Dates are marked: YYYY-MM-DD
  const [events, setEvents] = useState({
    '2024-12-12': [{ title: 'Vet Appointment' }],
    '2024-12-10': [{ title: 'Grooming' }, { title: 'Feeding Schedule Update' }],
    '2024-12-19': [{ title: 'Bath' }],
  });

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'red' }; // You can customize the dotColor based on event type if needed
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = { ...(markedDates[selectedDate]), selected: true, selectedColor: 'blue' };
  }
  const onDatePress = (day) => {
    setSelectedDate(day.dateString);
  };
  
useFocusEffect(React.useCallback(() => {
  setCalendarKey((prevKey) => prevKey + 1);
}, []));
    return(
        <MainScreensWrapper title="Calendar">
            <Calendar 
              key={calendarKey}
              onDayPress={onDatePress}

              
              theme={{
                calendarBackground: '#f0f070', // Background color of the calendar
                textSectionTitleColor: '#4a90e2', // Month and day titles
                selectedDayBackgroundColor: '#ff6347', // Background of selected day
                selectedDayTextColor: '#ffffff', // Text color of selected day
                todayTextColor: '#ff6347', // Today's date color
                dayTextColor: '#2d4150', // Default day text color
                dotColor: '#00adf5', // Default dot color
                arrowColor: '#4a90e2', // Navigation arrows
                textDayFontWeight: 'bold',
              }}

              dayComponent={({ date, state }) => {
                const isDisabled = state === 'disabled';
                const isSelected = date.dateString === selectedDate;
                const hasEvent = !!markedDates[date.dateString]?.marked; // Check if the day is marked
                const eventColor = markedDates[date.dateString]?.dotColor || '#00adf5'; // Use dot color if available
              
                const handlePress = () => {
                  if (!isDisabled) {
                    setSelectedDate(date.dateString); // Update selected date
                  }
                };
              
                return (
                  <TouchableOpacity
                    onPress={handlePress}
                    style={{
                      width: 58,
                      borderWidth: 3,
                      borderColor: '#808040',
                      padding: 10,
                      margin: -8,
                      backgroundColor: isSelected ? '#a0f070' : '#f0f070', // Highlight selected day
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: isDisabled ? 'gray' : 'black' }}>
                      {date.day}
                    </Text>
                    {hasEvent && (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3, // Makes it circular
                          backgroundColor: eventColor, // Use the dot color
                          marginTop:5,
                          position:'absolute' // Space between the day number and the dot
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          <View style={styles.eventBox}>
            <Text style={styles.eventBoxTitle}>Events for {selectedDate || '...'}</Text>
            {events[selectedDate]?.length ? (
              events[selectedDate].map((event, index) => (
                <Text key={index} style={styles.eventText}>
                  - {event.title}
                </Text>
              ))
            ) : (
              <Text style={styles.eventText}>No events</Text>
            )}
          </View>
        </MainScreensWrapper>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  eventBox: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
  eventBoxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  eventText: {
    fontSize: 14,
    color: '#333',
  },
});


export default CalendarScreen;