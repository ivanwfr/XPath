// ┌───────────────────────────────────────────────────────────────────────────┐
// │ config.js ............................................................... │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* exported config_js, CONFIG_JS_TAG */

/*}}}*/
/*{{{*/
const CONFIG_JS_ID   = "config_js";
const CONFIG_JS_TAG  =  CONFIG_JS_ID  +" (210611:15h:26)";

/*}}}*/
let config_js = (function() {
"use strict";

const OPTION_KEYS
    = [  /* EXTENSION */
          "xpath_expand"
        , "outline_log_dot"
        , "outline_log_frame"
        , "smooth_scroll"

        /* LOG_TOOLS */
        , "LOG1_STEP"
        , "LOG2_MESSAGE"
        , "LOG3_SERVER"
        , "LOG4_XHR"
        , "LOG5_DIV_TOOLS"
        , "LOG6_MOVE_TOOL"

        /* LOG_OUTLINE */
        , "LOG1_EVENT"
        , "LOG2_WHEEL"
        , "LOG3_MASK"
        , "LOG4_FRAMES"
        , "LOG5_XPATH"

        /* PAGE */
        , "location_href"
        , "details_options_open"
        , "div_tools_xy"
    ];

    return { OPTION_KEYS
    };
})();

