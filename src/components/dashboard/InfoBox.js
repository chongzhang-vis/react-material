import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { white, grey800 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';

class InfoBox extends React.Component {

    diffDays(deadLine) {
        const curDate = new Date();
        const deadDate = new Date(deadLine);
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds;
        return Math.round(Math.abs((deadDate.getTime() - curDate.getTime()) / (oneDay)));

    }

    render() {
        const { color, title, value, Icon } = this.props;

        const styles = {
            content: {
                padding: '5px 10px',
                marginLeft: 110,
                height: 100
            },
            number: {
                display: 'block',
                paddingTop: '10px',
                textAlign: 'center',
                fontWeight: typography.fontWeightMedium,
                fontSize: 40,
                color: grey800
            },
            date: {
                fontWeight: typography.fontWeightMedium,
                fontSize: 18,
                color: grey800
            },
            text: {
                fontSize: 20,
                fontWeight: typography.fontWeightLight,
                color: grey800
            },
            iconSpan: {
                float: 'left',
                height: 110,
                width: 110,
                textAlign: 'center',
                backgroundColor: color
            },
            icon: {
                height: 48,
                width: 48,
                marginTop: 30,
                maxWidth: '100%'

            }
        };

        return ( <
            Paper >
            <
            span style = { styles.iconSpan } >
            <
            Icon color = { white }
            style = { styles.icon }
            /> < /
            span >

            <
            div style = { styles.content } >
            <
            span style = { styles.text } > { title }, < /span> <
            span style = { styles.date } > { value } < /span> <
            span style = { styles.number } > { this.diffDays(value) } < /span> < /
            div >

            <
            /Paper>
        );
    }
}

InfoBox.propTypes = {
    Icon: PropTypes.any, // eslint-disable-line
    color: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string
};

export default InfoBox;