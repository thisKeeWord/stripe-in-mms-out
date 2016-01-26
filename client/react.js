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
    return { toggle: false };
  },

  post: function(data) {
    return $.ajax({
      type: 'POST',
      url: '/stripe',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
  },

  stripeForm: function() {


  },

  // action on submission
  handle: function(e) {
    e.preventDefault();
    var data = {
      pictureAmount: React.findDOMNode(this.refs.pictureAmount).value,
      topic: React.findDOMNode(this.refs.topic).value,
      phone: React.findDOMNode(this.refs.phone).value
    };
    this.post(data).done(function(res) {
      // this.props.update(res);
    })
    // .bind(this);
  },



  // rendering form
  render: function() {

    return (
      <form id="stripe" onSubmit={this.handle}>
        send <input type="number" name="pictureAmount" ref="pictureAmount" placeholder="1"
        min="1" max="5" />&nbsp; imgs about:<br/>
        <input type="text" name="topic" placeholder="GIF Topic" ref="topic" /><br/>
        to my friend at:<br /><br />
        <input type="tel" name="phone" autofocus="autofocus" pattern="^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$" placeholder="(888) 888 - 8888" ref="phone" /><br/>
        <input type="submit" />

      </form>

    )
  }
})

ReactDOM.render(<Giphy />, document.getElementById('container'));
