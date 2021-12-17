# XPH
 Chrome Extension - DOM Nodes XPath selection (PostgreSQL, NodeJS, Admin and User-pages)

### ✔ [ZIP archive on GitHub](../../archive/master.zip)

## `USAGE`
<!--{{{-->
```bash
$ node     SERVER/server.js                 # launch server
$ explorer http://localhost:83/index.html   # visit index page
```

<!--}}}-->

```
    ┌── manifest.json
    ├── config.json
    │
    ├── server.sh
    ├── server_mintty.sh
    │
    ├── 1_index.url
    ├── index.html
    ├── server_index.html
    ├── xpath_embedded.html
    │
    ├── javascript
    │   ├── config.js
    │   ├── div_tools_html.js
    │   ├── taxo_content.js
    │   ├── taxo_json_201118.js
    │   ├── taxo_json_211211.js
    │   ├── taxo_pods_html.js
    │   ├── xpath_outline.js
    │   ├── xpath.js
    │   ├── xpath_background.js
    │   └── xpath_content.js
    │
    ├── CONTROL
    │   ├── index_control.html
    │   ├── query_format.js
    │   └── server_control.js
    │
    ├── SERVER
    │   ├── server.js
    │   └── server_sql.js
    │
    ├── DOC
    │   └── xpath_js.html
    │
    └── lib
        ├── lib_log.js
        ├── lib_popup.js
        ├── lib_postgres.js
        ├── lib_util.js
        └── t_details.js
```

<hr>
<!-- SCREENSHOTS {{{-->

* visited domains, page selection

> ![domains](/screenshot/domains.png)
> ![pages](/screenshot/pages.png)
> ![wikipedia](/screenshot/wikipedia.png)

> ![options](/screenshot/options.png)

> ![options](/screenshot/expand_xpath.png)

> ![logging](/screenshot/logging.png)

<!--}}}-->
