import React, { Component } from 'react';
import Box from '../Box/Box.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info';

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
        return (
            <div className='Alignment' >
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
                    <div>
                        <p>A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. Alignment is a combination of two factors: one identifies morality (good, evil, or neutral), and the other describes attitudes toward society and order (lawful, chaotic, or neutral). Thus, nine distinct alignments define the possible combinations.</p>
                        <p>These brief summaries of the nine alignments describe the typical behavior of a creature with that alignment. Individuals might vary significantly from that typical behavior, and few people are perfectly and consistently faithful to the precepts of their alignment.</p>
                        <hr/>
                        <h4>Lawful Good (LG)</h4>
                        <p>Lawful good creatures can be counted on to do the right thing as expected by society.</p>
                        <p>Gold dragons, paladins, and most dwarves are lawful good.</p>
                        <hr />
                        <h4>Neutral Good (NG)</h4>
                        <p>Neutral good folk do the best they can to help others according to their needs.</p>
                        <p>Many celestials, some cloud giants, and most gnomes are neutral good.</p>
                        <hr />
                        <h4>Chaotic Good (CG)</h4>
                        <p>Chaotic good creatures act as their conscience directs, with little regard for what others expect.</p>
                        <p>Copper dragons, many elves, and unicorns are chaotic good.</p>
                        <hr />
                        <h4>Lawful Neutral</h4>
                        <p>Lawful neutral individuals act in accordance with law, tradition, or personal codes.</p>
                        <p>Many monks and some wizards are lawful neutral.</p>
                        <hr />
                        <h4>Neutral (N)</h4>
                        <p>Neutral is the alignment of those who prefer to steer clear of moral questions and don't take sides, doing what seems best at the time.</p>
                        <p>Lizardfolk, most druids, and many humans are neutral.</p>
                        <hr />
                        <h4>Chaotic Neutral (CN)</h4>
                        <p>Chaotic neutral creatures follow their whims, holding their personal freedom above all else.</p>
                        <p>Many barbarians and rogues, and some bards, are chaotic neutral.</p>
                        <hr />
                        <h4>Lawful Evil (LE)</h4>
                        <p>Lawful evil creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order.</p>
                        <p>Devils, blue dragons, and hobgoblins are lawful evil.</p>
                        <hr />
                        <h4>Neutral Evil (NE)</h4>
                        <p>Neutral evil is the alignment of those who do whatever they can get away with, without compassion or qualms.</p>
                        <p>Many drow, some cloud giants, and goblins are neutral evil.</p>
                        <hr />
                        <h4>Chaotic Evil (CE)</h4>
                        <p>Chaotic evil creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust.</p>
                        <p>Demons, red dragons, and orcs are chaotic evil.</p>
                        <hr/>
                        <h4>Alignment in the Multiverse</h4>
                        <p>For many thinking creatures, alignment is a moral choice. Humans, dwarves, elves, and other humanoid races can choose whether to follow the paths of good or evil, law or chaos. According to myth, the good-aligned gods who created these races gave them free will to choose their moral paths, knowing that good without free will is slavery.</p>
                        <p>The evil deities who created other races, though, made those races to serve them. Those races have strong inborn tendencies that match the nature of their gods. Most orcs share the violent, savage nature of the orc gods, and are thus inclined toward evil. Even if an orc chooses a good alignment, it struggles against its innate tendencies for its entire life. (Even half-orcs feel the lingering pull of the orc god’s influence.)</p>
                        <p>Alignment is an essential part of the nature of celestials and fiends. A devil does not choose to be lawful evil, and it doesn’t tend toward lawful evil, but rather it is lawful evil in its essence. If it somehow ceased to be lawful evil, it would cease to be a devil.</p>
                        <p>Most creatures that lack the capacity for rational thought do not have alignments—they are unaligned. Such a creature is incapable of making a moral or ethical choice and acts according to its bestial nature. Sharks are savage predators, for example, but they are not evil; they have no alignment.</p>
                    </div>
                </Box>
            </div >
        );
    }
}