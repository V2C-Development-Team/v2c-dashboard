import React, { Fragment, useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';

const base = `{
}
  `;

const useStyles = makeStyles((theme) => ({
    button: {
        marginBottom: theme.spacing(3),
    },
    bar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

const ActionsRaw = (props) => {
    const _classes = useStyles();
    const [error, setError] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [code, setCode] = useState(base);

    const handleSaveActions = () => {
        try {
            const actions = JSON.parse(code);
            props.updateActions(actions);
            setError('');
            setIsSaved(true);
            setIsSaveDisabled(true);
        } catch (error) {
            setError(error.message);
        }
    };
    const stripIds = ({ commands, macros }) => {
        commands.forEach((command) => {
            delete command.cid;
        });
        macros.forEach((macro) => {
            delete macro.cid;
        });
        return JSON.stringify({ commands, macros }, null, 2);
    };
    useEffect(() => {
        if (code === stripIds(props.data)) setIsSaveDisabled(true);
        else setIsSaveDisabled(false);
    }, [code, props.data]);

    useEffect(() => {
        setCode(stripIds(props.data));
    }, [props.data]);

    return (
        <Fragment>
            <div className={_classes.bar}>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={_classes.button}
                    startIcon={<GetAppIcon />}
                    onClick={() => {}}
                >
                    Export
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={_classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSaveActions}
                    disabled={isSaveDisabled}
                >
                    Save
                </Button>
            </div>
            {isSaved && (
                <Alert
                    severity="success"
                    style={{ marginBottom: 5 }}
                    onClose={() => setIsSaved(false)}
                >
                    File saved successfully
                </Alert>
            )}
            {error ? (
                <Alert severity="error" style={{ marginBottom: 5 }}>
                    {error}
                </Alert>
            ) : (
                <Alert severity="warning" style={{ marginBottom: 5 }}>
                    Making changes to this file could break your actions
                </Alert>
            )}
            <Paper variant="outlined">
                <Editor
                    value={code}
                    onValueChange={setCode}
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"consolas", monospace',
                    }}
                />
            </Paper>
        </Fragment>
    );
};

export default ActionsRaw;
