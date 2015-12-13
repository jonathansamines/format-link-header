# format-link-header
Allows to format a given links ref object, to the format as described in RFC 5988. Precisely it achieves the exactly inverse process performed by the [parse-link-header](https://github.com/thlorenz/parse-link-header).

## Installation

```bash
  npm install --save format-link-header
```

## Usage

1. Given a links refs object generated by **parse-link-header**:
  ```js
    var link = { next:
       { page: '3',
         per_page: '100',
         rel: 'next',
         url: 'https://api.github.com/user/9287/repos?page=3&per_page=100' },
      prev:
       { page: '1',
         per_page: '100',
         rel: 'prev',
         pet: 'cat',
         url: 'https://api.github.com/user/9287/repos?page=1&per_page=100' },
      last:
       { page: '5',
         per_page: '100',
         rel: 'last',
         url: 'https://api.github.com/user/9287/repos?page=5&per_page=100' } }
  ```

2. Format the link header

  ```js
    var formatter = require('format-link-header');
    formatter(link);
  ```

3. Web link headers generated!

  ```bash
    <https://api.github.com/user/9287/repos?page=3&per_page=100>; rel="next", <https://api.github.com/user/9287/repos?page=1&per_page=100>; rel="prev"; pet="cat", <https://api.github.com/user/9287/repos?page=5&per_page=100>; rel="last"
  ```