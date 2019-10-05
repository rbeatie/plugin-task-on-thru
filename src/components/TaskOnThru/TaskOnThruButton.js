import React from 'react';
import NoInterruptStore, { ACTIONS } from './/NoInterruptStore';
import { NoInterruptGrey, NoInterruptRed } from './Icons/NoInturrpt.Icons';
import { updateWorker } from '../../Utilities/WorkerHelpers';
import { connect } from 'react-redux';
import { withTheme, Icon } from '@twilio/flex-ui';
import {css} from 'emotion';

export class TaskOnThruButton extends React.Component {

  state = {
    showTooltip: false,
    active: false,
    storeUnsub: void 0
  };

  constructor(props) {
    super(props);
    this.setListeners();
    this.storeListener = this.storeListener.bind(this);
    this.errorHandler = this.errorHandler.bind(this)
  }

  componentDidMount() {
    this.setState({
      storeUnsub: NoInterruptStore.subscribe(this.storeListener)
    });
  }

  componentWillUnmount() {
    this.state.storeUnsub();
  }

  storeListener() {
    const nextState = NoInterruptStore.getState();

    if (this.state.active !== nextState.isAvailableForCalls) {
      const {manager} = this.props;
      const nextProps = {
        activity: {
          available: nextState.isAvailableForCalls
        }
      };
      const workerUpdateOptions = {
        nextProps: nextProps,
        workspaceSid: manager.workerClient.workspaceSid,
        workerSid: manager.workerClient.sid,
        updateWorkerUrl: 'https://ginger-binturong-8016.twil.io/update-worker-props',
      };

      /**
       * Working here to get a clean response from backend for Worker update
       */
      manager.workerClient.on('ready', (worker) => {
        worker.update({
          activity: {
            available: false
          }
        }).then(res => {
          console.log('Updated worker yea!', res);
        }).catch(err => console.log('update failed', err));
      });
      updateWorker(manager.user.token, workerUpdateOptions)
        .then((responseData) => {
          console.log('response', responseData);
          this.setState({
            available: nextState.isAvailableForCalls
          });
        })
        .catch(this.errorHandler);
     }
  }

  handleAfterWorkerUpdated(worker) {
    console.log('Update completed', worker);
      this.setState({

      });
    }

  errorHandler(err) {
    console.error('interrupt switch error: ', err)
  }

  setListeners() {
    const { manager } = this.props;
    manager
      .workerClient
      .on(
      'ready',
      (worker) => {
        worker.on(
          'reservationCreated',
          (reservationInstance ) => {
            const { task } = reservationInstance;
            if (task.type !== 'call') {
              return;
            }
            reservationInstance.on('rejected', this.yesInterrupt);
            reservationInstance.on('rescind`', this.yesInterrupt);
            reservationInstance.on('canceled', this.yesInterrupt);
            reservationInstance.on('accepted', this.noInterrupt);
          }
        );
      }
    );
  }

  yesInterrupt() {
    NoInterruptStore.dispatch(ACTIONS.ENABLE_INTERRUPT)
  }

  noInterrupt() {
    NoInterruptStore.dispatch(ACTIONS.DISABLE_INTERRUPT)
  }

  interruptSwitchOnClickHandler() {
    this.state.active
      ? this.noInterrupt()
      : this.yesInterrupt();
  }

  render() {
    return (
      <div
        className={css`
          max-width: 2em;
          max-height: 2em;
        `}
        onClick={() => {
          console.log('clicked', this.state.active);
          this.interruptSwitchOnClickHandler()
        }}
      >
        {
          this.state.active
            ? <NoInterruptRed/>
            : <NoInterruptGrey/>
        }
        <lacbel>No Interrupt</lacbel>
      </div>
    );
  }
}

const  mapStateProps = (state, ownProps) => ({
  tasks: state.worker.tasks,
});

export default withTheme(connect(mapStateProps)(TaskOnThruButton))