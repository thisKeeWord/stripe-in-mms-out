var React = require('react');
var ReactDOM = require('react-dom');

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
  post: function(data) {
    return $.ajax({
      type: 'POST',
      url: '/',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
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
        // <noscript>You must <a href="http://www.enable-javascript.com" target="_blank">enable JavaScript</a> in your web browser in order to pay via Stripe.</noscript>
        // <script src="https://checkout.stripe.com/checkout.js" className="stripe-button" data-key="pk_test_VRhelXTRnpAfGDqQ29t0Qlz5" data-amount="100" data-name="5 SMS sent" data-description="THIS IS A DESCRIPTION YO" data-image="http://icons.iconarchive.com/icons/everaldo/crystal-clear/128/App-core-bomb-icon.png"
        // data-locale="auto"
        // data-panel-label=""
        // data-label="Drop the GIFs"
        // data-bitcoin="true" >
        // </script>
      </form>
    )
  }
})

ReactDOM.render(<Giphy />, document.getElementById('container'));
