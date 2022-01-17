//┌──▼▼▼▼▼▼────────────────────────────────────────────────────────────────────┐
//│ [SERVER]                                                             [XPH] │
//└──▲▲▲▲▲▲────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals  require, process */
/* globals  console */
/* eslint-disable no-warning-comments */

const SERVER_JS_ID  = "server";
const SERVER_JS_TAG = SERVER_JS_ID  +" (211231:09h:03)";
/*}}}*/
let server = (function() {
"use strict";

//┌────────────────────────────────────────────────────────────────────────────┐
//│ DEPENDENCIES                                                               │
//└────────────────────────────────────────────────────────────────────────────┘
//➔ CONST {{{*/
const DEFAULT_URI_PATH              = "./index.html";
const TRACE_OPEN  = " {{{";
const TRACE_CLOSE = " }}}";


/*}}}*/
//➔ ANSII-TERMINAL {{{*/
/* eslint-disable no-unused-vars */
const    LF = String.fromCharCode(10);
const   ESC = String.fromCharCode(27);
const R=ESC+"[1;31m"; //     RED
const G=ESC+"[1;32m"; //   GREEN
const Y=ESC+"[1;33m"; //  YELLOW
const B=ESC+"[1;34m"; //    BLUE
const M=ESC+"[1;35m"; // MAGENTA
const C=ESC+"[1;36m"; //    CYAN
const N=ESC+"[0m"   ; //      NC

let log_X = function(args         ) { console.log(      ...args ); };
let log_R = function(arg0, ...rest) { log_X([ R + arg0, ...rest]); };
let log_G = function(arg0, ...rest) { log_X([ G + arg0, ...rest]); };
let log_B = function(arg0, ...rest) { log_X([ B + arg0, ...rest]); };

let log_C = function(arg0, ...rest) { log_X([ C + arg0, ...rest]); };
let log_M = function(arg0, ...rest) { log_X([ M + arg0, ...rest]); };
let log_Y = function(arg0, ...rest) { log_X([ Y + arg0, ...rest]); }; // eslint-disable-line no-unused-vars

let log_N = function(arg0, ...rest) { log_X([ N + arg0, ...rest]); };

/* eslint-enable  no-unused-vars */
/*}}}*/
//➔ REQUIRE
//➔ [fs http https networkInterfaces] {{{
let   fs                        = require("fs"   );
let   http                      = require("http" );
let   https                     = require("https");
let { networkInterfaces }       = require("os"   );
//}}}
//➔ [config defaults] {{{
let   config =
{     LOAD_STATUS               : ""

    , PORT_HTTP                 :  81
    , PORT_HTTPS                : 444
//  ,  KEY_PEM                  : "../../KEYSTORE/server/privkey.pem"
//  , CERT_PEM                  : "../../KEYSTORE/server/fullchain.pem"

//  , HOST                      : "localhost"
//  , USER                      : "postgres"
//  , PASSWORD                  : "ivan"
//  , DATABASE                  : "postgres"
//  , FEEDBACK_TABLE            : "feedbacks"
//  , URI_DIR                   :    "Files"
//  , URI_DIR_TARGET            : "C:/Files"

};

/*}}}*/
/*_ config_LOAD_STATUS_log {{{*/
let config_LOAD_STATUS_log = function(msg)
{
    if( config.LOAD_STATUS )
        config.LOAD_STATUS +=  LF;
    else
        config.LOAD_STATUS  =  "";
    config.LOAD_STATUS     += msg;
};
/*}}}*/
//➔ CONFIG_JSON {{{
const CONFIG_JSON               = "config.json" ;
const CONFIG_DEV_JSON           = "config_dev.json" ;
let   config_json               = "../"+(fs.existsSync( CONFIG_DEV_JSON ) ? CONFIG_DEV_JSON : CONFIG_JSON);

try {
    config                      = require(      config_json );
    config_LOAD_STATUS_log(       `CONFIG    [${config_json}]`);




} catch(ex) {
    let cwd = process.cwd().replace(/\\/g,"/");
    config_LOAD_STATUS_log(       "****************************************"         + LF
                                + "*** ERROR WHILE LOADING FILE ["+ config_json  +"]"+ LF
                                + "*** IN FOLDER ["+                cwd          +"]"+ LF
                                + "*** "+ ex.message.replace(/\n/g,"\n*** ")         + LF
                                + "****************************************"             );
}
/*}}}*/
//➔ SQL_REQUIRE {{{
const SQL_REQUIRE               = "../SERVER/server_sql.js";
let   server_sql;
try {
    server_sql                  = require(      SQL_REQUIRE );
    config_LOAD_STATUS_log(       `CONFIG    [${SQL_REQUIRE}]`);
} catch(ex) {
    config_LOAD_STATUS_log(       `******    [${SQL_REQUIRE}] ERROR ➔ ${ex}`);
}

/*}}}*/
//➔ [lib_postgres] {{{
const LIB_PG_REQUIRE            = "../lib/lib_postgres.js";
let   lib_postgres;
try {
    lib_postgres                = require(      LIB_PG_REQUIRE );
    config_LOAD_STATUS_log(       `CONFIG    [${LIB_PG_REQUIRE}]`);
} catch(ex) {
    config_LOAD_STATUS_log(       `******    [${LIB_PG_REQUIRE}] ERROR ➔ ${ex}`);
}

/*}}}*/



//┌────────────────────────────────────────────────────────────────────────────┐
//│ STATUS                                                                     │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ log_STATUS {{{*/
let log_STATUS = function(response) // eslint-disable-line complexity
{
    /* CLEAR TERMINAL {{{*/
//  log_CLEAR();

    /*}}}*/
    /* CONFIG {{{*/
    /* COLORS {{{*/
    let s;
    let log_color  = config.LOAD_STATUS.includes("ERROR") ? R : M;
/*  response CSS {{{*/
if( response )
    response.write(
`<style>
.info  { background-color: #222; color: #0F3; }
.error { background-color: #222; color: #F03; }
</style>`
                  );

/*}}}*/
    /*}}}*/
    /* [config items] {{{*/
    s  = "┌───────────────────────────────────────────────────────────────────── CONFIG ─┐";

    s +=`
│ ${SERVER_JS_TAG}
├
│ CONFIG            [${config_json        }]
│ CWD               [${process.cwd()      }]
├
│ PORT_HTTP         [${config.PORT_HTTP   }]
│ PORT_HTTPS        [${config.PORT_HTTPS  }]
│  KEY_PEM          [${config. KEY_PEM    }]
│ CERT_PEM          [${config.CERT_PEM    }]
├
│ HOST              [${config.HOST        }]
│ USER              [${config.USER        }]
│ PASSWORD          [${config.PASSWORD    }]
│ DATABASE          [${config.DATABASE    }]
│ URI_DIR           [${config.URI_DIR     }]`
;




    if(config.LOG_MORE)
        s += LF+"│ LOG_MORE    ➔➔➔ ["+    config.LOG_MORE     +"] ➔ VERBOSE node server.js";

    s += LF+"└──────────────────────────────────────────────────────────────────────────────┘";

    log_N(log_color+s);
    /*  response {{{*/
    if( response )
        response.write(
`<pre class='${config.LOAD_STATUS.includes("ERROR") ? "error" : "info"}'>${s}</pre>`
                      );

    /*}}}*/
    /*}}}*/
    /* POSTGRES {{{*/
    let postgres_args  = "["+config.HOST+"] ["+config.USER+"] ["+config.DATABASE+"]";
    let config_status  =     config.LOAD_STATUS.replace(/\n/g,"\n│ ");
    s = `
┌───────────────────────────────────────────────────────────────────── STATUS ─┐
│ ${postgres_args}
│ ${config_status}
└──────────────────────────────────────────────────────────────────────────────┘`;

    let   postgres_color = postgres_args.includes("undefined") ? R : log_color;
    log_N(postgres_color +s);

/*  response {{{*/
if( response )
    response.write(
`<pre class='${config.LOAD_STATUS.includes("ERROR") ? "error" : "info"}'>${s}</pre>`
                  );
/*}}}*/
    /*}}}*/
    /*}}}*/
    /* FOLDER {{{*/

    s = `
┌──────────────────────────────────────────────────────────────────────────────┐
│ SERVER STARTED IN ${   started_folder}
│ SERVER TOP FOLDER ${server_top_folder}
└──────────────────────────────────────────────────────────────────────────────┘`;

    log_G(s);
/*  response {{{*/
if( response )
    response.write(
`<pre class='info'>${s}</pre>`
                  );

/*}}}*/
    /*}}}*/
    /* HTTPS {{{*/

    let https_address = https_server  ?            https_server.address() : null;
    let https_port    = https_address ?            https_address.port     : null;
    let https_status  = https_port    ? (  "LISTENING PORT "+https_port ) : "NOT LISTENING";

    s =`
┌────────────────────────────────┐
│ HTTPS    :  ${https_status}
└────────────────────────────────┘`;

    log_G((https_server ? Y : R)+s+N);
/*  response {{{*/
if( response )
    response.write(
`<pre class='${https_server ? "info" : "error"}'>${s}</pre>`
                  );
/*}}}*/
    /*}}}*/
    /* HTTP  {{{*/

//lib_log.log_key_val("http__server", http__server);
    let http__address = http__server  ?            http__server.address() : null;
    let http__port    = http__address ?            http__address.port     : null;
    let http__status  = http__port    ? (  "LISTENING PORT "+http__port ) : "NOT LISTENING";

    s =`
┌────────────────────────────────┐
│ HTTP     :  ${http__status}
└────────────────────────────────┘`;

    log_G((http__server ? Y : R)+s+N);
/*  response {{{*/
if( response )
    response.write(
`<pre class='${http__server ? "info" : "error"}'>${s}</pre>
<script>document.body.contentEditable = true;</script>`
                  );

/*}}}*/
    /*}}}*/

    log_net_info( response );

};
/*}}}*/
/*_ log_net_info {{{*/
let     net_address;
let log_net_info = function(response)
{
    /*  response {{{*/
    if( response )
        response.write(
`<div class='info'>
 <b>Network:</b>
 <ul>`
                      );
    /*}}}*/
    let net_if  = networkInterfaces();
    let results = Object.create({});
    for(let name of Object.keys(net_if))
    {
        for(let net of net_if[name])
        {
            if (net.family === "IPv4" && !net.internal) // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            {
                if(!results[name])
                    results[name] = [];

                results[name].push(net.address);

                if(!net_address)
                    net_address = net.address;
                /*  response {{{*/
                if( response)
                    response.write("<li>"+name+" : "+net.address+"</li>\n");
                /*}}}*/
            }
        }
    }
    /*  response {{{*/
    if( response)
        response.write("</ul>\n</div>");
    /*}}}*/
console.table( results );
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ SERVER                                                                     │
//└────────────────────────────────────────────────────────────────────────────┘
/*➔ createServer .. [http__server] [https_server] {{{*/
/*{{{*/
let http__server;
let https_server;

let    started_folder;
let server_top_folder;
/*}}}*/
let createServer = function()
{

    /* [HTTP ] {{{*/
    try {
        http__server    = http .createServer();
    }
    catch(ex) { log_R(ex); }

    /*}}}*/
    /* [HTTPS] {{{*/
    try {
        let ssl_options
            = {    key: fs.readFileSync(config.KEY_PEM )
                , cert: fs.readFileSync(config.CERT_PEM)
            };

        https_server    = https.createServer( ssl_options );
    }
    catch(ex) { log_R(ex);
        config.LOAD_STATUS
            = `ERROR    : https(ssl_options) ➔ ${ex.code}\n`
            + config.LOAD_STATUS;
    }
    /*}}}*/
    /* [FOLDER] {{{*/
    started_folder      = process.cwd().replace(/\\/g,"/");
    server_top_folder   = process.cwd().replace(/\\/g,"/");

    /*}}}*/

    /* [PORT] {{{*/
    if(http__server) http__server.listen ( config.PORT_HTTP  ||  80);
    if(https_server) https_server.listen ( config.PORT_HTTPS || 443);

    if( lib_postgres )
        lib_postgres.configure(config, server_sql);

    /*}}}*/
    /* LISTEN {{{*/
    if(http__server) http__server.addListener("request", server_request_listener.request_listener);
    if(https_server) https_server.addListener("request", server_request_listener.request_listener);

    /*}}}*/
    /* STATUS {{{*/
    log_STATUS();

    /*}}}*/


};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ LISTEN REQUEST                                                             │
//└────────────────────────────────────────────────────────────────────────────┘
let server_request_listener = (function() {
/*➔ request_listener {{{*/
/*{{{*/
const CLEAR_COOLDOWN = 1000;
let last_request_time= 0;

let request_count = 0;
/*}}}*/
let request_listener = function(request, response) /* eslint-disable-line complexity */
{
    /* CLEAR TERMINAL BETWEEN REQUEST CHUNKS {{{*/
    let time_now_MS = new Date().getTime();
    if((time_now_MS - last_request_time) > CLEAR_COOLDOWN) {
        if(config.LOG_MORE) console.log("\x1Bc➔  clear terminal between request chunks");
    }
    last_request_time = time_now_MS; // restart cooldown start time
    /*}}}*/
    /* [uri] {{{*/
    let uri = parse_url( request.url );
    if(!uri.path)
        uri.path = DEFAULT_URI_PATH;

log_C("┌──────────────────────────────────────────────────────────────────────────────┐\n"
     +"│ request_listener: ["+uri.path +"]\n"
     +"└──────────────────────────────────────────────────────────────────────────────┘");
//log_N("uri")
//console.dir( uri )

    response.request_count = ++request_count;
if(config.LOG_MORE) console.log("REQUEST #"+response.request_count+" "+TRACE_OPEN+" uri.path=["+uri.path+"] ");//DEBUG

    let consumed_by = "";
    /*}}}*/
    //┌────────────────────────────────────────────────────────────────────────┐
    //│ SERVER: [CLEAR I18N LOG_MORE STATUS EXIT]                                            │
    //└────────────────────────────────────────────────────────────────────────┘
/*{{{*/
    let args = { uri , request , response };

    if(     !consumed_by) consumed_by = server_request_commands.request_CLEAR       ( args );

    if(     !consumed_by) consumed_by = server_request_commands.request_LOG_MORE    ( args );
    if(     !consumed_by) consumed_by = server_request_commands.request_STATUS      ( args );
    if(     !consumed_by) consumed_by = server_request_commands.request_EXIT        ( args );

/*}}}*/
    //┌────────────────────────────────────────────────────────────────────────┐
    //│ SERVER: [CONTROL]                                                      │
    //└────────────────────────────────────────────────────────────────────────┘
/*{{{*/
    if( lib_postgres )
    {
        if( !consumed_by) consumed_by = server_request_data_io .request_data_io    ( args );
        if( !consumed_by) consumed_by =                         request_js_script  ( args );
        if( !consumed_by) consumed_by = server_request_commands.request_dump_TABLES( args );
        if( !consumed_by) consumed_by =                         request_sql_query  ( args );

    }
/*}}}*/




    //┌────────────────────────────────────────────────────────────────────────┐
    //│ FALLBACK TO SERVE FILES FROM CURRENT DIRECTORY                         │
    //└────────────────────────────────────────────────────────────────────────┘
    /* 7. fs.readFile {{{*/
    if(!consumed_by && uri.path)
    {
//console.log("uri:")
//console.dir( uri  )
        let file_name = uri.path;
        if( file_name == "query")
            file_name = uri.query.match(/qtext=([^\?]+)/)[1];

//log_G("  ┌────────────────────────────────────────────────────────────────────────────┐\n"
//     +"➔ │ READFILE:\n"
//     +"  │      uri.path =["+ uri.path  +"]\n"
//     +"  │      uri.query=["+ uri.query +"]\n"
//     +"  │      file_name=["+ file_name +"]\n"
//     +"  └────────────────────────────────────────────────────────────────────────────┘");

        fs.readFile(file_name, function(err,data) { fs_read_file_callback(file_name, uri.query, response, err, data); });

        consumed_by = "fs.readFile";
    }
    /*}}}*/
//log_N("consumed_by=["+consumed_by+"]")
if(config.LOG_MORE) console.log(TRACE_CLOSE);//DEBUG
};
/*}}}*/
/*_ parse_url {{{*/
let parse_url = function(url)
{
//console.log("parse_url:")
//console.log("url:")
//console.dir( url  )
//console.log("decodeURIComponent(url):")
//console.dir( decodeURIComponent(url)  )

    //..................... scheme://     domain    /path        query
    let url_match
        = decodeURIComponent(url)
        . replace(     /\+/g, " ")  // encoded space
        . replace(     /\r/g, " ")  // CR
        . replace(     /\n/g, " ")  // LF
        . replace(  /\s\s+/g, " ")  // multiple spaces
        . replace(/\s*;\s*$/,  "")  // trailing separator
        . match(/^(\w+)?(:\/\/)?([^\/]+)?\/([^\?]+)?\??(.*)?/)
    //.........(111111).........(333333)...(444444)....(55)...
    //..........scheme...........domain.....path__.....query..
    ;
    //console.log("url_match[0]:")
    //console.dir( url_match[0]  )

    let args
        = {   scheme : url_match[1]
          //,   port : url_match[2]
            , domain : url_match[3]
            ,   path : url_match[4]
            ,  query : url_match[5]
        };
//console.dir(args)

    return  args;
};
/*}}}*/
return { request_listener };
})();










//┌────────────────────────────────────────────────────────────────────────────┐
//│ RESPONSE DATA-IN-OUT                        [lang_errors] [submit] [purge] │
//└────────────────────────────────────────────────────────────────────────────┘
let server_request_data_io = (function() {
/*    REQUEST_URL_ARRAY {{{*/
const REQUEST_URL_ARRAY
    = [   "/domains"
        , "/urls"
        , "/xpaths"
        , "/taxonomy"
    ];

/*}}}*/
/*_ request_data_io {{{*/
let request_data_io = function(args)
{
    let {      request, response } = args;
    let consumed_by = "";

    /* [REQUEST_URL_ARRAY] {{{*/
if(config.LOG_MORE) console.log("request_data_io: request.url=["+request.url+"]");
    if( REQUEST_URL_ARRAY.includes(request.url) )
    {
log_B("  ┌───────────────────────────────────────────────┐\n"
     +"➔ │ "+request.url+" method "+ request.method +"\n"
     +"  └───────────────────────────────────────────────┘");
        if(     request.method == "POST") post_callback(request, response);
        else if(request.method == "GET" )  get_callback(request, response);
        else if(request.method == "OPTIONS")
        {
//console.dir(request)
log_Y("...allow access to the origin of the petition:");
            response.setHeader("Access-Control-Allow-Origin" , request.headers.origin);
            response.setHeader("Access-Control-Allow-Methods", "POST"                );
            response.setHeader("Access-Control-Allow-Headers", "accept, content-type");
            response.setHeader("Access-Control-Max-Age"      , "1728000"             );
            response.end();
            consumed_by = request.url;
        }

        consumed_by = request.url;
    }
    /*}}}*/

    return consumed_by;
};
/*}}}*/
/*_ post_callback {{{*/
let post_callback = function(request,response)
{
if(config.LOG_MORE) console.log("post_callback");

    let body = "";
    request.on("data", (chunk) => {
        body += chunk.toString();
    });

    request.on("end", () => {

//console.log("1 body=["+body+"]")
try {
        body = decodeURIComponent(body);
} catch(err) {
//  console.log(err);
}

//console.log("2 body=["+body+"]")

        body = body
            .replace( /\+/g     , " "   )
            .replace( /'/g      , "''"  )
            .replace( /"/g      , '""'  ) // eslint-disable-line quotes
          //.replace( /"/g      , '\\"' ) // eslint-disable-line quotes
          //.replace( /\\r\\n/g , "\n"  )
          //.replace(    /\\n/g , "\n"  )
        ;
//console.log("3 body=["+body+"]")

        handle_request(request, response, body);
    });
};
/*}}}*/
/*_ get_callback {{{*/
let get_callback = function(request,response)
{
if(config.LOG_MORE) console.log("get_callback");

    let body =     decodeURIComponent( request.url );

    handle_request(request, response, body);
};
/*}}}*/
return { request_data_io };
})();

//┌────────────────────────────────────────────────────────────────────────────┐
//│ RESPONSE COMMAND                           [clear status dump_TABLES exit] │
//└────────────────────────────────────────────────────────────────────────────┘
let server_request_commands = (function() {

/*_ request_CLEAR {{{*/
let request_CLEAR = function(args)
{
    let { uri,          response } = args;
    let consumed_by;

    if(uri.path == "clear")
    {
log_N("\x1Bc"); // CLEAR TERMINAL <esc>c
log_N("  ┌─────┐\n"
     +"➔ │ CLEAR\n"
     +"  └─────┘");
        response.writeHead(200, HTML_RESPONSE_HEADER );
        response.write("<span style='color:gray;'>...cleared</span>");
//console.log("response.request_count["+response.request_count+"] request_CLEAR"+TRACE_CLOSE)
        response.end();

        consumed_by = "clear";
    }

    return consumed_by;
};
/*}}}*/
/*_ request_LOG_MORE {{{*/
let request_LOG_MORE = function(args)
{
    let { uri,          response } = args;
    let consumed_by;

    if(uri.path == "log_more")
    {
log_N("  ┌─────────┐\n"
     +"➔ │ LOG_MORE\n"
     +"  └─────────┘");
        response.writeHead(200, HTML_RESPONSE_HEADER );

        config.LOG_MORE = !config.LOG_MORE;
        log_STATUS(response);

        response.write("<span style='color:gray;'>...log_more=["+config.LOG_MORE+"]</span>");

//console.log("response.request_count["+response.request_count+"] request_LOG_MORE"+TRACE_CLOSE)
        response.end();
        consumed_by = "log_more";
    }

    return consumed_by;
};
/*}}}*/
/*_ request_STATUS {{{*/
let request_STATUS = function(args)
{
    let { uri,          response } = args;
    let consumed_by;

    if(uri.path == "status")
    {
log_N("  ┌───────┐\n"
     +"➔ │ STATUS\n"
     +"  └───────┘");
        response.writeHead(200, HTML_RESPONSE_HEADER );

        log_STATUS(response);

//console.log("response.request_count["+response.request_count+"] request_STATUS"+TRACE_CLOSE)
        response.end();
        consumed_by = "status";
    }

    return consumed_by;
};
/*}}}*/
/*_ request_dump_TABLES {{{*/
let request_dump_TABLES = function(args)
{
    let { uri,          response } = args;
    let consumed_by;

    if(   (uri.path  && uri.path .includes("dump_TABLES")
       || (uri.query && uri.query.includes("dump_TABLES"))))
    {
log_M("  ┌─────────────┐\n"
     +"➔ │ dump_TABLES │\n"
     +"  └─────────────┘");
        response.writeHead(200, HTML_RESPONSE_HEADER );
        response.write("<h3>"+uri.path+"</h3>");
        lib_postgres.dump_TABLES( response );

        consumed_by = "dump_TABLES";
    }

    return consumed_by;
};
/*}}}*/
/*_ request_EXIT {{{*/
let request_EXIT = function(args)
{
    let { uri,          response } = args;
    let consumed_by;

    if(uri.path == "exit")
    {
log_N("  ┌─────┐\n"
     +"➔ │ exit\n"
     +"  └─────┘");
        response.writeHead(200, HTML_RESPONSE_HEADER );
        response.write("<h3 style='color:darkred;'>...terminating server</h3>");
//console.log("response.request_count["+response.request_count+"] request_EXIT"+TRACE_CLOSE)
        response.end();

        consumed_by = "SERVER PROCESS EXIT";

log_N("* "+consumed_by+" *");
        process.exit(0);
    }

    return consumed_by;
};
/*}}}*/

return {  request_CLEAR
    ,     request_EXIT

    ,     request_LOG_MORE
    ,     request_STATUS
    ,     request_dump_TABLES
};
})();

//┌────────────────────────────────────────────────────────────────────────────┐
//│ RESPONSE CONTROL                                                           │
//└────────────────────────────────────────────────────────────────────────────┘
/*{{{*/
//const IFRAME_BUTTON_JS_PRETTY_PRINT =`
//<button onclick='js_pretty_print()'>JS pretty-print</button>
//`;
//
//const IFRAME_SCRIPT_JS_PRETTY_PRINT =`
//<script>
//let js_pretty_print = function()
//{
//    let pre = document.getElementById("js_code")
//    let code = pre.innerText;
//    pre.innerText = code.replace(/^/gm, "➔➔➔ ");
//};
//</script>
//`;

/*}}}*/
/*_ request_js_script {{{*/
let request_js_script = function(args) /* eslint-disable-line complexity */
{
    let { uri, request, response } = args;
    let consumed_by;

    /* [file_name] [lang] [user_id] {{{*/
    let uri_path_match = uri.path.match(/([^\/]+$)/);
    if(!uri_path_match) return "";

    let file_name = uri_path_match[1];

    let { lang , user_id  }
        = get_args_from_request_cookies({"lang":"" , "user_id":""}, request);


    /*}}}*/

    // [from_a_tool_page] {{{
    let from_a_tool_page
        =      request.headers
        &&     request.headers.referer
        && (   request.headers.referer.includes("_dev"     )
            || request.headers.referer.includes("_populate"))
    ;
if(config.LOG_MORE) console.log("request_js_script: from_a_tool_page=["+from_a_tool_page+"]");
if(config.LOG_MORE) console.log("args.uri:");
if(config.LOG_MORE) console.dir( args.uri  );

    /*}}}*/

    /* GENERATE FILE */

    /*{{{*/
    if(!consumed_by
       && (   uri.path.includes(       "feedback_topics_json.js")
           || uri.path.includes(        "i18n_translate_json.js")
           || uri.path.includes( "populate_lang_key_val_json.js")
           || uri.path.includes(      "feedback_replies_json.js")
//         || uri.path.includes(                "jqgram_tree.js")
          )
      ) {
        let file_args
            = { file_name , lang , user_id };
        if( uri.path.includes("feedback_replies_json.js") )
            file_args.no_reply_ok = true;

        lib_postgres.generate_file(file_args, response);

        consumed_by = "PUPULATE FILE";
    }
    /*}}}*/

    log_B(    "  ┌────────────────────────────────────────────────────────────────────────────┐\n"
             +"➔ │ SERVER: GENERATE FILE ["+ file_name +"]");
if(config.LOG_MORE)
    log_B(    "  │        lang=["+ lang        +"]\n"
             +"  │     user_id=["+ user_id     +"]\n"
             +"  │ consumed_by=["+ consumed_by +"]");
    log_B(    "  └────────────────────────────────────────────────────────────────────────────┘");

    return consumed_by;
};
/*}}}*/
/*_ request_sql_query {{{*/
let request_sql_query = function(args)
{
    let { uri,          response } = args;

    let consumed_by;

    if(uri.path == "query")
    {
log_N("  ┌─────────┐\n"
     +"➔ │SQL query \n"
     +"  └─────────┘");
        consumed_by = "SQL query";

        response.writeHead(200, HTML_RESPONSE_HEADER  );
        /* [qtext] {{{*/
        let qtext        =            get_query_arg(uri.query, "qtext"  );
        response.as_html = JSON.parse(get_query_arg(uri.query, "as_html") || "false");
        if( qtext )
        {
            qtext = decodeURIComponent( qtext ).replace(/\+/g," "); // "+" URL ENCODED
log_N("  ┌────────────────────────────────────────────────────────────────────────────┐\n"
     +"➔ │ SERVER: "+((qtext.length < 65) ? qtext : qtext.substring(0,65)+"…")       +"\n"
     +"  └────────────────────────────────────────────────────────────────────────────┘");
console.dir(qtext);

            /* POSTGRES SQL {{{*/
            if(qtext.includes(" "))
            {
                lib_postgres.sql_query(response, qtext);

                consumed_by = "SQL qtext";
            }
            /*}}}*/
        }
        /*}}}*/
        /* [missing args] {{{*/
        if(!consumed_by)
        {
            response.write("<pre style='color:magenta;'>QUERY MISSING ARGS IN uri.path=["+ JSON.stringify(uri.path) +"]</pre>");
//console.log("response.request_count["+response.request_count+"] request_sql_query"+TRACE_CLOSE)
            response.end();

            consumed_by = "QUERY MISSING ARGS";
        }
        /*}}}*/
    }

//console.log("consumed_by=["+consumed_by+"]");
    return consumed_by;
};
    /*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ RESPONSE FILES (async)                                                     │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ fs_read_file_callback {{{*/
let fs_read_file_callback = function(file_name, query, response, err, data)
{
/* [lang] [user_id] {{{*/
    let    lang = get_query_arg(query,    "lang");
    let user_id = get_query_arg(query, "user_id");

    let  params = (user_id   ? C+     " user_id=["+ user_id   +"]" : "")
        +         (lang      ? Y+        " lang=["+ lang      +"]" : "")
    ;
log_G(G+"  ┌────────────────────────────────────────────────────────────────────────────┐\n"
     +G+"➔ │ RESPONSE FILES (async)                                                     │\n"
     +G+"  │ "+file_name+" "+params+"\n"
     +G+"  └────────────────────────────────────────────────────────────────────────────┘");

/*}}}*/
/* [err] {{{*/
    if(err) {
log_R( err );
        if(query && query.startsWith("qtext"))
        {
            response.writeHead(404, HTML_RESPONSE_HEADER );
            response.write("<pre style='background:black; color:#DDD;'>"
                           +"<b> file_name=["+    file_name +"</b>"
                           +"<b>     query=["+    query     +"</b>"
                           +LF   +JSON.stringify( err).replace(/,/g,LF+", ")
                           +"</pre>"
                          );
        }
        else {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write( "fs_read_file_callback ["+file_name+"] :\n"
                           +JSON.stringify(err)
                          );
        }
//console.log("response.request_count["+response.request_count+"] fs_read_file_callback"+TRACE_CLOSE)
        response.end();
    }
/*}}}*/
/* [data] {{{*/
    else {
        /* RESPONSE HEADER {{{*/

        let response_200_header
            = get_response_200_header(file_name);

        if( response.content_disposition )
            response_200_header["Content-Disposition"]
                = response.content_disposition; // eslint-disable-line no-useless-computed-key

        if( response.content_disposition )
            delete response.content_disposition;

        if( response_200_header )
        {
console.dir(response_200_header);

            response.writeHead(200, response_200_header);

//          log_B("response_200_header=["+
//                (      response_200_header["Content-Type"] // eslint-disable-line dot-notation
//                    || response_200_header[        "Type"] // eslint-disable-line dot-notation
//                )+"]");
        }
        /*}}}*/
        /* WRITE FILE CONTENT .. replace (127.0.0.1|localhost) with [net_address] {{{*/
        if(query && query.startsWith("qtext")) {
            response.write("<pre style='background:black; color:#DDD;'>"+data+"</pre>");
        }
        else {
            if(net_address && DEFAULT_URI_PATH.includes(file_name))
                response.write(String(data).replace(/\b(127.0.0.1|localhost)\b/gm, net_address));
            else
                response.write(       data);
        }
        /*}}}*/
        /* ADD HIDDEN ATTRIBUTES {{{*/
        if(    lang ) response.write("<input type='hidden' id='lang'    name='lang'    value='"+lang   +"' />");
        if( user_id ) response.write("<input type='hidden' id='user_id' name='user_id' value='"+user_id+"' />");

        /*}}}*/
//console.log("response.request_count["+response.request_count+"] fs_read_file_callback"+TRACE_CLOSE)
        response.end();
    }
/*}}}*/
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ HTTP-REQUEST                                                               │
//└────────────────────────────────────────────────────────────────────────────┘
//let server_request = (function() {
//"use strict";
/*_ handle_request {{{*/
let handle_request = function(request, response, body) // eslint-disable-line complexity
{
/*{{{*/
if(config.LOG_MORE) console.log("handle_request("+request.url+")");
//console.log("body");
//console.dir( body );
/*}}}*/
    let consumed_by;
    /* XPATH {{{*/
    if(       !consumed_by
       &&      config.XPATH_TABLE
       && (   (request.url == "/domains" )
           || (request.url == "/urls"    )
           || (request.url == "/xpaths"  ))
      ) {
        body      = body.replace(/""/g,'"'); // eslint-disable-line quotes
//console.log("body=["+body+"]")
        let  args = JSON.parse(body);

        handle_request_xpath(request, response, args);

        consumed_by = "xpaths";
    }
    /*}}}*/
    /* TAXONOMY {{{*/
    if(       !consumed_by
       &&      config.TAXONOMY_TABLE
       && (   (request.url == "/taxonomy"))
      ) {
        body      = body.replace(/""/g,'"'); // eslint-disable-line quotes
//console.log("body=["+body+"]")
        let  args = JSON.parse(body);

        handle_request_taxonomy(request, response, args);

        consumed_by = "taxonomy";
    }
    /*}}}*/

//console.log("consumed_by=["+consumed_by+"]")
};
/*}}}*/



/*_ handle_request_xpath {{{*/
let handle_request_xpath = function(request,response,args)
{
//console.log("handle_request_xpath: config.XPATH_TABLE=["+config.XPATH_TABLE+"]")
log_Y( "  ┌─────────────────────────────────────────────────────────────────┐\n"
     + "  │ handle_request: request=["+request.url                        +"]\n"
     + "  │ .         cmd=[" + args.cmd                                   +"]\n"
     + "➔ │ .      domain=[" + args.domain                                +"]\n"
     + "➔ │ .         url=[" + args.url                                   +"]\n"
     + "  │ .       xpath=[" + args.xpath                                 +"]\n"
     + "  │ .        text=[" + args.text                                  +"]\n"
     + "  └─────────────────────────────────────────────────────────────────┘");

    /* NORMALIZE SYNTAX {{{*/
    if( args.xpath ) args.xpath  = args.xpath .replace( /;/g,",,");
    if( args.text  ) args.text   = args.text  .replace( /;/g,",,");
    if( args.url   ) args.url    = args.url   .replace( /;/g,",,");

    let sql;
    /*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ XPATH_TABLE [url, xpath, text] .. USR/server_index.html                │
    //└────────────────────────────────────────────────────────────────────────┘
    if     ((request.url == "/domains")                               ) sql = server_sql.SELECT_domains     (config, args);
    else if((request.url == "/urls"   )                               ) sql = server_sql.SELECT_urls        (config, args);
    else if((request.url == "/xpaths" ) && !(args.xpath) && (args.url)) sql = server_sql.SELECT_xpaths      (config, args);
    else if((request.url == "/xpaths" ) &&  (args.xpath)              ) sql = server_sql.SELECT_xpath_update(config, args);

//console.log("sql=["+sql+"]")

    response.writeHead(200, "OK", {"Content-Type": "text/html; charset=UTF-8"});
    lib_postgres.sql_query(response, sql, request.url);
};
/*}}}*/
/*_ handle_request_taxonomy {{{*/
let handle_request_taxonomy = function(request,response,args)
{
//console.log("handle_request_taxonomy: config.TAXONOMY_TABLE=["+config.TAXONOMY_TABLE+"]")
log_Y( "  ┌─────────────────────────────────────────────────────────────────┐\n"
     + "  │ handle_request: request=["+request.url                        +"]\n"
     + "  │ .         cmd=[" + args.cmd                                   +"]\n"
     + "➔ │ .         url=[" + args.url                                   +"]\n"
     + "  │ .    selected=[" + args.selected                              +"]\n"
     + "  │ .   collected=[" + args.collected                             +"]\n"
     + "  └─────────────────────────────────────────────────────────────────┘");

    /* NORMALIZE SYNTAX {{{*/
    if( args.selected ) args.selected = String(args.selected).replace( /;/g,",,");
    if( args.url      ) args.url      = String(args.url     ).replace( /;/g,",,");

    let sql;
    /*}}}*/

    //┌────────────────────────────────────────────────────────────────────────┐
    //│ TAXONOMY_TABLE [url, selected, text] .. USR/server_index.html          │
    //└────────────────────────────────────────────────────────────────────────┘
    let updating
        =  (typeof args.selected  != "undefined")
        && (typeof args.collected != "undefined")
    ;
    if     ((request.url == "/taxonomy" ) && !updating && (args.url)) sql = server_sql.SELECT_taxonomy       (config, args);
    else if((request.url == "/taxonomy" )              && (args.url)) sql = server_sql.SELECT_taxonomy_update(config, args);

//console.log("sql=["+sql+"]")

    response.writeHead(200, "OK", {"Content-Type": "text/html; charset=UTF-8"});
    lib_postgres.sql_query(response, sql, request.url);
};
/*}}}*/
//return { handle_request
//    ,    handle_request_feedback
//    ,    handle_request_lang_errors
//    ,    handle_request_xpath
//    };
//})();

/*_ get_query_arg {{{*/
let get_query_arg = function(query, arg)
{
    //log_N(query)
    //log_N(arg  )
    if(!query || !arg) return "";

    let    query_regexp = new RegExp(arg+"=([^&]*)");
    let    query_match  = query.match(query_regexp);
    return query_match  ? query_match[1] : "";
};
/*}}}*/
/*_ get_args_from_request_cookies {{{*/
let get_args_from_request_cookies = function(args,request)
{
    let cookies = request.headers.cookie ? request.headers.cookie.split("; ") : "";
    if( cookies )
    {
        for(let c=0; c<cookies.length; ++c)
        {
            for(let k=0; k < Object.keys(args).length; ++k)
            {
                let key    = Object.keys(args)[k];
                if(cookies[c].startsWith(key+"="))
                    args[key] = cookies[c].substring(key.length +1);
            }
        }
    }

    return args;
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ HTTP-RESPONSE HEADER                                                       │
//└────────────────────────────────────────────────────────────────────────────┘
/* Content-Type HEADERS {{{*/
const     JS_RESPONSE_HEADER = { "Content-Type" : "text/javascript;"   };
const    CSS_RESPONSE_HEADER = { "Content-Type" : "text/css;"          };
const    CSV_RESPONSE_HEADER = { "Content-Type" : "text/csv;"          };
const    DOC_RESPONSE_HEADER = { "Content-Type" : "application/msword" };
const    ICO_RESPONSE_HEADER = { "Content-Type" : "image/x-icon"       };
const    JPG_RESPONSE_HEADER = { "Content-Type" : "image/jpeg"         };
const    PDF_RESPONSE_HEADER = { "Content-Type" : "application/pdf"    };
const    PPT_RESPONSE_HEADER = { "Content-Type" : "vnd.ms-powerpoint"  };
const    XLS_RESPONSE_HEADER = { "Content-Type" : "application/vnd.ms-excel" };
const   XLSX_RESPONSE_HEADER = { "Content-Type" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
const   HTML_RESPONSE_HEADER = { "Content-Type" : "text/html;  charset=UTF-8", "Access-Control-Allow-Origin" : "*" };
const   DEFAULT_TEXT_PLAIN   = { "Content-Type" : "text/plain; charset=UTF-8" };
const   DEFAULT_OCTET_STREAM = { "Content-Type" : "application/octet-stream"  };

/*
:!start explorer "https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types"
 */
/*}}}*/
/*_ get_response_200_header {{{*/
let get_response_200_header = function(_file_name)
{
    let file_name = _file_name.toLowerCase();

    return (file_name.endsWith("js"     )) ?   JS_RESPONSE_HEADER
        :  (file_name.endsWith("css"    )) ?  CSS_RESPONSE_HEADER
        :  (file_name.endsWith("csv"    )) ?  CSV_RESPONSE_HEADER
        :  (file_name.endsWith("doc"    )) ?  DOC_RESPONSE_HEADER
        :  (file_name.endsWith("docx"   )) ?  DOC_RESPONSE_HEADER
        :  (file_name.endsWith("ico"    )) ?  ICO_RESPONSE_HEADER
        :  (file_name.endsWith("jpg"    )) ?  JPG_RESPONSE_HEADER
        :  (file_name.endsWith("pdf"    )) ?  PDF_RESPONSE_HEADER
        :  (file_name.endsWith("ppt"    )) ?  PPT_RESPONSE_HEADER
        :  (file_name.endsWith("xls"    )) ?  XLS_RESPONSE_HEADER
        :  (file_name.endsWith("xlsx"   )) ? XLSX_RESPONSE_HEADER
        :  (file_name.endsWith("htm"    )) ? HTML_RESPONSE_HEADER
        :  (file_name.endsWith("html"   )) ? HTML_RESPONSE_HEADER
        :  (file_name.endsWith("txt"    )) ? DEFAULT_TEXT_PLAIN   // FALLBACK (TXT)
        :                                    DEFAULT_OCTET_STREAM // FALLBACK (OTHER)
    ;

};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ PUBLIC INTERFACE                                                           │
//└────────────────────────────────────────────────────────────────────────────┘
return { config , createServer };

})();

server.createServer();







