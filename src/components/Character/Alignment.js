import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Close from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';

export default class Alignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.alignment,
            toggle: false
        }
    }
    componentDidMount() {
        this.setState({ value: this.props.alignment });
    }
    componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.alignment });
    }
    render() {
        const style = {
            background: 'white',
            textAlign: 'center',
            position: 'fixed',
            top: '10%',
            bottom: '5%',
            left: '10%',
            right: '10%',
            visibility: `${this.state.toggle ? 'visible' : 'hidden'}`,
            zIndex: 5,
            overflow: 'scroll',
            padding: '2% 7%'
        };
        return (
            <div className='Alignment' >
                <div className='class_menu'>
                    <SelectField
                        floatingLabelText='Alignment'
                        value={this.state.value}
                        onChange={(event, index, value) => this.props.updateAlignment(value)}
                        style={{ width: '220px', textAlign: 'left' }}
                    >
                        <MenuItem value={'Lawful Good (LG)'} primaryText='Lawful Good (LG)' />
                        <MenuItem value={'Neutral Good (NG)'} primaryText='Neutral Good (NG)' />
                        <MenuItem value={'Chaotic Good (CG)'} primaryText='Chaotic Good (CG)' />
                        <MenuItem value={'Lawful Neutral (LN)'} primaryText='Lawful Neutral (LN)' />
                        <MenuItem value={'Neutral (N)'} primaryText='Neutral (N)' />
                        <MenuItem value={'Chaotic Neutral (CN)'} primaryText='Chaotic Neutral (CN)' />
                        <MenuItem value={'Lawful Evil (LE)'} primaryText='Lawful Evil (LE)' />
                        <MenuItem value={'Neutral Evil (NE)'} primaryText='Neutral Evil (NE)' />
                        <MenuItem value={'Chaotic Evil (CE)'} primaryText='Chaotic Evil (CE)' />
                    </SelectField>
                    <IconButton tooltip='Alignment Details' onClick={() => this.setState({ toggle: !this.state.toggle })}>
                        <ActionInfo />
                    </IconButton>
                </div>
                <Paper style={style} zDepth={5} >
                    <IconButton tooltip='Close' onClick={() => this.setState({ toggle: !this.state.toggle })} style={{ position: 'fixed', top: '10%', right: '10%' }}>
                        <Close />
                    </IconButton>
                    <h2>Alignment</h2>
                    <hr/>
                    <h4>Lawful Good (LG)</h4>
                    <p>Lawful good creatures can be counted on to do the right thing as expected by society.</p>
                    <p>Gold dragons, paladins, and most dwarves are lawful good.</p>
                    <hr/>
                    <h4>Neutral Good (NG)</h4>
                    <p>Neutral good folk do the best they can to help others according to their needs.</p>
                    <p>Many celestials, some cloud giants, and most gnomes are neutral good.</p>
                    <hr/>
                    <h4>Chaotic Good (CG)</h4>
                    <p>Chaotic good creatures act as their conscience directs, with little regard for what others expect.</p>
                    <p>Copper dragons, many elves, and unicorns are chaotic good.</p>
                    <hr/>
                    <h4>Lawful Neutral</h4>
                    <p>Lawful neutral individuals act in accordance with law, tradition, or personal codes.</p>
                    <p>Many monks and some wizards are lawful neutral.</p>
                    <hr/>
                    <h4>Neutral (N)</h4>
                    <p>Neutral is the alignment of those who prefer to steer clear of moral questions and don't take sides, doing what seems best at the time.</p>
                    <p>Lizardfolk, most druids, and many humans are neutral.</p>
                    <hr/>
                    <h4>Chaotic Neutral (CN)</h4>
                    <p>Chaotic neutral creatures follow their whims, holding their personal freedom above all else.</p>
                    <p>Many barbarians and rogues, and some bards, are chaotic neutral.</p>
                    <hr/>
                    <h4>Lawful Evil (LE)</h4>
                    <p>Lawful evil creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order.</p>
                    <p>Devils, blue dragons, and hobgoblins are lawful evil.</p>
                    <hr/>
                    <h4>Neutral Evil (NE)</h4>
                    <p>Neutral evil is the alignment of those who do whatever they can get away with, without compassion or qualms.</p>
                    <p>Many drow, some cloud giants, and goblins are neutral evil.</p>
                    <hr/>
                    <h4>Chaotic Evil (CE)</h4>
                    <p>Chaotic evil creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust.</p>
                    <p>Demons, red dragons, and orcs are chaotic evil.</p>
                </Paper>
            </div>
        );
    }
}