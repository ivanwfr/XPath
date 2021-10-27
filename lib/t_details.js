//┌──▼▼▼▼▼▼▼───────────────────────────────────────────────────────────────────┐
//│ [t_details]                                                                │
//└──▲▲▲▲▲▲▲───────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals document, console */ /* eslint-disable-line no-unused-vars */
/* globals localStorage */
/* exported t_details, T_DETAILS_JS_TAG */

/* eslint-disable no-warning-comments */

const T_DETAILS_JS_ID  = "t_details";
const T_DETAILS_JS_TAG = T_DETAILS_JS_ID    +" (211027:19h:13)";
/*}}}*/
let t_details = (function() {
"use strict";
let log_this=false;
/*➔ localStorage {{{*/
let localStorage_setItem = function(key,val) { if(val) localStorage.setItem   (key,val); else localStorage.removeItem(key); }; // eslint-disable-line no-unused-vars
let localStorage_getItem = function(key    ) { return  localStorage.getItem   (key    ); }; // eslint-disable-line no-unused-vars
let localStorage_delItem = function(key    ) { /*...*/ localStorage.removeItem(key    ); }; // eslint-disable-line no-unused-vars
/*}}}*/

/*➔ t_details_onload {{{*/
let t_details_onload = function(_caller)
{
/*{{{*/
if( log_this) console.log("t_details_onload("+_caller+")");

/*}}}*/
    /* LISTEN TO DETAILS EVENT {{{*/
 let details = document.querySelectorAll("DETAILS");
//console.dir(details)

 Array.from(details).forEach( (el) => {
     el.addEventListener("mousedown", details_onmousedown);
     el.addEventListener("toggle"   , details_ontoggle   ); }
     );

    /*}}}*/
    /* OPEN DETAILS THAT WERE OPEND AT THE END OF LAST PAGE VISIT {{{*/
 Array.from(details).forEach( (el) => {
     let open = el.id && localStorage_getItem(el.id+"_open");
     if( open ) {
if( log_this) console.log("details.onload: "+el.id+" open");
        el.open = true;
     }
    /*}}}*/
 });

    details_radio_set_from_localStorage(_caller);
};
/*}}}*/
/*_ details_radio_set_from_localStorage {{{*/
/*{{{*/
let details_radio_checkbox;

/*}}}*/
let details_radio_set_from_localStorage = function(_caller)
{
//console.log("details_radio_set_from_localStorage("+_caller+")")//FIXME
//console.trace()

   let id = "details_radio";

   details_radio_checkbox
        = get_tool( id );

   if(  details_radio_checkbox )
        details_radio_checkbox.checked
            = localStorage_getItem( id );
};
/*}}}*/
 /*_ details_ontoggle {{{*/
/*{{{*/
const DETAILS_ONTOGGLE_COOLDOWN = 500;

let   details_ontoggle_timeStamp;
/*}}}*/
let details_ontoggle = function(event)
{
/*{{{*/
    let details = event.target;
    if(!details ) return;

/*}}}*/
    /* STORAGE {{{*/
    if(details.id) {
        // [COOKIE]
//      if(details.open) set_cookie(details.id+"_open", "true");
//      else             del_cookie(details.id+"_open"        );

        // [localStorage]
        if(details.open) localStorage_setItem(details.id+"_open", "true");
        else             localStorage_delItem(details.id+"_open"        );
    }
    /*}}}*/
    /* IGNORE TOGGLE PROPAGATION CALLBACKS {{{*/
    //   let this_MS      = new Date().getTime();
    let elapsed      = (event.timeStamp - details_ontoggle_timeStamp).toFixed(0);
    if(elapsed < DETAILS_ONTOGGLE_COOLDOWN)
    {
if(log_this) console.log("%c...details_ontoggle ON COOLDOWN: elapsed=["+elapsed+"ms]", "color:#888;");

        return;
    }
if(log_this) console.log("details_ontoggle: %c"+details.tagName+" #"+details.id+" .. open "+details.open+" .. elapsed=["+elapsed+"]" , (details.open ? "color:lightgreen;":"color:red;"));

    details_ontoggle_timeStamp = event.timeStamp;
    /*}}}*/
    /* ONLOAD ➔ DO NOT CLOSE OTHERS .. return {{{*/
    if(details_onmousedown_shiftKey == undefined) return;

    /*}}}*/
    /* ALT ➔ PROPAGATE SAME OPEN STATE TO OTHERS .. return {{{*/
    let details_sibling_open_state = false;
    if( details_onmousedown_altKey )
    {
        details_sibling_open_state = details.open;

if(log_this) console.log(" ➔ %c PROPAGATE SAME OPEN STATE TO OTHERS [open "+details_sibling_open_state+"]", "background-color: "+(details_sibling_open_state ?  "#080":"#880"));
    }
    /*}}}*/
    /* JUST CLOSED OR SHIFT-MODIFIER ➔ DO NOT CLOSE OTHERS {{{*/
    else {

        let close_others_behavior
            = details_radio_checkbox && details_radio_checkbox.checked;

        let reversed
            = close_others_behavior && details_onmousedown_shiftKey;

        let close_others
            =  (close_others_behavior && ( details.open && !reversed)) ? "OPENED ➔ [NO SHIFT] ➔ CLOSE OTHERS"
            :  (close_others_behavior && (!details.open &&  reversed)) ? "CLOSED ➔ [++ SHIFT] ➔ CLOSE OTHERS"
            :  false;

if(log_this) {
    let style =           "border: "+(close_others_behavior ? "2px solid orange" : "1px solid gray")+";"
        +                  "color: "+(close_others          ?              "red" : "gray"          )+";"
        +       "background-color: "+(reversed              ?             "#808" : "black"         )+";"
    ;
    console.log(" ➔ %c["+ close_others +"]", style);
}

        if( !close_others ) return;
    }
    /*}}}*/
    /* DETAILS OPENED .. CLOSE OTHERS {{{*/
    let details_parent
        = (details.parentElement.tagName == "LI")
        ?  details.parentElement.parentElement // hop to OL or UL
        :  details.parentElement;
if(log_this) console.log("%c DETAILS.details_parent: ["+(details_parent.id || details_parent.tagName)+"]", "background-color:#800;");

    for(let i=0; i<details_parent.children.length; ++i) {
        //  details_sibling {{{
        let details_sibling  = details_parent.children[i];
        if( details_sibling.tagName == "LI") details_sibling = details_sibling.children[0];
        //console.log("...["+ details_sibling.tagName + (details_sibling.id ? (" "+details_sibling.id) : "")+"]")

        //}}}
        // skip just opened or closed event target {{{
        if(details_sibling == event.target) continue;

        //}}}
        // close details_sibling {{{
        if(details_sibling.tagName == "DETAILS")
        {
            if(details_sibling.open != details_sibling_open_state)
            {
                details_sibling.open = details_sibling_open_state;
                if(details_sibling.id)
                {
                    //                  del_cookie(details_sibling.id+"_open");
                    localStorage_delItem(details_sibling.id+"_open");
                }
                //console.log("%c...closing ["+(details_sibling.id || details_sibling.tagName)+"]", "color:orange;")
            }
        }
        //}}}
    }
    /*}}}*/
};
 /*}}}*/
 /*_ details_onmousedown {{{*/
/*{{{*/
 let details_onmousedown_shiftKey;
 let details_onmousedown_altKey;

/*}}}*/
 let details_onmousedown = function(event)
 {
     details_onmousedown_shiftKey  = event.shiftKey;
     details_onmousedown_altKey    = event.altKey;
//console.log("➔ details_onmousedown_shiftKey=["+ details_onmousedown_shiftKey +"]")
//console.log("➔ details_onmousedown_altKey..=["+ details_onmousedown_altKey   +"]")
 };
 /*}}}*/

/*_ details_radio_toggle {{{*/
let details_radio_toggle = function(e)
{
/*{{{*/
if(log_this) console.log("details_radio_toggle("+e.target.tagName+")");

/*}}}*/
   /* input {{{*/
   let    id = "details_radio";
   let input = (e.target.tagName == "INPUT")
    ?           e.target
    :           get_tool(id);
if(log_this) console.log("➔ input=["+input.tagName+"]");

/*}}}*/
    /* toggle {{{*/
    if(e.target != input) input.checked = !input.checked;

/*}}}*/
    /* UI {{{*/
//  if(input.checked) input.parentElement.classList.add   ("selected");
//  else              input.parentElement.classList.remove("selected");
//  let container = document .getElementById("todo"   );
    let container = document.documentElement;
    let details   = container.querySelectorAll("DETAILS");
    Array.from(details).forEach( (el) => { el.open = false; });

/*}}}*/
   /* store {{{*/
   if( input.checked   ) localStorage_setItem(id, "true");
   else                  localStorage_delItem(id        );

/*}}}*/
};

/*}}}*/
/*_ get_tool {{{*/
let get_tool = function(id)
{
    if( id.includes(" ") ) return null;
    let selector
        = (id.charAt(0) != ".") && (id.charAt(0) != "#")
        ?  "#"+id
        :      id;

    let el;
    try {
        if(!el)         el = document   .querySelector(selector);
    }
    catch(ex) { console.log("selector=["+selector+"]"); console.warn(ex); }

    return el;
};
/*}}}*/

return { t_details_onload
    ,    details_radio_toggle
};
})();

