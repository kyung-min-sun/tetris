import {Box, IconButton, Modal} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {ReactNode, useState, useEffect} from 'react';
import {SelectionButton} from './selection';
import {SubmitButton} from './submit';

interface CalendarFieldProps {
  buttonClassName?: string;
  className?: string;
  label: string;
  labelClassName?: string;
  value?: Date;
  onChange: (date: Date) => void;
}

interface CalendarPopUpProps {
  _currentDate: Date;
  _selectedDate?: Date;
  onChange: (newDate: Date) => void;
  onClose: () => void;
}

interface CalendarProps {
  _currentDate: Date;
  _selectedDate?: Date;
  onChange: (newDate: Date) => void;
}

/**
 * @param {Date} today
 * @return {Array.<(Date|null)[]>}
 */
function getCalendarGrid(today: Date): (Date|null)[][] {
  const calendarDates:(Date|null)[][] = [new Array(7)];
  const currentMonth = today.getMonth();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  calendarDates[0][today.getDay()] = new Date(today);

  while (
    yesterday.getMonth() == currentMonth ||
    tomorrow.getMonth() == currentMonth
  ) {
    if (yesterday.getMonth() == currentMonth) {
      const day = yesterday.getDay();
      if (day == 6) {
        calendarDates.unshift(new Array(7));
      }
      calendarDates[0][day] = new Date(yesterday);
      yesterday.setDate(yesterday.getDate() - 1);
    }
    if (tomorrow.getMonth() == currentMonth) {
      const day = tomorrow.getDay();
      if (day == 0) {
        calendarDates.push(new Array(7));
      }
      calendarDates[calendarDates.length - 1][day] = new Date(tomorrow);
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
  }

  let deleteFirstRow = true;
  let deleteLastRow = true;

  for (let i = 0; i < 7; i++) {
    if (calendarDates[0][i] == undefined) {
      calendarDates[0][i] = null;
    } else {
      deleteFirstRow = false;
    }
    if (calendarDates[calendarDates.length - 1][i] == undefined) {
      calendarDates[calendarDates.length - 1][i] = null;
    } else {
      deleteLastRow = false;
    }
  }


  if (deleteFirstRow) {
    calendarDates.shift();
  }

  if (deleteLastRow) {
    calendarDates.pop();
  }

  return calendarDates;
}

/**
 *
 * @param {CalendarPopUpProps} props
 * @return {ReactNode}
 */
export function CalendarPopUp(
    {
      _currentDate,
      _selectedDate,
      onChange,
      onClose,
    }: CalendarPopUpProps): ReactNode {
  return <Box className="
    bg-slate-300
    rounded-md
    "
  sx={{
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    boxShadow: 24,
  }}
  >
    <div className="flex flex-row place-content-end">
      <IconButton onClick={() => onClose()}>
        <CloseIcon sx={{color: 'slate-700'}}></CloseIcon>
      </IconButton>
    </div>
    <div className="pb-8 px-8">
      <Calendar
        _currentDate={_currentDate}
        _selectedDate={_selectedDate}
        onChange={onChange}
      />
      <SubmitButton
        isEnabled={_currentDate !== undefined}
        label={'Done'}
        onSubmit={async () => onClose()}
        conditionLabel={''}
      />
    </div>
  </Box>;
}

/**
 *
 * @param {Date} d1
 * @param {Date} d2
 * @return {boolean}
 */
function datesMatch(d1: Date, d2:Date) {
  const d1Date = new Date(d1);
  const d2Date = new Date(d2);
  return d1Date.getMonth() == d2Date.getMonth() &&
    d1Date.getDate() == d2Date.getDate() &&
    d1Date.getFullYear() == d2Date.getFullYear();
}

/**
 *
 * @param {CalendarProps} props
 * @return {ReactNode}
 */
export function Calendar(
    {_currentDate, _selectedDate, onChange}: CalendarProps) {
  const [today, setToday] = useState<Date>(new Date(_currentDate));
  const [calendarDates, setCalendarDates] = useState<(Date|null)[][]>();
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    setCalendarDates([...getCalendarGrid(today)]);
  }, [today]);

  useEffect(() => {
    setSelectedDate(_selectedDate);
  }, [_selectedDate]);

  return <div>
    <div className="flex flex-row place-content-center items-center gap-8 mb-4">
      <IconButton
        className="w-fit"
        onClick={() => {
          setToday((today) => {
            const lastMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                15,
            );
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return lastMonth;
          });
        }}
      >
        <KeyboardArrowLeftIcon color="secondary" />
      </IconButton>
      <div className="col-span-2 text-center">
        {
          today.toLocaleString(
              'en-us',
              {month: 'long', year: 'numeric'}
          )
        }
      </div>
      <IconButton
        className="w-fit"
        onClick={() => {
          setToday((today) => {
            const nextMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                15,
            );
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return nextMonth;
          });
        }}
      >
        <KeyboardArrowRightIcon color="secondary" />
      </IconButton>
    </div>
    <div className="border border-slate-400 p-2 rounded-md grid grid-cols-7">
      {
        calendarDates &&
        calendarDates.map(
            (calendarWeek) =>
              calendarWeek.map(
                  (calendarDay, i) =>
                    <div
                      key={`date-${i}`}
                      className={`p-2
                        ${calendarDay &&
                          selectedDate &&
                          datesMatch(selectedDate, calendarDay) ?
                          `bg-blue-600 hover:bg-blue-600 
                          text-slate-200 border-blue-600` :
                          'hover:bg-slate-400 text-slate-600'}
                        border border-slate-400
                        rounded-md m-1 
                        text-center
                        `}
                      onClick={() => {
                        if (calendarDay) {
                          setSelectedDate(calendarDay);
                          onChange(calendarDay);
                        }
                      }}
                    >
                      {calendarDay ? calendarDay.getDate() : ' '}
                    </div>
              )
        )
      }
    </div>
  </div>;
}

/**
 * @param {CalendarFieldProps} props
 * @return {ReactNode}
 */
export function CalendarField(
    {
      buttonClassName,
      className,
      label,
      labelClassName,
      value,
      onChange,
    }: CalendarFieldProps): ReactNode {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  return <div className={`my-2 ${className}`}>
    <div
      className={
        `text-sm mb-2 font-medium
        ${value ? 'text-slate-400' : 'text-slate-600'}
        ${labelClassName}`
      }
    >
      {label}
    </div>
    <div className={`border-b w-fit ${buttonClassName}`}>
      <SelectionButton
        initialIsClicked={false}
        handleClick={() => {
          setShowCalendar(true);
        }}
      >
        {
          value ?
          new Date(value).toLocaleDateString('ko-kr') :
          'Select Date'
        }
      </SelectionButton>
    </div>
    <Modal
      open={showCalendar}
    >
      <CalendarPopUp
        _currentDate={new Date()}
        _selectedDate={value}
        onChange={onChange}
        onClose={() => setShowCalendar(false)}
      />
    </Modal>
  </div>;
}
