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
$ node server.js                   # launch server
$ explorer 1_index.url             # visit index page
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

`SERVER WEB PAGE (client frame)` <!--{{{-->
> * _href to **user feedback page** with **lang** and **user_id** parameters_
> * _href to the **translation page**_
>    * _lang and user_id will be saved as a site cookie

> ![server_index_client](/screenshot/server_index_client.png)

<!--}}}-->

<hr>
