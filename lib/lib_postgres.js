//┌────────────────────────────────────────────────────────────────────────────┐
//│ [lib_postgres.js]                                                          │
//└────────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals  console, require, module */
/* exported lib_postgres, LIB_POSTGRES_JS_TAG */

const LIB_POSTGRES_JS_ID  = "lib_postgres";
const LIB_POSTGRES_JS_TAG = LIB_POSTGRES_JS_ID+" (211021:19h:53)";    // eslint-disable-line no-unused-vars
/*}}}*/

let lib_postgres = (function() {
"use strict";

//┌────────────────────────────────────────────────────────────────────────────┐
//│ CONFIG .. [HOST USER PASSWORD DATABASE] .. [TABLES] .. [SELECT]            │
//└────────────────────────────────────────────────────────────────────────────┘
/* eslint-disable no-warning-comments */
/*{{{*/
/* eslint-disable no-unused-vars */
const     JS_RESPONSE_HEADER = { "Content-Type" : "text/javascript;" };
const    CSS_RESPONSE_HEADER = { "Content-Type" : "text/css;"        };
const   HTML_RESPONSE_HEADER = { "Content-Type" : "text/html; charset=UTF-8", "Access-Control-Allow-Origin" : "*" };
const IMAGES_RESPONSE_HEADER = {         "type" : "image/x-icon"     };
/* eslint-enable  no-unused-vars */
/*}}}*/
/*_ LOG (ANSII-TERMINAL) {{{*/
/* eslint-disable no-unused-vars */
const TRACE_OPEN  = " {{{";
const TRACE_CLOSE = " }}}";

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
let log_Y = function(arg0, ...rest) { log_X([ Y + arg0, ...rest]); };

let log_N = function(arg0, ...rest) { log_X([ N + arg0, ...rest]); };

/* eslint-enable  no-unused-vars */
/*}}}*/

/*➔ configure {{{*/
/*{{{*/
let config     = {};
let server_sql = {};

/*}}}*/
let configure  = function(_config,_server_sql)
{
    config     = _config;
    server_sql = _server_sql;
};
/*}}}*/
/*➔ require Client {{{*/
let { Client }  = require("pg");

/*}}}*/
/*➔ new_Client {{{*/
/*{{{*/
let     client;
/*}}}*/
let new_Client = function()
{
    if( !client )
    {
        client = new Client({ host     : config.HOST
                            , user     : config.USER
                            , password : config.PASSWORD
                            , database : config.DATABASE
        });
        client.connect();
    }
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ SQL QUERY                              .. [args] := { [query OR file_name] │
//└────────────────────────────────────────────────────────────────────────────┘
/* RESPONSE_STYLESHEET {{{*/
const RESPONSE_STYLESHEET /* eslint-disable-line no-unused-vars */
=`
/* ECC color-code {{{
<style>
.bg1 { background-color:rgba(150,075,000,0.4); } .bg1 * { color: #FFF; }
.error,
.bg2 { background-color:rgba(255,000,000,0.4); } .bg2 * { color: #FFF; }
.bg3 { background-color:rgba(255,165,000,0.4); } .bg3 * { color: #000; }
.bg4 { background-color:rgba(255,255,000,0.4); } .bg4 * { color: #000; }
.response,
.bg5 { background-color:rgba(154,205,050,0.4); } .bg5 * { color: #000; }
.bg6 { background-color:rgba(100,149,237,0.4); } .bg6 * { color: #000; }
.bg7 { background-color:rgba(238,130,238,0.4); } .bg7 * { color: #000; }
.bg8 { background-color:rgba(160,160,160,0.4); } .bg8 * { color: #000; }
.bg9 { background-color:rgba(255,255,255,0.4); } .bg9 * { color: #000; }
.bg0 { background-color:rgba(032,032,032,0.4); } .bg0 * { color: #FFF; }

</style>
}}}*/
`;
/*}}}*/
/*➔ sql_query {{{*/
/*{{{*/
let pending_queries = [];

/*}}}*/
let sql_query = function(response, qtext, uri)
{
let log_this=false;
if( log_this ) console.log("sql_query(response, qtext, uri=["+uri+"])");
//console.log("qtext:\n[\n"+qtext+"\n]")

    new_Client();

    /* queries {{{*/
    let queries = qtext.split(";");

    for(let i=0; i < queries.length; ++i)
    {
        queries[i] = queries[i].trim();

        if(!queries || (queries[i] == "''")) { queries.splice(i, 1); --i; }
    }
if(log_this) log_R("queries: ... length=["+(queries ? queries.length : "")+"]:");
//console.dir( queries )
    /*}}}*/

    for(let i=0; i < queries.length; ++i)
    {
        let query =  queries[i];
        if( query ) {
            pending_queries.push(query);
/* LOG {{{*/
if( log_this ) {
    let sql = query.replace(/\)\s*/g,"\n) ").replace(/\s*,\s*/g,"\n, ");

let count
= ((pending_queries.length > 0   ) ? " ["+(i+1)+" / "+pending_queries.length+"]:" :   "")
//(             sql.includes  ("\n") ? "\n"                                       :   "")
        + "\n"
;

if(config.LOG_MORE)
log_M("  ┌────────────────────────────────────────────────────────────────────────────┐\n"
    + "… │ POSTGRES "+count + sql.replace(/^/gm,"… │  ").replace(/ *\b(values|WHERE|AND|OR)\b/igm,"\n… │  $1")+"\n"
    + "  └────────────────────────────────────────────────────────────────────────────┘");

}
/*}}}*/
            let args = { query , uri };
            client.query(query, function(err,res) { query_callback(args,response, err,res); });
        }
    }
if( log_this) log_C("sql_query: "+(pending_queries ? pending_queries.length : "")+" pending_queries...");
};
/*}}}*/
/*_ query_callback {{{*/
const LF = String.fromCharCode(10); // eslint-disable-line no-unused-vars
const NO_SQL_REPLY_TO_REQUEST = "NO SQL REPLY TO REQUEST";

let query_callback = function(args,response, err,res) // eslint-disable-line complexity
{
let log_this= false;
if( log_this) log_M(  "┌────────────────┐\n"
                     +"│ query_callback"    );
//{{{
//console.log("...args ("+(typeof args)+"):")
//console.log("...query_callback: args=["+args+"]")
//console.log("...res.rows.length=["+res.rows.length+"]")
//console.log(args)
//}}}
    /* 1/3 [err] {{{*/
    if( err ) {
if( log_this) log_M(  "│ 1/3 ➔ err"         );

        args.origin = "query_callback";
        query_callback_err(args,response,err);
    }
    /*}}}*/
    /* 2/3 [res.rows] {{{*/
    else if((res.rows && res.rows.length) || args.no_reply_ok) {
if( log_this) log_M( "│ 2/3 ➔ "+res.rows.length+" ROWS"+(args.no_reply_ok ? " no_reply_ok" : ""));
//console.dir(res.rows)

        let consumed_by
            = server_sql.populate_JSON(res, args, response);

        if(!consumed_by && response.as_html)
            consumed_by = query_callback_write(response, res, args);

        /* LINIFY [res.rows] {{{*/
        if(!consumed_by)
        {
log_G("...responding with "+res.rows.length+" res.rows:");

            let lines_JSON = JSON.stringify( res.rows );
log_ellipsis(B,"lines_JSON", lines_JSON, 500);

//response.write(RESPONSE_STYLESHEET);
            response.write( lines_JSON );
        }
        /*}}}*/
    }
    /*}}}*/
    /* 3/3 [no response] {{{*/
    else {
if( log_this) log_M( "│ 3/3 ➔ NO res.rows");
//console.dir(args)
        /*  response.reply {{{*/
        if(!response.reply)
        {
            response.reply = { err: NO_SQL_REPLY_TO_REQUEST, ...args };

            let answer
                = response.as_html
                ? ( "<b>"+JSON.stringify( response.reply )+"</b>")
                : ( "/*" +JSON.stringify( response.reply )+ " */");

//if(config.LOG_MORE) log_ellipsis(Y, "answer", answer, 500);

//response.write(RESPONSE_STYLESHEET);
            response.write( answer );
        }
        /*}}}*/
    }
    /*}}}*/
    /* ... check this query as answered {{{*/
    if(args.query) {
if( log_this) log_M( "│ ...query_callback_pop_pending_queries");

        query_callback_pop_pending_queries(args);
    }
    /*}}}*/
if( log_this) log_M(  "│ query_next\n"
                     +"└────────────────┘"  );
    query_next( response );
};
/*}}}*/
/*_ query_callback_write {{{*/
let query_callback_write = function(response,res,args)
{
    let lines = "";
    for(let i=0; i<res.rows.length; ++i)
        lines += query_callback_write_linify_res_row(res.rows[i])+"\n"
//                    .  replace(  /,"/g,  ',<br> ,"'  ) // eslint-disable-line quotes
//                    .  replace(  /,'/g,  ",<br> ,'"  )
////                  .  replace( /:/g,'\t:\t'  ) // eslint-disable-line quotes
//                    .  replace( /"\s*:\s*"/g,'"\t:\t"'  ) // eslint-disable-line quotes
//                    .  replace( /'\s*:\s*'/g,"'\t:\t'"  ) // eslint-disable-line quotes
////                  .  replace(  /,'/g , "'<br>\t,'" )
        ;
//log_M("lines=["+lines+"]")

    if( response ) {
//response.write(RESPONSE_STYLESHEET);
        response.write(`
<div style='width:max-content; overflow:auto;'>
<div style='color:gray; font-size:100%;'>${args.query || args}</div>
<pre style='font-weight:900' class='response'>${lines}</pre>
<hr>
</div>
`);
    }

    return "query_callback_write";
};
/*}}}*/
/*_ query_callback_write_linify_res_row {{{*/
let query_callback_write_linify_res_row = function(res_row)
{
    return res_row
        ?  JSON.stringify( res_row )
//      .       replace( /(label)/g , "<em class='bg7'>$1</em>")
//      .       replace( /(false)/g , "<em class='bg2'>$1</em>")
//      .       replace( /(true)/g  , "<em class='bg5'>$1</em>")
//      .       replace(/^\[*/, ""                 )
//      .       replace(/\]*$/, ""                 )
//      .       replace(/},/g , "},</li>"+LF+"<li>")
//      .       replace(/},/g , "},"     +LF       )
        :  ""
    ;
};
/*}}}*/
/*_ query_callback_err {{{*/
let query_callback_err = function(args,response,err)
{
//log_M("CALLBACK.query_callback_err: "+ err.stack)
//console.dir(args)

    let args_str
        = JSON.stringify(args)
        .  replace(/^\{/, ""     )
        .  replace(/\}$/, ""     )
        .  replace(/:/g , " : "  )
        .  replace(/,/g , "\n"   )
        .  replace(/^/gm, "│ ➔ " )
    ;

    let reply
        =         "┌ reply ─────────────┐\n"
        + (err ? ("│ "+err             +"\n") : "")
        +         "│ args:\n"+(args_str+"\n")
        +         "└────────────────────┘\n"
    ;
console.log(reply);

    let origin = (args.origin ? args.origin : "");

    response.writeHead(404, HTML_RESPONSE_HEADER ); /* override previous header (which works fine!) */
    response.write(
`/*
${origin} ERROR
<pre id="js_code">${reply}</pre>
<style>HTML * { background-color: rgb(255,0,0,0.7); }</style>
*/`
                  );
//console.log("response.request_count["+response.request_count+"] query_callback_err"+TRACE_CLOSE)
//    response.end();
};
/*}}}*/
/*_ query_callback_pop_pending_queries {{{*/
let query_callback_pop_pending_queries = function(args)
{
//log_N("➔ pending_queries.length=["+pending_queries.length+"]")
//log_N("args.query=["+args.query+"]")
  for(let i=0; i < pending_queries.length; ++i)
  {
//log_N("pending_queries["+i+"]=["+pending_queries[i]+"]")
      if(pending_queries[i] == args.query)
      {
//log_R("… REMOVING ANSWERED pending_queries["+i+"]")

            pending_queries.splice(i, 1); break; // remove only one at a time
        }
    }
};
/*}}}*/
/*_ query_next {{{*/
let query_next = function(response)
{
    /* [dump_TABLES_stack] {{{*/
    if( dump_TABLES_stack && dump_TABLES_stack.length)
    {
//log_R("… LAST/NEXT QUERY")
        dump_TABLES_next(response);

    }
    /*}}}*/
    /* [pending_queries] {{{*/
    else if(!pending_queries || !pending_queries.length)
    {
if(config.LOG_MORE)
    log_C("REQUEST #"+response.request_count+" "+TRACE_CLOSE+" NO MORE pending_queries");

        if(response) response.end();
        //client.end(); // KEEP IT AlIVE
    }
    /*}}}*/
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ UTIL                                                                       │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ log_ellipsis {{{*/
let log_ellipsis = function(color, title, msg, len_max)
{
    log_N(color
          + " ➔ "+title+":\n"
          + msg
          .  substring(0,len_max)
          .  replace( /[\{\}\[\]"]/g, " "  )
          .  replace( /,/gm         , "\n" )
          .  trim()
          .  replace( /^ */gm       , "   " )
          + "\n...")
          ;
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ GENERATE DYNAMIC FILES                           server_sql query_callback │
//└────────────────────────────────────────────────────────────────────────────┘
/*➔ generate_file {{{*/
let generate_file = function(args,response)
{
    let { file_name, lang, user_id           } = args;
//  let { file_name, lang, user_id, site_url } = args;

    log_M(M+"  ┌────────────────────────────────────────────────────────────────────────────┐\n"
         +M+"… │ POPULATE FILE: "+G+file_name+" "+Y+lang+" "+B+user_id+"\n"
         +M+"  └────────────────────────────────────────────────────────────────────────────┘");
    /* POPULATE SQL QUERY {{{*/
    let query = server_sql.get_query_for_file_name(file_name,config,args);
    if( query )
    {
    log_B(  "  ┌────────────────────────────────────────────────────────────────────────────┐\n"
           +     query.replace(/^/gm,"… │ ")+"\n"
           +"  └────────────────────────────────────────────────────────────────────────────┘");
        new_Client();
        client.query(query, function(err,res) { query_callback(args,response, err,res); });
    }
    /*}}}*/
    /* CANNOT GENERATE THIS FILE {{{*/
    else {
        response.writeHead(404, HTML_RESPONSE_HEADER );
//      response.write(RESPONSE_STYLESHEET);
        response.write(     "/*"
                       +    "<div>"
                       +    " <pre class='error'>"
                       +    "  <b> CANNOT GENERATE THIS FILE .. REQUEST: "+JSON.stringify(args)+"</b>"
                       +    " </pre>"
                       +    "</div>"
                       +    "*/"
                      );
//console.log("response.request_count["+response.request_count+"] generate_file"+TRACE_CLOSE)
        response.end();
    }
    /*}}}*/
};
/*}}}*/

//┌─▼▼▼▼▼▼▼───────────────────────────────────────────────────────────────────┐
//│ CATALOG                                             config query_callback │
//└─▲▲▲▲▲▲▲───────────────────────────────────────────────────────────────────┘
/*➔ dump_TABLES {{{*/
let dump_TABLES_stack;

let dump_TABLES = function(response)
{
    new_Client();

    response.as_html = true;

    dump_TABLES_stack = Array.from( server_sql.get_table_names() );

    dump_TABLES_next(response);
};
/*}}}*/
/*_ dump_TABLES_next {{{*/
let dump_TABLES_next = function(response)
{
    let db_name = dump_TABLES_stack.shift(); // Removes the first element from an array and returns that element
//log_M("db_name=["+db_name+"]")

    if( db_name ) {
        let query = "SELECT * FROM "+ db_name;
//log_M( query );

        let args = { query };
        client.query(query, function(err,res) { query_callback(args,response, err,res); });
    }
    else {
        response.write("<em>client.end</em>");
//console.log("response.request_count["+response.request_count+"] dump_TABLES_next"+TRACE_CLOSE)
        response.end();
        //client.end(); // KEEP IT ALIVE
    }
};
/*}}}*/

    return { configure
        ,    sql_query
        ,    generate_file
        ,    dump_TABLES
    };

})();

try { module.exports = lib_postgres; } catch(ex) {} /* server.js require */

