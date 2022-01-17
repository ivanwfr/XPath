// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [event_listeners] ....................................................... │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals document */
/* globals window */

/* globals xpath_content */
/* globals taxo_content */
/* globals lib_util */
/* globals lib_log */

/* exported EVENT_LISTENERS_TAG, event_listeners */

/* eslint-disable no-warning-comments */

const EVENT_LISTENERS_ID       = "event_listeners";
const EVENT_LISTENERS_TAG      =  EVENT_LISTENERS_ID  +" (220106:21h:46)";
/*}}}*/
let   event_listeners = (function() {
"use strict";

/*_ add_listeners {{{*/
const CAPTURE_TRUE_PASSIVE_FALSE  = {capture:true, passive:false};

let add_listeners_done = false;
let add_listeners = function()
{
if(xpath_content.options.LOG1_STEP) {
    //( add_listeners_done ) lib_log.log   (EVENT_LISTENERS_ID+" ➔ add_listeners: add_listeners_done");
    if(!add_listeners_done ) lib_log.logBIG(EVENT_LISTENERS_ID+" ➔ add_listeners", 3);
}
    if( add_listeners_done ) return;

   /**/ add_listeners_done = true;
//lib_log.log_caller()

    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device) {
        window.addEventListener("touchstart"        , on_touchstart        , CAPTURE_TRUE_PASSIVE_FALSE);
        window.addEventListener("touchend"          , on_touchend          , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    else {
        window.addEventListener("mousedown"         , on_mousedown         , CAPTURE_TRUE_PASSIVE_FALSE);
        window.addEventListener("mouseup"           , on_mouseup           , CAPTURE_TRUE_PASSIVE_FALSE);
    }

    window    .addEventListener("keydown"           , on_keydown           , CAPTURE_TRUE_PASSIVE_FALSE);

    window    .addEventListener("resize"            , on_resize            , CAPTURE_TRUE_PASSIVE_FALSE);
    window    .addEventListener("orientationchange" , on_orientationchange , CAPTURE_TRUE_PASSIVE_FALSE);

    window    .addEventListener("beforeunload"      , on_beforeunload      , CAPTURE_TRUE_PASSIVE_FALSE);
};
/*}}}*/

/*_ on_touchstart {{{*/
let on_touchstart           = function(e)
{
    if(   !lib_util.is_el_child_of_tagName( e.target , "SUMMARY")
       &&            !get_el_event_handler( e.target )
      )
    {
        xpath_content.div_tools_onDown(e);
         taxo_content.div_tools_onDown(e);
    }
};
/*}}}*/
/*_ on_touchend {{{*/
let on_touchend             = function(e)
{
    if(   !lib_util.is_el_child_of_tagName( e.target , "SUMMARY")
       &&            !get_el_event_handler( e.target )
      )
    {
        xpath_content.div_tools_onUp(e);
         taxo_content.div_tools_onUp(e);
    }
};
/*}}}*/

/*_ on_mousedown {{{*/
let on_mousedown            = function(e)
{
    xpath_content.div_tools_onDown(e);
     taxo_content.div_tools_onDown(e);
};
/*}}}*/
/*_ on_mouseup {{{*/
let on_mouseup              = function(e)
{
    xpath_content.div_tools_onUp(e);
     taxo_content.div_tools_onUp(e);
};
/*}}}*/

/*_ on_keydown {{{*/
let on_keydown              = function(e)
{
    xpath_content.div_tools_onKey(e);
     taxo_content.div_tools_onKey(e);
};
/*}}}*/

/*_ on_resize {{{*/
let on_resize               = function(e)
{
    xpath_content.div_tools_onResize(e);
     taxo_content.div_tools_onResize(e);
};
/*}}}*/
/*_ on_orientationchange {{{*/
let on_orientationchange    = function(e)
{
    xpath_content.xpath_tools_onOrientationchange_CB(e);
     taxo_content.taxo_tools_onOrientationchange_CB (e);
};
/*}}}*/

/*_ on_beforeunload {{{*/
let on_beforeunload         = function(e)
{
    xpath_content.div_tools_beforeunload(e);
     taxo_content.div_tools_beforeunload(e);
};
/*}}}*/

/* $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/script/dom_tools.js */
/* $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/script/dom_util.js  */
/*_ get_el_event_handler {{{*/
let get_el_event_handler = function(el)
{
    while(                              el
        && !get_el_mouse_event_handler( el )
        && !get_el_onkey_event_handler( el )
        && !get_el_input_event_handler( el ))
        el                            = el.parentElement;

    return (el             == null) ? null
        :  (el.onclick     != null) ? el.onclick
        :  (el.ondblclick  != null) ? el.ondblclick
        :  (el.onmousedown != null) ? el.onmousedown
        :  (el.onmouseup   != null) ? el.onmouseup
        :  (el.onkeypress  != null) ? el.onkeypress
        :  (el.onkeyup     != null) ? el.onkeyup
        :  (el.onchange    != null) ? el.onchange
        :                             null;
};
/*}}}*/
/*_ get_el_mouse_event_handler {{{*/
let get_el_mouse_event_handler = function(el)
{
    if(!el)                     return null;
    if( el.onmousedown != null) return el.onmousedown;
    if( el.onmouseup   != null) return el.onmouseup  ;
    if( el.touchstart  != null) return el.onmouseup  ;
    if( el.touchend    != null) return el.onmouseup  ;
    if( el.onclick     != null) return el.onclick    ;
    if( el.ondblclick  != null) return el.ondblclick ;
    else                        return null;
};
/*}}}*/
/*_ get_el_onkey_event_handler {{{*/
let get_el_onkey_event_handler = function(el)
{
    if(!el)                    return null;
    if(el.onkeydown   != null) return el.onkeydown  ;
    if(el.onkeypress  != null) return el.onkeypress ;
    if(el.onkeyup     != null) return el.onkeyup    ;
    else                       return null;
};
/*}}}*/
/*_ get_el_input_event_handler {{{*/
let get_el_input_event_handler = function(el)
{
    if(!el)                    return null;
    if(el.onchange    != null) return el.onchange   ;
    if(el.onfocus     != null) return el.onfocus    ;
    if(el.onselect    != null) return el.onselect   ;
    if(el.oninput     != null) return el.oninput    ;
    if(el.onsubmit    != null) return el.onsubmit   ;
    if(el.onblur      != null) return el.onblur     ;
    else                       return null;
};
/*}}}*/

return { add_listeners
       , on_resize
};
})();

event_listeners.add_listeners();

/*
:e xpath_embedded.html
:e javascript/xpath_content.js
:e javascript/taxo_content.js
:e javascript/event_listeners.js
*/
