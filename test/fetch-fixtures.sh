#!/usr/bin/env sh

curl -H "X-ApiToken: $API_TOKEN" https://$FULCRUM_API/api/v2/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json -o fixtures/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json
curl -H "X-ApiToken: $API_TOKEN" https://$FULCRUM_API/api/v2/choice_lists/e7cba93d-fcea-4c52-a9e1-b75f19908f25.json -o fixtures/choice_lists/e7cba93d-fcea-4c52-a9e1-b75f19908f25.json
curl -H "X-ApiToken: $API_TOKEN" https://$FULCRUM_API/api/v2/choice_lists/032804cc-496a-4c77-b102-ec0b237cbd10.json -o fixtures/choice_lists/032804cc-496a-4c77-b102-ec0b237cbd10.json
curl -H "X-ApiToken: $API_TOKEN" https://$FULCRUM_API/api/v2/classification_sets/b2b43507-a734-4d29-a141-22f60c36af71.json -o fixtures/classification_sets/b2b43507-a734-4d29-a141-22f60c36af71.json
