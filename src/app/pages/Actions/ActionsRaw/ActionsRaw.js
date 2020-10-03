import React, { Fragment, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
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
    const [code, setCode] = useState(
        JSON.stringify(props.data, null, 2) || base
    );
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
                    onClick={() => {}}
                    disabled
                >
                    Save
                </Button>
            </div>
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
