//┌──▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼──────────────────────────────────────────────────────────┐
//│ [xpath_outline_js] .......................... OUTLINE XPATH CONTENT SCRIPT │
//└──▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲──────────────────────────────────────────────────────────┘
/* jshint eslint {{{*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */

/* globals console       */
/* globals window        */
/* globals document      */
/* globals Node          */
/* globals lib_log       */
/* globals lib_popup     */
/* globals lib_util      */
/* globals xpath_js      */
/* globals xpath_content */
/* globals setTimeout clearTimeout */ // eslint-disable-line no-unused-vars

/* exported xpath_outline, XPATH_OUTLINE_JS_ID */

//┌───────────────────────────────────────┐
//│ eslint NodeJS dependencies            │
//└───────────────────────────────────────┘
/*    eslint-disable no-global-assign    */
/*    eslint-disable no-implicit-globals */
/*    eslint-disable no-native-reassign  */
//    eslint-disable no-undef            */
/*    eslint-disable no-warning-comments */
/*    eslint-disable no-mixed-operators  */
/*
:update|1,$y *
:!start explorer https://jshint.com/
*/

const XPATH_OUTLINE_JS_ID         = "outline";
const XPATH_OUTLINE_JS_TAG        =  XPATH_OUTLINE_JS_ID +" (220110:15h:59)";
/*}}}*/
let xpath_outline = (function() {
/*➔ LOG {{{*/
"use strict";

 /* eslint-disable no-unused-vars */
/*_ lib_log {{{*/

  let   lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX;
  let   lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb          ;
  let   lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX;

let   log;
let   logBIG;
let   logXXX;
let   log_caller;
let   log_key_val;
let   log_key_val_group;

/*}}}*/
/*_ report_require_lib_log {{{*/
let report_require_lib_log = function()
{
    /* eslint-disable no-unused-vars */

    ({ lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX } = lib_log.LOG_BG_CSS);
    ({ lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX } = lib_log.LOG_FG_CSS);
    ({ lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb           } = lib_log.LOG_XX_CSS);

    log                                 = lib_log.log;
    logBIG                              = lib_log.logBIG;
    logXXX                              = lib_log.logXXX;
    log_caller                          = lib_log.log_caller;
    log_key_val                         = lib_log.log_key_val;
    log_key_val_group                   = lib_log.log_key_val_group;

    /* eslint-enable  no-unused-vars */
};
/*}}}*/
if(lib_log)
    report_require_lib_log();

 /* eslint-ensable no-unused-vars */
/*}}}*/
/*{{{*/
const OUTLINE_SCAN_STEP_MAX = 3;
const OUTLINE_SCAN_SIGN_MAX = [
    { x: 1 , y: 1 } /* RIGHT  ABOVE  */
  , { x: 1 , y:-1 } /* RIGHT  BELOW  */
  , { x:-1 , y: 1 } /* LEFT   ABOVE  */
  , { x:-1 , y:-1 } /* LEFT   BELOW  */
];

const COLORX
    = [   "rgba(000,000,000,0.7)"
        , "rgba(150,075,000,0.7)"
        , "rgba(255,000,000,0.7)"
        , "rgba(255,165,000,0.7)"
        , "rgba(255,255,000,0.7)"
        , "rgba(154,205,050,0.7)"
        , "rgba(100,149,237,0.7)"
        , "rgba(238,130,238,0.7)"
        , "rgba(160,160,160,0.7)"
        , "rgba(255,255,255,0.7)"
    ];

const CAPTURE_TRUE_PASSIVE_FALSE       = {capture:true, passive:false};
//nst CAPTURE_TRUE_PASSIVE_FALSE_ONCE  = {capture:true, passive:false, once:true }; // NO! WILL REMOVE IT MYSELF

const BODY_WHEEL_TITLE = "TURN MOUSE WHEEL TO SELECT A PARENT CONTAINER";
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ CONFIG                                                                     │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ set_config {{{*/
let config = {};

let set_config = function(_config)
{
    config = _config;   let missing_config  = "";

    if(!config.CMD_ADD    ) missing_config += "CMD_ADD";
    if(!config.CMD_DELETE ) missing_config += "CMD_DELETE";
    if(!config.CMD_CONFIRM) missing_config += "CMD_CONFIRM";

    if( missing_config)
    {
        logBIG(XPATH_OUTLINE_JS_ID+".set_config: MISSING CONFIG: ["+missing_config+"]",2);
        lib_log.log_caller();
        log_key_val("config", config);
    }
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ TOOL [STATE-TRANSITION]                                                    │
//└────────────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ cancel_pending_event {{{*/
let cancel_pending_event = function(e_target)
{
/*{{{*/
let   caller = "cancel_pending_event";
let log_this = xpath_content.options.LOG1_EVENT;

/*}}}*/
if( log_this) lib_log.log_sep_top(caller+"("+lib_util.get_id_or_tag(e_target)+")", 0, true);
if( log_this) log_caller();

    lib_popup.log_popup_hide();

    pick1_outline_onclick_stop();

    xpath_content.div_tools_restoreScrolling();

    outline_tools_unselect();

    if(e_target) e_target.classList.add("selected");

if( log_this) lib_log.log_sep_bot(caller, 0);

    wheel_clr_wheelable();

    sampling_check_button_sample_add_or_clear();
};
/*}}}*/
/*_ page_refresh {{{*/
let page_refresh = function(_caller)
{
    /* PAGE HIDE */
    page_wheel_clr_lit_nodes();
    page_wheel_clr_add_nodes();

    /* SHOW */
    outline_frames_show();
    outline_dots_show  ();

    page_show_srv_xpath_targets(_caller);
    page_show_usr_xpath_targets(_caller);
};
/*}}}*/
/*_ outline_tools_unselect {{{*/
let outline_tools_unselect = function()
{
/*{{{*/
let   caller = "outline_tools_unselect";
let log_this = xpath_content.options.LOG1_EVENT;

/*}}}*/
    let             div_tools = lib_util.get_tool         ( "div_tools"    );
    let            taxo_tools = lib_util.get_tool         ( "taxo_tools"   );
    let           div_options = lib_util.get_tool         ( "div_options"  );
    let          div_activity = lib_util.get_tool         ( "div_activity" );

    let div_tools_child_array = div_tools.querySelectorAll( ".selected"    );

    for(let i=0; i<div_tools_child_array.length; ++i)
    {
        let el = div_tools_child_array[i];

        if(  lib_util.is_parent_or_child(taxo_tools  , el) ) continue; /* skip children of [taxo_tools  ] */
        if(  lib_util.is_parent_or_child(div_activity, el) ) continue; /* skip children of [div_activity] */
        if(  lib_util.is_parent_or_child(div_options , el) ) continue; /* skip children of [div_options] */

if(log_this) lib_log.log(caller+": %c"+(el.id || lib_util.get_id_or_tag(el)), lf3);
            el.classList.remove("selected");
            el.classList.remove("confirm" );
    }
};
/*}}}*/
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ EVENT                                                                      │
//└────────────────────────────────────────────────────────────────────────────┘
/*{{{*/

    //┌─────────────────────────────────────────────────┐
    //│ OPTION ............... [expand] [dots] [frames] │
    //└─────────────────────────────────────────────────┘
/*➔ outline_option_toggle_e_target {{{*/
let outline_option_toggle_e_target = function(e_target) // eslint-disable-line no-unused-vars
{
/*{{{*/
let   caller = "outline_option_toggle_e_target";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller,1);
/*}}}*/

    cancel_pending_event();

    /* OPTION CURRENT VALUE */
    let selected = lib_util.has_el_class(e_target, "selected" );

    /* OPTION TOGGLE VALUE */
    selected     = !selected;

    /* OPTION SYNC GUI */
    if(selected)      lib_util.add_el_class(e_target, "selected" );
    else              lib_util.del_el_class(e_target, "selected" );

    /* OPTION STORE KEY..VALUE */
    set_option(e_target.id, selected);

    /* OPTION APPLY NEW STATE */
    div_xpaths_sync_GUI();
};
/*}}}*/
/*➔ outline_dots_toggle_handler {{{*/
let outline_dots_toggle_handler = function(e_target)
{
/*{{{*/
let caller = "outline_dots_toggle_handler";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) logBIG(caller,1);
/*}}}*/

    /* GET INPUT CURRENT STATE */
    let       id = e_target.id;
    let selected = lib_util.has_el_class(e_target, "selected");

    /* TOGGLE */
    selected = !selected;

    /* SYNC GUI */
    cancel_pending_event();
    if(selected  ) lib_util.add_el_class(e_target, "selected");
    else           lib_util.del_el_class(e_target, "selected");

    /* STORE state */
    set_option(id, selected);

    /* clear GUI */
    sampling_2_clear();
};
/*}}}*/
/*➔ outline_frames_toggle_handler {{{*/
let outline_frames_toggle_handler = function(e_target)
{
/*{{{*/
let caller = "outline_frames_toggle_handler";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) logBIG(caller,1);
/*}}}*/

    /* GET INPUT CURRENT STATE */
    let       id = e_target.id;
    let selected = lib_util.has_el_class(e_target, "selected");

    /* TOGGLE */
    selected = !selected;

    /* SYNC GUI */
    cancel_pending_event();
    if(selected  ) lib_util.add_el_class(e_target, "selected");
    else           lib_util.del_el_class(e_target, "selected");

    /* STORE state */
    set_option(id, selected);

    /* clear GUI */
    sampling_2_clear();
};
/*}}}*/

    //┌─────────────────────────────────────────────────┐
    //│ PICK ...................................... [+] │
    //└─────────────────────────────────────────────────┘
/*{{{*/

let div_outline_pick_button_clicked;
/*}}}*/
/*➔ pick_xpath_e_target {{{*/
let pick_xpath_e_target = function(e_target)
{
/*{{{*/
let caller = "pick_xpath_e_target";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller,1);
/*}}}*/

    let canceling = e_target.classList.contains("selected");
    if( canceling )
    {
        cancel_pending_event();

        e_target.blur();
    }
    else {

        cancel_pending_event(e_target);

        div_outline_pick_button_clicked = e_target;

        pick2_outline_onclick_start();

        sampling_check_button_sample_add_or_clear();
    }
};
/*}}}*/
/*_ pick1_outline_onclick_stop {{{*/
let pick1_outline_onclick_stop  = function()
{
/*{{{*/
let   caller = "pick1_outline_onclick_stop";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) log("%c"+caller, lbH+lf6);
/*}}}*/
    if( div_outline_pick_button_clicked )
    {
        div_outline_pick_button_clicked = null;
    }
    lib_popup.div_mask_hide();
};
/*}}}*/
/*_ pick2_outline_onclick_start {{{*/
let pick2_outline_onclick_start = function()
{
/*{{{*/
let caller = "pick2_outline_onclick_start";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) log("%c"+caller, lbH+lf0);
/*}}}*/

    div_mask_repeat();

};
/*___ div_mask_repeat {{{*/
let   div_mask_repeat = function()
{
    if( div_mask_get() )
        lib_popup.div_mask_repeat();
};
/*}}}*/
/*}}}*/

    //┌─────────────────────────────────────────────────┐
    //│ SAMPLE .......................... [+++] ➔ [xxx] │
    //└─────────────────────────────────────────────────┘
