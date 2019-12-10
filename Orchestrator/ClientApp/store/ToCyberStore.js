import { clone } from "@Utils";
import ToCyberService from "@Services/ToCyberService";
import { wait } from "domain-wait";

const actions = {
    FailureResponse: "EXECUTOR_FAILURE_RESPONSE",
    EnqueueRequest: "ENQUEUE_REQUEST",
    EnqueueResponse: "ENQUEUE_RESPONSE",
    BrowseRequest: "BROWSE_REQUEST",
    BrowseResponse: "BROWSE_RESPONSE"
};

export const actionCreators = {
    addRequest: (models) => async (dispatch, getState) => {
        await wait(async (transformUrl) => {
            // Wait for server prerendering.
            dispatch({ type: actions.EnqueueRequest });

            let result = await ToCyberService.add(models);

            if (!result.hasErrors) {
                dispatch({ type: actions.EnqueueResponse, payload: result.value });
            } else {
                dispatch({ type: actions.FailureResponse });
            }
        });
    },
    browseRequest: (models) => async (dispatch, getState) => {
        await wait(async (transformUrl) => {
            // Wait for server prerendering.
            dispatch({ type: actions.BrowseRequest });

            let result = await ToCyberService.browse();

            if (!result.hasErrors) {
                dispatch({ type: actions.BrowseResponse, payload: result.value });
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
        case actions.EnqueueRequest:
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case actions.EnqueueResponse:
            indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators, queue: action.payload };
        case actions.BrowseRequest:
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case actions.BrowseResponse:
            indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators, queue: action.payload };
        default:
            return currentState || initialState;
    }
};