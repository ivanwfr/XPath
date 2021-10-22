//┌──▼▼▼▼▼▼▼───────────────────────────────────────────────────────────────────┐
//│ [t_details]                                                                │
//└──▲▲▲▲▲▲▲───────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals document, console */ /* eslint-disable-line no-unused-vars */
/* globals localStorage */
/* exported t_details, T_DETAILS_JS_TAG */

/* eslint-disable no-warning-comments */

const T_DETAILS_JS_ID  = "server";
const T_DETAILS_JS_TAG = T_DETAILS_JS_ID    +" (210914:01h:49)";
/*}}}*/
let t_details = (function() {
"use strict";
/*➔ localStorage {{{*/
let localStorage_setItem = function(key,val) { if(val) localStorage.setItem   (key,val); else localStorage.removeItem(key); }; // eslint-disable-line no-unused-vars
let localStorage_getItem = function(key    ) { return  localStorage.getItem   (key    ); }; // eslint-disable-line no-unused-vars
let localStorage_delItem = function(key    ) { /*...*/ localStorage.removeItem(key    ); }; // eslint-disable-line no-unused-vars
/*}}}*/

/*➔ t_details_onload {{{*/
let t_details_onload = function(_caller)
{
/*{{{*/
let log_this=false;
if( log_this) console.log("t_details_onload("+_caller+")");
/*}}}*/
    /* LISTEN TO DETAILS EVENT {{{*/
 let details = document.querySelectorAll("DETAILS");

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
         // COOKIE
//       if(details.open) set_cookie(details.id+"_open", "true");
//       else             del_cookie(details.id+"_open"        );

         // localStorage
         if(details.open) localStorage_setItem(details.id+"_open", "true");
         else             localStorage_delItem(details.id+"_open"        );
     }
    /*}}}*/
     /* IGNORE TOGGLE PROPAGATION CALLBACKS {{{*/
//   let this_MS      = new Date().getTime();
     let elapsed      = (event.timeStamp - details_ontoggle_timeStamp).toFixed(0);
     if(elapsed < DETAILS_ONTOGGLE_COOLDOWN)
     {
//console.log("%c...details_ontoggle ON COOLDOWN: elapsed=["+elapsed+"ms]", "color:#888;")

         return;
     }
//console.log("details_ontoggle: %c"+details.tagName+" #"+details.id+" .. open "+details.open+" .. elapsed=["+elapsed+"]" , (details.open ? "color:lightgreen;":"color:red;"))

         details_ontoggle_timeStamp = event.timeStamp;
     /*}}}*/
     /* ONLOAD ➔ DO NOT CLOSE OTHERS {{{*/
     if(details_onmousedown_shiftkey == undefined) return;

     /*}}}*/
     /* JUST CLOSED OR SHIFT-MODIFIER ➔ DO NOT CLOSE OTHERS {{{*/

     let close_others
         =  ( details.open && !details_onmousedown_shiftkey) // OPENED ➔ [NO SHIFT] ➔ CLOSE OTHERS
         || (!details.open &&  details_onmousedown_shiftkey) // CLOSED ➔ [++ SHIFT] ➔ CLOSE OTHERS
         ;

//console.log("%c...[close_others "+(close_others ?"YES":"NO")+"]", "color: "+(close_others ? "red":"gray")+";")

     if( !close_others ) return;
     /*}}}*/
     /* DETAILS OPENED .. CLOSE OTHERS {{{*/
     let details_parent
         = (details.parentElement.tagName == "LI")
         ?  details.parentElement.parentElement // hop to OL or UL
         :  details.parentElement;
//console.log("%c DETAILS.details_parent: ["+(details_parent.id || details_parent.tagName)+"]", "background-color:#800;")

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
             if(details_sibling.open)
             {
                 details_sibling.open = false;
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
 let details_onmousedown_shiftkey;
 let details_onmousedown = function(event)
 {
     details_onmousedown_shiftkey  = event.shiftKey;
//console.log("details_onmousedown_shiftkey=["+details_onmousedown_shiftkey+"]")
 };
 /*}}}*/

return { t_details_onload };
})();