/*➔ sampling_pick_some_xpath {{{*/
let sampling_pick_some_xpath = function(e_target) // eslint-disable-line no-unused-vars
{
/*{{{*/
let caller = "sampling_pick_some_xpath";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller, 1);
/*}}}*/
    cancel_pending_event(e_target);

    /* SAMPLE CLEAR OR AUTOSELECT {{{*/
    let    something_to_clear
        =  sampling_1_has_some()
        || outline_frames_has_some()
    ;

    if( something_to_clear )
    {
        sampling_2_clear();
        page_refresh();
    }
    else {
        let added_count = sampling_3_pick_some();

        if( added_count )
            div_xpaths_rebuild("SAMPLING PICK SOME");

        page_show_usr_xpath_targets(caller);
    }

    /*}}}*/
    /* AS A RESULT: SHOW WHETHER [button_sample] HAS [can_add] XPATHS {{{*/
    sampling_check_button_sample_add_or_clear();

    /*}}}*/
};
/*}}}*/
/*_ sampling_1_has_some {{{*/
let sampling_1_has_some = function()
{
/*{{{*/
let caller = "sampling_1_has_some";
let log_this = xpath_content.options.LOG4_FRAMES;

/*}}}*/
    let div_xpaths = lib_util.get_tool("div_xpaths");
if( log_this) log("%c"+caller+": div_xpaths.children.length=["+div_xpaths.children.length+"]", lbH+lf0);

    let not_from_server = "";
    for(let i=0; i< div_xpaths.children.length; ++i)
    {
        let div_xpaths_child = div_xpaths.children[i];
        if(!div_xpaths_child.classList.contains("delete") )
        {
            not_from_server += " "+(i+1);
        }
    }
if(log_this) console.log("...not_from_server=["+not_from_server+"]");
    return not_from_server;
};
/*}}}*/
/*_ sampling_2_clear {{{*/
let sampling_2_clear = function()
{
/*{{{*/
let caller = "sampling_2_clear";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller,lbH+lf0);
/*}}}*/

    outline_frames_clear();
    outline_dots_clear  ();

    sampling_2_clear2_div_xpaths_children();
    data_num_xpath_keep_from_server_only();

    let button_sample = lib_util.get_tool("button_sample");
    button_sample.classList.remove("can_add");
};
/*}}}*/
/*_ sampling_2_clear2_div_xpaths_children {{{*/
let sampling_2_clear2_div_xpaths_children = function()
{
/*{{{*/
let caller = "sampling_2_clear2_div_xpaths_children";
let log_this = xpath_content.options.LOG5_XPATH;

    let       div_xpaths = lib_util.get_tool("div_xpaths");
if( log_this) log("%c"+caller+": div_xpaths.children.length=["+div_xpaths.children.length+"]", lbH+lf9);
/*}}}*/
    /* keep deletable items ONLY */

    for(let i=div_xpaths.children.length-1; i>=0; --i)
    {
        let div_xpaths_child = div_xpaths.children[i];

        /* KEEP DELETABLE ITEMS .. (I.E. THEY HAVE TO BE REMOVED BY THE SERVER FIRST) */
        if(!div_xpaths_child.classList.contains("delete") )
            outline_delete_xpath( div_xpaths_child.dataset.xpath );
    }
if( log_this) log("...div_xpaths.children.length=["+div_xpaths.children.length+"]");
};
/*}}}*/
/*_ sampling_3_pick_some {{{*/
let sampling_3_pick_some = function()
{
/*{{{*/
let caller = "sampling_3_pick_some";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) log(caller);
/*}}}*/
//if( log_this) console.time(caller);
    /* outline current {{{*/
    let v_W = window.innerWidth ;
    let v_H = window.innerHeight;
    let w_2 = v_W / 2;
    let h_2 = v_H / 2;

    /*}}}*/
    /* CIRCLE SCAN AROUND VIEWPORT CENTER {{{*/
    let  outline_log_dot = get_option("outline_log_dot");
//console.log("outline_log_dot=["+outline_log_dot+"]")

    let      added_count = 0;
    let          step_X  = v_W  / 2 / (OUTLINE_SCAN_STEP_MAX+1)     ;                /* skip edges */
    let          step_Y  = v_H  / 2 / (OUTLINE_SCAN_STEP_MAX+1)     ;                /* skip edges */
    for(        let col  = 0;  (col <= OUTLINE_SCAN_STEP_MAX       ); ++col) { let d_x = col * step_X;
        for(    let row  = 0;  (row <= OUTLINE_SCAN_STEP_MAX       ); ++row) { let d_y = row * step_Y;
            for(let dir  = 0;  (dir <  OUTLINE_SCAN_SIGN_MAX.length); ++dir)
            {
                if((col == 0)      && (OUTLINE_SCAN_SIGN_MAX[dir].x != 1)) continue; /* skip zero mirror */
                if((row == 0)      && (OUTLINE_SCAN_SIGN_MAX[dir].y != 1)) continue;

                let left = w_2 + d_x * OUTLINE_SCAN_SIGN_MAX[dir].x ;
                let top  = h_2 + d_y * OUTLINE_SCAN_SIGN_MAX[dir].y ;

                /* NEW data_num_xpath */
                let  new_num       = data_num_xpath_get_new_num();
                let data_num_xpath = data_num_xpath_add_at_XY(new_num, left, top, true); // silent
                if( data_num_xpath ) ++added_count;

                /* NEW outline_log_dot */
                if(data_num_xpath && outline_log_dot)
                    outline_dots_add_num_at_XY(new_num, Math.round(left), Math.round(top));

                if((col  == 0) && (row == 0))                                 break; /* directionless case */
            }
        }
    }
    /*}}}*/
//if( log_this) console.timeEnd(caller);

    return added_count;
};
/*}}}*/
/*_ sampling_check_button_sample_add_or_clear {{{*/
/*{{{*/
const SAMPLING_CHECK_BUTTON_SAMPLE_ADD_OR_CLEAR_DELAY = 250;

let   sampling_check_button_sample_add_or_clear_timer;
/*}}}*/
let sampling_check_button_sample_add_or_clear = function()
{
    if(sampling_check_button_sample_add_or_clear_timer) clearTimeout(sampling_check_button_sample_add_or_clear_timer);
       sampling_check_button_sample_add_or_clear_timer=   setTimeout(sampling_check_button_sample_add_or_clear_handler, SAMPLING_CHECK_BUTTON_SAMPLE_ADD_OR_CLEAR_DELAY);
};
let sampling_check_button_sample_add_or_clear_handler = function()
{
    sampling_check_button_sample_add_or_clear_timer = null;

    let  div_xpaths    = lib_util.get_tool(                     "div_xpaths"   );
    let  div_add_array = div_xpaths.querySelectorAll(           "DIV.add"      );
    let  button_sample = lib_util.get_tool(                     "button_sample");

    if(div_add_array.length > 0) button_sample.classList.add(   "can_add"      );
    else                         button_sample.classList.remove("can_add"      );

};
/*}}}*/

    //┌─────────────────────────────────────────────────┐
    //│ [div_xpaths_child] ............. [✔][+][x] [↑↓] │
    //└─────────────────────────────────────────────────┘
/*➔ div_xpaths_click_handler {{{*/
let div_xpaths_click_handler = function(e_target,e) // eslint-disable-line no-unused-vars
{
/*{{{*/
let   caller = "div_xpaths_click_handler";
let log_this = xpath_content.options.LOG5_XPATH;

    let consumed_by; let lxx = 0;
/*}}}*/
    /* [CLICK STAGES] .. (state ➔ transition priorities) {{{*/

    let     handled_xpath                =     wheelable_target_xpath_get();
    let     div_xpaths_child             =     lib_util.get_el_parent_with_tag     ( e_target , "DIV" );
    let     div_xpaths_child_on_cooldown =     wheel_stop_handler_is_on_cooldown   ( div_xpaths_child );

    let     div_xpaths_child_WAS = log_this && lib_util.get_id_or_tag_and_className( div_xpaths_child );
    let             e_target_WAS = log_this && lib_util.get_id_or_tag_and_className( e_target         );

    let click1_oncooldown
        =   div_xpaths_child_on_cooldown
    ;
    let click2_cmd_confirm
        =   div_xpaths_child
        &&  div_xpaths_child.classList.contains("confirm")
    ;
    let click3_cmd_add_or_delete
        =  !click2_cmd_confirm
        && (e_target.parentElement                              )
        && (e_target.parentElement.firstElementChild == e_target)
    ;
    let click4_stop
        =   handled_xpath
        && !div_xpaths_child_on_cooldown
    ;
    let click5_start
        =  !click3_cmd_add_or_delete
        && !click4_stop
        && !click1_oncooldown
    ;

    /*}}}*/
    /* [click1_oncooldown.......] - THEN STANDBY DURING COOLDOWN {{{*/
    if(!consumed_by && click1_oncooldown)
    {
        consumed_by     = div_xpaths_child_on_cooldown;
        lxx             = 6;

    }
    /*}}}*/
    /* [click3_cmd_add_or_delete] - CLICK [+] OR [X] .. SEND XPATH COMMAND TO SERVER {{{*/
    if(!consumed_by && click3_cmd_add_or_delete)
    {
        let cmd
            = div_xpaths_child.classList.contains(config.CMD_DELETE ) ? config.CMD_DELETE
            : div_xpaths_child.classList.contains(config.CMD_ADD    ) ? config.CMD_ADD
            :                                                           ""
        ;
        if( cmd ) {
            consumed_by =  cmd;
            lxx         = (cmd == config.CMD_ADD   ) ? 3
                        : (cmd == config.CMD_DELETE) ? 2
                        :                              1;

            let user_offset_xpath = data_num_xpath_get_num_actual_user_xpath( div_xpaths_child.dataset.num );
            xpath_content.send_xpath_cmd(user_offset_xpath, cmd, "FROM USER");

            cancel_pending_event(e_target);
        }
    }
    /*}}}*/
    /* [click4_stop.............] - STOP WHEEL FROM [handled_xpath] {{{*/
    if(!consumed_by && click4_stop)
    {
        consumed_by     = "STOP HANDLING WHEEL .. handled_xpath=["+handled_xpath+"]";
        lxx             = 5;
    }
    /*}}}*/
    /* [click5_start............] - START WHEEL FROM [CLICKED XPATH] .. [WHEEL OFFSET] {{{*/
    if(!consumed_by && click5_start && div_xpaths_child)
    {
//log(caller+": "+lib_util.get_id_or_tag(e_target)+" WHEELING XPATH HIERARCHY")

        let lit_node = wheel_start_from_div_xpaths_child( div_xpaths_child ); // NOTE: THIS ADDS ANOTHER CLICK-EVENT HANDLER
        if( lit_node )
        {
            consumed_by = "STARTING TO ADJUST XPATH OF ["+lib_util.get_id_or_tag(lit_node)+"]";
            lxx         = 4;
        }
        else {
            consumed_by = "!lit_node";
            lxx         = 9;
        }
    }
    /*}}}*/
    sampling_check_button_sample_add_or_clear();
/*{{{*/
if(xpath_content.options.LOG1_STEP) xpath_content.log_query_step("XPATH CLICK", consumed_by);

if( log_this)
    log_key_val_group( caller +" "+consumed_by
                     , {   div_xpaths_child_on_cooldown
                       , div_xpaths_child : lib_util.get_id_or_tag_and_className( div_xpaths_child ) +" .. "+ div_xpaths_child_WAS
                       ,         e_target : lib_util.get_id_or_tag_and_className(         e_target ) +" .. "+         e_target_WAS
                       ,    handled_xpath
                       , click1_oncooldown
                       , click2_cmd_confirm
                       , click3_cmd_add_or_delete
                       , click4_stop
                       , click5_start
                       , callers : lib_log.get_callers()
                     }
                     , lxx, false);

/*}}}*/
};
/*}}}*/

