//┌──▼▼▼▼▼▼▼▼──────────────────────────────────────────────────────────────────┐
//│ [xpath_js] ......................................... XPATH CONTENT SCRIPT  │
//└──▲▲▲▲▲▲▲▲──────────────────────────────────────────────────────────────────┘
/* jshint eslint {{{*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */
/* globals window, document, Document */
/* globals NodeFilter        */
/* globals console           */
/* globals lib_log           */
/* globals lib_util          */
/* globals Node              */
/* globals XPathEvaluator, XPathResult */

/* exported xpath_js */

/* eslint-disable no-warning-comments */

/*
:update|1,$y *
:!start explorer https://jshint.com/
*/

const XPATH_JS_ID        = "xpath_js";
const XPATH_JS_TAG       = XPATH_JS_ID  +" (210701:16h:32)";  // eslint-disable-line no-unused-vars
/*}}}*/
let            xpath_js = (function() {
/*➔ LOG {{{*/
"use strict";
let log_this = false;
/* eslint-disable no-unused-vars */
/*_ lib_log {{{*/

let   lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX;
let   lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb          ;
let   lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX;

let   log;
let   log_key_val;
let   log_key_val_group;

/*}}}*/
/*_ report_require_lib_log {{{*/
let report_require_lib_log = function()
{
    ({ lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX } = lib_log.LOG_BG_CSS);
    ({ lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX } = lib_log.LOG_FG_CSS);
    ({ lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb           } = lib_log.LOG_XX_CSS);

    log                                 = lib_log.log;
    log_key_val                         = lib_log.log_key_val;
    log_key_val_group                   = lib_log.log_key_val_group;

};
/*}}}*/
if( lib_log ) report_require_lib_log();
/* eslint-enable  no-unused-vars */
/*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ [Search] .. [TreeWalker] [REJECT .. ACCEPT .. SKIP]                    │
    //└────────────────────────────────────────────────────────────────────────┘
/*➔ get_el_anchor_in_view_array {{{*/
let get_el_anchor_in_view_array = function(root=document.body)
{
/*{{{*/
let   caller = "get_el_anchor_in_view_array("+lib_util.get_id_or_tag(root)+")";

if( log_this) console.time   (caller);
    let time_start = new Date().getTime();
/*}}}*/
    let anchor_in_view_array = [];
    let node;
    if(anchor_leaf_in_view_filter(root) == NodeFilter.FILTER_ACCEPT)
    {
if( log_this) log("root is a LEAF");
        anchor_in_view_array.push(root);
    }
    else {
        let treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, anchor_leaf_in_view_filter);
        while(node = treeWalker.nextNode())
            anchor_in_view_array.push(node);
    }
    let time_end = new Date().getTime();
if( log_this) console.timeEnd(caller);
    return { anchor_in_view_array , search_ms:(time_end - time_start) };
};
/*}}}*/
/*_ anchor_leaf_in_view_filter {{{*/
let anchor_leaf_in_view_filter = function(node)
{
    /* REJECT TOOL {{{*/
    let why = NodeFilter.FILTER_ACCEPT;
    let why_not;
    if     ( lib_util.has_el_class(node, "transcript"   ) ) { why = NodeFilter.FILTER_REJECT;  why_not =       "transcript"; }
    else if( lib_util.has_el_class(node, "doc_tool"     ) ) { why = NodeFilter.FILTER_REJECT;  why_not =         "doc_tool"; }

    /*}}}*/
    /* REJECT INVISIBLE {{{*/
    else if( node.tagName    == "SCRIPT"         ) { why = NodeFilter.FILTER_REJECT;  why_not =       node.tagName; }
    else if( node.tagName    == "STYLE"          ) { why = NodeFilter.FILTER_REJECT;  why_not =       node.tagName; }
    else if( node.style.display == "none"        ) { why = NodeFilter.FILTER_REJECT;  why_not =     "DISPLAY_NONE"; }

    /*}}}*/
    /* ACCEPT FIXED CONTAINER {{{*/
    else if( node.style.position == "fixed") { why = NodeFilter.FILTER_ACCEPT; }

    /*}}}*/
    /* SKIP CONTAINER .. STILL EXPLORE SUB-TREE {{{*/
    else if( node.children.length > 0            ) { why = NodeFilter.FILTER_SKIP  ;  why_not =     "HAS_CHILDREN"; }

    /*}}}*/
    /* REJECT DIMENSIONLESS LEAF .. OR OUT OF VIEW {{{*/
    if(why != NodeFilter.FILTER_REJECT)
    {
        /* REJECT NO DIMENSION LEAF */
        let bcr = node.getBoundingClientRect();
        if(node.children.length == 0)
        {
            if     (bcr.height < 1               ) { why = NodeFilter.FILTER_REJECT;  why_not =        "NO HEIGHT"; }
            else if(bcr.width  < 1               ) { why = NodeFilter.FILTER_REJECT;  why_not =         "NO WIDTH"; }
            else if(bcr.top > window.innerHeight ) { why = NodeFilter.FILTER_REJECT;  why_not =           "BELLOW"; }
            else if(bcr.bottom < 0               ) { why = NodeFilter.FILTER_REJECT;  why_not =            "ABOVE"; }
        }
        /* REJECT CONTAINER BELOW VIEW */
        else if(    bcr.top > window.innerHeight ) { why = NodeFilter.FILTER_REJECT;  why_not = "CONTAINER BELLOW"; }

        /* ACCEPT CONTAINER ABOVE VIEW .. (as it may have spreading absolute children) */
/*{{{
        else if(    bcr.bottom < 0               ) { why = NodeFilter.FILTER_REJECT;  why_not =  "CONTAINER ABOVE"; }
}}}*/
        else if(    bcr.bottom < 0               ) {
/*{{{
            log("ACCEPT CONTAINER ABOVE VIEW %c"+get_node_path(node), lbH);
}}}*/
        }
    }
    /*}}}*/
if(log_this && why_not) log("anchor_leaf_in_view_filter("+lib_util.get_id_or_tag(node)+"): .. "+why_not);
    return why;
};
/*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ [XPath]                                                                │
    //└────────────────────────────────────────────────────────────────────────┘
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
/*➔ get_nodeXPath_target {{{*/
let get_nodeXPath_target = function(nodeXPath)
{
    let first_node;
    try {
//      let nodeXPath  = "/html[1]/body[1]/details[2]/div[1]/details[1]/div[1]/p[1]/font[1]"

        let evaluator  = new XPathEvaluator();
        let expression = evaluator.createExpression(nodeXPath);
//console.dir(expression)

        let result     = expression.evaluate(document, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
//console.dir(result)
//console.log("get_nodeXPath_target("+nodeXPath+"): ...result=["+result.toString()+"]")

        let node;
        while(node = result.iterateNext())
        {
//console.log( node )
            if(!first_node)
                first_node = node;
        }

    }
    catch(ex) {
        console.log(ex);
    }
    return first_node;
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

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ [node_path]                                                            │
    //└────────────────────────────────────────────────────────────────────────┘
/*➔ get_node_path {{{*/
let get_node_path = function(node_to, base_name_only)
{
/*{{{
log("get_node_path %c"+get_n_lbl(node_to), lb7);
log_caller();
}}}*/

    if(!node_to) return "";

    let node     = node_to;
    let node_csv = "";
    do {
        /* document node .. up from a doc_tool */
/*{{{
        while( _is_a_doc_tool_node(node) ) node = node.parentElement;
}}}*/
        /* [num .. skipped] .. (count preceding siblings .. skipping doc_tools) {{{*/
        let skipped = 0;
        let num;
        for(num = 1; (node.parentElement) && (num <= node.parentElement.children.length); ++num)
        {
            let                    child  = node.parentElement.children[num-1];
            if(            node == child  ) break;

            if( _is_a_doc_tool_node(child) ) skipped += 1; /* ignore doc_tools */
        }
        /*}}}*/

        let tag_num_str = _dom_hide_tag_num_to_str(node, (num-skipped), skipped);

        node_csv        = lib_util.csv_ins(node_csv, tag_num_str);

        node = node.parentElement;
    }
    while(    node
          && (node != document.body)
          && (node != document.documentElement)
          && !base_name_only
         );
    let    node_path = lib_util.comma_to_vbar( node_csv );
/*{{{
logXXX("...%c"+node_path, lb8);
}}}*/
    return node_path;
};
/*}}}*/
/*➔ get_node_path_target {{{*/
let get_node_path_target = function(node_path, log_num=8)
{
/*{{{*/
let caller = "get_node_path_target";

/*}}}*/
    /* LOG {{{*/
    let args = [""]; let s = caller+"➔ ";
    if( log_this) {
        let lfn = lfX[log_num % 10];

        s += "%c"+log_num; args.push(/*lbb+*/lfn);
    }
    /*}}}*/
    let node               = document.body;
    let node_tag_num_array = node_path.split("|");   /* pre_0 | div_2 */
    for(let s_num = 1; s_num <= node_tag_num_array.length; ++s_num)
    {
        let         node_tag_num = _dom_hide_str_to_tag_num( node_tag_num_array[s_num-1] );
        let              tag     = node_tag_num.tag;
        let                  num = node_tag_num.num;

        /* child_num .. f(skipped) */
        let     skipped = 0;
        for(let  c_num  = 1                     /* check all skippable child */
            ;   (c_num <  node.children.length) /* from first to last */
             && (c_num <= (skipped + num)     ) /* up to num (skipped excluded) */
            ;    c_num += 1                     /* check next one */
           ) {
            let child = node.children[c_num-1];
            if( _is_a_doc_tool_node( child ) ) {
                skipped += 1;
            }
if( log_this) lib_util.add_el_class(child, "c_num_"+c_num+"_skipped_"+skipped);
        }

        let child_num = num + skipped;

        if( !(node = node.children[child_num-1])     ) break; /* NOT FOUND */

/*{{{*/
if( log_this) {
    s      +=     " %c "+tag+" %c"+num +(skipped ? " ("+skipped+" skipped ➔ "+(num+skipped)+")" : "");

    let lfs = lfX[s_num % 10];
    args.push( lbL+lfs);
    args.push(            lbR+lfs);
}
/*}}}*/
    }
/*{{{*/
if( log_this ) {
    let lfs = lfX[(1 + node_tag_num_array.length) % 10];
    s      +=  "%c...return "+_get_node_txt_id_or_tag_path(node); args.push(/*lbb+*/lbH+lfs);
    args[0] = s;
//  console.log.apply(console, Array.prototype.slice.call(args));
    console.log.apply(console,                         ...args );
}
/*}}}*/
    return node;
};
/*}}}*/
/*  _get_node_txt_id_or_tag_path {{{*/
let _get_node_txt_id_or_tag_path = function(node)
{
    if(!node) return "null node";

    let       txt =      "["+ lib_util.ellipsis_16( lib_util.get_n_txt( node ) )+"]";

    let id_or_tag =           node.id
        ?               " #"+ node.id
        :               " " + node.tagName;

    let path =          " ["+ get_node_path( node ) +"]";

    return txt + lib_util.mPadEnd(id_or_tag,10) + path;

};
/*}}}*/
/*  _get_node_id_or_tag {{{ */
let _get_node_id_or_tag = function(el)
{
    if(!el) return "null_node";
    return el.id || el.tagName;
};
/*}}}*/
/*  _is_a_doc_tool_node {{{*/
let _is_a_doc_tool_node = function(node)
{
/*{{{*/
let   caller = "_is_a_doc_tool_node";

/*}}}*/
    if(!node) return false;                                let result = false;     let lfx = lf8;

    if( node.id && node.id.startsWith("select")            ) { result =      "SELECT"; lfx = lf5; }

if( log_this && result) log(caller+"%c"+result+"%c"+lib_util.get_n_lbl(node), lbL+lfx, lbR+lf8);
    return result;
};
/*}}}*/
/*  _dom_hide_tag_num_to_str - (USE _get_node_id_or_tag) {{{*/
let _dom_hide_tag_num_to_str = function(child, num/*, skipped*/)
{
/*{{{
    let  child_label = _get_node_id_or_tag( child               );
    let parent_label = _get_node_id_or_tag( child.parentElement );

    let  child_label = child              .tagName;
    let parent_label = child.parentElement.tagName;
}}}*/
    let  child_label = _get_node_id_or_tag(child              );
    let parent_label = _get_node_id_or_tag(child.parentElement);

    return    num                       /* 0 num    */
        +" "+ child_label               /* 1 child  */
        +   " of"                       /* 2 of     */
        +" "+ parent_label              /* 3 parent */
/*{{{
        +(skipped ? " ("+skipped+" skipped)" : "")
}}}*/
    ;
};
/*}}}*/
/*  _dom_hide_str_to_tag_num {{{*/
let _dom_hide_str_to_tag_num = function( node_tag_num )
{
    let words = node_tag_num.split(" ");

    let num   = parseInt( words[0]);    /* 0 num   */
    /* ----------------------------------- 1 child */
    /* ----------------------------------- 2 of    */
    let tag   =           words[3] ;    /* 3 tag   */
/*
logXXX("_dom_hide_str_to_tag_num("+node_tag_num+") ...return { tag:"+tag+" , num:"+num+" }")
*/
    return { tag , num };
};
/*}}}*/

/* EXPORT {{{*/
return { name : XPATH_JS_ID

    , get_nodeXPath
    , get_nodeXPath_target

    , get_el_anchor_in_view_array
    , get_node_path
    , get_node_path_target

};
/*}}}*/
}());

