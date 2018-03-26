import React, { Component } from 'react';
import './Donate.css';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import TextField from 'material-ui/TextField';

export default class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0
        }
        this.onToken = this.onToken.bind(this);
    }

    onToken(token) {
        console.log('token', token);
        token.card = void 0;
        const { amount } = this.state
        axios.post('/api/payment', { token, amount })
            .then(charge => console.log('charge response', charge.data));
    }

    render() {
        return (
            <div className='Donate'>
                <div className='amount'>
                    <TextField
                        id='text-field-controlled'
                        value={this.state.amount}
                        onChange={(e) => this.setState({ amount: e.target.value })}
                        floatingLabelText='Amount'
                        type='number'
                        style={{ width: '50%' }}
                    />
                </div>
                <div className='pay' onClick={() => this.props.switch()}>
                        <StripeCheckout
                            token={this.onToken}
                            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                            amount={this.state.amount * 100}
                        />
                </div>
            </div>
        );
    }
}