/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ XPATH                                                                      │
//└────────────────────────────────────────────────────────────────────────────┘
/*{{{*/
    //┌──────────────────────────────────────────────┐
    //│ DATA ....................................... │
    //└──────────────────────────────────────────────┘
/* data_num_xpath_array {{{*/
/*{{{*/
let data_num_xpath_array = [];

/*}}}*/
/*_ data_num_xpath_delete_all {{{*/
let data_num_xpath_delete_all = function()
{
if(xpath_content.options.LOG1_STEP) log("%c DELETING ALL x"+data_num_xpath_array.length+" %c XPATHS %c" , lbB+lbL+lf2 , lbB+lbC+lf3 , lbB+lbR+lf4);

    cancel_pending_event();

    for(let i=0; i<data_num_xpath_array.length; ++i)
    {
        if(        data_num_xpath_array[i].from_server )
            xpath_content.send_xpath_cmd(data_num_xpath_array[i].xpath, config.CMD_DELETE, config.ACTION_REPLACED);
    }

    data_num_xpath_array.splice(0); // NO MUTATION

    data_num_xpath_load_array();
};
/*}}}*/
/*_ data_num_xpath_load_array {{{*/
let data_num_xpath_load_array = function(_data_num_xpath_array)
{
/*{{{*/
let  caller = "data_num_xpath_load_array";
let log_this = xpath_content.options.LOG1_STEP;

if( log_this && _data_num_xpath_array) {
    lib_log.log_sep_top("XPATH LOADING", 1);
    log("%c"+  _data_num_xpath_array.length+ " XPATH ITEMS\n", lbb+lbH+lf3,  _data_num_xpath_array);
}
/*}}}*/
    data_num_xpath_array.splice(0); // NO MUTATION

    if(_data_num_xpath_array)
    {
        for(let i=0; i<_data_num_xpath_array.length; ++i)
        {
            if(!data_num_xpath_array.includes( _data_num_xpath_array[i] ))
                data_num_xpath_array.push(     _data_num_xpath_array[i] );
        }
    }

    data_num_xpath_array = data_num_xpath_array.sort();

//console.log("data_num_xpath_load_array:")
//console.table( data_num_xpath_array     )

    div_xpaths_rebuild("XPATH ONLOAD");

if(!_data_num_xpath_array) page_refresh();
if(log_this) lib_log.log_sep_bot(caller, 1);
};
/*}}}*/
/*_ data_num_xpath_keep_from_server_only {{{*/
let data_num_xpath_keep_from_server_only = function()
{
/*{{{*/
let   caller = "data_num_xpath_keep_from_server_only";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller+": data_num_xpath_array.length=["+data_num_xpath_array.length+"]", 0);
/*}}}*/
    let xpath_array = JSON.parse( JSON.stringify(data_num_xpath_array) );

    data_num_xpath_array.splice(0); // NO MUTATION

    for(let i=0; i<xpath_array.length; ++i)
    {
        let  data_num_xpath = xpath_array[i];
        if(  data_num_xpath.from_server )                /* KEEP ONLY THOSE FROM SERVER */
             data_num_xpath_array.push( data_num_xpath );
    }
if( log_this)      log("...data_num_xpath_array");
if( log_this) console.dir( data_num_xpath_array );
};
/*}}}*/
/*_ data_num_xpath_get_new_num {{{*/
let data_num_xpath_get_new_num = function()
{
    let num = 1;

    for(let i=0; i<data_num_xpath_array.length; ++i)
    {
        if(        data_num_xpath_array[i].num >= num)
            num =  data_num_xpath_array[i].num  + 1;
    }

//console.log("data_num_xpath_get_new_num: ...return num=["+num+"]")
//console.dir( data_num_xpath_array )
    return num;
};
/*}}}*/
/*_ data_num_xpath_add_at_XY {{{*/
let data_num_xpath_add_at_XY = function(num,x,y,silent=false)
{
/*{{{*/
let caller   = "data_num_xpath_add_at_XY";
let log_this = !silent && xpath_content.options.LOG5_XPATH;

if( log_this) log(caller+"(XY=["+x+" "+y+"] , num=["+num+"])");
/*}}}*/

    let range = lib_util.get_range_from_caret(x, y);
//  if( range && range.setStart ) /* range.setStart (i.e. Firefox) */
//  {
        let data_num_xpath = data_num_xpath_add_range_at_XY(range, x, y, num, silent);
        if( data_num_xpath )
        {
            let old_data_num_xpath = data_num_xpath_get_xpath_entry( data_num_xpath.xpath );
            if( old_data_num_xpath )
            {
                if(!silent)
                    lib_popup.log_popup("ALREADY SELECTED:\n\n ➔ "+data_num_xpath.xpath);

                return old_data_num_xpath;
            }
            else {
                data_num_xpath_array.push( data_num_xpath );

//console.log(caller+": ...return num=["+ data_num_xpath.num +"]")
//console.dir( data_num_xpath_array )
                return data_num_xpath;
            }
        }
//  }
    return null;
};
/*}}}*/
/*_ data_num_xpath_add_range_at_XY {{{*/
let data_num_xpath_add_range_at_XY = function(range,left,top,num,silent)
{
/*{{{*/
let caller   = "data_num_xpath_add_range_at_XY";
let log_this = !silent && xpath_content.options.LOG5_XPATH;

if( log_this) log(caller+"(range, XY=["+left+" "+top+"] , num=["+num+"])");
/*}}}*/
    /* container {{{*/
    let el = range.startContainer || range.offsetNode; /* offsetNode i.e. Firefox */
    if( el.nodeType == Node.TEXT_NODE) el = el.parentElement;

    /*}}}*/
    /* outlined already {{{*/
    if(                       el.tagName == "HTML"      ) return null;
    if(                       el.tagName == "BODY"      ) return null;
    if( lib_util.has_el_class(el,  "outline_dot")       ) return null;
    if( lib_util.has_el_class(el, "xpath_target")       ) return null;

    let          xpath = xpath_js.get_nodeXPath(el);
    let data_num_xpath = { num , xpath , from_server: false}; /* ADD ONE NOT FROM SERVER */

    /*}}}*/
    /* viewport .. top-left not within {{{*/
    let top_left   = lib_util.get_el_xy(el, caller);
    if( top_left.x < (window.scrollX                   )) return null;
    if( top_left.y < (window.scrollY                   )) return null;
    if( top_left.x > (window.scrollX+window.innerWidth )) return null;
    if( top_left.y > (window.scrollY+window.innerHeight)) return null;

    /*}}}*/
    /* viewport .. bottom-right not within {{{*/
    let br   = lib_util.get_el_xy(el, caller);
    br.x += el.offsetWidth;
    br.y += el.offsetHeight;
    if( br.x < (window.scrollX                   )      ) return null;
    if( br.y < (window.scrollY                   )      ) return null;
    if( br.x > (window.scrollX+window.innerWidth )      ) return null;
    if( br.y > (window.scrollY+window.innerHeight)      ) return null;

    /*}}}*/
    /* outline_frames_add_el_at_XY {{{*/
    if( get_option("outline_log_frame") )
        outline_frames_add_el_at_XY(el, top_left, num);

    /*}}}*/
    return data_num_xpath;
};
/*}}}*/
/*_ data_num_xpath_set_new_xpath {{{*/
let data_num_xpath_set_new_xpath = function(from_server,data_num_xpath,div_xpaths_child,new_xpath)
{
//log_caller()

    /* TRANSITION [FROM-SERVER] TO [FROM-USER] */
    if( data_num_xpath.from_server    &&  !from_server)
        data_num_xpath.prev_server_xpath = data_num_xpath.xpath;
    data_num_xpath.from_server           = from_server;

    /* DATA: XPATH UPDATE */
    data_num_xpath                .xpath =            new_xpath;
    div_xpaths_child.dataset      .xpath = data_num_xpath.xpath;

    /* TOOL: SHOW USER ACTION [add] or [delete] */
    if( data_num_xpath.from_server ) {
        div_xpaths_child.classList.add    ( config.CMD_DELETE );
        div_xpaths_child.classList.remove ( config.CMD_ADD    );
    }
    else {
        div_xpaths_child.classList.remove ( config.CMD_DELETE );
        div_xpaths_child.classList.add    ( config.CMD_ADD    );
    }

    /* TOOL: UPDATE XPATH ENTRY */
    let em_sym
        = data_num_xpath.from_server
        ? SYM_FROM_SERVER
        : SYM_FROM_USER;

    div_xpaths_child.innerHTML
        = " <em>"+ em_sym               +"</em>"
        + " <em>"+ data_num_xpath.num   +"</em>"
        + " <em>"+ data_num_xpath.xpath +"</em>";

    /* PAGE: SHOW TARGET ELEMENT */
    if( data_num_xpath.from_server )
        page_set_srv_xpath_target_bgnum(data_num_xpath.xpath, data_num_xpath.num);

    return div_xpaths_child;
};
/*}}}*/
/*_ data_num_xpath_get_xpath_entry {{{*/
let data_num_xpath_get_xpath_entry = function(xpath,log_this)
{
if(log_this) log("%c data_num_xpath_get_xpath_entry %c"+xpath, lbL, lbR);

    if(!xpath) return null;

    for(let i=0; i<      data_num_xpath_array.length; ++i)
    {
if(log_this) log(data_num_xpath_array[i]);

        if(   (          data_num_xpath_array[i].prev_server_xpath == xpath)
           || (          data_num_xpath_array[i].            xpath == xpath)
          )
            return       data_num_xpath_array[i];
    }
    return null;
};
/*}}}*/
/*_ data_num_xpath_get_num_from_server_xpath {{{*/
let data_num_xpath_get_num_from_server_xpath = function(num)
{
    for(let i=0; i<data_num_xpath_array.length; ++i)
    {
        if(        data_num_xpath_array[i].num == num)
            return data_num_xpath_array[i].from_server
                ?  data_num_xpath_array[i].            xpath /* IS  from server */
                :  data_num_xpath_array[i].prev_server_xpath /* WAS from server */
        ;
    }
    return "";
};
/*}}}*/
/*_ data_num_xpath_get_num_actual_user_xpath {{{*/
let data_num_xpath_get_num_actual_user_xpath = function(num)
{
    for(let i=0; i<data_num_xpath_array.length; ++i)
    {
        if(        data_num_xpath_array[i].num == num)
            return data_num_xpath_array[i].xpath;            /* current: [USER-OFFSET] or [FROM-SERVER] */
    }
    return "";
};
/*}}}*/

/*_ data_num_xpath_remove_xpath {{{*/
let data_num_xpath_remove_xpath = function(xpath)
{
//console.log("data_num_xpath_remove_xpath("+xpath+")")
//console.table( data_num_xpath_array )
    for(let i=data_num_xpath_array.length-1; i>=0; --i)
    {
        let data_num_xpath = data_num_xpath_array[i];
        if( data_num_xpath.xpath == xpath)
        {
//log_key_val_group("DEL XPATH DATA: data_num_xpath_array["+i+"]", data_num_xpath_array[i], lf0, true)
            data_num_xpath_array.splice(i,1);
        }
    }
//console.table( data_num_xpath_array )
};
/*}}}*/
/*}}}*/

    //┌──────────────────────────────────────────────┐
    //│ GUI ........................................ │
    //└──────────────────────────────────────────────┘
