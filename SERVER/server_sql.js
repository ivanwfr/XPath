//┌────────────────────────────────────────────────────────────────────────────┐
//│ [server_sql] .. [SELECT] [DELETE] [INSERT] [GENERATE] _TAG (211222:05h:51) │
//└────────────────────────────────────────────────────────────────────────────┘
/* jshint esversion 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals  module */
/* globals  console */ /* eslint-disable-line no-unused-vars */
/* eslint-disable no-warning-comments */
/*}}}*/
let server_sql = (function() {
"use strict";




//┌────────────────────────────────────────────────────────────────────────────┐
//│ SELECT                                                                     │
//└────────────────────────────────────────────────────────────────────────────┘
let SELECT_domains              = function(config, args) /* eslint-disable-line no-unused-vars */ //{{{
{
    if(config.LOG_MORE) console.log("SELECT_domains");

    return `SELECT url FROM ${config.XPATH_TABLE} ORDER BY url`;
}; //}}}
let SELECT_urls                 = function(config, args) //{{{
{
    if(config.LOG_MORE) console.log("SELECT_urls");

    return `SELECT url FROM ${config.XPATH_TABLE} ,REGEXP_MATCHES(url, '$1' ) ORDER BY url`.replace(/\$1/, args.domain);
}; //}}}
let SELECT_xpaths               = function(config, args) /* eslint-disable-line no-unused-vars */ //{{{
{
    if(config.LOG_MORE) console.log("SELECT_xpaths");

    let args_url   = "$$"+ args.url   +"$$";

    return `SELECT xpath FROM ${config.XPATH_TABLE} WHERE url = ${args_url};`;
}; //}}}
let SELECT_taxonomy             = function(config, args) /* eslint-disable-line no-unused-vars */ //{{{
{
    if(config.LOG_MORE) console.log("SELECT_taxonomy");

    let args_url   = "$$"+ args.url   +"$$";

    return `SELECT selected,collected FROM ${config.TAXONOMY_TABLE} WHERE url = ${args_url};`;
}; //}}}


//┌────────────────────────────────────────────────────────────────────────────┐
//│ DELETE // INSERT // APPEND                                                 │
//└────────────────────────────────────────────────────────────────────────────┘
let SELECT_xpath_update         = function(config, args) /* eslint-disable-line no-unused-vars */ //{{{
{
    if(config.LOG_MORE) console.log("SELECT_xpath_update");

        let args_url   = "$$"+ args.url   +"$$";
        let args_xpath = "$$"+ args.xpath +"$$";
        let args_text  = "$$"+ args.text  +"$$";

        let sql = `DELETE       FROM ${config.XPATH_TABLE} WHERE url = ${args_url} AND xpath=${args_xpath};`;

        if(args.cmd != "delete")
            sql += "\n"+
`INSERT INTO    ${config.XPATH_TABLE}
        values( ${args_url}, ${args_xpath}, ${args_text});`;

    return sql;
}; //}}}
let SELECT_taxonomy_update         = function(config, args) /* eslint-disable-line no-unused-vars */ //{{{
{
    if(config.LOG_MORE) console.log("SELECT_taxonomy_update");

        let args_url       = "$$"+ args.url       +"$$";
        let args_selected  = "$$"+ args.selected  +"$$";
        let args_collected = "$$"+ args.collected +"$$";

        let sql =
`DELETE FROM    ${config.TAXONOMY_TABLE} WHERE url = ${args_url};`;

//console.log("(typeof args.selected  != 'undefined')=["+(typeof  args.selected  != "undefined")+"]");
//console.log("(typeof args.collected != 'undefined')=["+(typeof  args.collected != "undefined")+"]");
//console.log(" Sring( args.selected                )=["+ String( args.selected )               +"]");
//console.log(" Sring( args.collected               )=["+ String( args.collected)               +"]");

        let updating
            =  (String( args.selected  ).length > 0)
            || (String( args.collected ).length > 0)
        ;

        if( updating )
            sql += "\n"+
`INSERT INTO    ${config.TAXONOMY_TABLE}
        values( ${args_url}, ${args_selected}, ${args_collected});`;

    return sql;
}; //}}}






//┌────────────────────────────────────────────────────────────────────────────┐
//│ GENERATE                                                                   │
//└────────────────────────────────────────────────────────────────────────────┘
let get_query_for_file_name     = function(file_name,config,args) /* eslint-disable-line no-unused-vars */ //{{{
{
    return "";
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ TABLES                                                                     │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ get_table_names {{{*/

const TABLE_NAMES
    = [   "site_TREE"
        , "site_XPATH"
    ];

let get_table_names = function()
{
    return TABLE_NAMES;
};
/*}}}*/
/*_ populate_JSON {{{*/
let populate_JSON = function(res,args,response) /* eslint-disable-line no-unused-vars */
{
    return "";
};
/*}}}*/

return { get_table_names

    //   SELECT
    ,    SELECT_domains
    ,    SELECT_urls
    ,    SELECT_xpaths
    ,    SELECT_taxonomy

    //   DELETE // INSERT // APPEND
    ,    SELECT_xpath_update
    ,    SELECT_taxonomy_update





    //  GENERATE
    ,   get_query_for_file_name
    ,   populate_JSON
};

})();

try { module.exports = server_sql; } catch(ex) {} /* server.js require */

