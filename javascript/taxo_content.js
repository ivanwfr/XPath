// ┌───────────────────────────────────────────────────────────────────────────┐
// │ taxo_content.js .......................................... CONTENT SCRIPT │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* globals lib_log, taxo_pods_html, taxo_json, chrome */
/* globals console, window, document, setTimeout, clearTimeout, localStorage */
/* globals requestAnimationFrame */
/* globals lib_util */

/* exported TAXO_TREE_CONTENT_SCRIPT_TAG */

/* eslint-disable      no-warning-comments */

/*}}}*/
const TAXO_TREE_CONTENT_SCRIPT_ID   = "taxo_content";
const TAXO_TREE_CONTENT_SCRIPT_TAG  =  TAXO_TREE_CONTENT_SCRIPT_ID  +" (211221:02h:16)";
let   taxo_content = (function() {
"use strict";

// ┌─────────────┐ ┌───────────────────────────────────────────────────────────┐
// │ [lib_log]   │-│ [console] .. [objects] .................................. │
// └─────────────┘ └───────────────────────────────────────────────────────────┘
/*{{{*/
/* eslint-disable no-unused-vars */
/*_ {{{*/
//let lib_log = {};

let   lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX;
let   lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb          ;
let   lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX;

let   SAU, SAR, SAD, SAL, SHV, SYN, SBS, SD0, SD1, SD2, SD3, SD4, SD5, SD6, SD7, SD8, SD9;
let   L_CHK, L_NEW, L_ARD, L_ARL, L_ARR, L_ARU, L_CLR, L_FNC, L_WRN;
let   SYMBOL_FUNCTION, SYMBOL_CHECK_MARK, SYMBOL_NOT_CHECKED, SYMBOL_CONSTRUCTION, SYMBOL_ROCKET, SYMBOL_ASSIGN, SYMBOL_GEAR, SYMBOL_THUMBS_UP;

let   clear
    , ellipsis
    , get_callers
    , get_ex_stack_line_match
    , log
    , logBIG
    , logXXX
    , log_CSP
    , log_SYN
    , log_caller
    , log_console_clear
    , log_json
    , log_json_one_liner
    , log_key_val
    , log_key_val_group
    , log_members
    , log_object
    , log_object_val_format
    , log_pause
    , log_permission
    , log_sep_bot
    , log_sep_top
    , mPadEnd
    , mPadStart
    , parse_ex_stack_FUNC_FILE_LINE_COL
    , pause
    , reload
    , strip_CR_LF
    , strip_QUOTE
    , truncate
;

/*}}}*/
/*_ taxo_tree_require_lib_log {{{*/
let taxo_tree_require_lib_log = function()
{
if(lb0) {
    console.warn("...already called once");
    console.warn("...already called once");
    console.trace();
    return;
}

    ({ lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX } = lib_log.LOG_BG_CSS);
    ({ lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX } = lib_log.LOG_FG_CSS);
    ({ lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb           } = lib_log.LOG_XX_CSS);

    [ SAU, SAR, SAD, SAL, SHV, SYN, SBS, SD0, SD1, SD2, SD3, SD4, SD5, SD6, SD7, SD8, SD9 ] = lib_log.LOG_SXX;
    [ L_CHK, L_NEW, L_ARD, L_ARL, L_ARR, L_ARU, L_CLR, L_FNC, L_WRN                       ] = lib_log.LOG_CHR;
    [ SYMBOL_FUNCTION, SYMBOL_CHECK_MARK, SYMBOL_NOT_CHECKED, SYMBOL_CONSTRUCTION, SYMBOL_ROCKET, SYMBOL_ASSIGN, SYMBOL_GEAR, SYMBOL_THUMBS_UP] = lib_log.LOG_SYM;

    clear                               = lib_log.clear;
    ellipsis                            = lib_log.ellipsis;
    get_callers                         = lib_log.get_callers;
    get_ex_stack_line_match             = lib_log.get_ex_stack_line_match;
    log                                 = lib_log.log;
    logBIG                              = lib_log.logBIG;
    logXXX                              = lib_log.logXXX;
    log_CSP                             = lib_log.log_CSP;
    log_SYN                             = lib_log.log_SYN;
    log_caller                          = lib_log.log_caller;
    log_console_clear                   = lib_log.log_console_clear;
    log_json                            = lib_log.log_json;
    log_json_one_liner                  = lib_log.log_json_one_liner;
    log_key_val                         = lib_log.log_key_val;
    log_key_val_group                   = lib_log.log_key_val_group;
    log_members                         = lib_log.log_members;
    log_object                          = lib_log.log_object;
    log_object_val_format               = lib_log.log_object_val_format;
    log_pause                           = lib_log.log_pause;
    log_permission                      = lib_log.log_permission;
    log_sep_bot                         = lib_log.log_sep_bot;
    log_sep_top                         = lib_log.log_sep_top;
    mPadEnd                             = lib_log.mPadEnd;
    mPadStart                           = lib_log.mPadStart;
    parse_ex_stack_FUNC_FILE_LINE_COL   = lib_log.parse_ex_stack_FUNC_FILE_LINE_COL;
    pause                               = lib_log.pause;
    reload                              = lib_log.reload;
    strip_CR_LF                         = lib_log.strip_CR_LF;
    strip_QUOTE                         = lib_log.strip_QUOTE;
    truncate                            = lib_log.truncate;

};
/*}}}*/
/* eslint-ensable no-unused-vars */
/*}}}*/

// ┌─────────────┐ ┌───────────────────────────────────────────────────────────┐
// │ [taxo_menu] │-│ BUILD MENU PODS .. [selected]............................ │
// └─────────────┘ └───────────────────────────────────────────────────────────┘
/*{{{*/
let   taxo_menu     = (function() {
/*{{{*/
const TAXO_MENU_LOG = false;
const TAXO_MENU_TAG = false;

const CSS_SELECTED  = "selected";

/*}}}*/
//"use strict";

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [taxo_json] ➔ TAXO-MENU-TREE ............................................ │
// └───────────────────────────────────────────────────────────────────────────┘
/*➔ search_id_from_node {{{*/

let search_id_from_node = function(id, from_node, from_level)
{
//log("search_id_from_node("+from_level+" .. from_node=["+from_node.id+"]");

    //┌────────────────────────────────────────┐
    //│ FORMAT SUPPORT FOR [taxo_json] fields  │
    //├────────────────────────────────────────┤
    //│ [taxo_json_201211]  [taxo_json_201118] │
    //│ ┌────────────────┐  ┌────────────────┐ │
    //│ │ - id           │  │ - (code)       │ │
    //│ │   title        │  │                │ │
    //│ │ - description  │  │ - description  │ │
    //│ │ - list         │  │ - (children)   │ │
    //│ └────────────────┘  └────────────────┘ │
    //└────────────────────────────────────────┘
    if(from_node.id == id)
    {
        let node        = from_node;
        let parent_node = null;
        let level       = from_level;

        return          { node , parent_node, level };
    }

    for(let i=0; from_node.list && (i < from_node.list.length); ++i)
    {
        let             { node , parent_node, level } = search_id_from_node(id, from_node.list[i], from_level+1);

        if(!parent_node) parent_node = from_node;
        if(node) return { node , parent_node, level };
    }
    return  {};
};
/*}}}*/
/*➔ sel_taxo_id {{{*/
/*{{{*/
let menu_selected;

/*}}}*/
let sel_taxo_id = function(taxo_id) // eslint-disable-line complexity
{
/*{{{*/
let   caller = "sel_taxo_id";
let log_this = TAXO_MENU_LOG;

/*}}}*/
    // GET SELECTED SUBMENU {{{
    let shadow_root = lib_util.get_shadow_root( taxo_pods_html.SHADOW_HOST_ID );
    let menu_div    = shadow_root.getElementById("menu_"+taxo_id );

/*{{{*/
if(log_this)
    log_key_val(caller+"("+taxo_id+"):"
                , { menu_selected
                  , menu_div
                }, lb8);

/*}}}*/
    //}}}
    // ADD SELECTED SUBMENU {{{
    if(!menu_div)
        menu_div = sel_taxo_id_add_taxo_menu( taxo_id );

    setTimeout(taxo_pods.taxo_tree_move_cluster, 50);
    //}}}
    // SET SELECTED SUBMENU {{{*/
if(log_this) log("%c menu_selected=["+(menu_selected ? menu_selected.id : "")+"] .. menu_div=["+(menu_div ? menu_div.id : "")+"]", lbH+lf8);
    if(menu_div == menu_selected)
    {
if(log_this) log("%c ["+menu_selected.id+"] .. (menu_div == menu_selected)", lbH+lf7);

        lib_util.del_el_class(menu_selected, "hidden"); // could have been .. by !has_menu entry
    }
    /*}}}*/
    /*  {{{*/
    else {
        /* [menu_selected] {{{*/
        let         sel_id = (menu_selected                             ) ? menu_selected            .id : "";
        let  sel_parent_id = (menu_selected && menu_selected.parent_node) ? menu_selected.parent_node.id : "";
        let         new_id = (menu_div                                  ) ? menu_div                 .id : "";
        let  new_parent_id = (menu_div      && menu_div.parent_node     ) ? menu_div.parent_node     .id : "";

        let    same_parent = (sel_id == "menu_"+ new_parent_id);
        let       has_menu = (menu_div && !!menu_div.innerHTML);
        let is_parent_leaf = !has_menu && same_parent;
        let  sel_top_level = !sel_parent_id;

/*{{{*/
if(log_this)
    log_key_val_group("taxo_id=["+taxo_id+"]"
                      ,{            sel_id
                          ,         new_id
                          ,  sel_parent_id
                          ,  new_parent_id
                          , same_parent    : same_parent+" .. [sel_id == 'menu_'+new_parent_id]"
                          , has_menu
                          , menu_div       : "["+lib_util.get_id_or_tag_and_className(menu_div)+"]"
                          , is_parent_leaf
                          , sel_top_level
                      }
                      , lf4, false);

/*}}}*/
        /*}}}*/
        /* [has_menu]  {{{*/
        if( has_menu )
        {
            sel_taxo_id_show_menu_div( menu_div );
        }
    /*}}}*/
    }
    /*}}}*/
};
/*}}}*/
/*_ sel_taxo_id_add_taxo_menu {{{*/
/*{{{*/
const LF  = String.fromCharCode(10);

/*}}}*/
let sel_taxo_id_add_taxo_menu = function(taxo_id)
{
/*{{{*/
let caller = "sel_taxo_id_add_taxo_menu";
let log_this = TAXO_MENU_LOG;

if(TAXO_MENU_TAG)
    log("%c"+caller+"("+taxo_id+")", lb5);
/*}}}*/
    /* [taxo_id] .. taxo_json item {{{*/
    let { node , parent_node, level } = search_id_from_node(taxo_id, taxo_json); /* FROM ROOT NODE .. optimize? */
if(!node) log(caller+": taxo_id NOT FOUND: %c["+taxo_id+"]", lb2);

    if(!node) return null;

    /*}}}*/
    /* [taxo_id] .. innerHTML f(item.list) {{{*/
    let innerHTML = "";

    for(let i=0; node.list && (i < node.list.length); ++i)
    {
        /* item [label title class] {{{*/
        let              item =    node.list[i];

        let          has_list = !!(item.list && item.list.length);
        let         has_title = !!(item.title);

        let description_or_id =                (item.description || item.id          ); /* [id] as a fallback when [description]=[""] */
        let        label_text =    has_title ?        item.title  : description_or_id ;
        let          el_title =    has_title ? description_or_id  : item.id           ;
        let             label =   (has_list  ?              "… "  : "● ")+ label_text ;
        let        item_class =    has_list  ?                ""  : "class='leaf'"    ;

        /*}}}*/
        /* item [innerHTML] {{{*/
        innerHTML
            += "<span   id='" + item.id    +"'"
            +  "     title='" + el_title   +"'"
            +  " data-menu='" + node.id    +"'"
            +                   item_class
            +  ">"+             label      +"</span>"
//          +  ">"+((i+1)+" ")+ label      +"</span>"
            +LF;
        /*}}}*/
    }
    /*}}}*/
    /* [taxo_id] ..  add menu f(item.list) {{{*/
    let menu_div         = document.createElement("DIV");

    menu_div.id          = "menu_"+taxo_id;
    menu_div.className   = "buttons_pod col_x1";
    menu_div.innerHTML   = innerHTML;
    menu_div.parent_node = parent_node;

    let shadow_root      = lib_util.get_shadow_root( taxo_pods_html.SHADOW_HOST_ID );
    shadow_root.appendChild( menu_div );
    /*}}}*/
/*{{{*/
if(log_this)
    log_key_val_group(   caller+"("+taxo_id+"):"
                      ,{ node
                       , node_list        :  node.list
                       , node_list_length : (node.list) ? node.list.length : ""
                       , parent_node
                       , level
                       , menu_div
                       , innerHTML
                      }, lf5
                      , true);

/*}}}*/
    return menu_div;
};
/*}}}*/
/*_ sel_taxo_id_show_menu_div {{{*/
let sel_taxo_id_show_menu_div = function(menu_div)
{
/*{{{*/
let   caller = "sel_taxo_id_show_menu_div";
let log_this = TAXO_MENU_LOG;

if( log_this) log(caller+"("+menu_div.id+")");
/*}}}*/
    /* [menu_selected] {{{*/
    menu_selected
        = menu_div;

    let menu_selected_id
        = menu_selected
        ? menu_selected.id
        : "";

    /*}}}*/
    /* SHOW-HIDE [all_menu_array] {{{*/
if(TAXO_MENU_TAG) logBIG("LAYOUT for menu_selected_id=["+ menu_selected_id +"]", 2);

    let        selector = ".buttons_pod[id*='menu_']";

    let     shadow_root = lib_util.get_shadow_root( taxo_pods_html.SHADOW_HOST_ID );
    let  all_menu_array = Array.from(shadow_root.querySelectorAll( selector ));
    let parent_id_array = sel_taxo_id_show_menu_div_get_parent_id_array( menu_selected );
    all_menu_array
        .forEach( (el) => {
            let is_menu_parent   =  parent_id_array.includes( el.id );
            let is_menu_selected =       (menu_selected_id == el.id );
/*{{{*/
if( log_this)
    log_key_val_group(  el.id
                        ,{ el_id : el.id
                         , is_menu_parent
                         , is_menu_selected
                        }
                        , lf7, false);

/*}}}*/
            /* SHOW selected parent menu chain .. HIDE others {{{*/
            if(!is_menu_parent && !is_menu_selected) {
if(TAXO_MENU_TAG) logBIG("HIDING  ["+el.id+"]", 2);

                lib_util.add_el_class(el,"hidden");
            }
            else
            {
if(TAXO_MENU_TAG) logBIG("SHOWING ["+el.id+"]", 5);

                lib_util.del_el_class(el,"hidden");
            }
            /*}}}*/
        });

    /*}}}*/
};
/*}}}*/
/*_ sel_taxo_id_show_menu_div_get_parent_id_array {{{*/
let sel_taxo_id_show_menu_div_get_parent_id_array = function(menu_from_el)
{
//console.log("sel_taxo_id_show_menu_div_get_parent_id_array("+menu_from_el.id+")")
    let   parent_id_array = [];
    parent_id_array.push( menu_from_el.id );

    let shadow_root = lib_util.get_shadow_root( taxo_pods_html.SHADOW_HOST_ID );
    let     menu_el = menu_from_el;
    while(menu_el.parent_node)
    {
        let menu_id = "menu_"+menu_el.parent_node.id;
        parent_id_array.push( menu_id );

        menu_el = shadow_root.querySelector("#"+menu_id);
//log("...up next: ["+menu_el.id+"]")
    }

//console.log("...return parent_id_array:")
//console.dir(parent_id_array)
    return parent_id_array;
};
/*}}}*/
/*➔ get_taxo_pods {{{*/
let get_taxo_pods = function()
{
/*{{{*/
let   caller = "get_taxo_pods";
let log_this = TAXO_MENU_LOG;

if( log_this) log("%c"+caller, lbH);
/*}}}*/
    let visible_pods = [];

    let shadow_root  = lib_util.get_shadow_root( taxo_pods_html.SHADOW_HOST_ID );
    let buttons_pods = shadow_root.querySelectorAll(".buttons_pod");

    Array.from(   buttons_pods )
        .forEach( (el) => { if( !lib_util.has_el_class(el,"hidden") )
                visible_pods.push(el);
        });

if( log_this) log("%c visible_pods.length=["+visible_pods.length+"]", lbH+lf8);
    return visible_pods;
};
/*}}}*/
/*➔ sel_clear {{{*/
let sel_clear = function(_caller)
{
/*{{{*/
let caller = "sel_clear";
let log_this = TAXO_MENU_LOG;

if(log_this) log(caller+"(_caller=["+_caller+"])");
/*}}}*/
    let shadow_root      = document.getElementById( taxo_pods_html.SHADOW_HOST_ID );
    let cleared_selected_menu_EL_array_length = unselect_under_parent( shadow_root.shadowRoot );

    /*  taxo_clear.clear */
    if(cleared_selected_menu_EL_array_length)
    {
        let taxo_clear = shadow_root.shadowRoot.querySelector("#taxo_clear");
        if( taxo_clear ) {
            lib_util.add_el_class(taxo_clear, "cleared");

            setTimeout(function() { lib_util.del_el_class(taxo_clear, "cleared"); }, 300);
        }
    }
};
/*}}}*/
/*➔ unselect_under_parent {{{*/
let unselect_under_parent = function(menu_PARENT)
{
/*{{{*/
let   caller = "unselect_under_parent";
let log_this = TAXO_MENU_LOG;
let tag_this = TAXO_MENU_TAG || log_this;

if(tag_this) log(         "%c-%c"+caller+" %c"+(menu_PARENT.id ? menu_PARENT.id : menu_PARENT.nodeName)
                 ,lbb+lbH+lf2,lb0         ,lbH+lb0                                                     );
/*}}}*/
    let menu_selector = "."+ CSS_SELECTED+"[data-menu]";
    let selected_menu_EL_array = menu_PARENT.querySelectorAll( menu_selector );
    if( selected_menu_EL_array )
    {
        for(let i=0; i<selected_menu_EL_array.length; ++i)
        {
            let menu_EL = selected_menu_EL_array[i];
/*{{{*/
if(tag_this)
    log_key_val_group(" menu_EL "+(i+1)+"/"+selected_menu_EL_array.length+" .. #"+menu_EL.id+" ["+menu_EL.innerText+"]"
                      ,{ id          : menu_EL.id
                       , innerText   : menu_EL.innerText
                       , title       : menu_EL.title
                       , "data-menu" : menu_EL.getAttribute("data-menu")
                      }, (menu_EL.classList.contains("leaf") ? lfX[i % 10] : lbF+lfX[i % 10])
                      ,  true);
/*}}}*/
            lib_util.del_el_class(menu_EL, CSS_SELECTED);
        }
    }

if(TAXO_MENU_TAG) logBIG(caller+" "+selected_menu_EL_array.length+" SELECTION CLEARED");

    return selected_menu_EL_array.length;
};
/*}}}*/

// DEBUG
/*➔ check_taxo_json {{{*/
let check_taxo_json = function()
{
//console.log("taxo_json:");
//console.dir( taxo_json  );
    if(typeof taxo_json != "undefined")
log("%c check_taxo_json: TAXO_JSON LOAD OK", lbH+lf5);

        /* RAMDOM SAMPLE FROM [TAX/javascript/taxo_json_201118.js] */
        log_taxo_id();
        log_taxo_id( "interest"          );
        log_taxo_id( "artsentertainment" );
        log_taxo_id( "bollywood"         );

        /* RAMDOM SAMPLE FROM [TAX/javascript/taxo_json_211218.js] */
        log_taxo_id( "HOUSEHOLD_APPLIANCES");
        log_taxo_id( "ELECTRICITY"       );
        log_taxo_id( "HOME"              );
        log_taxo_id( "ALL"               );

        let iterate_level_samples = iterate( taxo_json );
console.log(iterate_level_samples);
};
/*}}}*/
/*➔ log_taxo_id {{{*/
let log_taxo_id = function(id)
{
    if(!id) {
        log("%c taxo_json ", lbF+lb7);

console.dir( taxo_json.list );
    }
    else {
        let {node , parent_node, level} = search_id_from_node(id, taxo_json);
        if(  node ) {
            let parent_node_id = parent_node ? parent_node.id : "";
            log("%c id=["+id +"] parent_node=["+parent_node_id+"] [level "+level+"]:", lbb+lf4);
            log(    node );
        }
        else {
            log("NO SUCH NODE: node[id "+id+"]");
        }
    }
};
/*}}}*/
/*➔ [iterate taxo_json] .. (should have been preloaded by taxo_json.js) {{{*/
let iterate_level_samples = [];

let iterate = function(obj, level=0)
{
    if(level == 0)
        iterate_level_samples = [];

    if(!Array.isArray( obj ) )
    {
        // node
        let obj_id = (obj.description || obj.id);

        if(!iterate_level_samples[level]) {
            iterate_level_samples[level]        = { count:1 , id:obj_id };
        }
        else {
            iterate_level_samples[level].count += 1;
            iterate_level_samples[level].id    += " ➔ "+ obj_id;
        }

        // sub-nodes [list] .. [children]
        Object.keys(obj).forEach(
        (key) => {
            if( Array.isArray( obj[key] ) )
                iterate(       obj[key] , level+1);
        });

    }

    /* list */
    else {
        for(let i=0; i < obj.length; ++i)
            iterate(     obj[i], level);
    }

    return iterate_level_samples;
};
/*{{{
    javascript/taxo_json_201118.js
    javascript/taxo_json_211218.js
}}}*/
/*}}}*/

/* EXPORT */
/*{{{*/
return { name : "taxo_menu"
    ,    search_id_from_node
    ,    sel_taxo_id
    ,    get_taxo_pods
    ,    sel_clear
    ,    unselect_under_parent
    // DEBUG
    ,  check_taxo_json
    ,  log_taxo_id
    ,  iterate
};
/*}}}*/
}());
/*}}}*/

// ┌─────────────┐ ┌───────────────────────────────────────────────────────────┐
// │ [taxo_msg]  │-│ MESSAGE FROM BACKGROUND-SCRIPT .......................... │
// └─────────────┘ └───────────────────────────────────────────────────────────┘
/*{{{*/
let   taxo_msg      = (function() {
//"use strict";
/*{{{*/
const MESSAGE_LOG   = false;
const MESSAGE_TAG   = false;

/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [activated] ............................................................. │
// └───────────────────────────────────────────────────────────────────────────┘
/*➔ is_activated {{{*/
let    activated = false;
let is_activated = function()
{
    return activated;
};
/*}}}*/
/*➔ set_activated {{{*/
let set_activated = function(state)
{
    state = (state == undefined) ? !activated : state; /* SET OR TOGGLE */

log("%c set_activated: %c FROM "+activated     +" %c TO "+ state
    ,lbL              ,lbC+lfX[  activated ? 4:2],lbR+lfX[ state ? 4:2]);

    activated = (state != undefined) ? state : !activated ; /* SET OR TOGGLE */

    let shadow_root = document.getElementById( taxo_pods_html.SHADOW_HOST_ID );
    shadow_root.style.display = activated ? "block" : "none";

    if( activated )
    {
//      taxo_pods.load_div_tools_xy();
        taxo_pods.unhide_div_tools("onMessage");
    }

    taxo_pods.pods_fontSize = (2 * taxo_pods.BUTTONS_POD_FONT_SIZE_MIN)+"px";
    taxo_pods.taxo_tree_display_cluster();

};
/*}}}*/
/*➔ query_active_state {{{*/
let query_active_state = function()
{
    /* 1/2 [EXTENSION] .. [QUERY BACKGROUND SCRIPT ACTIVE STATE]  */
    if(   (typeof chrome            != "undefined")
       && (typeof chrome.runtime    != "undefined")
       && (       chrome.runtime.id !=  undefined )
      ) {
        chrome.runtime.sendMessage({ activated : "undefined" }, read_response);
    }
    /* 2/2 [EMBEDDED] .. [AUTO-ACTIVATE] */
    else {
        setTimeout(function() { taxo_msg . set_activated(true); },   0);
        setTimeout(function() { taxo_pods. unhide_div_tools();  }, 500);
    }
};
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ MESSAGE TO BACKGROUND-SCRIPT ............................................ │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
let config = { "CMD_TAXONOMY" : "taxonomy" };

/*}}}*/
/*▲▲▲▲ send_selected_state_message .. chrome.runtime.sendMessage {{{*/
let send_selected_state_message = function(selected_state,menu_id,taxo_id)
{
/*{{{*/
let caller = "send_selected_state_message";
let log_this = MESSAGE_LOG;
let tag_this = MESSAGE_TAG || log_this;

if(log_this) log(caller+"("+taxo_id+")");
/*}}}*/
    /* FORWARD SELECTION TO BROWSER EXTENSION BACKGROUND SCRIPT {{{*/
    let message
        = { cmd      : config.CMD_TAXONOMY
          , menu_id
          , taxo_id
          , selected : selected_state
          , href     : document.location.href
        };

    if(   (typeof chrome            != "undefined")
       && (typeof chrome.runtime    != "undefined")
       && (       chrome.runtime.id !=  undefined ))
    {
if(tag_this) log_key_val_group(caller, message, 4, false);

        try {
            chrome.runtime.sendMessage(message, read_response);
        } catch(ex) { if(log_this) log(ex); }

    }
    /*}}}*/
    else if( tag_this )
    {
        log_key_val_group(caller+" (NOT RUNNING AS AN EXTENSION) ➔ MESSAGE NOT SENT)", message, 8, false);
    }
};
/*}}}*/
/*▼▼▼▼ read_response {{{*/
let read_response = function(response)
{
/*{{{*/
let caller = "read_response";
let log_this = MESSAGE_LOG;
//t tag_this = MESSAGE_TAG || log_this;

if(log_this) log(caller+": %c RECEIVING ANSWER FROM BACKGROUND SCRIPT:", lb4);
if(log_this) log("%c"+response, lf4);
/*}}}*/
    /* response.multiple_choice_state {{{*/
    if(typeof response.multiple_choice_state != "undefined")
    {
        taxo_pods.set_multiple_choice_state(response.multiple_choice_state, caller);

    }
    /*}}}*/
    /* response.clear {{{*/
    if(typeof response.clear     != "undefined")
    {
        taxo_menu.sel_clear("response.clear "+response.clear);
    }
/*}}}*/
    /* response.activated {{{*/
    if(typeof response.activated != "undefined")
    {
        set_activated(response.activated);
    }
    /*}}}*/
};
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ RESPONSE FROM BACKGROUND-SCRIPT ......................................... │
// └───────────────────────────────────────────────────────────────────────────┘
/*_ add_message_listener {{{*/
let add_message_listener = function()
{
   if(   (typeof chrome            != "undefined")
      && (typeof chrome.runtime    != "undefined")
      && (       chrome.runtime.id !=  undefined ))
    {
if(MESSAGE_LOG) console.log("%c LISTENING TO MESSAGE FROM BACKGROUND SCRIPT...", "color:#AFA");
        chrome.runtime.onMessage.addListener( onMessage_listener );
    }
};
/*}}}*/
/*_ onMessage_listener {{{*/
let onMessage_listener = function(request, sender, sendResponse)
{
let caller = "onMessage_listener";
if(MESSAGE_LOG) {
console.log("%c MESSAGE FROM BACKGROUND SCRIPT...", "color:#AFA");
console.trace();
//console.log( request )
//console.dir( request )
}

    if(typeof request.activated != "undefined")
    {
console.log("%c➔ Extension %c activated "+activated+" ", "color:#AFA", "background-color:"+(request.activated ? "#0A0" : "#00A"));

        // ┌───────────────────────────────────────────────────────────────┐
        // │ ACTIVATED ON-OFF                                              │
        // └───────────────────────────────────────────────────────────────┘
        //{{{
if(MESSAGE_LOG)
    log_key_val_group(caller+": request"
                      , { activated    : request.activated
                      }, 4, false);

//      if( !request.activated && request.save_layout)
//          taxo_pods.save_div_tools_xy(caller, sendResponse);

        taxo_msg.set_activated( request.activated );

        sendResponse({ ack: JSON.stringify( request ) });
        //}}}
    }
};
/*}}}*/

/* EXPORT */
/*{{{*/
return { name : "taxo_msg"
    ,    is_activated
    ,    set_activated
    ,    send_selected_state_message
    ,    add_message_listener
    ,    query_active_state
};
/*}}}*/
}());
/*}}}*/





// ┌─────────────┐ ┌───────────────────────────────────────────────────────────┐
// │ [taxo_pods] │-│ EVENTS .. LAYOUT [div_tools] ............................ │
// └─────────────┘ └───────────────────────────────────────────────────────────┘
/*{{{*/
let   taxo_pods     = (function() {
//"use strict";

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ LOAD .................................................................... │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*{{{*/
const TAXO_PODS_LOG = false;
const TAXO_PODS_TAG = false;

const CSS_CLICKED                 = "clicked";
const CSS_SELECTED                = "selected";
const CSS_COLLECTED               = "collected";

const BUTTONS_POD_FONT_SIZE       = 64;
const BUTTONS_POD_FONT_SIZE_MIN   =  6;

const CAPTURE_TRUE_PASSIVE_FALSE  = {capture:true, passive:false};

let taxo_pods_html_fragment;
let pods_fontSize;
let has_moved;
/*}}}*/
/*➔ taxo_pods_init .. (listeners .. first_caption) {{{*/
let taxo_pods_init = function()
{
/*{{{*/
let   caller = "taxo_pods_init";
let log_this = TAXO_PODS_LOG;

/*}}}*/
    /* [already called once] {{{*/
    if( taxo_pods_html_fragment )
    {
        console.warn("...already called once");
        console.trace();
        return;
    }
    /*}}}*/
    /* [lib_log] [check_script_loaded] {{{*/
    taxo_tree_require_lib_log();

    if( check_script_loaded() ) return;
    /*}}}*/
    /* INJECT PODS HTML {{{*/
if(log_this) log(caller+"%c ➔ ADDING PODS HTML", lf7);
    taxo_pods_html_fragment = taxo_pods_html.inject_shadow_root();
//console.log("%c taxo_pods_html_fragment:");
//console.dir(    taxo_pods_html_fragment  );

    taxo_pods.load_div_tools_xy();
    /*}}}*/
    /* ADD EVENT LISTENERS {{{*/
    taxo_pods_init_add_listeners();

    /*}}}*/
    taxo_msg.query_active_state();

    taxo_menu.sel_taxo_id    ( taxo_json.id                 ); /* menu root */

    set_multiple_choice_state( multiple_choice_state, caller); /* display initial state */

    if( !taxo_msg.is_activated() )
    {
        let shadow_root = document.getElementById( taxo_pods_html.SHADOW_HOST_ID );
        shadow_root.style.display = "none";

        return;
    }
    /* adjust initial [pods_fontSize] */
    div_tools_move_RESCALE();

//  taxo_tree_move_cluster();
    setTimeout(taxo_tree_move_cluster   , 500);
    setTimeout(taxo_tree_display_cluster,1000);
};
/*}}}*/
/*_ taxo_pods_init_add_listeners {{{*/
let taxo_pods_init_add_listeners = function()
{
/*{{{*/
let   caller = "taxo_pods_init_add_listeners";
let log_this = TAXO_PODS_LOG;

/*}}}*/
    /* ON [keyup] .. ESCAPE {{{*/
    window.addEventListener("keydown"  , taxo_tree_onKey_CB);

    /*}}}*/
    /* ON [resize] {{{*/
if(log_this) log(caller+"%c ➔ ADDING [click] LISTENER", lf5);
        window.addEventListener("resize", taxo_tree_onResize, CAPTURE_TRUE_PASSIVE_FALSE);

    /*}}}*/
    /* ON [touchstart] OR [mousedown] {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if(log_this) log(caller+"%c ➔ ADDING [touchstart] LISTENER", lf3);

        document.documentElement.addEventListener("touchstart", taxo_tree_onDown , CAPTURE_TRUE_PASSIVE_FALSE);
        document.documentElement.addEventListener("touchend"  , taxo_tree_onUp   , CAPTURE_TRUE_PASSIVE_FALSE);
        document.documentElement.addEventListener("touchend"  , taxo_tree_onClick, CAPTURE_TRUE_PASSIVE_FALSE);
    }
    else {
if(log_this) log(caller+"%c ➔ ADDING [mousedown] LISTENER", lf4);

        document.documentElement.addEventListener("mousedown" , taxo_tree_onDown , CAPTURE_TRUE_PASSIVE_FALSE);
        document.documentElement.addEventListener("mouseup"   , taxo_tree_onUp   , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ON [click] {{{*/
    if(!on_touch_device) {
if(log_this) log(caller+"%c ➔ ADDING [click] LISTENER", lf3);

        document.documentElement.addEventListener("click"     , taxo_tree_onClick, CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ON [message] {{{*/
    taxo_msg.add_message_listener();

    /*}}}*/
    /* ON [beforeunload] {{{*/
if(log_this) log(caller+"%c ➔ ADDING [beforeunload] LISTENER", lf6);
        window.addEventListener("beforeunload", taxo_tree_onbeforeunload, CAPTURE_TRUE_PASSIVE_FALSE);

    /*}}}*/
};
/*}}}*/
/*_ check_script_loaded {{{*/
let check_script_loaded = function()
{
    /* EXTENSION or EMBEDDED {{{*/
    let in_extension
        =  (typeof chrome            != "undefined")
        && (typeof chrome.runtime    != "undefined")
        && (       chrome.runtime.id !=  undefined )
    ;

    logBIG("LOADING "+(in_extension ? "EXTENSION" : "EMBEDDED")+" "+TAXO_TREE_CONTENT_SCRIPT_ID, lbB+lbH+lfX[in_extension ? 4:5]);
    /*}}}*/
    /*  taxo_content_script_js {{{*/
    let taxo_content_script_js = document.getElementById("taxo_content_script_js");
    let script_loaded          = in_extension && taxo_content_script_js;
    if( script_loaded )          logBIG("EXTENSION NOT STARTED FROM AN EMBEDDING PAGE", lf2);

    /*}}}*/
    return script_loaded;
};
/*}}}*/
/*➔ load_div_tools_xy {{{*/
let load_div_tools_xy = function()
{
/*{{{*/
let   caller = "load_div_tools_xy";
let log_this = TAXO_PODS_LOG;

if(log_this) console.log(caller);
/*}}}*/
    /* LAYOUT [div_tools] {{{*/
    let div_tools = taxo_pods_html_fragment.getElementById("div_tools");
    lib_util.add_el_class(div_tools, TAXO_TREE_CONTENT_SCRIPT_ID);
    if(!div_tools) return;

    /*}}}*/
//    /* FROM BACKGROUND SCRIPT (as an all-tabs location) {{{*/
//    let running_extension
//        = (   (typeof  chrome            != "undefined")
//           && (typeof  chrome.runtime    != "undefined")
//           && (        chrome.runtime.id !=  undefined )
//          );
//
//    /*}}}*/
    let      xy = localStorage.getItem("taxo_div_tools_xy");
    if( xy ) xy = JSON.parse(xy);
if( log_this) log(TAXO_TREE_CONTENT_SCRIPT_ID+".xy:", xy);
    if(!xy ) xy = { x:12 , y:12 };

    xy.x = Math.max(xy.x, 12);
    xy.x = Math.min(xy.x, window.innerWidth  - 64);

    xy.y = Math.max(xy.y, 12);
    xy.y = Math.min(xy.y, window.innerHeight - 64);

    div_tools.style.left = xy.x+"px";
    div_tools.style.top  = xy.y+"px";
};
/*}}}*/
/*➔ save_div_tools_xy {{{*/
let save_div_tools_xy = function(_caller)
{
let caller = "save_div_tools_xy";
let log_this = TAXO_PODS_LOG;
if( log_this) log(TAXO_TREE_CONTENT_SCRIPT_ID+"."+caller+"("+_caller+")");

    let div_tools = taxo_pods_html_fragment.getElementById("div_tools");
    let        xy = { x: div_tools.offsetLeft , y: div_tools.offsetTop };
if( log_this) log("xy", xy);

    if( !xy.x && !xy.y) return;

    localStorage.setItem("taxo_div_tools_xy", JSON.stringify(xy));
};
/*}}}*/
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ LAYOUT .................................................................. │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ hide_pods {{{*/
let hide_pods = function(pods)
{
    let     activated = taxo_msg.is_activated();

    for(let i=0; i<pods.length; ++i) {
        if(!activated || !lib_util.has_el_class(pods[i], "movable"))
            pods[i].style.display = "none";
    }
};
/*}}}*/
/*_ show_pods {{{*/
let show_pods = function(pods)
{
    for(let i=0; i<pods.length; ++i) {
        pods[i].style.display  = "grid";
        pods[i].style.fontSize = pods_fontSize;
    }
};
/*}}}*/
/*_ unhide_div_tools {{{*/
let unhide_div_tools = function(_caller, e) // eslint-disable-line no-unused-vars
{
    let unhiding_fontSize = BUTTONS_POD_FONT_SIZE_MIN * 2;
    if(parseInt(pods_fontSize) < unhiding_fontSize)
        pods_fontSize          = unhiding_fontSize+"px";

    taxo_tree_display_cluster();

    setTimeout(taxo_tree_move_cluster, 250);
};
/*}}}*/

/*_ div_tools_move_RESCALE {{{*/
/*{{{*/
//const RESCALED_MIN_PX          = 48;

/*}}}*/
let   div_tools_move_RESCALE = function(el)
{
    let div_tools = el || taxo_pods_html_fragment.getElementById("div_tools");
    if(!div_tools ) return;

    requestAnimationFrame(() => { div_tools_move_RESCALE_handler(div_tools); });

    lib_util.add_el_class(div_tools,"rescaling");
};
/*}}}*/
/*_ div_tools_move_RESCALE_handler {{{*/
let div_tools_move_RESCALE_handler = function(el)
{
    /* CENTER */
//  let bcr           = el.getBoundingClientRect();
    let  wcx          =     window.innerWidth  / 2;
    let  wcy          =     window.innerHeight / 2;

    /* DELTA */
    let d_x           = Math.abs(wcx - onMove_XY.x);
    let d_y           = Math.abs(wcy - onMove_XY.y);

    let offset        = Math.sqrt(d_x*d_x + d_y*d_y).toFixed(0);
    let center        = Math.sqrt(wcx*wcx + wcy*wcy).toFixed(0);
    let d_scale       = 1 - (offset / center)       ;

    let e_w           = el.e_w || el.offsetWidth; if(!el.e_w) el.e_w = e_w; /* save and reuse initial element width */

//  let rescale_min   = RESCALED_MIN_PX / e_w;
//  let scale         = Math.max(rescale_min, d_scale).toFixed(2);  /* 1.0 at window center. 0.1 at borders */
    let scale         =                       d_scale .toFixed(2);  /* 1.0 at window center. 0.0 at borders */

    /* RESIZE BY FONT */
    pods_fontSize     = Math.max(BUTTONS_POD_FONT_SIZE_MIN, parseInt(BUTTONS_POD_FONT_SIZE * scale))+"px";
    el.style.fontSize = pods_fontSize;

//  let pods = taxo_menu.get_taxo_pods();
//  for(let i=0; i<pods.length; ++i)
//      pods[i].style.fontSize = pods_fontSize;

    lib_util.del_el_class(el,"rescaling");

/*{{{
console.clear()
log_key_val_group("div_tools_move_RESCALE_handler("+lib_util.get_id_or_tag(el)+") .. scale="+scale
    , { offset
      , center
      ,   scale
      , d_scale              : d_scale     .toFixed(2)
      , rescale_min          : rescale_min .toFixed(2)
      , offsetWidth          : el.offsetWidth
      , e_w
//    , bcr
//    , WINDOW_CENTER_X      : wcx
//    , WINDOW_CENTER_Y      : wcy
//    , d_x
//    , d_y
    }, lf7, false);
}}}*/
};
/*}}}*/

/*➔ taxo_tree_display_cluster {{{*/
/*{{{*/
const DISPLAYED_PODS_FONTSIZE_MIN = 12;

let hiding_menu;
//t last_fontSizeInt;
/*}}}*/
let taxo_tree_display_cluster = function()
{

    if(!pods_fontSize) return false;

    let        pods  = taxo_menu.get_taxo_pods();
    if(!pods.length  ) return false;

    let fontSizeInt  = parseInt( pods_fontSize );
    let activated    = taxo_msg.is_activated();
    hiding_menu
        =  !activated
        || (fontSizeInt < DISPLAYED_PODS_FONTSIZE_MIN);

/*{{{
if(fontSizeInt != last_fontSizeInt)
{
    let l_x = lbH + lfX[hiding_menu ? 0 : (fontSizeInt % 10)];

    log("taxo_tree_display_cluster:%c"
        +" [hiding_menu        "+hiding_menu           +"]"
        +" [MIN "+DISPLAYED_PODS_FONTSIZE_MIN+"]"
        +" [pods_fontSize "+pods_fontSize    +"]"
        +" [pods.length   "+pods.length      +"]"
        , l_x);
}
last_fontSizeInt = fontSizeInt;
}}}*/

    if( hiding_menu ) { hide_pods(pods); return false; }
    else              { show_pods(pods); return  true; }

};
/*}}}*/
/*➔ taxo_tree_move_cluster {{{*/
let taxo_tree_move_cluster = function(_moving_pod=null)
{
/*{{{*/
let   caller = "taxo_tree_move_cluster";
let log_this = TAXO_PODS_LOG;

//console.clear();
if( log_this) log("%c"+caller, lbH);

    taxo_tree_move_cluster_timeout = null;
/*}}}*/
    /* PODS SELECTED {{{*/
    let pods = taxo_menu.get_taxo_pods();

    let moving_pod = _moving_pod || pods[0];
    if(!moving_pod) {
        log("%c FOUND NO PODS", lb2);

        return;
    }
    /*}}}*/
    /* PODS SPREAD HORIZONTAL DIRECTION .. [l_to_r] [t_to_b] {{{*/
    let    m_x = moving_pod.offsetLeft;
    let    m_y = moving_pod.offsetTop;
    let    m_w = moving_pod.offsetWidth;
    let    m_h = moving_pod.offsetHeight;
    let    mcx = m_x + m_w/2;
    let    mcy = m_y + m_h/2;

    let    wcx = window.innerWidth  / 2;
    let    wcy = window.innerHeight / 2;

    let l_to_r = (wcx > mcx);
    let t_to_b = (wcy > mcy);

if(log_this) log("%c l_to_r %c t_to_b", (l_to_r ? lb4:lf8), (t_to_b ? lb7:lf8));
    /*}}}*/
    /* NEAR [moving_pod] {{{*/
    let x_next = m_x + (l_to_r ? m_w : 0);

    let moving_i = 0;
    for(moving_i=0; moving_i   < pods.length; ++moving_i)
    {
        if(pods[    moving_i] == moving_pod)
            break;
    }
if( log_this) log("%c moving_i=["+moving_i+"]", lbH+lf8);

    for(let i=moving_i+1; i<pods.length; ++i)
    {
if(log_this) log("%c"+i+"%c"+m_x+" "+m_y+"%c"+lib_util.get_id_or_tag(moving_pod),lbL,lbC,lbR);

        let bcr = pods[i].getBoundingClientRect();
        let p_w = bcr.width ;
        let p_h = bcr.height;

        let o_x = l_to_r ? 0 : -p_w;
        let   x = x_next + o_x;
        let   y = t_to_b ? (m_y) : (m_y + m_h - p_h);

        pods[i].style.left = x+"px";
        pods[i].style.top  = y+"px";

        pods[i].scrollTo(
                         { left     : 0
                         , top      : (t_to_b ? 0 : 10000)  // px
                         , behavior : "smooth"              // "auto"
                         });

        x_next += l_to_r ? p_w : -p_w;
    }
    /*}}}*/
};
/*}}}*/
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ EVENT .. [DOWN MOVE UP CLICK RESIZE KEY SCROLL] ......................... │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ div_tools_add_onmove_listener {{{*/
/*{{{*/
let     moving_EL;

/*}}}*/
let div_tools_add_onmove_listener = function(el)
{
/*{{{*/
let   caller = "div_tools_add_onmove_listener";
let log_this = TAXO_PODS_LOG;

    let             cs = window.getComputedStyle(el);
if( log_this)
{
    let bcr = el.getBoundingClientRect();

    log_key_val_group("moving_EL"
        , {  el
            ,  el_offsetLeft :  el.offsetLeft
                ,  el_offsetTop  :  el.offsetTop
                ,  cs_left       :  cs.left
                ,  cs_top        :  cs.top
                , bcr_left       : bcr.left
                , bcr_top        : bcr.top
        }
        , lf7, false);
}
/*}}}*/
    has_moved = false;
    /* GET - MOVE DATA {{{*/
    moving_EL          = el;
    moving_EL.onDown_X = parseInt(cs.left);
    moving_EL.onDown_Y = parseInt(cs.top );

    lib_util.add_el_class(moving_EL, "pressed");
    /*}}}*/
    /* ADD - TOUCH MOVE LISTENER {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if(log_this) log(caller+"%c ➔ ADDING [touchmove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf4);

        window.addEventListener   ("touchmove", taxo_tree_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ADD - MOUSE MOVE LISTENER {{{*/
    else {
if(log_this) log(caller+"%c ➔ ADDING [mousemove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf5);

        window.addEventListener   ("mousemove", taxo_tree_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* DEL - SCROLL LISTENER {{{*/
if(log_this) log(caller+"%c REMOVING [scroll]    LISTENER", lf8);

        window.removeEventListener("scroll"   , taxo_tree_onScroll, CAPTURE_TRUE_PASSIVE_FALSE);

if(log_this) log_caller();
    /*}}}*/
};
/*}}}*/
/*_ taxo_tree_del_onmove_listener {{{*/
let taxo_tree_del_onmove_listener = function()
{
/*{{{*/
let   caller = "taxo_tree_del_onmove_listener";
let log_this = TAXO_PODS_LOG;

    if(!moving_EL) return;
/*}}}*/
    /* DEL - TOUCH MOVE LISTENER {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if(log_this) log(caller+"%c REMOVING [touchmove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf8);

        window.removeEventListener("touchmove", taxo_tree_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* DEL - MOUSE MOVE LISTENER {{{*/
    else {
if(log_this) log(caller+"%c REMOVING [mousemove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf8);

        window.removeEventListener("mousemove", taxo_tree_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ADD - SCROLL LISTENER {{{*/
if(log_this) log(caller+"%c ➔ ADDING [scroll]    LISTENER", lf6);

    window.addEventListener   ("scroll"   , taxo_tree_onScroll, CAPTURE_TRUE_PASSIVE_FALSE);
    /*}}}*/
    /* CLR - MOVE DATA {{{*/
    delete moving_EL.onDown_X;
    delete moving_EL.onDown_Y;
    lib_util.del_el_class(moving_EL, "pressed");
    moving_EL = undefined;

if(log_this) log_caller();
    /*}}}*/
};
/*}}}*/
/* DOWN */
/* onDown_XY {{{*/
/*  set_onDown_XY {{{*/
let     onDown_EL;
let     onDown_XY = { x:0, y:0 };
let set_onDown_XY = function(e, _caller) // eslint-disable-line no-unused-vars
{
let log_this = TAXO_PODS_LOG;

    let      xy = lib_util.get_event_XY(e);
    onDown_XY.x = xy.x;
    onDown_XY.y = xy.y;
    onMoveDXY.x = 0;
    onMoveDXY.y = 0;
    onMove_XY.x = 0;
    onMove_XY.y = 0;
    onDown_EL   = lib_util.get_event_target(e);
if( log_this) log("set_onDown_XY: ["+onDown_XY.x.toFixed(0)+" "+onDown_XY.y.toFixed(0)+"]");
};
/*}}}*/
/*_ set_onMove_XY {{{*/
let     onMove_XY = { x:0, y:0 };
let     onMoveDXY = { x:0, y:0 };
let set_onMove_XY = function(e)
{
    if(e) {
        let      xy = lib_util.get_event_XY(e);
        onMove_XY.x = xy.x;
        onMove_XY.y = xy.y;
        onMoveDXY.x = xy.x - onDown_XY.x;
        onMoveDXY.y = xy.y - onDown_XY.y;
    }
/*{{{
log(onMove_XY.x.toFixed(0)+" "+onMove_XY.y.toFixed(0));
log(onMoveDXY.x.toFixed(0)+" "+onMoveDXY.y.toFixed(0));
}}}*/
};
/*}}}*/
/*}}}*/
/*_ taxo_tree_onDown {{{*/

let taxo_tree_onDown = function(e)
{
/*{{{*/
let   caller = "taxo_tree_onDown";
if(e.altKey) lib_log.log_console_clear(caller);
if(e.altKey) return;

let log_this = TAXO_PODS_LOG;

    has_moved = false;

    let e_target = lib_util.get_event_target(e);
if( log_this) lib_log.log_console_clear(caller);
if( log_this) log("%c e_target=["+lib_util.get_id_or_tag(e_target)+"]", lbH+lf8);
if( log_this) log(caller+": %c("+e.type+" ON "+lib_util.get_id_or_tag_and_className(e_target)+")", lf1);
/*{{{
}}}*/
    /* ONDOWN XY {{{*/
    set_onDown_XY(e, caller);
    onMoveDXY.x = 0;
    onMoveDXY.y = 0;

    /*}}}*/
/*}}}*/
    /* on_touch_device {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
        div_tools_preventScrolling(caller);
    }
    /*}}}*/
    /* [moving_target] {{{*/
    let div_tools = taxo_pods_html_fragment.getElementById("div_tools");
    let moving_target = div_tools_onDown_moving_target(e,   div_tools);
    if( moving_target )
    {
        div_tools_add_onmove_listener( moving_target );
    }
    /*}}}*/
};
/*}}}*/
/*_ div_tools_onDown_moving_target {{{*/
/*{{{*/
const FONTSIZE_DEFAULT = 12;

/*}}}*/
let div_tools_onDown_moving_target = function(e,moving_target)
{
/*{{{*/
let   caller = "taxo_content.div_tools_onDown_moving_target";
let log_this = TAXO_PODS_LOG;

let e_target = lib_util.get_event_target(e);
if( log_this) log(caller+": %c("+e.type+" ON "+lib_util.get_id_or_tag_and_className(e_target)+")", lf1);
/*}}}*/
    /* movable [moving_target] .. up from [e_target] {{{*/
    if(!moving_target) return null;

    if(!lib_util.is_el_child_of_id(e_target, moving_target.id) )
    {
if( log_this) log("NOT A CHILD OF ["+moving_target.id+"]");

        return null;
    }
    /*}}}*/
    /* NOT A CHILD OF [taxonomy] {{{*/
    if(!lib_util.is_el_or_child_of_class(e_target, TAXO_TREE_CONTENT_SCRIPT_ID))
    {
if( log_this) log("NOT A CHILD OF CLASS [taxonomy]: "+lib_util.get_id_or_tag_and_className(e_target));

        return null;
    }
    /*}}}*/
    /* [transformOrigin] drift towards view center {{{*/
    /* NOTE: [transformOrigin] is not used when [fontSize] does the scaling */

    /* [click-to-origin-offset] */
    let event_xy    = lib_util.get_event_XY(e               );
    let e_target_xy = lib_util.get_el_xy   (moving_target, caller);

    let          dx = (event_xy.x - e_target_xy.x);
    let          dy = (event_xy.y - e_target_xy.y);

    /* [transformOrigin] */
    let   x_percent = (100 * dx / moving_target.offsetWidth ).toFixed(2);
    let   y_percent = (100 * dy / moving_target.offsetHeight).toFixed(2);
    moving_target.style.transformOrigin = x_percent+"% "+ y_percent+"%";

    /* [fontSize] */
    let fontSize    = parseFloat( moving_target.style.fontSize );
    let scale       = fontSize / FONTSIZE_DEFAULT;

    /*}}}*/
/*{{{*/
if(log_this)
    log_key_val_group( caller
        , {     moving_target
           ,    event_xy
           ,    e_target_xy
           ,    dx
           ,    dy
           ,    transformOrigin : moving_target.style.transformOrigin
           ,    fontSize
           ,    scale
        }, lf4, false);

/*}}}*/
    return moving_target;
};
/*}}}*/
/* MOVE */
/*_ taxo_tree_onMove {{{*/
/*{{{*/
const MOVED_ENOUGH = 16;
//nst MOVED_MARGIN = 16;

let taxo_tree_move_cluster_timeout; /* eslint-disable-line no-unused-vars */

/*}}}*/
let taxo_tree_onMove = function(e)
{
/*{{{*/
//let   caller = "taxo_tree_onMove";
let log_this = TAXO_PODS_LOG;

//if( log_this ) caller += "("+e.type+")";
/*}}}*/
    /* MOVED_ENOUGH .. PREVENT CLICK {{{*/
    set_onMove_XY(e);
    has_moved = (   (Math.abs(onMoveDXY.x) >= MOVED_ENOUGH)
                 || (Math.abs(onMoveDXY.y) >= MOVED_ENOUGH));

if(log_this && has_moved) log("[has_moved "+has_moved+"]");
    /*}}}*/
    /* MOVABLE TARGET {{{*/
    if(   (                     moving_EL.style.position == "fixed"      )
       || lib_util.has_el_class(moving_EL                 , "buttons_pod")
      )
    {
        let x =                 moving_EL.onDown_X + onMoveDXY.x ;
        let y =                 moving_EL.onDown_Y + onMoveDXY.y ;
        taxo_tree_move_EL_XY_WH(moving_EL, x, y);


        if( taxo_tree_display_cluster() )
        {
//          if(taxo_tree_move_cluster_timeout) clearTimeout(taxo_tree_move_cluster_timeout);
            taxo_tree_move_cluster_timeout   =   setTimeout(taxo_tree_move_cluster, 250); // eslint-disable-line no-unused-vars

//          taxo_tree_move_cluster();
//          setTimeout(taxo_tree_move_cluster, 0);
        }
    }
    /*}}}*/
//    /* CHECK SELECTION TEXT {{{*/
//    let selection      = window.getSelection();
//    let text           = selection.toString();
//    if( text ) {
//if(log_this) log("%c"+caller+"%c"+(text ? "SELECTION=["+lib_util.strip_CR_LF(text)+"]" : ""), lbL+lf1,lbR+lf9);
//
//        return;
//    }
    /*}}}*/
};
/*}}}*/
/*_ taxo_tree_move_EL_XY_WH {{{*/
/*{{{*/
const MOVE_MARGIN_U =  4;
const MOVE_MARGIN_R = 32;
const MOVE_MARGIN_D = 16;
const MOVE_MARGIN_L =  4;

/*}}}*/
let taxo_tree_move_EL_XY_WH = function(el, x,y)
{
let caller = "taxo_tree_move_EL_XY_WH"; // eslint-disable-line no-unused-vars
//log(caller+"("+lib_util.get_id_or_tag(el)+") .. [position "+el.style.position+"] .. [xy "+x+" "+y+"]");
/*{{{
}}}*/
    /* TOP LEFT {{{*/
    let bcr = el.getBoundingClientRect();
    let   w = bcr.width;
    let   h = bcr.height;

    if(w == 0) return;

    /* confine into view */
    let w_min = (BUTTONS_POD_FONT_SIZE_MIN * w / parseInt(pods_fontSize || el.style.fontSize)).toFixed(0);
    let h_min = (BUTTONS_POD_FONT_SIZE_MIN * h / parseInt(pods_fontSize || el.style.fontSize)).toFixed(0);

    /* eslint-disable no-param-reassign */
    let x_min =                                        MOVE_MARGIN_L;
    let y_min =                                        MOVE_MARGIN_U;
    let x_max = window.innerWidth  - w_min           - MOVE_MARGIN_R;
    let y_max = window.innerHeight - h_min           - MOVE_MARGIN_D;

    x = x || el.offsetLeft;
    y = y || el.offsetTop;

    x = Math.min(x, x_max);
    y = Math.min(y, y_max);
    x = Math.max(x, x_min);
    y = Math.max(y, y_min);
    /* eslint-enable  no-param-reassign */

    el.style.left   =  x+"px";
    el.style.top    =  y+"px";
    el.style.right  = "unset";
    el.style.bottom = "unset";
    /*}}}*/
    /* RESCALE {{{*/
    if(lib_util.has_el_class(el, "buttons_pod"))
        div_tools_move_RESCALE(el);

//  let pods = taxo_menu.get_taxo_pods();
//  for(let i=0; i<pods.length; ++i)
//      div_tools_move_RESCALE(pods[i]);
    /*}}}*/
/*{{{
log(caller+"("+lib_util.get_id_or_tag(el)+" .. XY=["+x+" "+y+"] .. WH=["+w+" "+h+"]) .. "+el.className);
}}}*/
};
/*}}}*/
/* UP */
/*_ taxo_tree_onUp {{{*/
let taxo_tree_onUp = function(e) // eslint-disable-line no-unused-vars
{
/*{{{*/
let   caller = "taxo_tree_onUp";
let log_this = TAXO_PODS_LOG;

if( log_this) log("taxo_tree_onUp");
/*}}}*/
    if( moving_EL)
    {
        let last_moving_EL = moving_EL;

        setTimeout(function() { taxo_tree_move_cluster(last_moving_EL); }, 0); // FINISH THE JOB

        taxo_tree_del_onmove_listener();

        save_div_tools_xy(caller);
    }

    if(!has_moved)
    {
        set_onMove_XY(e);
        has_moved = (   (Math.abs(onMoveDXY.x) >= MOVED_ENOUGH)
                     || (Math.abs(onMoveDXY.y) >= MOVED_ENOUGH));
    }
if(log_this && has_moved) log(caller+": ➔  [has_moved "+has_moved+"]");

    taxo_tree_restoreScrolling();
};
/*}}}*/
/* CLICK ➔ send_selected_state_message */
/*_ taxo_tree_onClick {{{*/
let taxo_tree_onClick = function(e) // eslint-disable-line complexity
{
/*{{{*/
if(e.altKey) return;
let   caller = "taxo_tree_onClick";
let log_this = TAXO_PODS_LOG;

let tag_this = TAXO_PODS_TAG || log_this;

    let e_target = lib_util.get_event_target(e);
if( log_this) log("%c"+caller+"( "+(e_target ? (e_target.id || e_target.nodeName) : "")+" )", lbH+lf6);
/*}}}*/
    /* [e_target] .. return {{{*/
    if(!e_target.parentElement) return;

    /*}}}*/
    /* [has_moved] .. return {{{*/
if( log_this &&  has_moved) log("%c...[has_moved "+  has_moved +"]", lf6);
if( log_this && !has_moved) log("%c...!has_moved .. onDown_EL.id=["+ (onDown_EL ? onDown_EL.id : "") +"]", lf6);


    if(!hiding_menu && has_moved) return;
    /*}}}*/

if(typeof xpath_content != "undefined")
{
let div_tools = xpath_content.get_div_tools(); /* eslint-disable-line no-undef */
//console.log("[xpath_content] ➔ %c div_tools=["+ lib_util.get_id_or_tag_and_className(div_tools) +"]", "color:black; background-color: #FAD")

/**/div_tools = taxo_pods_html_fragment.getElementById("div_tools");
//console.log("[taxo_pods_html_fragment] ➔ %c div_tools=["+ lib_util.get_id_or_tag_and_className(div_tools) +"]", "color:black; background-color: #AAF")
}

    /* TOOLS=[div_tools] ➔ [unhide .. clear .. multiple_choice_state] {{{*/
    if( e_target.parentElement.id == "div_tools")
    {
        /* UNHIDE HIDDEN MENU */
        if( hiding_menu ) {
if(log_this) log("%c HIDING: CLICKED %c"+e_target.id, lbL+lf5, lbR+lf7);
            unhide_div_tools(caller, e);
        }
        /* BUTTON: [MULTIPLE_CHOICE ON-OFF] .. [CLEAR SELECTED] */
        else {
            if(e_target.id == "taxo_clear") taxo_menu.sel_clear(e_target.id);
            if(e_target.id == "taxo_multi") set_multiple_choice_state( true, e_target.id);
            if(e_target.id == "taxo_single") set_multiple_choice_state(false, e_target.id);
        }
    }
    /*}}}*/
    /* MENU=[buttons_pod] ➔ MENU=[menu_id] OR LEAF=[taxo_id] {{{*/
    else if( lib_util.has_el_class(e_target.parentElement, "buttons_pod") )
    {
        /* CLICKED MENU ITEM {{{*/
        let taxo_id   = e_target.id;
        let menu_id   = e_target.getAttribute("data-menu");
        let is_a_leaf = e_target.classList.contains("leaf");

if(tag_this) log("%c CLICKED %c"+(menu_id || "NO menu_id")+"%c"+(taxo_id || "NO taxo_id")+"%c"+(is_a_leaf ? " leaf" : " branch")
                 ,lbb+lbH+lf5,lbL+lf6                  ,lbC+lf7                   ,lbR+lf5                              );

        /*}}}*/
        /* SELECT SUB-MENU {{{*/
        if(taxo_id && !is_a_leaf)
        {
            taxo_menu.sel_taxo_id        ( taxo_id );

            taxo_tree_display_cluster    (         );
        }
        /*}}}*/
        /* OR SELECT LEAF {{{*/
        if( is_a_leaf ) {

let menu_from_el = taxo_pods_html_fragment.getElementById(menu_id);
//console.log("menu_id=["+menu_id+"] .. menu_from_el=["+lib_util.get_id_or_tag_and_className(menu_from_el)+"]")
uncollect_e_target( menu_from_el );

            // [selected_leaf_array] OF CURRENTLY SELECTED MENU-ITEMS {{{
            let selected_leaf_array
                = multiple_choice_state ?  get_selected_leaf_array() :  [];

if(log_this) log("%c selected_leaf_array:", lf4, selected_leaf_array);
            //}}}
            // TOGGLE THEN REMOVE OR ADD CLICKED ITEM {{{
            let selected_state = !e_target.classList.contains( CSS_SELECTED );

if(log_this) log("...setting ["+lib_util.get_id_or_tag_and_className(e_target)+"] selected: "+selected_state);

            if( selected_state ) selected_leaf_array.push  (                            e_target    );
            else                 selected_leaf_array.splice(selected_leaf_array.indexOf(e_target), 1);

if(log_this) log("%c selected_leaf_array:", lf6, selected_leaf_array);

            //}}}
            // UNSELECT ALL MENU-ITEMS {{{
            let shadow_root      = document.getElementById( taxo_pods_html.SHADOW_HOST_ID );
            taxo_menu.unselect_under_parent( shadow_root.shadowRoot );

            //}}}
            // RESELECT [selected_leaf_array] {{{
if(tag_this) log(         "%c+%c"+caller+" %c SELECTING [selected_leaf_array] x"+selected_leaf_array.length
                 ,lbb+lbH+lf4,lb0         ,lbH+lb0                                                         );

            for(let i=0; i<selected_leaf_array.length; ++i)
            {
                let menu_EL      = selected_leaf_array[i];
                do {
                    lib_util.add_el_class(menu_EL, CSS_SELECTED);

                    let parent_node
                        = menu_EL.parentElement.parent_node;

                    let parent_menu
                        = parent_node
                        ?  taxo_pods_html_fragment.getElementById("menu_"+parent_node.id)
                        :  undefined;

                    let data_menu
                        = menu_EL.getAttribute("data-menu");
///*{{{*/
if(tag_this)
    log_key_val_group("menu_EL "+(i+1)+"/"+selected_leaf_array.length+" .. #"+menu_EL.id+" ["+menu_EL.innerText+"]"
                      ,{ id          : menu_EL.id
                       , innerText   : menu_EL.innerText
                       , title       : menu_EL.title
                       , "data-menu" : menu_EL.getAttribute("data-menu")
                       , parent_node
                       , data_menu
                       , parent_menu
                      }, (menu_EL.classList.contains("leaf") ? lbb+lfX[i % 10] : lbF+lfX[i % 10])
                      ,  true);

/*}}}*/
                    if( parent_menu) {
                        menu_EL = lib_util.get_el_child_with_id(parent_menu, data_menu);
if(log_this) log("%c PARENT menu_EL=["+lib_util.get_id_or_tag_and_className(menu_EL)+"]", lf5);
                    }
                    else {
                        menu_EL = null;
if(log_this) log("%c NO PARENT menu_EL", lf6);
                    }
                }
                while(menu_EL);

            }
            //}}}
            /* SEND SELECTED [TAXO_EL] TO BROWSER EXTENSION BACKGROUND SCRIPT {{{*/
/*{{{*/
if(log_this)
    log_key_val_group(caller+"("+taxo_id+")"
                      ,{ multiple_choice_state
                       , shadow_root
                       , taxo_el_parentElement  : e_target.parentElement
                       , e_target
                       , selected_state
                       , selected_leaf_array
                      }, lbH+lf7, false);
/*}}}*/

            taxo_msg.send_selected_state_message(selected_state, menu_id, taxo_id);
            /*}}}*/
        }
        /*}}}*/
        /* OR SELECT MENU {{{*/
        else {
            let   clicked_state = e_target.classList.contains( CSS_CLICKED   );
            let collected_state = e_target.classList.contains( CSS_COLLECTED );

//console.log("%c"+e_target.id+" ["+e_target.className+"] .. menu_id=["+menu_id+"]", lbR+lf7)
//console.log(".....clicked_state=["+ clicked_state   +"]")
//console.log("...collected_state=["+ collected_state +"]")

            /* [UNCOLLECT] ➔ DEL [CSS_COLLECTED] ➔ ADD [CSS_CLICKED SINGLETON] */
            if( collected_state )
            {
                uncollect_e_target( e_target );

                /* UNSELECT SUB MENU ITEMS */
                unselect_sub_menu_id("menu_"+e_target.id);

                Array.from( e_target.parentElement.querySelectorAll("."+CSS_CLICKED) )
                    .forEach( (el) => {       lib_util.del_el_class(el, CSS_CLICKED); });
                lib_util.add_el_class(e_target, CSS_CLICKED);
            }
            /* [COLLECT] ➔ DEL [CSS_CLICKED] ➔ ADD [CSS_COLLECTED]*/
            else if( clicked_state )
            {
                /* UNSELECT SUB MENU ITEMS */
                unselect_sub_menu_id("menu_"+e_target.id);

                Array.from( e_target.parentElement.querySelectorAll("."+CSS_CLICKED) )
                    .forEach( (el) => {       lib_util.del_el_class(el, CSS_CLICKED); });
                lib_util.add_el_class(e_target, CSS_CLICKED  );
                lib_util.add_el_class(e_target, CSS_COLLECTED);
            }
            /* [CLICKED] ➔ ADD [CSS_CLICKED SINGLETON] */
            else
            {
                /* ADD [CSS_CLICKED SINGLETON] */
                Array.from( e_target.parentElement.querySelectorAll("."+CSS_CLICKED) )
                    .forEach( (el) => {       lib_util.del_el_class(el, CSS_CLICKED); });
                lib_util.add_el_class(e_target, CSS_CLICKED);
            }
            /*}}}*/
        }
        /*}}}*/
    }
    /*}}}*/
};
/*}}}*/
/*_ uncollect_e_target {{{*/
let uncollect_e_target = function(e_target)
{
//console.log("%c uncollect_e_target("+e_target.id+" ["+e_target.className+"]", lbR+lf7)

    /* DEL CSS_COLLECTED */
    lib_util.del_el_class(e_target, CSS_COLLECTED);
    lib_util.del_el_class(e_target, CSS_SELECTED );

};
/*}}}*/
/*_ unselect_sub_menu_id {{{*/
let unselect_sub_menu_id = function(sub_menu_id)
{
//console.log("%c unselect_sub_menu_id("+sub_menu_id+")", lbR+lf7)

    let sub_menu = taxo_pods_html_fragment.getElementById(sub_menu_id);

//console.log("sub_menu=["+lib_util.get_id_or_tag_and_className(sub_menu)+"]")

    taxo_menu.unselect_under_parent( sub_menu );
};
/*}}}*/
/*_ set_multiple_choice_state {{{*/
let     multiple_choice_state = true;
let set_multiple_choice_state = function(state, _caller)
{
/*{{{*/
    let caller = "set_multiple_choice_state";
let log_this = TAXO_PODS_LOG;

let tag_this = TAXO_PODS_TAG || log_this;
/*}}}*/

    multiple_choice_state = state;
if(tag_this) log("%c"+caller+": "+_caller+"%c multiple_choice_state "+multiple_choice_state
                 ,lbL+lf3                 ,lbC+lf4                                         );

    let taxo_single = taxo_pods_html_fragment.getElementById("taxo_single");
    let taxo_multi = taxo_pods_html_fragment.getElementById("taxo_multi");
    let taxo_clear = taxo_pods_html_fragment.getElementById("taxo_clear");

    taxo_single.title = "Allowing ONLY ONE selection  for a page";   // TAXO_SINGLE_BUTTON .. javascript/taxo_pods_html.js
    taxo_clear.title = "CLEAR all page selections";                 // TAXO_CLEAR_BUTTON
    taxo_multi.title = "Allowing MULTIPLE selections for a page";   // TAXO_MULTI_BUTTON

    lib_util.set_el_class_on_off(taxo_single, CSS_SELECTED, !state);
    lib_util.set_el_class_on_off(taxo_multi , CSS_SELECTED,  state);

    if( !multiple_choice_state ) taxo_menu.sel_clear(_caller);
};
/*}}}*/
/*_ get_selected_leaf_array {{{*/
let get_selected_leaf_array = function()
{
    return Array.from( taxo_pods_html_fragment.querySelectorAll(".selected.leaf") );
};
/*}}}*/
/* RESIZE */
/*_ taxo_tree_onResize {{{*/
/*{{{*/
const INTRO_ONRESIZE_DELAY = 500;

let taxo_tree_onResize_timer;
/*}}}*/
let taxo_tree_onResize = function(e)
{

if(TAXO_PODS_LOG) logBIG(e.type+" LAYOUT");

    if(taxo_tree_onResize_timer) clearTimeout(taxo_tree_onResize_timer);
    taxo_tree_onResize_timer   =   setTimeout(taxo_tree_onResize_handler, INTRO_ONRESIZE_DELAY);
};
/*}}}*/
/*_ taxo_tree_onResize_handler {{{*/
let taxo_tree_onResize_handler = function()
{
    taxo_tree_onResize_timer = null;

};
/*}}}*/
/* KEY */
/*_ taxo_tree_onKey_CB {{{*/
//const CHAR_CODE_ESC = 27;

let taxo_tree_onKey_CB = function(e)
{
if(e.altKey) return;

    let charCode
        = (e.keyCode)
        ?  e.keyCode
        :  e.which
        ;
if(TAXO_PODS_LOG) logBIG("KEY: "+charCode, lf7);

//  if(charCode != CHAR_CODE_ESC) return;

//  taxo_tree_standby();
};
/*}}}*/
/* SCROLL */
/*_ div_tools_preventScrolling {{{*/
let div_tools_preventScrolling = function(_caller)
{
/*{{{*/
let   caller = "div_tools_preventScrolling";
let log_this = TAXO_PODS_LOG;

/*}}}*/
    /* NO SCROLLBAR TO HIDE {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if(!on_touch_device && !lib_util.has_scrollbar(document.documentElement)) return;

    /* }}}*/
    /* APPLY CACHED [scrolling_context] {{{*/
    let c = document.documentElement.scrolling_context;
    if( c ) {
        document.documentElement.style.overflow     =  "hidden";
        document.documentElement.style.marginRight  = c.hidden_marginRight;
        document.documentElement.style.marginBottom = c.hidden_marginBottom;

    }
    /*}}}*/
    /* CACHE [scrolling_context] {{{*/
    else {
        /* SAVE OVERFLOW AND MARGINS */
        let          bcr_standby = document.documentElement.getBoundingClientRect();
        let           cs_standby =   window.getComputedStyle(document.documentElement);
        let standby_overflow     =          cs_standby.overflow     ;
        let standby_marginRight  = parseInt(cs_standby.marginRight        )+"px";
        let standby_marginBottom = parseInt(cs_standby.marginBottom       )+"px";

        /* DO THE HIDING */        document.documentElement.style.overflow = "hidden";

        /* TAKE A NOTE OF BOUNDINGS CHANGE */
        let          bcr_hidden  = document.documentElement.getBoundingClientRect();
        let           cs_hidden  =   window.getComputedStyle(document.documentElement);
        let                 d_w  = bcr_hidden.width  - bcr_standby.width;
        let                 d_h  = bcr_hidden.height - bcr_standby.height;

        /* ADJUST MARGINS TO COMPENSATE FOR HIDDEN SCROLLBARS */
        let hidden_marginRight   = (parseInt(cs_hidden.marginRight ) + d_w)+"px";
        let hidden_marginBottom  = (parseInt(cs_hidden.marginBottom) + d_h)+"px";
        document.documentElement.style.marginRight  = hidden_marginRight;
        document.documentElement.style.marginBottom = hidden_marginBottom;

        /* CACHE WORKING VALUES */
        document.documentElement.scrolling_context
            = {  standby_overflow
              ,  standby_marginRight
              ,  standby_marginBottom
              ,  d_w
              ,  d_h
              ,  hidden_marginRight
              ,  hidden_marginBottom
            };

    }
    /*}}}*/
/*{{{*/
if( log_this) {

    if(document.documentElement.scrolling_context)
        log_key_val_group(_caller+"➔"+caller+": scrolling_context"
            , document.documentElement.scrolling_context
            , lbH+lf9, false);

    log_key_val_group("documentElement OVERFLOW HIDDEN",
        { overflow     : document.documentElement.style.overflow
        , marginRight  : document.documentElement.style.marginRight
        , marginBottom : document.documentElement.style.marginBottom
        }, lf2, false);
}
/*}}}*/
};
/*}}}*/
/*_ taxo_tree_restoreScrolling {{{*/
let taxo_tree_restoreScrolling = function()
{
/*{{{*/
let   caller = "taxo_tree_restoreScrolling";
let log_this = TAXO_PODS_LOG;

/*}}}*/
    /* NO SCROLLBAR TO HIDE {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if(!on_touch_device && !lib_util.has_scrollbar(document.documentElement)) return;

    /* }}}*/
    /* APPLY CACHED [scrolling_context] {{{*/
    let c = document.documentElement.scrolling_context;
    if( c ) {
        document.documentElement.style.overflow     = c.standby_overflow;
        document.documentElement.style.marginRight  = c.standby_marginRight;
        document.documentElement.style.marginBottom = c.standby_marginBottom;

    }
    /*}}}*/
/*{{{*/
if( log_this ) {

    log_key_val_group(caller+": documentElement OVERFLOW HIDDEN",
        { overflow     : document.documentElement.style.overflow
        , marginRight  : document.documentElement.style.marginRight
        , marginBottom : document.documentElement.style.marginBottom
        , callers      : lib_log.get_callers()
        }, lf2, false);

    if(document.documentElement.scrolling_context)
        log_key_val_group("...document.documentElement.scrolling_context"
            , document.documentElement.scrolling_context
            , lbH+lf9, false);

}
/*}}}*/
};
/*}}}*/
/*_ taxo_tree_onScroll {{{*/
let taxo_tree_onScroll = function(e) // eslint-disable-line no-unused-vars
{
let log_this = TAXO_PODS_LOG;

if( log_this) logBIG("taxo_tree_onScroll");

    if(moving_EL) taxo_tree_del_onmove_listener();
};
/*}}}*/
/* UNLOAD */
/*_ taxo_tree_onbeforeunload {{{*/
let taxo_tree_onbeforeunload = function(e)
{
//  save_div_tools_xy("taxo_tree_onbeforeunload");
};
/*}}}*/
/*}}}*/

/* EXPORT */
/*{{{*/
return { name : "taxo_pods"
    ,    taxo_pods_init
    ,    load_div_tools_xy
    ,    taxo_tree_display_cluster
    ,    taxo_tree_move_cluster
    ,    unhide_div_tools
    ,    pods_fontSize
    ,    set_multiple_choice_state
};
/*}}}*/
}());
/*}}}*/





/* EXPORT {{{*/
/*{{{*/
return { taxo_pods_init        : taxo_pods.taxo_pods_init
    ,    set_activated         : taxo_msg.set_activated
    // DEBUG {{{
    , activate                : taxo_msg.set_activated
    , get_selected_leaf_array : taxo_pods.get_selected_leaf_array
    , check_taxo_json         : taxo_menu.check_taxo_json
    , log_taxo_id             : taxo_menu.log_taxo_id
    , search_id_from_node     : taxo_menu.search_id_from_node
    , iterate           : () => taxo_menu.iterate(taxo_json,0)
    , taxo_tree_move_cluster  : taxo_pods.taxo_tree_move_cluster
    , unselect_under_parent   : taxo_menu.unselect_under_parent
    , load_div_tools_xy       : taxo_pods.load_div_tools_xy
    //}}}
};
/*}}}*/
/*}}}*/
})();

/* ONLOAD INIT */
taxo_content.taxo_pods_init();

/* NOTE: DATA JSON //{{{
 *
 *   taxonomie.json:
 *
 *    entry = { id title description list[] }
 *     list = [ entry ]
 *
 *///}}}
/* NOTE: EDITOR {{{
 *
 * Folding may be activated for editors able to use Vim {{{ and }}} folding markers.
 *
 * vim: sw=4 foldmethod=marker
 *
 *///}}}
/*{{{

[scroll]
    :!start explorer "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo"
    :!start explorer "https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions"

}}}*/
/*{{{
    manifest.json

    javascript/taxo_background.js
    javascript/taxo_content.js

    javascript/taxo_json_201118.js
    javascript/taxo_json_211218.js

    javascript/taxo_pods_html.js

}}}*/