/* div_xpaths {{{*/
/*_ div_xpaths_rebuild {{{*/
let div_xpaths_rebuild = function(_caller)
{
/*{{{*/
let caller   = "div_xpaths_rebuild";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG("REBUILD ➔ "+_caller, lbb+lf9);
/*}}}*/
    let div_xpaths = lib_util.get_tool("div_xpaths");

    /* CLEAR ALL PAGE XPATH TARGETS */
    page_hide_srv_xpath_targets(caller);

    let innerHTML  = "";
    for(let i=0; i< data_num_xpath_array.length; ++i)
    {
        let data_num_xpath = data_num_xpath_array[i];
        innerHTML += div_xpaths_rebuild_item(data_num_xpath);

        if(data_num_xpath.from_server)
            page_set_srv_xpath_target_bgnum(data_num_xpath.xpath, data_num_xpath.num);
    }
    div_xpaths.innerHTML = innerHTML;

    div_xpaths_sync_GUI();
};
/*}}}*/
/*_ div_xpaths_rebuild_item {{{*/
/*{{{*/
const SYM_FROM_SERVER = "&#x2573;"; // X
const SYM_FROM_USER   = "&#x2795;"; // +

/*}}}*/
let div_xpaths_rebuild_item = function(data_num_xpath)
{
    let       num = data_num_xpath.num;

    let    em_sym = (data_num_xpath.from_server ? SYM_FROM_SERVER : SYM_FROM_USER);

    let className
        =                               "cc"+(num % 10)
        + (data_num_xpath.from_server ? " delete" : " add")
    ;

    let outerHTML
        = "<div"
        + " data-xpath='"+ data_num_xpath.xpath +"'"
        + " data-num='"  + data_num_xpath.num   +"'"
        + " class='"     + className            +"'>"
        + " <em>"        + em_sym               +"</em>"
        + " <em>"        + num                  +"</em>"
        + " <em>"        + data_num_xpath.xpath +"</em>"
        + "</div>"
    ;
    return outerHTML;
};
/*}}}*/
/*_ div_xpaths_child_for_xpath {{{*/
let div_xpaths_child_for_xpath = function(xpath)
{
    let div_xpaths = lib_util.get_tool("div_xpaths");

    for(let i=0; i < div_xpaths.children.length; ++i)
    {
        if(div_xpaths.children[i].dataset.xpath != xpath)
            continue;

        if(   div_xpaths.children[i].classList.contains(config.CMD_DELETE)
           || div_xpaths.children[i].classList.contains(config.CMD_ADD   )
          )
            return div_xpaths.children[i];
    }
    return null;
};
/*}}}*/

/*_ div_xpaths_remove_xpath {{{*/
let div_xpaths_remove_xpath = function(xpath)
{
    let div_xpaths = lib_util.get_tool("div_xpaths");
    for(let i=0; i < div_xpaths.children.length; ++i)
    {
        if(div_xpaths.children[i].dataset.xpath == xpath)
        {
//log("DEL XPATH GUI: div_xpaths.children["+i+"] ["+lib_util.get_id_or_tag( div_xpaths.children[i])+"]")

            div_xpaths.removeChild(  div_xpaths.children[i] );
        }
    }
};
/*}}}*/
/*}}}*/
/*_ div_xpaths_sync_GUI {{{*/
/*{{{*/
const DIV_XPATHS_SYNC_GUI_DELAY = 250;

let div_xpaths_sync_GUI_timer;
/*}}}*/
let div_xpaths_sync_GUI = function(docked)
{
    if(div_xpaths_sync_GUI_timer) clearTimeout(div_xpaths_sync_GUI_timer);
       div_xpaths_sync_GUI_timer=   setTimeout(function() { div_xpaths_sync_GUI_handler(docked); }, DIV_XPATHS_SYNC_GUI_DELAY);
};
/*}}}*/
/*_ div_xpaths_sync_GUI_handler {{{*/
let div_xpaths_sync_GUI_handler = function(docked)
{
    div_xpaths_sync_GUI_timer = null;
    let div_tools   = lib_util.get_tool("div_tools" );
    /* [docked] {{{*/
    if(     docked != undefined)
    {
        if( docked ) div_tools.classList.add      ("docked"   );
        else         div_tools.classList.remove   ("docked"   );
    }
    /*}}}*/
    /* [open] {{{*/
    let open        = lib_util.get_tool(         "xpath_expand").classList.contains("selected");

    if( open )       div_tools.classList.add   ("xpath_expand");
    else             div_tools.classList.remove("xpath_expand");
    /*}}}*/
    /* VIEWPORT {{{*/
//  xpath_content.div_tools_confine_to_viewport();

    /*}}}*/
};
/*}}}*/

    //┌──────────────────────────────────────────────┐
    //│ WHEEL OFFSET                                 │
    //└──────────────────────────────────────────────┘
/*{{{*/
let WHEEL_HANDLER_COOLDOWN = 250;

let wheelable_div_xpaths_child;
let wheelable_lit_node;
let wheelable_target_xpath;

