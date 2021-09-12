import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setIsModalVisible(false)
    }

    return (
        <div>
            <Row justify="end">
                <Button
                    type={"primary"}
                    onClick={() => setIsModalVisible(true)}
                >
                    Add Event
                </Button>
            </Row>

            <EventCalendar events={events}/>

            <Modal
                title="Add Event"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </div>
    );
};

export default Event;