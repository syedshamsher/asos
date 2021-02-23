import React from "react"

function useMergeState(initState) {
    const [state, setState] = React.useState(initState)

    const updateState = (partialState) => {
        setState({ ...state, ...partialState })
    }

    return [state, updateState]
}

export { useMergeState }