/*}}}*/
/* LOG1_EVENT {{{*/
/*_ wheel_add_listener {{{*/
let wheel_add_listener = function(lit_node)
{
/*{{{*/
let   caller = "wheel_add_listener";
let log_this = xpath_content.options.LOG1_EVENT;

if( log_this) log("%c"+caller, lbH+lf6);
if( log_this) log_caller();
/*}}}*/

    wheelable_lit_node      = lit_node;
    wheel_handler_time      = undefined;
    wheel_handler_factor    = 1;
    logged_has_moved_report = undefined;

    xpath_content.div_tools_preventScrolling();

   /*  [div_mask] ADD listeners .. (will be shown by log_popup_follow_mask_el) */
    if(!div_mask           ) div_mask_get();

    let shadow_host        = lib_util.get_shadow_host();

    if( lib_util.get_touch_behavior() ) {
        div_mask           .addEventListener("touchstart", wheel_pointerdown , CAPTURE_TRUE_PASSIVE_FALSE);
        div_mask           .addEventListener("touchmove" , wheel_pointermove , CAPTURE_TRUE_PASSIVE_FALSE);
        div_mask           .addEventListener("touchend"  , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
        shadow_host        .addEventListener("touchend"  , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
    }
    else {
/**/div_mask               .addEventListener("mouseup"   , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
/**/shadow_host            .addEventListener("mouseup"   , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
        div_mask           .addEventListener("wheel"     , wheel_handler     , CAPTURE_TRUE_PASSIVE_FALSE);
        shadow_host        .addEventListener("wheel"     , wheel_handler     , CAPTURE_TRUE_PASSIVE_FALSE);
        lib_popup.log_popup_addEventListener("wheel"     , wheel_handler     , CAPTURE_TRUE_PASSIVE_FALSE);
    }

};
/*}}}*/
/*_ wheel_del_listener {{{*/
let wheel_del_listener = function()
{
/*{{{*/
let   caller = "wheel_del_listener";
let log_this = xpath_content.options.LOG1_EVENT;

if( log_this) log("%c"+caller, lbH+lf6);
if( log_this) log_caller();
/*}}}*/

    if(!div_mask    ) div_mask_get();
    let shadow_host = lib_util.get_shadow_host();

    if( lib_util.get_touch_behavior() ) {
        div_mask    .removeEventListener("touchstart", wheel_pointerdown , CAPTURE_TRUE_PASSIVE_FALSE);
        div_mask    .removeEventListener("touchmove" , wheel_pointermove , CAPTURE_TRUE_PASSIVE_FALSE);
        div_mask    .removeEventListener("touchend"  , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
        shadow_host .removeEventListener("touchend"  , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
    }
    else {
/**/div_mask        .removeEventListener("mouseup"   , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
/**/shadow_host     .removeEventListener("mouseup"   , wheel_stop_handler, CAPTURE_TRUE_PASSIVE_FALSE);
        div_mask    .removeEventListener("wheel"     , wheel_handler     , CAPTURE_TRUE_PASSIVE_FALSE);
        shadow_host .removeEventListener("wheel"     , wheel_handler     , CAPTURE_TRUE_PASSIVE_FALSE);
    }

    wheel_div_xpaths_child  = wheelable_div_xpaths_child;
if( log_this) log("%c...STARTING WHEEL COOLDOWN .. wheel_div_xpaths_child=["+lib_util.get_id_or_tag(wheel_div_xpaths_child)+"]", lf8);
};
/*}}}*/
/*_ wheel_pointerdown {{{*/
let wheel_pointerdown = function(e)
{
    lib_util.set_onDown_XY(e);

    wheel_handler_time      = undefined;
    wheel_handler_factor    = 1;
    logged_has_moved_report = undefined;

    wheel_handler(e);
};
/*}}}*/
/*_ wheel_pointermove {{{*/
/*{{{*/
let logged_has_moved_report;

/*}}}*/
let wheel_pointermove = function(e)
{
/*{{{*/
let   caller = "wheel_pointermove";
let log_this = xpath_content.options.LOG1_EVENT;

/*}}}*/
    /* [!has_moved] {{{*/
    let movement = lib_util.set_onMove_XY(e);
    let move_delta
        = Math.abs(movement.dxy.x) > Math.abs(movement.dxy.y)
        ?  movement.dxy.x
        :  movement.dxy.y;

/* log [has_moved] {{{*/
//if(log_this) {
    let this_has_moved_report = ".. has_moved=["+movement.has_moved+"]";
    if(logged_has_moved_report && (this_has_moved_report != logged_has_moved_report))
    {
        if(log_this) {
            if(movement.has_moved)
                logBIG(caller+": "+ this_has_moved_report+" .. move_delta=["+move_delta+"/"+lib_util.MOVED_ENOUGH+"]", 4);
            else
                logBIG(caller+": "+ this_has_moved_report+" .. move_delta=["+move_delta+"/"+lib_util.MOVED_ENOUGH+"]", 8);
        }
    }
//  logged_has_moved_report = this_has_moved_report;
//}
/*}}}*/
    if(!movement.has_moved ) return;
    /*}}}*/
    /* MOVE STEP {{{*/
    if( wheel_handler(e, move_delta) ) /* don't step during WHEEL_HANDLER_COOLDOWN */
    {
        lib_util.set_onFrom_XY(e);

        logged_has_moved_report = this_has_moved_report;
    }
    /*}}}*/
};
/*}}}*/
/*_ wheel_handler {{{*/
let wheel_handler = function(e,move_delta) /* eslint-disable-line complexity */
{
/*{{{*/
let caller = "wheel_handler";
let log_this = xpath_content.options.LOG1_EVENT;

/*}}}*/
    /* [return false] .. f(!wheelable_lit_node) {{{*/
if( log_this) log(caller+": .. wheelable_lit_node=["+lib_util.get_id_or_tag(wheelable_lit_node)+"]");
    if(!wheelable_lit_node) return false;

    /*}}}*/
    /* prevent mouse wheel scroll {{{*/
    lib_util.cancel_event(e);

    /*}}}*/
    /* [move_delta] .. [wheel_delta] {{{*/
    if( move_delta             == undefined)
        move_delta = (e.deltaY != undefined)
            ?         e.deltaY  : undefined;

    let wheel_delta
        = (move_delta != undefined)
        ? (move_delta > 0) ? -1 : 1
        :                         0;

    wheel_handler_factor
        = (e.shiftKey || (e.touches && e.touches.length >= 2)) ? 2
        : (e.ctrlKey  || (e.touches && e.touches.length >= 3)) ? 4
        : (e.altKey   || (e.touches && e.touches.length >= 4)) ? 8
        :                                                        1;
    wheel_delta *= wheel_handler_factor;

    let wheel_offset
        = wheelable_lit_node.parent_offset
        ? wheelable_lit_node.parent_offset + wheel_delta
        :                                    wheel_delta;
    wheel_offset = Math.max(0, wheel_offset);

if( log_this) log_key_val_group(    caller
                                , { e_type : e.type
                                    , wheel_handler_is_on_cooldown : wheel_handler_is_on_cooldown()
                                    , move_delta
                                    , wheel_delta
                                    , wheel_offset
                                }
                                , lbX[(10+wheel_offset)%10]
                                , true);

    /*}}}*/
    /* [return false] .. f(WHEEL HANDLER ON COOLDOWN) {{{*/
    if(wheel_offset && wheel_handler_is_on_cooldown()) /* no cooldown for null offset */
    {
        return false;
    }
    /*}}}*/
    /* ADJUST wheelable_lit_node.wheel_delta .. offset from selected xpath {{{*/
    if(wheel_offset >= 0)
    {
        if( wheel_handler_lit_node_offset(wheelable_lit_node, wheel_offset) )
            wheel_handler_time
                = new Date().getTime() % 86400000;
    }
    /*}}}*/
    /* or back to selected xpath {{{*/
    else {
        if(typeof wheelable_lit_node.parent_offset == "number")
        {
//lib_popup.log_popup_hide();

            wheelable_div_xpaths_child.classList.remove( "confirm" );
        }

        delete wheelable_lit_node.parent_offset;

        page_refresh(caller);
    }
    /*}}}*/
    return true;
};
/*}}}*/
/*_ wheel_handler_is_on_cooldown {{{*/
/*{{{*/
let wheel_handler_report;
let wheel_handler_time;
let wheel_handler_factor = 1;

/*}}}*/
let wheel_handler_is_on_cooldown = function()
{
/*{{{*/
let   caller = "wheel_handler_is_on_cooldown";
let log_this = xpath_content.options.LOG2_WHEEL;

/*}}}*/
    /* ellapsed time {{{*/
    let this_time = new Date().getTime() % 86400000;
    let delay
        = wheel_handler_time
        ? (this_time - wheel_handler_time)
        : 0;

    /*}}}*/
/*{{{*/
if(log_this)
{
    let this_handler_report
        = (delay && (delay < WHEEL_HANDLER_COOLDOWN))
        ?  ".. WHEEL HANDLER  ON COOLDOWN"
        :  ".. WHEEL HANDLER OFF COOLDOWN";

    if( this_handler_report != wheel_handler_report)
    {
        wheel_handler_report = this_handler_report;

        if(delay && (delay < WHEEL_HANDLER_COOLDOWN))
            logBIG(caller+": "+ this_handler_report+" .. delay=["+delay+"/"+WHEEL_HANDLER_COOLDOWN+" ms]", 2);
        else
            logBIG(caller+": "+ this_handler_report+" .. delay=["+delay+"/"+WHEEL_HANDLER_COOLDOWN+" ms]", 5);
    }
}
/*}}}*/
    /* return   (delay < WHEEL_HANDLER_COOLDOWN) {{{*/
    if(delay && (delay < WHEEL_HANDLER_COOLDOWN))
    {
        return caller+": delay=["+delay+"/"+WHEEL_HANDLER_COOLDOWN+" ms]";
    }
    else {
        return "";
    }
    /*}}}*/
};
/*}}}*/
/*}}}*/
/* LOG2_WHEEL {{{*/
/*_ wheel_start_from_last_div_xpaths_child {{{*/
let wheel_start_from_last_div_xpaths_child = function()
{
    let div_xpaths       = lib_util.get_tool("div_xpaths");
    let              num = div_xpaths.children.length - 1;
    let div_xpaths_child = div_xpaths.children[num];

//log("wheel_start_from_last_div_xpaths_child("+num+"): .. div_xpaths_child=["+lib_util.get_id_or_tag(div_xpaths_child)+"]")
//log(div_xpaths.children)

    if( div_xpaths_child )
        wheel_start_from_div_xpaths_child( div_xpaths_child );
};
/*}}}*/
/*_ wheel_start_from_div_xpaths_child {{{*/
let wheel_start_from_div_xpaths_child = function(div_xpaths_child)
{
/*{{{*/
let   caller = "wheel_start_from_div_xpaths_child"; /* eslint-disable-line no-unused-vars */
let log_this = xpath_content.options.LOG2_WHEEL;  /* eslint-disable-line no-unused-vars */

/*}}}*/
    /* RESELECT [div_xpaths_child] .. [xpath] {{{*/
    let user_offset_xpath = data_num_xpath_get_num_actual_user_xpath( div_xpaths_child.dataset.num );
    let prev_server_xpath = data_num_xpath_get_num_from_server_xpath( div_xpaths_child.dataset.num );

    /* REVERT TO [prev_server_xpath] */
    if(     prev_server_xpath && user_offset_xpath
        && (prev_server_xpath != user_offset_xpath)
      )
    {
        let data_num_xpath = data_num_xpath_get_xpath_entry(                                         prev_server_xpath);
        div_xpaths_child   = data_num_xpath_set_new_xpath  (false, data_num_xpath, div_xpaths_child, prev_server_xpath);
    }

    let             xpath = prev_server_xpath || user_offset_xpath;

    if(!xpath)
    {
        let msg = "USER ADJUST: REBUILDING OBSOLETE XPATH LIST";
        div_xpaths_rebuild( msg );

        logBIG(msg);
        return null;
    }
if( log_this) log_key_val(caller+": #"+div_xpaths_child.dataset.num+" .. xpath=["+xpath+"]", data_num_xpath_array[div_xpaths_child.dataset.num], lf4);
if( log_this) log("...data_num_xpath_array:", data_num_xpath_array);
    /*}}}*/
    /* SELECT WHEEL XPATH TARGET .. or [return null] {{{*/
    let lit_node = page_wheel_from_xpath( xpath );
    if( lit_node ) {
        wheelable_div_xpaths_child = div_xpaths_child;
        wheelable_div_xpaths_child.classList.add("selected" );
        wheelable_div_xpaths_child.classList.add("wheelable");
    }
    else {
        return null;
    }
    /*}}}*/
    /* USER OFFSET TARGET {{{*/

    wheel_start_from_lit_node(lit_node);

    let offset = 0;
    let initial_node = prev_server_xpath ? xpath_js.get_nodeXPath_target( prev_server_xpath ) : null;
    let current_node = user_offset_xpath ? xpath_js.get_nodeXPath_target( user_offset_xpath ) : null;
    if( current_node && initial_node)
    {
//console.log("initial_node: "+ xpath_js.get_nodeXPath(initial_node))
//console.log("current_node: "+ xpath_js.get_nodeXPath(current_node))

        let   el         = initial_node;
        while(el && (el != current_node)) {
            el     = el   .parentElement;
            offset += 1;
        }
//logBIG("offset=["+offset+"]")
    }
    /*}}}*/
    /* START WHEEL HANDLER on [lit_node] {{{*/
    wheel_handler_lit_node_offset(wheelable_lit_node, offset);

    return lit_node;
    /*}}}*/
};
/*}}}*/
/*_ wheel_start_from_lit_node {{{*/
let wheel_start_from_lit_node = function(wheelable_node)
{
/*{{{*/
let log_this = xpath_content.options.LOG2_WHEEL;

if( log_this) lib_log.log_sep_top("WHEEL START: "+xpath_js.get_nodeXPath(wheelable_node), 6, false);
/*}}}*/

    wheelable_target_xpath  = undefined;

    wheelable_node.classList.add("wheelable");

    div_mask_set_wheeling_title();

    wheel_add_listener( wheelable_node );
};
/*}}}*/

/*_ wheel_handler_lit_node_offset {{{*/
let wheel_handler_lit_node_offset = function(e_target,wheel_offset)
{
/*{{{*/
let   caller = "wheel_handler_lit_node_offset"; // eslint-disable-line no-unused-vars
let log_this = xpath_content.options.LOG2_WHEEL || xpath_content.options.LOG5_XPATH;

/*}}}*/
    /* cap wheel_offset below BODY {{{*/
    wheelable_lit_node.parent_offset = 0;

    let          offset_el = wheelable_lit_node;
    for(let i=0; offset_el.parentElement && (i<wheel_offset); ++i)
    {
        if(offset_el.parentElement.tagName == "BODY") break;

        wheelable_lit_node.parent_offset += 1;

        offset_el = offset_el.parentElement;
    }

    let offset_el_xpath  =  xpath_js.get_nodeXPath( offset_el );

    let same_as_lit_node = (offset_el       == wheelable_lit_node    );
    let same_as_previous = (offset_el_xpath == wheelable_target_xpath);

    if(!wheelable_target_xpath)
    {
        wheelable_target_xpath      = offset_el_xpath;

if( log_this) log("%c "+caller+"("+wheel_offset+") FROM %c"+wheelable_target_xpath
                  ,lbL+lf6                             ,lbR                       );
    }

    /*}}}*/
/*{{{
if( log_this)
    lib_log.log_key_val_group(      caller
                              , {   e_target
                                  , wheel_offset
                                  , offset_el_xpath
                                  , wheelable_target_xpath
                                  , offset_el
                                  , same_as_lit_node
                                  , same_as_previous
                              });
}}}*/
    /* WHEN REJECTED [return false] .. or HIGHLIGHT NEW [offset_el] {{{*/
    if(offset_el != wheelable_lit_node)
    {
        if( page_wheel_from_el_with_offset(offset_el, wheelable_lit_node.parent_offset) )
        {
            wheelable_target_xpath = offset_el_xpath;

if( log_this) log("%c "+caller+"("+wheel_offset+") FROM %c"+data_num_xpath_get_num_from_server_xpath(wheelable_div_xpaths_child.dataset.num)+"%c ➔ %c " + wheelable_target_xpath
                  ,lbL+lf3                             ,lbC                                                                               ,lbC+lf6,lbR+(same_as_lit_node ? lf8:(same_as_previous ? lf2:lf5)));

        }
        else {
if( log_this) log("%c "+caller+"("+wheel_offset+") SAME %c"+data_num_xpath_get_num_from_server_xpath(wheelable_div_xpaths_child.dataset.num)+"%c == %c "+ wheelable_target_xpath
                  ,lbC+lf8                             ,lbC                                                                               ,lbC+lf8,lbR+(same_as_lit_node ? lf8:(same_as_previous ? lf2:lf5)));
            return false;
        }
    }
    /*}}}*/
    /* SHOW [wheelable_target_xpath] {{{*/
    wheelable_target_xpath        = offset_el_xpath;

    let parent_tag_id_class_chain = lib_util.get_parent_tag_id_class_chain(offset_el);
    if( same_as_previous )
        lib_popup.log_popup_scrollTo_el_warn(parent_tag_id_class_chain, offset_el);
    else
        lib_popup.log_popup_follow_mask_el  (parent_tag_id_class_chain, offset_el);

    wheelable_div_xpaths_child.children[2].innerHTML = wheelable_target_xpath;
    /*}}}*/
//    /* SAME AS PREVIOUS {{{*/
//    if( same_as_previous )
//    {
////logXXX("SAME AS PREVIOUS")
//
//      //lib_popup.log_popup_hide();
//        return false;
//    }
//    /*}}}*/
    /* SAME AS LIT NODE  {{{*/
    if( same_as_lit_node )
    {
        wheelable_div_xpaths_child.classList.remove( "confirm" );
        return false;
    }
    else {
        wheelable_div_xpaths_child.classList.add   ( "confirm" );
        return true;
    }
    /*}}}*/
};
/*}}}*/
/*_ wheelable_target_xpath_get {{{*/
let wheelable_target_xpath_get = function()
{
    return wheelable_target_xpath;
};
/*}}}*/

/*_ wheel_stop_handler {{{*/
/*{{{*/
let wheel_stop_handler_time;

/*}}}*/
let wheel_stop_handler = function(e) // eslint-disable-line complexity
{
/* KEEP HANDLING WHEN MOVING TOOLS {{{*/
if(e.ctrlKey) return;
if(e. altKey) return;
let   caller = "wheel_stop_handler";
let log_this = xpath_content.options.LOG2_WHEEL;

    /* DRAGGING on touch-device instead of wheel handling */
    if( lib_util.get_touch_behavior() )
    {
        let has_moved = lib_util.get_has_moved_since_onDown_XY();

if( log_this && has_moved) log("%c"+caller+": .. has_moved=["+has_moved+"]", lbH+lf8);
        if( has_moved ) return;
    }

let e_target = lib_util.get_event_target(e);
if( log_this) logBIG(caller+"("+e.type+" "+lib_util.get_id_or_tag(e_target)+")", 6);
/*}}}*/
    /* REMOVE WHEEL LISTENERS and HIDE [div_mask] {{{*/
    wheel_del_listener();
    wheel_stop_handler_time = new Date().getTime() % 86400000;

if(log_this) lib_log.log_sep_bot("WHEEL STOP", 6);
    /*}}}*/
    /* TOOL: [wheelable_div_xpaths_child] {{{*/
    let div_xpaths_child  = wheelable_div_xpaths_child;
    if(!div_xpaths_child )
    {
        cancel_pending_event(e_target);

        return;
    }
    /*}}}*/
    /* TOOL: [cmd] .. ([+] or [X] ➔ ADD or DELETE) {{{*/
    let cmd = "";
    if(e_target == div_xpaths_child.firstElementChild)
    {
        cmd = div_xpaths_child.classList.contains(config.CMD_CONFIRM) ? config.CMD_CONFIRM
            : div_xpaths_child.classList.contains(config.CMD_DELETE ) ? config.CMD_DELETE
            : div_xpaths_child.classList.contains(config.CMD_ADD    ) ? config.CMD_ADD
            :                                                           "";

    }
    /*}}}*/
    /* TOOL: UPDATE XPATH {{{*/
    let             xpath = div_xpaths_child.dataset.xpath;
    let    data_num_xpath = data_num_xpath_get_xpath_entry( xpath );
    if(   !data_num_xpath ) return;

    let em_xpath          = div_xpaths_child.children[2];
    em_xpath.innerHTML    = data_num_xpath.xpath;

    /*}}}*/
/*{{{*/
if(log_this) log_key_val_group(caller
                               , {   prev_server_xpath : data_num_xpath.prev_server_xpath
                                   ,                     wheelable_target_xpath
                                   , from_server       : data_num_xpath.from_server
                                   , div_xpaths_child  : lib_util.strip_HTML(div_xpaths_child.innerHTML)
                                   ,  em_xpath         : lib_util.strip_HTML(em_xpath        .innerHTML)
                                   ,                     cmd
                                   , e_target          : lib_util.get_id_or_tag(e_target)
                                   , e_target_xpath    : xpath_js.get_nodeXPath(e_target)
                                   , callers           : lib_log .get_callers()
                               }, lf0, true);

/*}}}*/
    /* WHEN CONFIRMED: REPLACE [data_num_xpath] {{{*/
    let confirming_click = cmd && wheelable_target_xpath;
    if( confirming_click )
    {
        wheel_confirmed_click(wheelable_div_xpaths_child, cmd, data_num_xpath, wheelable_target_xpath);

    }
    /*}}}*/
    /* WHEEL DONE {{{*/
    else {
if(log_this) logBIG("WHEEL XPATH NOT CONFIRMED", 2);

    }
    /*}}}*/
    cancel_pending_event( div_xpaths_child );

    page_refresh(caller);

    /* MAY START ADJUSTING XPATH OF A CLICKED div_xpaths_child (220101) */
    div_xpaths_click_handler(e_target,e);

if(log_this) lib_log.log_sep_bot("WHEEL STOP ["+cmd+"]", 6);
};
/*}}}*/
/*_ wheel_stop_handler_is_on_cooldown {{{*/
/*{{{*/
let WHEEL_DEL_LISTENER_COOLDOWN = 250;

let wheel_div_xpaths_child;
/*}}}*/
let wheel_stop_handler_is_on_cooldown = function(div_xpaths_child,log_this)
{
    if(!wheel_stop_handler_time) return "";

    if(wheel_div_xpaths_child   != div_xpaths_child)
    {
if(log_this) log("%c NO WHEEL COOLDOWN FOR ["+lib_util.get_id_or_tag(div_xpaths_child)+"] ➔➔➔ WHEELING WAS FOR ["+lib_util.get_id_or_tag(wheel_div_xpaths_child)+"]", lbH+lf8);

        return "";
    }

    let this_time = new Date().getTime() % 86400000;

    let     delay = (this_time - wheel_stop_handler_time);
if( log_this) log("wheel_stop_handler_is_on_cooldown: ...delay=["+delay+"]");

    if(     delay < WHEEL_DEL_LISTENER_COOLDOWN)
        return "...ON WHEEL COOLDOWN ["+delay+"ms] FOR ["+lib_util.get_id_or_tag(wheel_div_xpaths_child)+"]";
    else
        return "";
};
/*}}}*/
/*_ wheel_confirmed_click {{{*/
let wheel_confirmed_click = function(div_xpaths_child,cmd,data_num_xpath,wheelto_xpath)
{
/*{{{*/
let   caller = "wheel_confirmed_click";
let log_this = xpath_content.options.LOG2_WHEEL;

if( log_this) logBIG(caller+"(cmd=["+cmd+"])");
/*}}}*/
    /* SERVER [delete] REPLACED XPATH .. f(from_server) {{{*/
    if(data_num_xpath.from_server)
    {
if(log_this || xpath_content.options.LOG1_STEP  ) logBIG("WHEEL: SERVER [delete] [" + data_num_xpath.xpath  +"]", 2);

        xpath_content.send_xpath_cmd(data_num_xpath.xpath, config.CMD_DELETE, "WHEEL OFFSET");
    }
    /*}}}*/
    /* SERVER [add] or [delete] NEW XPATH .. f(wheelto_xpath) {{{*/
    if((cmd == config.CMD_ADD) || (cmd == config.CMD_DELETE))
    {
if(xpath_content.options.LOG3_SERVER) logBIG("WHEEL: SERVER ["+cmd+"] ["+ wheelto_xpath      +"]", 4);

        xpath_content.send_xpath_cmd(       wheelto_xpath, cmd     , "WHEEL CONFIRM");
    }
    /*}}}*/
    /* XPATH f(wheelto_xpath) {{{*/

    if((cmd == config.CMD_CONFIRM) || (cmd == config.CMD_ADD))
    {
if(log_this || xpath_content.options.LOG1_STEP  ) logBIG("WHEEL: PAGE   [select] [" + wheelto_xpath      +"]", 5);

        div_xpaths_child = data_num_xpath_set_new_xpath(false, data_num_xpath, div_xpaths_child, wheelto_xpath);
    }
    /*}}}*/
};
/*}}}*/

/*_ wheel_clr_wheelable {{{*/
let wheel_clr_wheelable = function()
{
    if(!document.body) return;
/*{{{*/
let   caller = "wheel_clr_wheelable";
let log_this = xpath_content.options.LOG2_WHEEL;

//if( log_this) logBIG(caller, 0);
/*}}}*/
    /* GUI TOOL {{{*/
    let something_cleared           = "";

    if(wheelable_lit_node         ) { wheelable_lit_node     = undefined;  something_cleared = "wheelable_lit_node"    ; }
    if(wheelable_target_xpath     ) { wheelable_target_xpath = undefined;  something_cleared = "wheelable_target_xpath"; }
    if(wheelable_div_xpaths_child )
    {
        wheelable_div_xpaths_child.classList.remove("wheelable");
        something_cleared          += lib_util.get_id_or_tag( wheelable_div_xpaths_child );

        wheelable_div_xpaths_child  = undefined;
    }
    /*}}}*/
    /* PAGE TARGET {{{*/
    let wheelable_node              = document.querySelector(".wheelable");
    if( wheelable_node )
    {
        something_cleared          += " ➔ "+ xpath_js.get_nodeXPath( wheelable_node );

        wheelable_node.classList.remove("wheelable");
    }

    if(document.body.title == BODY_WHEEL_TITLE)
    {
        /*..*/ document.body.title  = document.body.title_saved;
        delete document.body.title_saved;
    }
    /*}}}*/
if(log_this && something_cleared) log("%c"+caller+"%c"+something_cleared, lbL+lf6, lbR+lf6);
};
/*}}}*/
/*}}}*/
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ PAGE                                                                       │
//└────────────────────────────────────────────────────────────────────────────┘
/*{{{*/
    //┌──────────────────────────────────────────────┐
    //│ MASK ....................................... │
    //└──────────────────────────────────────────────┘
/*{{{*/
/*{{{*/
let div_mask;

/*}}}*/
/*_ div_mask_get {{{*/
let div_mask_get = function()
{
    if(!div_mask) {
        div_mask = lib_popup.div_mask_get();

        lib_popup.div_mask_addEventListener("click", div_mask_onclick_handler);
    }
    return div_mask;
};
/*}}}*/
/*_ div_mask_set_wheeling_title {{{*/
let div_mask_set_wheeling_title = function()
{
    document.body.title_saved = document.body.title;
    document.body.title = BODY_WHEEL_TITLE;
};
/*}}}*/
/*_ div_mask_onclick_handler {{{*/
let div_mask_onclick_handler = function(e)
{
/*{{{*/
let caller = "div_mask_onclick_handler"; // eslint-disable-line no-unused-vars
let log_this = (xpath_content.options.LOG3_MASK || xpath_content.options.LOG1_EVENT);

if( log_this) logBIG("div_mask_onclick_handler: div_mask", 9);
/*}}}*/
    div_mask_onclick_preventDefault(e);
    /* HIDE [div_mask] {{{*/
    lib_util.cancel_event(e);
    lib_popup.log_popup(null);

    lib_popup.div_mask_hide();
    /*}}}*/
    /* 1/2 DIV_MASK CURRENT ACTION: USER SINGLE XPATH SELECTION {{{*/
    if( div_outline_pick_button_clicked )
    {
        let    left = e.x;
        let     top = e.y;

        div_mask_onclick_add_xpath_at_XY(left,top);
    }
    /*}}}*/
    /* 2/2 DIV_MASK CURRENT ACTION: WHEELING {{{*/
    else {
        wheel_stop_handler(e);

    }
    /*}}}*/
};
/*}}}*/
/*_ div_mask_onclick_preventDefault {{{*/
let div_mask_onclick_preventDefault = function(e)
{
    if(e.cancelable)
    {
        if( e.stopPropagation          ) e.stopPropagation         (); /* capturing and bubbling phases */
        if( e.stopImmediatePropagation ) e.stopImmediatePropagation(); /* other listeners of the same event */
        if( e.preventDefault           ) e.preventDefault          (); /* browser agent default .. (checkbox toggle) */
    }
};
/*}}}*/
/*_ div_mask_onclick_add_xpath_at_XY {{{*/
let div_mask_onclick_add_xpath_at_XY = function(left,top)
{
/*{{{*/
let caller = "div_mask_onclick_add_xpath_handler";
let log_this = (xpath_content.options.LOG3_MASK || xpath_content.options.LOG1_EVENT);

if( log_this) logBIG(caller);
/*}}}*/
    /* NEW XPATH AT XY {{{*/
    let new_num = data_num_xpath_get_new_num();

    let data_num_xpath      = data_num_xpath_add_at_XY(new_num, left, top);
    /*}}}*/
    /* NO  [data_num_xpath] {{{*/
    if(!data_num_xpath )
    {
if( log_this) log("...NO [data_num_xpath]");

        return;
    }
    /*}}}*/
    /* OLD [data_num_xpath] {{{*/
    if( data_num_xpath.num != new_num)
    {
if( log_this) log("...%c OLD [data_num_xpath]%c#"+data_num_xpath.num,lbL+lf8, lbb+lbR+lfX[data_num_xpath.num % 10]);

        return;
    }
    /*}}}*/
    /* LOG DOT {{{*/
    let outline_log_dot = get_option("outline_log_dot");
    if( outline_log_dot ) outline_dots_add_num_at_XY(new_num, Math.round(left), Math.round(top));

    /*}}}*/
//    /* MOUSE WHEEL HINT POPUP {{{*/
//    let div_xpaths = lib_util.get_tool("div_xpaths");
//    if(!div_xpaths.title)
//        div_xpaths
//            .title = ""
//            +"CLICK A COLORED TOOL ENTRY\n"
//            +"TO SELECT A PARENT CONTAINER\n"
//            +"USING THE MOUSE WHEEL";
//
//    let xy = {   x: div_xpaths.clientLeft + div_xpaths.clientWidth , y: div_xpaths.offsetTop };
//    lib_popup.log_popup(div_xpaths.title, xy);
//    /*}}}*/

    div_xpaths_rebuild("USER ADD [div_mask] CLICK");

    sampling_check_button_sample_add_or_clear();

    page_refresh();

    wheel_start_from_last_div_xpaths_child();
};
/*}}}*/
/*}}}*/

    //┌──────────────────────────────────────────────┐
    //│ OUTLINE .....................[DOTS] [FRAMES] │
    //└──────────────────────────────────────────────┘
/*{{{*/
let outline_dots = [];
let outline_dots_used_since_t_outline_clear = 0;

let outline_frames = [];
/*}}}*/
/* outline_frames {{{*/
/*_ outline_frames_add_el_at_XY {{{*/
let outline_frames_add_el_at_XY = function(el,top_left,num)
{
/*{{{*/
let caller = "outline_frames_add_el_at_XY";
let log_this = xpath_content.options.LOG4_FRAMES;

/*}}}*/

    /* OUTLINED ALREADY {{{*/
    for(let i=0; i < outline_frames.length; ++i)
        if(    el == outline_frames[i].outlined_el) return;

    /*}}}*/
if( log_this) log(caller+"("+lib_util.get_id_or_tag(el)+", XY=["+top_left.x+" "+top_left.y+"] , num=["+num+"])");
    /* ADD AN OUTLINING FRAME {{{*/
    let div = document.createElement("DIV");
    lib_util.add_el_class(div, "outline_frame");

    div.outlined_el           = el;

    div.style.top             = (top_left.y     -     div.style.borderWidth) +"px";
    div.style.left            = (top_left.x     -     div.style.borderWidth) +"px";
    div.style.width           = (el.offsetWidth + 2 * div.style.borderWidth) +"px";
    div.style.height          = (el.offsetHeight+ 2 * div.style.borderWidth) +"px";

    div.style.zIndex          = el.style.zIndex + 1;
/*
    div.style.borderColor     = COLORX[num % 10];
*/
    div.style.outlineColor    = COLORX[num % 10];
    div.style.display         = "block";

    outline_frames.push(div);
    /*}}}*/
};
/*}}}*/
/*_ outline_frames_show {{{*/
let outline_frames_show = function()
{
/*{{{*/
let caller = "outline_frames_show";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) log(caller+": outline_frames.length=["+outline_frames.length+"]");
if( log_this ) {
    for(let i=0; i < outline_frames.length; ++i)
    {
        console.log((i+1)+" "+xpath_js.get_nodeXPath(outline_frames[i]));
        console.log(                                 outline_frames[i] );
        console.dir(                                 outline_frames[i] );
    }
}
/*}}}*/
    let outline_log_frame = get_option("outline_log_frame");
    if(!outline_log_frame ) return;

    /* batched until after get_range_from_caret is done looking for target elements */
    for(let i=0; i < outline_frames.length; ++i)
    {
        document.documentElement.appendChild( outline_frames[i] );
    }

};
/*}}}*/
/*_ outline_frames_clear {{{*/
let outline_frames_clear = function()
{
/*{{{*/
let caller = "outline_frames_clear";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) log("%c"+caller+": outline_frames.length=["+outline_frames.length+"]", lbH+lf1);
/*}}}*/

    for(let i=0; i < outline_frames.length; ++i)
    {
        let div = outline_frames[i];
        if( div.parentElement )
            div.parentElement.removeChild( outline_frames[i] );
    }

    outline_frames.splice(0); // NO MUTATION
};
/*}}}*/
/*_ outline_frames_has_some {{{*/
let outline_frames_has_some = function()
{
/*{{{*/
let caller = "outline_frames_has_some";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) log("%c"+caller+": outline_frames.length=["+outline_frames.length+"]", lbH+lf0);
/*}}}*/
    return outline_frames.length;
};
/*}}}*/
/*}}}*/
/* outline_dots {{{*/
/*_ outline_dots_add_num_at_XY {{{*/
let outline_dots_add_num_at_XY = function(num,left,top)
{
/*{{{*/
let caller = "outline_dots_add_num_at_XY";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) log("%c"+caller+"("+num+" , "+left+" , "+top+")", lbH+lf3);
/*}}}*/
    /* new dot {{{*/
    let dot_div = outline_dots[outline_dots_used_since_t_outline_clear];
    if(!dot_div) {
        dot_div = document.createElement("DIV");
        lib_util.add_el_class(dot_div, "outline_dot");
        outline_dots[outline_dots_used_since_t_outline_clear] = dot_div;
    }

    outline_dots_used_since_t_outline_clear += 1;
    /*}}}*/
    /* show dot_div {{{*/
    dot_div.style.top             = (window.scrollY + top )+"px";
    dot_div.style.left            = (window.scrollX + left)+"px";

    dot_div.style.backgroundColor = COLORX[num % 10];
    dot_div.style.display         = "block";

    dot_div.innerHTML             = outline_dots_used_since_t_outline_clear + "<br>XY<br>"+left+" "+top;

    /*}}}*/
};
/*}}}*/
/*_ outline_dots_show {{{*/
let outline_dots_show = function()
{
    /* batched until after get_range_from_caret is done looking for target elements */
    for(let i=0; i < outline_dots.length; ++i)
        document.documentElement.appendChild( outline_dots[i] );

};
/*}}}*/
/*_ outline_dots_clear {{{*/
let outline_dots_clear = function()
{
/*{{{*/
let caller = "outline_dots_clear";
let log_this = xpath_content.options.LOG4_FRAMES;

if( log_this) log("%c"+caller+": outline_dots.length=["+outline_dots.length+"]", lbH+lf1);
/*}}}*/
    for(let i=0; i < outline_dots.length; ++i)
    {
        if( outline_dots[i].parentElement )
            outline_dots[i].parentElement.removeChild( outline_dots[i] );

    }
    outline_dots.splice(0); // NO MUTATION

    outline_dots_used_since_t_outline_clear = 0;
};
/*}}}*/
/*}}}*/
/*➔ outline_clear_all {{{*/
let outline_clear_all = function(_caller)
{
    if(!lib_util.get_tool("div_xpaths")) return;
//  if(!lib_util.get_tool("div_tools" )) return;

    /* CLEAR ALL PAGE XPATH TARGETS */
    page_hide_srv_xpath_targets(_caller);

    /* clear GUI */
    sampling_2_clear();
};
/*}}}*/

    //┌──────────────────────────────────────────────┐
    //│ TARGET ........ [xpath_target] [lit] [bg0-9] │
    //└──────────────────────────────────────────────┘
/*{{{*/
/*_ page_hide_srv_xpath_targets {{{*/
let page_hide_srv_xpath_targets = function(_caller)
{
/*{{{*/
let caller = "page_hide_srv_xpath_targets";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller+"("+_caller+")", 2);
/*}}}*/
    let            el_array = document.querySelectorAll(".xpath_target");
    for(let i=0; i<el_array.length; ++i)
    {
        let el    =el_array[i];
        page_clr_el_xpath_target_bg( el );
    }

    cancel_pending_event();
    page_wheel_clr_lit_nodes();
    page_wheel_clr_add_nodes();

};
/*}}}*/
/*_ page_clr_el_xpath_target_bg {{{*/
let page_clr_el_xpath_target_bg = function(el)
{
    el.classList.remove("xpath_target");

    page_clr_el_bg( el );
    if(div_mask)
        page_clr_el_bg(div_mask);
};
/*}}}*/

/*_ page_show_srv_xpath_targets {{{*/
let page_show_srv_xpath_targets = function()
{
/*{{{*/
let caller = "page_show_srv_xpath_targets";
let log_this = xpath_content.options.LOG5_XPATH || xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller, 4);
/*}}}*/
    for(let i=0; i < data_num_xpath_array.length; ++i)
    {
        let data_num_xpath = data_num_xpath_array[i];
        if( data_num_xpath.from_server )
            page_set_srv_xpath_target_bgnum(data_num_xpath.xpath, data_num_xpath.num);
    }
};
/*}}}*/
/*_ page_set_srv_xpath_target_bgnum {{{*/
let page_set_srv_xpath_target_bgnum = function(xpath,bgnum)
{
/*{{{*/
let caller = "page_set_srv_xpath_target_bgnum";
let log_this = xpath_content.options.LOG5_XPATH || xpath_content.options.LOG5_XPATH;

if( log_this) log("%c"+caller+" %c"+xpath, lb5, lbX[(bgnum % 10)]);
/*}}}*/
    let el = xpath_js.get_nodeXPath_target    (xpath  ); /* find page element */
    if( el )
    {
        el.classList.add( "xpath_target"  ); /* highlight element */
        el.classList.add( "bg"+(bgnum % 10) ); /* colorize  element */
    }
};
/*}}}*/

/*_ page_show_usr_xpath_targets {{{*/
let page_show_usr_xpath_targets = function(_caller)
{
/*{{{*/
let caller = "page_show_usr_xpath_targets";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller+"("+_caller+")", 4);
/*}}}*/

    let div_xpaths = lib_util.get_tool("div_xpaths");
    if(!div_xpaths) return;
    for(let i=0; i< div_xpaths.children.length; ++i)
    {
        let div_xpaths_child = div_xpaths.children[i];
        if( div_xpaths_child.classList.contains(config.CMD_ADD) )
        {
            let            xpath = div_xpaths_child.dataset.xpath;
            let   data_num_xpath = data_num_xpath_get_xpath_entry( xpath );

            page_set_usr_xpath_target_bgnum(xpath, data_num_xpath.num);
        }
    }
};
/*}}}*/
/*_ page_set_usr_xpath_target_bgnum {{{*/
let page_set_usr_xpath_target_bgnum = function(xpath,bgnum)
{
/*{{{*/
let caller = "page_set_usr_xpath_target_bgnum";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) log("%c"+caller+" %c"+xpath, lf5, lfX[(bgnum % 10)]);
/*}}}*/
    let el = xpath_js.get_nodeXPath_target( xpath ); /* find page element */
    if( el )
    {
        el.classList.add( "bg"+(bgnum % 10) ); /* colorize  element */
    }
};
/*}}}*/

