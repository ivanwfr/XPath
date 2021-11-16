/*┌──▼▼▼▼▼▼▼▼▼───────────────────────────────────────────────────────────────┐*/
/*│ [t_details]                                                              │*/
/*└──▲▲▲▲▲▲▲▲▲───────────────────────────────────────────────────────────────┘*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* eslint-disable no-warning-comments   */

/* globals console                      */
/* globals document                     */
/* globals localStorage                 */





/* exported t_details, T_DETAILS_JS_TAG */

const T_DETAILS_JS_ID  = "t_details";
const T_DETAILS_JS_TAG = T_DETAILS_JS_ID    +" (211030:05h:49)";
/*}}}*/
let t_details           = (function() {
"use strict";
let   DOM_DETAILS_LOG   = false;
let   DOM_DETAILS_TAG   = false;
/*{{{*/
const DETAILS_RADIO_ID = "details_radio";

/*}}}*/

/*➔ localStorage {{{*/
let localStorage_setItem = function(key,val) { if(val) localStorage.setItem   (key,val); else localStorage.removeItem(key); }; // eslint-disable-line no-unused-vars
let localStorage_getItem = function(key    ) { return  localStorage.getItem   (key    ); }; // eslint-disable-line no-unused-vars
let localStorage_delItem = function(key    ) { /*...*/ localStorage.removeItem(key    ); }; // eslint-disable-line no-unused-vars
/*}}}*/
//_ DEPENDENCIES {{{
/* placeholders {{{*/
let log               = console.log;
let logBIG            = log;
let log_key_val_group = log;

let get_tool          = function(id)   { return document.getElementById( id ); };
let get_nodeXPath     = function(node) { return "wouldbe_xpath_of("+get_id_or_tag(node)+")"; };
/*}}}*/
/*_ get_el_child_with_tag {{{*/
let get_el_child_with_tag = function(parent,tag)
{
    for(let     c  = 0; c < parent.children.length; ++c) {
        let child  = parent.children[c];
        if((child != null) && (child.tagName == tag))
            return child;
    }
    return null;
};
/*}}}*/
/*_ get_el_sibling_with_tag {{{*/
let get_el_sibling_with_tag = function(el,tag)
{
    for(let     c  = 0; c < el.parentElement.children.length; ++c) {
        let child  =        el.parentElement.children[c];
        if((child != null) && (child.tagName == tag) && (child != el))
            return child;
    }
    return null;
};
/*}}}*/
/*_ add_el_class , del_el_class {{{*/
let add_el_class        = function(el, className) { if(!el || !el.classList) return      ; if(   !el.classList.contains( className )) el.classList.add   ( className ); };
let del_el_class        = function(el, className) { if(!el || !el.classList) return      ; if(    el.classList.contains( className )) el.classList.remove( className ); };
/*}}}*/
/*_ get_id_or_tag {{{ */
let get_id_or_tag = function(node)
{
    return !node           ? ("null_node"                        )
        :   node.id        ? ("#"+ node.id                       )
        :   node.className ? (node.tagName+"."+ node.classList[0])
        :                    (node.tagName                       )
    ;
};
/*}}}*/
/*_ get_id_or_tag_and_className {{{ */
let get_id_or_tag_and_className = function(node)
{
    let result
        = !node           ? ("null_node"                        )
        :  node.id        ? ("#"+ node.id                       )
        :  node.className ? (node.tagName+"."+ node.classList[0])
        :                   (node.tagName                       )
    ;
    return result+((node && node.className) ? (" "+node.className) : "");

};
/*}}}*/
//}}}

/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ 1. LISTEN TOGGLE DETAILS OPEN STATE       [localStorage details_id_open] │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
let details_handler = (function() {
/*➔ details_onload {{{*/
let details_onload = function()
{
/*{{{*/
let caller = "details_onload";
let log_this = DOM_DETAILS_LOG;

if(log_this) logBIG(caller, 8);
/*}}}*/
    /* ➔ RESTORE ONLOAD [open] STATE .. f(localStorage) {{{*/
    let        details_array = document.querySelectorAll("DETAILS");
    Array.from(details_array).forEach( (el) => {
        let open = el.id && localStorage_getItem(el.id+"_open");
        if( open ) {
            el.open = true;
if(log_this) log("➔ "+el.id+(el.open ? " OPENED":" NOT OPENED"));
        }
    });

    /*}}}*/
    /* 1. LISTEN TO DETAILS EVENT {{{*/
    Array.from(details_array).forEach( (el) => {
        if(!el.id) return;
        el.addEventListener("mousedown", details_onmousedown);
        el.addEventListener("toggle"   , details_ontoggle   );
    });

    /*}}}*/
    /* 2. DETAILS RADIO-BEHAVIOR {{{*/
    details_radio_set_from_localStorage();

    /*}}}*/
    /* 3. OPEN LINKS HASH TARGETS DETAILS-CONTAINERS {{{*/
    details_add_hash_link_onclick_listener();

    /*}}}*/
};
/*}}}*/
 /*_ details_onmousedown {{{*/
/*{{{*/
 let details_onmousedown_shiftKey;
 let details_onmousedown_altKey;

/*}}}*/
 let details_onmousedown = function(e)
 {
     details_onmousedown_shiftKey  = e.shiftKey;
     details_onmousedown_altKey    = e.altKey;
//log("➔ details_onmousedown_shiftKey=["+ details_onmousedown_shiftKey +"]")
//log("➔ details_onmousedown_altKey..=["+ details_onmousedown_altKey   +"]")
 };
 /*}}}*/
/*_ details_ontoggle {{{*/
/*{{{*/
const DETAILS_ONTOGGLE_COOLDOWN = 500;

let   details_ontoggle_timeStamp;
/*}}}*/
let details_ontoggle = function(e)
{
if(details_ontoggle_listener_mutex) return;
/*{{{*/
let caller = "details_ontoggle";
let log_this= DOM_DETAILS_LOG;

    let details_el = e.target;
    if(!details_el ) return;

if( log_this) log(caller+"("+e.target.tagName+") .. open=["+e.target.open+"] ➔ details_el=["+(details_el.id || details_el.firstElementChild.textContent)+"] .. open=["+details_el.open+"]");
/*}}}*/
    /* STORAGE {{{*/
    if(details_el.id) {
        // [localStorage]
        if(details_el.open) localStorage_setItem(details_el.id+"_open", "true");
        else                localStorage_delItem(details_el.id+"_open"        );

        // [COOKIE]
//      if(details_el.open) set_cookie(details_el.id+"_open", "true");
//      else                del_cookie(details_el.id+"_open"        );
    }
    /*}}}*/
    /* IGNORE TOGGLE PROPAGATION CALLBACKS {{{*/
    //   let this_MS      = new Date().getTime();
    let elapsed      = (e.timeStamp - details_ontoggle_timeStamp).toFixed(0);
    if( elapsed      < DETAILS_ONTOGGLE_COOLDOWN)
    {
if(log_this) log("%c...ON COOLDOWN: elapsed=["+elapsed+"ms]", "color:#888;");

        return;
    }
if(log_this) log("%c..."+details_el.tagName+" #"+details_el.id+" .. open "+details_el.open+" .. elapsed=["+elapsed+"]" , (details_el.open ? "color:lightgreen;":"color:red;"));

    details_ontoggle_timeStamp = e.timeStamp;
    /*}}}*/
    /* ONLOAD ➔ DO NOT CLOSE OTHERS .. return {{{*/
    if(details_onmousedown_shiftKey == undefined) return;

    /*}}}*/
    /* 1/2 - ALT ➔ PROPAGATE SAME OPEN STATE TO OTHERS {{{*/
    if( details_onmousedown_altKey )
    {
        let state = details_el.open ? "open" : "close";

        details_ontoggle_set_siblings_state(details_el, state);
    }
    /*}}}*/
    /* 2/2 - JUST CLOSED OR SHIFT-MODIFIER ➔ DO NOT CLOSE OTHERS {{{*/
    else {

        let close_others_behavior
            =  details_radio_el
            && (    details_radio_el.checked
                 || details_radio_el              .classList.contains("checked")
                 || details_radio_el.parentElement.classList.contains("checked")
               );

        let reversed
            =   close_others_behavior && details_onmousedown_shiftKey;

        let close_others
            =  (close_others_behavior && ( details_el.open && !reversed)) ? "OPENED ➔ [NO SHIFT] ➔ CLOSE OTHERS"
            :  (close_others_behavior && (!details_el.open &&  reversed)) ? "CLOSED ➔ [++ SHIFT] ➔ CLOSE OTHERS"
            :  false;

/*{{{*/
if(log_this) {
    let style =           "border: "+(close_others_behavior ? "2px solid orange" : "1px solid gray")+";"
        +                  "color: "+(close_others          ?              "red" : "gray"          )+";"
        +       "background-color: "+(reversed              ?             "#808" : "black"         )+";"
    ;
    log(" ➔ %c["+ close_others +"]", style);
}
/*}}}*/

        if     (!details_el.open ) details_ontoggle_close_children    ( details_el         );
        else if( close_others    ) details_ontoggle_set_siblings_state( details_el, "close");
    }
    /*}}}*/
};
/*}}}*/
/*_ details_ontoggle_set_siblings_state {{{*/
let details_ontoggle_set_siblings_state = function(details_el,state)
{
/*{{{*/
let   caller = "details_ontoggle_set_siblings_state";
let log_this = DOM_DETAILS_LOG;

if(log_this || DOM_DETAILS_TAG) logBIG(caller+"("+get_id_or_tag_and_className(details_el)+", "+state+")");
/*}}}*/
    /* [details_parent] {{{*/
    let details_parent
        = (details_el.parentElement.tagName == "LI")
        ?  details_el.parentElement.parentElement // hop to OL or UL
        :  details_el.parentElement;

if(log_this) log("%c...details_parent: ["+(details_parent.id || details_parent.tagName)+"]", "background-color:#800;");
    /*}}}*/
    /* set siblings state {{{*/
    for(let i=0; i<details_parent.children.length; ++i)
    {
        //  details_sibling {{{
        let details_sibling  = details_parent.children[i];
        if( details_sibling.tagName == "LI") details_sibling = details_sibling.children[0];
//log("...["+ details_sibling.tagName + (details_sibling.id ? (" "+details_sibling.id) : "")+"]")

        //}}}
        // skip just opened or closed details_el {{{
        if(details_sibling == details_el) continue;

        //}}}
        /* close other sibling {{{*/
        if(details_sibling.tagName == "DETAILS")
        {
            details_sibling.open = (state == "open");

            if(details_sibling.id)
            {
                if(details_sibling.open) localStorage_setItem(details_sibling.id+"_open", "true");
                else                     localStorage_delItem(details_sibling.id+"_open"        );
//              del_cookie(          details_sibling.id+"_open");
            }
        }
        /*}}}*/
    }
    /*}}}*/
};
/*}}}*/
/*_ details_ontoggle_close_children {{{*/
let details_ontoggle_close_children = function(parent_details)
{
/*{{{*/
let   caller = "details_ontoggle_close_children";
let log_this = DOM_DETAILS_LOG;

if( log_this) logBIG(caller+"("+get_id_or_tag_and_className(parent_details)+") .. open=["+parent_details.open+"]", 2);
/*}}}*/

    let el_array
        = Array.from( parent_details.querySelectorAll("DETAILS[open]") );

    el_array.forEach( (child_details) => {

        child_details.open = false;

        if(child_details.id)
        {
            let key = child_details.id+"_open";
            localStorage_delItem( key );
        }
    });
};
/*}}}*/
return { details_onload };
})();

/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ 2. DETAILS RADIO-BEHAVIOR                   [localStorage details_radio] │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
/*➔ details_radio_toggle {{{*/
let details_radio_toggle = function(e)
{
/*{{{*/
//log("details_radio_toggle")
//log("DOM_DETAILS_LOG=["+DOM_DETAILS_LOG+"]")

if(DOM_DETAILS_LOG) log("details_radio_toggle("+e.target.tagName+")");
/*}}}*/
    /* INPUT {{{*/
    let { input , details_radio_el } = get_details_radio_checkbox(e);

    /*}}}*/
    /* GET CURRENT STATE {{{*/
    let state
        = input
        ? ((e.target != input) ? input.checked : !input.checked)
        : details_radio_el.classList.includes("checked");

    /*}}}*/
    /* NEW TOGGLE STATE {{{*/
    state = !state;

    if( input && (!e || (input != e.target))) /* update if not the event initiator */
        input.checked = state;

    /*}}}*/
    /* ➔ [TOGGLE details_radio_el.checked] {{{*/
    if( details_radio_el )
    {
        if(state) add_el_class(details_radio_el, "checked"); /* state [false ➔  true] */
        else      del_el_class(details_radio_el, "checked"); /* state [ true ➔ false] */
    }

    /*}}}*/
    /* STORE NEW STATE {{{*/
    if(state) localStorage_setItem(DETAILS_RADIO_ID, "true");
    else      localStorage_delItem(DETAILS_RADIO_ID        );

    /*}}}*/
/*{{{*/
if(DOM_DETAILS_LOG || DOM_DETAILS_TAG)
    log_key_val_group("details_radio_toggle: ...state=["+state+"]"
        , { state
          , input
          , details_radio_el
          , e
          , e_target : (e ? e.target : "")
        }
        , (state ? 4:8)
        , false);
/*}}}*/
};
/*}}}*/
/*_ details_radio_set_from_localStorage {{{*/
let details_radio_set_from_localStorage = function()
{
/*{{{*/
if(DOM_DETAILS_LOG) log("details_radio_set_from_localStorage");

/*}}}*/
    /* UI [input] [details_radio_el] {{{*/
    let { input , details_radio_el } = get_details_radio_checkbox();

    if(!input) return;
    /*}}}*/
    /* GET STORED STATE {{{*/
    let state = localStorage_getItem( DETAILS_RADIO_ID );

    /*}}}*/
    /* SHOW STATE {{{*/
    if( input )
        input.checked = state;

    if(state) add_el_class(input.parentElement, "checked");
    else      del_el_class(input.parentElement, "checked");
    /*}}}*/
/*{{{*/
if(DOM_DETAILS_LOG)
    log_key_val_group("details_radio_set_from_localStorage: ...state=["+state+"]"
        , { state
          , input
          , details_radio_el
        }
        , (state ? 4:8)
        , false);
/*}}}*/
};
/*}}}*/
/*_ get_details_radio_checkbox {{{*/
/*{{{*/
let details_radio_el;

/*}}}*/
let get_details_radio_checkbox = function(e)
{
/*{{{*/
let caller = "get_details_radio_checkbox";

/*}}}*/
    /* Clicked target or DETAILS_RADIO_ID {{{*/
    if(!details_radio_el)
        details_radio_el = get_tool( DETAILS_RADIO_ID );

    let el
        = (e)
        ?  e.target
        :  details_radio_el;

if(DOM_DETAILS_LOG) log(caller+": ["+DETAILS_RADIO_ID+"] ➔ el=["+get_id_or_tag(el)+"]");
    if(!el) return {};

    /*}}}*/
    /* [input] {{{*/
    let input
        =                         ((el.tagName == "INPUT") && el)
        || get_el_child_with_tag  ( el          , "INPUT")
        || get_el_sibling_with_tag( el          , "INPUT");


    /*}}}*/
/*{{{*/
if(DOM_DETAILS_LOG)
    log_key_val_group(caller+": ...return ["+(input ? input.tagName : "")+"]"
        , { e
          , e_target         : (e ? e.target : "")
          , el
          , details_radio_el : get_nodeXPath( details_radio_el )+" ["+get_id_or_tag( details_radio_el )+"]"
          , input            : get_nodeXPath( input            )+" ["+get_id_or_tag( input            )+"]"
        }
        , 4
        , true);
/*}}}*/
    return { input , details_radio_el };
};
/*}}}*/

/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ 3. OPEN LINKS HASH TARGETS DETAILS-CONTAINERS     ➔ [put target in view] │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/


/*_ details_add_hash_link_onclick_listener {{{*/
let details_add_hash_link_onclick_listener = function() {};

/*}}}*/


/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ ➔ OPEN-CLOSE ALL DETAILS CONTAINERS                                      │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/


/* details_ontoggle_listener_mutex {{{*/

let   details_ontoggle_listener_mutex;

/*}}}*/



/* EXPORT */
/*{{{*/



return { details_onload         : details_handler.details_onload
    ,    details_radio_toggle
};
/*}}}*/
})();

/*
:e  $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/javascript/dom_details.js
:cd %:h/..|pwd
*/

