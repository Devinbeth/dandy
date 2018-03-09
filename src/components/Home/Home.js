import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getCharacters } from '../../ducks/reducer.js';
import Header from '../Header/Header.js';
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {

    componentDidMount() {
        this.props.getCharacters();
    }

    render() {
        let characterCards = this.props.characters.map((e, i) => {
            return (
                <div key={i + '' + e.id}>
                    <Card>
                        <CardHeader
                            title={`Level: ${e.level}`}
                            subtitle={`Experience: ${e.experience_points}`}
                            avatar={e.image}
                        />
                        <CardTitle title={e.name} subtitle={`${e.race} ${e.class}`} />
                        <CardActions>
                            <Link to={`/character/${e.id}`}><RaisedButton label="View" primary={true} /></Link>
                            <RaisedButton label="Delete" secondary={true} />
                        </CardActions>
                    </Card>
                </div>
            );
        });
        return (
            <div className='Home'>
                <Header />
                {characterCards}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        characters: state.characters
    };
}

export default connect(mapStateToProps, { getUser, getCharacters })(Home);
