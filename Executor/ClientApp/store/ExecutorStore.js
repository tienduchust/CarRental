import {
    clone
} from "@Utils";
import ExecutorService from "@Services/ExecutorService";
import {
    wait
} from "domain-wait";

const actions = {
    FailureResponse: "PERSON_FAILURE_RESPONSE",
    PeekUpRequest: "PEEK_UP_REQUEST",
    PeekUpResponse: "PEEK_UP_RESPONSE",
    FinishUpRequest: "FINISH_UP_REQUEST",
    FinishUpResponse: "FINISH_UP_RESPONSE"
};

export const actionCreators = {
    peekUpRequest: () => async (dispatch, getState) => {
        dispatch({
            type: actions.PeekUpRequest
        });

        let result = await ExecutorService.peekUp();
        if (!result.hasErrors) {
            result.value.data.json = JSON.parse(result.value.data.json);
            dispatch({
                type: actions.PeekUpResponse,
                payload: result.value
            });
        } else {
            dispatch({
                type: actions.FailureResponse
            });
        }
    },
    finishUpRequest: (model) => async (dispatch, getState) => {
        dispatch({
            type: actions.FinishUpRequest
        });

        let result = await ExecutorService.finishUp(model);
        if (!result.hasErrors) {
            result.value.data.json = JSON.parse(result.value.data.json);
            dispatch({
                type: actions.FinishUpResponse,
                payload: result.value
            });
        } else {
            dispatch({
                type: actions.FailureResponse
            });
        }
    }
};

const initialState = {
    people: [],
    indicators: {
        operationLoading: false
    }
};

export const reducer = (currentState, incomingAction) => {

    const action = incomingAction;

    let cloneIndicators = () => clone(currentState.indicators);
    let indicators = {};
    switch (action.type) {
        case actions.PeekUpRequest:
            indicators = cloneIndicators();
            indicators.operationLoading = true;
            return {
                ...currentState, indicators
            };
        case actions.PeekUpResponse:
            indicators = cloneIndicators();
            indicators.operationLoading = false;
            return {
                ...currentState, indicators, peekUpItem: action.payload
            };
        default:
            return currentState || initialState;
    }
};