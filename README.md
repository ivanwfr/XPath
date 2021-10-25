<!--{{{

        ┌── manifest.json
      ➔ ├── config.json
        │
      ➔ ├── server.js
        ├── server.sh
        ├── server_mintty.sh
        │
      ➔ ├── 1_index.url
      ➔ ├── index.html
        ├── server_index.html
      ➔ ├── xpath.html
        ├── xpath_github.html
        │
        ├── javascript
        │   ├── config.js
        │   ├── div_tools_html.js
        │   ├── outline.js
        │   ├── xpath.js
        │   ├── xpath_background.js
        │   └── xpath_content.js
        │
        └── lib
        │   ├── lib_postgres.js
            └── t_details.js

}}}-->

# XPH
 Chrome Extension - DOM Nodes XPath selection (PostgreSQL, NodeJS, Admin, User pages)

### ✔ [ZIP archive on GitHub](../../archive/master.zip)

<hr>

## `USAGE`
<!--{{{-->
```bash
$ node     SERVER/server.js                 # launch server
$ explorer http://localhost:83/index.html   # visit index page
```

<!--}}}-->

### `SERVER - NodeJS and web pages`
<!--{{{-->

> File                          | Description
> ------------------------------|---------------------------
> server.js                     | server NodeJS
> xpath.html                    | inlined HTML page

<!--}}}-->

### `POSTGRES - DATABASE config and SQL queries`
<!--{{{-->

> File                          | Description
> ------------------------------|-------------
> config.json                   | PostgreSQL: db,tables,sql<br>Server: host,port,cert

<!--}}}-->

<hr>

### `SCREENSHOTS`

<hr>

<!--{{{-->

* domains

> ![domains](/screenshot/domains.png)

* pages

> ![pages](/screenshot/pages.png)

* wikipedia

> ![wikipedia](/screenshot/wikipedia.png)

* options

> ![options](/screenshot/options.png)

* logging

> ![logging](/screenshot/logging.png)

<!--}}}-->

<hr>
