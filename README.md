# XPath AND Taxonomy web-page interactive scrapper
 Chrome Extension - DOM Nodes XPath selection (PostgreSQL, NodeJS, Admin and User-pages)

### ✔ [ZIP archive on GitHub](../../archive/master.zip)

### `README.md` _TAG (220901:01h:28)

## `USAGE`
<!--{{{-->
```bash
$ node     SERVER/server.js                 # launch server
$ explorer http://localhost:83/index.html   # visit index page
```

<!--}}}-->
<!--
}!!tree --dirsfirst    | sed -e 's/^/    /'
-->
```

    DOC:
        ├── README.md
        ├── xpath_embedded.html
        │
        ├── DOC
        │   └── xpath_js.html
        │
        └── screenshot
            ├── domains.png
            ├── expand_xpath.png
            ├── logging.png
            ├── options.png
            ├── pages.png
            └── wikipedia.png
    BUILD:
        ├── Makefile
        ├── manifest.json
        └── config.json

    DOCKER:
        ├── Dockerfile
        ├── package-lock.json
        └── package.json

    RUN:
        ├── server.sh
        ├── server_mintty.sh
        ├── manifest.json
        ├── config.json
        ├── 1_index.url
        ├── index.html
        └── favicon.ico

    CONTROL:
        ├── server_index.html
        └── CONTROL
            ├── index_control.html
            ├── query_format.js
            └── server_control.js

    SERVER:
        └── SERVER
            ├── server.js
            └── server_sql.js

    CLIENT:
        ├── javascript
        │   ├── config.js
        │   ├── xpath_tools.js
        │   ├── event_listeners.js
        │   ├── taxo_content.js
        │   ├── taxo_json_201118.js
        │   ├── taxo_json_211211.js
        │   ├── taxo_tools.js
        │   ├── xpath.js
        │   ├── xpath_background.js
        │   ├── xpath_content.js
        │   └── xpath_outline.js
        │
        ├── lib
        │   ├── lib_log.js
        │   ├── lib_popup.js
        │   ├── lib_postgres.js
        │   ├── lib_tools.js
        │   ├── lib_util.js
        │   └── t_details.js
        │
        ├── stylesheet
        │   ├── taxo_tools.css
        │   ├── xpath_tools.css
        │   ├── dom_details.css
        │   ├── dom_host.css
        │   └── dom_wot.css
        │
        └── images
            ├── icon_48.png
            └── icon_48_unloaded.png


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
