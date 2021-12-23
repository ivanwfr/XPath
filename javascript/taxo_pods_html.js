// ┌───────────────────────────────────────────────────────────────────────────┐
// │ taxo_pods_html.js ==== CONTENT SCRIPT ========== _TAG (211222:13h:59) === │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/

/* globals  console, window, document */

/* exported TAXO_PODS_HTML_TAG, taxo_pods_html */

const TAXO_PODS_HTML_ID    = "taxo_tree";
const TAXO_PODS_HTML_TAG   =  TAXO_PODS_HTML_ID  +" (201116:19h:13)";
/*}}}*/
let   taxo_pods_html       = (function() {
"use strict";
const log_this = false;

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ CSS .. ➔ DYNAMIC JS-INLINING of [stylesheet/buttons_pod.css] ........ │
    // └───────────────────────────────────────────────────────────────────────┘
  /** [buttons_pod_css_data] {{{*/
/*
../stylesheet/buttons_pod.css
*/
let buttons_pod_css_data ="data:text/css,"+ escape(`
/*INLINE{{{*/

   #buttons_pod_css_tag { content: "buttons_pod_css (211222:00h:47)";       }

button                 { font-size : unset; }
                       .buttons_pod                { display               : grid;        }

                       .buttons_pod.row_col_1x3    { grid-template-columns : repeat( 1, 1fr); }
                       .buttons_pod.row_col_1x3    { grid-template-rows    : repeat( 1, 1fr); }

                       .buttons_pod.row_col_10x3   { grid-template-columns : repeat(10, 1fr); }
                       .buttons_pod.colx1          { grid-template-columns :            1fr ; }
                       .buttons_pod                { padding               : 0                      !important; }
                       .buttons_pod                { border-width          : 0                      !important; }
                       .buttons_pod>*::first-letter{ font-size             : 120%                   !important; }
                       .buttons_pod>*.fixed        { box-shadow            : 1px 1px 1px #EEE       !important; }
                       .buttons_pod>*.fixed        { font-size             : 48px                   !important; }

                       .buttons_pod>*              { transition            : all       150ms ease-in
                           ,                         top       150ms cubic-bezier(.14,1.04,.64,.79)
                           ,                         left      150ms cubic-bezier(.14,1.04,.64,.79)
                           ,                         height    150ms cubic-bezier(.14,1.04,.64,.79)

                                                 }
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
.buttons_pod          { white-space      : nowrap;                              }
.buttons_pod          { user-select      : none;                                }
.buttons_pod>*>*      { pointer-events   : none;                                }

.buttons_pod           { transition : top 100ms ease-in, left 100ms ease-out; }
.button_in_out div     { transition : all 500ms ease-out          !important; }
.buttons_pod          { position         : fixed;                               }

.buttons_pod          { margin           : 0                        !important; }
.buttons_pod          { border-radius    : 0.5em;                               }
.buttons_pod          { box-shadow       : -3px -3px 1px #EEE inset !important; }
.buttons_pod          { padding          : 0.1em                    !important; }

.buttons_pod.pressed  { box-shadow       : none                     !important; }
.buttons_pod.pressed  { border-width     : 1px                      !important; }
.buttons_pod.pressed  { outline-width    : 0                        !important; }
.buttons_pod>*       { border : unset !important;}
.buttons_pod         { border-radius : 0.5em;                  }
.buttons_pod.pressed { border        : none;                   }
.buttons_pod:focus   { border        : transparent !important; }
.buttons_pod:focus   { outline       : transparent !important; }
#taxo_tree_shadow_host          { position  : fixed; top:0; left:0; }
#taxo_tree_shadow_host          { z-index   : 2147483600; }

#taxo_single                    { user-select  : none; white-space : nowrap; cursor:auto; }
#taxo_clear                     { user-select  : none; white-space : nowrap; cursor:auto; }
#taxo_multi                     { user-select  : none; white-space : nowrap; cursor:auto; }

#taxo_single                    { grid-column-start : 1; grid-column-end : 2; }
#taxo_clear                     { grid-column-start : 1; grid-column-end : 2; }
#taxo_multi                     { grid-column-start : 1; grid-column-end : 2; }

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
#taxo_clear.cleared::after      { content : '\\2600'; font-size : 200%; margin-left:-20%; color:red; transition:all 150ms ease-out; }
#taxo_multi.selected::after     { content : '\\21F6'; color:red; transition:all 150ms ease-out;                                     }
.buttons_pod>*                   { line-height      : 1.2em           !important; }

.buttons_pod>*                   { margin           : 2px   0.5em; padding: 0.0em 0.5em; }

.buttons_pod>*::after            { display          : inline-block; }
.buttons_pod>*::after            { height           : 1em;          }
.buttons_pod                     {              background-color : #D8D; }
.buttons_pod>*:nth-child(10n+1)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #964B00); }
.buttons_pod>*:nth-child(10n+2)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #FF0000); }
.buttons_pod>*:nth-child(10n+3)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #FFA500); }
.buttons_pod>*:nth-child(10n+4)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #FFFF00); }
.buttons_pod>*:nth-child(10n+5)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #9ACD32); }
.buttons_pod>*:nth-child(10n+6)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #6495ED); }
.buttons_pod>*:nth-child(10n+7)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #EE82EE); }
.buttons_pod>*:nth-child(10n+8)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #A0A0A0); }
.buttons_pod>*:nth-child(10n+9)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #FFFFFF); }
.buttons_pod>*:nth-child(10n+0)  { color: #000; background       : linear-gradient(to left, rgba(136,136,136,0.3), rgba(136,136,136,0.3) 90%, #202020); }

.buttons_pod>*.selected          { background       : #FFF !important; }
.buttons_pod>*.selected.leaf     { background       : #FFF !important; }

.buttons_pod>*.selected          { box-shadow       : 2px 2px 2px 1px #888;              }

.buttons_pod>*                   { border           : 2px solid  transparent !important; }
.buttons_pod>*.selected          { border           : 2px solid  #000        !important; }
.buttons_pod>*.selected.leaf     { border-radius    : 1.0em;                             }

.buttons_pod>*.selected          { margin-left      : 0.0em                  !important; }

.buttons_pod>*.clicked           { margin-left      : 1.0em                  !important; }
.buttons_pod>*.clicked           { background-color : rgba(255,255,255,0.66);            }
.buttons_pod>*.clicked           { box-shadow       : 1px 1px 1px 1px #888;              }

.buttons_pod>*.selected::before  { content          : "\\2714";                               }
.buttons_pod>*.clicked::after    { content          : '\\2192'; float: right; padding: 0 5px; }
.buttons_pod>*.collected         { border           : 2px solid  #000        !important;     }
.buttons_pod>*.collected         { margin-left      : 0.0em                  !important; }
.buttons_pod>*.collected         { background       : #FFF !important;                       }
.buttons_pod>*.collected::before { content          : "\\2714";                               }
.buttons_pod>*.collected::after  { content          : '\\2714\\2714\\2714'; float: right; padding: 0 5px; }
/*INLINE}}}*/
/*# sourceURL=buttons_pod.css */
`
)
 .replace(/\\(\\x+)/g,"\\\\$1")
;
/*}}}*/
/*_ [buttons_pod_css] {{{*/
let  buttons_pod_css;
/*_ dom_load {{{*/
let dom_load = function(html_fragment)
{
    try {

        window.addEventListener("error", load_onerror, false);

        buttons_pod_css = load_css_EL("buttons_pod_css", buttons_pod_css_data);
        if(buttons_pod_css.href.length < 128)
        {
            let error_msg = "[buttons_pod_css_data] IS MISSING";
            console.log   ("%c *** "+error_msg+" *** ", "font-size:200%; background-color:red;");
            console.error (TAXO_PODS_HTML_ID+": "+error_msg);
        }

        html_fragment.appendChild( buttons_pod_css );
    }
    catch(ex) {
        console.log(TAXO_PODS_HTML_ID   +": LOADING DATA .. catch");
        console.dir(ex);
    }
    finally {
//console.log(TAXO_PODS_HTML_ID+": LOADING DATA .. finally: buttons_pod_css.length=["+buttons_pod_css.length+"]")
        window.removeEventListener("error", load_onerror, false);
    }
};
/*}}}*/
/*… load_onerror {{{*/
let load_onerror_count = 0;
let load_onerror = function(e)
{
    console.log("%c "+TAXO_PODS_HTML_TAG      +" %c * load_onerror #"+(++load_onerror_count)
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
/*_ [BUTTONS_POD_CSS] {{{*/

/*
:/<style>/+,/<\/style>/-d|-read!sed -e 's;\\\\;\\\\\\\\;' stylesheet/buttons_pod.css
*/
const BUTTONS_POD_CSS =
`
<style>


</style>
`;
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ HTML .. [BUTTON_HTML] ............................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
const BUTTON_HTML =
`
<button id="div_tools" class="movable buttons_pod row_col_1x3">
 <span id='taxo_single'></span>
 <span id='taxo_clear' ></span>
 <span id='taxo_multi' ></span>
</button>
`;

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ inject_shadow_root .. [shadow_host BUTTONS_POD_CSS BUTTON_HTML] ..... │
    // └───────────────────────────────────────────────────────────────────────┘
/* inject_shadow_root {{{*/
/*{{{*/
const SHADOW_HOST_ID   = "taxo_tree_shadow_host";

/*}}}*/
let inject_shadow_root = function()
{
/*{{{*/
let caller = "inject_shadow_root";

if(log_this) console.log(caller);
/*}}}*/
    /* HTML FRAGMENT .. shadow_host .. shadowRoot {{{*/
    let html_fragment;
    let shadow_host = document.getElementById( SHADOW_HOST_ID );
    if(!shadow_host)
    {
if(log_this) console.log("...ADDING [shadow_host]");

        shadow_host = document.createElement("DIV");
        shadow_host.id  = SHADOW_HOST_ID;

        document.documentElement.appendChild( shadow_host );

        html_fragment
            = shadow_host.attachShadow
            ? shadow_host.attachShadow({mode: "open"})
            : shadow_host;

if(log_this) console.log(html_fragment);
    }
    else {
if(log_this) console.log("...OK shadow_host");

        html_fragment = shadow_host.shadowRoot;
    }
    /*}}}*/

    /* POPULATE HTML */
    html_fragment.innerHTML
        = ((BUTTONS_POD_CSS.length > 64) ? BUTTONS_POD_CSS : "")
        +  BUTTON_HTML;

    /* POPULATE CSS */
    dom_load( html_fragment );

    return html_fragment;
};
/*}}}*/

/* EXPORT .. inject_shadow_root {{{*/
return { inject_shadow_root , SHADOW_HOST_ID };
/*}}}*/
}());

