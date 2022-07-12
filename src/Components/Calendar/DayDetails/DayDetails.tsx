import { useEffect, useState } from 'react';
import Images from '../../../Styles/Assets/Images/Images';
import Modal from '../../Shared/Modal/Modal';
import { Event } from '../CalendarTypes';

type Props = {
  show: boolean;
  setShow: (state: boolean) => void;
  setShowEdit: (state: boolean) => void;
  setSelectedEventToEdit: (event: Event) => void;
  setSelectedDay: (day: string | null) => void;
  events: Event[];
  isMobileView: boolean;
  removeEvent: (eventId: string) => void;
};

const DayDetails = (props: Props) => {
  const {
    show,
    setShow,
    events,
    isMobileView,
    removeEvent,
    setShowEdit,
    setSelectedEventToEdit,
    setSelectedDay,
  } = props;

  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null);

  useEffect(() => {
    if (!events || events.length === 0) {
      setShow(false);
    }
    if (!show) {
      setSelectedDay(null);
    }
  }, [events, show]);

  return (
    <Modal
      animation='fade'
      position='center'
      show={show}
      closeModal={() => setShow(false)}
    >
      <div
        className='p-4 bg-white rounded-md'
        style={{
          width: isMobileView ? '90vw' : '50vw',
        }}
      >
        {events &&
          events.length &&
          events.map((event, index) => (
            <div
              key={event.id}
              className={`flex flex-col py-3 px-2 rounded cursor-pointer items-center ${
                index > 0 && 'mt-4'
              }`}
              onClick={() => {
                if (event.id === selectedEvent?.id) {
                  setSelectedEvent(null);
                  return;
                }
                setSelectedEvent(event);
              }}
            >
              <div className='flex justify-between w-full h-10'>
                <div className='flex items-center'>
                  <div
                    className='rounded-full font-bold h-6 w-6 text-center'
                    style={{
                      backgroundColor: event.color,
                      color: 'white',
                    }}
                  >
                    {event.booking && 'B'}
                  </div>
                  <div
                    className='flex w-[80%] justify-between items-center p-2'
                    style={{
                      borderRadius: '0.5rem',
                    }}
                  >
                    <div className='flex-1'>{event.title}</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    className='hover:bg-slate-500 py-2 px-4 rounded-md'
                    style={{
                      backgroundImage: `url(${Images.Edit})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      height: '100%',
                      width: 'auto',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedEventToEdit(event);
                      setShowEdit(true);
                    }}
                  />
                  <button
                    className='hover:bg-slate-500 py-2 px-4 rounded-md'
                    style={{
                      backgroundImage: `url(${Images.Bin})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      height: '100%',
                      width: 'auto',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      removeEvent(event.id);
                    }}
                  />
                </div>
              </div>
              {selectedEvent && selectedEvent.id === event.id && (
                <div className='flex flex-col w-full p-2'>
                  <div className='flex-1'>Title: {event.title}</div>
                  <div className='flex-1'>Description: {event.description}</div>
                  <div className='flex-1'>Phone: {event.phone}</div>
                  <div className='flex-1'>Price: {event.price}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default DayDetails;