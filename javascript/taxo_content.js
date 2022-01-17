// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [taxo_content] ................................. EXTENSION CONTENT SCRIPT │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* globals lib_log, taxo_tools, taxo_json, chrome */
/* globals console, window, document, setTimeout, clearTimeout, setInterval, clearInterval */
/* globals requestAnimationFrame */
/* globals lib_util */
/* globals lib_popup */ /* eslint-disable-line no-unused-vars */
/* globals lib_tools */

/* globals config_js */
/* globals event_listeners */ /* eslint-disable-line no-unused-vars */
/* globals xpath_content */
/* globals xpath_tools */

/* exported TAXO_CONTENT_SCRIPT_TAG */

/* eslint-disable      no-warning-comments */

const TAXO_CONTENT_SCRIPT_ID   = "taxo_content";
const TAXO_CONTENT_SCRIPT_TAG  =  TAXO_CONTENT_SCRIPT_ID  +" (220117:19h:33)";
/*}}}*/
let   taxo_content = (function() {
"use strict";

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ LOG .................................. [console] [objects] [taxo_content] │
// └───────────────────────────────────────────────────────────────────────────┘
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
/*_ taxo_tools_require_lib_log {{{*/
let taxo_tools_require_lib_log = function()
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
taxo_tools_require_lib_log();
/* eslint-ensable no-unused-vars */
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ UTIL ..................................... [CSS classList] [taxo_content] │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
let add_el_class        = lib_util.add_el_class;
let del_el_class        = lib_util.del_el_class;
let has_el_class        = lib_util.has_el_class;
let set_el_class_on_off = lib_util.set_el_class_on_off;
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ TOOLS ........................ [shadow_host] [shadow_root] [taxo_content] │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
const SHADOW_HOST_ID = "taxo_shadow_host"; // javascript/taxo_tools.js
const   DIV_TOOLS_ID = "taxo_tools";

/* eslint-disable no-unused-vars */
let get_used_shadow_host_id = (     ) => lib_tools.get_used_shadow_host_id(SHADOW_HOST_ID);
let get_shadow_host         = (     ) => lib_tools.get_shadow_host        (SHADOW_HOST_ID);
let get_shadow_root         = (     ) => lib_tools.get_shadow_root        (SHADOW_HOST_ID);
let get_div_tools           = (     ) => lib_tools.get_div_tools          (DIV_TOOLS_ID,SHADOW_HOST_ID);
let get_is_a_div_tools_el   = (el   ) => lib_tools.get_is_a_div_tools_el  (DIV_TOOLS_ID, el);
let get_use_lib_shadow_root = (     ) => lib_tools.get_use_lib_shadow_root();
let set_use_lib_shadow_root = (state) => lib_tools.set_use_lib_shadow_root(state);
/* eslint-ensable no-unused-vars */
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ ACTIVATE ................................................. [taxo_content] │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
let options = {};
/*}}}*/
    /*_ on_activated_load_options {{{*/
    let on_activated_load_options = function(request)
    {
    /*{{{*/
    let   caller = "on_activated_load_options";
    let log_this = options.LOG2_MESSAGE || options.LOG5_DIV_TOOLS;

    let tag_this = log_this || options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;
    if( tag_this) log_sep_top("LOADING OPTIONS FROM "+Object.keys(request||{}).length+" REQUEST KEYS", 5);
    //console.trace()
    /*}}}*/
        /* [options] FROM BACKGROUND SCRIPT MESSAGE (activated) {{{*/
        if(request && typeof request.activated != "undefined")
        {
    if(tag_this) log_key_val("➔ FROM BACKGROUND SCRIPT MESSAGE (activated) request", request, 4);

            /* client controls all options, except [activated] .. (which is controled by browser_action_click) */
            Object.keys(request).forEach( function(k) { options[k] = request[k]; });
        }
        /*}}}*/
        /* [options] FROM EMBEDDED PAGE DOMAIN [localStorage] {{{*/
        else {
if( log_this) log("➔ FROM EMBEDDED PAGE DOMAIN [localStorage]:");

            // ┌───────────────────────────────────────────────────────────────────┐
            // │ [use_lib_shadow_root] FROM [OPTION_KEYS]                          │
            // └───────────────────────────────────────────────────────────────────┘
            for(let i=0;i< config_js.OPTION_KEYS.length; ++i)
            {
                let key  = config_js.OPTION_KEYS[i];
                let val  = lib_util.localStorage_getItem( key );
                if( val  ) options[key] =     JSON.parse( val );
            }

            // ┌───────────────────────────────────────────────────────────────────┐
            // │ [use_lib_shadow_root] FROM [localStorage]                         │
            // └───────────────────────────────────────────────────────────────────┘
            if(typeof options.use_lib_shadow_root == "undefined")
            {
                /**/  options.use_lib_shadow_root  = lib_util.localStorage_getItem("use_lib_shadow_root");
                if(   options.use_lib_shadow_root == null) delete options.use_lib_shadow_root;
            }
        }
        /*}}}*/
        /* [options] FROM DEFAULT [lib_util] {{{*/
        if(typeof options.use_lib_shadow_root == "undefined")
            options.use_lib_shadow_root = lib_util.USE_LIB_SHADOW_ROOT;

//log("use_lib_shadow_root=["+ options.use_lib_shadow_root+"]")
        /*}}}*/

if( log_this) log_key_val("options", options, 6);
if( tag_this) log_sep_bot(caller, 5);
    };
    /*}}}*/

// ┌──────────────┐ ┌──────────────────────────────────────────────────────────┐
// │ taxo_pods    │-│ [STATE-TRANSITION [selected] [collected] [EVENTS LAYOUT] │
// └──────────────┘ └──────────────────────────────────────────────────────────┘
/*{{{*/
let   taxo_pods     = (function() {
//"use strict";

/* LOG {{{*/
const TAXO_PODS_LOG = false;
const TAXO_PODS_TAG = false;

/*}}}*/
/*➔ buttons_fontSize {{{*/
const BUTTONS_FONT_SIZE                   = 64;
const BUTTONS_FONT_SIZE_MIN               =  6;
let   buttons_fontSize                    = BUTTONS_FONT_SIZE_MIN;

/*}}}*/
/* CSS {{{*/
const CSS_BUTTONS_POD       = "buttons_pod";

const CSS_CLICKED           = "clicked";
const CSS_COLLECTED         = "collected";
const CSS_HIDDEN            = "hidden";
const CSS_SELECTED          = "selected";
const CSS_VISITED           = "visited";

const SELECTOR_BUTTONS_POD  = "."+CSS_BUTTONS_POD;
const SELECTOR_CLICKED      =                      "."+CSS_CLICKED;
const SELECTOR_COLLECTED    =                      "."+CSS_COLLECTED;
const SELECTOR_HIDDEN       =                      "."+CSS_HIDDEN;
const SELECTOR_SELECTED     =                 ".leaf."+CSS_SELECTED;
const SELECTOR_VISITED      =                      "."+CSS_VISITED;

//nst SELECTOR_CLICKED      = "."+ CSS_CLICKED   +"[data-menu]";
//nst SELECTOR_SELECTED     = "."+ CSS_SELECTED  +"[data-menu]";
//nst SELECTOR_COLLECTED    = "."+ CSS_COLLECTED +"[data-menu]";

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ SHOW MENU ............................................... [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*➔ show_top_menu {{{*/
let show_top_menu = function()
{
    /* GUI YET NOT BUILT */
    let shadow_root = get_shadow_root();
    if(!shadow_root        ) return;

    /* SHOW TAXO TOP MENU */
    show_taxo_id( taxo_json.id );

    if(!first_visibility_timer )
    /**/first_visibility_timer =   setTimeout(first_visibility_timer_handler, FIRST_VISIBILITY_DELAY);
};
/*}}}*/
/*_ first_visibility_timer_handler {{{*/
/*{{{*/
const FIRST_VISIBILITY_DELAY = 1000;

let   first_visibility_timer;
/*}}}*/
let first_visibility_timer_handler = function()
{
    first_visibility_timer = null;

    let shadow_root = get_shadow_root();
    let el_array    = shadow_root.querySelectorAll(taxo_pods.SELECTOR_BUTTONS_POD+":not("+taxo_pods.SELECTOR_HIDDEN+")");
//log("el_array:",el_array)
    el_array.forEach((el) => el.style.opacity = 1);
};
/*}}}*/
/*_ show_taxo_id {{{*/
let show_taxo_id = function(taxo_id)
{
    undisplay_menu_EL_all("show_taxo_id");

    let taxo_id_CSV   = taxo_menu.get_node_path_of_taxo_id( taxo_id );

    let taxo_id_array = String(taxo_id_CSV).split(",");
//log("taxo_id_array:",taxo_id_array)

    dodisplay_menu_EL_id_path_array(taxo_id_array, null, "show_taxo_id");

    click_taxo_id_array( taxo_id_array );

/*{{{
j0"qy$
0EB"*y$
    id="ALL"                 ; taxo_content.show_taxo_id(id);
    id="BATHING_SUIT_MEN"    ; taxo_content.show_taxo_id(id);
    id="EV_CARS"             ; taxo_content.show_taxo_id(id);
    id="OIL_CARS"            ; taxo_content.show_taxo_id(id);
    id="HOUSEHOLD_APPLIANCES"; taxo_content.show_taxo_id(id);

}}}*/
};
/*}}}*/
/*_ click_taxo_id_array {{{*/
let click_taxo_id_array = function(taxo_id_array)
{
    /* [CSS_CLICKED] ALL [taxo_id] PARENT MENU */
    let shadow_root = get_shadow_root();
    for(let i=0; i< taxo_id_array.length; ++i)
    {

        let taxo_id
            = taxo_id_array[i].startsWith("menu_")
            ? taxo_id_array[i].substring(5)
            : taxo_id_array[i];

        let leaf_el = shadow_root.getElementById( taxo_id );

        add_el_class(leaf_el, CSS_CLICKED);
    }
};
/*}}}*/
/*_ show_menu_taxo_id {{{*/
let show_menu_taxo_id = function(taxo_id,clicked_EL)
{
/*{{{*/
    let caller = "show_menu_taxo_id";
let log_this = options.LOG1_STEP;

/*}}}*/
if( log_this) log("%c show_menu_taxo_id("+taxo_id+")", lbR+lf7);

    let menu_EL = taxo_menu.get_menu_EL_for_taxo_id(taxo_id, clicked_EL);

if( log_this) log("menu_EL=["+lib_util.get_id_or_tag_and_className(menu_EL)+"]");

    if( menu_EL )
        dodisplay_menu_EL(menu_EL, caller);
};
/*}}}*/
/*➔ show_visible_menu {{{*/
let show_visible_menu = function(_caller) // eslint-disable-line no-unused-vars
{
    let unhiding_fontSize = BUTTONS_FONT_SIZE_MIN * 2;
    if(parseInt(buttons_fontSize) < unhiding_fontSize)
        buttons_fontSize          = unhiding_fontSize+"px";

    display_activated_cluster();

    layout_cluster();
};
/*}}}*/
/*➔ display_activated_cluster {{{*/
/*{{{*/
const DISPLAYED_PODS_FONTSIZE_MIN = 8;

let taxo_menu_hidden;
//t last_fontSizeInt;
/*}}}*/
let display_activated_cluster = function()
{
    let visible_menu_EL_array = get_visible_taxo_menu_EL_array();
    if(!visible_menu_EL_array.length  ) return "!visible_menu_EL_array";

    let fontSizeInt           = parseInt( buttons_fontSize );
    let activated             = taxo_msg.is_activated();
    taxo_menu_hidden
        =  !activated
        || (fontSizeInt       < DISPLAYED_PODS_FONTSIZE_MIN);

/*{{{
if(fontSizeInt != last_fontSizeInt)
{
    let l_x = lbH + lfX[taxo_menu_hidden ? 0 : (fontSizeInt % 10)];

    log("display_activated_cluster:%c"
        +" [taxo_menu_hidden "         + taxo_menu_hidden            +"]"
        +" [MIN "                      + DISPLAYED_PODS_FONTSIZE_MIN +"]"
        +" [buttons_fontSize "            + buttons_fontSize               +"]"
        +" [visible_menu_EL_array.length " + visible_menu_EL_array.length    +"]"
        , l_x);
}
last_fontSizeInt = fontSizeInt;
}}}*/

    if( taxo_menu_hidden ) { let msg =  "HIDING CLUSTER"; undisplay_menu_EL_array(visible_menu_EL_array, msg); return msg; }
    else                   { let msg = "SHOWING CLUSTER"; dodisplay_menu_EL_array(visible_menu_EL_array, msg); return msg; }

};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ STATE-TRANSITION .. [SHOW HIDE DISPLAY] ................. [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/

    // ┌──────────────────────┐
    // │ MENU QUERY CSS ARRAY │
    // └──────────────────────┘
/*_ set_taxo_id_path_CSS {{{*/
let set_taxo_id_path_CSS = function(taxo_id_CSV,className)
{
/*{{{*/
let caller = "set_taxo_id_path_CSS";
let log_this = options.LOG1_STEP;

/*}}}*/
if( log_this) log("%c "+caller+"%c"+className+"%c x"+taxo_id_CSV.length+"\n"
                  ,lbb+lbL+lf3 ,lbb+lbC       ,lbb+lbR              , taxo_id_CSV);
if( log_this) log("%c●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●", lf0);

    let shadow_root = get_shadow_root();
    let pods_path   = String(taxo_id_CSV).split(",");
    for(let i= 0; i < pods_path.length; ++i)
    {
        /* ADD ALL LEADING MENU TO THIS MENU ITEM */
        let path_string         = pods_path[i];
        let path_array          = path_string.split(".");
        let              m_leaf = path_array.length-1;
        let menu_EL;
        let lead_taxo_id;
        for(let m=0; m < m_leaf; ++m)
        {
            lead_taxo_id = path_array[m];
if( log_this) log("%c \u21F6 ["+                            lead_taxo_id+"]", lfX[i+1]);
            let el = shadow_root.querySelector("#"+lead_taxo_id);
            add_el_class(el, CSS_CLICKED);

            menu_EL = taxo_menu.get_menu_EL_for_taxo_id( lead_taxo_id );
        }

        /* SET ITEM [className] */
        let tail_taxo_id = path_array[m_leaf];
if( log_this) log("%c ● ["+tail_taxo_id+"]", lfX[i+1]);
        let taxo_id      = tail_taxo_id;
        let taxo_id_el   = shadow_root.getElementById( taxo_id );
        add_el_class(taxo_id_el, className);


if( log_this) log("%c●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●", lf0);
    }
};
/*}}}*/
/*_ query_taxo_id_path_CSS_array {{{*/
/*{{{*/
let   clicked_DOM_EL_array = [];
let collected_DOM_EL_array = [];
let  selected_DOM_EL_array = [];
let   visited_DOM_EL_array = [];

/*}}}*/
let query_taxo_id_path_CSS_array = function(_caller)
{
/*{{{*/
let caller = "query_taxo_id_path_CSS_array";
let log_this = TAXO_PODS_LOG;

/*}}}*/
    let shadow_root = get_shadow_root();

    /* UPDATING LAST QUERIED [taxo_pods] DOM COLLECTIONS */
    /**/   clicked_DOM_EL_array = Array.from(shadow_root.querySelectorAll(   SELECTOR_CLICKED ));
    /**/ collected_DOM_EL_array = Array.from(shadow_root.querySelectorAll( SELECTOR_COLLECTED ));
    /**/  selected_DOM_EL_array = Array.from(shadow_root.querySelectorAll(  SELECTOR_SELECTED ));
    /**/   visited_DOM_EL_array = Array.from(shadow_root.querySelectorAll(   SELECTOR_VISITED ));

    let result = {   clicked_DOM_EL_array
        ,          collected_DOM_EL_array
        ,           selected_DOM_EL_array
        ,            visited_DOM_EL_array
    };
if( log_this ) log("%c"+caller+"("+_caller+")", lbH);
if( log_this ) log(  clicked_DOM_EL_array.length +"x %c CLICKED.....:\n", lf4,   clicked_DOM_EL_array);
if( log_this ) log(collected_DOM_EL_array.length +"x %c COLLECTED...:\n", lf7, collected_DOM_EL_array);
if( log_this ) log( selected_DOM_EL_array.length +"x %c SELECTED....:\n", lf5,  selected_DOM_EL_array);
if( log_this ) log(  visited_DOM_EL_array.length +"x %c VISITED.....:\n", lf6,   visited_DOM_EL_array);

    return result;
};
/*}}}*/
/*_ unselect_under_menu_EL {{{*/
let unselect_under_menu_EL = function(menu_EL)
{
    let el_array = menu_EL.children;
    if(!el_array.length) return;

    let  shadow_root = get_shadow_root();

    Array.from(el_array ).forEach((el) => {
        unselect_menu_EL ( el );
        uncollect_menu_EL( el );

        let sub_menu_EL = shadow_root.getElementById("menu_"+el.id);
        if( sub_menu_EL ) unselect_under_menu_EL( sub_menu_EL );
    });
};
/*}}}*/
/*_ sync_taxo_clear_button {{{*/
let sync_taxo_clear_button = function(_caller)
{
/*{{{*/
let caller = "sync_taxo_clear_button";
let log_this = options.LOG1_STEP;

/*}}}*/
    /* VISIBLE PODS [m_count] .. number of menu showing {{{*/
    let               shadow_root = get_shadow_root();
    let el_array    = shadow_root.querySelectorAll(taxo_pods.SELECTOR_BUTTONS_POD+":not("+taxo_pods.SELECTOR_HIDDEN+")");
    let m_count     = el_array.length;
    /**/el_array.forEach((el) => m_count -= (el.style.visibility == "hidden") ? 1 : 0); // remove invisible menus
//log("m_count:",m_count)

    /*}}}*/
    /* DOM [collected] [selected] [visited] {{{*/
    query_taxo_id_path_CSS_array(caller);
    let c_count     = collected_DOM_EL_array.length;
    let s_count     =  selected_DOM_EL_array.length;
    let v_count     =   visited_DOM_EL_array.length;

    /*}}}*/
    /* BUTTON[taxo_clear] [className] {{{*/

    let taxo_clear
        = shadow_root.querySelector("#taxo_clear");

    let className
        = "cleared "
        + (     ((c_count  ) && "fg5")
            ||  ((s_count  ) && "fg4")
            ||  ((v_count  ) && "fg6")
            ||  ((m_count>1) && "fg3")
            ||  ((m_count>0) && "fg0")
            ||  (               "fg9")
          );

    taxo_clear.className = className;
    /*}}}*/
    /* BUTTON[taxo_clear] [title] {{{*/

    let title_count
        = (c_count ? (     c_count+" collected"): "")
        + (s_count ? ("\n"+s_count+" selected" ): "")
        + (v_count ? ("\n"+v_count+" visited"  ): "");

    let title_action
        =  (  c_count         && ("click to clear "+c_count+" collected" ))
        || (  s_count         && ("click to clear "+s_count+" selected"  ))
        || (  v_count         && ("click to clear "+v_count+" visited"   ))
        || ( (m_count    > 1) && ("click for TOP MENU ONLY"              ))
        || ( (m_count    > 0) && ("click to UNLOAD ALL SELECTIONS"       ))
        || (!is_cache_empty() && ("click to RELOAD SELECTIONS FROM CACHE"))
        || (                     ("YET NO SELECTIONS FOR THIS PAGE"      ));

    taxo_clear.title
        =       title_count
        +"\n➔ "+title_action;

    /* BLINK ONLY */
//  setTimeout(function() { taxo_clear.className = ""; }, 500); /* BLINK */

    /*}}}*/
/*{{{*/
if( log_this)
    log_key_val_group(caller+"("+_caller+")"
                      ,{ className
                       , c_count
                       , s_count
                       , v_count
                       , taxo_clear_title : taxo_clear.title
                       ,           caller : lib_log.get_callers()
                      }
                      , lfX[(s_count && 4) || (c_count && 5) || (v_count && 6) || 0]
                      , false
                     );

/*}}}*/
};
/*}}}*/

    // ┌──────────────┐
    // │ CSS_SELECTED │
    // └──────────────┘
/*{{{*/
let   selected_menu_EL_array  = [];
/*_ set_taxo_id_path_SELECTED {{{*/
let set_taxo_id_path_SELECTED = function(taxo_id_path_CSV)
{
    set_taxo_id_path_CSS(taxo_id_path_CSV, CSS_SELECTED);
};
/*}}}*/
/*➔ get_selected_taxo_id_path_array {{{*/
let get_selected_taxo_id_path_array = function()
{
//log("%c SELECTED", lbH+lf5)
    let selected_taxo_id_path_array = [];

    get_selected_EL_array()
        .forEach( (el) => {
            let taxo_id_path = taxo_menu.get_taxo_id_path(el.id);
//log(taxo_id_path)

            selected_taxo_id_path_array.push( taxo_id_path );
        });

    return selected_taxo_id_path_array;
};
/*}}}*/
/*_ get_selected_EL_array {{{*/
let get_selected_EL_array = function()
{
    let       shadow_root = get_shadow_root();
    return Array.from( shadow_root.querySelectorAll( SELECTOR_SELECTED ) );
};
/*}}}*/

/*_ onClick_get_selected_EL_array {{{*/
let onClick_get_selected_EL_array = function()
{
/*{{{*/
let   caller = "onClick_get_selected_EL_array";
let log_this = options.LOG1_EVENT;

/*}}}*/
    selected_menu_EL_array  = multiple_choice_state ? get_selected_EL_array() : [];

if( log_this) log(         "%c+%c"+caller+" %c SELECTED   [ selected_menu_EL_array] x"+ selected_menu_EL_array.length
                 , lbb+lbH+lf4,lb0         ,lbH+lf5                                                                  );
};
/*}}}*/
/*_ onClick_clear_all_CSS_SELECTED {{{*/
let onClick_clear_all_CSS_SELECTED = function()
{
    let         shadow_root = get_shadow_root();
    Array.from( shadow_root.querySelectorAll( SELECTOR_SELECTED))
        .forEach((el) => del_el_class(el,          CSS_SELECTED)
                );
};
/*}}}*/
/*_ onClick_apply_selected_EL_array {{{*/
let onClick_apply_selected_EL_array = function()
{
/*{{{*/
let   caller = "onClick_apply_selected_EL_array";
let log_this = options.LOG1_EVENT;

if( log_this) log(         "%c+%c"+caller+" %c SELECTING  [ selected_menu_EL_array] x"+ selected_menu_EL_array.length
                , lbb+lbH+lf4,lb0         ,lbH+lf5                                                            );
/*}}}*/
        for(let i=0; i<selected_menu_EL_array.length; ++i)
        {
            let menu_EL      = selected_menu_EL_array[i];
if( log_this) log("%c SELECT  ➔ SELECT ["+menu_EL.id+"]", lf5);

            add_el_class(menu_EL, CSS_SELECTED);
        }
};
/*}}}*/

/*_ doselect_menu_EL {{{*/
let doselect_menu_EL = function(menu_EL)
{
/*{{{*/
let   caller = "doselect_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"("+menu_EL.id+") .. multiple_choice_state=["+multiple_choice_state+"]", lf5);
/*}}}*/

    if(!multiple_choice_state) selected_menu_EL_array.splice(0); // NO MUTATION
    selected_menu_EL_array.push( menu_EL );

    unclick_menu_EL       ( menu_EL );
    add_el_class          ( menu_EL , CSS_SELECTED);
};
/*}}}*/
/*➔ unselect_menu_EL_all {{{*/
let unselect_menu_EL_all = function()
{
/*{{{*/
let   caller = "unselect_menu_EL_all";
let log_this = TAXO_PODS_LOG;

let tag_this = TAXO_PODS_TAG || log_this;
if( tag_this) log(         "%c-%c"+caller
                 ,lbb+lbH+lf2,lb0       );
/*}}}*/

    query_taxo_id_path_CSS_array(caller);

if( tag_this) log("%c"+caller+": UNSELECTING (x"+selected_DOM_EL_array.length+")", lbH+lf5);

    if( selected_DOM_EL_array )
    {
        for(let i=0; i<selected_DOM_EL_array.length; ++i)
        {
            let menu_EL = selected_DOM_EL_array[i];
/*{{{*/
if(tag_this)
    log_key_val_group(" menu_EL "+(i+1)+"/"+selected_DOM_EL_array.length+" .. #"+menu_EL.id+" ["+menu_EL.innerText+"]"
                      ,{ id          : menu_EL.id
                       , innerText   : menu_EL.innerText
                       , title       : menu_EL.title
                       , "data-menu" : menu_EL.getAttribute("data-menu")
                      }, (has_el_class(menu_EL, "leaf") ? lfX[i % 10] : lbF+lfX[i % 10])
                      ,  true);
/*}}}*/
            unselect_menu_EL( menu_EL );
        }
    }

if(TAXO_PODS_TAG) logBIG(caller+" "+selected_DOM_EL_array.length+" SELECTION CLEARED");

    return selected_DOM_EL_array.length;
};
/*}}}*/
/*_ unselect_menu_EL {{{*/
let unselect_menu_EL = function(menu_EL)
{
/*{{{*/
let   caller = "unselect_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"("+menu_EL.id+")", lf3);
/*}}}*/

    let idx  =     selected_menu_EL_array .indexOf(menu_EL);
    if( idx >= 0)  selected_menu_EL_array .splice ( idx, 1);
if( log_this) log("selected_menu_EL_array.length:",selected_menu_EL_array.length);

    del_el_class   ( menu_EL , CSS_SELECTED);
  //unclick_menu_EL( menu_EL );
};
/*}}}*/
/*➔ unselect_menu_id {{{*/
let unselect_menu_id = function(menu_id, level=1)
{
let caller = "unselect_menu_id"; /* eslint-disable-line no-unused-vars */

    let shadow_root = get_shadow_root();
    let sub_menu_EL = shadow_root.getElementById( menu_id );
    if(!sub_menu_EL) return;
//log("%c "+caller+"("+menu_id+") .. sub_menu_EL=["+sub_menu_EL.id+"] ➔ "+sub_menu_EL.children.length+" children", lfX[level]);

    let prefix = "➔➔➔➔➔➔➔➔➔➔".substring(0,level); /* eslint-disable-line no-unused-vars */
    for(let i=0; i<sub_menu_EL.children.length; ++i)
    {
        let   child = sub_menu_EL.children[i];

        let checked = has_el_class(child,  CSS_COLLECTED )
            ||        has_el_class(child,  CSS_SELECTED  )
            ||        has_el_class(child,  CSS_CLICKED   );
        if( checked )
        {
//log(caller+" %c"+prefix+" ["+menu_id+"] %c "+child.id, lfX[level], (checked ? lbF : "")+lfX[level])

            unselect_menu_EL ( child );
            uncollect_menu_EL( child );
        }

        /* recurse through all sub-menu */
        if(!has_el_class(child, "leaf")) unselect_menu_id("menu_"+child.id, level+1);
    }

};
/*}}}*/
/*}}}*/

    // ┌───────────────┐
    // │ CSS_COLLECTED │
    // └───────────────┘
/*{{{*/
let   collected_menu_EL_array  = [];
/*_ set_taxo_id_path_COLLECTED {{{*/
let set_taxo_id_path_COLLECTED = function(taxo_id_path_CSV)
{
    set_taxo_id_path_CSS(taxo_id_path_CSV, CSS_COLLECTED);
};
/*}}}*/
/*➔ get_collected_taxo_id_path_array {{{*/
let get_collected_taxo_id_path_array = function()
{
//log("%c COLLECTED", lbH+lf7)
    let collected_taxo_id_path_array = [];

    get_collected_EL_array()
        .forEach( (el) => {
            let taxo_id_path = taxo_menu.get_taxo_id_path(el.id);
//log(taxo_id_path)

            collected_taxo_id_path_array.push( taxo_id_path );
        });

    return collected_taxo_id_path_array;
};
/*}}}*/
/*_ get_collected_EL_array {{{*/
let get_collected_EL_array = function()
{
    let                shadow_root = get_shadow_root();
    return Array.from( shadow_root.querySelectorAll( SELECTOR_COLLECTED) );
};
/*}}}*/

/*_ onClick_get_collected_EL_array {{{*/
let onClick_get_collected_EL_array = function()
{
/*{{{*/
let   caller = "onClick_get_collected_EL_array";
let log_this = options.LOG1_EVENT;

/*}}}*/
    collected_menu_EL_array = multiple_choice_state ?  get_collected_EL_array() :  [];

if( log_this) log(         "%c+%c"+caller+" %c COLLECTED  [collected_menu_EL_array] x"+collected_menu_EL_array.length
             ,    lbb+lbH+lf4,lb0         ,lbH+lf7                                                            );
};
/*}}}*/
/*_ onClick_clear_all_CSS_COLLECTED {{{*/
let onClick_clear_all_CSS_COLLECTED = function()
{
    let         shadow_root = get_shadow_root();
    Array.from( shadow_root.querySelectorAll( SELECTOR_COLLECTED))
        .forEach((el) => del_el_class(el,          CSS_COLLECTED));
};
/*}}}*/
/*_ onClick_apply_collected_EL_array {{{*/
let onClick_apply_collected_EL_array = function()
{
/*{{{*/
let   caller = "onClick_apply_collected_EL_array";
let log_this = options.LOG1_EVENT;

/*}}}*/
if( log_this) log(         "%c+%c"+caller+" %c COLLECTING [collected_menu_EL_array] x"+collected_menu_EL_array.length
             ,    lbb+lbH+lf4,lb0         ,lbH+lf7                                                            );
        for(let i= 0; i < collected_menu_EL_array.length; ++i)
        {
            let menu_EL = collected_menu_EL_array[i];

if( log_this) log("%c COLLECT ("+((i+1)+"/"+collected_menu_EL_array.length)+") ➔ MENU ITEM ["+menu_EL.id+"]", lf7);

            unclick_menu_EL( menu_EL );
            add_el_class   ( menu_EL , CSS_COLLECTED);
        }
};
/*}}}*/

/*_ docollect_menu_EL {{{*/
let docollect_menu_EL = function(menu_EL)
{
/*{{{*/
let   caller = "docollect_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"("+menu_EL.id+") .. multiple_choice_state=["+multiple_choice_state+"]", lf5);
/*}}}*/
//{{{
//    /* UNCOLLECT UNDER [menu_EL] */
//    Array.from( menu_EL.querySelectorAll( SELECTOR_COLLECTED))
//        .forEach((el) => { del_el_class(el,    CSS_COLLECTED); log("UNCOLLECTING "+el.id); });
//
//    /* UNSELECT UNDER [menu_EL] */
//    Array.from( menu_EL.querySelectorAll( SELECTOR_SELECTED))
//        .forEach((el) => { del_el_class(el,    CSS_SELECTED); log("UNSELECTING "+el.id); });
//}}}

    if(!multiple_choice_state) collected_menu_EL_array.splice(0); // NO MUTATION
    collected_menu_EL_array.push( menu_EL );

    unclick_menu_EL( menu_EL );
    del_el_class   ( menu_EL , CSS_VISITED);
    add_el_class   ( menu_EL , CSS_COLLECTED);
};
/*}}}*/
/*➔ uncollect_menu_EL_all {{{*/
let uncollect_menu_EL_all = function()
{
/*{{{*/
let   caller = "uncollect_menu_EL_all";
let log_this = TAXO_PODS_LOG;

let tag_this = TAXO_PODS_TAG || log_this;
if( tag_this) log(         "%c-%c"+caller
                 ,lbb+lbH+lf2,lb0       );
/*}}}*/

    query_taxo_id_path_CSS_array(caller);

if( tag_this) log("%c"+caller+": UNCOLLECTING (x"+collected_DOM_EL_array.length+")", lbH+lf7);

    if( collected_DOM_EL_array )
    {
        for(let i=0; i<collected_DOM_EL_array.length; ++i)
        {
            let menu_EL = collected_DOM_EL_array[i];
/*{{{*/
if(tag_this)
    log_key_val_group(" menu_EL "+(i+1)+"/"+collected_DOM_EL_array.length+" .. #"+menu_EL.id+" ["+menu_EL.innerText+"]"
                      ,{ id          : menu_EL.id
                       , innerText   : menu_EL.innerText
                       , title       : menu_EL.title
                       , "data-menu" : menu_EL.getAttribute("data-menu")
                      }, (has_el_class(menu_EL, "leaf") ? lfX[i % 10] : lbF+lfX[i % 10])
                      ,  true);
/*}}}*/
            uncollect_menu_EL( menu_EL );
        }
    }

if(TAXO_PODS_TAG) logBIG(caller+" "+collected_DOM_EL_array.length+" SELECTION CLEARED");

    return collected_DOM_EL_array.length;
};
/*}}}*/
/*_ uncollect_menu_EL {{{*/
let uncollect_menu_EL = function(menu_EL)
{
/*{{{*/
let   caller = "uncollect_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"("+menu_EL.id+")", lbF+lf7);
/*}}}*/
    let idx  =     collected_menu_EL_array.indexOf(menu_EL);
    if( idx >= 0)  collected_menu_EL_array.splice ( idx, 1);
if( log_this) log("collected_menu_EL_array.length:",collected_menu_EL_array.length);

    del_el_class   ( menu_EL , CSS_COLLECTED );
  //unclick_menu_EL( menu_EL );
};
/*}}}*/
/*}}}*/

    // ┌──────────────────────┐
    // │ CSS_HIDDEN (DISPLAY) │
    // └──────────────────────┘
/*{{{*/
/*_ get_visible_taxo_menu_EL_array {{{*/
let get_visible_taxo_menu_EL_array = function()
{
    return get_taxo_menu_EL_array(true);// NOT HIDDEN ONLY
};
/*}}}*/
/*_ get_taxo_menu_EL_array {{{*/
let get_taxo_menu_EL_array = function(not_hidden_only)
{
/*{{{*/
let   caller = "get_taxo_menu_EL_array";
let log_this = TAXO_PODS_LOG;

if( log_this) log("%c"+caller, lbH);
/*}}}*/
    let menu_EL_array = [];

    let shadow_root  = get_shadow_root();
    if(!shadow_root  ) return menu_EL_array;

    let buttons_pods = shadow_root.querySelectorAll( SELECTOR_BUTTONS_POD );

    Array.from(   buttons_pods )
        .forEach( (el) => {
            if(       !not_hidden_only
               || (    (el.style.display != "none")
                   && !has_el_class(el,CSS_HIDDEN))
              )
                menu_EL_array.push(el);
        });

if( log_this) log("%c menu_EL_array.length=["+menu_EL_array.length+"]", lbH+lf8);
    return menu_EL_array;
};
/*}}}*/

///*➔ dodisplay_menu_EL_all {{{*/
//let dodisplay_menu_EL_all = function(_caller)
//{
//    let shadow_root = get_shadow_root();
//
//    let hiden_menu_EL_array
//        = shadow_root.querySelectorAll( SELECTOR_HIDDEN );
//
//    dodisplay_menu_EL_array(hiden_menu_EL_array, _caller);
//};
///*}}}*/
/*_ dodisplay_menu_EL_id_path_array {{{*/
let dodisplay_menu_EL_id_path_array = function(menu_EL_id_path_array,clicked_EL,_caller)
{
//log("dodisplay_menu_EL_id_path_array: menu_EL_id_path_array:",menu_EL_id_path_array)

    let  menu_EL_array = [];

    let    shadow_root = get_shadow_root();

    for(let i = 0;   i < menu_EL_id_path_array.length; ++i)
    {
        let   el_id    = menu_EL_id_path_array[i];
        if((i < menu_EL_id_path_array.length-1) && !el_id.startsWith("menu_"))
        {
            el_id      = "menu_"+el_id;
        }

        let menu_EL    = shadow_root.getElementById( el_id  );
        if(!menu_EL )
        {
            let taxo_id = el_id.startsWith("menu_") ? el_id.substring(5) : el_id;
            menu_EL    = taxo_menu.get_menu_EL_for_taxo_id(taxo_id, clicked_EL);
        }

        if( menu_EL )
            menu_EL_array.push( menu_EL );
    }

//log("dodisplay_menu_EL_id_path_array: menu_EL_array:",menu_EL_array)

    dodisplay_menu_EL_array(menu_EL_array, _caller);
};
/*}}}*/
/*_ dodisplay_menu_EL_array {{{*/
let dodisplay_menu_EL_array = function(menu_EL_array,_caller)
{
    for(let i=0; i < menu_EL_array.length; ++i)
        dodisplay_menu_EL(menu_EL_array[i], _caller);

    adjust_pods_maxHeight( menu_EL_array );
    layout_cluster();
};
/*}}}*/
/*_ dodisplay_menu_EL {{{*/
let dodisplay_menu_EL = function(menu_EL,_caller)
{
/*{{{*/
let   caller = "dodisplay_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"%c"+(_caller ? _caller:"")+"%c"+menu_EL.id+")"
                  ,lbH+lf4     ,lbL+lf3                    ,lbR+lf5           );
/*}}}*/

    del_el_class(menu_EL, CSS_HIDDEN);
    menu_EL.style.display  =   "grid";
};
/*}}}*/

/*➔ undisplay_menu_EL_all {{{*/
let undisplay_menu_EL_all = function(_caller)
{
    let menu_EL_array = [];

    let     shadow_root = get_shadow_root();
    let            el_array =  shadow_root.querySelectorAll( SELECTOR_BUTTONS_POD );
    for(let i=0; i<el_array.length; ++i)
    {
        let    el     = el_array[i];

        if(   (el.id ==          DIV_TOOLS_ID)
           && (el.id == lib_util.DIV_TOOLS_ID)) continue;

        menu_EL_array.push( el );
    }
    undisplay_menu_EL_array(menu_EL_array,_caller);
};
/*}}}*/
/*_ undisplay_menu_EL_array {{{*/
let undisplay_menu_EL_array = function(menu_EL_array,_caller)
{
//  let activated = taxo_msg.is_activated();

    for(let i=0; i<menu_EL_array.length; ++i)
        undisplay_menu_EL(menu_EL_array[i], _caller);
};
/*}}}*/
/*_ undisplay_menu_id {{{*/
let undisplay_menu_id = function(menu_id,_caller)
{
//log("%c undisplay_menu_id("+menu_id+")", lbR+lf7)

    let shadow_root = get_shadow_root();
    let     menu_EL = shadow_root.getElementById(menu_id);

//log("menu_EL=["+lib_util.get_id_or_tag_and_className(menu_EL)+"]")

    if( menu_EL )
        undisplay_menu_EL(menu_EL, _caller);
};
/*}}}*/
/*_ undisplay_menu_EL {{{*/
let undisplay_menu_EL = function(menu_EL,_caller)
{
/*{{{*/
let   caller = "undisplay_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"%c"+(_caller ? _caller:"")+"%c"+menu_EL.id+")"
                  ,lbH+lf8     ,lbL+lf3                    ,lbR+lf5           );
/*}}}*/

    add_el_class(menu_EL,CSS_HIDDEN);
    menu_EL.style.display =   "none";
};
/*}}}*/
/*}}}*/

    // ┌─────────────┐
    // │ CSS_CLICKED │
    // └─────────────┘
/*{{{*/
/*_ unclick_under_parent_EL {{{*/
let unclick_under_parent_EL = function(parent_EL=get_shadow_root())
{
    Array.from(  parent_EL.querySelectorAll( SELECTOR_CLICKED ))
        .forEach((el) => unclick_menu_EL( el )                 );
};
/*}}}*/
/*_ unclick_menu_EL {{{*/
let unclick_menu_EL = function(menu_EL)
{
/*{{{*/
let   caller = "unclick_menu_EL";
let log_this = options.LOG1_EVENT;

if( log_this) log("%c "+caller+"("+menu_EL.id+")", lf3);
/*}}}*/

    if(menu_EL.classList.contains( CSS_CLICKED ))
    {
        del_el_class(menu_EL, CSS_CLICKED);
        add_el_class(menu_EL, CSS_VISITED);
    }
};
/*}}}*/
/*➔ unvisit_menu_EL_all {{{*/
let unvisit_menu_EL_all = function()
{
    let            shadow_root = get_shadow_root();
    let el_array = shadow_root.querySelectorAll( SELECTOR_VISITED);
    Array.from( el_array ) .forEach((el) => del_el_class(el, CSS_VISITED));

    return el_array.length;
};
/*}}}*/
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ LOAD-SAVE .................... [javascript/taxo_tools.js] [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*➔ taxo_pods_init .. (listeners .. first_caption) {{{*/
let taxo_pods_init = function(request)
{
   options = xpath_content.options;
/*{{{*/
let   caller = "taxo_pods_init";
let log_this = options.LOG1_STEP || options.LOG5_DIV_TOOLS;

if( log_this) logBIG( TAXO_CONTENT_SCRIPT_ID+" ➔ "+caller, 5);
//console.trace()
//log("request:", request)
/*}}}*/
    /* [set_use_lib_shadow_root] {{{*/
    if(request && (typeof request.use_lib_shadow_root != "undefined"))
        set_use_lib_shadow_root( request.use_lib_shadow_root );

    /*}}}*/
    /* [already called once] {{{*/
    let div_tools = get_div_tools();
    if( div_tools )
    {
        console.warn("...already called once");
        console.trace();
        return;
    }
    /*}}}*/
    /* ACTIVATED {{{*/
    if(!request || !request.activated)
    {
if( log_this) log("%c GET ACTIVATED STATE FROM BACKGROUND SCRIPT", lbH+lf9);


        taxo_msg.query_active_state();
        return;
    }
    /*}}}*/
    /* 1/2 INJECT TAXO GUI INTO SINGLE LIB shadow_host {{{*/
    if( get_use_lib_shadow_root() ) {
if( log_this) logBIG("...INJECT TAXO GUI INTO MAIN LIB shadow_host ["+lib_util.SHADOW_HOST_ID+"]", 5);


        div_tools = lib_util.get_div_tools();
if( log_this) logBIG("...div_tools=["+lib_util.get_id_or_tag(div_tools)+"]", 5);

        add_el_class(div_tools, TAXO_CONTENT_SCRIPT_ID);

        taxo_tools.load_taxonomy_tools( div_tools );
    }
    /*}}}*/
    /* 2/2 INJECT TAXO GUI INTO TAXONOMY shadow_host {{{*/
    else {
if( log_this) logBIG("...INJECT TAXO GUI INTO TAXONOMY shadow_host ["+         SHADOW_HOST_ID+"]", 4);

        taxo_tools.inject_shadow_root(log_this); /* @see javascript/taxo_tools.js */
        div_tools = get_div_tools();
if( log_this) logBIG("...div_tools=["+lib_util.get_id_or_tag(div_tools)+"]", 4);

        /* SETUP MOVABLE BUTTONS POD LAYOUT */
        add_el_class(div_tools, "buttons_pod");
        add_el_class(div_tools, "row_col_1x3");
        add_el_class(div_tools, "movable"    );
    }
    /*}}}*/
    /* [taxo_tools_xy] {{{*/
    let xy = ( lib_log.is_embedded( TAXO_CONTENT_SCRIPT_ID) ) ? lib_util.localStorage_getItem("taxo_tools_xy")
        :    (request && request.taxo_tools_xy          ) ?                            request.taxo_tools_xy
        :    "" ;
//log(       "xy=["+xy+"]")
    if(!xy)   xy  = { x:350, y:12 };
    if(typeof xy == "string") xy = JSON.parse( xy );
//log( "taxo_tools_xy=["+xy.x+" , "+xy.y+"]")

    load_div_tools_xy( xy );
    /*}}}*/
    /* ADD EVENT LISTENERS {{{*/
//  @see javascript/event_listeners.js

    /*}}}*/
    /* ACTIVE STATE QUERY {{{*/
    if( !taxo_msg.is_activated() )
    {
        let shadow_host = get_shadow_host();
        shadow_host.style.display = "none";
    }
    /*}}}*/
    /* OR DISPLAY - adjust initial [buttons_fontSize] {{{*/
    else {
        show_top_menu();
    }
    /*}}}*/
};
/*}}}*/
/*➔ load_taxo_id_array {{{*/
let load_taxo_id_array = function(selected_taxo_id_path_CSV,collected_taxo_id_path_CSV)
{
/*{{{*/
let caller = TAXO_CONTENT_SCRIPT_ID+".load_taxo_id_array";
let log_this = options.LOG1_STEP;

if( log_this) log_sep_top("TAXONOMY LOADING", 5);
/*}}}*/
    /* REMOVE ANY CURRENTLY LOADED COLLECTION */
    unload_taxo_id_array_all();

    /* ADD ALL LEADING MENU TO [selected_taxo_id_path_CSV] ITEMS */
    if(!selected_cache) selected_cache = selected_taxo_id_path_CSV;
    set_taxo_id_path_SELECTED ( selected_taxo_id_path_CSV );

    /* ADD ALL LEADING MENU TO [collected_taxo_id_path_CSV] ITEMS */
    if(!collected_cache) collected_cache = collected_taxo_id_path_CSV;
    set_taxo_id_path_COLLECTED( collected_taxo_id_path_CSV );

if( log_this) log_sep_bot(caller, 5);

    xpath_tools.div_activity_apply();

    load_taxo_sync_visited( log_this );
};
/*}}}*/
/*_ reload_taxo_id_array {{{*/
/*{{{*/
let  selected_cache;
let collected_cache;

/*}}}*/
let reload_taxo_id_array = function(selected_taxo_id_path_CSV,collected_taxo_id_path_CSV)
{
/*{{{*/
let caller = TAXO_CONTENT_SCRIPT_ID+".reload_taxo_id_array";
let log_this = options.LOG1_STEP;

if( log_this) log_sep_top("TAXONOMY RELOADING", 5);
/*}}}*/
    if(selected_cache || collected_cache)
        load_taxo_id_array(selected_cache, collected_cache);
    else
        log("CANNOT RELOAD: NO [selected_cache] AND NO [collected_cache]");
};
/*}}}*/
/*_ is_cache_empty {{{*/
let is_cache_empty = function()
{
//log("String( selected_cache)=["+String( selected_cache)+"]")
//log("String(collected_cache)=["+String(collected_cache)+"]")

    return !String(selected_cache) && !String(collected_cache);
};
/*}}}*/
/*_ unload_taxo_id_array_all {{{*/
let unload_taxo_id_array_all = function()
{
    let shadow_root = get_shadow_root();
    if(!shadow_root) return;

    let    el_array = shadow_root.querySelectorAll(".buttons_pod");
    el_array.forEach((el) => {
log("%c REMOVING %c "+el.id, lbL+lf2, lbR+lf9);

        shadow_root.removeChild( el );
    });
};
/*}}}*/
/*_ load_taxo_sync_visited {{{*/
let load_taxo_sync_visited = function(_log_this)
{
    let caller = "load_taxo_sync_visited";

    let shadow_root = get_shadow_root();

    query_taxo_id_path_CSS_array(caller);

    let el_array = collected_DOM_EL_array.concat( selected_DOM_EL_array );

    el_array.forEach((el) => {
        let taxo_id = el.getAttribute("data-menu");
        let menu_EL = shadow_root.getElementById( taxo_id );
        if( menu_EL ) menu_EL.classList.add("visited");
    });

/*{{{*/
if( _log_this )
{
    log("%c"+                          TAXO_CONTENT_SCRIPT_TAG, lbb+lbH+lf3);
    log("%c"+  clicked_DOM_EL_array.length +" CLICKED.....:\n", lf4,   clicked_DOM_EL_array);
    log("%c"+collected_DOM_EL_array.length +" COLLECTED...:\n", lf7, collected_DOM_EL_array);
    log("%c"+ selected_DOM_EL_array.length +" SELECTED....:\n", lf5,  selected_DOM_EL_array);
    log("%c"+  visited_DOM_EL_array.length +" VISITED.....:\n", lf6,   visited_DOM_EL_array);
}
/*}}}*/
};
/*}}}*/

/*➔ load_div_tools_xy {{{*/
let load_div_tools_xy = function(xy)
{
/*{{{*/
let   caller = "load_div_tools_xy";
let log_this = options.LOG6_MOVE_TOOL;

if( log_this ) log(caller+"("+xy+")");
/*}}}*/
    /* LAYOUT [div_tools] {{{*/
    let div_tools = get_div_tools();
    add_el_class(div_tools, TAXO_CONTENT_SCRIPT_ID);
    if(!div_tools) return;

    /*}}}*/
    /* [xy] {{{*/
if( log_this) log("xy:", xy);

    xy.x = Math.max(xy.x, 12);
    xy.x = Math.min(xy.x, window.innerWidth  - 64);

    xy.y = Math.max(xy.y, 12);
    xy.y = Math.min(xy.y, window.innerHeight - 64);

    div_tools.style.left = (xy ? xy.x : DIV_TOOLS_XY.x)+"px";
    div_tools.style.top  = (xy ? xy.y : DIV_TOOLS_XY.y)+"px";
    /*}}}*/
};
/*}}}*/
/*➔ save_div_tools_xy {{{*/
let save_div_tools_xy = function(_caller)
{
let caller = "save_div_tools_xy";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;
if( log_this) log( TAXO_CONTENT_SCRIPT_ID+"."+caller+"("+_caller+")");

    let div_tools = get_div_tools();
    let        xy = { x: div_tools.offsetLeft , y: div_tools.offsetTop };
if( log_this) log("xy",xy);

    if( !xy.x && !xy.y) return;

    if( lib_log.is_embedded( TAXO_CONTENT_SCRIPT_ID) )
    {
        lib_util.localStorage_setItem( "taxo_tools_xy", JSON.stringify(xy));
    }
    else {
        options. taxo_tools_xy = xy;
        send_message( { caller: _caller , options }, caller);
    }
};
/*}}}*/
/*_ ▲▲▲▲ send_message {{{*/
let send_message = function(message_object, _caller) // eslint-disable-line no-unused-vars
{
/*{{{*/
let caller = "send_message";
let log_this = options.LOG2_MESSAGE;

let  title = (message_object.cmd || _caller);
if( log_this) log("%c"+caller+"%c"+title, lbb+lbL+lf4, lbb+lbR+lf7);
/*}}}*/
    try {
        chrome.runtime.sendMessage(message_object);
    }
    catch(ex) {
        log("%c"+TAXO_CONTENT_SCRIPT_ID+"."+title+"%c CANNOT SEND MESSAGE TO BACKGROUND SCRIPT:\n"+ex, lbL+lf3, lbR+lf2);
        log_caller();
    }
    return false; // async response expected
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

    logBIG("LOADING "+(in_extension ? "EXTENSION" : "EMBEDDED")+" "+TAXO_CONTENT_SCRIPT_ID, lbB+lbH+lfX[in_extension ? 4:5]);
    /*}}}*/
    /*  taxo_content_script_js {{{*/
    let taxo_content_script_js = document.getElementById("taxo_content_script_js");
    let script_loaded          = in_extension && taxo_content_script_js;
    if( script_loaded )          logBIG("EXTENSION NOT STARTED FROM AN EMBEDDING PAGE", lf2);

    /*}}}*/
    return script_loaded;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ LAYOUT-RESCALE .. ....................................... [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ adjust_pods_maxHeight {{{*/
/*{{{*/
const ADJUST_PODS_MARGIN          =  8;
const ADJUST_PODS_MAXHEIGHT_DELAY = 50;
const MENU_CHILDREN_VISIBLE_MIN   =  3;

let   adjust_pods_maxHeight_timer;
/*}}}*/
let adjust_pods_maxHeight = function(menu_EL_array)
{
    if( !get_shadow_root() ) return;

    if( adjust_pods_maxHeight_timer ) clearTimeout(      adjust_pods_maxHeight_timer);
    /**/adjust_pods_maxHeight_timer =   setTimeout(() => adjust_pods_maxHeight_handler(menu_EL_array), ADJUST_PODS_MAXHEIGHT_DELAY);
};
/*}}}*/
/*_ adjust_pods_maxHeight_handler {{{*/
let adjust_pods_maxHeight_handler = function(menu_EL_array)
{
/*{{{*/
let caller = "adjust_pods_maxHeight_handler";
let log_this = options.LOG2_MESSAGE;

/*}}}*/
    adjust_pods_maxHeight_timer = null;

    if(!menu_EL_array)
    {
        let shadow_root = get_shadow_root();
        menu_EL_array   = shadow_root.querySelectorAll( SELECTOR_BUTTONS_POD );
    }
if( log_this) log("%c"+caller+"( menu_EL_array[x"+menu_EL_array.length+"] )", lbb+lbL+lf4);

    let     w_h   = window.innerHeight;
    let     wih   = window.innerHeight - 2*ADJUST_PODS_MARGIN;
    for(let i=0; i<menu_EL_array.length; ++i)
    {
        let el    = menu_EL_array[i];
        if(   ( el.style.display    == "none"           )
           || (!el.classList.contains( CSS_BUTTONS_POD ))
        ) {
if( log_this) log("%co %c"+el.id+"%c lead item", lf5, lbL+lf5,lbR+lf5);

            continue;
        }

        /* SENSE */
/*{{{
//      let bcr      = el.getBoundingClientRect();
}}}*/
        let b_to_t   = has_el_class(el, "b_to_t");
        let m_y      = el.offsetTop;
        let s_h      = el.scrollHeight;
        let m_h      = Math.min(s_h , wih-m_y);       // max-height .. (where [m_y] is located now) .. (may be moved to grow)

        /* first menu can be moved to grow */
        let                shrinked = (m_h < s_h);
        let                can_grow = (m_h < wih);
        let can_move_to_grow = (i == 0) && shrinked && can_grow;
        if( can_move_to_grow )
        {
            m_h = Math.min(s_h , wih);            // grow taller        .. (up to [wih])

            m_y = b_to_t
                ? w_h - ADJUST_PODS_MARGIN - m_h  // move when taller   .. (at margin-from-bottom)
                :       ADJUST_PODS_MARGIN;       // move when taller   .. (at margin-from-top   )

        }

        /* MAX-HEIGHT: WINDOW HEIGHT */
        m_h = Math.min(s_h , wih             );       // window height between margins

        /* MIN-HEIGHT: SHOW SOME CHILDREN */
        let el_children_min_height
            = MENU_CHILDREN_VISIBLE_MIN * s_h / el.children.length;
        m_h = Math.max(m_h , el_children_min_height); // height to show minimum children height

        /* VERTICAL POSITION: WITHIN WINDOWS BOUNDARIES */
        let y_min =     ADJUST_PODS_MARGIN    ;
        let y_max = w_h-ADJUST_PODS_MARGIN-m_h;
        m_y       = Math.max(m_y, y_min);
        m_y       = Math.min(m_y, y_max);

/*{{{*/
if( log_this)
        log_key_val(    el.id
            , { w_h
              , wih
              , m_h
              , s_h
              , y_min
              , el_offsetTop : el.offsetTop
              , m_y
              , y_max
              , shrinked
              , can_grow
              , can_move_to_grow
              , MENU_CHILDREN_VISIBLE_MIN
              , el_children_length : el.children.length
              , el_children_min_height
              , ADJUST_PODS_MARGIN
            //, callers : lib_log.get_callers()
            //,      display : el.style.display
            //, offsetHeight : el.offsetHeight
            //, clientHeight : el.clientHeight
            //, bcr
            });
/*}}}*/

        /* ADJUST */
        el.style.top       = m_y+"px";
        el.style.maxHeight = m_h+"px";
        el.style.overflowY = "auto";

    }
};
/*}}}*/
/*_ div_tools_move_RESCALE {{{*/
/*{{{*/
//const RESCALED_MIN_PX          = 48;

/*}}}*/
let div_tools_move_RESCALE = function(el) /* eslint-disable-line no-unused-vars */
{
    let _moving_EL = el || get_div_tools();
    if(!_moving_EL ) return;

    requestAnimationFrame(() => { div_tools_move_RESCALE_handler(_moving_EL); });

    add_el_class(_moving_EL,"rescaling");
};
/*}}}*/
/*_ div_tools_move_RESCALE_handler {{{*/
let div_tools_move_RESCALE_handler = function(_moving_EL)
{
let caller = "div_tools_move_RESCALE_handler";

    let el = _moving_EL || get_div_tools();
//logXXX("div_tools_move_RESCALE_handler("+el.id+")")

    /* CENTER */
//  let bcr           = el.getBoundingClientRect();
    let  wcx          =     window.innerWidth  / 2;
    let  wcy          =     window.innerHeight / 2;

    /* DELTA */
    let movement      = lib_util.get_onMove_RESULT();
//log_key_val("movement", movement)
    let d_x           = Math.abs(wcx - movement.onMove_XY.x);
    let d_y           = Math.abs(wcy - movement.onMove_XY.y);

    let offset        = Math.sqrt(d_x*d_x + d_y*d_y).toFixed(0);
    let center        = Math.sqrt(wcx*wcx + wcy*wcy).toFixed(0);
    let d_scale       = 1 - (offset / center)       ;

    let e_w           = el.e_w || el.offsetWidth; if(!el.e_w) el.e_w = e_w; /* save and reuse initial element width */

//  let rescale_min   = RESCALED_MIN_PX / e_w;
//  let scale         = Math.max(rescale_min, d_scale).toFixed(2);  /* 1.0 at window center. 0.1 at borders */
    let scale         =                       d_scale .toFixed(2);  /* 1.0 at window center. 0.0 at borders */

    /* RESIZE BY FONT */
    buttons_fontSize     = Math.max(BUTTONS_FONT_SIZE_MIN, parseInt(BUTTONS_FONT_SIZE * scale))+"px";
    el.style.fontSize = buttons_fontSize;

    let menu_EL_array = get_taxo_menu_EL_array();
    for(let i=0; i<menu_EL_array.length; ++i)
        menu_EL_array[i].style.fontSize = buttons_fontSize;

    del_el_class(el,"rescaling");

/*{{{
//console.clear()
log_key_val_group(caller+"("+lib_util.get_id_or_tag(el)+") .. scale="+scale
    , { onMove_XY
      , WINDOW_CENTER_X      : wcx
      , WINDOW_CENTER_Y      : wcy
      , d_x
      , d_y
      , offset
      , center
      ,   scale
      , d_scale              : d_scale     .toFixed(2)
//    , rescale_min          : rescale_min .toFixed(2)
      , offsetWidth          : el.offsetWidth
      , e_w
//    , bcr
    }, lf7, false);
}}}*/
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ MOVE-CLUSTER ............................................ [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*{{{*/
const MENU_GAP                       =  8;
const DIV_TOOLS_MOVING_CLUSTER_DELAY = 250;

let layout_cluster_timeout; /* eslint-disable-line no-unused-vars */
let layout_cluster_last_moving_pod;
/*}}}*/
/*➔ layout_cluster {{{*/
let layout_cluster = function(args={})
{
    let delay
        = args.moving_EL
        ? DIV_TOOLS_MOVING_CLUSTER_DELAY
        : 0;

    if( layout_cluster_timeout ) clearTimeout(      layout_cluster_timeout);
    /**/layout_cluster_timeout =   setTimeout(() => layout_cluster_handler(args), delay);
};
/*}}}*/
/*_ layout_cluster_handler {{{*/
/*{{{*/
let pods_cluster = {};

/*}}}*/
let layout_cluster_handler = function(args={})
{
/*{{{*/
let   caller = "layout_cluster_handler";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

if( log_this) log("%c"+caller+"("+lib_util.get_id_or_tag_and_className(args.moving_EL)+")", lbH);

    layout_cluster_timeout = null;
/*}}}*/
    /* PODS SELECTED {{{*/
    let visible_menu_EL_array = get_visible_taxo_menu_EL_array();
if( log_this) log("...visible_menu_EL_array:");
if( log_this) console.dir(    visible_menu_EL_array  );

    /*}}}*/
    /*  moving_pod or last moved {{{*/
    let moving_pod
        =  args.moving_EL
        || layout_cluster_last_moving_pod
        || visible_menu_EL_array[0]
    ;

    if(!moving_pod)
    {
if( log_this) log("%c FOUND NO PODS", lb2);

        return;
    }
    layout_cluster_last_moving_pod = moving_pod;

if( log_this) log("...moving_pod.id=["+moving_pod.id+"]");
if( log_this) log("moving_pod", moving_pod);
    /*}}}*/

//  div_tools_move_RESCALE_handler( moving_pod )

    /* PODS SPREAD HORIZONTAL DIRECTION .. [r_to_l] [t_to_b] {{{*/
//  let scale  = t_get_panel_scale(moving_pod);
    let    bcr = moving_pod.getBoundingClientRect();
    let    m_x = moving_pod.offsetLeft;
    let    m_y = moving_pod.offsetTop;
    let    m_w = bcr.width ; //moving_pod.offsetWidth;
    let    m_h = bcr.height; //moving_pod.offsetHeight;
    let    mcx = m_x + m_w/2;
    let    mcy = m_y + m_h/2;

    let    wcx = window.innerWidth  / 2;
    let    wcy = window.innerHeight / 2;

    let r_to_l = (wcx < mcx);
    let b_to_t = (wcy < mcy);

    let x_next = m_x + (r_to_l ? -MENU_GAP : (m_w+MENU_GAP));

    /*}}}*/

    pods_cluster
        = {   moving_pod
            , visible_menu_EL_array
            , m_h
            , m_x
            , m_y
            , r_to_l
            , b_to_t
            , x_next
            , i_next : 0
        };

if( log_this) log_key_val(caller, pods_cluster);

    sync_taxo_clear_button( caller );

    layout_cluster_handler_next();
};
/*}}}*/
/*_ layout_cluster_handler_next {{{*/
/*{{{*/
let layout_cluster_details_last;

/*}}}*/
let layout_cluster_handler_next = function(e,arg1)
{
/*{{{*/
let   caller = "layout_cluster_handler_next";
let log_this = options.LOG6_MOVE_TOOL;

let tag_this = options.LOG1_EVENT || log_this;
/*}}}*/
    /* [pods_cluster] {{{*/
    let { moving_pod
        , visible_menu_EL_array
        , m_h
        , m_x
        , m_y
        , r_to_l
        , b_to_t
    } = pods_cluster;

    let pod = visible_menu_EL_array[pods_cluster.i_next];

if( log_this && (layout_cluster_details_last != pod)) log_console_clear(caller+": "+pod.id);
//( log_this && (layout_cluster_details_last != pod)) console.trace()

    if(pods_cluster.i_next >= visible_menu_EL_array.length)
    {
//if( log_this)
lib_log.logBIG("➔ pods_cluster.i_next("+pods_cluster.i_next+")  >= visible_menu_EL_array.length=("+visible_menu_EL_array.length+")", 2);

        return;
    }
    /*}}}*/
//logXXX("layout_cluster_handler_next("+(moving_pod ? moving_pod.id:"...")+")"+(e ? " ["+e.type+"]" : ""))
    /* CALLED BY [transitionend] or [TIMEOUT OR DIRECT CALL] {{{*/
    if(e)
    {
if( log_this && (layout_cluster_details_last != pod))
        lib_log.logBIG("EVENT ["+e.type+" "+e.propertyName+"] ["+pod.id+"]", 5);
    }
    else {
if( log_this && (layout_cluster_details_last != pod))
        lib_log.logBIG("TIMEOUT OR DIRECT CALL ["+pod.id+"]", 4);
    }
    /*}}}*/
    /* [ALL DONE] .. f(moving_pod not nullified) {{{*/
    if(!pods_cluster.moving_pod)
    {
if( log_this && (layout_cluster_details_last != pod)) lib_log.logBIG("ALL DONE ["+pod.id+"]", 9);

        return; // all done
    }
if( log_this) log("%c "+caller+": i_next: "+(pods_cluster.i_next+1)+"/"+visible_menu_EL_array.length+"%c XY "+m_x+" "+m_y+"%c"+((pod.parent_pod ? pod.parent_pod.id+"➔":"NO parent_pod➔")+pod.id)
                  ,lbL                                                              ,lbC                 ,lbR                                                                  );

    layout_cluster_details_last = pod.id+(e ? (e.type+"."+e.propertyName) : "");
    /*}}}*/
    /* XY {{{*/
    let bcr = pod.getBoundingClientRect();
    let p_w = bcr.width ;
    let p_h = bcr.height;

    let o_x = r_to_l ? -p_w : 0;
    let   x = pods_cluster.x_next + o_x;
    let   y = b_to_t ? (m_y + m_h - p_h) : (m_y);
    /*}}}*/
    /* TOP min max .. f(lead_pod) {{{*/
    let lead_pod
        = pod.parent_pod ? pod.parent_pod
        :     moving_pod ? moving_pod
        :                  null;

    if( lead_pod )
    {
        let lead_pod_bcr     = lead_pod.getBoundingClientRect();

        //  pod.title += "\n parent_pod: "+ lead_pod.id+" top=["+ (lead_pod.getBoundingClientRect().top).toFixed(0)+"]";
        //log("...pod["+pod.id+"]: lead_pod_bcr:", lead_pod_bcr)
        //log("......["+pod.id+"]: "+pod.title)

        let      w_h        = window.innerHeight;
        let      wih        = window.innerHeight - 2*ADJUST_PODS_MARGIN;

//      let      m_bcr      = pod.getBoundingClientRect();
//      let      p_y        = m_bcr  .top;
//      let      p_b        = m_bcr  .bottom;
//      let      p_h        = m_bcr  .height;

//      let      p_y        = pod.offsetTop;
//      let      p_h        = pod.offsetHeight;
//      let      p_b        = pod.offsetTop + pod.offsetHeight;

//      let      m_bellow   = p_y        > lead_pod_bcr.top   ;
//      let      m_above    = p_b        < lead_pod_bcr.bottom;

        let y_f_lead_pod_top  = Math.min(y , lead_pod_bcr.top                );
        y = y_f_lead_pod_top;

        let y_f_lead_pod_bot  = Math.max(y , lead_pod_bcr.bottom - p_h       );
        y = y_f_lead_pod_bot;

        let y_f_window_height = Math.min(y , window.innerHeight  - p_h       ); // clamp to window-bottom
        y = y_f_window_height;

        y = Math.max(y, ADJUST_PODS_MARGIN);
        y = Math.min(y, window.innerHeight - p_h       );

        let y_min =     ADJUST_PODS_MARGIN    ;
        let y_max = w_h-ADJUST_PODS_MARGIN-p_h;
        y         = Math.max(y, y_min);
        y         = Math.min(y, y_max);

if( tag_this)
    log_key_val_group((pods_cluster.i_next+1)+" - "+lead_pod.id+" ➔ "+pod.id
               , {             i_next : pods_cluster.i_next
                 ,     pod_parent_pod : pod.parent_pod
                 ,         moving_pod
                 ,           lead_pod
                 ,                pod
                 , parent_pod_bcr_top : lead_pod_bcr.top   .toFixed(0)
                 , parent_pod_bcr_bot : lead_pod_bcr.bottom.toFixed(0)
//               ,            p_y     :             p_y    .toFixed(0)
                 ,         p_h        :          p_h       .toFixed(0)
//               ,         p_b        :          p_b       .toFixed(0)
                 ,  y_f_lead_pod_top  :  y_f_lead_pod_top  .toFixed(0)
                 ,  y_f_lead_pod_bot  :  y_f_lead_pod_bot  .toFixed(0)
                 ,  y_f_window_height :  y_f_window_height .toFixed(0)
                 ,  y                 :  y                 .toFixed(0)
               }, lfX[1 + pods_cluster.i_next]);

    }
    /*}}}*/
    /* SET [ontransitionend] .. to move next [pods_cluster item] {{{*/
    if( r_to_l ) add_el_class(pod, "r_to_l");
    else         del_el_class(pod, "r_to_l");

    if( b_to_t ) add_el_class(pod, "b_to_t");
    else         del_el_class(pod, "b_to_t");

//  pod.ontransitionend  = layout_cluster_handler_next; // never fired
    pod.style.left       = x+"px";
    pod.style.top        = y+"px";
//  pod.style.visibility = "visible";
    pod.style.opacity    = (first_visibility_timer) ? "0" : "1";
//  setTimeout(() => pod.style.opacity    = "1", 500)
//  pod.title = (pod.title ? (            pod.title +"\n") : "")
//            + (        e ? ("e_type=["+ e.type    +"]" ) : "")
//            + (     arg1 ? (            arg1           ) : "");

    layout_cluster_handler_scroll_to_selected_item(pod, b_to_t);

    /*}}}*/
    /* SET [x_next] for next [pods_cluster item] {{{*/
    if( pods_cluster.i_next < visible_menu_EL_array.length-1)
    {
        pods_cluster.x_next += r_to_l ? -(p_w+MENU_GAP) : (p_w+MENU_GAP);
        pods_cluster.i_next += 1;

        /* in case [pod.ontransitionend] wont do the job (and yes, it happens!) */
        if(!e)
        {
            // delay until this pod has reached its position
            // for the next one will be placed relative to it
            if(!layout_cluster_timeout )
                setTimeout(layout_cluster_handler_next, 100, null, "cascaded");
        }

if( log_this) log("➔ i_next=["+pods_cluster.i_next+"]");
    }
    /*}}}*/
    /* SET [all done] {{{*/
    else {
        pods_cluster.moving_pod     = null; // all done
        layout_cluster_details_last = null;

if( log_this) log("➔ all done");
    }
    /*}}}*/
};
/*}}}*/
/*_ layout_cluster_handler_scroll_to_selected_item {{{*/
let layout_cluster_handler_scroll_to_selected_item = function(pod,b_to_t)
{
/*{{{*/
let caller = "layout_cluster_handler_scroll_to_selected_item";
let log_this = options.LOG6_MOVE_TOOL;

/*}}}*/
    /* PICK EITHER TOP OR BOTTOM MENU ITEM {{{*/
    let el_array
        =        Array.from( pod.querySelectorAll(SELECTOR_SELECTED+","+SELECTOR_COLLECTED+","+SELECTOR_CLICKED))
        .sort((a, b) => (parseInt(a.offsetTop) - parseInt(b.offsetTop)))
    ;
    if(!el_array.length) return;

    /*}}}*/
    /* CHOOSE LAST OR FIRST .. f(b_to_t) {{{*/
    let el
        = b_to_t
        ? el_array.pop  ()
        : el_array.shift()
    ;

    /*}}}*/
    /* ITEM IS ALREADY VISIBLE {{{*/
    let el_top = el.offsetTop;
    let el_bot = el.offsetTop + el.offsetHeight;
    let el_is_visible
        =    (el_top       > pod.scrollTop)
          && (el_bot       < pod.scrollTop + pod.offsetHeight)
        ;

    /*}}}*/
    /* SCROLL TO MAX MARGIN ABOVE ITEM {{{*/
    let margin_above_el
        = b_to_t
        ? parseInt(pod.offsetHeight) - parseInt( el.offsetHeight) - parseInt(el.offsetHeight)/3
        :                                                           parseInt(el.offsetHeight)/3;
    let scroll_TOY = (parseInt(el.offsetTop) - margin_above_el).toFixed(0);

    /*}}}*/
/*{{{*/
if( log_this)
{
//  log_console_clear(caller)
    log_key_val_group( caller+": "+pod.id+" ➔ "+el.id
                       ,{    b_to_t
                           , el_is_visible
                           , pod_scrollHeight : pod.scrollHeight
                           , pod_scrollTop    : pod.scrollTop
                           , pod_offsetHeight : pod.offsetHeight
                           , p_b              : pod.offsetHeight +pod.scrollTop
                           ,        el_top    :  el.offsetTop
                           ,        el_bottom :  el.offsetTop + el.offsetHeight
                           , scroll_BY        : (scroll_TOY-pod.scrollTop)+" + pod_offsetHeight=["+pod.offsetHeight+"] = ["+(parseInt(scroll_TOY) + parseInt(pod.offsetHeight))+"]"
                           , scroll_TOY
                           , margin_above_el
                       }
                       , lfX[el_is_visible ? 4:2], false);

}
/*}}}*/
    /* DO NOT SCROLL IF MENU ITEM IS ALREADY VISIBLE {{{*/
    if(!el_is_visible)
        pod.scrollTo( { top: scroll_TOY , behavior: "smooth"}); // "auto"

    /*}}}*/
};
/*}}}*/
///*_ t_get_panel_scale {{{*/
//let t_get_panel_scale = function(el)
//{
//    let    cw = parseInt(el.getBoundingClientRect().width);
//    let    pw = parseInt(el.offsetWidth);
//    let scale = (cw && pw)
//        ?        parseInt(0.5 + (cw / pw) * 100) / 100
//        :        1;
//
//log_key_val_group("t_get_panel_scale("+el.id+")"
//                  , { cw
//                    , pw
//                    , scale
//                  });
//    return scale;
//};
///*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ SELECT-COLLECT .......................................... [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*➔ set_multiple_choice_state {{{*/
let     multiple_choice_state = true;
let set_multiple_choice_state = function(state,_caller)
{
/*{{{*/
    let caller = "set_multiple_choice_state";
let log_this = options.LOG1_STEP;

/*}}}*/

    multiple_choice_state
        = (state != undefined) ? state                  // set from argument
        :                        multiple_choice_state; // or: apply current

if( log_this) log("%c"+caller+"("+state+(_caller ? (" , "+_caller) : "")+") %c multiple_choice_state=["+multiple_choice_state+"]"
                 ,lbL+lf3                                                 ,lbC+lf4                                              );

    let shadow_root = get_shadow_root();
    let taxo_single = shadow_root.getElementById( "taxo_single" );
    let taxo_multi  = shadow_root.getElementById( "taxo_multi"  );
    let taxo_clear  = shadow_root.getElementById( "taxo_clear"  );

    taxo_single.title = "Allowing ONLY ONE selection  for a page";   // TAXO_SINGLE_BUTTON .. javascript/taxo_tools.js
    taxo_clear .title = "CLEAR all page selections";                 // TAXO_CLEAR_BUTTON
    taxo_multi .title = "Allowing MULTIPLE selections for a page";   // TAXO_MULTI_BUTTON

    set_el_class_on_off(taxo_single, CSS_SELECTED, !multiple_choice_state);
    set_el_class_on_off(taxo_multi , CSS_SELECTED,  multiple_choice_state);

    if(!multiple_choice_state ) taxo_menu.sel_clear(_caller);
};
/*}}}*/
/*_ get_menu_EL_parent_array {{{*/
let get_menu_EL_parent_array = function(to_menu_EL)
{
/*{{{*/
let   caller = "get_menu_EL_parent_array";
let log_this = options.LOG5_DIV_TOOLS;

let tag_this = options.LOG1_EVENT || log_this;

if( log_this) log("%c"+caller+"("+to_menu_EL.id+")", lbH+lf6);
/*}}}*/
    let parent_chain_EL_array = [];

    let shadow_root = get_shadow_root();
    let menu_EL = to_menu_EL;
    do {
        if(!menu_EL.parentElement)
        {
            break;
        }
        parent_chain_EL_array.push( menu_EL.parentElement );

        let parent_node
            = menu_EL.parentElement.parent_node;

        let menu_EL_parent
            = parent_node
            ?  shadow_root.getElementById("menu_"+parent_node.id)
            :  undefined;

        let data_menu
            = menu_EL.getAttribute("data-menu");
///*{{{*/
if(log_this)
    log_key_val_group("menu_EL #"+menu_EL.id+" ["+menu_EL.innerText+"]"
                      ,{ id          : menu_EL.id
                          , innerText   : menu_EL.innerText
                          , title       : menu_EL.title
                          , "data-menu" : menu_EL.getAttribute("data-menu")
                          , parent_node
                          , data_menu
                          , menu_EL_parent
                      }, (has_el_class(menu_EL, "leaf") ? lbb+lf6 : lbF+lf6)
                      ,  true);

/*}}}*/

        if( menu_EL_parent ) {
            menu_EL = lib_util.get_el_child_with_id(menu_EL_parent, data_menu);

if( tag_this) log("➔ %c"+lib_util.get_id_or_tag_and_className(menu_EL), lbH+lf5);
        }
        else {
            menu_EL = null;
if( log_this) log("%c NO PARENT menu_EL", lf6);
        }
    }
    while( menu_EL );

if( log_this) log("%c"+caller+"("+to_menu_EL.id+") ...return:", lbH+lf6, parent_chain_EL_array);
    return parent_chain_EL_array;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ [moving_EL] ............................................. [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ div_tools_add_onmove_listener {{{*/
/*{{{*/
const DIV_TOOLS_XY                = { x: 32 , y: 32 };
const CAPTURE_TRUE_PASSIVE_FALSE  = {capture:true, passive:false};

let     moving_EL;
/*}}}*/
let div_tools_add_onmove_listener = function(el)
{
/*{{{*/
let   caller = "div_tools_add_onmove_listener";
let log_this = options.LOG6_MOVE_TOOL;

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
    /* GET - MOVE DATA {{{*/
    moving_EL          = el;
    moving_EL.onDown_X = parseInt(cs.left);
    moving_EL.onDown_Y = parseInt(cs.top );

    add_el_class(moving_EL, "pressed");
if( log_this) log("%c...moving_EL.onDown_XY=["+moving_EL.onDown_X+" "+moving_EL.onDown_Y+"]", lf3);
    /*}}}*/
    /* ADD - TOUCH MOVE LISTENER {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if( log_this) log(caller+"%c ➔ ADDING [touchmove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf4);

        window   .addEventListener("touchmove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ADD - MOUSE MOVE LISTENER {{{*/
    else {
if( log_this) log(caller+"%c ➔ ADDING [mousemove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf5);

        window   .addEventListener("mousemove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* DEL - SCROLL LISTENER {{{*/
if( log_this) log(caller+"%c REMOVING [scroll]    LISTENER", lf8);

    window       .removeEventListener("scroll"   , taxo_tools_onScroll, CAPTURE_TRUE_PASSIVE_FALSE);

if( log_this) log_caller();
    /*}}}*/
};
/*}}}*/
/*_ div_tools_del_onmove_listener {{{*/
let div_tools_del_onmove_listener = function()
{
/*{{{*/
let   caller = "div_tools_del_onmove_listener";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

    if(!moving_EL) return;
/*}}}*/
    /* DEL - TOUCH MOVE LISTENER {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if( log_this) log(caller+"%c REMOVING [touchmove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf8);

        window   .removeEventListener("touchmove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* DEL - MOUSE MOVE LISTENER {{{*/
    else {
if( log_this) log(caller+"%c REMOVING [mousemove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf8);

        window   .removeEventListener("mousemove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ADD - SCROLL LISTENER {{{*/
if( log_this) log(caller+"%c ➔ ADDING [scroll]    LISTENER", lf6);

    window.addEventListener   ("scroll"   , taxo_tools_onScroll, CAPTURE_TRUE_PASSIVE_FALSE);
    /*}}}*/
    /* CLR - MOVE DATA {{{*/
    delete moving_EL.onDown_X;
    delete moving_EL.onDown_Y;
    del_el_class(moving_EL, "pressed");
    moving_EL = undefined;

if( log_this) log_caller();
    /*}}}*/
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EVENT .. [DOWN MOVE UP CLICK RESIZE KEY SCROLL] ......... [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
    // ┌────────────────┐
    // │ DOWN           │
    // └────────────────┘
/*{{{*/
/*_ div_tools_onDown {{{*/
let div_tools_onDown = function(e)
{
/*{{{*/
let   caller = "div_tools_onDown";
/* altKey ctrlKey {{{*/
if(e.altKey) {
    lib_util.cancel_event(e);
    if(e.shiftKey) div_options_toggle();
    else           lib_log.log_console_clear(caller);
    return;
}

if(e.ctrlKey) {
    lib_util.cancel_event(e);
    return;
}
/*}}}*/
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

if(options.LOG1_EVENT) logBIG(caller,3);
/*}}}*/
    /* [is_a_tool] {{{*/
    let div_tools = get_div_tools();
    if(!div_tools) return;

    let e_target  = lib_util.get_event_target(e);
    let tool_name = lib_util.get_id_or_tag_and_className(e_target);
    let is_a_tool = get_is_a_div_tools_el(e_target);

if( log_this) log("%c"+caller+"%c"+tool_name+"%c is "+(is_a_tool ? "a":"not a")+" child of %c"+DIV_TOOLS_ID
                  ,lbL+lf3    ,lbC           ,lbC+lfX[ is_a_tool ? 5:8]                   ,lbR+lf3         );
/*{{{
log("...div_tools:",div_tools );
console.dir(                div_tools );
log("....e_target:",e_target  );
log("....e_target.parentElement:",e_target.parentElement);
log("....e.path[0]:",e.path[0]);
console.dir(e);
}}}*/

    if(!is_a_tool ) return;
    /*}}}*/
    /*  on_touch_device .. div_tools_preventScrolling {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
        div_tools_preventScrolling(caller);
    }
    /*}}}*/
    /* [moving_target] {{{*/
    let moving_target = div_tools_onDown_moving_target(e, div_tools);
    if( moving_target )
    {
        div_tools_add_onmove_listener( moving_target );
    }
    /*}}}*/
    lib_util.set_onDown_XY(e, caller);
};
/*}}}*/
/*_ div_tools_onDown_moving_target {{{*/
/*{{{*/
const FONTSIZE_DEFAULT = 12;

/*}}}*/
let div_tools_onDown_moving_target = function(e,moving_target)
{
/*{{{*/
let   caller = "div_tools_onDown_moving_target";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

let e_target = lib_util.get_event_target(e);

if(options.LOG1_EVENT) logBIG("div_tools_onDown_moving_target",3);
if( log_this) log(caller+": %c("+e.type+" ON "+lib_util.get_id_or_tag_and_className(e_target)+")", lf1);
//log("moving_target:", moving_target)
/*}}}*/
    /* [moving_target] {{{*/
    if(!moving_target) return null;

    /*}}}*/
    /* movable [moving_target] .. up from [e_target] {{{*/
    if(!lib_util.is_el_child_of_id(e_target, moving_target.id) )
    {
        let tool_name = lib_util.get_id_or_tag_and_className( moving_target );
if( log_this) log("...["+tool_name+"] IS NOT A CHILD OF ID [#"+moving_target.id+"]");

        return null;
    }
    /*}}}*/
    div_tools_onDown_adjust_transformOrigin(e, moving_target);
    return moving_target;
};
/*}}}*/
/*_ div_tools_onDown_adjust_transformOrigin {{{*/
let div_tools_onDown_adjust_transformOrigin = function(e,moving_target)
{
/*{{{*/
let   caller = "div_tools_onDown_adjust_transformOrigin";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

/*}}}*/
    /* [transformOrigin] drift towards view center */
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

    /* scale .. f(fontSize) */
    let fontSize    = parseFloat( moving_target.style.fontSize );
    let scale       = fontSize / FONTSIZE_DEFAULT;

/*{{{*/
if( log_this)
    log_key_val_group( caller
        , {     moving_target
           ,    event_xy
           ,    e_target_xy
           ,    dx
           ,    dy
           ,    transformOrigin : moving_target.style.transformOrigin
           ,    fontSize
           ,    scale
        }, lf4, true);

/*}}}*/
};
/*}}}*/
/*_ div_options_toggle {{{*/
let div_options_toggle = function()
{
    let div_options = lib_util.get_tool("div_options");
    if(!div_options) return;

    div_options.style.display
        = (div_options.style.display == "none")
        ?                               "grid"
        :                               "none"
    ;
};
/*}}}*/
/*}}}*/
    // ┌────────────────┐
    // │ UP             │
    // └────────────────┘
/*{{{*/
/*_ div_tools_onUp {{{*/
let div_tools_onUp = function(e) // eslint-disable-line no-unused-vars
{
if(e.altKey ) return;
if(e.ctrlKey) return;
/*{{{*/
let   caller =  "TAXO ➔ div_tools_onUp";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

    let e_target = lib_util.get_event_target(e);
if( log_this) logBIG(caller+"("+e.type+" "+lib_util.get_id_or_tag(e_target)+")");
/*}}}*/
if(options.LOG1_EVENT) logBIG(caller,3);

    if(e_target.id == "div_mask") return;

    /* [layout_cluster] {{{*/
    if( !get_use_lib_shadow_root() )
        layout_cluster();

    /*}}}*/

    moving_EL_onUp(e);

    let div_tools = get_div_tools();
    if(!lib_util.is_el_child_of_el(e_target, div_tools))
        setTimeout(check_location_href_changed, LOCATION_HREF_CHECKED_DELAY);

    onClick_div_tools(e);

    div_tools_restoreScrolling();
if( log_this) log_sep_bot(caller+"("+lib_util.get_id_or_tag(e.target)+")", 8);
};
/*}}}*/
/*_ moving_EL_onUp {{{*/
let moving_EL_onUp = function(e) // eslint-disable-line no-unused-vars
{
/*{{{*/
let   caller = "moving_EL_onUp";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

if(options.LOG1_EVENT) logBIG("moving_EL_onUp",3);

    let movement = lib_util.set_onMove_XY(e);
    let e_target = lib_util.get_event_target(e);
if( log_this)
    logBIG(   caller+"("+e.type+" "      +lib_util.get_id_or_tag( e_target  )+")"
           + (movement.has_moved ? (" has_moved ["+lib_util.get_id_or_tag( moving_EL )+"]") : "")
           , (movement.has_moved ?                                                        6 : 8 )
          );

if(!moving_EL) return;
/*}}}*/

    div_tools_del_onmove_listener();

    if( movement.has_moved )
    {
        div_tools_confine_to_viewport();

        save_div_tools_xy(caller);
    }

    moving_EL = null;
};
/*}}}*/
/*}}}*/
    // ┌────────────────┐
    // │ CLICK          │
    // └────────────────┘
/*{{{*/
/*_ onClick_div_tools {{{*/
let onClick_div_tools = function(e) // eslint-disable-line complexity
{
if(options.LOG1_EVENT) logBIG("onClick_div_tools",3);

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ CLICK EVENT                                                            │
    //└────────────────────────────────────────────────────────────────────────┘
/*{{{*/
if(e.altKey) return;
let   caller = "onClick_div_tools";
let log_this = options.LOG5_DIV_TOOLS;

let tag_this = options.LOG5_DIV_TOOLS || log_this;
//( tag_this) log_console_clear(TAXO_CONTENT_SCRIPT_ID+"."+caller);

let e_target = lib_util.get_event_target(e);
if(!is_taxonomy_tool(e_target) ) return;
if( log_this) log("%c"+caller+"( "+(e_target ? (e_target.id || e_target.nodeName) : "")+" )", lbH+lf3);
/*}}}*/
    /* e_target {{{*/
    if(!e_target.parentElement) return;

//log("e_target.parentElement:")
//console.dir( e_target.parentElement  )
    /*}}}*/
    /* has_moved .. (NOT A CLICK! .. KICK OFF ALL THOSE STUPID CLICK HANDLERS) {{{*/
    let movement = lib_util.set_onMove_XY(e);
if( log_this &&  movement.has_moved) log("%c...[has_moved "+  movement.has_moved +"]", lf3);
if( log_this && !movement.has_moved) log("%c...!has_moved .. onDown_EL.id=["+ (movement.onDown_EL ? movement.onDown_EL.id : "") +"]", lf6);

    if(!taxo_menu_hidden && movement.has_moved)
    {
        lib_util.cancel_event(e);
        return;
    }

    if(!e_target.parentElement) return;
    /*}}}*/
//    /* [div_magnify] {{{*/ // TOO MESSY !!
//    if(e_target.parentElement.id == "div_magnify")
//    {
//        let div_tools = get_div_tools();
//        div_tools    .classList.toggle("magnify");
//
//        let     shadow_root = get_shadow_root();
//        let        buttons_pods = shadow_root.querySelectorAll( SELECTOR_BUTTONS_POD );
//log("buttons_pods.length=["+buttons_pods.length+"]")
//        Array.from(buttons_pods ) .forEach( (el) => { el.classList.toggle("magnify"); });
//    }
//    /*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ CLICK TOOL                                                             │
    //└────────────────────────────────────────────────────────────────────────┘
    /* [SINGLE .. CLEAR .. MULTI] ➔ (div_tools direct child) {{{*/
    if(e_target.parentElement.id == DIV_TOOLS_ID)
    {
        if( taxo_menu_hidden )
        {
if( tag_this) log("%c CLICK TAXO-TOOL ➔ HIDING CLICKED %c"+e_target.id
                  ,lbL+lf5                            ,lbR+lf7        );

            show_visible_menu(caller);
        }
        else {
            switch( e_target.id  ) {
            case "taxo_single": { set_multiple_choice_state(false, e_target.id  ); } break;
            case "taxo_clear" : { taxo_menu.sel_clear      (       e_target.id  ); } break;
            case "taxo_multi" : { set_multiple_choice_state( true, e_target.id  ); } break;
            case "taxo_check" : { taxo_menu.check_taxo_json();                     } break;
            default:
                log("%c *** "+caller+": switch("+e_target.id+") not handled ***", lbH+lf2);
            }
        }
    }
    /*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ CLICK MENU                                                             │
    //└────────────────────────────────────────────────────────────────────────┘
    /* [MENU] ➔ (buttons_pod) {{{*/
    else if( has_el_class(e_target.parentElement, "buttons_pod") )
    {
        /* GET [e_target-menu_EL] [CSS_CLICKED CSS_SELECTED CSS_COLLECTED] {{{*/
        let menu_EL     = e_target;
        let shadow_root = get_shadow_root();
        let sub_menu_id = "menu_"+menu_EL.id;
        let sub_menu_EL = shadow_root.getElementById( sub_menu_id );

        onClick_get_selected_EL_array();
        onClick_get_collected_EL_array();

        let               taxo_id = menu_EL.id;
        let               menu_id = menu_EL.getAttribute("data-menu");
        let             is_a_leaf = has_el_class(menu_EL, "leaf");

if( tag_this) log("%c CLICK_1 TAXO-MENU CLICKED %c"+(menu_id || "NO menu_id")+"%c"+(taxo_id || "NO taxo_id")+"%c"+(is_a_leaf ? " leaf" : " branch")
                  ,lbb+lbH+lf5                 ,lbL+lf6                      ,lbC+lf7                       ,lbR+lf5                              );

        let e_target_is_clicked   = has_el_class(menu_EL,  CSS_CLICKED   );
        let e_target_is_selected  = has_el_class(menu_EL,  CSS_SELECTED  );
        let e_target_is_collected = has_el_class(menu_EL,  CSS_COLLECTED );

/*{{{*/
if( log_this)
    log_key_val_group(taxo_id
                     , { menu_id
                       , is_a_leaf
                       , e_target_is_clicked
                       , e_target_is_selected
                       , e_target_is_collected
                       ,     menu_EL : lib_util.get_id_or_tag_and_className(    menu_EL)
                       , sub_menu_EL : lib_util.get_id_or_tag_and_className(sub_menu_EL)
                     });
/*}}}*/
        /*}}}*/
        /* 1/2 [MENU LEAF] ➔ [ SELECT..[UNSELECT] {{{*/
        if( is_a_leaf )
        {
if( log_this) log("...TOGGLE ["+lib_util.get_id_or_tag_and_className(menu_EL)+"] selected: "+!e_target_is_selected);

            if( multiple_choice_state )     { onClick_clear_all_CSS_SELECTED(); onClick_clear_all_CSS_COLLECTED(); }
            else                            { unselect_menu_EL_all          ();           uncollect_menu_EL_all(); }

            if( !e_target_is_selected )       doselect_menu_EL( menu_EL );
            else                              unselect_menu_EL( menu_EL );
        }
        /*}}}*/
        /* 2/2 [MENU POD ] ➔ [COLLECT..UNCOLLECT] {{{*/
        else {
            /* 1/3 - menu_EL CSS_COLLECTED ➔ [DEL collected] {{{*/
            if     ( e_target_is_collected )
            {
if( tag_this) log("%c CLICK_2: MENU-COLLECTED   %c ➔ UNCOLLECT %c SET [CLICKED SINGLETON] ["+menu_EL.id+"] under ["+menu_EL.parentElement.id+"]"
                  ,lbH+lf7                     ,lbC+lf8     ,lbR+lf3                                                                          );

                uncollect_menu_EL( menu_EL    );

                show_menu_taxo_id( menu_EL.id );
            }
            /*}}}*/
            /* 2/3 - menu_EL CSS_CLICKED   ➔ [ADD collected] {{{*/
            else if( e_target_is_clicked )
            {
if( tag_this) log("%c CLICK_3: MENU-CLICKED     %c ➔ COLLECT ["+ menu_EL.id +"] %c HIDE SUB-MENU ["+menu_EL.parentElement.id+"]"
                  ,lbL+lf4                     ,lbC+lf5                        ,lbR,lf8                                                                     );

                if( multiple_choice_state ) { onClick_clear_all_CSS_SELECTED(); onClick_clear_all_CSS_COLLECTED(); }
                else                        { unselect_menu_EL_all          ();           uncollect_menu_EL_all(); }

//log("sub_menu_EL:", sub_menu_EL )
                if( sub_menu_EL )
                {
                    let sub_menu_EL_is_visible = !has_el_class(sub_menu_EL, CSS_HIDDEN);
//log("sub_menu_EL_is_visible:",sub_menu_EL_is_visible)

                    /* [sub_menu_EL_is_visible] ➔ COLLECT ➔ HIDE {{{*/
                    if( sub_menu_EL_is_visible )
                    {
                        unselect_under_menu_EL(sub_menu_EL           );
                        unselect_menu_id      (sub_menu_EL.id        );
                        undisplay_menu_id     (sub_menu_EL.id, caller);
                        docollect_menu_EL     (menu_EL               );
                    }
                    /*}}}*/
                    /* SHOW [sub_menu_EL] {{{*/
                    else {
                        show_menu_taxo_id(menu_EL.id, menu_EL);

                    }
                    /*}}}*/
                }
            }
            /*}}}*/
            /*  !is_a_leaf ➔ DISPLAY SUB-MENU {{{*/

            display_activated_cluster();

            /*}}}*/
        }
        /*}}}*/
        /* SET [CSS_SELECTED .. CSS_COLLECTED ..     CSS_CLICKED-SINGLETON] {{{*/
if( tag_this) log("%c CLICK_4: MENU-ITEM        %c ➔ SET CLICKED SINGLETON      %c UNDER PARENT-MENU ["+menu_EL.parentElement.id+"]"
          ,lbL+lf4                     ,lbC+lf4                        ,lbR,lf8                                                                     );

        onClick_apply_selected_EL_array();
        onClick_apply_collected_EL_array();

        unclick_under_parent_EL( menu_EL.parentElement );
        if(!is_a_leaf) add_el_class(menu_EL, CSS_CLICKED);
        /*}}}*/
        /* ... [UPDATE DISPLAY] {{{*/
        /* DISPLAY MENU-PATH CLUSTER */
        let menu_EL_parent_array  =           get_menu_EL_parent_array ( menu_EL );
        let menu_EL_id_path_array = taxo_menu.get_menu_EL_id_path_array( menu_EL );

if( log_this) log("%c DISPLAY [menu_EL_parent_array ] OF ["+menu_EL.id+"]:", lf5, menu_EL_parent_array   );
if( log_this) log("%c DISPLAY [menu_EL_id_path_array] OF ["+menu_EL.id+"]:", lf5, menu_EL_id_path_array);

        /* ADD A JUST UNCOLLECTED menu_EL.id */

        if(!is_a_leaf)
        {
            e_target_is_collected = has_el_class(menu_EL,  CSS_COLLECTED );
//log("e_target_is_collected:",e_target_is_collected)

            if(!e_target_is_collected)
                menu_EL_id_path_array.push("menu_"+menu_EL.id);

            undisplay_menu_EL_all(caller);
            dodisplay_menu_EL_id_path_array(menu_EL_id_path_array, menu_EL, caller);
            /* ATTACH [el.parent_pod] as [current_menu_EL.parent_EL] {{{*/
            sub_menu_EL = shadow_root.getElementById( sub_menu_id );
            if( sub_menu_EL && !sub_menu_EL.parent_pod) {
                sub_menu_EL.parent_pod = menu_EL;
if( log_this) log("%c➔ parent_pod:",7, sub_menu_EL.parent_pod);
            }
            /*}}}*/
        }
        else {
            sync_taxo_clear_button( caller );

        }
//log("menu_EL_id_path_array:",menu_EL_id_path_array)
        /*}}}*/
    }
    /*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ CLICK REPORT MESSAGE TO BACKGROUND-SCRIPT                              │
    //└────────────────────────────────────────────────────────────────────────┘
    /* [SEND REPORT MESSAGE] ➔ (to background script) {{{*/
    taxo_msg.send_report_message();

    /*}}}*/
};
/*}}}*/
/*_ is_taxonomy_tool {{{*/
let is_taxonomy_tool = function(e_target)
{
    let div_tools = get_div_tools();
    let result
        =  lib_util.is_el_child_of_el      (e_target, div_tools    )
        || lib_util.is_el_or_child_of_class(e_target, "buttons_pod")
    ;
    result = !!result;

//log("...is_taxonomy_tool: ...return "+result)
    return result;
};
/*}}}*/
/*}}}*/
    // ┌────────────────┐
    // │ MOVE           │
    // └────────────────┘
/*{{{*/
/* VIEWPORT MARGINS {{{*/
const DIV_TOOLS_CONFINE_TO_VIEWPORT_DELAY   = 500;
const MOVE_MARGIN_D                         =  16;
const MOVE_MARGIN_L                         =   4;
const MOVE_MARGIN_R                         =  32;
const MOVE_MARGIN_U                         =   4;

let   div_tools_confine_to_viewport_timer;

/*}}}*/
/*_ div_tools_onMove {{{*/
let div_tools_onMove = function(e)
{
/*{{{*/
    moving_EL = moving_EL || e.path[0];
if(!moving_EL) return;

let   caller = "div_tools_onMove";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

if( log_this ) caller += "("+e.type+")";
/*}}}*/
    /* [has_moved] ➔ [pressed] {{{*/
    let movement = lib_util.set_onMove_XY(e);
if( log_this &&  movement.has_moved) log("%c...[has_moved "+  movement.has_moved +"]", lf6);
//log_key_val_group("movement", movement)
    if( movement.has_moved )
    {
        add_el_class(moving_EL, "pressed");

        let e_target = lib_util.get_event_target(e);
if( log_this) logBIG(caller+": .. "+lib_util.get_id_or_tag(e_target)+" has_moved ");
    }
    /*}}}*/
    /* MOVE [moving_EL] {{{*/
    let x =              moving_EL.onDown_X + movement.dxy.x ;
    let y =              moving_EL.onDown_Y + movement.dxy.y ;

    div_tools_move_EL_XY(moving_EL, x, y);
    /*}}}*/
    /* [layout_cluster] {{{*/
    if(moving_EL && !get_use_lib_shadow_root())
        layout_cluster({ moving_EL });

    /*}}}*/
};
/*}}}*/
/*_ div_tools_move_EL_XY {{{*/
let div_tools_move_EL_XY = function(el, x,y)
{
    if(!el) return; // may happen when both extension an embedded are running
let caller = "div_tools_move_EL_XY"; // eslint-disable-line no-unused-vars
/*{{{
log(caller+"("+lib_util.get_id_or_tag(el)+") .. [position "+el.style.position+"] .. [xy "+x+" "+y+"]");
}}}*/
    div_tools_confine_to_viewport_timer = null;

    /* just moved in place to cope with expandable WH */
    let check_expanded_WH = (x == undefined) || (y == undefined);

    /* TOP LEFT {{{*/
    let bcr  = el.getBoundingClientRect();
    if(   x == undefined) { x = bcr.x; } // when x,y are not given
    if(   y == undefined) { y = bcr.y; } // move in place to trigger confinement

    /* WIDTH HEIGHT */
    let { w , h }
        = check_expanded_WH
        ?  get_expanded_EL_WH(el)
        :  { w: bcr.width , h: bcr.height }
    ;
    if(w == 0) return;

    /* VIEWPORT */
    let w_min = (BUTTONS_FONT_SIZE_MIN * w / parseInt(buttons_fontSize || el.style.fontSize)).toFixed(0);
    let h_min = (BUTTONS_FONT_SIZE_MIN * h / parseInt(buttons_fontSize || el.style.fontSize)).toFixed(0);

    /* eslint-disable no-param-reassign */
    let x_min =                              MOVE_MARGIN_L;
    let y_min =                              MOVE_MARGIN_U;
    let x_max = window.innerWidth  - w_min - MOVE_MARGIN_R;
    let y_max = window.innerHeight - h_min - MOVE_MARGIN_D;

    y_max     = Math.max(  0, y_max);
    x_max     = Math.max(  0, x_max);

    /* CLIP URDL */
    if(typeof el.urdl == "undefined")   el.urdl = {}; // CLIP: UP RIGHT DOWN LEFT
    el.urdl.u = (y <= y_min );
    el.urdl.r = (x >= x_max );
    el.urdl.d = (y >= y_max );
    el.urdl.l = (x <= x_min );

    /* CONFINE EL TOP */
    x         = Math.min(x, x_max);
    y         = Math.max(y, y_min);
    x         = Math.max(x, x_min);
    y         = Math.min(y, y_max);
    el.style.left   =  x+"px";
    el.style.top    =  y+"px";
    el.style.right  = "unset";
    el.style.bottom = "unset";

/*{{{
log_key_val("CONFINE EL TOP"
            , { w     , h
              , w_min , h_min
              , x_max , y_max
              , urdl   : el.urdl
              , left   : el.style.left
              , top    : el.style.top
              , el_style_fontSize : el.style.fontSize
            });
}}}*/

    /*}}}*/
    /* APPLY URDL BORDER CAP .. f(docked state) {{{*/



    /*}}}*/
    /* RESCALE {{{*/
//  div_tools_move_RESCALE();

    /*}}}*/
};
/*}}}*/
/*_ div_tools_confine_to_viewport {{{*/
let div_tools_confine_to_viewport = function(el=get_div_tools(),delay=DIV_TOOLS_CONFINE_TO_VIEWPORT_DELAY)
{
    if(div_tools_confine_to_viewport_timer) clearTimeout( div_tools_confine_to_viewport_timer );
       div_tools_confine_to_viewport_timer=   setTimeout( function() { div_tools_move_EL_XY(el); }, delay);
};
/*}}}*/
/*_ get_expanded_EL_WH {{{*/
let get_expanded_EL_WH = function(el)
{
    /* save current xy */
    let       bcr = el.getBoundingClientRect();
    let         x = bcr.x;
    let         y = bcr.y;

    /* move to page top left to get more room */
    el.style.left = 0;
    el.style.top  = 0;
    bcr           = el.getBoundingClientRect();

    /* move back to saved xy */
    el.style.left = x+"px";
    el.style.top  = y+"px";

//log("get_expanded_EL_WH: WH=[ "+bcr.width+" , "+bcr.height+" ]")

    return { w : bcr.width , h : bcr.height };
};
    /*}}}*/
/*}}}*/
    // ┌────────────────┐
    // │ RESIZE         │
    // └────────────────┘
/*{{{*/
/*_ div_tools_onResize {{{*/
/*{{{*/
const TAXO_ONRESIZE_DELAY = 250;

let div_tools_onResize_timer;
/*}}}*/
let div_tools_onResize = function(e)
{
let e_type = e ? "div_tools_onResize(e.type "+e.type+")" : lib_log.get_callers();
if(options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL) logBIG( e_type );

    if(div_tools_onResize_timer) clearTimeout(div_tools_onResize_timer);
       div_tools_onResize_timer=   setTimeout(div_tools_onResize_handler, TAXO_ONRESIZE_DELAY);
};
/*}}}*/
/*_ div_tools_onResize_handler {{{*/
let div_tools_onResize_handler = function()
{
    div_tools_onResize_timer = null;

    if( !get_shadow_root() ) return;

    div_tools_confine_to_viewport();

    adjust_pods_maxHeight();

    show_visible_menu();
};
/*}}}*/
/*}}}*/
    // ┌────────────────┐
    // │ ORIENTATION    │
    // └────────────────┘
/*_ div_tools_onOrientationchange {{{*/
let div_tools_onOrientationchange = function(e) /* eslint-disable-line no-unused-vars */
{
    div_tools_onResize(e);
};
/*}}}*/
    // ┌────────────────┐
    // │ KEY            │
    // └────────────────┘
/*_ div_tools_onKey {{{*/
//const CHAR_CODE_ESC = 27;

let div_tools_onKey = function(e)
{
    if(e.altKey) return;

    let charCode
        = (e.keyCode)
        ?  e.keyCode
        :  e.which
    ;
    if(options.LOG5_DIV_TOOLS) logBIG("KEY: "+charCode, lf7);

//  if(charCode != CHAR_CODE_ESC) return;

//  taxo_tools_standby();
};
/*}}}*/
    // ┌────────────────┐
    // │ SCROLL         │
    // └────────────────┘
/*{{{*/
/*_ div_tools_preventScrolling {{{*/
let div_tools_preventScrolling = function(_caller)
{
/*{{{*/
let   caller = "div_tools_preventScrolling";
let log_this = options.LOG5_DIV_TOOLS;

/*}}}*/
    /* NO SCROLLBAR TO HIDE {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if(!on_touch_device && !lib_util.has_scrollbar(document.documentElement)) return;

    /* }}}*/
    /* APPLY CACHED [scrolling_context] {{{*/
    let c = document.documentElement.scrolling_context;
    if( c ) {
        document.documentElement.style.overflow     = "hidden";
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
/*_ div_tools_restoreScrolling {{{*/
let div_tools_restoreScrolling = function()
{
/*{{{*/
let   caller = "div_tools_restoreScrolling";
let log_this = options.LOG5_DIV_TOOLS;

/*}}}*/
    /* NO SCROLLBAR TO HIDE {{{*/
//  let on_touch_device = ("ontouchstart" in document.documentElement);
//  if(!on_touch_device && !lib_util.has_scrollbar(document.documentElement)) return;

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
        , callers      : get_callers()
        }, lf2, true);

    if(document.documentElement.scrolling_context)
        log_key_val_group("...document.documentElement.scrolling_context"
            , document.documentElement.scrolling_context
            , lbH+lf9, false);

}
/*}}}*/
};
/*}}}*/
/*_ taxo_tools_onScroll {{{*/
let taxo_tools_onScroll = function(e) // eslint-disable-line no-unused-vars
{
let log_this = options.LOG6_MOVE_TOOL;

if( log_this) logBIG("taxo_tools_onScroll");

    div_tools_del_onmove_listener();
};
/*}}}*/
/*}}}*/
    // ┌────────────────┐
    // │ LOAD .. UNLOAD │
    // └────────────────┘
/*{{{*/
/*_ check_location_href_changed {{{*/
/*{{{*/
const     LOCATION_HREF_CHECKED_DELAY = 1000;

let       location_href_checked;
/*}}}*/
let check_location_href_changed = function()
{
/*{{{*/
let   caller = "check_location_href_changed";
let log_this = options.LOG2_MESSAGE || options.LOG5_DIV_TOOLS;

/*}}}*/
    if( !location_href_checked )
    {
if( log_this) logBIG(caller+": ["+document.location.href+"] FIRST CHECK", 8);

        location_href_checked = document.location.href;
        return;
    }
    if( document.location.href == location_href_checked)
    {
if( log_this) logBIG(caller+": ["+location_href_checked+"] UNCHANGED", 8);

/*{{{
        xpath_outline.outline_clear_all();
}}}*/
        return;
    }

if( log_this) logBIG(caller+": FROM ["+location_href_checked+"] TO ["+document.location.href+"]");

    location_href_checked = document.location.href;

    query_domains( caller  );
};
let query_domains = function() { log(TAXO_CONTENT_SCRIPT_ID+" ➔ query_domains()"); };
/*}}}*/
/*_ div_tools_beforeunload {{{*/
let div_tools_beforeunload = function(e) /* eslint-disable-line no-unused-vars */
{
//  save_div_tools_xy("div_tools_beforeunload"); // @see moving_EL_onUp
};
/*}}}*/
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EXPORT .................................................. [taxo_pods] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
return { name : "taxo_pods"

    /* PARAMS */
    ,    buttons_fontSize
    ,    SELECTOR_BUTTONS_POD
    ,    SELECTOR_HIDDEN
    ,    SELECTOR_CLICKED
    ,    SELECTOR_SELECTED
    ,    SELECTOR_COLLECTED

    /* OPTIONS */
    ,    set_multiple_choice_state
    ,    sync_taxo_clear_button

    /* INIT */
    ,    taxo_pods_init
    ,    load_taxo_id_array
    ,    unload_taxo_id_array_all
    ,    reload_taxo_id_array
    ,    is_cache_empty

    /* DISPLAY */
    ,    dodisplay_menu_EL
    ,    layout_cluster
    ,    show_top_menu
    ,    show_visible_menu

    // EVENT
    ,    div_tools_beforeunload
    ,    div_tools_onDown
    ,    div_tools_onKey
    ,    div_tools_onMove
    ,    div_tools_onOrientationchange
    ,    div_tools_onResize
    ,    div_tools_onUp
    ,    get_collected_taxo_id_path_array
    ,    get_selected_taxo_id_path_array
    ,    unclick_under_parent_EL
    ,    uncollect_menu_EL_all
    ,    undisplay_menu_EL
    ,    unselect_menu_EL_all
    ,    unselect_menu_id
    ,    unselect_under_menu_EL
    ,    unvisit_menu_EL_all

    //DEBUG {{{
    , adjust_pods_maxHeight
    , div_tools_move_RESCALE
    , dodisplay_menu_EL_id_path_array
    , get_collected_EL_array
    , get_menu_EL_parent_array
    , get_selected_EL_array
    , load_div_tools_xy
    , load_taxo_sync_visited
    , set_taxo_id_path_CSS
    , show_taxo_id
    , undisplay_menu_EL_all
    , click_taxo_id_array

    //}}}
};
/*}}}*/
}());
/*}}}*/

// ┌──────────────┐ ┌──────────────────────────────────────────────────────────┐
// │ taxo_menu    │-│ ........................... [BUILD MENU PODS] [selected] │
// └──────────────┘ └──────────────────────────────────────────────────────────┘
const LABEL_ELLIPSIS = 48;
/*{{{*/
let   taxo_menu     = (function() {
//"use strict";
/*{{{*/
const TAXO_MENU_LOG = false;
const TAXO_MENU_TAG = false;

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ [taxo_json] ➔ TAXO-MENU-TREE ............................ [taxo_menu] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*➔ get_node_with_taxo_id_from_node {{{*/

let get_node_with_taxo_id_from_node = function(id, from_node, from_level)
{
//log("get_node_with_taxo_id_from_node("+from_level+" .. from_node=["+from_node.id+"]");

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
        let             { node , parent_node, level } = get_node_with_taxo_id_from_node(id, from_node.list[i], from_level+1);
        if(!parent_node)         parent_node = from_node;
        if(node) return { node , parent_node, level };
    }
    return  {};
};
/*}}}*/
/*_ get_node_path_of_taxo_id {{{*/
let get_node_path_of_taxo_id = function(id)
{
    let   node_id = id;
    let node_path = id;

    let node, parent_node;
    do {
        (  {        parent_node } = get_node_with_taxo_id_from_node(node_id, taxo_json));
        if(        !parent_node ) break;
        if( node == parent_node ) break;

        /**/node  = parent_node;
        node_id   = parent_node.id;
      //node_path = "menu_"+parent_node.id+","+node_path;
        node_path =         parent_node.id+","+node_path;
    }
    while(   (parent_node                   )
          && (parent_node.id !=           id)
          && (parent_node.id != taxo_json.id));

//log("get_node_path_of_taxo_id("+id+"): ...return node_path=["+node_path+"]")
    return node_path;

/*{{{
j0"*y}
id="BATHING_SUIT_MEN"; taxo_content.get_node_path_of_taxo_id(id);
id="BATHING_SUIT"    ; taxo_content.get_node_path_of_taxo_id(id);
id="BOTTOM_WEAR"     ; taxo_content.get_node_path_of_taxo_id(id);
id="FASHION"         ; taxo_content.get_node_path_of_taxo_id(id);
id="ALL"             ; taxo_content.get_node_path_of_taxo_id(id);

}}}*/
};
/*}}}*/

/*➔ sel_current_menu_taxo_id {{{*/
/*{{{*/
let current_menu_EL;

/*}}}*/
let sel_current_menu_taxo_id = function(taxo_id) // eslint-disable-line complexity
{
    let                  menu_EL = get_menu_EL_for_taxo_id( taxo_id );
    sel_current_menu_EL( menu_EL );

    taxo_pods.layout_cluster();
};
/*}}}*/
/*_ sel_current_menu_EL {{{*/
let sel_current_menu_EL = function(menu_EL)
{
/*{{{*/
let   caller = "sel_current_menu_EL";
let log_this = TAXO_MENU_LOG;

let tag_this = TAXO_MENU_TAG || log_this;

if( log_this) log(caller+"("+menu_EL.id+"): current_menu_EL=["+(current_menu_EL ? current_menu_EL.id : "")+"]");
/*}}}*/
    /* SET [current_menu_EL] {{{*/
    current_menu_EL
        = menu_EL;

if(TAXO_MENU_TAG) logBIG("LAYOUT for current_menu_EL.id=["+ current_menu_EL.id +"]", 2);

    let menu_EL_id_path_array = get_menu_EL_id_path_array( current_menu_EL );

    let          shadow_root = get_shadow_root();
    let             selector = taxo_pods.SELECTOR_BUTTONS_POD+"[id*='menu_']";
    let       all_menu_array = Array.from(shadow_root.querySelectorAll( selector ));

    /*}}}*/
    /* SHOW [current_menu_EL] and its parents-chain .. HIDE ALL OTHERS {{{*/
    all_menu_array
        .forEach( (el) => {
            let is_current_menu        = (current_menu_EL.id     == el.id );
            let is_current_menu_parent =  menu_EL_id_path_array.includes( el.id );

            let taxo_menu_hidden       = !is_current_menu_parent
                &&                       !is_current_menu;
/*{{{*/
if( log_this)
    log_key_val_group((taxo_menu_hidden ? "HIDING" : "SHOWING")+" "+ el.id
                        ,{ el_id                     :  el.id
                         , current_menu_EL           :  current_menu_EL.id
//                       , current_menu_EL_parent_id : (current_menu_EL.parent_EL ? current_menu_EL.parent_EL.id : "")
                         , is_current_menu
                         , is_current_menu_parent
                         , taxo_menu_hidden
                        }
                        , lfX[taxo_menu_hidden ? 2:5], false);

/*}}}*/
            /* SHOW only [current_menu_EL] parent chain .. HIDE others {{{*/
            if( taxo_menu_hidden )
            {
if(TAXO_MENU_TAG) logBIG("HIDING  ["+el.id+"]", 2);
                taxo_pods.undisplay_menu_EL(el, caller);

                taxo_pods.unselect_menu_id("menu_"+el.id);
            }
            else {
if(TAXO_MENU_TAG) logBIG("SHOWING ["+el.id+"]", 5);

                taxo_pods.dodisplay_menu_EL(el, caller);

//              /* ATTACH [el.parent_pod] as [current_menu_EL.parent_EL] {{{*/
//              if(    current_menu_EL.parent_EL
//                 && !el.parent_pod                                  // "menu_FURNITURE".includes("FURNITURE") */
//                 &&  el.id.includes( current_menu_EL.parent_EL.id ) // ➔ sub menu positionning
//                )    el.parent_pod = current_menu_EL.parent_EL;
//              /*}}}*/

            }
            /*}}}*/
        });

    /*}}}*/
};
/*}}}*/

/*_ get_menu_EL_for_taxo_id {{{*/
let get_menu_EL_for_taxo_id = function(taxo_id,clicked_EL)
{
/*{{{*/
let   caller = "get_menu_EL_for_taxo_id";
let log_this = TAXO_MENU_LOG;

if( log_this) log("%c"+caller+"("+taxo_id+ (clicked_EL ? (" , clicked_EL=["+clicked_EL+"]") : "") +"):", lfX[clicked_EL ? 5:8]);
/*}}}*/
    let shadow_root = get_shadow_root();
    let menu_EL
        =  shadow_root.getElementById("menu_"+taxo_id )
        || add_menu_EL_for_taxo_id(taxo_id, clicked_EL)
    ;

    return menu_EL;
};
/*}}}*/
/*_ add_menu_EL_for_taxo_id {{{*/
/*{{{*/
const LF  = String.fromCharCode(10);

const MENU_ZINDEX_TOP = 100;
/*}}}*/
let add_menu_EL_for_taxo_id = function(taxo_id,clicked_EL)
{
/*{{{*/
let caller = "add_menu_EL_for_taxo_id";
let log_this = TAXO_MENU_LOG;

let tag_this = TAXO_MENU_TAG || log_this;
if( tag_this) caller += "("+taxo_id+(clicked_EL ? (" , clicked_EL=["+clicked_EL.id+"]") : "")+")"
    ;
/*}}}*/
    /* [taxo_id] .. taxo_json item {{{*/
    let { node , parent_node , level } = get_node_with_taxo_id_from_node(taxo_id, taxo_json); /* FROM ROOT NODE .. OPTIMIZE? */
if(!node) log(caller+":\n taxo_id NOT FOUND: %c["+taxo_id+"]", lb2);

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
        let        label_text =    has_title ?        item.title  : ellipsis(description_or_id, LABEL_ELLIPSIS);
        let          el_title =    has_title ? description_or_id  : item.id           ;
        let             label =   (has_list  ?              "… "  : "● ")+ label_text ;
        let        item_class =    has_list  ?                ""  : "class='leaf'"    ;

        if(description_or_id.length > LABEL_ELLIPSIS) el_title += "\n"+description_or_id;

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
    let shadow_root              = get_shadow_root();
    let menu_EL_id               = "menu_"+taxo_id;
    let menu_EL                  = shadow_root.getElementById( menu_EL_id );
    if(!menu_EL)
    {
        menu_EL                  = document.createElement("DIV");
//      menu_EL.ontransitionend  = taxo_pods.layout_cluster_handler_next; // never fired
        menu_EL.id               = menu_EL_id;
        menu_EL.className        = "buttons_pod col_x1";

        let buttons_pod_array    = shadow_root.querySelectorAll( taxo_pods.SELECTOR_BUTTONS_POD );
        menu_EL.style.zIndex     = MENU_ZINDEX_TOP - buttons_pod_array.length;
        menu_EL.style.display    = "none";
      //menu_EL.style.visibility = "hidden";
        menu_EL.style.opacity    = "0";

        menu_EL.innerHTML        = innerHTML;
        menu_EL.parent_node      = parent_node || taxo_json; // the root node

        shadow_root.  appendChild( menu_EL );
    }
    /*}}}*/
/*{{{*/
if( tag_this)
    log_key_val_group(   caller
                      ,{ node
                       , node_list        :  node.list
                       , node_list_length : (node.list) ? node.list.length : ""
                       , parent_node
                       , level
                       , menu_EL
                     //, innerHTML
                       , callers          : lib_log.get_callers()
                      }, lfX[clicked_EL ? 5:8]
                      , true);

/*}}}*/
    return menu_EL;
};
/*}}}*/
/*_ get_menu_EL_id_path_array {{{*/
let get_menu_EL_id_path_array = function(to_menu_EL)
{
//log("get_menu_EL_id_path_array("+to_menu_EL.id+")")
//log("to_menu_EL:",to_menu_EL)

    /* PATH TAIL-ITEM */
    let menu_EL_id_path_array = [ to_menu_EL.id ];

    /* CONTAINING MENU */
    let menu_EL = to_menu_EL.parentElement;
    if( menu_EL)
    {
        menu_EL_id_path_array.unshift( menu_EL.id );

//log("...["+menu_EL.id+"].parent_node=["+(menu_EL.parent_node ? menu_EL.parent_node.id:"")+"]",menu_EL.parent_node)

        while(    menu_EL.parent_node
                  //        && (menu_EL.parent_node.id != taxo_json.id)
                  && !menu_EL_id_path_array.includes("menu_"+taxo_json.id)
             ) {
            /* PARENT MENU */
            let parent_menu_id = "menu_"+menu_EL.parent_node.id;
            menu_EL_id_path_array.unshift( parent_menu_id );

//          if( menu_EL.parent_node.id == taxo_json.id) break;

            /* GET (POSSIBLY CREATE) MENU PARENT ELEMENT*/
//log("..up next: menu_EL.parent_node.id=["+menu_EL.parent_node.id+"] ➔ parent_menu_id=["+parent_menu_id+"]")
//                  menu_EL.parent_EL = get_menu_EL_for_taxo_id( menu_EL.parent_node.id );
            let     parent_EL = get_menu_EL_for_taxo_id( menu_EL.parent_node.id );

//log("..["+menu_EL.id+"].parent_EL=["+(menu_EL.parent_EL ? menu_EL.parent_EL.id:"")+"]",menu_EL.parent_EL)
//          menu_EL = menu_EL.parent_EL;
            menu_EL =         parent_EL;
        }
    }

//log("...return menu_EL_id_path_array:", menu_EL_id_path_array)
//console.dir(menu_EL_id_path_array)
    return  menu_EL_id_path_array;
};
/*}}}*/
/*_ get_taxo_id_path {{{*/
let get_taxo_id_path = function(taxo_id)
{
    if(!taxo_id) return [];

    let        shadow_root = get_shadow_root();
    let            leaf_EL = shadow_root.querySelector("#"+taxo_id);
    let       taxo_id_path = leaf_EL.id;                                     // .. [RING_MEN]

    let            menu_EL = leaf_EL.parentElement;

    /* CONTAINING MENU ID FROM [data-menu] ATTRIBUTE */
    let     parent_taxo_id = menu_EL.getAttribute("data-menu");              // .. [RING]
    if(     parent_taxo_id ) taxo_id_path = parent_taxo_id+"."+taxo_id_path; // .. [RING.RING_MEN]

    /* PREPEND ALL PARENT MENU PATH */
    let   parent_node      = menu_EL.parent_node;

    while(parent_node && (parent_node.id != taxo_json.id))
    {
        taxo_id_path       =   parent_node.id+"."+taxo_id_path;              // .. [FASHION_ACCESSORIES] [FASHION] [ALL]
        let menu_id        =   "#menu_"+parent_node.id;
        menu_EL            =   shadow_root.querySelector( menu_id );
        parent_node        =   menu_EL ? menu_EL.parent_node : null;
    }

//log("get_taxo_id_path("+taxo_id+") ...return taxo_id_path:",taxo_id_path)
    return taxo_id_path;
};
/*}}}*/
/*➔ sel_clear {{{*/
let sel_clear = function(_caller)
{
/*{{{*/
let   caller = "sel_clear";
let tag_this = TAXO_MENU_TAG || taxo_pods.TAXO_PODS_TAG || options.LOG1_STEP;

/*}}}*/
    /* 1/4 - CLEAR [collected] [selected] [visited] {{{*/
    let       c_cleared =                                  taxo_pods.uncollect_menu_EL_all();
    let       s_cleared = ( c_cleared              ) ? 0 : taxo_pods. unselect_menu_EL_all();
    let       v_cleared = ( c_cleared ||  s_cleared) ? 0 : taxo_pods.  unvisit_menu_EL_all();
    let nothing_cleared = (!c_cleared && !s_cleared && !v_cleared);

/*{{{*/
if( tag_this && !nothing_cleared)
{
    let l_x = lfX[(s_cleared && 4) || (c_cleared && 5) || (v_cleared && 6) || 9];
    log("%c"+caller+"("+_caller+") %cselected "+s_cleared+"%c collected "+c_cleared+"%c visited "+v_cleared
        ,lbL+l_x                  ,lbC+lf4                ,lbC+lf5                  ,lbR+lf6               );
}
/*}}}*/
    /*}}}*/
    if( nothing_cleared ) {
        /* [m_count] {{{*/
        let            shadow_root = get_shadow_root();
        let el_array = shadow_root.querySelectorAll(taxo_pods.SELECTOR_BUTTONS_POD+":not("+taxo_pods.SELECTOR_HIDDEN+")");
        let m_count = el_array.length;
        /**/el_array.forEach((el) => m_count -= (el.style.visibility == "hidden") ? 1 : 0); // remove invisible menus
        /**/el_array.forEach((el) => m_count -= (el.style.opacity    == "0"     ) ? 1 : 0); // remove invisible menus

        /*}}}*/
        /* 2/4 SHOWING ONLY TOP MENU {{{*/
        if(m_count > 1)
        {
if( tag_this)
    log("%c"+caller+"("+_caller+")%c SHOWING ONLY TOP MENU (instead of "+m_count+" out of "+el_array.length+")"
        ,lbL+lf3                 ,lbR+lf7);

            taxo_pods.undisplay_menu_EL_all( _caller );
            taxo_pods.show_top_menu();
        }
        /*}}}*/
        /* 3/4 UNLOADING ALL TAXO MENUS {{{*/
        else if(m_count > 0)
        {
if( tag_this)
    log("%c"+caller+"("+_caller+")%c UNLOADING ALL "+el_array.length+" TAXO MENUS"
        ,lbL+lf0                 ,lbR+lf7);

            taxo_pods.unload_taxo_id_array_all();
        }
        /*}}}*/
        /* 4/4 {{{*/
        else if( !taxo_pods.is_cache_empty() )
        {
if( tag_this)
    log("%c"+caller+"("+_caller+")%c RELOADING PAGE SELECTION FROM CACHE"
        ,lbL+lf9                 ,lbR+lf7);

            taxo_pods.reload_taxo_id_array();
        }
        /*}}}*/
        else {
if( tag_this)
    log("%c"+caller+"("+_caller+")%c CANNOT RELOAD PAGE SELECTION (CACHE IS EMPTY)"
        ,lbL+lf9                 ,lbR+lf8);

            taxo_pods.undisplay_menu_EL_all( _caller );
            taxo_pods.show_top_menu();
        }
    }
    taxo_pods.sync_taxo_clear_button(_caller);
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ DEBUG ................................................... [taxo_menu] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*➔ check_taxo_json {{{*/
/*{{{*/
const CHECK_TAXO_JSON_ID_ARRAY
    = [ "ALL"
      , "BATHING_SUIT_MEN"
      , "EV_CARS"
      , "OIL_CARS"
      , "HOUSEHOLD_APPLIANCES"
    ];

const CHECK_TAXO_JSON_ID_DELAY = 1000;
let   check_taxo_json_id_interval;
/*}}}*/
let check_taxo_json = function()
{
log("taxo_json:");
console.dir( taxo_json  );

    if(typeof taxo_json != "undefined")
        log("%c check_taxo_json: TAXO_JSON LOAD OK", lbH+lf5);

    /* save [taxo_check_button.textContent] */
    let       shadow_root = get_shadow_root();
    let taxo_check_button = shadow_root.getElementById( "taxo_check" );
    /**/taxo_check_button.innerText_saved = taxo_check_button.innerText;

    /* RAMDOM SAMPLE FROM [TAX/javascript/taxo_json_211218.js] */
    let check_idx = 0;
    check_taxo_json_id_interval
        = setInterval( function() {
            if(check_idx >= CHECK_TAXO_JSON_ID_ARRAY.length)
            {

                /* restore [taxo_check_button.textContent] */
                taxo_check_button.textContent = taxo_check_button.innerText_saved;
                delete taxo_check_button.innerText_saved;

                clearInterval( check_taxo_json_id_interval );
            }
            else {
                /* SYNC [taxo_check_button.textContent] */
                taxo_check_button.innerText
                    = taxo_check_button.innerText_saved+"\n"
                    +(check_idx+1)+" / "+CHECK_TAXO_JSON_ID_ARRAY.length
                ;
                let                        id = CHECK_TAXO_JSON_ID_ARRAY[ check_idx ];
                log_taxo_id              ( id );
                taxo_content.show_taxo_id( id );
                check_idx += 1;
            }
        }, CHECK_TAXO_JSON_ID_DELAY);

    /* RAMDOM SAMPLE FROM [TAX/javascript/taxo_json_201118.js] */
    /*{{{
        log_taxo_id();
        log_taxo_id( "interest"          );
        log_taxo_id( "artsentertainment" );
        log_taxo_id( "bollywood"         );
}}}*/

    let iterate_level_samples = iterate( taxo_json );

log(iterate_level_samples);
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
        let {node , parent_node, level} = get_node_with_taxo_id_from_node(id, taxo_json);
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
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EXPORT .................................................. [taxo_menu] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
return { name : "taxo_menu"
    ,    get_menu_EL_for_taxo_id
    ,    sel_clear
    ,    sel_current_menu_taxo_id

    // DEBUG
    ,  check_taxo_json
    ,  iterate
    ,  log_taxo_id
    ,  get_taxo_id_path
    ,  get_node_with_taxo_id_from_node
    ,  get_node_path_of_taxo_id
    ,  get_menu_EL_id_path_array
};
/*}}}*/
}());
/*}}}*/

// ┌──────────────┐ ┌──────────────────────────────────────────────────────────┐
// │ taxo_msg     │-│ ....................... [MESSAGE FROM BACKGROUND-SCRIPT] │
// └──────────────┘ └──────────────────────────────────────────────────────────┘
/*{{{*/
let   taxo_msg      = (function() {
//"use strict";
/*{{{*/
const TAXO_MSG_TAG   = false;

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ MESSAGE TO BACKGROUND-SCRIPT ............................. [taxo_msg] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
let config = { "CMD_TAXONOMY" : "taxonomy" };

/*}}}*/
/*▲▲▲▲ send_report_message .. chrome.runtime.sendMessage {{{*/
let    send_report_message = function(taxo_id)
{
/*{{{*/
let caller = "send_report_message";
let log_this = options.LOG2_MESSAGE;

let tag_this = TAXO_MSG_TAG || log_this;
if( log_this) log(caller);
//console.trace()
/*}}}*/
    /* FORWARD SELECTION TO BROWSER EXTENSION BACKGROUND SCRIPT .. SERVER/server.js {{{*/
    let selected  = taxo_pods.get_selected_taxo_id_path_array ();
    let collected = taxo_pods.get_collected_taxo_id_path_array();

    let message
        = { cmd      : config.CMD_TAXONOMY
          , url      : document.location.href
          , selected
          , collected
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
let caller = TAXO_CONTENT_SCRIPT_ID+".read_response";
let log_this = options.LOG2_MESSAGE;
//t tag_this = TAXO_MSG_TAG || log_this;

if( log_this) log(caller+": %c RECEIVING ANSWER FROM BACKGROUND SCRIPT:", lb4);
if( log_this) log("%c"+response, lf4);
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
        set_activated( response );
    }
    /*}}}*/
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ RESPONSE FROM BACKGROUND-SCRIPT .......................... [taxo_msg] │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ add_message_listener {{{*/
let add_message_listener = function()
{
let log_this = options.LOG2_MESSAGE || options.LOG2_MESSAGE;

    try {
        chrome.runtime.onMessage.addListener( onMessage_listener );
if( log_this) log("%c LISTENING TO MESSAGE FROM BACKGROUND SCRIPT...", "color:#AFA");
    }
    catch(ex) {
        log("%c"+TAXO_CONTENT_SCRIPT_ID+": CANNOT LISTEN TO MESSAGE FROM BACKGROUND SCRIPT:\n"+ex, lbH+lf2);
    }
};
/*}}}*/
/*_ onMessage_listener {{{*/
let onMessage_listener = function(request, sender, sendResponse)
{
let log_this = options.LOG1_STEP || options.LOG2_MESSAGE;
if( log_this) log("%c RECEIVING MESSAGE FROM BACKGROUND SCRIPT...", "color:#AFA");

    if(typeof request.activated != "undefined")
    {
        onMessage_activated(request,sendResponse);

        sendResponse({ ack: JSON.stringify( request ) });
    }
    return true; // async response expected
};
/*}}}*/
/*_ onMessage_activated {{{*/
let onMessage_activated = function(request,sendResponse)
{
let caller = "onMessage_activated";
let log_this = options.LOG1_STEP || options.LOG2_MESSAGE;

    let activated = taxo_msg.is_activated();
if( log_this) log("%c➔ Extension %c activated "+activated+" %c .. "+TAXO_CONTENT_SCRIPT_TAG+" ", "color:#AFA", "background-color:"+(request.activated ? "#0A0" : "#00A"), "background-color: black;");

    taxo_content.on_activated_load_options( request );

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ ACTIVATED ON-OFF                                                      │
    // └───────────────────────────────────────────────────────────────────────┘
    //{{{
if( log_this)
    log_key_val_group(caller+": request"
                      , {         activated
                        , request_activated : request.activated }
                      , 4, false);

    if(              activated != request.activated)
        set_activated(   request );

    //}}}
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ [activated] .............................................. [taxo_msg] │
    // └───────────────────────────────────────────────────────────────────────┘
/*➔ is_activated {{{*/
let    activated = false;
let is_activated = function()
{
    return activated;
};
/*}}}*/
/*➔ set_activated {{{*/
let set_activated = function(request)
{
/*{{{*/
let   caller = TAXO_CONTENT_SCRIPT_ID+" ➔ set_activated";
let log_this = options.LOG1_STEP || options.LOG2_MESSAGE;

    let state
        = (request.activated == undefined) /* SET OR TOGGLE */
        ?         !activated
        :  request.activated;

if( log_this)
    log("%c "+caller+" %c FROM "+activated     +" %c TO "+ state
        ,lbL          ,lbC+lfX[  activated ? 4:2],lbR+lfX[ state ? 4:2]);
if( log_this) log_key_val_group("request", request, 1, true);
/*}}}*/
    activated = state;
    /* [taxo_pods_init] .. [add_listeners] {{{*/
    if( activated )
    {
        let div_tools = get_div_tools();
        if(!div_tools ) taxo_content.taxo_pods_init( request );
    }
    /*}}}*/
    /* display [shadow_host] {{{*/
    let shadow_host = get_shadow_host();
    if( shadow_host )
    {
        if( activated )
        {
            shadow_host.style.display = "block";

            taxo_pods.buttons_fontSize = (2 * taxo_pods.BUTTONS_FONT_SIZE_MIN)+"px";

            taxo_pods.set_multiple_choice_state();

            xpath_tools.div_activity_apply();
        }
        else {
            shadow_host.style.display = "none";
        }
    }
    /*}}}*/

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
        add_message_listener();
        chrome.runtime.sendMessage({ activated : "undefined" }, read_response);
    }
    /* 2/2 [EMBEDDED] .. [AUTO-ACTIVATE] */
    else {
        setTimeout(function() { taxo_msg .set_activated({ activated: true }); },   0);
//      setTimeout(function() { taxo_pods.show_visible_menu();                }, 500);
    }
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EXPORT ................................................... [taxo_msg] │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
return { name : "taxo_msg"
    ,    is_activated
    ,    set_activated
    ,    send_report_message
    ,    query_active_state
};
/*}}}*/
}());
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ EXPORT .................................................... [taxo_content]│
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
return { SHADOW_HOST_ID

    ,    get_div_tools
    ,    get_used_shadow_host_id       : () => lib_tools.get_used_shadow_host_id(SHADOW_HOST_ID)
    ,    on_activated_load_options

    ,    taxo_pods_init                : taxo_pods.taxo_pods_init
    ,    load_taxo_id_array            : taxo_pods.load_taxo_id_array
    ,    unload_taxo_id_array_all      : taxo_pods.unload_taxo_id_array_all

    ,    set_activated                 : taxo_msg.set_activated


    ,    layout_cluster                : taxo_pods.layout_cluster

    ,    show_top_menu                 : taxo_pods.show_top_menu
    ,    hide_taxo_menu                : taxo_pods.undisplay_menu_EL_all

    // EVENT
    ,    div_tools_onDown              : taxo_pods.div_tools_onDown
    ,    div_tools_onKey               : taxo_pods.div_tools_onKey
    ,    div_tools_onMove              : taxo_pods.div_tools_onMove
    ,    div_tools_onOrientationchange : taxo_pods.div_tools_onOrientationchange
    ,    div_tools_onResize            : taxo_pods.div_tools_onResize
    ,    div_tools_onUp                : taxo_pods.div_tools_onUp
    ,    get_menu_EL_parent_array      : taxo_pods.get_menu_EL_parent_array
    ,    div_tools_beforeunload        : taxo_pods.div_tools_beforeunload

    // DEBUG {{{
    , load_taxo_sync_visited           : () => taxo_pods.load_taxo_sync_visited(true)
    , status                           : () => taxo_pods.load_taxo_sync_visited(true)
    , check                            : taxo_menu.check_taxo_json
    , get_shadow_root
    , activate                         : taxo_msg.set_activated
    , log_taxo_id                      : taxo_menu.log_taxo_id
    , iterate                  :   () => taxo_menu.iterate(taxo_json,0)
    , load_div_tools_xy                : taxo_pods.load_div_tools_xy
    , get_node_with_taxo_id    : (id) => taxo_menu.get_node_with_taxo_id_from_node(id, taxo_json)
//  , get_node_path_of_taxo_id : (id) => taxo_menu.get_node_path_of_taxo_id       (id)
    , get_node_path_of_taxo_id         : taxo_menu.get_node_path_of_taxo_id
    , get_menu_EL_id_path_array        : taxo_menu.get_menu_EL_id_path_array
    , sel_clear                        : taxo_menu.sel_clear

    , show_taxo_id                     : taxo_pods.show_taxo_id
    , show_sub_menu_for_taxo_id        : taxo_pods.show_sub_menu_for_taxo_id
    , get_taxo_id_path                 : taxo_menu.get_taxo_id_path
    , get_selected_taxo_id_path_array  : taxo_pods.get_selected_taxo_id_path_array
    , get_collected_taxo_id_path_array : taxo_pods.get_collected_taxo_id_path_array

    , set_multiple_choice_state        : taxo_pods.set_multiple_choice_state

    , div_tools_move_RESCALE           : taxo_pods.div_tools_move_RESCALE

    ,  get_menu_EL_for_taxo_id         : taxo_menu.get_menu_EL_for_taxo_id
    ,  adjust_pods_maxHeight           : taxo_pods.adjust_pods_maxHeight

    ,  unclick_under_parent_EL         : taxo_pods.unclick_under_parent_EL
    ,  uncollect_menu_EL_all           : taxo_pods.uncollect_menu_EL_all
    ,  undisplay_menu_EL               : taxo_pods.undisplay_menu_EL
    ,  unselect_menu_EL_all            : taxo_pods.unselect_menu_EL_all
    ,  unselect_menu_id                : taxo_pods.unselect_menu_id
    ,  unselect_under_menu_EL          : taxo_pods.unselect_under_menu_EL
    ,  sync_taxo_clear_button          : taxo_pods.sync_taxo_clear_button

    ,  set_taxo_id_path_CSS            : taxo_pods.set_taxo_id_path_CSS
    ,  dodisplay_menu_EL_id_path_array : taxo_pods.dodisplay_menu_EL_id_path_array

    ,  click_taxo_id_array             : taxo_pods.click_taxo_id_array
    //}}}
};
/*}}}*/
})();

taxo_content.taxo_pods_init();

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ NOTE .....................................................................│
// └───────────────────────────────────────────────────────────────────────────┘
/* NOTE: DATA JSON //{{{
 *
 *   taxonomie.json:
 *
 *    entry = { id title description list[] }
 *     list = [ entry ]
 *
 *///}}}
/* DOC {{{
[scroll]
    :!start explorer "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo"
    :!start explorer "https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions"

}}}*/
/* FILES {{{

    xpath_embedded.html

    javascript/taxo_content.js
    javascript/taxo_tools.js
    stylesheet/taxo_tools.css

    /CSS
    javascript/xpath_content.js
    javascript/xpath_tools.js
    stylesheet/xpath_tools.css

    javascript/event_listeners.js

    manifest.json
    javascript/xpath_background.js
    javascript/taxo_json_201118.js
    javascript/taxo_json_211218.js


}}}*/
/* BY LEVEL SAMPLE {{{

    javascript/taxo_json_211211.js

    taxo_content.get_node_with_taxo_id(           "RING_MEN"       );
    taxo_content.get_node_with_taxo_id(         "BATHING_SUIT_MEN" );
    taxo_content.get_node_with_taxo_id(       "BATHING_SUIT"       );
    taxo_content.get_node_with_taxo_id(     "BRAND"                );
    taxo_content.get_node_with_taxo_id(   "OTHER"                  );
    taxo_content.get_node_with_taxo_id( "ALL"                      );

    taxo_content.get_node_path_of_taxo_id( "ELECTRICITY"   );
    taxo_content.get_node_path_of_taxo_id( "HOME_AUDIO"    );
    taxo_content.get_node_path_of_taxo_id( "HOME_SERVICES" );
    taxo_content.get_node_path_of_taxo_id( "TABLE"         );

}}}*/
/*
TODO:
/\<maxHeight *=
/adjust_pods_maxHeight_handler
/Math.min

taxo_content.dodisplay_menu_EL_id_path_array( taxo_content.get_menu_EL_id_path_array( $0 ) );
   , "ALL.HOME.ELECTRICITY.HOUSEHOLD_APPLIANCES"

taxo_content.get_node_path_of_taxo_id( "BRAND"                );
taxo_content.get_node_path_of_taxo_id( "CAR_CARE"             );
taxo_content.get_node_path_of_taxo_id( "EV_CARS"              );
taxo_content.get_node_path_of_taxo_id( "FLORRINGS"            );
taxo_content.get_node_path_of_taxo_id( "GDPR"                 );
taxo_content.get_node_path_of_taxo_id( "HOUSEHOLD_APPLIANCES" );
taxo_content.get_node_path_of_taxo_id( "OIL_CARS"             );
taxo_content.get_node_path_of_taxo_id( "OIL_TRUCKS"           );
taxo_content.get_node_path_of_taxo_id( "OTHER"                );
taxo_content.get_node_path_of_taxo_id( "RETAILER"             );

taxo_content.dodisplay_menu_EL_id_path_array( "menu_ALL,menu_FASHION".split(",") );


*/
