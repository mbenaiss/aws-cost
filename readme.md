# Get AWS monthly spend

Get the amount spent on using the Aws platform monthly.

```json
{
  "amount": "$7.09",
  "start": "2019-01-01",
  "end": "2019-02-01"
}
```

## Deploy with Serverless

First we need to install [GitHub - Serverless Framework ](https://github.com/serverless/serverless)

We are now ready to deploy the app.

```
yarn run deploy
```

When the function was deployed you get an URL like this
`https://xxxxx.amazonaws.com`

For testing your function locally

```
yarn run invoke
```

## Cost

- `AWS Lambda` : The `Lambda free tier` includes 1M free requests per month.

- `AWS Cost Explorer` : it cost `$0.01` per API Request
