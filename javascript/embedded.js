// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [embedded] ..................(SUBSTITUTE FOR) EXTENSION BACKGROUND SCRIPT │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* globals lib_log, */
/* globals console */

/* globals xpath_content */
/* globals xpath_outline */
/* globals xpath_tools   */

/* exported embedded, EMBEDDED_SCRIPT_TAG */

/* eslint-disable      no-warning-comments */

const EMBEDDED_SCRIPT_ID   = "embedded";
const EMBEDDED_SCRIPT_TAG  =  EMBEDDED_SCRIPT_ID  +" (220118:15h:53)";
/*}}}*/
let   embedded = (function() {
"use strict";

/* config {{{*/

const DOMAINS_ARRAY
  =[ "goout.net"
  , "jslint.com"
  , "lemonde.fr"
  , "lefigaro.fr"
  , "remotetabs.com"
  , "wikipedia.org"
  ];

const URLS_ARRAY
 = [ "https://en.wikipedia.org/wiki/Data_mining"
  , "https://en.wikipedia.org/wiki/Patricia_Janečková"
  , "https://en.wikipedia.org/wiki/Richard_Smith-(English_guitarist)"
  , "https://en.wikipedia.org/wiki/Tommy_Emmanuel"
  , "https://wikipedia.org"
  , "https://www.wikipedia.org/"
 ];

const XPATH_ARRAY
 = [ "/html/body/h1"
 ,   "/html/body/details/p[1]"
 ,   "/html/body/details/p[2]"
 ,   "/html/body/details/p[5]"
 ,   "/html/body/details/p[6]"
 ,   "/html/body/details[2]/details/div/pre[2]"
 ];

const TAXO_SELECTED_ARRAY
 = [ "ALL.OTHER"
// , "ALL.GDPR"
// , "ALL.AUTOMOTIVE.BRAND"
// , "ALL.AUTOMOTIVE.RETAILER"
   , "ALL.AUTOMOTIVE.EV_CARS"
   , "ALL.AUTOMOTIVE.OIL_CARS"
// , "ALL.AUTOMOTIVE.OIL_TRUCKS"
// , "ALL.AUTOMOTIVE.CAR_CARE"
   , "ALL.HOME.FLORRINGS"
   , "ALL.HOME.HOUSEHOLD_APPLIANCES"
   , "ALL.HOME.ELECTRICITY.HOUSEHOLD_APPLIANCES"
 ];

const TAXO_COLLECTED_ARRAY
 = [ "ALL.HEALTH"
   , "ALL.BEAUTY"
 ];

 // from: javascript/xpath_content.js

let config
 = { "CMD_DOMAINS"  : "domains"
   , "CMD_URLS"     : "urls"
   , "CMD_XPATHS"   : "xpaths"
   , "CMD_TAXONOMY" : "taxonomy"
   , "CMD_ADD"      :  "add"
   , "CMD_DELETE"   :  "delete"
 };

/*}}}*/

/*_ simulate_send_message {{{*/
let simulate_send_message = function(message_object,_caller)
{
let caller = "simulate_send_message";

let log_this
 =  xpath_content.options.LOG2_MESSAGE
 || xpath_content.options.LOG3_SERVER
 || xpath_content.options.LOG4_XHR
 ;

if( log_this) lib_log.log_key_val_group(_caller+" ➔ "+caller+(message_object.cmd ? " "+message_object.cmd : ""),message_object, 9, true);

    let response = JSON.parse( JSON.stringify(message_object) ); /* DEEP COPY */

    response.parsed_items               = "NO ITEMS";
    switch(message_object.cmd)
    {
     case config.CMD_DOMAINS:
      response.parsed_response_err      = "no error";
      response.err                      = "no error";
      response.parsed_items             = "DOMAIN x"+DOMAINS_ARRAY.length;
      response.domains                  = DOMAINS_ARRAY;
      xpath_content.get_domains_handler (response.domains);
      break;

     case config.CMD_URLS:
      response.parsed_response_err      = "no error";
      response.err                      = "no error";
      response.parsed_items             = "URL x"+URLS_ARRAY.length;
      response.urls                     = URLS_ARRAY;
      xpath_content.get_urls_handler    (response.urls);
      break;

     case config.CMD_XPATHS:
      response.parsed_response_err      = "no error";
      response.err                      = "no error";
      response.parsed_items             = "XPATH x"+XPATH_ARRAY.length;
      response.xpaths                   = XPATH_ARRAY;
      xpath_content.get_xpaths_handler  (response.xpaths);
      break;

     case config.CMD_TAXONOMY:
      response.parsed_response_err      = "no error";
      response.err                      = "no error";
      response.parsed_items             = "TAXO_SELECTED x"+TAXO_SELECTED_ARRAY .length
       +                                  " .. COLLECTED x"+TAXO_COLLECTED_ARRAY.length;
      response.selected                 =  TAXO_SELECTED_ARRAY;
      response.collected                =  TAXO_COLLECTED_ARRAY;
      xpath_content.get_taxonomy_handler(response.selected, response.collected);
      break;

     case config.CMD_ADD     :
     case config.CMD_DELETE  :

      xpath_outline.add_or_delete_server_response_handler(response, message_object);
      break;

     default:
      lib_log.logBIG(caller+" unexpected cmd=["+message_object.cmd+"]");
      console.trace();
    }
    /* SYNC GUI LAYOUT */
    xpath_tools.div_tools_layout_cmd( message_object.cmd );

if( log_this)
    lib_log.log_key_val_group("➔ response: "+response.parsed_items, response, 4, true);
};
/*}}}*/

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ EXPORT ........................................................ [embedded]│
// └───────────────────────────────────────────────────────────────────────────┘
    return {
        simulate_send_message
    };
})();
