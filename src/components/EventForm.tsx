import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({guests, submit}) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as IEvent)

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())});
        }
    }

    return (
        <Form
            name="create-event"
            onFinish={e => submit({...event, author: user.username})}
            autoComplete="off"
            layout="horizontal"
        >
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required('Please input Event description!')]}
            >
                <Input
                    value={event.description}
                    onChange={e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>

            <Form.Item
                label="Event date"
                name="date"
                rules={[
                    rules.required('Please select Event date!'),
                    rules.isDateAfter('Please choose the date in future')
                ]}
            >
                <DatePicker
                    onChange={date => selectDate(date)}
                />
            </Form.Item>

            <Form.Item
                label="Choose guest"
                name="guest"
                rules={[rules.required('Please select Event date!')]}
            >
                <Select onChange={(guest: string) => setEvent(prev => ({...prev, guest}))}>
                    {guests.map(guest => <Select.Option key={guest.username}
                                                        value={guest.username}>{guest.username}</Select.Option>)}
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 10, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EventForm;