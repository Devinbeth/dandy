import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCharacters, setCharacter, removeCharacter, resetCharacter, getAllWeapons, getAllArmor, getAllSpells } from '../../ducks/reducer.js';
import './Home.css';
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import ranger from '../../assets/svg_icons/016-people-4.svg';
import druid from '../../assets/svg_icons/020-people.svg';
import paladin from '../../assets/svg_icons/025-knight-2.svg';
import fighter from '../../assets/svg_icons/015-people-5.svg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            id: 0
        };
    }

    componentDidMount() {
        this.props.getCharacters();
        this.props.getAllWeapons();
        this.props.getAllArmor();
        this.props.getAllSpells();
    }

    render() {
        let characterCards = this.props.characters.map((e, i) => {
            return (
                <div className='character_cards' key={i + '' + e.id}>
                    <Card>
                        <CardHeader
                            title={`Level: ${e.level}`}
                            subtitle={`XP: ${e.xp}`}
                            avatar={e.image === 'ranger' ? ranger : e.image === 'druid' ? druid : e.image === 'paladin' ? paladin : e.image === 'fighter' ? fighter : null}
                        />
                        <CardTitle title={e.name} subtitle={`${e.race} ${e.class}`} />
                        <CardActions>
                            <Link to={`/character/${e.id}`}><RaisedButton label="View" primary={true} 
                                  onClick={() => this.props.setCharacter(e)}
                            />
                            </Link>
                            <RaisedButton label="Delete" secondary={true} onClick={() => {
                                this.setState({
                                    open: true,
                                    name: e.name,
                                    id: e.id
                                });
                            }} />
                        </CardActions>
                    </Card>
                </div>
            );
        });
        return (
            <div className='Home'>
                <div className='characters'>
                    {characterCards}
                </div>
                <Link to='/character/0'><FloatingActionButton className='new' onClick={() => this.props.resetCharacter()} >
                    <Add />
                </FloatingActionButton></Link>
                <Dialog
                    title={`You're about to delete ${this.state.name}!`}
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={() => this.setState({ open: false })}
                        />,
                        <FlatButton
                            label="Delete"
                            secondary={true}
                            onClick={() => {
                                this.props.removeCharacter(this.state.id);
                                this.setState({
                                    open: false,
                                    name: '',
                                    id: 0
                                })
                            }}
                        />
                    ]}
                    modal={true}
                    open={this.state.open}
                >
                    Are you sure you want to delete this character? You cannot undo this action.
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        characters: state.characters
    };
}

export default connect(mapStateToProps, { getCharacters, setCharacter, removeCharacter, resetCharacter, getAllWeapons, getAllArmor, getAllSpells })(Home);
