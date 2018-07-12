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
            week: [],
        };
    }

    componentDidMount() {
        const week = [
            {
                title: 'Opening Soon',
                content: this.renderWeeklySchedule()
            },
        ];

        this.setState({week});
    }

    renderWeeklySchedule() {
        const {hours} = this.props;
        let weeklySchedule = [];

        Object.keys(hours).forEach(day => {
            if(day == 'holidays') return;

            let weekIndex;
            switch(day) {
                case 'monday':
                    weekIndex = 0;
                    break;

                case 'tuesday':
                    weekIndex = 1;
                    break;

                case 'wednesday':
                    weekIndex = 2;
                    break;

                case 'thursday':
                    weekIndex = 3;
                    break;

                case 'friday':
                    weekIndex = 4;
                    break;

                case 'saturday':
                    weekIndex = 5;
                    break;

                case 'sunday':
                    weekIndex = 6;
                    break;
            }

            weeklySchedule[weekIndex] = hours[day] 
                ? { ...hours[day], day } 
                : { day, open: false };
        });

        return (
            <View>
                {weeklySchedule.map(({day, open, close}, i) => {
                    return (
                        <Text key={i}>{day}: {open ? `${open} - ${close}` : 'Closed'}</Text>
                    );
                })}
            </View>
        );
    }

    /**
     * Render the component's markup
     * @return {ReactElement} 
     */
    render() {
        const {hours, style: customStyle} = this.props;
        const {currentStatus, week} = this.state;

        return (
            <View style={[...customStyle]}>
                <Accordion dataArray={week} expanded={true} />
                <Text style={[style.text]}>{currentStatus}</Text>
                {"\b"}
                <Text style={[style.text]}>Opens Monday at 8AM</Text>
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