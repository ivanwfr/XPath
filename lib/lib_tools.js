// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [lib_tools] ............................................................. │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* globals document */
/* globals lib_util */

/* exported lib_tools, LIB_TOOLS_TAG */

const LIB_TOOLS_ID       = "lib_tools";
const LIB_TOOLS_TAG      =  LIB_TOOLS_ID  +" (220107:19h:21)";
/*}}}*/
let lib_tools = (function() {
"use strict";

/*➔ get_used_shadow_host_id {{{*/
let get_used_shadow_host_id = function(shadow_host_id)
{
    let used_shadow_host_id =
        (         !shadow_host_id || get_use_lib_shadow_root())
        ? lib_util.SHADOW_HOST_ID
        :          shadow_host_id
    ;

    return used_shadow_host_id;
};
/*}}}*/
/*➔ get_shadow_host {{{*/
let get_shadow_host = function(shadow_host_id)
{
    return document.getElementById( get_used_shadow_host_id( shadow_host_id ) );
};
/*}}}*/
/*➔ get_shadow_root {{{*/
let get_shadow_root = function(shadow_host_id)
{
    let    shadow_host = get_shadow_host( shadow_host_id );
    return shadow_host
        ?  shadow_host.shadowRoot
        :  null;
};
/*}}}*/
/*➔ get_div_tools {{{*/
let get_div_tools = function(div_tools_id,shadow_host_id)
{
    return lib_util.get_tool(div_tools_id, get_used_shadow_host_id( shadow_host_id ));
};
/*}}}*/
/*➔ get_is_a_div_tools_el {{{*/
let get_is_a_div_tools_el = function(div_tools_id, el)
{
    let        div_tools  = get_div_tools(div_tools_id);
    return (   div_tools && div_tools.contains(el)               ) ? "is a child of ["+div_tools_id+"]"
        :  (   el.parentElement
            && el.parentElement.classList
            && el.parentElement.classList.contains("buttons_pod")) ? "has a buttons_pod parent"
        :                                                            false;
};
/*}}}*/
/*_ get_use_lib_shadow_root {{{*/
/*{{{*/

let     use_lib_shadow_root;
/*}}}*/
let get_use_lib_shadow_root = function()
{
    if(use_lib_shadow_root == undefined)
    {
        use_lib_shadow_root = lib_util.localStorage_getItem("use_lib_shadow_root");
        use_lib_shadow_root
            = (use_lib_shadow_root != null)
            ?  JSON.parse(use_lib_shadow_root)
            :    lib_util.USE_LIB_SHADOW_ROOT;
    }
    return     use_lib_shadow_root;
};
/*}}}*/
/*_ set_use_lib_shadow_root {{{*/
let set_use_lib_shadow_root = function(state)
{
    use_lib_shadow_root = state;
};
/*}}}*/
/* EXPORT {{{*/
return { get_used_shadow_host_id
    ,    get_shadow_host
    ,    get_shadow_root
    ,    get_div_tools
    ,    get_is_a_div_tools_el
    ,    get_use_lib_shadow_root
    ,    set_use_lib_shadow_root
};
/*}}}*/
}());

