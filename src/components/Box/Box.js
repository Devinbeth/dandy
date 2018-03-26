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
                            zIndex: 5,
                            textAlign: 'center',
                            overflow: 'scroll',
                            position: 'fixed',
                            borderRadius: '5px',
                            top: props.top,
                            bottom: props.bottom,
                            left: props.left,
                            right: props.right,
                        }}
                    >
                        <div className='paper_header' style={{ position: 'fixed', top: props.top, left: props.left, right: props.right }}>
                            <AppBar
                                title={props.title}
                                showMenuIconButton={false}
                                iconElementRight={<IconButton><Close /></IconButton>}
                                onRightIconButtonClick={props.switch}
                                style={{ paddingLeft: '7%', zIndex: 27 }}
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