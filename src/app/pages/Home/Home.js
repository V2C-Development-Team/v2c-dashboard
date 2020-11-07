/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PinnedCard from '../../components/Cards/PinnedCard';
import ToolBar from '../../components/ToolBar/ToolBar';
import FrameDialog from '../../components/FrameDialog/FrameDialog';
import AddConnectionDialog from '../../AddConnectionDialog/AddConnectionDialog';

const tempPins = [
    {
        id: 0,
        src: 'http://localhost:5000',
        type: 'Game',
        title: 'gaming',
    },
];

const Home = (props) => {
    const [isFrameOpen, setIsFrameOpen] = React.useState(false);
    const [frameSrc, setFrameSrc] = React.useState('');
    const [frameTitle, SetFrameTitle] = React.useState('');
    const [isConnOpen, setIsConnOpen] = React.useState(false);
    const [pins, setPins] = React.useState(tempPins);
    const [pinsComponent, setPinsComponent] = React.useState([]);
    const MAX_PINS = 3;

    const handleOnConnect = (id, src, title) => {
        setIsFrameOpen((f) => !f);
        setFrameSrc(src);
        SetFrameTitle(title);
    };
    const handleOnDelete = (id) => {
        if (window.confirm('Remove pinned connection?')) {
            const tempPins = [...pins].filter((p) => p.id !== id);
            setPins(tempPins);
        }
    };
    const handleAddConnection = ({ title, type, url }) => {
        setIsConnOpen(false);
        const tempPins = [
            ...pins,
            {
                title,
                type,
                src: url,
                id: pins.length > 0 ? pins[pins.length - 1].id + 1 : 0,
            },
        ];
        setPins(tempPins);
    };

    useEffect(() => {
        const tempPinsComponent = [];
        for (let i = 0; i < MAX_PINS; i++) {
            if (pins[i]) {
                tempPinsComponent.push(
                    <Grid item xs={12} md={3} key={i}>
                        <PinnedCard
                            onConnect={() =>
                                handleOnConnect(i, pins[i].src, pins[i].title)
                            }
                            onDelete={() => handleOnDelete(i)}
                            title={pins[i].title}
                            type={pins[i].type}
                        />
                    </Grid>
                );
                continue;
            }
            tempPinsComponent.push(
                <Grid item xs={12} md={3} key={i}>
                    <div onClick={() => setIsConnOpen(true)}>
                        <PinnedCard empty />
                    </div>
                </Grid>
            );
        }
        setPinsComponent(tempPinsComponent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pins]);

    return (
        <Fragment>
            <ToolBar crumbs={['Home']} />
            <FrameDialog
                isFrameOpen={isFrameOpen}
                setIsFrameOpen={setIsFrameOpen}
                src={frameSrc}
                title={frameTitle}
            />
            <AddConnectionDialog
                isConnOpen={isConnOpen}
                setIsConnOpen={setIsConnOpen}
                addConnection={handleAddConnection}
            />
            <Typography variant="h5">Pinned Connections</Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                {pinsComponent}
            </Grid>
        </Fragment>
    );
};

export default Home;
