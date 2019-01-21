import * as AWS from "aws-sdk";

export function cost(event, context, callback) {
  var now = new Date();
  var startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  var endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  if (now.getMonth() == 12) {
    endDate = new Date(now.getFullYear() + 1, 1, 1);
  }
  var start = startDate.toISOString().slice(0, 10);
  var end = endDate.toISOString().slice(0, 10);
  var params = {
    TimePeriod: {
      Start: start,
      End: end
    },
    Granularity: "MONTHLY",
    Metrics: ["AmortizedCost"]
  };
  var costExplorer = new AWS.CostExplorer();
  costExplorer.getCostAndUsage(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      const sum = data["ResultsByTime"]
        .map(item => parseFloat(item.Total["AmortizedCost"].Amount))
        .reduce((total, item) => {
          return (total += item);
        }, 0);
      var amountCurrency = "$" + sum.toFixed(2);
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          amount: amountCurrency,
          start: start,
          end: end
        })
      };
      callback(null, response);
    }
  });
}
