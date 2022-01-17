/* lub_util_js */
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */
/* JSHint {{{*/
/* globals window, document, navigator */
/* globals localStorage                */
/* globals lib_log                     */
/* globals console                     */
/* globals Node                        */
/* globals Document                    */

/* exported lib_util, LIB_UTIL_JS_TAG */

/* eslint-disable no-warning-comments */
/*
:update|1,$y *
:!start explorer https://jshint.com/
*/
/*}}}*/
const LIB_UTIL_JS_ID        = "lib_util";
const LIB_UTIL_JS_TAG       = LIB_UTIL_JS_ID  +" (220110:16h:55)";  // eslint-disable-line no-unused-vars
let lib_util    = (function() {
/*➔ LOG {{{*/
"use strict";
    let log_this = false;
/* eslint-disable no-unused-vars */
/*➔ lib_log {{{*/

  let   lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX;
  let   lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb          ;
  let   lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX;

let   log;
let   logXXX;
let   log_key_val;
let   log_key_val_group;

/*}}}*/
/*➔ report_require_lib_log {{{*/
let report_require_lib_log = function()
{
    /* eslint-disable no-unused-vars */

    ({ lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX } = lib_log.LOG_BG_CSS);
    ({ lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX } = lib_log.LOG_FG_CSS);
    ({ lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb           } = lib_log.LOG_XX_CSS);

    log                                 = lib_log.log;
    logXXX                              = lib_log.logXXX;
    log_key_val                         = lib_log.log_key_val;
    log_key_val_group                   = lib_log.log_key_val_group;

    /* eslint-enable  no-unused-vars */
};
/*}}}*/
if(lib_log) report_require_lib_log();
/* eslint-enable  no-unused-vars */
/*}}}*/

/*➔ add del has el_class {{{*/
let add_el_class        = function(el, className) { if(!el || !el.classList) return      ; if(   !el.classList.contains( className )) el.classList.add   ( className ); };
let del_el_class        = function(el, className) { if(!el || !el.classList) return      ; if(    el.classList.contains( className )) el.classList.remove( className ); };
let has_el_class        = function(el, className) { if(!el || !el.classList) return false; return el.classList.contains( className );                                   };
let set_el_class_on_off = function(el, className, on_off)
{
    if(on_off) add_el_class(el, className);
    else       del_el_class(el, className);

};
/*}}}*/

/*➔ ellipsis {{{*/
const HORIZONTAL_ELLLIPSIS = "\u2026";
const ELLIPSIS_DEFAULT_LEN = 96;
const ELLIPSIS_SHORT_LEN   = 48;

let ellipsis_16 = function(msg)
{
    return mPadEnd( ellipsis(msg, 16) , 16);
};

let ellipsis_short = function(msg)
{
    return ellipsis(msg, ELLIPSIS_SHORT_LEN);
};

let ellipsis = function(_msg, len=ELLIPSIS_DEFAULT_LEN)
{
    let msg = show_CR_LF( String(_msg) );
    return (msg.length    <= len)
        ?   msg
        :   msg.substring(0, len-3)+HORIZONTAL_ELLLIPSIS
    ;
};
/*}}}*/

/*➔ is_el_visible {{{*/
let is_el_visible = function(el)
{
    let     bcr = el.getBoundingClientRect();
    return (bcr.width && bcr.height);
};
/*}}}*/
/*➔ get_el_ancestor_xy {{{*/
let get_el_ancestor_xy = function(el)
{
    let     bcr = el.getBoundingClientRect();
    while(el && !bcr.width && !bcr.height)
    {
        el = el.parentElement;             // looking for a visible ancestor
        if(  el )
            bcr = el.getBoundingClientRect();
    }
    return { x: bcr.x , y: bcr.y } ;
};
/*}}}*/
/*➔ get_el_xy {{{*/
let get_el_xy = function(el)
{
    if(!el) return null;
    let  x = 0;
    let  y = 0;

    let cs = window.getComputedStyle(el);

    if(   (cs.position == "fixed"   )
       || (cs.position == "absolute")
      ) {
/*{{{
log("%c"+(el.id || el.tagName)+" "+cs.position,lbH+lf7);
}}}*/
        x   = el.offsetLeft;
        y   = el.offsetTop ;
    }
    else {
/*{{{
log("%c"+(el.id || el.tagName)+" "+cs.position,lbH+lf8);
}}}*/
        while(el) {
            x  += el.offsetLeft;
            y  += el.offsetTop ;
            el  = el.offsetParent; // eslint-disable-line no-param-reassign
        }
/*{{{
        let r = el.getBoundingClientRect();
        y     = r.top  + window.scrollY;
        x     = r.left + window.scrollX;
}}}*/
    }

    return { x , y };
};
/*}}}*/
/*➔ get_id_or_tag {{{ */
let get_id_or_tag = function(node)
{
    let result = "";

    if(     !node                  ) result =                       "null_node"           ;
    else if( node.id               ) result =                       "#"+ node.id          ;
    else if( node.className        ) result = node.tagName         +"."+ node.classList[0];
    else if(!node.parentElement    ) result = "REMOVED ELEMENT"    +">"+node.tagName      ;
    else if( node.parentElement.id ) result = node.parentElement.id+">"+node.tagName      ;
    else                             result = node.tagName                                ;

    return result;
};
/*}}}*/
/*➔ get_n_lbl {{{ */
let get_n_lbl = function(node)
{
    if(!node                 ) return "null_node";
    if( node == window       ) return "window";
    if( node == document.body) return "body";

/*  if(node.id    ) try { return            node.tagName +"#"+ node.id                                ; } catch(ex) {} */

    if(node.id    ) try { return       "#"+ node.id                                                   ; } catch(ex) {}
    if(node.title ) try { return "title=["+ node.title +"]"                                           ; } catch(ex) {}

    let                          n_lbl  = null;
    try                 {        n_lbl  = node.tagName +(node.className ? ("."+ node.className) : "") ; } catch(ex) {}
    if(   n_lbl )   try {        n_lbl += " .. TEXT=["+ truncate(node.textContent,  24)+"]"           ; } catch(ex) {}
    if(   n_lbl )         return n_lbl;

    try                 { return              "TEXT=["+ truncate(node.textContent,  24)+"]"           ; } catch(ex) {}
    try                 { return                                 node.tagName                         ; } catch(ex) {}
    try                 { return                                 node.nodeType                        ; } catch(ex) {}

    return "";
};
/*}}}*/
/*➔ get_n_txt{{{ */
let get_n_txt = function(node)
{
    if(!node) return "null_node";
    return strip_CR_LF( ellipsis(node.textContent.trim(), 64) );
};
/*}}}*/
/*➔ get_el_child_with_id {{{*/
let get_el_child_with_id = function(parent,id)
{
    for(let     c  = 0; c < parent.children.length; ++c) {
        let child  = parent.children[c];
        if((child != null) && (child.id == id))
            return child;
    }
    return null;
};
/*}}}*/

/* SHADOW_HOST_ID DIV_TOOLS_ID */
/*{{{*/
const DIV_TOOLS_ID        = "div_tools";
const SHADOW_HOST_ID      = "shadow_host";
const USE_LIB_SHADOW_ROOT = true;

let shadow_host;
let shadow_root;
/*}}}*/
/*➔ get_nodeXPath {{{*/
let get_nodeXPath = function(node)
{
    if(node instanceof Document) return "/";

    let  node_type_pos_array;
    for( node_type_pos_array = []
    ;    node && !(node instanceof Document)
    ;    node =   (node.nodeType == Node.ATTRIBUTE_NODE)
              ?    node.ownerElement
              :    node.parentNode
    ) {
        let node_type_pos = {};

        /* TYPE */
        switch( node.nodeType ) {
            case Node.TEXT_NODE                   : node_type_pos.name =                   "text()" ; break;
            case Node.ATTRIBUTE_NODE              : node_type_pos.name =       "@" + node.nodeName  ; break;
            case Node.PROCESSING_INSTRUCTION_NODE : node_type_pos.name = "processing-instruction()" ; break;
            case Node.COMMENT_NODE                : node_type_pos.name =                "comment()" ; break;
            case Node.ELEMENT_NODE                : node_type_pos.name =             node.nodeName  ; break;
        }

        /* POS */
        node_type_pos.position = get_nodeName_rank( node );

        node_type_pos_array.push( node_type_pos );
    }

    let nodeXPath = "";
    for(let i=node_type_pos_array.length-1; i >= 0; i -= 1)
    {
        let node_type_pos   = node_type_pos_array[i];
        nodeXPath += node_type_pos.name ? ("/"+node_type_pos.name) : ".";
        if((node_type_pos.position != null) && (node_type_pos.position != "1"))
            nodeXPath += "["+ node_type_pos.position+"]";
    }

    return nodeXPath.toLowerCase();
};
/*}}}*/
/*_ clr_shadow_host {{{*/
let clr_shadow_host = function()
{
    shadow_host = null;
    shadow_root = null;
};
/*}}}*/
/*➔ get_shadow_host {{{*/
let get_shadow_host = function(shadow_host_id = SHADOW_HOST_ID)
{
//  if(!shadow_host) {
        shadow_host = document.getElementById( shadow_host_id );
//  }
    return shadow_host;
};
/*}}}*/
/*➔ get_shadow_root {{{*/
let get_shadow_root = function(shadow_host_id = SHADOW_HOST_ID)
{
//  if(!shadow_root)
//  {
        shadow_host = get_shadow_host( shadow_host_id );
        shadow_root = shadow_host ? shadow_host.shadowRoot : null;
//  }
    return shadow_root;
};
/*}}}*/
/*➔ get_tool {{{*/
let get_tool = function(id,shadow_host_id)
{
    get_shadow_root( shadow_host_id );
//if( shadow_root) console.log("shadow_host.id=["+shadow_host.id+"]")

    if( id.includes(" ") ) return null;
    let selector
        = (id.charAt(0) != ".") && (id.charAt(0) != "#")
        ?  "#"+id
        :      id;

    let el;
    try {
        if(shadow_root) el = shadow_root.querySelector(selector);
        if(!el)         el = document   .querySelector(selector);
    }
    catch(ex) { if(log_this) { console.log("selector=["+selector+"]"); console.warn(ex); } }

/*{{{
console.log({ callee    : "get_tool("+id+")"
            , return_el : "["+(el ? (el.id || el.tagName) : null)+"]"
            , selector  : "["+selector+"]"
            , shadow_root
});
}}}*/
    return el;
};
/*}}}*/
/*_ get_div_tools {{{*/
let get_div_tools = function()
{
    return get_tool(DIV_TOOLS_ID, SHADOW_HOST_ID);
};
/*}}}*/
/*➔ is_a_tool_el {{{*/
let is_a_tool_el = function(el)
{
    if(!shadow_root) get_shadow_root();

    if(!shadow_root) return false;
    else             return is_el_child_of_el(el, shadow_root);
};
/*}}}*/

/*➔ get_id_or_tag_and_className {{{ */
let get_id_or_tag_and_className = function(node)
{
    let result
        = !node                         ?  "null_node"
        :  node.id                      ? (                                "#"+node.id                                    )
        :  node.className               ? (                                    node.tagName+" class='"+ node.className+"'")
        : !node.parentElement           ? ("null_parent"                  +">"+node.tagName                               )
        :  node.parentElement.id        ? (node.parentElement.id          +">"+node.tagName                               )
        :                                 (                                    node.tagName                               )
    ;
    return result;//+((node && node.className) ? (" "+node.className) : "");

};
/*}}}*/
/*➔ get_event_XY {{{*/
let get_event_XY = function(e)
{
    let x, y;
    if(e.changedTouches) {
        x = parseInt(e.changedTouches[0].clientX);
        y = parseInt(e.changedTouches[0].clientY);
    }
    else {
        x = parseInt(                  e.clientX);
        y = parseInt(                  e.clientY);
    }
    return { x , y };
};
/*}}}*/
/*➔ get_range_from_caret {{{*/
let get_range_from_caret = function(x, y)
{
/*{{{*/
let   caller = "get_range_from_caret";

/*}}}*/
    /* [caretRangeFromPoint] {{{*/
    let  range = null;

    if(!range     && document.caretRangeFromPoint)
    {
        try {
            range =  document.caretRangeFromPoint(x,y); /* within the current viewport */
        }
        catch(ex) {
            log(caller+": "+ex, "caretRangeFromPoint failed");
        }
    }
    /* }}}*/
    /* [caretPositionFromPoint] {{{*/
    if(!range     && document.caretPositionFromPoint)
    {
        try {
            range =  document.caretPositionFromPoint(x,y);
        }
        catch(ex) {
            log(caller+": "+ex, "caretPositionFromPoint failed");
        }
    }
    /* }}}*/
if(log_this) log_range(range, caller+"(x="+x+" , y="+y+")");
    return range;
};
/*}}}*/
/*  log_range {{{*/
let log_range = function(range, _caller="")
{
    if(!range) {
        log(_caller+": range=["+range+"]");
        return;
    }

    log_key_val_group(_caller
                      ,{ document_caretPositionFromPoint : typeof document.caretPositionFromPoint
                       ,    document_caretRangeFromPoint : typeof document.caretRangeFromPoint
                       ,                    typeof_range : typeof range

                       ,            range_startContainer : range.startContainer
                       ,               range_startOffset : range.startOffset
                       ,      startContainer_textContent : get_range_textContent(range.startContainer)

                       ,              range_endContainer : range.endContainer
                       ,                 range_endOffset : range.endOffset
                       ,        endContainer_textContent : get_range_textContent(range.  endContainer)

                       ,                 range_collapsed : range.collapsed
                       ,                 node_type       : get_range_node_type(range)
                       ,                range_offsetNode : range.offsetNode /* i.e. Firefox */
                       ,                           range
                      }, lf7, false);
};

let get_range_textContent = function(node)
{
    return node
        ? strip_CR_LF( ellipsis(node.textContent.trim(), 64) )
        : ""
    ;
};

let get_range_node_type = function(range)
{
    let node = (range.startContainer || range.offsetNode);
    return node
        ? node.nodeName
        : "null node"
    ;
};

/*}}}*/
/*➔ has_scrollable_parent {{{*/
let has_scrollable_parent = function(e_target)
{
//console.clear()
    let    el =   get_el_parent_with_overflow(e_target);
    if(    el
      ) {
//log("%c PARENT WITH OVERFLOW %c"+el.tagName+" %c"+get_id_or_tag_and_className( el ), lbL+lf0, lbC+lf3, lbR+lf4)

        if(   (el.clientWidth  < el.scrollWidth)
           || (el.clientHeight < el.scrollHeight)
          ) {
//log(" CLIENT  WH=["+el.clientWidth +" "+el.clientHeight+"]")
//log(" SCROLL  WH=["+el.scrollWidth +" "+el.scrollHeight+"]")

            return el;
        }
    }
    return null;
};
/*}}}*/
/*➔ has_scrollbar {{{*/
/*{{{*/
const SCROLLABLE_TEXT_MIN_LENGTH = 12; /* as an attempt to skip button names */

/*}}}*/
let has_scrollbar = function(el)
{
    return has_scrollbar_x(el)
        || has_scrollbar_y(el)
    ;
};
/*}}}*/
/*➔ has_scrollbar_x {{{*/
let has_scrollbar_x = function(el)
{
/*{{{*/
let   caller = "has_scrollbar_x";

/*}}}*/
    if( !el                                                ) return false;
    if( !el.scrollHeight                                   ) return false;
    if( !el.clientHeight                                   ) return false;
    if(  el.textContent.length < SCROLLABLE_TEXT_MIN_LENGTH) return false;

    let cs = window.getComputedStyle(el);

    let scrollbar_HEIGHT = el.offsetHeight
        - (  parseInt(cs.borderTopWidth   )
           + parseInt(el.clientHeight)
           + parseInt(cs.borderBottomWidth)
          );

    let is_top_el
        = ((el == document.body) || (el == document.documentElement));

    let result
        = is_top_el
        ? ((window.innerHeight  > document.documentElement.offsetHeight) &&  "WINDOW_TALLER")
        : ((    el.offsetHeight >                       el.clientHeight) && "ELEMENT_TALLER")
    ;
/*{{{*/
if( log_this) {
    let         bcr = el.getBoundingClientRect();

    log_key_val_group(caller+"( "+get_id_or_tag(el      )+" ) ...return "+result
                , { OFFSET_SCROLL_CLIENT  :  "---"
                  , el_scrollHeight       :  el.scrollHeight
                  , el_offsetHeight       :  el.offsetHeight
                  , el_clientHeight       :  el.clientHeight
                  , ELEMENT_TALLER        : (el.offsetHeight > el.clientHeight)

                  , BOUNDINGS             :  "---"
                  , bcr_height            :  bcr.height

                  , MARGIN_BORDER_PADDING :  "---"
                  , cs_margin             :  cs.margin
                  , cs_border             :  cs.border
                  , cs_padding            :  cs.padding

                  , TOP_HEIGHT_BOTTOM     :  "---"
                  , cs_marginTop          :  cs.marginTop
                  , cs_borderTop          :  cs.borderTop
                  , cs_paddingTop         :  cs.paddingTop
                  , cs_height             :  cs.height
                  , cs_paddingBottom      :  cs.paddingBottom
                  , cs_borderBottom       :  cs.borderBottom
                  , cs_marginBottom       :  cs.marginBottom

                  , SCROLLBAR             :  "---"
                  , scrollbar_HEIGHT      :  scrollbar_HEIGHT+" = [el.offsetHeight "+ parseInt(el.offsetHeight)+"] - ( [cs.borderTop "+parseInt(cs.borderTop)+"] + [el.clientHeight "+parseInt(el.clientHeight)+"] + [cs.borderBottom "+parseInt(cs.borderBottom)+"] )"

                  , WINDOW                :  "---"
                  , is_top_el
                  ,   HTML_offsetHeight   :  document.documentElement.offsetHeight
                  , WINDOW_innerHeight    :  window.innerHeight
                  , WINDOW_outerHeight    :  window.outerHeight
                  , WINDOW_TALLER         : (window.innerHeight > document.documentElement.offsetHeight)

                  , caller                :  lib_log.get_callers()
                  , result                :  result+" [scrollbar_HEIGHT "+scrollbar_HEIGHT+"]"
                } ,lbH+lfX[result ? 4:8], false);
}
/*}}}*/
    return result;
};
/*}}}*/
/*➔ has_scrollbar_y {{{*/
let has_scrollbar_y = function(el)
{
/*{{{*/
let   caller = "has_scrollbar_y";

/*}}}*/
    if( !el                                                ) return false;
    if( !el.scrollWidth                                    ) return false;
    if( !el.clientWidth                                    ) return false;
    if(  el.textContent.length < SCROLLABLE_TEXT_MIN_LENGTH) return false;

    let cs = window.getComputedStyle(el);

    let scrollbar_WIDTH = el.offsetWidth
        - (  parseInt(cs.borderLeftWidth  )
           + parseInt(el.clientWidth )
           + parseInt(cs.borderRightWidth )
          );

    let is_top_el
        = ((el == document.body) || (el == document.documentElement));

    let result
        = is_top_el
        ? ((window.innerWidth  > document.documentElement.offsetWidth) &&  "WINDOW_WIDER")
        : ((    el.offsetWidth >                       el.clientWidth) && "ELEMENT_WIDER")
    ;

/*{{{*/
if( log_this) {
    let         bcr = el.getBoundingClientRect();

    log_key_val_group(caller+"( "+get_id_or_tag(el      )+" ) ...return "+result
                , { OFFSET_SCROLL_CLIENT  :  "---"
                  , el_scrollWidth        :  el.scrollWidth
                  , el_offsetWidth        :  el.offsetWidth
                  , el_clientWidth        :  el.clientWidth
                  , ELEMENT_WIDER         : (el.offsetWidth > el.clientWidth)

                  , BOUNDINGS             :  "---"
                  , bcr_width             :  bcr.width

                  , MARGIN_BORDER_PADDING :  "---"
                  , cs_margin             :  cs.margin
                  , cs_border             :  cs.border
                  , cs_padding            :  cs.padding

                  , LEFT_WIDTH_RIGHT      :  "---"
                  , cs_marginLeft         :  cs.marginLeft
                  , cs_borderLeft         :  cs.borderLeft
                  , cs_paddingLeft        :  cs.paddingLeft
                  , cs_width              :  cs.width
                  , cs_paddingRight       :  cs.paddingRight
                  , cs_borderRight        :  cs.borderRight
                  , cs_marginRight        :  cs.marginRight

                  , SCROLLBAR             :  "---"
                  , scrollbar_WIDTH       :  scrollbar_WIDTH+" = [el.offsetWidth "+ parseInt(el.offsetWidth)+"] - ( [cs.borderLeft "+parseInt(cs.borderLeft)+"] + [el.clientWidth "+parseInt(el.clientWidth)+"] + [cs.borderRight "+parseInt(cs.borderRight)+"] )"

                  , WINDOW                :  "---"
                  , is_top_el
                  ,   HTML_offsetWidth    :  document.documentElement.offsetWidth
                  , WINDOW_innerWidth     :  window.innerWidth
                  , WINDOW_outerWidth     :  window.outerWidth
                  , WINDOW_WIDER          : (window.innerWidth > document.documentElement.offsetWidth)

                  , caller                :  lib_log.get_callers()
                  , result                :  result+" [scrollbar_WIDTH "+scrollbar_WIDTH+"]"
                } ,lbH+lfX[result ? 4:8], false);
}
/*}}}*/
    return result;
};
/*}}}*/

/*➔ mPadStart .. mPadEnd {{{*/
let mPadStart = function(s,l,c=" ") { s = String(s); while(s.length < l) s = c+s; return s; }; // eslint-disable-line no-unused-vars

let mPadEnd   = function(s,l,c=" ") { s = String(s); while(s.length < l) s = s+c; return s; };
/*}}}*/

/*➔ localStorage {{{*/
let localStorage_setItem = function(key,val) { if(val) localStorage.setItem   (key,val); else localStorage.removeItem(key); }; // eslint-disable-line no-unused-vars
let localStorage_delItem = function(key    ) { /*...*/ localStorage.removeItem(key    ); }; // eslint-disable-line no-unused-vars
let localStorage_getItem = function(key    ) { return  localStorage.getItem   (key    ); }; // eslint-disable-line no-unused-vars
/*}}}*/

/*➔ show_CR_LF {{{*/
const SYMBOL_DOWN_LEFT_ARROW        = "\u21B5";

const regexp_CR                 = new RegExp("\\r"                          , "g");
const regexp_LF                 = new RegExp("\\n"                          , "g");

let show_CR_LF = function(text)
{
    return text
        .   replace(regexp_CR,  "")
        .   replace(regexp_LF, SYMBOL_DOWN_LEFT_ARROW)
        .   trim()
    ;
};
/*}}}*/
/*➔ strip_CR_LF {{{*/
let strip_CR_LF = function(text)
{
    return text
        .   replace(regexp_CR,  "")
        .   replace(regexp_LF, " ")
        .   trim()
    ;
};
/*}}}*/
/*➔ strip_HTML {{{*/
const regexp_HTML = new RegExp("<[^>]*>", "g");
let strip_HTML = function(text)
{
    return text
        .   replace(regexp_HTML,  "")
        .   trim()
    ;
};
/*}}}*/
/*➔ truncate {{{*/
let truncate = function(_msg, length=80)
{
    let msg = strip_CR_LF( String(_msg) );
    return (msg.length <= length)
        ?   msg
        :   msg.substring(0, length-3)+"..."
    ;
};
/*}}}*/

/* CSV {{{*/
/*➔ csv_contains {{{*/
let csv_contains = function(csv, val)
{
    return (csv_pos(csv,val) > 0);
};
/*}}}*/
/*➔ csv_escape .. csv_unescape {{{*/
/*{{{*/
const APOST_HTM = "&apos;";
const COMMA_HTM = "&comma;";
const COMMA_ASC = ",";
const APOST_ASC = "'";

const regexp_APOST_ASC          = new RegExp(APOST_ASC                      , "g");
const regexp_APOST_HTM          = new RegExp(APOST_HTM                      , "g");
const regexp_COMMA_ASC          = new RegExp(COMMA_ASC                      , "g");
const regexp_COMMA_HTM          = new RegExp(COMMA_HTM                      , "g");

/*}}}*/
let csv_escape = function(text)
{
    return text
        .   replace(regexp_COMMA_ASC, COMMA_HTM)
        .   replace(regexp_APOST_ASC, APOST_HTM)
    ;
};

let csv_unescape = function(text) // eslint-disable-line no-unused-vars
{
    return text
        .   replace(regexp_COMMA_HTM, COMMA_ASC)
        .   replace(regexp_APOST_HTM, APOST_ASC)
    ;
};
/*}}}*/
/*➔ csv_ins {{{*/
let csv_ins = function(csv, val)
{
    if(                     !val  ) return csv;
    val = csv_escape(val);
    if(             !csv          ) return val;
    if( csv_contains(csv,    val) ) return csv; /* as a SET (i.e. NOT as a BAG) */
    return           val+","+csv;
};
/*}}}*/
/*➔ csv_pos {{{*/
let csv_pos = function(csv,val)
{
    if(       !val) return 0;
    if(!csv       ) return 0;

    if(val == csv) return 1;

    let a = csv.split(",");
    for(let i=0; i < a.length; ++i)
    {
        if(val == a[i]) return (i+1);
    }

    return 0;
};
/*}}}*/
/*➔ comma_to_vbar    {{{*/
let comma_to_vbar = function(text)
{
    return text
        .   replace(regexp_COMMA_ASC, "|")
    ;
};
/*}}}*/
/*}}}*/

/*➔ t_get_panel_scale {{{*/
let t_get_panel_scale = function(panel)
{
/*{{{
May have to use window.screen.width
...not required as of 190206
:!start explorer "https://stackoverflow.com/questions/5603615/get-the-scale-value-of-an-element"
}}}*/

    let    cw = parseInt(panel.getBoundingClientRect().width);
    let    pw = parseInt(panel.offsetWidth);
    let scale = (cw && pw)
        ?        parseInt(0.5 + (cw / pw) * 100) / 100
        :        1;
/*{{{
log("t_get_panel_scale("+get_n_lbl(panel)+"): ...return "+scale);
}}}*/
    return scale;
};
/*}}}*/

/* EVENT */
/*{{{*/
const   MOVED_ENOUGH = 64;

let     has_moved;
let     onDown_EL;

let     onDown_XY    = { x:0, y:0 };

let     onFrom_XY    = { x:0, y:0 };
let     onMove_XY    = { x:0, y:0 };
let     onSum_DXY    = { x:0, y:0 };

/*}}}*/
/*_ get_onMove_RESULT {{{*/
let get_onMove_RESULT = function()
{
    return { onDown_EL , onDown_XY, onMove_XY, has_moved };
};
/*}}}*/
/*_ get_onMove_XY {{{*/
let get_onMove_XY = function()
{
    return onMove_XY;
};
/*}}}*/
/*_ get_touch_behavior {{{*/
/*{{{*/
let behavior_TOUCH_ELSE_DESKTOP;

/*}}}*/
let get_touch_behavior = function()
{
    /* f(navigator.appVersion) {{{*/
    if(behavior_TOUCH_ELSE_DESKTOP == undefined)
    {
        let appVersion
            = navigator.appVersion.toLowerCase();

        behavior_TOUCH_ELSE_DESKTOP
            =  !appVersion.includes("windows")
            && !appVersion.includes("hp"     )
            && !appVersion.includes("mac"    )
            && !appVersion.includes("sunos"  )
        ;

//log_key_val_group(   "get_touch_behavior"
//                  , {   behavior_TOUCH_ELSE_DESKTOP
//                      , has_ontouchstart : ("ontouchstart" in document.documentElement)
//                      , appVersion
//                  });

    }
    /*}}}*/
    return behavior_TOUCH_ELSE_DESKTOP;
};
/*}}}*/
/*➔ cancel_event {{{*/
let cancel_event = function(event)
{
/*{{{
console.log("lib_util.cancel_event:")
console.dir({ cancelable               : event.cancelable
            , stopPropagation          : event.stopPropagation
            , stopImmediatePropagation : event.stopImmediatePropagation
            , preventDefault           : event.preventDefault
});
}}}*/

    if(!event.cancelable               ) return;
    if( event.stopPropagation          ) event.stopPropagation         (); /* capturing and bubbling phases */
    if( event.stopImmediatePropagation ) event.stopImmediatePropagation(); /* other listeners of the same event */
    if( event.preventDefault           ) event.preventDefault          (); /* browser agent default .. (checkbox toggle) */
};
/*}}}*/
/*➔ get_event_target {{{*/
/*{{{*/
let event_target_last_e;
let event_target_last_e_target;

/*}}}*/
let get_event_target = function(e,_log_this) // eslint-disable-line complexity
{
/*{{{*/
let caller = "get_event_target";

if(log_this || _log_this) lib_log.log("%c"+caller+"%c"+e.type+" on "+get_id_or_tag((e.path ? e.path[0] : e.target)),lbb+lbH,lbb+lb4);
/*}}}*/
    /* SAME THAN LAST EVENT {{{*/
    if(e === event_target_last_e)
    {
/*{{{*/
if(log_this || _log_this)
    log("%c...returning last target %c"+get_id_or_tag(event_target_last_e_target), lf8, lbH+lf8);

/*}}}*/
        return event_target_last_e_target;
    }
    /*}}}*/
    /* NEW EVENT {{{*/
    let e_target = e.target ? e.target  : undefined;
    let e_path_0 =  e.path  ? e.path[0] : undefined;
    let e_path_1 =  e.path  ? e.path[1] : undefined;
/*{{{*/
if(log_this || _log_this) {
    log_key_val_group("...event path and target"
                      , { e_target
                        , e_path_0
                        , e_path_1
                        , e_originalTarget         : e.originalTarget
                        , e_explicitOriginalTarget : e.explicitOriginalTarget
                        ,                  callers : lib_log.get_callers()
                      }, lf7, false
                     );

}
/*}}}*/

    /*}}}*/
    /*  e_target .. f(event) {{{*/
    /* [event.target] {{{
     * A reference to the object that dispatched the event.
     * It is different from [event.currentTarget]
     * . when the event handler is called
     * . during the bubbling
     * . or capturing phase of the event.
     }}} */
    if     (e.path && (e_path_0.tagName != "IMG")) { e_target = e_path_0;                 /*log("e.path..................=["+ e.path                   +"]");*/ }
    else if(e.path &&  e_path_1                  ) { e_target = e_path_1;                 /*log("e.path..................=["+ e.path                   +"]");*/ }
    else if(e.originalTarget                     ) { e_target = e.originalTarget;         /*log("e.originalTarget........=["+ e.originalTarget         +"]");*/ }
    else if(e.explicitOriginalTarget             ) { e_target = e.explicitOriginalTarget; /*log("e.explicitOriginalTarget=["+ e.explicitOriginalTarget +"]");*/ }
//  else if(e_target                             ) { e_target = e_target;                 /*log("e_target................=["+ e_target                 +"]");*/ }

    /*}}}*/
    /* skip proxy el {{{*/
    let el;
/*{{{*/
if(log_this || _log_this) {
    let e_parent = e_target.parentElement;
    log_key_val_group("...skipping proxy el"
                      , { e_target_firstElementChild           : e_target ?                         e_target.firstElementChild : ""
                        , e_target_parentElement               : e_parent ?                         e_parent                   : ""
                        , e_target_htmlFor                     : e_target ?                         e_target.htmlFor           : ""
                        , e_target_htmlFor_EL                  : e_target ? document.getElementById(e_target.htmlFor)          : ""
                        , e_target_parentElement_htmlFor       : e_parent ?                         e_parent.htmlFor           : ""
                        , e_target_parentElement_htmlFor_EL    : e_parent ? document.getElementById(e_parent.htmlFor)          : ""
                      }, lf7, false
                     );
}
/*}}}*/
    e_target
        = ((el = e_target.firstElementChild) && (el.tagName == "INPUT")) ? e_target.firstElementChild
        : ((el = e_target                  ) && (el.htmlFor           )) ? (document.getElementById(el.htmlFor) || e_target)
        : ((el = e_target.parentElement    ) && (el.htmlFor           )) ? (document.getElementById(el.htmlFor) || e_target)
        : /*..........................................................*/   e_target
    ;

    /*}}}*/
/*{{{*/
if(log_this || _log_this)
    log("%c...return %c"+get_id_or_tag(e_target), lf7, lbH+lf7);

/*}}}*/
    event_target_last_e        = e;
    event_target_last_e_target = e_target;
    return e_target;
};
/*}}}*/
/*➔ set_onDown_XY {{{*/
let set_onDown_XY = function(e)
{
//console.trace()
//lib_log.log_caller()
    has_moved   = false;
    onDown_EL   = get_event_target(e);

    let    xy   = get_event_XY(e);
    onDown_XY.x = xy.x;
    onDown_XY.y = xy.y;

    onFrom_XY.x = xy.x;
    onFrom_XY.y = xy.y;

    onMove_XY.x = xy.x;
    onMove_XY.y = xy.y;

    onSum_DXY.x = 0;
    onSum_DXY.y = 0;

    return onDown_XY;
};
/*}}}*/
/*➔ set_onMove_XY {{{*/
let set_onMove_XY = function(e)
{
    if(!e) return onMove_XY;

    let    xy   = get_event_XY(e);
    onMove_XY.x = xy.x;
    onMove_XY.y = xy.y;

    let from_dxy
        = { x: xy.x - onFrom_XY.x
          , y: xy.y - onFrom_XY.y
        };

    let abs_dxy
        = { x: Math.abs(from_dxy.x)
          , y: Math.abs(from_dxy.y)
        };

    if(abs_dxy.x > onSum_DXY.x) onSum_DXY.x = abs_dxy.x;
    if(abs_dxy.y > onSum_DXY.y) onSum_DXY.y = abs_dxy.y;

    if(!has_moved)
    {
        has_moved
            = (   (Math.abs(from_dxy.x) >= MOVED_ENOUGH)
               || (Math.abs(from_dxy.y) >= MOVED_ENOUGH)
              );
    }

    return { onDown_EL , onDown_XY, xy: onMove_XY, dxy: { ...from_dxy } , has_moved };
};
/*}}}*/
/*_ set_onFrom_XY .. (CANCEL DRAG SO FAR) {{{*/
let set_onFrom_XY = function(e)
{
    has_moved   = false; /* .. from here */

    let    xy   = get_event_XY(e);
    onFrom_XY.x = xy.x;
    onFrom_XY.y = xy.y;
};
/*}}}*/
/*_ get_has_moved_since_onDown_XY {{{*/
let get_has_moved_since_onDown_XY = function()
{
    let dx = Math.abs(onSum_DXY.x);
    let dy = Math.abs(onSum_DXY.y);

    let move_delta
        = dx > dy
        ? dx : dy;

//logXXX("get_has_moved_since_onDown_XY: move_delta=["+move_delta+"]")
    return (move_delta >= MOVED_ENOUGH);
};
/*}}}*/
/*➔ get_onDown_EL {{{*/
let get_onDown_EL = function()
{
    return onDown_EL;
};
/*}}}*/
/*➔ position_fixed_transitionend {{{*/
let position_fixed_transitionend = function(e)
{
    let caller = "position_fixed_transitionend";

    let e_target = get_event_target(e);
    if(!e_target.saved_layout           ) return;
    if(!e_target.saved_layout.xy        ) return;
    if( has_el_class(e_target, "fixed") ) return; /* NOTHING TO DO WHEN MOVING AWAY FROM CONTAINER */

    let    xy    = get_el_xy(e_target, caller);
    if(   (xy.x != e_target.saved_layout.xy.x)
       || (xy.y != e_target.saved_layout.xy.y)
      )
        return;

/*{{{
log("%c"+caller+"("+get_n_lbl(e_target)+"): "+ e.propertyName.toUpperCase(), lf7);
}}}*/

    /* MOVE EL BACK INTO ITS PARENT CONTAINER */
    e_target.style.position = e_target.saved_layout.position;
    e_target.style.top      = e_target.saved_layout.top ;
    e_target.style.left     = e_target.saved_layout.left;

    delete                    e_target.saved_layout.xy;
};
/*}}}*/

/*➔ get_e_target_tag_child_of {{{*/
let get_e_target_tag_child_of = function(e_target,tagName,container)
{
    let el_array = container.getElementsByTagName(tagName);
//console.log("el_array")
//console.dir( el_array )

    for(let i=0; i< el_array.length; ++i)
    {
//console.log("...el_array["+i+"]=["+get_id_or_tag( el_array[i] )+"]")

        let el =  el_array[i];
        if( is_el_child_of_el(e_target, el) )
            return el.id ? el.id : (el);
    }

    return null;
};
/*}}}*/
/*➔ get_parent_tag_id_class_chain {{{*/
const PREFIX = "                               \u21B3";
let get_parent_tag_id_class_chain = function(el)
{
    let array = [];

    while( el )
    {
        let e_class = (el.id || el.className) ? "left"   : ""     ;
        let i_class = (         el.className) ? "center" : "right";
        let c_class =                                      "right";

        let el_className = ellipsis_short(el.className);

        let rank         = get_nodeName_rank(el);
        let el_tagName   = el.tagName+( (rank > 1) ? "["+rank+"]":"");

        array.push(   (               "<em class='tag   "+e_class+"'>" + el_tagName   +"</em>"     ) /* TAG     */
                   +  (el.id        ? "<em class='id    "+i_class+"'>#"+ el.id        +"</em>" : "") /* ID      */
                   +  (el_className ? "<em class='class "+c_class+"'>."+ el_className +"</em>" : "") /* CLASS   */
                  );
        el = el.parentElement;
    }

    let parent_id_class_chain = "";

    for(let l=0, i=array.length-1; i>=0; ++l, --i)
        parent_id_class_chain
            += ((l>0) ? ("\n "+PREFIX.slice(-l))+" " : "")
            +            array[i];

    return parent_id_class_chain;
};
/*}}}*/
/*_ get_nodeName_rank {{{*/
let get_nodeName_rank = function(node)
{
    if(node.nodeType == Node.ATTRIBUTE_NODE) return null;

    let rank = 1;
    for(let prev_node =      node.previousSibling
    ;       prev_node
    ;       prev_node = prev_node.previousSibling
    ) {
        if(prev_node.nodeName == node.nodeName)
            rank += 1;
    }
    return rank;
 };
/*}}}*/
/*➔ get_el_parent_with_tag {{{*/
let get_el_parent_with_tag = function(el,tag)
{
    if( el.nodeName == "#text")
        el     = el.parentElement;

    while(el && (el.tagName != tag))
        el     = el.parentElement;

    if(    !el                        ) return null;
    return (         tag == el.tagName) ? el : null;
};
/*}}}*/
/*➔ get_el_parent_with_class {{{*/
let get_el_parent_with_class = function(el, className)
{
    while(   el ) {
        if(  el.classList.contains( className )) return el;
        el = el.parentElement; // eslint-disable-line no-param-reassign
    }
    return null;
};
/*}}}*/
/*➔ get_el_parent_with_id {{{*/
let get_el_parent_with_id = function(el,id)
{
    if(          !el              ) return el;   /* return whatever received */
    if(          !el.parentElement) return el;   /* return top el */
    while(        el
          && (   !el.id                          /* no ID */
              || (el.id != id)                   /* or not the expected one */
             )                                   /* keep searching the parent chain */
         )
        el = el.parentElement; // eslint-disable-line no-param-reassign

    return el;                                   /* ID EXPECTED .. or the first DEFINED */
};
/*}}}*/
/*➔ get_el_parent_with_overflow {{{*/
let get_el_parent_with_overflow = function(el)
{
    if( el.nodeName == "#text")
        el     = el.parentElement;

    while(el)
    {
        let cs = window.getComputedStyle(el);
        if(      (cs.overflow == "auto"  )
              || (cs.overflow == "scroll")
          ) {
//console.log("cs.overflow=["+cs.overflow+"]")
            return el;
        }
        el = el.parentElement;
    }

    return null;
};
/*}}}*/
/*➔ is_el_child_of_id {{{*/
let is_el_child_of_id = function(el, id)
{
    while(el && (el.id != id) && (el = el.parentElement)) /* eslint-disable-line no-param-reassign */
        ;
    return (el != null);
};
/*}}}*/
/*➔ is_el_child_of_tagName {{{*/
let is_el_child_of_tagName = function(el, tagName)
{
    while(el && (el.tagName != tagName) && (el = el.parentElement)) /* eslint-disable-line no-param-reassign */
        ;
    return (el != null);
};
/*}}}*/
/*➔ is_el_or_child_of_class {{{*/
let is_el_or_child_of_class = function(el, className)
{
    while(el && !el.classList.contains(className))
        el     = el.parentElement; // eslint-disable-line no-param-reassign
/*{{{
if(el) logBIG("is_el_or_child_of_class("+get_n_lbl(el)+", "+className+") .. ["+get_n_lbl(el)+"]");
}}}*/
    return (el && el.id) ? el.id : (el);
};
/*}}}*/
/*➔ is_el_child_of_el {{{*/
let is_el_child_of_el = function(el, el_parent)
{
    while(el && el_parent && (el != el_parent) && (el = el.parentElement)) /* eslint-disable-line no-param-reassign */
        ;
    return (el == el_parent);
};
/*}}}*/
/*➔ is_parent_or_child {{{*/
let is_parent_or_child = function(parent_el,child)
{
    let    el = child;
    while( el ) {
        if(el == parent_el) return true;
        el = el.parentElement;
    }
    return false;
};
/*}}}*/

/*➔ parseURL {{{*/
const regexp_URL = new RegExp("^([^:]+):\\/\\/(?:([^@]+)@)?([^\\/:]*)?(?::([\\d]+))?(?:(\\/[^#]*)(?:#(.*))?)?$", "i");
/*_________________ SEPARATOR:_________^__^__^__________^________________^________________^_________^________^______*/
/*____________________ AFFIXE:__1111111__________2222222___3333333333_____44444444_____5555555555____66666__________*/
/*_____________________ TOKEN:   scheme:  /  /  userinfo@  host          :port            /path     #fragment       */

let parseURL = function(url)
{
    let result = {};
    let match  = String(url).match(regexp_URL);
    if( match ) {
        result.scheme   = match[1].toLowerCase();
        result.userinfo = match[2];
        result.host     = match[3];
        result.port     = match[4];
        result.path     = match[5] || "/";
        result.fragment = match[6];

        if(result.userinfo) {
            let               a = result.userinfo.split(":");
            result.user     = a[0];
            result.password = a[1];
        }
    }

    return result;
};
/*}}}*/
/*_ get_url_base {{{*/
let get_url_base = function(url)
{
    return (url.startsWith("file:"))
        ? "./"
        : url.match(/^(.*\/)[^\/]*$/ )[1];
};
/*}}}*/
/*_ get_url_domain {{{*/
let get_url_domain = function(url)
{
    if(!url) {
        console.warn("NO DOMAIN FOR UNDEFINED URL");
        console.trace();
    }
    let domain;
    let match;
    if( match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))
    {
        domain     = match[1];
        //  skip sub-domain .. (but keep IP)
        if(  match = domain.match(/^[^\.0-9]+\.(.+\..+)$/))
            domain = match[1];
    }
    return domain;
};
/*}}}*/
/*➔ get_url_path {{{*/
let get_url_path = function(url)
{
    let parsed_url = lib_util.parseURL( url );

    let path       = parsed_url.path.replace(/\//,"");                          // no leading slash
    if(!path) path = parsed_url.host.replace(/(^www\.)?(\w+)(\.\w+$)?/,"$2");   // no extension
    path           = path.replace(/\/$/,"");                                    // no trailing slash
//  path           = path..replace(/.*\//,"");                                  // no leading  folders
    path           = path.replace(/\//g," ");                                   // strip folders slash
    path           = path.replace(/[_\(\)\/-]/g," ");                           // keep chars only
    path           = path.replace(/\s\s+/g," ");                                // keep chars only

//console.log("path=["+path+"] .. url=["+url+"]")
    return path.trim();
};
/*}}}*/

/* EXPORT */
/*{{{*/
return { name : LIB_UTIL_JS_ID
    , DIV_TOOLS_ID
    , SHADOW_HOST_ID
    , USE_LIB_SHADOW_ROOT
    , MOVED_ENOUGH

    // EVENT
    , cancel_event
    , get_event_target
    , get_has_moved_since_onDown_XY
    , get_onDown_EL
    , get_onMove_RESULT
    , get_onMove_XY
    , get_touch_behavior
    , set_onDown_XY
    , set_onFrom_XY
    , set_onMove_XY

    // CLASS
    , add_el_class
    , del_el_class
    , has_el_class

    // SHADOW
    , clr_shadow_host
    , get_shadow_host
    , get_shadow_root

    // ELEMENT
    , get_div_tools
    , get_el_ancestor_xy
    , get_el_xy
    , get_event_XY
    , get_id_or_tag
    , get_id_or_tag_and_className
    , get_n_lbl
    , get_n_txt
    , get_nodeXPath
    , get_range_from_caret
    , get_tool
    , has_scrollable_parent
    , has_scrollbar
    , has_scrollbar_x
    , has_scrollbar_y
    , is_a_tool_el
    , is_el_visible

    , get_e_target_tag_child_of
    , get_el_parent_with_class
    , get_el_parent_with_id
    , get_el_parent_with_overflow
    , get_el_parent_with_tag
    , get_parent_tag_id_class_chain
    , is_el_child_of_el
    , is_el_child_of_id
    , is_el_child_of_tagName
    , is_parent_or_child

    // STORAGE
    , localStorage_delItem
    , localStorage_getItem
    , localStorage_setItem

    , mPadEnd
    , mPadStart

    // STRING
    , ellipsis
    , ellipsis_16
    , ellipsis_short

    , show_CR_LF
    , strip_HTML
    , strip_CR_LF
    , truncate

    , get_url_base
    , get_url_domain
    , get_url_path
    , parseURL

    // CSV
    , comma_to_vbar
    , csv_contains
    , csv_escape
    , csv_ins
    , csv_pos
    , csv_unescape

    // (from dom_util.js)
    ,    get_el_child_with_id
    ,    is_el_or_child_of_class
    ,    position_fixed_transitionend
    ,    set_el_class_on_off
    ,    t_get_panel_scale
};
/*}}}*/

}());

/*
:new $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/javascript/dom_util.js
*/

