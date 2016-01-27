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
    return {  data: {} };
  },

  post: function(data) {
    return $.ajax({
      type: 'POST',
      url: '/stripe',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
  },

  // action on submission
  handle: function(safeToken) {
    this.state.data.pictureAmount = React.findDOMNode(this.refs.pictureAmount).value,
    this.state.data.topic = React.findDOMNode(this.refs.topic).value,
    this.state.data.phone = React.findDOMNode(this.refs.phone).value
    this.state.data.dig = safeToken
    this.post(this.state.data).done(function(res) {
    })
  },

  onToken: function(token) {
    var safeToken = token;
    console.log(this.token)
    var that = this;
    $.ajax({
      type: 'POST',
      url: '/stripe',
      data: JSON.stringify(token),
      contentType: 'application/json'
    }).then(function(safeToken) {
      console.log(that)
      that.handle(safeToken);
    })
  },

  nothing: function(e) {
    e.preventDefault();
  },

  // rendering form
  render: function() {
    return (
      <form id="row" onSubmit={this.nothing}>
        send <input type="number" id="pictureAmount" name="pictureAmount" ref="pictureAmount" placeholder="1"
        min="1" max="5" />&nbsp; imgs about:<br/>
        <input type="text" name="topic" placeholder="GIF Topic" ref="topic" /><br/>
        to my friend at:<br /><br />
        <input type="tel" name="phone" autofocus="autofocus" pattern="^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$" placeholder="(888) 888 - 8888" ref="phone" /><br/>

        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_VRhelXTRnpAfGDqQ29t0Qlz5" image="http://icons.iconarchive.com/icons/everaldo/crystal-clear/128/App-core-bomb-icon.png" locale="auto" amount="1000" name="5 SMS sent" description="THIS IS A DESCRIPTION YO" />
      </form>
    )
  }
})

ReactDOM.render(<Giphy />, document.getElementById('container'));
