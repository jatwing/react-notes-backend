# react-notes-backend

to sort the keys of json, for adding translation, use "jq"
in vim command mode

1. local development:     nodemon src/app.js
2. serverless staging:    serverless deploy --stage staging
3. serverless production: serverless deploy --stage production


'''

:%!jq -S

'''
