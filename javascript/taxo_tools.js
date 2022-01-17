// ┌───────────────────────────────────────────────────────────────────────────┐
// │ taxo_tools.js ==== CONTENT SCRIPT ============== _TAG (220117:18h:01) === │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/

/* globals  console, window, document */
/* globals  taxo_content */

/* exported TAXO_TOOLS_TAG, taxo_tools */

/* eslint-disable no-warning-comments */

const TAXO_TOOLS_ID    = "taxo_tools";
const TAXO_TOOLS_TAG   =  TAXO_TOOLS_ID  +" (201116:19h:13)";
/*}}}*/
let   taxo_tools       = (function() {
"use strict";

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ HTML                                                                  │
    // └───────────────────────────────────────────────────────────────────────┘
/*_  [BUTTON_INLINE_HTML] {{{*/
const BUTTON_INLINE_HTML =
`
<button id="taxo_tools">
 <span  id="taxo_single"></span>
 <span  id="taxo_clear" ></span>
 <span  id="taxo_multi" ></span>
 <span  id="taxo_check" >check</span>
</button>
`;

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ CSS                                                                   │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ [BUTTONS_POD_INLINE_CSS] .. (can be overridden by further injected CSS) {{{*/
const BUTTONS_POD_INLINE_CSS =
`
`;
/*{{{
 * { outline : 4px solid blue !important; }
}}}*/

let   BUTTONS_POD_INLINE_CSS_DATA ="data:text/css,"+ escape(
      BUTTONS_POD_INLINE_CSS
).replace(/\\(\\x+)/g,"\\\\$1")
;
/*}}}*/
/*_ [taxo_tools_css_data] {{{*/
/*
../stylesheet/taxo_tools.css
*/
let taxo_tools_css_data ="data:text/css,"+ escape(`
/*INLINE{{{*/

   #taxo_tools_css_tag         { content: "taxo_tools_css (220117:18h:20)"; }

button                 { font-size : unset; }
                       .buttons_pod                { display               : grid;        }
                       .buttons_pod                { direction             : rtl;         }
                       .buttons_pod.r_to_l         { direction             : ltr;         }
                       .buttons_pod        *       { direction             : ltr;         }
                       .buttons_pod.r_to_l *       { direction             : ltr;         }
                       .buttons_pod>*              { grid-auto-flow        : column;      }

                       .buttons_pod.row_col_1x3    { grid-template-columns : repeat( 1, 1fr); }
                       .buttons_pod.row_col_1x3    { grid-template-rows    : repeat( 1, 1fr); }

                       .buttons_pod.row_col_10x3   { grid-template-columns : repeat(10, 1fr); }
                       .buttons_pod.colx1          { grid-template-columns :            1fr ; }
                       .buttons_pod                { padding               : 0                      !important; }
                       .buttons_pod                { border-width          : 0                      !important; }
                       .buttons_pod>*::first-letter{ font-size             : 120%                   !important; }
                       .buttons_pod>*.fixed        { box-shadow            : 1px 1px 1px #EEE       !important; }
                       .buttons_pod>*.fixed        { font-size             : 48px                   !important; }

                       .buttons_pod>*              { transition : top    500ms
                                                                , left   500ms
                                                                , height 500ms; }
.note     { position          : fixed; left:10%; top:10%; }
.note     { display           : inline-block            ; }
.note     { border-left       : 1em solid #ffff80       ; }
.note     { background        : #EE8                    ; }
.note.warn{ background        : #EE8                    ; }
.note     { color             : #444                    ; }
.note.warn{ color             : #444                    ; }

.note     { padding           : 1ex 1em 1ex 1em         ; }
.note     { font-weight       : 100                     ; }
.note.warn{ font-weight       : 900                     ; }
.note     { font-size         : 16px                    ; }
.note     { font-family       : cursive                 ; }
.note     { font-style        : oblique                 ; }

.note p   { margin-left       : 3em                     ; }
.note pre { margin            : 0                       ; }
.note em  { line-height       : 2.5em                   ; }
.note em  { padding-left      : 0.5em                   ; }
.note em  { padding-right     : 0.5em                   ; }
.note em  { text-shadow       : 1px 1px 0px #FFF        ; }

.note em  { border-radius     : 0.3em                   ; }
.note em  { box-shadow        : 1px 1px 1px rgba(000,000,000,0.53)       ; }
.note em  { background        : rgba(000,000,170,0.27); }
.buttons_pod.movable   { z-index : 2147483647; }
.buttons_pod           { z-index : 2147483601; }
.buttons_pod.hidden    { display    : none !important; }
.buttons_pod           { white-space      : nowrap;  }
.buttons_pod           { user-select      : none;    }
.buttons_pod>*>*       { pointer-events   : none;    }

.buttons_pod           { transition : left 150ms ease-out, top 100ms ease-out, opacity 250ms 150ms ease-in; }
.button_in_out div     { transition :  all 500ms ease-out !important; }
.buttons_pod          { position         : fixed;                               }

.buttons_pod          { margin           : 0                !important; }
.buttons_pod          { border-radius    : 0.5em;                       }
.buttons_pod          { box-shadow       : 2px 2px 5px #444 !important; }
.buttons_pod          { padding          : 0.1em            !important; }

.buttons_pod.pressed  { box-shadow       : none             !important; }
.buttons_pod.pressed  { border-width     : 1px              !important; }
.buttons_pod.pressed  { outline-width    : 0                !important; }
.buttons_pod>*       { border : unset !important;}
.buttons_pod         { border-radius : 0.5em;                  }
.buttons_pod.pressed { border        : none;                   }
.buttons_pod:focus   { border        : transparent !important; }
.buttons_pod:focus   { outline       : transparent !important; }
#taxo_tools                     { display               : grid;         }
#taxo_tools                     { grid-template-columns : 1fr 5fr 1fr;  }
#taxo_tools                     { align-items           : center;       }

#taxo_tools>*                   { pointer-events        : initial;      }

#taxo_tools_shadow_host          { position  : fixed; top:0; left:0; }
#taxo_tools_shadow_host          { z-index   : 2147483600; }

#taxo_single                    { user-select  : none; white-space : nowrap; cursor:auto; }
#taxo_clear                     { user-select  : none; white-space : nowrap; cursor:auto; }
#taxo_multi                     { user-select  : none; white-space : nowrap; cursor:auto; }

#taxo_single                    { grid-column-start: 1; grid-column-end: 2; grid-row-start: 1; grid-row-end: 2; }
#taxo_clear                     { grid-column-start: 1; grid-column-end: 2; grid-row-start: 2; grid-row-end: 3; }
#taxo_multi                     { grid-column-start: 1; grid-column-end: 2; grid-row-start: 3; grid-row-end: 4; }
#taxo_check                     { grid-column-start: 2; grid-column-end: 3; grid-row-start: 2; grid-row-end: 3; }

#taxo_single                    { box-shadow : none; margin : 0; padding: 0; border : none !important; }
#taxo_clear                     { box-shadow : none; margin : 0; padding: 0; border : none !important; }
#taxo_multi                     { box-shadow : none; margin : 0; padding: 0; border : none !important; }

#taxo_single                    { background: initial !important; }
#taxo_clear                     { background: initial !important; }
#taxo_multi                     { background: initial !important; }

#taxo_single                    { opacity    : 0.5; }
#taxo_clear                     { opacity    : 0.5; }
#taxo_multi                     { opacity    : 0.5; }

#taxo_single.selected           { opacity    : 1.0; }
#taxo_clear.cleared             { opacity    : 1.0; transform: scale(1.1); }
#taxo_multi.selected            { opacity    : 1.0; }

#taxo_single::after             { content : '\\2192' ;                    }
#taxo_clear::after              { content : '\\2715' ; font-weight : 900; }
#taxo_multi::after              { content : '\\21F6' ;                    }

#taxo_single.selected::after    { content : '\\2192'; color:red; transition:all 150ms ease-out;                                     }
#taxo_clear.cleared::after      { content : '\\2600'; font-size : 200%; transition:all 150ms ease-out; }
#taxo_multi.selected::after     { content : '\\21F6'; color:red; transition:all 150ms ease-out;                                     }

#taxo_clear.cleared             {                          color : rgba(0,0,0, 0.2); text-shadow : none; }
#taxo_clear.cleared.fg4         { opacity: 1.0 !important; color : #FF0 !important;             text-shadow : 1px 1px 1px #222; }
#taxo_clear.cleared.fg5         { opacity: 1.0 !important; color : #0F0 !important;             text-shadow : 1px 1px 1px #222; }
#taxo_clear.cleared.fg6         { opacity: 1.0 !important; color : #00F !important;             text-shadow : 1px 1px 1px #222; }
#taxo_clear.cleared.fg7         { opacity: 1.0 !important; color : #F0F !important;             text-shadow : 1px 1px 1px #222; }
.buttons_pod                     { transform-origin: 0 0;        }
.buttons_pod.magnify             { transform       : scale(1.5); }

.buttons_pod>*                   { line-height      : 1.2em           !important; }

.buttons_pod>*                   { margin           : 2px   0.5em; padding: 0.0em 0.5em; }

.buttons_pod>*::after            { display          : inline-block; }
.buttons_pod>*::after            { height           : 1em;          }
.buttons_pod                     {              background-color : #D8D; }
.buttons_pod       >*:nth-child(10n+1)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #964B00); }
.buttons_pod       >*:nth-child(10n+2)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FF0000); }
.buttons_pod       >*:nth-child(10n+3)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FFA500); }
.buttons_pod       >*:nth-child(10n+4)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FFFF00); }
.buttons_pod       >*:nth-child(10n+5)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #9ACD32); }
.buttons_pod       >*:nth-child(10n+6)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #6495ED); }
.buttons_pod       >*:nth-child(10n+7)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #EE82EE); }
.buttons_pod       >*:nth-child(10n+8)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #A0A0A0); }
.buttons_pod       >*:nth-child(10n+9)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FFFFFF); }
.buttons_pod       >*:nth-child(10n+0)  { color: #000; background : linear-gradient(to right, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #202020); }
.buttons_pod.r_to_l>*:nth-child(10n+1)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #964B00); }
.buttons_pod.r_to_l>*:nth-child(10n+2)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FF0000); }
.buttons_pod.r_to_l>*:nth-child(10n+3)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FFA500); }
.buttons_pod.r_to_l>*:nth-child(10n+4)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FFFF00); }
.buttons_pod.r_to_l>*:nth-child(10n+5)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #9ACD32); }
.buttons_pod.r_to_l>*:nth-child(10n+6)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #6495ED); }
.buttons_pod.r_to_l>*:nth-child(10n+7)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #EE82EE); }
.buttons_pod.r_to_l>*:nth-child(10n+8)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #A0A0A0); }
.buttons_pod.r_to_l>*:nth-child(10n+9)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #FFFFFF); }
.buttons_pod.r_to_l>*:nth-child(10n+0)  { color: #000; background : linear-gradient(to  left, rgba(136,136,136,0.3), rgba(255,255,255,0.1) 97%, #202020); }

.buttons_pod>*.selected          { background       : #FFF !important; }
.buttons_pod>*.selected.leaf     { background       : #FFF !important; }

.buttons_pod>*.selected          { box-shadow       : 2px 2px 2px 1px #888;              }

.buttons_pod>*                   { border           : 2px solid  transparent !important; }
.buttons_pod>*.selected          { border           : 2px solid  #000        !important; }
.buttons_pod>*.selected.leaf     { border-radius    : 1.0em;                             }

.buttons_pod>*.selected          { margin-left      : 0.0em                  !important; }
.buttons_pod       >*.clicked           { margin-left      :  1.0em            !important; }
.buttons_pod       >*.clicked           { margin-right     :  0.0em            !important; }
.buttons_pod.r_to_l>*.clicked           { margin-left      :  0.0em            !important; }
.buttons_pod.r_to_l>*.clicked           { margin-right     :  1.0em            !important; }

.buttons_pod       >*.collected         { margin-left      :  0.0em            !important; }
.buttons_pod       >*.collected         { margin-right     :  0.0em            !important; }
.buttons_pod.r_to_l>*.collected         { margin-right     :  0.0em            !important; }
.buttons_pod.r_to_l>*.collected         { margin-left      :  0.0em            !important; }
.buttons_pod       >*.clicked           { box-shadow       : 1px 1px 1px 1px #888;         }
.buttons_pod       >*.collected         { border           : 2px solid  #000   !important; }

.buttons_pod       >*.clicked           { border-radius    : 0em 1em 1em 0em   !important; }
.buttons_pod.r_to_l>*.clicked           { border-radius    : 1em 0em 0em 1em   !important; }

.buttons_pod       >*.collected         { border-radius    : 0em 1em 1em 0em   !important; }
.buttons_pod.r_to_l>*.collected         { border-radius    : 1em 0em 0em 1em   !important; }

.buttons_pod       >*.selected          { border-radius    : 0em 1em 1em 0em   !important; }
.buttons_pod.r_to_l>*.selected          { border-radius    : 1em 0em 0em 1em   !important; }

.buttons_pod       >*.collected         { color            : #DDD              !important; }
.buttons_pod       >*.clicked::after    { float: right; padding: 0px 5px;                  }
.buttons_pod       >*.collected::after  { float: right; padding: 0px 5px;                  }
.buttons_pod.r_to_l>*.clicked::before   { float:  left; padding: 0px 0px;                  }

.buttons_pod       >*.clicked::after    { content          : '\\2192';                      }
.buttons_pod       >*.selected::before  { content          : '\\2714';                      }
.buttons_pod.r_to_l>*.clicked::after    { content          :   none;                       }
.buttons_pod.r_to_l>*.clicked::before   { content          : '\\2190';                      }

.buttons_pod       >*.collected::before { content          : '\\21F6'           !important; }
.buttons_pod.r_to_l>*.collected::before { content          : '\\2B31'           !important; }
.buttons_pod       >*.visited   { text-shadow      : 1px 1px 2px #000;                     }
.buttons_pod       >*.visited   { background-color : rgba(136,136,255,0.3)     !important; }
.buttons_pod       >*.clicked   { background-color : rgba(255,255,255,0.5)     !important; }
.buttons_pod       >*.collected { background-color : rgba(034,034,034,1.0)     !important; }
/*INLINE}}}*/
/*# sourceURL=taxo_tools.css */
`
)
 .replace(/\\(\\x+)/g,"\\\\$1")
;
/*}}}*/
/*_ dom_load_css_id_data {{{*/
/*_ dom_load_css_id_data {{{*/
let dom_load_css_id_data = function(css_id,css_data)
{
//console.log("➔ dom_load_css_id_data("+css_id+" , "+css_data.length+")")

    let css_EL;
    try {

        window.addEventListener("error", load_onerror, false);

        css_EL   = load_css_EL(css_id, css_data);

        if(css_EL.href.length < 24)
        {
            let error_msg = "["+css_id+" DATA] IS MISSING";
            console.log   ("%c *** "+error_msg+" *** ", "font-size:200%; background-color:red;");
            console.error (TAXO_TOOLS_ID+": "+error_msg);
        }
    }
    catch(ex) {
        console.log(TAXO_TOOLS_ID   +": LOADING DATA .. catch");
        console.dir(ex);
    }
    finally {
        window.removeEventListener("error", load_onerror, false);
    }
    return css_EL;
};
/*}}}*/
/*… load_onerror {{{*/
let load_onerror_count = 0;
let load_onerror = function(e)
{
    console.log("%c "+TAXO_TOOLS_TAG      +" %c * load_onerror #"+(++load_onerror_count)
                ,"background-color:#111",  "background-color:#500"                    );
    console.dir( e  );

    if( e.error          ) try { console.log("e.error..."+ e.error  ); } catch(ex) { console.log(ex); }
    if( e.message        ) try { console.log("e.message."+ e.message); } catch(ex) { console.log(ex); }
    if( e.name           ) try { console.log("e.name...."+ e.name   ); } catch(ex) { console.log(ex); }
    if( e.type != "error") try { console.log("e.type...."+ e.type   ); } catch(ex) { console.log(ex); }
    if( e.target         ) try { console.log(              e.target ); } catch(ex) { console.log(ex); }
};
/*}}}*/
/*… load_css_EL {{{*/
let load_css_EL = function(id, scheme_arg) {
    let el           = document.createElement("link");
    el.id            = id;

    el.href          = scheme_arg;
    el.type          = "text/css";
    el.charset       = "utf-8";
    el.rel           = "stylesheet";
    el.addEventListener("error", load_onerror);

    return el;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ HTML FRAGMENT .. shadow_host.shadowRoot                               │
    // └───────────────────────────────────────────────────────────────────────┘
/*➔ inject_shadow_root {{{*/
let inject_shadow_root = function()
{
/*{{{*/
let caller = TAXO_TOOLS_ID+".inject_shadow_root";
let log_this = false;

if( log_this) console.log(caller);
/*}}}*/
    /* HTML FRAGMENT .. [shadow_host.shadowRoot] {{{*/
    let html_fragment;// = document.getElementById( taxo_content.get_used_shadow_host_id() ).shadowRoot;
    let shadow_host      = document.getElementById( taxo_content.get_used_shadow_host_id() );
    if(!shadow_host)
    {
if( log_this) console.log("...shadow_host ["+taxo_content.get_used_shadow_host_id()+"] ADDED");

        shadow_host     = document.createElement("DIV");
        shadow_host.id  = taxo_content.get_used_shadow_host_id();

        document.documentElement.appendChild( shadow_host );

        html_fragment
            = shadow_host.attachShadow
            ? shadow_host.attachShadow({mode: "open"})
            : shadow_host;

if( log_this) console.log(html_fragment);
    }
    else {
if( log_this) console.log("...shadow_host ["+taxo_content.get_used_shadow_host_id()+"] EXIST");

        html_fragment = shadow_host.shadowRoot;
    }
    /*}}}*/
    /* [load_taxonomy_tools] {{{*/

    load_taxonomy_tools( html_fragment );

    /*}}}*/
    return html_fragment;
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ HTML CONTENT  .. BUTTON_INLINE_HTML .. BUTTONS_POD_INLINE_CSS         │
    // └───────────────────────────────────────────────────────────────────────┘
/*➔ load_taxonomy_tools {{{*/
let load_taxonomy_tools = function(html_fragment)
{
    /* [BUTTON_INLINE_HTML] {{{*/
    html_fragment.innerHTML
        += BUTTON_INLINE_HTML;

    /*}}}*/
    /* [BUTTONS_POD_INLINE_CSS] {{{*/
    if( BUTTONS_POD_INLINE_CSS_DATA.length > 24)
    {
        let css_el
            = dom_load_css_id_data("buttons_pod_inline_css", BUTTONS_POD_INLINE_CSS_DATA);

        if( css_el )
            html_fragment.appendChild( css_el );
    }

    /*}}}*/
    /* [taxo_tools_css] {{{*/
    let taxo_tools_css_EL
        = dom_load_css_id_data("taxo_tools_css", taxo_tools_css_data);
    if( taxo_tools_css_EL )
        html_fragment.appendChild( taxo_tools_css_EL );

    /*}}}*/
};
/*}}}*/

/* EXPORT .. inject_shadow_root {{{*/
return { inject_shadow_root
    ,    load_taxonomy_tools
};
/*}}}*/
}());