/*_ page_wheel_from_xpath {{{*/
let page_wheel_from_xpath = function(xpath)
{
/*{{{*/
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG("page_wheel_from_xpath("+xpath+")", 2);
/*}}}*/

    let lit_node = xpath_js.get_nodeXPath_target( xpath );

    if(!lit_node || !lit_node.parentElement)
    {
        lib_popup.log_popup_warn("MISSING NODE:\n➔ "+xpath);

        return null;
    }

    if( lit_node.parentElement.tagName == "BODY")
    {
        page_wheel_warn(lit_node, "THIS IS A BODY DIRECT CHILD");

        return null;
    }
    else {
        return page_wheel_from_el_with_offset(lit_node, 0);
    }
};
/*}}}*/
/*_ page_wheel_warn {{{*/
let page_wheel_warn = function(offset_el,msg)
{
    let node_description
//      = lib_util.get_id_or_tag_and_className  ( offset_el )
//      + "\n\n"
        = lib_util.get_parent_tag_id_class_chain( offset_el )
    ;

    lib_popup.log_popup_scrollTo_el_warn(msg+"\n➔ "+node_description, offset_el);
};
/*}}}*/
/*_ page_wheel_from_el_with_offset {{{*/
let page_wheel_from_el_with_offset = function(offset_el,parent_offset)
{
/*{{{*/
let caller = "page_wheel_from_el_with_offset";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller+"("+lib_util.get_id_or_tag(offset_el)+" , parent_offset=["+parent_offset+"])", 3);
//log_caller()
/*}}}*/
    /* REJECT [NOT VISIBLE PAGE NODE] {{{*/
    if( !lib_util.is_el_visible(offset_el) )
    {
        page_wheel_warn(offset_el, "▲"+ parent_offset +" NODE IS NOT VISIBLE");

        return null;
    }
    /*}}}*/
    /* REJECT [SRV KNOWN XPATH] .. [xpath_target] {{{*/
    if(parent_offset && offset_el.classList.contains("xpath_target") && parent_offset)
    {
        page_wheel_warn(offset_el, "▲"+ parent_offset +" NODE IS ALREADY AN [xpath_target] ");

        return null;
    }
    /*}}}*/
    /* REJECT [OTHER GUI TARGETTED XPATH] .. f([delete] OR [add] CANDIDATES){{{*/
    let            xpath = xpath_js.get_nodeXPath( offset_el );
    let div_xpaths_child = div_xpaths_child_for_xpath( xpath );
