import React from 'react';
import { NoInterruptGrey, NoInterruptRed } from './Icons/NoInturrpt.Icons';
import { updateWorker } from '../../Utilities/WorkerHelpers';
import { connect } from 'react-redux';
import { withTheme, Icon } from '@twilio/flex-ui';
import {css} from 'emotion';
import {Actions} from "./../../states/Cust omTaskListState";
import store from "./../../states/CustomTaskListState";
import {logManager} from "@twilio/flex-ui/src/log";


/**
 * <TaskThru
 enabled={true}
 controlType="{'button' | 'hidden'}" // removed
 taskChannel="call"
 enableOn={'outbound' | 'inbound' | 'call' }
 disableOn={'afterCompleteTask' | 'afterWrapupTask'}
 offState={{
      activity: 'available'
    }}
 />
 */

// Each task will have an evaluation that checks for a bypass value that is === to the tasks uniqueChannelName
export class TaskOnThru extends React.Component {

  state = {
    showTooltip: false,
    enabled: true,
    storeUnsub: void 0,
    controlType: void 0,
    taskChannel: void 0,
    enableOn: void 0,
    disableOn: void 0,
    offState: void 0,
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

  toggleBypass() {

  }

  updateWorkerBypass() {
    const { manager } = this.props;
    manager.workerClient.updateAttt
  }
  errorHandler(err) {
    console.error('interrupt switch error: ', err)
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
          this.toggleBypass()
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
  showTooltip: state.false,
  enabled: true,
  storeUnsub: void 0,
  controlType: void 0,
  taskChannel: void 0,
  enableOn: void 0,
  disableOn: void 0,
  offState: void 0,
});

export default withTheme(connect(mapStateProps)(TaskOnThru))