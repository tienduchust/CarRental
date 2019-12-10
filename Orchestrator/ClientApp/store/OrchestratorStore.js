import { clone } from "@Utils";
import OrchestratorService from "@Services/OrchestratorService";
import { wait } from "domain-wait";

const actions = {
    FailureResponse: "ORCHESTRATOR_FAILURE_RESPONSE",
    EnqueueListRequest: "ENQUEUE_LIST_REQUEST",
    EnqueueListResponse: "ENQUEUE_LIST_RESPONSE",
    BrowseQueueRequest: "BROWSE_QUEUE_REQUEST",
    BrowseQueueResponse: "BROWSE_QUEUE_RESPONSE"
};

export const actionCreators = {
    enqueueListRequest: (models) => async (dispatch, getState) => {
        await wait(async (transformUrl) => {
            // Wait for server prerendering.
            dispatch({ type: actions.EnqueueListRequest });

            let result = await OrchestratorService.EnqueueList(models);

            if (!result.hasErrors) {
                dispatch({ type: actions.EnqueueListResponse, payload: result.value });
            } else {
                dispatch({ type: actions.FailureResponse });
            }
        });
    },
    browseQueueRequest: () => async (dispatch, getState) => {
        await wait(async (transformUrl) => {
            // Wait for server prerendering.
            dispatch({ type: actions.BrowseQueueRequest });

            let result = await OrchestratorService.browseQueue();

            if (!result.hasErrors) {
                dispatch({ type: actions.BrowseQueueResponse, payload: result.value });
            } else {
                dispatch({ type: actions.FailureResponse });
            }
        });
    }
};

const initialState = {
    queue: [],
    indicators: {
        operationLoading: false
    }
};

export const reducer = (currentState, incomingAction) => {
    const action = incomingAction;

    let cloneIndicators = () => clone(currentState.indicators);
    let indicators = {};

    switch (action.type) {
        case actions.FailureResponse:
            indicators.operationLoading = false;
            return { ...currentState, indicators };
        case actions.EnqueueListRequest:
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case actions.EnqueueListResponse:
            indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators, queue: action.payload };
        case actions.BrowseQueueRequest:
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case actions.BrowseQueueResponse:
            indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators, queue: action.payload };
        default:
            return currentState || initialState;
    }
};