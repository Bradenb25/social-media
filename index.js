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
app.get('/', (req, res) => res.render('pages/postal-form'));

app.get('/getRate', function(req, res) {
  let weight = req.query.weight;
  let type = req.query.type;
  let cost = 0;
  // res.write('' + Math.ceil(weight));
  if (type && weight) {
    weight = Math.ceil(weight);
    switch(type) {
      case 'Letters (Stamped)':
        cost = getLettersStamped(weight);
      break;

      case 'Letters (Metered)':
        cost = getLettersMetered(weight);
      break;

      case 'Large Envelopes (Flats)':
        cost = getLargeEnvelopes(weight);
      break;

      case 'First-Class Package Service—Retail':
        cost = getFirstClass(weight);
      break;

      default:
        break;
    }
  }
  res.write(cost);
  res.end();
});

function getLettersStamped(weight) {
  let values = new Map();
  values.set(1, .5);
  values.set(2, .71);
  values.set(3, .92);
  values.set(3.5, 1.13);

  let cost = values.get(weight);
  return (cost != undefined) ? 'Total cost is $' + cost : 'Too heavy for Letters (Stamped)';
}

function getLettersMetered(weight) {
  let values = new Map();
  values.set(1, .47);
  values.set(2, .68);
  values.set(3, .89);
  values.set(3.5, 1.10);

  let cost = values.get(weight);
  return (cost != undefined) ? 'Total cost is $' + cost : 'Too heavy for Letters (Metered)';
}

function getLargeEnvelopes(weight) {
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
  return (cost != undefined) ? 'Total cost is $' + cost : 'Too heavy for Large Envelopes';
}

function getFirstClass(weight) {
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
  values.set(13, 3.52);

  let cost = values.get(weight);
  return (cost != undefined) ? 'Total cost is $' + cost : 'Too heavy for First Class';
}

app.listen(PORT);