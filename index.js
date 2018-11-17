const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/postal-form'))
  
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('pages/postal-form'));

app.get('/getRate', function(req, res) {
  let weight = req.query.weight;
  let type = req.query.type;
  let amount = req.query.amount;
  let cost = 0;
  let message = '';

  console.log('' + weight);
  console.log('' + type);
  console.log('' + amount);

  if (type && weight) {
    weight = Math.ceil(weight);
    switch(type) {
      case 'Letters (Stamped)':
        cost = getLettersStampedCost(weight, amount);
        message = getMessage(type, amount, cost);
      break;

      case 'Letters (Metered)':
        cost = getLettersMeteredCost(weight, amount);
        message = getMessage(type, amount, cost);
      break;

      case 'Large Envelopes (Flats)':
        cost = getLargeEnvelopesCost(weight, amount);
        message = getMessage(type, amount, cost);
      break;

      case 'First-Class Package Service—Retail':
        cost = getFirstClassCost(weight, amount);
        message = getMessage(type, amount, cost);
      break;

      default:
        break;
    }
  }
  // res.render('pages/postal-result', {
  //   message: message
  // });
  res.send(message);
  res.end();
});

function getMessage(type, amount, cost) {
  let message = '';
  if (cost != undefined) {
    message = `The total cost for ${amount} ${type} is $${(amount * cost).toFixed(2)}`;
  } else {
    message = `There was an error processing your result, check to make sure all values were entered`;
  }
  return message;
}

function getLettersStampedCost(weight) {
  let values = new Map();
  values.set(1, .5);
  values.set(2, .71);
  values.set(3, .92);
  values.set(3.5, 1.13);

  let cost = values.get(weight);
  return cost;
}

function getLettersMeteredCost(weight, amount) {
  let values = new Map();
  values.set(1, .47);
  values.set(2, .68);
  values.set(3, .89);
  values.set(3.5, 1.10);

  let cost = values.get(weight, amount);
  return cost;
}

function getLargeEnvelopesCost(weight, amount) {
  let values = new Map();
  values.set(1, 1.0);
  values.set(2, 1.21);
  values.set(3, 1.42);
  values.set(4, 1.63);
  values.set(5, 1.84);
  values.set(6, 2.05);
  values.set(7, 2.26);
  values.set(8, 2.47);
  values.set(9, 2.68);
  values.set(10, 2.89);
  values.set(11, 3.1);
  values.set(12, 3.31);
  values.set(13, 3.52);

  let cost = values.get(weight);
  return cost;
}

function getFirstClassCost(weight, amount) {
  let values = new Map();
  values.set(1, 3.5);
  values.set(2, 3.5);
  values.set(3, 3.5);
  values.set(4, 3.5);
  values.set(5, 3.75);
  values.set(6, 3.75);
  values.set(7, 3.75);
  values.set(8, 3.75);
  values.set(9, 4.1);
  values.set(10, 4.45);
  values.set(11, 4.80);
  values.set(12, 5.15);
  values.set(13, 5.5);

  let cost = values.get(weight);
  return cost;
}

app.listen(PORT);