//┌──▼▼▼▼▼▼▼───────────────────────────────────────────────────────────────────┐
//│ [query_format]                                                             │
//└──▲▲▲▲▲▲▲───────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals document, console */ /* eslint-disable-line no-unused-vars */
/* exported query_format, QUERY_FORMAT_JS_TAG */

/* eslint-disable no-warning-comments */

const QUERY_FORMAT_JS_ID  = "query_format";
const QUERY_FORMAT_JS_TAG = QUERY_FORMAT_JS_ID    +" (211215:14h:57)";
/*}}}*/
let query_format = (function() {
"use strict";
let log_this=false;

/*{{{*/
const CSS_CLASS_COLLAPSED = "collapsed";
const CSS_CLASS_OBSOLETE = "obsolete";
const CSS_CLASS_MAGNIFIED = "magnified";
const YOU_HAVE_TO_SELECT  = "YOU HAVE TO SELECT SOME JSON-TEXT TO BE FORMATTED";

let query_format_button;
let query_format_div;
let query_format_watermark;

/*}}}*/

/* HTML */
/*➔ query_format_load_config {{{*/
let query_format_load_config = function(config,textContent)
{
//console.log("%c query_format_load_config:", "background-color:navy;");
    /* I18N_ACTIVE {{{*/
    config.I18N_ACTIVE = query_format_load_config_is_active(textContent, regexp_I18N_ACTIVE);
//console.log("config.I18N_ACTIVE %c "+config.I18N_ACTIVE+" ", "background-color: "+(config.I18N_ACTIVE ? "#D00" : "#00D"));

    let el = document.getElementById("submit_I18N_ACTIVE");
    if( config.I18N_ACTIVE ) { el.classList.add   ("selected"); el.title = "CURRENTLY ✔ ACTIVE"; }
    else                     { el.classList.remove("selected"); el.title = "currently inactive"; }
    /*}}}*/
    /* LOG_MORE {{{*/
    config.LOG_MORE = query_format_load_config_is_active(textContent, regexp_LOG_MORE);
//console.log("config.LOG_MORE %c "+config.LOG_MORE+" ", "background-color: "+(config.LOG_MORE ? "#D00" : "#00D"));

    /**/el = document.getElementById("submit_LOG_MORE");
    if( config.LOG_MORE ) { el.classList.add   ("selected"); el.title = "CURRENTLY ✔ ACTIVE"; }
    else                  { el.classList.remove("selected"); el.title = "currently inactive"; }
    /*}}}*/
};
    /*}}}*/
/*_ query_format_load_config_is_active {{{*/
/*{{{*/
const        regexp_I18N_ACTIVE = new RegExp("^.*I18N_ACTIVE.*true.*$", "gmu");
const        regexp_LOG_MORE    = new RegExp("^.*LOG_MORE.*true.*$"   , "gmu");

/*}}}*/
let query_format_load_config_is_active = function(textContent,regex)
{
//console.log("%c regex:", "color:yellow;");
//console.dir(    regex                   );

    let         matches = textContent.match(regex);
//console.log("%c matches"    , "color:orange");
//console.dir(    matches                     );

    let    result = !!matches;
//console.log("%c result");
//console.dir(    result );
//console.log("result %c "+result+" ", "background-color: "+(result ? "#D00" : "#00D"));

//console.log("%c textContent", "color:gray"  );
//console.dir(    textContent                 );

    return result;
};
/*}}}*/
/*➔ query_format_invalidate {{{*/
let query_format_invalidate = function()
{
    if(!query_format_button    ) query_format_button    = document.getElementById( "query_format_button"    );
    if(!query_format_div       ) query_format_div       = document.getElementById( "query_format_div"       );
    if(!query_format_watermark ) query_format_watermark = document.getElementById( "query_format_watermark" );

    if(query_format_button     ) query_format_button   .classList.remove( CSS_CLASS_OBSOLETE );
    if(query_format_div        ) query_format_div      .classList.add   ( CSS_CLASS_OBSOLETE );
    if(query_format_watermark  ) query_format_watermark.classList.add   ( CSS_CLASS_OBSOLETE );
};
/*}}}*/
/*➔ query_format_magnify_toggle {{{*/
let query_format_magnify_toggle = function(state="toggle")
{
    let magnify;
    /* TABLE {{{*/
    if(!query_format_div) query_format_div = document.getElementById("query_format_div");

    switch( state ) {
        case  true  : magnify =  true; query_format_div.parentElement.classList.add   ( CSS_CLASS_MAGNIFIED ); break;
        case  false : magnify = false; query_format_div.parentElement.classList.remove( CSS_CLASS_MAGNIFIED ); break;
        default     : magnify =        query_format_div.parentElement.classList.toggle( CSS_CLASS_MAGNIFIED ); break;
    }
    /*}}}*/
    /* BUTTON {{{*/
    let buttons = document.querySelectorAll(".magnify_button");
//console.dir(buttons);
    for(let i=0; i<buttons.length; ++i)
    {
        if(magnify) buttons[i].classList.add   ( CSS_CLASS_MAGNIFIED );
        else        buttons[i].classList.remove( CSS_CLASS_MAGNIFIED );
    }
    /*}}}*/
//console.log("query_format_magnify_toggle( "+state+" ) ➔ magnify=["+magnify+"]");
    return         magnify;
};
/*}}}*/
/*➔ query_format_collapse_toggle {{{*/
let query_format_collapse_toggle = function(state="toggle")
{
    let collapsed;
    /* [query_format_div] {{{*/
    if(!query_format_div) query_format_div = document.getElementById("query_format_div");
    let h = query_format_div.offsetHeight;

    switch( state ) {
        case  true  : collapsed =  true; query_format_div.parentElement.classList.add   ( CSS_CLASS_COLLAPSED ); break;
        case  false : collapsed = false; query_format_div.parentElement.classList.remove( CSS_CLASS_COLLAPSED ); break;
        default     : collapsed =        query_format_div.parentElement.classList.toggle( CSS_CLASS_COLLAPSED ); break;
    }

    /* adjust body margin-bottom to prevent scrolling */
    document.body.style.marginBottom = collapsed ? h+"px" : "";
    /*}}}*/
    /* [query_format_collapse] {{{*/
    let button      = document.getElementById("query_format_collapse");

    if(collapsed)     button.classList.add    ( CSS_CLASS_COLLAPSED   );
    else              button.classList.remove ( CSS_CLASS_COLLAPSED   );
    /*}}}*/
    /* [query_format_div] {{{*/
    if(!query_format_div) query_format_div = document.getElementById("query_format_div");
//  let            width = (window.innerWidth - 96);

//  query_format_div.style.height    = collapsed    ? "0px" : "";
//  query_format_div.style.maxWidth  =                (width    )+"px";
//  query_format_div.parentElement  .style.maxWidth = (width / 2)+"px";

    /*}}}*/
//console.log("query_format_collapse_toggle( "+state+" ) ➔ collapsed=["+collapsed+"]");
    return collapsed;
};
/*}}}*/
/*_ query_format_show_watermark {{{*/
let query_format_show_watermark = function()
{
    if(!query_format_div    ) query_format_div    = document.getElementById("query_format_div"   );
    if(!query_format_button ) query_format_button = document.getElementById("query_format_button");
    if( query_format_div.watermark)
    {
        if(!query_format_button.innerText_origin)
            query_format_button.innerText_origin =   query_format_button.innerText;

        query_format_button    .innerText =
            query_format_button.innerText_origin +"\n"+query_format_div.watermark;

        query_format_button.title         = "PARSE LAST REPLY";
    }
};
/*}}}*/
/*_ query_format_clear_watermark {{{*/
let query_format_clear_watermark = function()
{
    if(!query_format_div    ) query_format_div    = document.getElementById("query_format_div"   );
    if(!query_format_button ) query_format_button = document.getElementById("query_format_button");

    /* SHOW ONLY LAST FORMATTED REPLY */
    if(    query_format_button.innerText_origin
        && query_format_button.innerText.startsWith(query_format_button.innerText_origin)
      )
        query_format_button    .innerText
            =  query_format_button.innerText.substr(query_format_button.innerText_origin.length+1)
            || query_format_button.innerText_origin
            ;
};
/*}}}*/

/* EVENT */
/*➔ query_format_event {{{*/
let query_format_event = function(event) /* eslint-disable-line no-unused-vars */
{
log_this=false;
/*{{{*/
//console.clear();
//console.log("query_format_event");
// @see C:/LOCAL/STORE/DEV/PROJECTS/RTabs/Util/RTabs_Profiles/DEV/CLIENT/dom_util.js
/*}}}*/
    /* QUERY FORMAT HTML {{{*/
    if(!query_format_div) query_format_div = document.getElementById("query_format_div");

    let iframe           = document.getElementById("query_iframe");
    iframe.contentDocument.body.contentEditable = true;


console.log("➔ query_format_div.watermark=["+query_format_div.watermark+"]");
    if(query_format_div.watermark)
    {
query_format_div.title = query_format_div.watermark;

        /* CREATE [query_format_watermark] {{{*/
        if(!query_format_watermark)
        {
            query_format_watermark                       = document.createElement("SPAN");
            query_format_watermark.id                    = "query_format_watermark";
//          query_format_watermark.style.position        = "absolute";
//          query_format_watermark.style.top             = "1em";
//          query_format_watermark.style.right           = "1em";
//          query_format_watermark.style.backgroundColor = "transparent";
//          query_format_watermark.style.fontSize        = "32px";

            query_format_div.parentElement.insertBefore(query_format_watermark, query_format_div);
        }
        /*}}}*/
        query_format_watermark.innerText = query_format_div.watermark;
        delete query_format_div.watermark;

//console.log("%c query_format_watermark:", "font-size:200%;");
//console.dir( query_format_watermark  );
    }
    /*}}}*/
    /* SELECTED TEXT {{{*/
    let selection = iframe.contentDocument.getSelection();
/*{{{*/
//console.log("selection");
//console.log( selection );
//console.log("selection.rangeCount=["+ selection.rangeCount+"]");
/*}}}*/
    /*}}}*/
    /* YOU_HAVE_TO_SELECT .. [sel_text] {{{*/
    let sel_text;
    if( selection.rangeCount ) {

        let range =  selection.getRangeAt(0);
/*{{{*/
//console.log("range");
//console.log( range );
/*}}}*/

        sel_text         = range.toString().trim();
/*{{{*/
//console.log("➔ sel_text=["+sel_text+"]");
/*}}}*/
    }
    else {
/*{{{*/
//console.log("cb_textArea.value:");
//console.log( cb_textArea.value  );
/*}}}*/
        sel_text         = cb_textArea.value;
    }
    if(!sel_text             ) {
        query_format_watermark.innerText = "";
        query_format_div.innerHTML = "<em class='error'>"+YOU_HAVE_TO_SELECT+"</em>";
        query_format_collapse_toggle( false ); // SHOW

        if( query_format_button.innerText_origin)
            query_format_button.innerText = query_format_button.innerText_origin;
        return;
    }
    /*}}}*/
    /* FORMAT .. [json_text RegExp] {{{*/
    sel_text
        = sel_text
        . replace(              /\r/gm, ""         )
        . replace(          /\u00A0/gm, ""         ) // NO-BREAK SPACE (U+00A0)
        . replace(/^let[^\[]*\[\];?/gm, ""         ) // let XXX = [];
//      . replace(              /\[/gm, "\&lbrack;") // .... [ ✔ ➔ ]
//      . replace(              /\]/gm, "\&rbrack;") // .... [ ✔ ➔ ]
        . replace(      /^("[^"]*)\[([^\]]*)\]([^"]*")/g, "$1\&lbrack;$2\&rbrack;") // [ ✔ ➔ ]
//_______________________("_______[_________]______")_________________________________________
        ;
if(log_this) console.log("┌─ sel_text ──────────────────────────────────────────────────┐");
if(log_this) console.dir(    sel_text                                                     );
if(log_this) console.log("└─────────────────────────────────────────────────────────────┘");

    let json_text
        = sel_text
        .replace(              /^\s*\/\/.*/gm  , ""    ) // ➔ filter comments single line
        .replace(           /\s*\/\*.*\*\//gms , ""    ) // ➔ kills comments multi-line
        .replace(           /^\s*SELECT.*$/gm  , ""    )
        .replace(            /^\s*query.*$/gm  , ""    )
        .replace(      /^\s*dump_TABLES.*$/gm  , ""    )
        .replace(           /^\s*return.*$/gm  , ""    )
        .replace(         /^\s*\}\)\(\).*$/gm  , ""    ) // self calling factory function
        .replace(              /^'[^']*';?/gm  , ""    )
        .replace(              /^"[^"]*";?/gm  , ""    )
        .replace(/^fs_read_file_callback.*/gm ,  ""    )
        ;

    json_text
        = json_text
//      .replace(              /^let[^\[]*\[/gm, "["   )
        .replace(              /^let[^{]*{/gm  , "{"   )
        .replace(                   /}; *$/gm  , "}"   )
        .replace(             /}\s*\n+\s*{/gm  , "}, {")
/*{VIM*/.replace(             /}\s*,+\n*\]/gm  , "}]"  ) // filter trailing comma
        .trim()
    ;
    while(json_text.endsWith("\n")) json_text = json_text.substr(0, json_text.length-1);
    while(json_text.endsWith("," )) json_text = json_text.substr(0, json_text.length-1);
    while(json_text.endsWith(";" )) json_text = json_text.substr(0, json_text.length-1);
//console.log("➔ json_text=@@@"+json_text+"@@@");

    /*}}}*/
    /* TO ARRAY {{{*/
    json_text
        = (json_text.startsWith("[") ? "":"[ ")
        +  json_text
        + (json_text.endsWith  ("]") ? "":"] ")
        ;
//console.log("➔ json_text=___"+json_text+"___");

    /*}}}*/
    /* PARSE ➔ COLORIZE {{{*/
    query_format_div.style.position = "static";
    try {
        json_text
            = JSON.stringify(query_format_JSON_parse(json_text), null, 4)
            .replace( /\n\s{4}\S.*$/gm  , "<span class='s_04'>$&</span>")
            .replace( /\n\s{8}\S.*$/gm  , "<span class='s_08'>$&</span>")
            .replace( /\n\s{12}\S.*$/gm , "<span class='s_12'>$&</span>")
            .replace( /\n\s{16}\S.*$/gm , "<span class='s_16'>$&</span>")
            .replace( /\n\s{20}\S.*$/gm , "<span class='s_20'>$&</span>")
            ;
    }
    catch(ex) {
//console.log("%c"+ex, "color:orange");
        json_text = ex;
//      query_format_div.style.position = "absolute";
    }

//console.log("➔ json_text=["+json_text+"]");
    query_format_div.innerHTML       = json_text;

    query_format_collapse_toggle( false ); // SHOW

    query_format_div      .classList.remove( CSS_CLASS_OBSOLETE );
    query_format_watermark.classList.remove( CSS_CLASS_OBSOLETE );
    query_format_button   .classList.add   ( CSS_CLASS_OBSOLETE );

    query_format_clear_watermark();

/*{{{
:!start explorer "https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically"
}}}*/
    /*}}}*/
};
/*}}}*/
/*_ query_format_JSON_parse {{{*/
/*_ get_int_in_string {{{*/
const regexp_NUMBER = new RegExp("\\d+");

