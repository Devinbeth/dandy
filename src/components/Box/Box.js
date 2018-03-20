import React, { Component } from 'react';
import './Box.css';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

export default function Box(props) {
    return (
        <div className='Box' onClick={(e) => e.stopPropagation()}>
            <Paper
                zDepth={5}
                style={{
                    textAlign: 'center',
                    position: 'fixed',
                    top: '15%',
                    bottom: '5%',
                    left: '20%',
                    right: '20%',
                    zIndex: 5,
                    overflow: 'scroll',
                }}
            >
                <div className='paper_header'>
                    <AppBar
                        title='ALIGNMENT'
                        showMenuIconButton={false}
                        iconElementRight={<IconButton><Close /></IconButton>}
                        onRightIconButtonClick={props.toggle}
                    />
                </div>
                <div className='paper_body'>
                    {props.children}
                </div>
            </Paper>
        </div>
    )
}