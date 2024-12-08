import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import MainScreensWrapper from '../../components/MainScreensWrapper';
import { Pressable } from 'react-native';

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
    acc[date] = { marked: true, dotColor: 'red' };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = { ...(markedDates[selectedDate]), selected: true, selectedColor: 'blue' };
  }
  const onDatePress = (day) => {
    setSelectedDate(day.dateString);
  };
  
  // This is needed because the calendar does not re-render on code change naturally, so we bind some key to it that would change on us refocusing on the app.
  // the key thing should probably be removed after we settle on the UI, so that there are no unneeded re-renders for the calendar.
useFocusEffect(React.useCallback(() => {
  setCalendarKey((prevKey) => prevKey + 1);
}, []));

    return(
        <MainScreensWrapper title="Calendar">
            <Calendar 
              key={calendarKey}
              onDayPress={onDatePress}

              theme={{
                calendarBackground: '#f0f070',
                textSectionTitleColor: '#4a90e2',
                selectedDayBackgroundColor: '#ff6347',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#ff6347',
                dayTextColor: '#2d4150',
                dotColor: '#00adf5',
                arrowColor: '#4a90e2',
                textDayFontWeight: 'bold',
              }}

              dayComponent={({ date, state }) => {
                const isDisabled = state === 'disabled';
                const isSelected = date.dateString === selectedDate;
                const hasEvent = !!markedDates[date.dateString]?.marked;
                const eventColor = markedDates[date.dateString]?.dotColor || '#00adf5';
              
                const handlePress = () => {
                  if (!isDisabled) {
                    setSelectedDate(date.dateString);
                  }
                };
              
                return (
                  <Pressable
                    onPress={handlePress}
                    style={({ pressed }) => [
                      {
                        width: 58,
                        borderWidth: 3,
                        borderColor: '#808040',
                        padding: 10,
                        margin: -8,
                        backgroundColor: isSelected ? '#a0f070' : '#f0f070',
                        alignItems: 'center',
                        opacity: pressed ? 0.8 : 1, 
                      },
                    ]}
                  >
                    <Text style={{ textAlign: 'center', color: isDisabled ? 'gray' : 'black' }}>
                      {date.day}
                    </Text>
                    {hasEvent && (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: eventColor,
                          marginTop:5,
                          position:'absolute'
                        }}
                      />
                    )}
                  </Pressable>
                );
              }}
            />
          <View style={styles.eventBox}>
            <Text style={styles.eventBoxTitle}>{selectedDate ? selectedDate : 'No Date Selected'}</Text>
            {events[selectedDate]?.length ? (
              events[selectedDate].map((event, index) => (
                <View style={styles.singleEvent}>
                  <Text key={index} style={styles.eventText}>
                    - {event.title}
                  </Text>
                </View>
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
    fontSize: 15,
    color: '#333',
  },
  singleEvent:{
    backgroundColor:'#a0a8af',
    borderBottomWidth:1,
    padding:5,
    
  }
});


export default CalendarScreen;