let get_int_in_string = function(s)
{
        let matches = s.match(regexp_NUMBER);
        return        matches ? matches[0] : 9;
};
/*}}}*/
let query_format_JSON_parse = function(json_str, silent)
{
/*{{{*/

const TO_ERR_100 = "____________________________________________________________________________________________________";
const DIGITS_100 = "0123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789";
const DECADE_100 = "0_________1_________2_________3_________4_________5_________6_________7_________8_________9_________";

const lbH  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex 1ex   0; padding:0 .5em 0 .5em; border-radius:1em 1em 1em 1em; background:linear-gradient(to bottom, #555 0%, #223 80%, #454 100%);";
const lf2  = "color:#FF0000;";
const lf3  = "color:#FFA500;";
const lf4  = "color:#FFFF00;";

const LF   = String.fromCharCode(10);
let   log  = console.log;
/*}}}*/
/*{{{
logBIG("query_format_JSON_parse")
}}}*/

    let json_item;
    try {
        json_item = JSON.parse( json_str );
    }
    catch(ex)
    {
  console.log("┌─ json_str ──────────────────────────────────────────────────┐");
  console.dir(    json_str                                                     );
  console.log("└─────────────────────────────────────────────────────────────┘");
        if(!silent) {
            let     offset = get_int_in_string( ex.message );
            let     to_err = 100 * Math.floor(offset / 100);
            let    err_str =   json_str.substring(to_err, to_err + 100 );
            let to_err_str = TO_ERR_100.substring(0     ,          offset - to_err       );
            let digits_str = DIGITS_100.substring(0     , Math.max(offset - to_err+2, 10));
            let decade_str = DECADE_100.substring(0     , Math.max(offset - to_err+2, 10));

            err_str = err_str.replace(/\n/gmu," ");

            log("%c➔ *** "+ex.message     , lbH+lf2);
            log("%c➔ "+    err_str        ,     lf4);
            log("%c➔ "+    to_err_str+"^_",     lf3);
            log("%c➔ "+    digits_str     ,     lf3);
            log("%c➔ "+    decade_str     ,     lf3);
          //log_caller();
            throw "<pre style='color:cyan; background-color:#222; width:fit-content;'>"    +LF /* eslint-disable-line no-throw-literal */
            //    "offset=["+offset+"]"+LF
            //    "to_err=["+to_err+"]"+LF
            +     "<span style='"+(lbH+lf2        )+"'> ➔ *** "+ ex.message      +"</span>"+LF
            +     "<span style='"+(    lf4        )+"'> ➔ "    + err_str         +"</span>"+LF
            +     "<span style='"+(    lf2        )+"'> ➔ "    + to_err_str+"^_" +"</span>"+LF
            +     "<span style='"+(    lf3        )+"'> ➔ "    + digits_str      +"</span>"+LF
            +     "<span style='"+(    lf3        )+"'> ➔ "    + decade_str      +"</span>"+LF
            +     "</pre>"
            ;
        }
    }
    return json_item;
};
/*}}}*/

/* CLIPBOARD */
/*➔ query_format_copy_to_CLIPBOARD {{{*/
/*{{{*/
let cb_textArea;
/*}}}*/
let query_format_copy_to_CLIPBOARD = function(copy_content)
{
//console.log("query_format_copy_to_CLIPBOARD")

    query_format_show_watermark();

    /* CREATE [cb_textArea] {{{*/
    if(!cb_textArea) {
        cb_textArea                       = document.createElement("TEXTAREA");
        cb_textArea.id                    = "cb_textArea";
        cb_textArea.style.position        = "fixed";
        cb_textArea.style.top             = "1em";
        cb_textArea.style.left            = "1em";
        cb_textArea.style.width           =  "95%";
        cb_textArea.style.height          = "25em";
        cb_textArea.style.backgroundColor = "salmon";

        document.body.appendChild(cb_textArea);
    }
    /*}}}*/
//console.log("cb_textArea:");
//console.dir( cb_textArea  );

    cb_textArea.style.display = "block";
    cb_textArea.value         = copy_content;
    cb_textArea.select();
    if( !document.execCommand("copy") ) {
//console.log("%c*** COPY TO CLIPBOARD REJECTED ***", "color:red");
//console.trace();
    }

    cb_textArea.style.display = "none";
//  cb_textArea.value         = ""; // keep selection pending .. for js_preety_print
};
/*}}}*/

return { query_format_load_config
    ,    query_format_invalidate
    ,    query_format_magnify_toggle
    ,    query_format_collapse_toggle

    ,    query_format_event
    ,    query_format_copy_to_CLIPBOARD
};
})();


