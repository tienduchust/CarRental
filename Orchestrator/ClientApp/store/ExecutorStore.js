import { clone } from "@Utils";
import OrchestratorService from "@Services/OrchestratorService";
import { wait } from "domain-wait";

const actions = {
    FailureResponse: "EXECUTOR_FAILURE_RESPONSE",
    BrowseOrchestratorsRequest: "BROWSE_ORCHESTRATORS_REQUEST",
    BrowseOrchestratorsResponse: "BROWSE_ORCHESTRATORS_RESPONSE",
    BrowseOrchestratorRequest: "BROWSE_ORCHESTRATOR_REQUEST",
    BrowseOrchestratorResponse: "BROWSE_ORCHESTRATOR_RESPONSE"
};

export const actionCreators = {
    searchRequest: (term) => async (dispatch, getState) => {
        await wait(async (transformUrl) => {
            // Wait for server prerendering.
            dispatch({ type: actions.SearchRequest });

            let result = await ExecutorService.search(term);

            if (!result.hasErrors) {
                dispatch({ type: actions.SearchResponse, payload: result.value });
            } else {
                dispatch({ type: actions.FailureResponse });
            }
        });
    }
};

const initialState = {
    executor: [],
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
        case actions.SearchRequest:
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case actions.SearchResponse:
            indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators, executor: action.payload };
        default:
            return currentState || initialState;
    }
};