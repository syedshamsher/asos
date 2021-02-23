import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        background: '#DCDCDC',
        color: 'black',
        bottom: 10,
        left: 20,
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: 'white',
            backgroundColor: '#525050'
        }
    }
}))

export const Scroll = ({showBelow}) => {
    const [show, setShow] = React.useState( showBelow ? false : true);
    const classes = useStyles();

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        }
        else {
            if (show) setShow(false);
        }
    }

    React.useEffect(() => {
        if(showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    return (
        <div>
            {
                show &&
                <IconButton onClick={handleClick} className={classes.toTop} >
                    <ExpandLessIcon />
                </IconButton>
            }
            
        </div>
    )
}
