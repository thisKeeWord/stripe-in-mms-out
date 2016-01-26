var React = require('react');
var ReactDOM = require('react-dom');
var StripeCheckout = require('react-stripe-checkout');

// parent component
var Giphy = React.createClass({
  render: function() {
    return (
      <div className="row" style={{"marginTop": "15%", "textAlign": "center"}}>
        <Scraper />
      </div>
    )
  }
});

// child component with scaper form
var Scraper = React.createClass({
  getInitialState: function() {
    return { toggle: false, formResult: false };
  },

  postTwilio: function(data) {
    return $.ajax({
      type: 'POST',
      url: '/stripe',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
  },

  postStripe: function(data) {
    return $.ajax({
      type: 'POST',
      url: '/stripe',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
  },

  // action on submission
  handle: function(e) {
    e.preventDefault();
    var twilioData = {
      pictureAmount: React.findDOMNode(this.refs.pictureAmount).value,
      topic: React.findDOMNode(this.refs.topic).value,
      phone: React.findDOMNode(this.refs.phone).value
    };
    this.setState({ toggle: true })
    if (this.state.formResult === true) {
      this.postTwilio(twilioData).done(function(res) {
      })
    }
    // .bind(this);
  },

  shouldComponentUpdate: function() {
    return this.state.toggle === true;
  },

  trigger: function(e) {
    var that = this;
    e.preventDefault();
    var stripeData = {
      dig: React.findDOMNode(this.refs.dig).value
    };
    this.postStripe(stripeData).done(function() {
      that.setState({ formResult: true })
    })
  },

  // rendering form
  render: function() {
    if (this.state.toggle === true) {
      return (
        <form id="row" onSubmit={ this.trigger }>
          <input size="20" type="number" name="dig" ref="dig" placeholder="dig"/>
          <input size="4" name="cvc" ref="cvc" placeholder="cvc" />
          <input size="2" name="exp_month" ref="exp_month" placeholder="month" />
          <input size="4" name="exp_year" ref="exp_year" placeholder="year" />
          <input type="submit" />
        </form>
      )
    }
    if (this.state.toggle === false) {
      return (
        <form id="row" onClick={this.handle}>
          send <input type="number" name="pictureAmount" ref="pictureAmount" placeholder="1"
          min="1" max="5" />&nbsp; imgs about:<br/>
          <input type="text" name="topic" placeholder="GIF Topic" ref="topic" /><br/>
          to my friend at:<br /><br />
          <input type="tel" name="phone" autofocus="autofocus" pattern="^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$" placeholder="(888) 888 - 8888" ref="phone" /><br/>
          <input type="submit" />
        </form>
      )
    }
  }
})

ReactDOM.render(<Giphy />, document.getElementById('container'));