//console.log("..........div_xpaths_child=["+lib_util.get_id_or_tag(div_xpaths_child          )+"]")
//console.log("wheelable_div_xpaths_child=["+lib_util.get_id_or_tag(wheelable_div_xpaths_child)+"]")
    if(parent_offset && div_xpaths_child && (div_xpaths_child != wheelable_div_xpaths_child))
    {
        let div_xpaths_child_type
        =   div_xpaths_child.classList.contains(config.CMD_DELETE) ? config.CMD_DELETE
        :   div_xpaths_child.classList.contains(config.CMD_ADD   ) ? config.CMD_ADD
        :   div_xpaths_child.classList;

        page_wheel_warn(offset_el, "▲"+ parent_offset +" NODE IS A ["+div_xpaths_child_type+"] TARGET");

        return null;
    }
    /*}}}*/
    /* ACCEPT AND HIGHLIGHT [offset_el] {{{*/
    page_wheel_lit_offset_el_bgnum(offset_el,parent_offset);

    return offset_el;
    /*}}}*/
};
/*}}}*/
/*_ page_wheel_lit_offset_el_bgnum {{{*/
let page_wheel_lit_offset_el_bgnum = function(offset_el,parent_offset)
{
/*{{{*/
let caller = "page_wheel_lit_offset_el_bgnum";
let log_this = xpath_content.options.LOG5_XPATH;

if( log_this) logBIG(caller+"("+lib_util.get_id_or_tag(offset_el)+" , parent_offset=["+parent_offset+"])", 4);
/*}}}*/

    page_wheel_clr_lit_nodes();

    /* PAGE ELEMENT */
    offset_el.classList.add(   "lit"                   );
    offset_el.classList.add(   "bg"+(parent_offset % 10));

    /* [div_mask] .. COLORIZE MASK HOLE */
    if( div_mask ) {
        div_mask.classList.add("bg"+(parent_offset % 10));
        page_clr_el_bg(div_mask);
    }

};
/*}}}*/
/*_ page_wheel_clr_lit_nodes {{{*/
let page_wheel_clr_lit_nodes = function()
{
/*{{{*/
let caller = "page_wheel_clr_lit_nodes";
let log_this = xpath_content.options.LOG5_XPATH;

/*}}}*/
    let             el_array = document.querySelectorAll(".lit");
if( log_this && el_array.length) logBIG(caller+": .lit x"+el_array.length, 5);

    for(let i=0; i<el_array.length; ++i)
    {
        el_array[i].classList.remove("lit");

        page_clr_el_bg( el_array[i] );                   /* lit nodes have a bg class to be cleared */
    }
};
/*}}}*/
/*_ page_wheel_clr_add_nodes {{{*/
let page_wheel_clr_add_nodes = function()
{
/*{{{*/
let caller = "page_wheel_clr_add_nodes";
let log_this = xpath_content.options.LOG5_XPATH;

/*}}}*/
    let             el_array = document.querySelectorAll(".bg0,.bg1,.bg2,.bg3,.bg4,.bg5,.bg6,.bg7,.bg8,.bg9");
if( log_this && el_array.length) logBIG(caller+": .lit x"+el_array.length, 4);

    for(let i=0; i<el_array.length; ++i)
        page_clr_el_bg( el_array[i] );
};
/*}}}*/
/*_ page_clr_el_bg {{{*/
let page_clr_el_bg = function(el)
{
    el.classList.remove("bg0");
    el.classList.remove("bg1");
    el.classList.remove("bg2");
    el.classList.remove("bg3");
    el.classList.remove("bg4");
    el.classList.remove("bg5");
    el.classList.remove("bg6");
    el.classList.remove("bg7");
    el.classList.remove("bg8");
    el.classList.remove("bg9");
};
/*}}}*/
/*}}}*/

