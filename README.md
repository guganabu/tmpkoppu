# tmpkoppu

A package that allows to create and store data in a temporary file. The stored data will be returned in same type as stored while retrieving from the file. Also, a dedicated API available to remove the file manually.

`tmpkoppu` - name inspired from a combination of english-tamil words, where `tmp` from temporary and `koppu`(கோப்பு) which means file in tamil. As the name refers, it's a temporary-file.

## Install Package

```
npm install tmpkoppu
```

## Import Package
Importing package can be done in either ES module or CommonJS module way
```
import { store, get, remove } from 'tmpkoppu'
```
or
```
const { store, get, remove } = require('tmpkoppu')
```

## Usage

### store
This method used to create a temporary file under the server's `/tmp` directory. The data that needs to be stored in the file can be passed as first param.
```
store(data: any)
```
It will return a promise resolved with `path` of the file. It can be used to perform further operations like retrieving data and removing file manually.

###### Example
```
store(1234).then(path => console.log(path)).catch(err => console.log(err));
```

### get
This method used to retrieve data from the created file. It requires a `param: path` to access the file content.
```
get(path)
```
It will return a promise resolved with actual data in the same type. For ex, if number `1234` is stored then the returned data type will be number.

###### Example
```
get(path).then(val => console.log(val, typeof val)).catch(err => console.log(err));
```

### remove
This method used to remove the file created under `/tmp` directory. It requires a `param: path` to remove the file.
```
remove(path)
```
It will return a promise resolved with a success message `File removed!`.

###### Example
```
remove(path).then(successMsg => console.log(successMsg)).catch(err => console.log(err));
```

## Contact Author
Abu - abudesk95@gmail.com
