// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [xpath_content] ................................ EXTENSION CONTENT SCRIPT │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* globals lib_log, lib_popup */
/* globals xpath_tools */
/* globals chrome */
/* globals console, window, document */
/* globals setTimeout, clearTimeout */
/* globals lib_util */
/* globals lib_tools */

/* globals config_js */
/* globals embedded */

/* globals event_listeners */ /* eslint-disable-line no-unused-vars */
/* globals taxo_content */
/* globals xpath_outline */
/* globals xpath_js */
/* globals simulate_send_message */

/* exported XPATH_CONTENT_SCRIPT_TAG */

/* eslint-disable no-warning-comments */

const XPATH_CONTENT_SCRIPT_ID       = "xpath_content";
const XPATH_CONTENT_SCRIPT_TAG      =  XPATH_CONTENT_SCRIPT_ID  +" (220119:19h:08)";
/*}}}*/
let   xpath_content = (function() {
"use strict";



const SHADOW_HOST_ID = "shadow_host"; // javascript/xpath_tools.js
const   DIV_TOOLS_ID =   "div_tools";

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ LOG .. [console] .. [objects] ....................................... │
    // └───────────────────────────────────────────────────────────────────────┘
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
/*_ div_tools_require_lib_log {{{*/
let div_tools_require_lib_log = function()
{

    /* eslint-disable no-unused-vars */
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

    /* eslint-enable  no-unused-vars */
};
/*}}}*/
div_tools_require_lib_log();
/* eslint-enable  no-unused-vars */
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ TOOLS .. [shadow_host] [shadow_root] ................................ │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
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

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ LOAD ...................................... javascript/xpath_tools.js │
    // └───────────────────────────────────────────────────────────────────────┘
/*➔ div_tools_init .. (listeners) {{{*/
/*{{{*/
const DIV_TOOLS_XY                = { x: 32 , y: 32 };
const CAPTURE_TRUE_PASSIVE_FALSE  = {capture:true, passive:false};

/*}}}*/
let div_tools_init = function(request={})
{

/*{{{*/
let   caller = XPATH_CONTENT_SCRIPT_ID+".div_tools_init";
let log_this = options.LOG1_STEP  || options.LOG5_DIV_TOOLS;

if(options.LOG1_EVENT) logBIG(XPATH_CONTENT_SCRIPT_ID+" ➔ "+caller, 1);
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
        console.warn("...already called once"); console.trace();
        return;
    }
    /*}}}*/
    /* EMBEDDED {{{*/
    let is_embedded = lib_log.is_embedded( XPATH_CONTENT_SCRIPT_ID   );
    if( is_embedded )
    {
if(log_this) lib_popup.log_popup(is_embedded ? "RUNNING ENBEDDED SCRIPT" : "RUNNING BROWSER EXTENSION");

        /* LOAD OPTIONS FROM localStorage */
        on_activated_load_options( request );

        set_use_lib_shadow_root( options.use_lib_shadow_root );
    }
    /*}}}*/
    /* ACTIVATED {{{*/
    else if(!request.activated)
    {
if(log_this) log("%c GET ACTIVATED STATE FROM BACKGROUND SCRIPT", lbH+lf9);
if(options.LOG3_SERVER) log_query_step("EXTENSION", caller);

        query_active_state();
        return;
    }
    /*}}}*/
    /* INJECT DIV_TOOLS HTML {{{*/

if(options.LOG1_EVENT) logBIG(XPATH_CONTENT_SCRIPT_ID+" ➔ ADDING DIV_TOOLS HTML", 1);

    xpath_tools.inject_shadow_root(log_this);
    div_tools = get_div_tools();
if(options.LOG1_EVENT) logBIG("...div_tools=["+lib_util.get_id_or_tag(div_tools)+"]", 1);

//  /* [log_popup_div] [div_mask] into [shadow_host] {{{*/
//  let log_popup_div = lib_popup.log_popup_div_get();
//  let div_mask      = lib_popup.div_mask_get();

//  let shadow_host   = document.getElementById( get_used_shadow_host_id() );
//  shadow_host.appendChild( log_popup_div );
//  shadow_host.appendChild( div_mask      );
//  /*}}}*/


    lib_util.add_el_class(div_tools, XPATH_CONTENT_SCRIPT_ID);
    /*}}}*/
    /* [xpath_tools_xy] {{{*/
    let xy = ( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) ) ? lib_util.localStorage_getItem("xpath_tools_xy")
        :    (request && request.     xpath_tools_xy          ) ?                      request.xpath_tools_xy
        :    "" ;
//console.log(               "xy=["+xy+"]")
    if(!xy)   xy  = { x:12 , y:12 };
    if(typeof xy == "string") xy = JSON.parse( xy );
//console.log("xpath_tools_xy=["+xy.x+" , "+xy.y+"]")

    load_div_tools_xy( xy );
    /*}}}*/

//  let docked = true;
//  xpath_outline.div_xpaths_sync_GUI( docked );
//  div_tools_move_EL_XY(div_tools);
    div_tools_confine_to_viewport();

    lib_util.add_el_class(div_tools,"movable");
    /* [EMBEDDED ➔ set_activated] .. (EXTENSION ➔ BACKGROUND-SCRIPT ➔ set_activated) {{{*/
    if( is_embedded )
    {
//console.log(caller+": EMBEDDED")

if(options.LOG3_SERVER) log_query_step("EMBEDDED", caller);

        setTimeout(function() { set_activated({ activated: true }); }, 0);
    }
    /*}}}*/
    /* ADD EVENT LISTENERS {{{*/
//  @see javascript/event_listeners.js


    /*}}}*/
    /* ACTIVE STATE QUERY {{{*/
    if( !is_activated )
    {
        let shadow_host = document.getElementById( get_used_shadow_host_id() );
        shadow_host.style.display = "none";

    }
    /*}}}*/
    xpath_outline.set_config( config );
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
    lib_util.add_el_class(div_tools,XPATH_CONTENT_SCRIPT_ID);
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
if( log_this) log(XPATH_CONTENT_SCRIPT_ID+"."+caller+"("+_caller+")");

    let div_tools = get_div_tools();
    let        xy = { x: div_tools.offsetLeft , y: div_tools.offsetTop };
if( log_this) log("xy",xy);

    if( !xy.x && !xy.y) return;

    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        lib_util.localStorage_setItem("xpath_tools_xy", JSON.stringify(xy));
    }
    else {
        options.xpath_tools_xy = xy;
        send_message( { caller: _caller , options }, caller);
    }
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EVENT LISTENERS ..................................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ div_tools_add_onmove_listener {{{*/
/*{{{*/
let     moving_EL;

/*}}}*/
let div_tools_add_onmove_listener = function(el)
{
/*{{{*/
let   caller = "div_tools_add_onmove_listener";
let log_this = options.LOG6_MOVE_TOOL;

if(log_this) log("%c"+caller+"("+lib_util.get_id_or_tag(el)+")", lbH+lf4);
/*}}}*/
    /* GET - MOVE DATA {{{*/
    moving_EL          = el;
    moving_EL.onDown_X = moving_EL.offsetLeft;
    moving_EL.onDown_Y = moving_EL.offsetTop;

    lib_util.add_el_class(moving_EL, "pressed");
if(log_this) log("%c...moving_EL.onDown_XY=["+moving_EL.onDown_X+" "+moving_EL.onDown_Y+"]", lf3);
    /*}}}*/
    /* ADD - TOUCH MOVE LISTENER {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if(options.LOG1_EVENT) logBIG("➔ ADDING [touchmove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", 4);
//      moving_EL.addEventListener("touchmove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
        window   .addEventListener("touchmove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ADD - MOUSE MOVE LISTENER {{{*/
    else {
if(options.LOG1_EVENT) logBIG("➔ ADDING [mousemove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", 5);

        window   .addEventListener("mousemove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* DEL - SCROLL LISTENER {{{*/
if(log_this) log("%c...REMOVING [scroll]    LISTENER", lf8);

    window       .removeEventListener("scroll"   , div_tools_onScroll, CAPTURE_TRUE_PASSIVE_FALSE);

if(log_this) log_caller();
    /*}}}*/
};
/*}}}*/
/*_ div_tools_del_onmove_listener {{{*/
let div_tools_del_onmove_listener = function()
{
/*{{{*/
let   caller = "div_tools_del_onmove_listener";
let log_this = options.LOG6_MOVE_TOOL;


if(!moving_EL) return;
if(log_this) log("%c"+caller+"("+lib_util.get_id_or_tag(moving_EL)+")", lbH+lf4);

if(log_this) log("%c...moving_EL.offsetXY=["+moving_EL.offsetLeft+" "+moving_EL.offsetTop+"]", lf3);
/*}}}*/
    /* DEL - TOUCH MOVE LISTENER {{{*/
    let on_touch_device = ("ontouchstart" in document.documentElement);
    if( on_touch_device )
    {
if(log_this) log("%c...REMOVING [touchmove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lf8);
//      moving_EL.removeEventListener("touchmove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
        window   .removeEventListener("touchmove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* DEL - MOUSE MOVE LISTENER {{{*/
    else {
        if(log_this) log("%c...REMOVING [mousemove] LISTENER on ["+lib_util.get_id_or_tag(moving_EL)+"]", lbR+lf0);

        window   .removeEventListener("mousemove", div_tools_onMove  , CAPTURE_TRUE_PASSIVE_FALSE);
    }
    /*}}}*/
    /* ADD - SCROLL LISTENER {{{*/
if(options.LOG1_EVENT) logBIG("➔ ADDING [scroll]    LISTENER", 6);

    window.addEventListener   ("scroll"   , div_tools_onScroll, CAPTURE_TRUE_PASSIVE_FALSE);
    /*}}}*/
    /* CLR - MOVE DATA {{{*/
    delete moving_EL.onDown_X;
    delete moving_EL.onDown_Y;
    lib_util.del_el_class(moving_EL, "pressed");

    moving_EL = null;
    /*}}}*/
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EVENT HANDLERS .. [DOWN MOVE UP CLICK RESIZE KEY SCROLL] ............ │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/* DOWN */
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

if(options.LOG1_EVENT) logBIG(caller,6);
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
console.log("...div_tools:",div_tools );
console.dir(                div_tools );
console.log("....e_target:",e_target  );
console.log("....e_target.parentElement:",e_target.parentElement);
console.log("....e.path[0]:",e.path[0]);
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
if(options.LOG1_EVENT) logBIG("div_tools_onDown_moving_target",6);
/*{{{*/
let   caller = "div_tools_onDown_moving_target";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

let e_target = lib_util.get_event_target(e, log_this);
if( log_this) log(caller+": %c("+e.type+" ON "+lib_util.get_id_or_tag_and_className(e_target)+")", lf1);
//console.log("moving_target:", moving_target)
/*}}}*/
    /* [moving_target] {{{*/
    if(!moving_target) return null;

    /*}}}*/
    /* movable [moving_target] .. up from [e_target] {{{*/
    let is_a_tool = lib_util.is_el_child_of_id(e_target, moving_target.id);
    if(!is_a_tool )
    {
        let tool_name = lib_util.get_id_or_tag_and_className( e_target );

if( log_this) log("%c"+caller+"%c"+tool_name+"%c is "+(is_a_tool ? "a":"not a")+" child of %c"+moving_target
                  ,lbL+lf3    ,lbC           ,lbC+lfX[ is_a_tool ? 5:8]                   ,lbR+lf3          );

        return null;
    }
    /*}}}*/
//  div_tools_onDown_adjust_transformOrigin(e, moving_target);
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
/* RESIZE */
/*_ div_tools_onResize {{{*/
let div_tools_onResize = function(e) /* eslint-disable-line no-unused-vars */
{
    div_tools_confine_to_viewport();
};
/*}}}*/
/* ORIENTATION */
/*_ div_tools_onOrientationchange {{{*/
let div_tools_onOrientationchange = function(e) /* eslint-disable-line no-unused-vars */
{
    div_tools_confine_to_viewport();
};
/*}}}*/
/* MOVE */
/*{{{*/
const BUTTONS_FONT_SIZE                   = 64; /* eslint-disable-line no-unused-vars */
const BUTTONS_FONT_SIZE_MIN               =  6;
let   buttons_fontSize                    = BUTTONS_FONT_SIZE_MIN;

const DIV_TOOLS_CONFINE_TO_VIEWPORT_DELAY = 500;
const MOVE_MARGIN_D                       =  16;
const MOVE_MARGIN_L                       =   4;
const MOVE_MARGIN_R                       =  32;
const MOVE_MARGIN_U                       =   4;
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
        lib_util.add_el_class(moving_EL, "pressed");

        let e_target = lib_util.get_event_target(e);
if( log_this) logBIG(caller+": .. "+lib_util.get_id_or_tag(e_target)+" has_moved ");
    }
    /*}}}*/
    /* MOVE [moving_EL] {{{*/
    let x =              moving_EL.onDown_X + movement.dxy.x ;
    let y =              moving_EL.onDown_Y + movement.dxy.y ;

    div_tools_move_EL_XY(moving_EL, x, y);
    /*}}}*/
    /*  [taxo_layout_cluster] {{{*/
    call_taxo_layout_cluster( moving_EL );

    /*}}}*/
};
/*}}}*/
/*_ call_taxo_layout_cluster {{{*/
/* eslint-disable no-undef */
/*{{{*/
let taxo_layout_cluster;
let taxo_layout_cluster_timeout;

/*}}}*/
let call_taxo_layout_cluster = function(_moving_EL)
{
    if( taxo_layout_cluster == undefined)
        taxo_layout_cluster
            =  (typeof taxo_content != "undefined")
            ?          taxo_content.layout_cluster
            :                       null;

    if(taxo_layout_cluster == null) return;

    if( taxo_layout_cluster_timeout ) clearTimeout(      taxo_layout_cluster_timeout         );
    /**/taxo_layout_cluster_timeout =   setTimeout(() => taxo_layout_cluster({ moving_EL: _moving_EL }), 250);
};
/* eslint-ensable no-undef */
/*}}}*/
/*_ div_tools_move_EL_XY {{{*/
let div_tools_move_EL_XY = function(el, x,y)
{
    if(!el) return; // may happen when both extension an embedded are running
let caller = "div_tools_move_EL_XY"; // eslint-disable-line no-unused-vars
/*{{{
log(caller+"("+lib_util.get_id_or_tag(el)+") .. [position "+el.style.position+"] .. [xy "+x+" "+y+"]")
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
/*XXX*/
    /* APPLY URDL BORDER CAP .. f(docked state) {{{*/
    let docked = el.urdl.l/* && !el.urdl.r*/; /* Note: right folding defeats bordering condition when applied! */
    xpath_outline.div_xpaths_sync_GUI( docked );

    /*}}}*/
    /* RESCALE {{{*/



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
/* UP */
/*_ div_tools_onUp {{{*/
let div_tools_onUp = function(e) // eslint-disable-line no-unused-vars
{
if(e.altKey ) return;
if(e.ctrlKey) return;
/*{{{*/
let   caller = "XPATH ➔ div_tools_onUp";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

    let e_target = lib_util.get_event_target(e);
if( log_this) logBIG(caller+"("+e.type+" "+lib_util.get_id_or_tag(e_target)+")");
/*}}}*/
if(options.LOG1_EVENT) logBIG(caller, 6);

    if(e_target.id == "div_mask") return;

    let div_tools = get_div_tools();

    if(moving_EL) call_taxo_layout_cluster( div_tools ); /* i.e. some layout adjustement may have occured */

    moving_EL_onUp(e);

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
if(options.LOG1_EVENT) logBIG("moving_EL_onUp",6);
/*{{{*/
let   caller = "moving_EL_onUp";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

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
/*}}}*/
/* CLICK */
/*_ onClick_div_tools {{{*/
let onClick_div_tools = function(e) // eslint-disable-line complexity
{
if(options.LOG1_EVENT) logBIG("onClick_div_tools",6);

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ CLICK EVENT                                                            │
    //└────────────────────────────────────────────────────────────────────────┘
/*{{{*/
if(e.altKey) return;
let   caller = "onClick_div_tools";
let log_this = options.LOG5_DIV_TOOLS;




let e_target = lib_util.get_event_target(e);
if( log_this) log("%c"+caller+"( "+(e_target ? (e_target.id || e_target.nodeName) : "")+" )", lbb+lbH+lf6);
/*}}}*/
    /* e_target {{{*/
    if(!e_target.parentElement) return;

//console.log("e_target.parentElement:")
//console.dir( e_target.parentElement  )
    /*}}}*/
    /* has_moved .. (NOT A CLICK! .. KICK OFF ALL THOSE STUPID CLICK HANDLERS) {{{*/
    let movement = lib_util.set_onMove_XY(e);
if( log_this &&  movement.has_moved) log("%c...[has_moved "+  movement.has_moved +"]", lf6);
if( log_this && !movement.has_moved) log("%c...!has_moved .. onDown_EL.id=["+ (movement.onDown_EL ? movement.onDown_EL.id : "") +"]", lf6);

    if( movement.has_moved )
    {
        lib_util.cancel_event(e);
        return;
    }
    /*}}}*/


    //┌────────────────────────────────────────────────────────────────────────┐
    //│ CLICK TOOL                                                             │
    //└────────────────────────────────────────────────────────────────────────┘
    /* [div_reload  ] {{{*/
    if     (e_target.parentElement.id == "div_reload" )
    {
        let div_reload = lib_util.get_tool("div_reload");
        div_reload.classList.add("waiting_animation");

        document.location.reload();
    }
    /*}}}*/
    /* [div_magnify ] {{{*/
    else if(e_target.parentElement.id == "div_magnify")
    {
        let div_tools = get_div_tools();
        div_tools    .classList.toggle("magnify");
    }
    /*}}}*/
    /* [div_options ] .. [SHOW-HIDE] OR [log_toggle] {{{*/
    else if(        e_target.parentElement.id == "div_options" ) lib_util.get_tool("div_options").classList.toggle("hidden" );
    else if(lib_util.is_el_child_of_id(e_target, "div_options")) log_toggle(e);
    /*}}}*/
};
/*}}}*/
/* KEY */
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

//  div_tools_standby();
};
/*}}}*/
/* SCROLL */
/*_ div_tools_preventScrolling {{{*/
let div_tools_preventScrolling = function(_caller)
{
/*{{{*/
let   caller = "div_tools_preventScrolling";
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

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
            , lbH+lf9, true);

    log_key_val_group("documentElement OVERFLOW HIDDEN",
        { overflow     : document.documentElement.style.overflow
        , marginRight  : document.documentElement.style.marginRight
        , marginBottom : document.documentElement.style.marginBottom
        }, lf2, true);
}
/*}}}*/
};
/*}}}*/
/*_ div_tools_restoreScrolling {{{*/
let div_tools_restoreScrolling = function()
{
/*{{{*/
let   caller = "div_tools_restoreScrolling"; // eslint-disable-line no-unused-vars
let log_this = options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;

/*}}}*/
    /* NO SCROLLBAR TO HIDE {{{*/
//  let on_touch_device = ("ontouchstart" in document.documentElement);
//  if(!on_touch_device &&  lib_util.has_scrollbar(document.documentElement)) return;

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
        }, lf2, true);

    if(document.documentElement.scrolling_context)
        log_key_val_group("...document.documentElement.scrolling_context"
            , document.documentElement.scrolling_context
            , lbH+lf9, true);

}
/*}}}*/
};
/*}}}*/
/*_ div_tools_onScroll {{{*/
let div_tools_onScroll = function(e) // eslint-disable-line no-unused-vars
{
let log_this = options.LOG5_DIV_TOOLS;

if( log_this) logBIG("div_tools_onScroll");

    div_tools_del_onmove_listener();
};
/*}}}*/
/* UNLOAD */
/*_ div_tools_beforeunload {{{*/
let div_tools_beforeunload = function()
{
//  save_options_now("div_tools_beforeunload");
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ CONFIG [config.json] ................................. chrome.runtime │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
     let config = { "SERVER_URL"   : "SERVER_URL"
        ,          "TEXT_LEN_MAX" :  96

        ,          "CMD_DOMAINS"  : "domains"
        ,          "CMD_URLS"     : "urls"
        ,          "CMD_XPATHS"   : "xpaths"
        ,          "CMD_TAXONOMY" : "taxonomy"

        ,          "CMD_ADD"      : "add"
        ,          "CMD_DELETE"   : "delete"
        ,          "CMD_CONFIRM"  : "delete"

        ,       "ACTION_REPLACED" : "replaced"
    };

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ FOLD-UNFOLD                                                           │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ fold_div_innerHTML_title {{{*/
let fold_div_innerHTML_title = function(div,innerHTML,title="")
{
    div.classList.add   ("folded");

    let button             = div   .querySelector("BUTTON");
    let em                 = button.querySelector("EM"    );
    em.innerHTML_unfolded  = em.innerHTML;
    em.innerHTML           = innerHTML;
    em.title               = title;
};
/*}}}*/
/*_ unfold_div {{{*/
let unfold_div = function(div)
{
    div.classList.remove("folded");
    let button             = div        .querySelector("BUTTON");
    let em                 = button     .querySelector("EM"    );
    if( em.innerHTML_unfolded) {
        em.innerHTML = em.innerHTML_unfolded;
        delete         em.innerHTML_unfolded;
    }
};
/*}}}*/
/*_ is_div_folded {{{*/
let is_div_folded = function(div)
{
    let button         =  div        .querySelector("BUTTON");
    let em             =  button     .querySelector("EM"    );
    let result         = !!em.innerHTML_unfolded;

    return result;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ SELECT                                                                │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ sel_clear {{{*/
let sel_clear = function(_caller)
{
    let shadow_host = document.getElementById( get_used_shadow_host_id() );
    let from_parent = shadow_host.shadowRoot;
    let    siblings = unselect_from_parent( from_parent );

if(options.LOG2_MESSAGE) logBIG(_caller+" "+siblings.length+" SELECTION CLEARED");

    /*  taxo_clear.clear */
    let taxo_clear = from_parent.querySelector("#taxo_clear");
    if( taxo_clear ) {
        lib_util.add_el_class(taxo_clear, "cleared");

        setTimeout(function() { lib_util.del_el_class(taxo_clear, "cleared"); }, 300);
    }
};
/*}}}*/
/*_ unselect_from_parent {{{*/
let unselect_from_parent = function(from_parent)
{
/*{{{*/
let caller = "unselect_from_parent";
let log_this = options.LOG2_MESSAGE;

if(log_this) log(caller+"(from_parent "+(from_parent.id ? from_parent.id : from_parent.nodeName)+")");
/*}}}*/
    let siblings = from_parent.querySelectorAll("."+ CSS_SELECTED);
    if( siblings )
    {
        for(let i=0; i<siblings.length; ++i)
        {
            if(siblings[i].parentElement.id != "div_tools")
            {
if(log_this) log("....clearing ["+siblings[i].id+"]");

                lib_util.del_el_class(siblings[i], CSS_SELECTED);
            }
        }
    }
    return siblings;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ MESSAGE TO BACKGROUND-SCRIPT ........................................ │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*▲▲▲▲ get_domains {{{*/
let get_domains = function(e_target)
{
/*{{{*/
let caller = "get_domains";
let log_this = options.LOG2_MESSAGE;

if( log_this) logBIG(caller+": ["+e_target.parentElement.tagName+"] e_target=["+lib_util.get_id_or_tag(e_target)+"]", 1);
/*}}}*/
    /* CANCEL PENDING EVENT {{{*/
    //lib_util.cancel_event(e);
    xpath_outline.cancel_pending_event();

    /*}}}*/
    /* GET DOMAINS .. [get_button_clicked] {{{*/
    let div_urls    = lib_util.get_tool("div_urls");
    let get_button_clicked
        =  (e_target.tagName               == "BUTTON")
        || (e_target.parentElement.tagName == "BUTTON");

    /*}}}*/
    /* UNFOLD [div_domains] {{{*/
    let div_domains = lib_util.get_tool("div_domains");
    if(get_button_clicked && is_div_folded( div_domains ))
    {
        unfold_div( div_domains );

        return false;
    }
    /*}}}*/
    /* GET URLS .. [domain_clicked] {{{*/
    let domain_clicked;
    if(!get_button_clicked)
    {
        let div_domains_child = lib_util.get_e_target_tag_child_of(e_target, "LI", div_domains);
        if( div_domains_child ) {
            domain_clicked    = div_domains_child.innerText;
            fold_div_innerHTML_title(div_domains, domain_clicked);
        }
    }
    /*}}}*/
//console.log("...get_button_clicked=["+ get_button_clicked +"]")
//console.log(".......domain_clicked=["+ domain_clicked     +"]")

    if(domain_clicked)
    {
      //div_urls.setAttribute("data-xpath_outline", JSON.stringify(data_outline));
        div_urls.dataset.domain   = domain_clicked;

        if(div_urls.dataset.domain) div_urls.classList.remove("disabled");
        else                        div_urls.classList.add   ("disabled");
    }

    if( get_button_clicked ) query_domains(caller                );
    else                     query_urls   (caller, domain_clicked);

    return true;
};
/*}}}*/
/*▲▲▲▲ get_urls {{{*/
let get_urls = function(e_target)
{
/*{{{*/
let caller = "get_urls";
let log_this = options.LOG2_MESSAGE;

if( log_this) logBIG(caller+": ["+e_target.parentElement.tagName+"]", 1);
/*}}}*/
    /* CANCEL PENDING EVENT {{{*/
    //lib_util.cancel_event(e);
    xpath_outline.cancel_pending_event();

    /*}}}*/
    /* GET [domain] URLS .. [get_button_clicked] {{{*/
    let div_urls = lib_util.get_tool("div_urls");
    let   domain = div_urls.dataset.domain;
if( log_this) console.log("...domain=["+domain+"]");

    let get_button_clicked
        =  (e_target.tagName               == "BUTTON")
        || (e_target.parentElement.tagName == "BUTTON");

    let div_urls_child
        = lib_util.get_e_target_tag_child_of(e_target, "LI", div_urls);

    /*}}}*/
    /* UNFOLD [div_urls] {{{*/
    if(get_button_clicked && is_div_folded( div_urls ))
    {
        unfold_div( div_urls );

        return false;
    }
    /*}}}*/
    /* GET [url_clicked] XPATHS .. [li_clicked] {{{*/
    let url_clicked;
    if( get_button_clicked )
    {
        unfold_div( div_urls );
    }
    else
    {
        if( div_urls_child )
        {
            url_clicked       = div_urls_child.dataset.url;
if( log_this) log("url_clicked=["+url_clicked+"]");

            let path = lib_util.get_url_path(        url_clicked);
            fold_div_innerHTML_title(div_urls, path, url_clicked);
        }
    }
    /*}}}*/
//if( log_this) console.log("...get_button_clicked=["+ get_button_clicked +"]");
//if( log_this) console.log("...............domain=["+             domain +"]");
//if( log_this) console.log("..........url_clicked=["+        url_clicked +"]");

    /*  (when embedded .. alert browser extension feature) {{{*/
    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        log_feature(caller+" ➔ null effect when embedded", (url_clicked || domain));

        return false;
    }
    /*}}}*/

    /* [get_urls  ] ➔ CLICK ON SUMMARY {{{*/
    if( get_button_clicked )
    {
        query_urls(caller, domain);
    }
    /*}}}*/
    /* [xpaths] ➔ CLICK ON URL .. [change location] or [request URL xpaths] {{{*/
    else if(url_clicked)
    {
if( log_this) console.log("...url_clicked=["+  url_clicked+"]");

        if(document.location.href   != url_clicked)
        {
            let div_reload = lib_util.get_tool("div_reload");
            div_reload.classList.add("waiting_animation");

            options .location_href = url_clicked;
            document.location.href = url_clicked;
            return false;
        }

        query_xpaths  (caller, url_clicked);
    }
    /*}}}*/
    /*  BROWSER EXTENSION FEATURE {{{*/
    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        let info = domain || url_clicked;
        lib_popup.log_popup("BROWSER EXTENSION FEATURE:\n ➔ "+caller+"("+info+")");
    }
    /*}}}*/
    return true;
};
/*}}}*/
/*▲▲▲▲ send_xpath_cmd .. chrome.runtime.sendMessage {{{*/
/*{{{*/
const CSS_SELECTED      = "selected";
//nst TEXT_LEN_MAX      = 128;

//t send_xpath_log_popup_called_once;
/*}}}*/
let send_xpath_cmd = function(xpath, cmd, action)
{
/*{{{*/
let caller = "send_xpath_cmd";
let log_this = options.LOG2_MESSAGE;

/*}}}*/
    /* SEND SELECTED XPATH TO BROWSER EXTENXION BACKGROUND SCRIPT {{{*/
    if(!xpath) xpath = ".*";

if(log_this) log(caller+": %c"+cmd+"%c"+xpath, lbL+lf5, lbR+lf4);
//console.trace()

if(options.LOG3_SERVER) log_query_step(action+" ➔ ", cmd+" ["+xpath+"]");

    let node       = xpath_js.get_nodeXPath_target( xpath );
//console.log("node=["+lib_util.get_id_or_tag(node)+"]")

    let info       = node ? (node.innerText || node.src || node.href) : "";
    let text       = lib_util.ellipsis(info, config.TEXT_LEN_MAX);
    let url        = document.location.href;

    /*  BROWSER EXTENSION FEATURE {{{*/
    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
//      if( !send_xpath_log_popup_called_once ) {
//          lib_popup.log_popup("BROWSER EXTENSION FEATURE:\n ➔ "+caller+"("+xpath+")");
//          send_xpath_log_popup_called_once = true;
//      }
        simulate_send_message_args({ cmd, xpath, text, url }, caller);
    }
    /*}}}*/
    /* FORWARD SELECTION TO BROWSER EXTENSION BACKGROUND SCRIPT */
    else {

        send_message({ cmd, xpath, text, url }, caller);
    }
    /*}}}*/
    /* added xpath domain not yet registered .. should be inserted server-side ➔ calling query_domains {{{*/
    if(    (cmd == config.CMD_ADD)
        && !is_location_domain_registered()
        && !lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID)
      ) {
            query_domains( caller  );
    }
    /*}}}*/
    return true;
};
/*}}}*/
/*_ is_location_domain_registered {{{*/
let is_location_domain_registered = function()
{
    let location_url    = document.location.href;
    let location_domain = lib_util.get_url_domain( location_url );

    for(let i=0; i<domain_array.length; ++i)
    {
        if(domain_array[i] == location_domain)
            return true;
    }
if(options.LOG3_SERVER) log_query_step("PAGE DOMAIN NOT YET REGISTERED", " ["+location_domain+"]");
    return false;
};
/*}}}*/
/*▲▲▲▲ send_message {{{*/
/*{{{*/
let cannot_send_cmd_warned_once;

/*}}}*/
let send_message = function(message_object, _caller) // eslint-disable-line no-unused-vars
{
/*{{{*/
let caller = "send_message";
let log_this = options.LOG2_MESSAGE;

let  title = (message_object.cmd || _caller);
if( log_this) log("%c send_message %c"+title, lbb+lbL+lf4, lbb+lbR+lf7);
/*}}}*/
    /* EMBEDDED {{{*/
    let is_embedded = lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID);
    if( is_embedded ) {
        if(!cannot_send_cmd_warned_once)
        {
            log_feature(caller
                        ,  "➔ Cannot send cmd=["+ message_object.cmd   +"]\n"
                         + "… ["                + message_object.xpath +"]");

            log_caller();

            cannot_send_cmd_warned_once = true;
        }
        return false;
    }
    /*}}}*/
    try {
        chrome.runtime.sendMessage(message_object , function(response) { read_response(response||{}, message_object); });
    }
    catch(ex) {
        log("%c"+XPATH_CONTENT_SCRIPT_ID+"."+title+"%c CANNOT SEND MESSAGE TO BACKGROUND SCRIPT:\n"+ex, lbL+lf3, lbR+lf2);
        log_caller();
    }
    return true; // async response expected
};
/*}}}*/
/*_ log_query_step {{{*/
/*{{{*/
let query_step_num = 0;

/*}}}*/
let log_query_step = function(action,param)
{
    query_step_num += 1;
    let        lfx  = lfX[query_step_num % 10];
    log("%c "+query_step_num+" %c "+action+"%c"+param, lbb+lbH+lfx, lbb+lbH+lfx, lbb+lbH+lf9);
};
/*}}}*/
/*_ query_domains {{{*/
let query_domains = function(_caller        )
{
/*{{{*/
let caller = "query_domains";
//logBIG(caller+"("+_caller+")")

/*}}}*/

    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        simulate_send_message_args({ cmd: config.CMD_DOMAINS },  caller);
    }
    else {
        send_message(              { cmd: config.CMD_DOMAINS }, _caller);
    }
};
/*}}}*/
/*_ query_urls {{{*/
let query_urls    = function(_caller, domain)
{
/*{{{*/
let caller = "query_urls";
//logBIG(caller+"("+_caller+")")

/*}}}*/

    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        simulate_send_message_args({ cmd: config.CMD_URLS, domain },  caller);
    }
    else {
        send_message(              { cmd: config.CMD_URLS, domain }, _caller);
    }
};
/*}}}*/
/*_ query_xpaths {{{*/
let query_xpaths    = function(_caller, url)
{
/*{{{*/
let caller = "query_xpaths";
//logBIG(caller+"("+_caller+")")

/*}}}*/

    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        simulate_send_message_args({ cmd: config.CMD_XPATHS , url },  caller);
    }
    else {
        send_message(              { cmd: config.CMD_XPATHS , url }, _caller);
    }
};
/*}}}*/
/*_ query_taxonomy {{{*/
let query_taxonomy    = function(_caller, url)
{
/*{{{*/
let caller = "query_taxonomy";
//logBIG(caller+"("+_caller+")")

/*}}}*/

    if( lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        simulate_send_message_args({ cmd: config.CMD_TAXONOMY , url },  caller);
    }
    else {
        send_message(              { cmd: config.CMD_TAXONOMY , url }, _caller);
    }
};
/*}}}*/
/*_ simulate_send_message_args {{{*/
let simulate_send_message_args = function(args,_caller)
{
    if(typeof                             simulate_send_message != "undefined") {
        setTimeout( function() {          simulate_send_message(args, _caller); }, 250);
    }
    if(typeof                    embedded.simulate_send_message != "undefined") {
        setTimeout( function() { embedded.simulate_send_message(args, _caller); }, 250);
    }
    else {
        log_feature(_caller, "&#x26A0; EXTENSION MESSAGING IS OFF"
                    +"\n… Cannot send cmd=["+ args.cmd +"]"
                    +"\n… [embedded.simulate_send_message]"
                    +"\n… function is undefined"
                   );

        lib_log.log_caller();
    }
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ MESSAGE FROM BACKGROUND-SCRIPT [activated] ........... chrome.runtime │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ add_message_listener {{{*/
let add_message_listener = function()
{
let log_this = options.LOG1_STEP || options.LOG2_MESSAGE;

    try {
        chrome.runtime.onMessage.addListener( onMessage_listener );
if( log_this) log("%c LISTENING TO MESSAGE FROM BACKGROUND SCRIPT...", lbH+lf5);
    }
    catch(ex) {
        log("%c"+XPATH_CONTENT_SCRIPT_ID+": CANNOT LISTEN TO MESSAGE FROM BACKGROUND SCRIPT:\n"+ex, lbH+lf2);
    }
};
/*}}}*/
/*_ onMessage_listener {{{*/
let onMessage_listener = function(request, sender, sendResponse) // eslint-disable-line no-unused-vars
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

    let activated = is_activated();
if(options.LOG1_STEP) log("%c➔ Extension %c activated "+activated+" %c .. "+XPATH_CONTENT_SCRIPT_TAG+" ", "color:#AFA", "background-color:"+(request.activated ? "#0A0" : "#00A"), "background-color: black;");

    on_activated_load_options( request );

    // ┌───────────────────────────────────────────────────────────────┐
    // │ ACTIVATED [div_tools] .. [request.options]                    │
    // └───────────────────────────────────────────────────────────────┘
    /*{{{*/
    if(activated != request.activated)
    {
        let div_tools = get_div_tools();
        if(!div_tools) div_tools_init( request );
    }
    else {
        xpath_tools.update_div_tools_innerHTML(request);
    }
    /*}}}*/
    // ┌───────────────────────────────────────────────────────────────┐
    // │ CONFIG  FROM BACKGROUND-SCRIPT                                │
    // └───────────────────────────────────────────────────────────────┘
    //{{{
    if( request.  SERVER_URL ) config.  SERVER_URL = request  .SERVER_URL;
    if( request.TEXT_LEN_MAX ) config.TEXT_LEN_MAX = request.TEXT_LEN_MAX;

    // UI
    let div_domains = lib_util.get_tool("div_domains");
    if( div_domains )
    {
        let config_txt = ""
            +"  SERVER_URL\n … "+ config.  SERVER_URL +"\n"
            +"TEXT_LEN_MAX\n … "+ config.TEXT_LEN_MAX +"\n";

        div_domains.title = config_txt;
    }
    //}}}
    // ┌───────────────────────────────────────────────────────────────┐
    // │ ACTIVATED ON-OFF                                              │
    // └───────────────────────────────────────────────────────────────┘
    //{{{
//  if(!request.activated && request.is_active_tab) // save active tab options
//      save_options_now(caller, sendResponse);

    if(     activated != request.activated)
        set_activated(   request );

    //}}}
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ [activated] ......................................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ is_activated {{{*/
let    activated = false;
let is_activated = function()
{
    return activated;
};
/*}}}*/
/*_ set_activated {{{*/
let set_activated = function(request)
{
/*{{{*/
let   caller = XPATH_CONTENT_SCRIPT_ID+" ➔ set_activated";
let log_this = options.LOG1_STEP || options.LOG2_MESSAGE;

    let state
        = (request.activated == undefined) /* SET OR TOGGLE */
        ?         !activated
        :  request.activated;

if(log_this)
    log("%c "+caller+" %c FROM "+activated     +" %c TO "+ state
        ,lbL+lf8      ,lbC+lfX[  activated ? 4:2],lbR+lfX[ state ? 4:2]);
if(log_this) log_key_val("request", request, 8);
/*}}}*/
    activated = state;
    /* [div_tools_init] .. [event_listeners] .. [query_domains] {{{*/
    if( activated )
    {
        let div_tools = get_div_tools();
        if(!div_tools) {
            div_tools_init( request );
//          event_listeners.add_listeners(); // auto-loaded by javascript/event_listeners.js
        }
        query_domains( caller  );
    }
    /*}}}*/
    /* display [shadow_host] {{{*/
    let shadow_host = document.getElementById( get_used_shadow_host_id() );
    if( shadow_host )
    {
        if( activated )
        {
            shadow_host.style.display = "block";

            div_tools_confine_to_viewport();
        }
        else {
            shadow_host.style.display = "none";
        }
    }
    /*}}}*/
    /* PAGE CLEAR HILIGHTED TARGETS  {{{*/
    if(!activated)
        xpath_outline.outline_clear_all(caller+"("+JSON.stringify(request)+")");

    /*}}}*/
};
/*}}}*/
/*_ query_active_state {{{*/
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
        setTimeout(function() {            set_activated({ activated: true }); },   0);

    }
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ RESPONSE FROM BACKGROUND-SCRIPT ..................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*▼▼▼▼ read_response {{{*/
let read_response = function(response,message_object) // eslint-disable-line complexity
{
/*{{{*/
let caller = XPATH_CONTENT_SCRIPT_ID+".read_response";
let log_this = options.LOG2_MESSAGE;

let details
    = response.cmd        ? response.cmd
    : response.SERVER_URL ? "SERVER_URL "+response.SERVER_URL
    : "";

if(log_this) log_sep_top(caller+" ["+details+"]", 6);
if(log_this) logBIG(caller+": RECEIVING ANSWER FROM BACKGROUND SCRIPT:", 4);
    if(!response)
    {
if(log_this) logBIG("NO RESPONSE", 2);

        return;
    }
if(log_this) log_key_val("response", response);
/*}}}*/
    if(JSON.stringify( response ).indexOf("onerror") >= 0)
    {
        lib_popup.log_popup_warn(caller+" ERROR\n\n"+ lib_log.log_object_JSON( response ));

    }
    /* response.clear {{{*/
    else if(typeof response.clear     != "undefined")
    {
        sel_clear("response.clear "+response.clear);
    }
/*}}}*/
    /* response.activated {{{*/
    if(   (typeof       response.activated != "undefined")
       && (activated != response.activated))
    {
        onMessage_activated( response );
    }
    /*}}}*/
    /* HANDLE [response] {{{*/
    else if(response.cmd)
    {
        switch(response.cmd)
        {
        case config.CMD_DOMAINS : get_domains_handler (response.domains                     );                   break;
        case config.CMD_URLS    : get_urls_handler    (response.urls                        );                   break;
        case config.CMD_TAXONOMY: get_taxonomy_handler(response.selected, response.collected);                   break;
        case config.CMD_XPATHS  : get_xpaths_handler  (response.xpaths                      );                   break;
        case config.CMD_ADD     : xpath_outline.add_or_delete_server_response_handler(response, message_object); break;
        case config.CMD_DELETE  : xpath_outline.add_or_delete_server_response_handler(response, message_object); break;
        default:
lib_log.log("%c"+caller+"%c cmd=["+response.cmd+"]", lbL,lbR);
        }

        /* SYNC GUI LAYOUT */
        xpath_tools.div_tools_layout_cmd( response.cmd );
    }
    /*}}}*/
if(log_this) log_key_val_group("options", options, 8, true);
if(log_this) log_sep_bot(caller, 6);
};
/*}}}*/
    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ RESPONSE DOMAINS .. NEXTSTEP ➔ QUERY URLS ........................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
let domain_array = [];

/*}}}*/
/*_ get_domains_handler {{{*/
let get_domains_handler = function(domains)
{
/*{{{*/
let caller = "get_domains_handler";
let log_this = options.LOG2_MESSAGE;

if( log_this) lib_log.logBIG(caller+": domains x"+domains.length);
//console.table(domains)
/*}}}*/
    /* GET DOMAINS GUI {{{*/
    let div_domains = lib_util.get_tool("div_domains");
    let div_urls    = lib_util.get_tool("div_urls"   );

    /*}}}*/
    /* CURRENT PAGE DOMAIN {{{*/
    let location_url    = document.location.href;
    let location_domain = lib_util.get_url_domain( location_url );
    let location_domain_is_registered
        = get_domains_add_domains( domains );

    /*}}}*/
    /* NEXTSTEP  ENABLE .. QUERY URLS .. f(current page domain) {{{*/
    if( location_domain_is_registered || lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID))
    {
if(options.LOG3_SERVER) log_query_step("ATTACHING DOMAIN", "TO ["+location_domain+"]");
        div_urls.dataset.domain = location_domain;

        fold_div_innerHTML_title(div_domains, location_domain);
    }
    else {
        unfold_div( div_domains );
    }

if(options.LOG3_SERVER) log_query_step("NEXTSTEP ENABLE", "QUERY URLS");
    if( div_urls.dataset.domain) div_urls.classList.remove("disabled");
    else                         div_urls.classList.add   ("disabled");

    /*}}}*/
    /* NEXTSTEP TRIGGER .. QUERY URLS .. f(PAGE DOMAIN IS REGISTERED) {{{*/
//console.log("location_domain_is_registered=["+location_domain_is_registered+"]")
    if( location_domain_is_registered || lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID))
    {
if(options.LOG3_SERVER) log_query_step("CALLING query_urls", "ON ["+location_domain+"]");

        query_urls(caller, location_domain);
    }
    /*}}}*/
};
/*}}}*/
/*_ get_domains_add_domains {{{*/
let get_domains_add_domains = function(response_domains)
{
/*{{{*/
let caller = "get_domains_add_domains";
let log_this = options.LOG2_MESSAGE;

if( log_this) log(caller+": domains x"+response_domains.length);
/*}}}*/
    /* GUI [domains_OL] {{{*/
    let div_domains = lib_util.get_tool("div_domains");
    let domains_OL  = div_domains.getElementsByTagName("OL")[0];
    if(!domains_OL) {
        domains_OL  = document.createElement("OL");
        div_domains.appendChild( domains_OL );
    }
    /*}}}*/
    /* PUSH [response_domains] INTO [domain_array] {{{*/

    let location_domain_is_registered = false;
    let location_url    = document.location.href;
    let location_domain = lib_util.get_url_domain( location_url );
//console.log("LOCATION: domain=["+location_domain+"] .. url=["+location_url+"]")

    for(let i= 0; i < response_domains.length; ++i)
    {
        let domain  = response_domains[i].trim();
        if(!domain  ) continue;
        if( domain == location_domain)
            location_domain_is_registered = true;

        if( domain_array.includes( domain ) )
            domains_OL.classList.add("lit");
        else
            domain_array.push( domain );
    }

    domain_array = domain_array.sort();
    /*}}}*/
    /* GUI UPDATE {{{*/

    let innerHTML   = "";

    for(let i= 0; i < domain_array.length; ++i)
        innerHTML  += "<li><em>"+domain_array[i]+"</em></li>\n";

    domains_OL
        .innerHTML  = innerHTML;

    /*}}}*/
    return location_domain_is_registered;
};
/*}}}*/
    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ RESPONSE    URLS .. NEXTSTEP ➔ QUERY XPATHS ......................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ get_urls_handler {{{*/
let get_urls_handler = function(urls)
{
/*{{{*/
let caller = "get_urls_handler";
let log_this = options.LOG2_MESSAGE;

if( log_this) log_sep_top("LOADING "+urls.length+" URL ITEMS", 6);
//( log_this) lib_log.logBIG(caller+": URLS x"+urls.length);
//console.table(urls)
/*}}}*/
    /* CURRENT PAGE LOCATION .. f(urls) {{{*/
    let location_url_is_registered    = false;

    let location_url = decodeURIComponent( document.location.href );

    let location_domain = lib_util.get_url_domain( location_url );
//console.log("LOCATION: domain=["+location_domain+"] .. url=["+location_url+"]")

    /*}}}*/
    /* GUI URLS LIST {{{*/
    let div_urls    = lib_util.get_tool("div_urls");
    let urls_OL     = div_urls.getElementsByTagName("OL")[0];
    if(!urls_OL) {
        urls_OL     = document.createElement("OL");
        div_urls.appendChild( urls_OL );
    }

    /*}}}*/
    /* GUI URLS POPULATE {{{*/
    let innerHTML   = "";
    let url_labels  = [];
    let url_array   = urls.sort(function(a, b) { return a.path   - b.path; });
    for(let i= 0; i < url_array.length; ++i)
    {
        /* UNESCAPE URL */
        let url  = decodeURIComponent( url_array[i] );
        if(!url  ) continue;

        /* CHECK AGAINS CURRENT PAGE LOCATION */
        if( url == location_url) location_url_is_registered = true;

        /* FORMAT GUI URL LABEL */
        let                      url_label = lib_util.get_url_path(url);
        if( url_labels.includes( url_label )) continue;
        url_labels.push(         url_label  );

        /* SHOW GUI URL */
        innerHTML
            += "<li    title='"+ url        +"'"
            +      "data-url='"+ url        +"'>"
            +            "<em>"+ url_label +"</em></li>\n";

if(log_this)  log("%c "+lib_util.mPadStart(url_label,48)+" %c "+url, lbL, lbR);
    }
    urls_OL.innerHTML = innerHTML;
    /*}}}*/
    /* NEXTSTEP ENABLE .. QUERY XPATHS {{{*/
    if( location_url_is_registered || lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID))
    {
        if(div_urls.dataset.domain != location_domain)
        {
if(options.LOG3_SERVER) log_query_step("ATTACHING DOMAIN"," TO ["+location_domain+"]");

            div_urls.dataset.domain = location_domain;
        }

        let url_label = lib_util.get_url_path(location_url);

        fold_div_innerHTML_title(div_urls, url_label);
    }
    else {
        unfold_div( div_urls );
    }

if(options.LOG3_SERVER) log_query_step("NEXTSTEP  ENABLE", "QUERY XPATHS");
    if( div_urls.dataset.domain) div_urls.classList.remove("disabled");
    else                         div_urls.classList.add   ("disabled");

    /*}}}*/
    /* NEXTSTEP TRIGGER .. QUERY XPATHS .. f(PAGE URL IS REGISTERED) {{{*/
//console.log("location_url_is_registered=["+location_url_is_registered+"]")
    if( location_url_is_registered || lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID))
    {
        xpath_outline.data_num_xpath_load_array(); // START FROM SCRATCH

if(options.LOG3_SERVER) log_query_step("CALLING query_xpaths", "ON ["+location_url+"]");
        query_xpaths(caller, location_url);
    }
    /*}}}*/

if(log_this) log_sep_bot(caller, 6);
};
/*}}}*/
    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ RESPONSE  XPATHS .. NEXTSTEP ➔ [add..delete] XPATHS ................. │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ get_xpaths_handler {{{*/
let get_xpaths_handler = function(xpaths)
{
/*{{{*/
let caller = "get_xpaths_handler";
let log_this = options.LOG2_MESSAGE;

if( log_this) lib_log.logBIG(caller+": XPATHS x"+xpaths.length);
//console.table(xpaths)
/*}}}*/
    /* [div_reload] animation end {{{*/
    let div_reload = lib_util.get_tool("div_reload");
    div_reload.classList.remove("waiting_animation");

    /*}}}*/
    /* COLLECT XPATHS .. f(xpaths) {{{*/
    let data_num_xpath_array = [];

    let xpath_array = xpaths.sort();
    let num  = 0;
    for(let i= 0; i < xpath_array.length; ++i)
    {
        let xpath   = xpath_array[i].trim();
        if(!xpath   ) continue;

        num += 1;
        data_num_xpath_array.push({ num , xpath , from_server: true });
    }

//console.log("data_num_xpath_array:")
//console.dir( data_num_xpath_array  )
    /*}}}*/
    /* NEXTSTEP ENABLE XPATHS [add][delete] {{{*/
    xpath_outline.data_num_xpath_load_array( data_num_xpath_array );

    let location_url    = document.location.href;

if(options.LOG3_SERVER) log_query_step("CALLING query_taxonomy", "ON ["+location_url+"]");
    query_taxonomy(caller, location_url);
    /*}}}*/
};
/*}}}*/
    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ RESPONSE  TAXONOMY .. NEXTSTEP ➔ [select..collect] taxo_id .......... │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ get_taxonomy_handler {{{*/
let get_taxonomy_handler = function(selected,collected)
{
/*{{{*/
let caller = "get_taxonomy_handler";
let log_this = options.LOG2_MESSAGE;

if( log_this) lib_log.logBIG(caller+": [selected,collected]");
/*}}}*/
    /* COLLECT TAXONOMY [selected , collected] {{{*/

    if( !selected)  selected = [];
    if(!collected) collected = [];

if( log_this) log(".selected: ",  selected);
if( log_this) log("collected: ", collected);
    /*}}}*/
    /* NEXTSTEP ENABLE TAXONOMY [select / collect] {{{*/
    taxo_content.load_taxo_id_array(selected, collected);

    /*}}}*/
    /* [taxo_layout_cluster] {{{*/
    let div_tools = get_div_tools();
    if( get_use_lib_shadow_root() ) call_taxo_layout_cluster( div_tools );

    /*}}}*/
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ SCRIPT LOADED BY AN EXTENSION OR AN EMBEDDING PAGE .................. │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ check_script_loaded {{{*/
let check_script_loaded = function()
{
/* [is_embedded] {{{*/
    let is_embedded = lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID);
//if(options.LOG5_DIV_TOOLS)
    logBIG("LOADING "+(is_embedded ? "EMBEDDED" : "EXTENSION")+" "+XPATH_CONTENT_SCRIPT_ID, lbB+lbH+lfX[is_embedded ? 5:4]);

/*}}}*/
/* chrome or browser {{{
try {
console.log("chrome:" )
console.dir( chrome   )
} catch(ex) {}

try {
console.log("browser:")
console.dir( browser  )
} catch(ex) {}
}}}*/
    /* [script_loaded] {{{*/
    let this_script = document.getElementById( XPATH_CONTENT_SCRIPT_ID );

    let script_loaded = is_embedded && this_script;
    if( script_loaded && options.LOG5_DIV_TOOLS)
        log("➔ %c"+XPATH_CONTENT_SCRIPT_ID+"%c script has been loaded", lbb+lbL+lf5,lbb+lbR+lf5);

    return script_loaded;
    /*}}}*/
};
/*}}}*/
/*_ log_feature {{{*/
let log_feature = function(_caller, msg)
{
    lib_log.log("%c log_feature %c"+_caller+"%c"+msg, lbL, lbC+lf7, lbR+lf7);

    /* using an [async] call
     * to survive to a call to [lib_popup.log_popup_hide]
     * by the [calling thread] processing instructions
     */
    setTimeout(function() {
        lib_popup.log_popup_warn(  msg +"\n\n"
                               + "➔ this is a browser extension feature\n"
                               + "… which is not available\n"
                               + "… while running an enbedded script"
                              );
    }, 0);
};
/*}}}*/
/*➔ smooth_scroll_toggle_handler {{{*/
let smooth_scroll_toggle_handler = function(e_target)
{
/*{{{*/
let caller = "smooth_scroll_toggle_handler";
let log_this = options.LOG5_DIV_TOOLS;

if( log_this) logBIG(caller,1);
/*}}}*/

    /* GET INPUT CURRENT STATE */
    let       id = e_target.id;
    let selected = lib_util.has_el_class(e_target, CSS_SELECTED);

    /* TOGGLE */
    selected     = !selected;

    /* update GUI */
    xpath_outline.cancel_pending_event(  e_target);
    if( selected ) lib_util.add_el_class(e_target, CSS_SELECTED);
    else           lib_util.del_el_class(e_target, CSS_SELECTED);

    /* STORE state */
    set_option(id, selected);

    /* APPLY */
    document.documentElement.style.scrollBehavior = selected ? "smooth":"auto";
};
/*}}}*/
/*➔ shadow_root_toggle_handler {{{*/
let shadow_root_toggle_handler = function(e_target)
{
/*{{{*/
let caller = "shadow_root_toggle_handler";
let log_this = options.LOG5_DIV_TOOLS;

if( log_this) logBIG(caller,1);
/*}}}*/

    /* GET INPUT CURRENT STATE */
    let       id = e_target.id;
    let selected = lib_util.has_el_class(e_target, CSS_SELECTED);

    /* TOGGLE */
    selected     = !selected;

    /* STORE state */
    set_option(id, selected);
    save_options_now();

    /* APPLY */
    document.location.reload();
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ OPTIONS [LOAD] [APPLY] [SAVE] ....................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ on_activated_load_options {{{*/
let on_activated_load_options = function(request)
{
/*{{{*/
let   caller = "on_activated_load_options";
let log_this = options.LOG2_MESSAGE || options.LOG5_DIV_TOOLS;

let tag_this = log_this || options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;
if( tag_this) log_sep_top("LOADING OPTIONS FROM "+Object.keys(request).length+" REQUEST KEYS", 6);
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
if(log_this) log("➔ FROM EMBEDDED PAGE DOMAIN [localStorage]:");

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

//console.log(   "use_lib_shadow_root=["+        options.use_lib_shadow_root +"]")
    /*}}}*/
    /* [scrollBehavior] {{{*/
    if(!get_option("smooth_scroll") )
        document.documentElement.style.scrollBehavior = "auto"  ; // The scrolling box scrolls instantly
    else
        document.documentElement.style.scrollBehavior = "smooth";

    /*}}}*/

if(log_this) log_key_val("options", options, 6);
if(tag_this) log_sep_bot(caller, 6);
};
/*}}}*/
/*{{{*/
/*{{{*/
const SAVE_OPTIONS_TIMOUT_DELAY = 1000;

let options = {}; // EXPORTED OBJECT ➔ SHOULD NOT MUTATE
let save_options_timeout;
/*}}}*/
/*_ get_option {{{*/
let get_option  = function(key)
{
//console.log(options)
//console.dir(options)
    let    val  = options[key];

//if(val) log("get_option("+key+"): ...return ["+val+"]")
    return val;
};
/*}}}*/
/*_ set_option {{{*/
let set_option  = function(key,val)
{
let log_this = options.LOG2_MESSAGE;

if( log_this) log("set_option(key["+key+"] , val=["+val+"])");

    options[key] = val;

    save_options("set_option(key["+key+"] , val=["+val+"])");
};
/*}}}*/
/*_ save_options {{{*/
let save_options = function(_caller,sendResponse)
{
    if(save_options_timeout) clearTimeout(save_options_timeout);

    save_options_timeout
        = setTimeout(  function() { save_options_handler(_caller,sendResponse); }
                     , SAVE_OPTIONS_TIMOUT_DELAY);
};
/*}}}*/
/*_ save_options_now {{{*/
let save_options_now = function(_caller,sendResponse)
{
    if(save_options_timeout) clearTimeout(save_options_timeout);

    save_options_handler(_caller,sendResponse);
};
/*}}}*/
/*_ save_options_handler {{{*/
let save_options_handler = function(_caller,sendResponse)
{
/*{{{*/
let   caller = "save_options_handler";
let log_this = options.LOG2_MESSAGE;

let tag_this = log_this || options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;
/*}}}*/
    /* EXTENSION UNLOADED {{{*/
    let div_tools = get_div_tools();
    if(!div_tools)
    {
if( tag_this) lib_log.logBIG("EXTENSION UNLOADED");

        return false;
    }
    /*}}}*/
if( tag_this) log_sep_top(caller+" SAVING "+Object.keys(options).length+" options", 5);
    /* [options] .. (updated current postion and location) {{{*/

    options.location_href = document.location.href;

if(tag_this) log_key_val_group(caller+"(_caller=["+_caller+"]"+(sendResponse ? (", "+sendResponse.name) : "")+")", options, 5, true);
    /*}}}*/
    /* 1/2 - SAVE IN [BACKGROUND SCRIPT localStorage] {{{*/
    if( sendResponse )
    {
        sendResponse( options );

    }
    else if(!lib_log.is_embedded(XPATH_CONTENT_SCRIPT_ID) )
    {
        send_message({ caller : _caller , options }, caller);

    }
    /*}}}*/
    /* 2/2 - SAVE IN [EMBEDDING PAGE DOMAIN localStorage] {{{*/
    else if( lib_log.is_embedded(TAXO_CONTENT_SCRIPT_ID) )
    {
        Object.keys(options).forEach( function(key) {
                                          let val  =                options[ key ];
//                                        if(!val) {
//                                            lib_util.localStorage_delItem( key );
//                                        }
//                                        else {
                                              let str =      JSON.stringify( val );
                                              lib_util.localStorage_setItem( key , str);
//                                        }
if(log_this) console.log("...saving "+key+": ",val);
                                      }
                                    );
    }
    /*}}}*/
if(tag_this) log_sep_bot(caller, 5);
    return true;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ OPTIONS LOG [CLICK] [STORAGE] ......... XPH/javascript/xpath_tools.js │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ log_toggle {{{*/
let log_toggle = function(e) // eslint-disable-line no-unused-vars
{
/* eslint-disable new-cap */

    let label = e.path[0].innerText.trim();
//console.log("%c log_toggle: label=["+label+"]", "background-color: #808; border-radius:1em; padding: 0 1em;")
//console.trace()

    switch(label) {

    /* TOOLS */
    case "LOG_TOOLS"      : log_toggle_LOG_TOOLS (                    e); break;
    case "LOG1_STEP"      : log_toggle_KEY       ( "LOG1_STEP"      , e); break;
    case "LOG2_MESSAGE"   : log_toggle_KEY       ( "LOG2_MESSAGE"   , e); break;
    case "LOG3_SERVER"    : log_toggle_KEY       ( "LOG3_SERVER"    , e); break;
    case "LOG4_XHR"       : log_toggle_KEY       ( "LOG4_XHR"       , e); break;
    case "LOG5_DIV_TOOLS" : log_toggle_KEY       ( "LOG5_DIV_TOOLS" , e); break;
    case "LOG6_MOVE_TOOL" : log_toggle_KEY       ( "LOG6_MOVE_TOOL" , e); break;


    /* ACTION */
    case "LOG_ACTION"     : log_toggle_LOG_ACTION(                    e); break;
    case "LOG1_EVENT"     : log_toggle_KEY       ( "LOG1_EVENT"     , e); break;
    case "LOG2_WHEEL"     : log_toggle_KEY       ( "LOG2_WHEEL"     , e); break;
    case "LOG3_MASK"      : log_toggle_KEY       ( "LOG3_MASK"      , e); break;
    case "LOG4_FRAMES"    : log_toggle_KEY       ( "LOG4_FRAMES"    , e); break;
    case "LOG5_XPATH"     : log_toggle_KEY       ( "LOG5_XPATH"     , e); break;
    }

};
/*}}}*/
/*_ log_toggle_KEY {{{*/
let log_toggle_KEY = function(key,e)
{
    let e_target = lib_util.get_event_target(e);
    let      ecl = e_target.classList;
    ecl.toggle( CSS_SELECTED);
    set_option(key, ecl.contains(CSS_SELECTED));
};
/*}}}*/
/*_ log_toggle_LOG_TOOLS {{{*/
let log_toggle_LOG_TOOLS     = function(e) // eslint-disable-line no-unused-vars
{
    /* SAVE TOOLS OPTION STATE {{{*/
    let state = !options.LOG5_DIV_TOOLS ;
console.log( "...LOG_TOOLS: "    + state);

    set_option( "LOG1_STEP"      , state);
    set_option( "LOG2_MESSAGE"   , state);
    set_option( "LOG3_SERVER"    , state);
    set_option( "LOG4_XHR"       , state);
    set_option( "LOG5_DIV_TOOLS" , state);
    set_option( "LOG6_MOVE_TOOL" , state);

    /*}}}*/
    /* SYNC GUI {{{*/
    let el;
    el = lib_util.get_tool("LOG1_STEP"     ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG4_XHR"      ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG_TOOLS"     ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG3_SERVER"   ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG2_MESSAGE"  ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG5_DIV_TOOLS"); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG6_MOVE_TOOL"); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }

    /*}}}*/
};
/*}}}*/
/*_ log_toggle_LOG_ACTION {{{*/
let log_toggle_LOG_ACTION   = function(e) // eslint-disable-line no-unused-vars
{
    /* SAVE ACTION OPTION STATE {{{*/
    let      state = !options.LOG3_MASK ;
console.log( "...LOG_ACTION: "  + state);

    set_option( "LOG1_EVENT"    , state);
    set_option( "LOG2_WHEEL"    , state);
    set_option( "LOG3_MASK"     , state);
    set_option( "LOG4_FRAMES"   , state);
    set_option( "LOG5_XPATH"    , state);

    /*}}}*/
    /* SYNC GUI {{{*/
    let el;

    el = lib_util.get_tool("LOG_ACTION"   ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG1_EVENT"   ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG2_WHEEL"   ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG3_MASK"    ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG4_FRAMES"  ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }
    el = lib_util.get_tool("LOG5_XPATH"   ); if(el) { if(state) el.classList.add(CSS_SELECTED); else el.classList.remove(CSS_SELECTED); }

    /*}}}*/
};
/*}}}*/
/*}}}*/

/* EXPORT {{{*/
return { SHADOW_HOST_ID
    ,    DIV_TOOLS_ID
    ,    check_script_loaded
    ,    div_tools_init
    ,    get_domains
    ,    get_urls
    ,    send_xpath_cmd
    ,    log_query_step
    ,    get_div_tools

    , smooth_scroll_toggle_handler
    , shadow_root_toggle_handler
    , div_tools_preventScrolling
    , div_tools_restoreScrolling

    // EVENT
    , div_tools_beforeunload
    , div_tools_onDown
    , div_tools_onKey
    , div_tools_onOrientationchange
    , div_tools_onResize
    , div_tools_onUp

    // OPTIONS
    , options
    , get_option
    , set_option
    , log_toggle

    // DEBUG
    , on_activated_load_options
    , set_activated : (args) => set_activated(args || {})

    // DEBUG EMBEDDING [XPH/xpath_embedded.html]
    ,  get_domains_handler
    ,  get_urls_handler
    ,  get_xpaths_handler
    ,  get_taxonomy_handler
    ,  div_tools_confine_to_viewport
    ,  get_expanded_EL_WH
    ,  query_domains


};
/*}}}*/
})();

xpath_content.div_tools_init();
/*
:e xpath_embedded.html
:e javascript/xpath_content.js
:e javascript/taxo_content.js
:e javascript/event_listeners.js
*/
