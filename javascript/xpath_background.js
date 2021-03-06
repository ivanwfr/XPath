// ┌───────────────────────────────────────────────────────────────────────────┐
// │ xpath_background.js ................................... BACKGROUND SCRIPT │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console, chrome, setTimeout */
/* globals XMLHttpRequest */
/* globals FileReader */
/* globals lib_log, lib_util  */
/* globals config_js */

/* exported XPATH_BACKGROUND_SCRIPT_TAG */

/* eslint-disable no-warning-comments */

const XPATH_BACKGROUND_SCRIPT_ID    = "xpath_background";
const XPATH_BACKGROUND_SCRIPT_TAG   =  XPATH_BACKGROUND_SCRIPT_ID  +" (220106:16h:17)";
/*}}}*/
let xpath_background    = (function() {
"use strict";

// ┌───────────────────────────────────────────────────────────────────────────┐
// │  LOG STATE STORAGE IMAGES ............................................... │
// └───────────────────────────────────────────────────────────────────────────┘
/*{{{*/
const ICON_ACTIVATE = "images/icon_48.png";
const ICON_UNLOADED = "images/icon_48_unloaded.png";

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
    , log_object_JSON
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
    log_object_JSON                     = lib_log.log_object_JSON;
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
    // │ CONFIG [config.json] ................................. chrome.runtime │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
/*{{{*/
/* eslint-disable no-unused-vars */
/* eslint-disable quotes         */
const CONFIG_JSON     = "config.json";
const CONFIG_DEV_JSON = "config_dev.json";

const CONFIG_TXT      = '{ "SERVER_URL"      : "http://localhost:83"'
                      + ', "TEXT_LEN_MAX"    :  96'

                      + ', "CMD_DOMAINS"     : "domains"'
                      + ', "CMD_URLS"        : "urls"'
                      + ', "CMD_XPATHS"      : "xpaths"'
                      + ', "CMD_TAXONOMY"    : "taxonomy"'

                      + ', "CMD_ADD"         : "add"'
                      + ', "CMD_DELETE"      : "delete"'

                      + ', "ACTION_REPLACED" : "replaced"'
                      + '}';

/* eslint-enable no-unused-vars */
/* eslint-enable quotes         */

let config = {};
/*}}}*/
// options.LOG3_SERVER
/*➔ load_config_json {{{*/
let load_config_json = function()
{
/*{{{*/
let log_this = options.LOG3_SERVER;

if( log_this) log_sep_top("CONFIG ["+XPATH_BACKGROUND_SCRIPT_TAG+"]", 1);
/*}}}*/
    load_localStorage();

    // START WITH STATIC ATTRIBUTES
//console.log(   "CONFIG_TXT:")
//console.log("["+CONFIG_TXT+"]")
        config = JSON.parse(CONFIG_TXT);
if( log_this) log_key_val("CONFIG_TXT ➔ config", config, 1);

    // #1 CONFIG_DEV_JSON (FIRST)
    if( chrome.runtime.getPackageDirectoryEntry )
    {
        config.file_name = CONFIG_DEV_JSON;
        chrome.runtime.getPackageDirectoryEntry(function (dirEntry) {
            dirEntry.getFile(config.file_name, undefined, getFile_successCallback, load_config_json_PROD);
            //______________ PATH____________, OPTIONS__, SUCCESSCALLBACK________, ERRORCALLBACK
        });
    }
};
/*}}}*/
/*➔ load_config_json_PROD {{{*/
let load_config_json_PROD = function()
{
/*{{{*/
let log_this = options.LOG3_SERVER;

if( log_this) logBIG("* load_config_json_PROD");
/*}}}*/
    // #2 CONFIG_JSON (NEXT)
    config.file_name = CONFIG_JSON;
    chrome.runtime.getPackageDirectoryEntry(function (dirEntry) {
        dirEntry.getFile(config.file_name, undefined, getFile_successCallback, getFile_errorCallback);
        //______________ PATH____________, OPTIONS__, SUCCESSCALLBACK________, ERRORCALLBACK
    });
};
/*}}}*/
/*_ getFile_successCallback {{{*/
let getFile_successCallback = function(fileEntry)
{
/*{{{*/
let log_this = options.LOG3_SERVER;

if( log_this) logBIG("2 getFile_successCallback("+fileEntry.name+")", 5);
/*}}}*/
    fileEntry.file( getFile_fileEntry_file );
};
/*}}}*/
/*_ getFile_fileEntry_file {{{*/
let getFile_fileEntry_file = function(file)
{
/*{{{*/
let log_this = options.LOG3_SERVER;

if( log_this) logBIG("3 getFile_fileEntry_file("+file.name+" .. "+file.size+"b)", 5);
/*}}}*/
    let reader = new FileReader();

    reader.addEventListener("load", function(event) { getFile_reader_handler(reader, event); });

    reader.readAsText( file );

};
/*}}}*/
/*_ getFile_reader_handler {{{*/
let getFile_reader_handler = function(reader, event) // eslint-disable-line no-unused-vars
{
/*{{{*/
let   caller = "getFile_reader_handler";
let log_this = options.LOG3_SERVER;

if( log_this) logBIG("4 getFile_reader_handler", 5);
/*}}}*/

    /* OVERRIDE */
    let config_txt = reader.result;
    let json       = JSON.parse(config_txt);
    Object.keys(json).forEach( function(k) { config[k] = json[k]; });
if( log_this) log_key_val(config.file_name+" ➔ config", config, 3);

if( log_this) log("%c ...calling load_localStorage", "color: orange;");
    load_localStorage();

if( log_this) log_sep_bot(caller, 1);
};
/*}}}*/
/*_ getFile_errorCallback {{{*/
let getFile_errorCallback = function(e)
{
    // #2 ➔ CONFIG FAILED
logBIG("* getFile_errorCallback ["+config.file_name+"]",2);

    log("%c"+e, "color: red");
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ PARAMS [localStorage] ............................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
// options.LOG3_SERVER
/*➔ load_localStorage {{{*/
let load_localStorage = function()
{
/*{{{*/
let   caller = "load_localStorage";
let log_this = options.LOG3_SERVER;

let tag_this = log_this || options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;
if( tag_this) log_sep_top("LOADING PARAMETERS FROM BACKGROUND SCRIPT [localStorage]", 6);
/*}}}*/
    /* REQUIRES [config] first {{{*/
    if(config == undefined)
    {
        console.error(caller+": config should have been loaded first");

        return;
    }
    options = JSON.parse( JSON.stringify(config) ); /* DEEP COPY */
    /*}}}*/

    for(let i=0; i   < config_js.OPTION_KEYS.length; ++i) {
        let key      = config_js.OPTION_KEYS[i];
        let val      = lib_util.localStorage_getItem( key );
        if( val      ) options[key] =     JSON.parse( val );
    }

if( log_this) log_key_val_group(caller+": options", options,6);

if( log_this) log_sep_bot(caller, 6);
};
/*}}}*/
/*➔ save_localStorage {{{*/
let save_localStorage = function()
{
/*{{{*/
let   caller = "save_localStorage";
let log_this = options.LOG3_SERVER;

let tag_this = log_this || options.LOG5_DIV_TOOLS || options.LOG6_MOVE_TOOL;
if( tag_this) log_sep_top("SAVING OPTIONS INTO BACKGROUND SCRIPT [localStorage]", 6);
if( tag_this) log_key_val_group(caller+": options", options,6);
/*}}}*/
    Object.keys(options).forEach( function(key) {
        let val  =                options[ key ];
        if(!val) {
            lib_util.localStorage_delItem( key );
        }
        else {
            let str =      JSON.stringify( val );
            lib_util.localStorage_setItem( key , str);
        }
if(log_this && val) log("SAVING "+key+": "+val);
    });

if( log_this) log_sep_bot(caller, 6);
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ OPTIONS [LOAD] [APPLY] [SAVE] ....................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
let options = {};

/*}}}*/
/*_ options_toggle_activated {{{*/
let options_toggle_activated = function()
{
/*{{{*/
let   caller = "options_toggle_activated";
let log_this = options.LOG3_SERVER;

if( log_this) log(caller);
/*}}}*/

    options.activated = !options.activated;
if( log_this) log(" ➔ %c BROWSER ACTION %c activated "+options.activated, lf4, lfX[options.activated ? 5 : 6]);

    if( options.activated ) set_icon_activate();
    else                    set_icon_unloaded();

    chrome.tabs.query({}, propagate_activated_state_to_all_tabs);

    if(!options.activated) save_localStorage();
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ 1/4 - ACTION EXTENSION ICON ..... chrome.browserAction .. chrome.tabs │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
// options.LOG2_MESSAGE
/*{{{*/
let browser_action_click_active_tab_ID;

/*}}}*/
/*➔ add_browser_action_click_listener {{{*/
let add_browser_action_click_listener = function()
{
/*{{{*/
let log_this = options.LOG2_MESSAGE;

if( log_this) log("%c LISTENING TO BROWSER ACTION CLICK ON EXTENSION ICON...", "color:#FF0");
/*}}}*/
    chrome.browserAction.onClicked.addListener( browser_action_click_listener );
};
/*}}}*/
/*_ browser_action_click_listener {{{*/
let browser_action_click_listener = function(active_tab)
{
    browser_action_click_active_tab_ID = active_tab.id;

    options_toggle_activated();
};
/*}}}*/
/* ICON {{{*/
/*_ set_icon_activate {{{*/
let set_icon_activate = function(tabId) // eslint-disable-line no-unused-vars
{
    chrome.browserAction.setIcon ({  path : ICON_ACTIVATE});
    chrome.browserAction.setTitle({ title : "XPATH ACTIVATED" });
};
/*}}}*/
/*_ set_icon_unloaded {{{*/
let set_icon_unloaded = function(tabId) // eslint-disable-line no-unused-vars
{
    chrome.browserAction.setIcon ({  path : ICON_UNLOADED});
    chrome.browserAction.setTitle({ title : "XPATH UNLOADED"  });
};
/*}}}*/
/*}}}*/
/* TABS {{{*/
/*… propagate_activated_state_to_all_tabs {{{*/
/*{{{*/
const TABS_MESSAGE_INTERVAL = 50;

/*}}}*/
let propagate_activated_state_to_all_tabs = function(tabs)
{
/*{{{*/
let   caller = "propagate_activated_state_to_all_tabs";
let log_this = options.LOG2_MESSAGE;

/*}}}*/
    if(!tabs) return; /* tabs are volatile while transitionning */

if(log_this) log_key_val_group(caller+" options", options, 0, true);

    for(let i=0; i<tabs.length; ++i)
    {
        if( is_a_browser_tool_url(tabs[i].url) ) {
if(log_this) log("…SKIPPING..TAB [id "+tabs[i].id +"] .. [url "+tabs[i].url+"]");

        }
        else {
if(log_this) logBIG("MESSAGING TAB [id "+tabs[i].id +"] .. [url "+tabs[i].url+"]", 4);

            options.is_active_tab   =   (tabs[i].id == browser_action_click_active_tab_ID);

            let request = options;



if(log_this) log( request );

            /* TIME INTERVAL ALLOWS TO ASSOCIATE [chrome.runtime.lastError] WITH [last_messaged_tab_ID] */
            setTimeout(function() { send_and_check_message(tabs[i].id, request); }, i*TABS_MESSAGE_INTERVAL);
        }
    }
};
/*}}}*/
/*… send_and_check_message {{{*/
/*{{{*/
let last_messaged_tab_ID;

/*}}}*/
let send_and_check_message = function (tab_ID, request)
{
/*{{{*/
let log_this = options.LOG2_MESSAGE;

if(log_this) log("send_and_check_message("+tab_ID+")");
if(log_this) log(request);
/*}}}*/

    last_messaged_tab_ID = tab_ID;
    chrome.tabs.sendMessage(tab_ID, request, on_message_response);
};
/*}}}*/
/*… on_message_response {{{*/
let on_message_response = function(response)
{
/*{{{*/
let   caller = "on_message_response";
let log_this = options.LOG2_MESSAGE;

if(log_this) log(caller);
/*}}}*/
    let response_from_last_messaged_tab = (browser_action_click_active_tab_ID == last_messaged_tab_ID);

if(log_this) log("...browser_action_click_active_tab_ID=["+ browser_action_click_active_tab_ID +"]");
if(log_this) log(".................last_messaged_tab_ID=["+ last_messaged_tab_ID               +"]");
if(log_this) log("......response_from_last_messaged_tab=["+ response_from_last_messaged_tab    +"]");
if(log_this) log("response:");
if(log_this) console.dir( response );

    if(!check_lastError(response_from_last_messaged_tab) )
        return;

    if( response)
    {
if(log_this) logBIG("RESPONSE FROM CONTENT SCRIPT:", 6);
if(log_this) log_key_val_group("response"
                                       , {   browser_action_click_active_tab_ID
                                           , last_messaged_tab_ID
                                           , response_from_last_messaged_tab
                                           , response
                                       }, 6, true);
    }
};
/*}}}*/
/*… is_a_browser_tool_url {{{*/
let is_a_browser_tool_url = function(url)
{
    return (url.startsWith("chrome://") ) ? true
        :  (url.startsWith("about:"   ) ) ? true
        :                                  false
    ;
};
/*}}}*/
/*_ check_lastError {{{*/
/*{{{*/

const RELOAD_MESSAGE
    = "┌──────────────────────────────┐\n"
    + "│  You MUST reload ALL TABS    │\n"
    + "│ that were ALREADY OPENED     │\n"
    + "│ when STARTING THE EXTENSION  │\n"
    + "└──────────────────────────────┘\n";

const LAST_WARN_DELAY_MS = 500;
let   last_warn_time_MS;
/*}}}*/
let check_lastError = function(response_from_last_messaged_tab)
{
/*{{{*/
let   caller = "check_lastError";
let log_this = options.LOG2_MESSAGE;

if( log_this) log(caller);
/*}}}*/
/*{{{*/
    /* Note:
     * .. accessing [chrome.runtime.lastError]
     * .. is all it takes to clear the
     * .. "Unchecked runtime.lastError" warning
     */
/*}}}*/

    if(!chrome.runtime.lastError ) return true; // i.e. checked

if( log_this) log("CHECKED %c some tabs to reload ? %c"+chrome.runtime.lastError.message
                         ,        "background-color:#600",  "background-color:#600");

    if(   response_from_last_messaged_tab
       && chrome.runtime.lastError.message.includes("Receiving end does not exist")
      ) {
        let time_MS = new Date().getTime();
        if((time_MS - last_warn_time_MS) < LAST_WARN_DELAY_MS) return true; // No sweat, same bunch, already warned about

if( log_this) log("%c"+RELOAD_MESSAGE, "background-color:#600");

        last_warn_time_MS = time_MS;

        /* USER ALERT */
        chrome.tabs.executeScript ({code : "alert('"+ RELOAD_MESSAGE.replace(/│*\n/g,"\\n")+"')"});
    }
    return false;
};
/*}}}*/
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ 2/4 - REQUEST FROM CONTENT-SCRIPT .................... chrome.runtime │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
// options.LOG2_MESSAGE
/*➔ add_message_listener {{{*/
let add_message_listener = function()
{
/*{{{*/
let log_this = options.LOG2_MESSAGE;

if( log_this) log("%c LISTENING TO MESSAGE FROM CONTENT SCRIPT...", "color:#AFA");
/*}}}*/

    chrome.runtime.onMessage.addListener( onMessage_listener );
};
/*}}}*/
/*_ onMessage_listener {{{*/
let onMessage_listener = function(request, sender, sendResponse)
{
/*{{{*/
let log_this = options.LOG2_MESSAGE;

if( log_this) logBIG("RECEIVING MESSAGE FROM CONTENT SCRIPT...", 3);
if( log_this) log("request:");
if( log_this) log( request  );
/*}}}*/
    /* 1. PAGE-LOAD-TIME ACTIVATED QUERY {{{*/
    if( request.activated && (request.activated == "undefined"))
    {
log( "%c onMessage_listener: %c"
           + "➔ Extension\n"
           + "… activated "+options.activated
           ,               "color:#AFA", "background-color:"+(options.activated ? "#0A0" : "#00A"));

//      /* LOAD STORAGE */
//      if(!options) load_localStorage();

        /* SEND RESPONSE */
        let response = options;
if(log_this) log("SENDING response:");
if(log_this) log(         response  );

        sendResponse(     response  );
    }
    /*}}}*/
    if( request.options )
    {
        /* MODIFY CONFIG KEYS */
        for(let i=0; i   < config_js.OPTION_KEYS.length; ++i) {
            let key      = config_js.OPTION_KEYS[i];
            if(typeof request.options[key] != "undefined")
                options              [key]  =   request.options[key];
        }
        //Object.keys(request.options).forEach( function(k) { options[k] = JSON.stringify(request.options[k]); });

        if( request.options.     div_tools_xy) options.     div_tools_xy = request.options.     div_tools_xy;
        if( request.options.taxo_tools_xy) options.taxo_tools_xy = request.options.taxo_tools_xy;

        save_localStorage();

    }
    /* 2. CONTENT-SCRIPT REQUEST FORWARDED TO SERVER .. (Cross-Site-Scripting FREE FROM BG SCRIPT) {{{*/
    else if(typeof request.activated == "undefined")
    {
        send_XMLHttpRequest(request, sendResponse); // FORWARD SERVER RESPONSE

    }
/*{{{
:!start explorer "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage"
To send an asynchronous response, there are two options:
return true from the event listener. This keeps the sendResponse()
function valid after the listener returns, so you can call it later.
}}}*/
    /*}}}*/
    return sendResponse ? true : false; // i.e. ASYNC / SYNC usage of sendResponse
};
/*}}}*/
/*_ send_XMLHttpRequest {{{*/
let send_XMLHttpRequest = function(args, sendResponse)
{
/*{{{*/
let   caller = "send_XMLHttpRequest";
let log_this = options.LOG4_XHR;

if( log_this) log_key_val_group(caller, args);
/*}}}*/
    /* ROUTING [domains] [urls] [xpaths] {{{*/
    let url;
    switch(args.cmd)
    {
    case config.CMD_DOMAINS  : url = config.SERVER_URL+"/domains" ; break;
    case config.CMD_URLS     : url = config.SERVER_URL+"/urls"    ; break;
    case config.CMD_XPATHS   : url = config.SERVER_URL+"/xpaths"  ; break;
    case config.CMD_TAXONOMY : url = config.SERVER_URL+"/taxonomy"; break;
    case config.CMD_ADD      : url = config.SERVER_URL+"/xpaths"  ; break;
    case config.CMD_DELETE   : url = config.SERVER_URL+"/xpaths"  ; break;
    default                  :
    {
        let msg = caller+": unsupported cmd=["+args.cmd+"]";
        logBIG(msg,2);
        log_key_val_group(caller+" args", { args }, lf2, false);
        if( sendResponse )
        {
if( log_this) log("sendResponse("+msg+"):");
            sendResponse( msg );
            return false;
        }
    }
    }
    /*}}}*/
    /* xhr {{{*/
    let xhr = new XMLHttpRequest();
    xhr.open            ("POST", url, true); // async
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onerror = function(e)
    {
        log("xhr.onerror:");
        console.dir( e );
        if( sendResponse )
        {
            let msg = "XMLHttpRequest.onerror: "+log_object_JSON(e);
            log("sendResponse("+msg+"):");
            sendResponse(msg);
        }
    };

    /* response handler {{{*/
    xhr.onreadystatechange = function() {
        /*{{{*/
        let log_this = options.LOG4_XHR; /* eslint-disable-line no-shadow */

        if( log_this) log("...xhr.onreadystatechange: readyState=["+xhr.readyState+"] .. status("+xhr.status+")");
        /*}}}*/
        if(xhr.readyState != XMLHttpRequest.DONE) return; // 4 The operation is complete.
        /* RESPONSE OK {{{*/
        if(xhr.status     == 200)
        {
/*{{{*/
let log_this = options.LOG4_XHR; /* eslint-disable-line no-shadow */

if( log_this) log("send_XMLHttpRequest: ➔ READING RESPONSE:");
if( log_this) logBIG("RESPONSE TO ["+args.cmd+"]:", 5);
/*}}}*/
            try {
                switch( args.cmd )
                {
                case config.CMD_DOMAINS  :  get_domains_reply_handler(args, xhr, sendResponse); break;
                case config.CMD_URLS     :     get_urls_reply_handler(args, xhr, sendResponse); break;
                case config.CMD_TAXONOMY : get_taxonomy_reply_handler(args, xhr, sendResponse); break;
                case config.CMD_XPATHS   : // fall-throught
                case config.CMD_ADD      : // fall-throught
                case config.CMD_DELETE   :   get_xpaths_reply_handler(args, xhr, sendResponse); break;
                default: { logBIG("send_XMLHttpRequest: unsupported cmd=["+args.cmd+"]"); return; }
                }
            }
            catch(ex) {
                console.dir(ex);
                log(xhr.response);
                log_key_val_group(caller+" args", { args }, lf2, false);
                if( sendResponse )
                {
                    let msg = ex +"\n"+ xhr.response;
                    log("sendResponse("+msg+"):");
                    sendResponse( msg );
                }
            }
        }
        /*}}}*/
        /* RESPONSE ERROR {{{*/
        else {
            if( log_this) log("send_XMLHttpRequest: ➔ xhr.response:");
            if( log_this) log(xhr.response);
        }
        /*}}}*/
    };
    /*}}}*/
    /* send JSON [args] {{{*/
    try {

        let server_args = JSON.parse( JSON.stringify(args) ); /* DEEP COPY */
if( log_this) log_key_val_group(caller+" server_args", { server_args }, lf7, false);
//(!log_this) log("\nREQUEST"                          , server_args              );

        if((args.cmd == "domains") || (args.cmd == "urls"))
            delete server_args.cmd;

        xhr.send( JSON.stringify( server_args ) );
    }
    catch(ex) {
        log("catch(ex):");
        console.dir(ex);
        log(xhr.response);
        if( sendResponse )
        {
            let msg = ex +"\n"+ xhr.response;
            log("sendResponse("+msg+"):");
            sendResponse( msg );
        }
    }
    /*}}}*/
    /*}}}*/
    return sendResponse ? true : false; // i.e. ASYNC / SYNC usage of sendResponse
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ 3/4 - REPLY (XHR) FROM SERVER TO BACKGROUND-SCRIPT................... │
    // └───────────────────────────────────────────────────────────────────────┘
// options.LOG4_XHR
/*_ get_domains_reply_handler {{{*/
let get_domains_reply_handler = function(args,xhr,sendResponse)
{
/*{{{*/
let   caller = "get_domains_reply_handler";
let log_this = options.LOG4_XHR;

if( log_this) log_sep_top(args.cmd, 3);

/* TODO: expect a JSON url_array {{{

    - récupération des noms de domaines à récupérer:
    POST https://clustering.iwintoo.io/domains
    - Params IN: aucun
    - Params OUT: JSON/tableau des noms de domaines
    ex: [ "https://www.lemonde.fr", "https://nomdomaine1", ... ]

}}}*/
/*}}}*/
    /* [items] {{{*/
    let items = JSON.parse(xhr.response);

if(log_this) log( args  );
if(log_this) console.dir( items );
    /*}}}*/
    /* [domains] {{{*/
    let domains = [];
    for(let i=0; i<items.length; ++i)
    {
        let   item = items[i] ;
if(log_this) log(item);
        let    url = ( item.url || item.site_url );
        let domain = lib_util.get_url_domain(url);
        if(!domains.includes( domain )) domains.push( domain ); /* FILTER UNIQ */
    }
    domains = domains.sort();

if(log_this) log("domains.length=["+domains.length+"]");
if(log_this) console.table(domains);
    /*}}}*/
    /* [answer] {{{*/
    let parsed_object = { domains , err: (items.err || "no error") };
    send_parsed_object_to_content_script(parsed_object,args,xhr,sendResponse);

    /*}}}*/
if( log_this) log_sep_bot(caller, 3);
//(!log_this) log("%c➔ domains\n", lbH+lf3,domains);
//  return sendResponse ? true : false; // i.e. ASYNC / SYNC usage of sendResponse
    return false;
};
/*}}}*/
/*_ get_urls_reply_handler {{{*/
let get_urls_reply_handler = function(args,xhr,sendResponse)
{
/*{{{*/
let   caller = "get_urls_reply_handler";
let log_this = options.LOG4_XHR;
if( log_this) log_sep_top(args.cmd, 4);

/* TODO: expect a JSON url_array {{{

    - récupération des urls d'un nom de domaine:
    POST https://clustering.iwintoo.io/urls
    - Params IN: nomdomaine: nom de domaine 1
    - Params OUT: JSON/tableau des urls du nom de domaine:
    ex: [ "https://www.lemonde.fr/gfhrz",  "https://www.lemonde.fr/mldsfsq",  ... ]

}}}*/
/*}}}*/
    /* [items] {{{*/
    let items = JSON.parse(xhr.response);

if( log_this) log( args  );
if( log_this) console.log( items );
    /*}}}*/
    /* [urls] {{{*/
    let urls = [];
    for(let i=0; i<items.length; ++i)
    {
        let   item = items[i] ;
if( log_this) log(item);
        let    url = ( item.url || item.site_url );

        if(!urls.includes( url )) urls.push( url ); /* FILTER UNIQ */
    }
    urls = urls.sort();

if( log_this) log("urls.length=["+urls.length+"]");
if( log_this) console.table(urls);
    /*}}}*/
    /* [answer] {{{*/
    let parsed_object = { urls , err: (items.err || "no error") };
    send_parsed_object_to_content_script(parsed_object,args,xhr,sendResponse);

    /*}}}*/
if( log_this) log_sep_bot(caller, 4);
//(!log_this) log("%c➔ urls\n", lbH+lf4, urls);
    return sendResponse ? true : false; // i.e. ASYNC / SYNC usage of sendResponse
};
/*}}}*/
/*_ get_xpaths_reply_handler {{{*/
let get_xpaths_reply_handler = function(args,xhr,sendResponse)
{
/*{{{*/
let   caller = "get_xpaths_reply_handler";
let log_this = options.LOG4_XHR;

if( log_this) log_sep_top(args.cmd, 5);
if( log_this) log( args  );

/* TODO: expect a JSON url_array {{{

    - transmission d'une liste de XPath liés à l'url:
    POST https://clustering.iwintoo.io/xpaths
    - Params IN: JSON: { "cmd": "add/delete", "url": "https://www.lemonde.fr/gfhrz", xpathes: [xpath1, xpath2]}
    - Params OUT: aucun
    A l'attention de Samuel:
    si cmd==add: on ajoute l'ensemble [xpath1, xpath2] en table aux xpaths existants
    si cmd==delete: on supprime l'ensemble [xpath1, xpath2] en table aux xpaths existants (modifié)

}}}*/
/*}}}*/
    /* [items] {{{*/
    /* Answer could be embedded in multi-line Javascript comment as a null statement */
    let    xhr_response
        =  xhr.response.replace(/^\W*\/\*(.*)\*\/\W*$/,"$1");
//log("%c"+xhr.response, lf9);
//log("%c"+xhr_response, lf8);

    let items = {};
    try {
        items = JSON.parse(xhr_response);
    }
    catch(ex) { log("catch(ex):"); console.dir(ex); }

if( log_this) log("items:", items);
    /*}}}*/
    /* [xpaths] {{{*/
    let xpaths = [];
    for(let i=0; i<items.length; ++i)
    {
        let     item = items[i];
if( log_this) log(item);
        let    xpath = item.xpath;

        xpaths.push( xpath );
    }

if( log_this) log("xpaths.length=["+xpaths.length+"]");
if( log_this) console.table(xpaths);
    /*}}}*/
    /* [answer] {{{*/
    let parsed_object = { xpaths , err: (items.err || "no error") };

    send_parsed_object_to_content_script(parsed_object,args,xhr,sendResponse);
    /*}}}*/
if( log_this) log_sep_bot(caller, 5);
//(!log_this) log("%c➔ xpaths\n", lbH+lf5, xpaths);
    return false;
};
/*}}}*/
/*_ get_taxonomy_reply_handler {{{*/
let get_taxonomy_reply_handler = function(args,xhr,sendResponse)
{
/*{{{*/
let   caller = "get_taxonomy_reply_handler";
let log_this = options.LOG4_XHR;

if( log_this) log_sep_top(args.cmd, 6);
if( log_this) log( args  );

/* TODO: expect a JSON url_array {{{

    - transmission d'une liste de selected,collected taxo_id liés à l'url:
    POST https://clustering.iwintoo.io/taxonomy
    - Params IN: JSON: { "cmd": "taxonomy", "url": "https://www.lemonde.fr/gfhrz", selected: [taxo_id1, taxo_id2], collected: [taxo_id1, taxo_id2]}
    - Params OUT: aucun
    A l'attention de Samuel:
    si cmd==taxonomy , selected=[non-vide] || collected=[non-vide]: on remplace l'ensemble [selected , collected] en table
    si cmd==taxonomy , selected=[    vide] && collected=[    vide]: on supprime l'ensemble [selected , collected] en table

}}}*/
/*}}}*/
    /* [items] {{{*/
    /* Answer could be embedded in multi-line Javascript comment as a null statement */
    let    xhr_response
        =  xhr.response.replace(/^\W*\/\*(.*)\*\/\W*$/,"$1");
//log("%c"+xhr.response, lf9);
//log("%c"+xhr_response, lf8);

    let items = {};
    try {
        items = JSON.parse(xhr_response);
    }
    catch(ex) { log("catch(ex):"); console.dir(ex); }

if( log_this) log("items:", items);
    /*}}}*/
    /* [selected , collected] {{{*/
    let selected  = [];
    let collected = [];
    for(let i=0; i<items.length; ++i)
    {
        let             item = items[i];
        if(item.selected ) selected .push( item.selected  );
        if(item.collected) collected.push( item.collected );
    }

if( log_this) console.log("....selected:", selected);
if( log_this) console.log("...collected:", collected);

    /*}}}*/
    /* [answer] {{{*/
    let parsed_object = { selected, collected, err: (items.err || "no error") };

    send_parsed_object_to_content_script(parsed_object,args,xhr,sendResponse);
    /*}}}*/
if( log_this) log_sep_bot(caller, 6);
//(!log_this) log("%c➔  selected\n", lbH+lf6,  selected);
//(!log_this) log("%c➔ collected\n", lbH+lf6, collected);
    return false;
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ 4/4 - RESPONSE TO   CONTENT-SCRIPT ..................... sendResponse │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ send_parsed_object_to_content_script {{{*/
let send_parsed_object_to_content_script = function(parsed_object,args,xhr,sendResponse)
{
/*{{{*/
let   caller = "send_parsed_object_to_content_script";
let log_this = options.LOG4_XHR;

/*}}}*/
    let parsed_items
        = parsed_object.domains ? ("DOMAIN x"+parsed_object.domains.length)
        : parsed_object.urls    ? (   "URL x"+parsed_object.urls   .length)
        : parsed_object.xpaths  ? ( "XPATH x"+parsed_object.xpaths .length)
        :                     JSON.stringify( parsed_object ) ;

    let answer
        = { cmd                    : args.cmd
          , parsed_response_err    : parsed_object.err
          , parsed_items
          , ...parsed_object      /* [(domains|urls|xpaths) , err ] */
        };
if( log_this) log_key_val_group(caller, answer);

    if( sendResponse )
    {
if( log_this) log("sendResponse("+answer+"):");

        sendResponse( answer );
    }
//  return sendResponse ? true : false; // i.e. ASYNC / SYNC usage of sendResponse
    return false;
};
/*}}}*/

    /* EXPORT {{{*/
    return { load_config_json
        ,    add_browser_action_click_listener
        ,    add_message_listener
        ,    load_localStorage
    };
    /*}}}*/
})();
/* ONLOAD */
xpath_background    .load_config_json();                    // config async will call localStorage
xpath_background    .add_browser_action_click_listener();   // browser icon click
xpath_background    .add_message_listener();                // content_script action

// $APROJECTS/iwintoo/TAX/javascript/taxo_background.js
