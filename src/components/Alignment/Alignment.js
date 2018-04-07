import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAlignment, updateCharacter } from '../../ducks/reducer.js';
import './Alignment.css';
import Box from '../Box/Box.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';

class Alignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }
    componentDidMount() {
        this.props.getAlignment();
    }

    render() {
        let alignmentList = this.props.alignment.map((item, index) => {
            return (
                <div key={item.id + item.alignment + index}>
                    <h4>{item.alignment}</h4>
                    <p>{item.info}</p>
                    <p>{item.example}</p>
                    <br />
                    <Divider />
                </div>
            );
        });
        return (
            <div className='Alignment' >
                <SelectField
                    floatingLabelText='Alignment'
                    value={this.props.character.alignment}
                    onChange={(event, index, value) => this.props.updateCharacter({ alignment: value })}
                    style={{ width: '170px', textAlign: 'left' }}
                >
                    <MenuItem value={'Lawful Good (LG)'} primaryText='Lawful Good' />
                    <MenuItem value={'Neutral Good (NG)'} primaryText='Neutral Good' />
                    <MenuItem value={'Chaotic Good (CG)'} primaryText='Chaotic Good' />
                    <MenuItem value={'Lawful Neutral (LN)'} primaryText='Lawful Neutral' />
                    <MenuItem value={'Neutral (N)'} primaryText='Neutral' />
                    <MenuItem value={'Chaotic Neutral (CN)'} primaryText='Chaotic Neutral' />
                    <MenuItem value={'Lawful Evil (LE)'} primaryText='Lawful Evil' />
                    <MenuItem value={'Neutral Evil (NE)'} primaryText='Neutral Evil' />
                    <MenuItem value={'Chaotic Evil (CE)'} primaryText='Chaotic Evil' />
                </SelectField>
                <IconButton tooltip='Alignment Details' onClick={() => this.setState({ toggle: !this.state.toggle })}>
                    <Info />
                </IconButton>
                <Box
                    toggle={this.state.toggle}
                    switch={() => this.setState({ toggle: !this.state.toggle })}
                    top={'15%'}
                    bottom={'5%'}
                    right={'20%'}
                    left={'20%'}
                    title={'ALIGNMENT'}
                >
                    <div className='alignment_list'>
                        {alignmentList}
                    </div>
                </Box>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        alignment: state.alignment
    };
}

export default connect(mapStateToProps, { getAlignment, updateCharacter })(Alignment);