/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ SERVER RESPONSE                                                            │
//└────────────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*_ add_or_delete_server_response_handler {{{*/
let add_or_delete_server_response_handler = function(response,message_object) // eslint-disable-line complexity
{
/*{{{*/
let caller = "add_or_delete_server_response_handler";
let log_this = xpath_content.options.LOG3_SERVER;

if( log_this) logBIG(caller);
if( log_this) console.log("response:");
if( log_this) console.log( response  );
if( log_this) console.log("message_object:");
if( log_this) console.log( message_object  );
//if( log_this) log_key_val_group(caller, {response , message_object});
/*}}}*/
    /* [data_num_xpath] {{{*/
    let data_num_xpath = data_num_xpath_get_xpath_entry( message_object.xpath );
    if(!data_num_xpath )
    {
if(log_this || xpath_content.options.LOG3_SERVER) logBIG("SERVER ["+message_object.cmd+"] .. [data_num_xpath] NOT FOUND", 2);

        data_num_xpath_get_xpath_entry( message_object.xpath, log_this);
        return;
    }
//console.dir(data_num_xpath)
    /*}}}*/
    /* [div_xpaths_child] {{{*/
    let div_xpaths_child;

    /* update tool display */
    let                  div_xpaths = lib_util.get_tool("div_xpaths");

    let    user_offset_xpath;
    let    prev_server_xpath;
    for(let i=           div_xpaths.children.length - 1; i>=0; --i)
    {
        let       div  = div_xpaths.children[i];
/*{{{
console.log("div_xpaths.children["+i+"].dataset:")
console.log( div.dataset)
}}}*/
        prev_server_xpath         = data_num_xpath_get_num_from_server_xpath( div.dataset.num );
        user_offset_xpath         = data_num_xpath_get_num_actual_user_xpath( div.dataset.num );
        if(   (user_offset_xpath == message_object.xpath)
           || (prev_server_xpath == message_object.xpath)
          ) {
            div_xpaths_child = div;

            break;
        }
    }
/*{{{
console.log("message_object:"     )
console.dir( message_object       )
console.log("div_xpaths.children:")
console.dir( div_xpaths.children  )
}}}*/
    /*}}}*/
    /* [NOT FOUND] .. (client-server mismatch) {{{*/
    if( !div_xpaths_child )
    {
if(log_this || xpath_content.options.LOG3_SERVER) logBIG("SERVER ["+message_object.cmd+"] RESPONSE: [div_xpaths_child] NOT FOUND", 3);

        return;
    }
    /*}}}*/
    /* [prev_server_xpath] OR [user_offset_xpath] {{{*/
    else {
        if(     prev_server_xpath == message_object.xpath)
        {
if(log_this || xpath_content.options.LOG3_SERVER) logBIG("SERVER ["+message_object.cmd+"] prev_server_xpath", 5);

        }
        else if(user_offset_xpath == message_object.xpath)
        {
if(log_this || xpath_content.options.LOG3_SERVER) logBIG("SERVER ["+message_object.cmd+"] user_offset_xpath", 4);

        }
    }
    /*}}}*/
    /* DELETE FROM SERVER XPATH {{{*/
    let    consumed_by;
    if(    data_num_xpath.from_server
       && (message_object.cmd == config.CMD_DELETE)
      ) {
if(log_this || xpath_content.options.LOG1_STEP) xpath_content.log_query_step("XPATH DELETED", message_object.xpath);

        outline_delete_xpath( div_xpaths_child.dataset.xpath );

        div_xpaths_rebuild("FROM SERVER: cmd=["+message_object.cmd+"]");

        consumed_by = message_object.cmd;
    }
    /*}}}*/
    /* ADD FROM SERVER XPATH {{{*/
    else if(message_object.cmd == config.CMD_ADD)
    {
        let description
            = (data_num_xpath.xpath         == message_object.xpath)
            ?                  "NEW XPATH ➔ ["+message_object.xpath+"]"
            : "["+data_num_xpath.xpath+"] ➔ ["+message_object.xpath+"]"
        ;

        div_xpaths_child = data_num_xpath_set_new_xpath(true, data_num_xpath, div_xpaths_child, message_object.xpath);

        div_xpaths_rebuild("FROM SERVER: cmd=["+message_object.cmd+"]");

        consumed_by = message_object.cmd;

if(log_this || xpath_content.options.LOG1_STEP) xpath_content.log_query_step("XPATH ADDED", description);
    }
    /*}}}*/
    /* [DEFAULT] {{{*/
    if(!consumed_by)
        div_xpaths_rebuild("FROM SERVER: cmd=["+message_object.cmd+"]");

    /*}}}*/
};
/*}}}*/
/*_ outline_delete_xpath {{{*/
let outline_delete_xpath = function(xpath)
{
    data_num_xpath_remove_xpath( xpath );
    div_xpaths_remove_xpath    ( xpath );
};
/*}}}*/
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ OPTIONS                                                                   │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
let get_option = function(key    ) { let val = xpath_content.get_option(key    ); return val; };
let set_option = function(key,val) {           xpath_content.set_option(key,val);             };

/*}}}*/

/* EXPORT {{{*/
    return { name : XPATH_OUTLINE_JS_TAG

        ,    set_config
        //┌───────┐
        //│ EVENT │
        //└───────┘
        ,    outline_clear_all
        ,    cancel_pending_event

        ,    outline_dots_toggle_handler
        ,    outline_frames_toggle_handler
        ,    outline_option_toggle_e_target

        ,    pick_xpath_e_target
        ,    sampling_pick_some_xpath
        ,    div_xpaths_click_handler
        ,    data_num_xpath_delete_all

        //┌────────┐
        //│ SERVER │
        //└────────┘
        ,    add_or_delete_server_response_handler
        ,    data_num_xpath_load_array

        //┌────────┐
        //│ GUI    │
        //└────────┘
        ,    div_xpaths_sync_GUI

    };
/*}}}*/
}());

