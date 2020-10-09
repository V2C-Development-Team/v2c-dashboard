import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    gameFrame: {
        width: '100%',
        height: '90%',
        border: '1px solid #ccc',
        borderRadius: '10px',
    },
};

const FrameDialog = (props) => {
    return (
        <div>
            <Dialog
                open={props.isFrameOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => props.setIsFrameOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullScreen
                maxWidth="lg"
                disableBackdropClick
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {'Gaming Station'}
                </DialogTitle>
                <DialogContent>
                    <iframe
                        src="https://comphonia.com/playground/demos/v2c-gaming-poc/web-pages/index.html"
                        title="boxy"
                        style={styles.gameFrame}
                    ></iframe>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => props.setIsFrameOpen(false)}
                        color="secondary"
                        variant="contained"
                        size="large"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FrameDialog;
