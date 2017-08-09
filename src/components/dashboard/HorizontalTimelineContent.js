import React, { PropTypes } from 'react';
import SwipeableViews from 'react-swipeable-views';

import HorizontalTimeline from '../htimeline/HorizontalTimeline';
import HorizontalTimelineConfigurator from './HorizontalTimelineConfigurator';

import TimeInfo from '../resources/content';

export default class HorizontalTimelineContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,
      showConfigurator: false,

      // timelineConfig
      minEventPadding: 20,
      maxEventPadding: 120,
      linePadding: 100,
      labelWidth: 100,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesBackground: '#f8f8f8',
      stylesForeground: '#7b9d6f',
      stylesOutline: '#dfdfdf',
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: true,
      isOpenBeginning: true,
    };

    this.data = TimeInfo.map((game, index) => {
      return ({
        date: game.date,
        component: (
          <div className='container' key={index}>
            <h1>{ `The Elder Scrolls ${index + 1}:`}</h1>
            <h2>{ game.subtitle }</h2>
            <hr />
            <p>{ game.content}</p>
            <hr />
          </div>
        )
      });
    });
  }

//   static propTypes = {
//     content: PropTypes.arrayOf(PropTypes.object).isRequired
//   }

  componentWillMount() {
    this.dates = this.data.map((entry) => entry.date);

    
  }

  componentWillReceiveProps(nextProps) {
    this.dates = nextProps.data.map((entry) => entry.date);
  }

  render() {
    const state = this.state;

    const views = this.data.map((entry, index) => {
      return (
        <div className='container' key={index}>
          { entry.component }
        </div>
      );
    });

    let configurator = (<div></div>);
    if (this.state.showConfigurator) {
      configurator = (
        <HorizontalTimelineConfigurator
          setConfig={(key, value) => {
            this.setState({ [key]: value });
          }}
          {...this.state}
        />
      );
    }

    return (
      <div>
        <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            fillingMotion={{ stiffness: state.fillingMotionStiffness, damping: state.fillingMotionDamping }}
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}

            isKeyboardEnabled={state.isKeyboardEnabled}
            isTouchEnabled={state.isTouchEnabled}
            labelWidth={state.labelWidth}
            linePadding={state.linePadding}
            maxEventPadding={state.maxEventPadding}
            minEventPadding={state.minEventPadding}
            slidingMotion={{ stiffness: state.slidingMotionStiffness, damping: state.slidingMotionDamping }}
            styles={{
              background: state.stylesBackground,
              foreground: state.stylesForeground,
              outline: state.stylesOutline
            }}
            values={ this.dates }
            isOpenEnding={state.isOpenEnding}
            isOpenBeginning={state.isOpenBeginning}
          />
        </div>
        <div className='text-center'>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={(value, previous) => {
              this.setState({ value: value, previous: previous });
            }}
            resistance>
            {views}
          </SwipeableViews>
        </div>
        <div className='checkbox text-center' >
          <label>
            <input
              onChange={() => {
                this.setState({ showConfigurator: !this.state.showConfigurator });
              }}
              type='checkbox'
            />
            Configure the Timeline
          </label>
        </div>
        { configurator }
      </div>
    );
  }
}