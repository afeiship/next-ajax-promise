# next-ajax-promise
> Promise able for next ajax.

## installation
```bash
npm install -S afeiship/next-ajax-promise --registry=https://registry.npm.taobao.org
```

## apis
| api   | params                             | description           |
| ----- | ---------------------------------- | --------------------- |
| fetch | inMethod, inUrl, inData, inOptions | Send a request by XHR |

## usage
```js
import NxAjaxPromise from 'next-ajax-promise';

// code goes here:
var res = NxAjaxPromise.fetch('get', 'https://api.github.com/users/afeiship', null,{ cancelable: true }).then(
  (response) => {
    console.log('response:->', response);
  }
);

// cancel:
res.destroy();
```
