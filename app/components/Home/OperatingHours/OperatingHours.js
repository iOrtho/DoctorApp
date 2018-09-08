import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Content, Accordion } from 'native-base';
import moment from 'moment';
import style from './style';

class OperatingHours extends Component {

    /** The component's constructor */
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.evaluateCurrentStatus = this.evaluateCurrentStatus.bind(this);
        this.renderTableRow = this.renderTableRow.bind(this);
        this.renderWeeklySchedule = this.renderWeeklySchedule.bind(this);
    }

    /**
     * Return the component's initial state
     * @return {Object} 
     */
    getInitialState() {
        return {
            today: moment(),
            currentStatus: 'Closing Soon at 10PM',
            showWeekly: false,
            schedule: null,
            currentWeekday: '',
            weekdays: [
                'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
            ],
        };
    }

    componentDidMount() {
        const currentWeekday = this.state.weekdays[moment().isoWeekday()-1];
        this.evaluateCurrentStatus(currentWeekday);
        this.setState({currentWeekday});

        // Delay the rendering of the schedule for highlighting day
        setTimeout(() => this.setState({schedule: this.renderWeeklySchedule()}), 100);
    }

    /**
     * Figure out the first hint to show about the operating hours
     * @param  {String} currentWeekday The current week day
     * @return {Void}                
     */
    evaluateCurrentStatus(currentWeekday) {
        const {hours} = this.props;
        const day = moment().year(2000).month(0).date(1);
        const closing = moment(hours[currentWeekday].close_date.seconds * 1000);
        const opening = moment(hours[currentWeekday].open_date.seconds * 1000);
        const closeValue = closing.diff(day,'hours', true);
        const openValue = day.diff(opening,'hours', true);
        this.setState({currentWeekday});

        let currentStatus = '';
        if(closeValue < 0) {
            const nextOpenDay = () => {
                for (let i = 0; i < 7; i++) {     
                    const iso = moment().isoWeekday();
                    const tomorrow = this.state.weekdays[iso+i >= 7 ? 0+i : iso+i];
                    if(hours[tomorrow]) return tomorrow;
                }
            };

            currentStatus = `Opening ${nextOpenDay()} at ${hours[nextOpenDay()].open}`;
        } else if(closeValue < 2) {
            currentStatus = 'Closing Soon';
        } else if (openValue < 0) {
            currentStatus = `Opening at ${hours[currentWeekday].open}`;
        }else {
            currentStatus = `Closing at ${hours[currentWeekday].close}`;
        }

        this.setState({currentStatus});
    }

    /**
     * Re-organize the format of the operating hours and render the time table
     * @return {ReactElement} 
     */
    renderWeeklySchedule() {
        const {hours} = this.props;
        const {weekdays} = this.state;
        let weeklySchedule = [];

        Object.keys(hours).forEach(day => {
            if(day == 'holidays') return;

            weeklySchedule[weekdays.indexOf(day)] = hours[day] 
                ? { ...hours[day], day } 
                : { day, open: false };
        });

        return (
            <View style={style.content}>
                {weeklySchedule.map(this.renderTableRow)}
            </View>
        );
    }

    /**
     * Render the row of the time table
     * @param  {Object} date   The day object of the operating hours
     * @param  {Number} i             The index of the day in the week
     * @return {ReactElement}               
     */
    renderTableRow({day, open, close}, i) {
        const {currentWeekday} = this.state;
        const boldText = currentWeekday == day ? style.bold : {};

        return (
            <View key={i} style={[style.tableRow, style.day]}>
                <Text style={[style.dayCell, boldText]}>
                    {day}
                </Text>
                <Text style={[style.timeCell, boldText]}>
                    {open ? `${open} - ${close}` : 'Closed'}
                </Text>
            </View>
        );
    }

    /**
     * Render the component's markup
     * @return {ReactElement} 
     */
    render() {
        const {hours, style: customStyle} = this.props;
        const {currentStatus, schedule} = this.state;
        const data = [
            {
                title: currentStatus,
                content: schedule,
            }
        ];

        return (
            <View style={[style.dropdown, ...customStyle]}>
                <Accordion dataArray={data} expanded={true} />
            </View>
        );
    }
}

OperatingHours.propTypes = {
    hours: PropTypes.object.isRequired,
    style: PropTypes.array,
};

OperatingHours.defaultProps = {
    style: [],
};

export default OperatingHours;