import React from 'react';
import './Box.css';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

export default function Box(props) {
    return (
        <div className='Box'>
            {props.toggle ?
                <div className='shadow' onClick={props.switch}>
                    <Paper
                        onClick={(e) => e.stopPropagation()}
                        zDepth={5}
                        style={{
                            textAlign: 'center',
                            overflow: 'scroll',
                            position: 'absolute',
                            top: props.top,
                            bottom: props.bottom,
                            left: props.left,
                            right: props.right,
                            borderRadius: '7px'
                        }}
                    >
                        <div
                            className='paper_header'
                            style={{ position: 'fixed', top: props.top, left: props.left, right: props.right, zIndex: 50 }}
                        >
                            <AppBar
                                title={props.title}
                                showMenuIconButton={false}
                                iconElementRight={<IconButton><Close /></IconButton>}
                                onRightIconButtonClick={props.switch}
                                zDepth={2}
                                style={{ background: 'linear-gradient(to right, #ff512f, #f09819)' }}
                            />
                        </div>
                        <div className='paper_body'>
                            {props.children}
                        </div>
                    </Paper>
                </div>
                : null}
        </div>
    )
}