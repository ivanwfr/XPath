//┌────────────────────────────────────────────────────────────────────────────┐
//│ [server_control.js]                                                        │
//└────────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* globals  console, window, location, document, navigator */
/* globals  setTimeout, localStorage*/
/* exported server_control */

/* eslint-disable no-warning-comments */

const SERVER_CONTROL_JS_ID  = "server_control";
const SERVER_CONTROL_JS_TAG = SERVER_CONTROL_JS_ID +" (211027:19h:15)";
/*}}}*/
let server_control = (function() {
"use strict";

//┌────────────────────────────────────────────────────────────────────────────┐
   const LANG_KEY    = "lang";
//└────────────────────────────────────────────────────────────────────────────┘
/*➔ get_lang  .. [LANG_KEY .. lang] {{{*/
let     lang;
let get_lang = function()
{
    lang = get_cookie(LANG_KEY);
    if(lang) {
        sync_lang("["+LANG_KEY+"] FROM COOKIE");
    }
    else {
        set_lang(navigator.language.substring(0,2).toUpperCase(), "FALLBACK TO NAVIGATOR LANG");
        sync_lang("["+LANG_KEY+"] FROM NAVIGATOR");
    }
    return lang;
};
/*}}}*/
/*_ clr_lang {{{*/
let clr_lang = function()
{
    lang = undefined;
    document.cookie = LANG_KEY+"=; expires=0; path=/";

    sync_lang("COOKIE ["+LANG_KEY+"] DELETED BY USER");
};
/*}}}*/
/*_ set_lang {{{*/
let set_lang = function(_lang,_caller)
{
//console.log("set_lang(["+_lang+"] , ["+_caller+"])")

    lang = _lang.toUpperCase().trim();
    if(( lang  == "US") || (lang == "GB"))
         lang   = "EN";

    document.cookie = LANG_KEY+"="+lang+"; max-age="+(24*3600)+"; path=/";
//console.dir(document.cookie)

    sync_lang("SETTING COOKIE ["+LANG_KEY+"]=["+lang+"] ["+_caller+"]");
};
/*}}}*/
/*_ sync_lang {{{*/
let sync_lang = function(_caller)
{
//console.log("sync_lang: lang=["+lang+"] .. _caller=["+_caller+"]")

    let lang_div = document.getElementById("lang_div");
    if( lang_div ) {
        lang_div.innerHTML
            = "<em class='lang'     title='"+_caller+"'>"+(lang || "")+"</em>";

        if(lang) {                  lang_div.classList.remove("missing"); }
        else     {                  lang_div.classList.add   ("missing"); }
    }

    set_lang_UI(lang);
};
/*}}}*/
/*_ set_lang_UI {{{*/
let set_lang_UI = function()
{
//console.log("set_lang_UI")

    /* SET HTML LANG {{{*/
    let html  = document.getElementsByTagName("HTML")[0];
    html.lang = lang;

    /*}}}*/
    /* CHECK LANG RADIO-BUTTON {{{*/
    let el = document.getElementById(lang);
//console.log("LANG RADIO-BUTTON [lang]")
//console.dir(el)
    if( el ) el.checked = true;

    /* FORM [lang] PARAMETER */
    el = document.getElementById("lang"); /* form input to persist current lang */
//console.log("FORM [lang] PARAMETER")
//console.dir(el)
    if( el ) el.value = lang;

    /* BUTTON.[bg_<lang>] */
    el = document.querySelector("BUTTON.bg_"+lang);
//console.log("[BUTTON.bg_"+lang+"]")
//console.dir(el)
    if( el ) {
        let buttons = document.querySelectorAll("BUTTON.flag");
        for(let i=0; i<buttons.length; ++i)
            buttons[i].classList.remove("selected");
        el.classList.add("selected");
    }

    /* SELECT [country_select] */
    el = document.getElementById("country_select");
//console.log("SELECT [country_select]")
//console.dir(el)
    if( el ) el.value = lang;

    /*}}}*/
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
   const USER_ID_KEY = "user_id";
//└────────────────────────────────────────────────────────────────────────────┘
/*➔ get_user_id  .. [USER_ID_KEY .. user_id] {{{*/
let     user_id;
let get_user_id = function()
{
    user_id = get_cookie(USER_ID_KEY);

//console.log("get_cookie("+USER_ID_KEY+") .. user_id=["+user_id+"]")

    sync_user_id("["+USER_ID_KEY+"] FROM COOKIE");

    return user_id;
};
/*}}}*/
/*_ clr_user_id {{{*/
let clr_user_id = function()
{
    user_id = undefined;
    document.cookie = USER_ID_KEY+"=; expires=0; path=/";

    sync_user_id("COOKIE ["+USER_ID_KEY+"] DELETED BY USER");
};
/*}}}*/
/*_ set_user_id {{{*/
let set_user_id = function(_user_id)
{
//console.log("set_user_id("+_user_id+")")

    user_id = _user_id.trim();

    document.cookie = USER_ID_KEY+"="+user_id+"; max-age="+(24*3600)+"; path=/";

    sync_user_id("SETTING COOKIE ["+USER_ID_KEY+"]=["+user_id+"]");
};
/*}}}*/
/*_ sync_user_id {{{*/
let sync_user_id = function(_caller)
{
//console.log("sync_user_id: user_id=["+user_id+"] .. _caller=["+_caller+"]")

    let user_id_div = document.getElementById("user_id_div");
    if( user_id_div ) {
        user_id_div.innerHTML
            = "<em class='user_id'  title='"+_caller+"'>"+(user_id || "")+"</em>";

        if(user_id) {               user_id_div.classList.remove("missing"); }
        else        {               user_id_div.classList.add   ("missing"); }
    }

};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ SUBMIT SQL QUERY .. work on loading-sql-from-file here                     │
//  see server.js:
//      let fs = require("fs");
//      fs.existsSync   ( dir_name  )
//      fs.existsSync   ( file_name )
//      fs.readFileSync ( file_name )
//└────────────────────────────────────────────────────────────────────────────┘
/*_ qtext_clear {{{*/
let qtext_clear    = function(qtext)
{
//console.log("qtext_clear("+qtext.value+")")

    qtext.value = "";
};
/*}}}*/
/*_ qtext_add {{{*/
let qtext_add  = function(_text)
{
//console.log("qtext_add("+_text+")")

    /* TRIM AND EVAL */
    let text
        = _text
        .  replace(              /"/gm,  "'") // DOUBLEQUOTE ➔ SINGLEQUOTE
        .  replace(/(\n\s+)|(\s+\n)/gm, "\n") // SPACE       ➔ trim heading and trailing
        .  replace(             /;$/  , ""  ) // SEMICOLON   ➔ postpone
    ;

    /* UPDATE TEXTAREA */
    let qtext  = document.getElementById("qtext");
    let append = document.getElementById("append");

    let    sep = qtext.value.trim() ? ";\n" : "";
    if( append.checked ) qtext.value += sep + text;
    else                 qtext.value  =       text;

    /* adjust height */
    textarea_adjust_height(qtext);

    /* SUBMIT TEXT */
    if(!append.checked ) qtext_submit(qtext);
return false;
};
/*}}}*/
/*_ textarea_adjust_height {{{*/
let textarea_adjust_height = function(ta)
{

    /* current and max style height */
    let    cs = window.getComputedStyle(ta);
//console.dir(cs)
    let fs_px = (parseFloat(cs.fontSize) +0.5).toFixed(2);
//console.log("...cs.fontSize=["+cs.fontSize+"] ➔ fs_px=["+fs_px+"]")

    let cur_h = parseInt(cs.height   );
    let max_h = parseInt(cs.maxHeight);

    /* lines count */
    let     t = ta.value.replace(/^.*$/gm,"");
    let lines = t.length + 1;
    let txt_h = Math.round((lines+1) * fs_px);

    /* adjust height */
    let too_small = (cur_h < txt_h);
    let can_grow  = (max_h > cur_h);
//console.log("...too_small=["+too_small+"] .. can_grow=["+can_grow+"]")
    if(too_small && can_grow)
    {
//console.log("lines=["+lines+"] .. fs_px=["+fs_px+"] .. txt_h=["+txt_h+"] .. cur_h=["+cur_h+"] .. max_h=["+max_h+"]")

        let qtext = document.getElementById("qtext");
        qtext.style.height = Math.min(txt_h, max_h)+"px";
    }
};
/*}}}*/
/*_ qtext_onchange {{{*/
let qtext_onchange = function(qtext, event)
{
//console.log("qtext_onchange("+qtext.value+")")

    qtext_submit(qtext, event);
};
/*}}}*/
/*_ qtext_onkeyup {{{*/
let qtext_onkeyup  = function(qtext, event)
{
console.log("qtext_onkeyup("+qtext.value+")");

    /* MODIFIERS */
    if(event.shiftKey     ) return;
    if(event.ctrlKey      ) return;

//  /* ESCAPE */
//  if(event.keyCode == 27) {
//      if( qtext.user_value)
//          qtext.value = qtext.user_value;
//      return;
//  }

    /* SNAPSHOT */
    if((event.keyCode != 13) || event.shiftKey) // accept ENTER with shift modifier
    {
      qtext.user_value = qtext.value;
//    .  replace(/([^;]$)/m ,"$1;"  )
//    .  replace(/([^;])\n/g,"$1;\n")

//      qtext.user_value = qtext.value;
    }

    /* ENTER .. SKIP */
//  if((event.keyCode == 13) && qtext.user_value)
//      qtext.value    = qtext.user_value;

    /* SUBMIT */
    if(event.keyCode == 13) // discard SUBMIT-ENTER
    {
        qtext.user_value
            = qtext.user_value
            .  replace( /\n{2,}/gm, "\n")
            .  replace(/([^;]$)/gm,"$1;")
            .  replace(  /(^;$)/gm,   "")
        ;

        qtext.value
            = qtext.user_value;

        qtext_submit(qtext, event);
    }

    // reject entered character
//  if( event.stopPropagation          ) event.stopPropagation         ();
//  if( event.stopImmediatePropagation ) event.stopImmediatePropagation();
//  if( event.preventDefault           ) event.preventDefault          ();

};
/*}}}*/
/*_ qtext_submit {{{*/
let qtext_submit   = function(qtext)
{
//console.log("qtext_submit("+qtext.value+")")
  /* ASSERT MANDATORY PARAMS */
    if(!user_id) user_id = get_user_id();
//  if(!user_id) return;
//console.log("user_id=["+user_id+"]")

    if(!lang   ) lang    = get_lang();
//  if(!lang   ) return;
//console.log("lang=["+lang+"]")

    /* PRESERVE USER FORMAT */
    if(!qtext.user_value) qtext.user_value = qtext.value.trim();

    /* ENCODING QUOTE */
    qtext.value = qtext.value.replace(/""/g, '\"\"'); /* eslint-disable-line quotes */

    /* POPULATE REQUEST PARAMS */
    qtext.value = qtext.value.replace(/USER_ID/g, user_id);
    qtext.value = qtext.value.replace(/LANG/g   , lang   );
//console.log("qtext_submit("+qtext.value+")")
    set_query_format_div_watermark( qtext.value );

    /* ENCODE INPUT VALUES */
    qtext.value     = encodeURIComponent(qtext.value);
//console.log("qtext:"      )
//console.dir( qtext        )
//console.log("qtext.value:")
//console.dir( qtext.value  )

    /* SUBMIT FORM */
    qtext.form.action="/query";
    qtext.form.submit();

    /* ONCE SUBMIT DONE: discard encoded value */
    setTimeout(function() { if(!qtext.user_value) return; qtext.value = qtext.user_value; delete qtext.user_value; }, 1000);
};
/*}}}*/
/*_ disableAfterSubmit {{{*/
let disableAfterSubmit = function(event)
{
//console.log("disableAfterSubmit")

    /* defer until after this event dispatch */
    setTimeout(function() { event.target.disabled = true; }, 0);
};
/*}}}*/

/*➔ query_iframe_onsubmit {{{*/
let query_iframe_onsubmit = function(event)
{
//console.log("➔ query_iframe_onsubmit(event)")

    let event_submitter_innerText = event.submitter.innerText;
    if(!event_submitter_innerText) return;

    set_query_format_div_watermark( event_submitter_innerText );
};
/*}}}*/
/*_ set_query_format_div_watermark {{{*/
let set_query_format_div_watermark = function(watermark)
{
//console.log("➔ set_query_format_div_watermark("+watermark+")")

    let query_format_div       = document.getElementById("query_format_div");
    query_format_div.watermark = watermark;

//let qtext              = document.getElementById("qtext");
//console.log("➔ qtext.value=[\n"+qtext.value+"\n]");
};
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ COOKIES                                                                    │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ get_cookie {{{*/
let get_cookie = function(key)
{
    let    value;
    let  cookies = document.cookie.split(";");
    let param_EQ = key+"=";
    for(let i=0; i < cookies.length; ++i)
    {
        let s = cookies[i].trim();
        if( s.indexOf(param_EQ) == 0)
        {
            value = s.substring(param_EQ.length, s.length)
                .     replace(/'/g,"")
                .     replace(/"/g,"");
            break;
        }
    }
//console.log("get_cookie("+key+") ...return ["+value+"]")
    return value;
};
/*}}}*/
/*_ del_cookie {{{*/
let del_cookie = function(name)
{
//console.log("del_cookie("+name+")")
    document.cookie = name+"=; expires=0; path=/";
};
/*}}}*/
/*_ set_cookie {{{*/
let set_cookie = function(name,value)
{
//console.log("set_cookie("+name+" , "+value+")")

    document.cookie = name+"="+String(value).trim()+"; max-age="+(24*3600)+"; path=/";
};
/*}}}*/
/*➔ localStorage {{{*/
let localStorage_setItem = function(key,val) { if(val) localStorage.setItem   (key,val); else localStorage.removeItem(key); }; // eslint-disable-line no-unused-vars
let localStorage_getItem = function(key    ) { return  localStorage.getItem   (key    ); }; // eslint-disable-line no-unused-vars
let localStorage_delItem = function(key    ) { /*...*/ localStorage.removeItem(key    ); }; // eslint-disable-line no-unused-vars
/*}}}*/

//┌────────────────────────────────────────────────────────────────────────────┐
//│ PAGE                                                                       │
//└────────────────────────────────────────────────────────────────────────────┘
/*_ tag_page {{{*/
let tag_page = function()
{

    let tag           = document.createElement("I");
    document.body.insertBefore(tag, document.body.firstElementChild);
    tag.outerHTML     = "<i style='float:right; clear:right; color:rgba(68,68,255,0.3); margin:  0em 0 0 0;'>"+SERVER_CONTROL_JS_TAG+"</i>";

    let loc           = document.createElement("I");
    document.body.insertBefore(loc, document.body.firstElementChild);
    loc.outerHTML     = "<i style='float:right; clear:right; color:rgba(68,68, 68,0.3); margin:3.0em 0 0 0;'>"+location.href+"</i>";

//  let doc           = document.createElement("I");
//  document.body.insertBefore(doc, document.body.firstElementChild);
//  doc.outerHTML     = "<a style='float:right; color:rgba(68,68,68,0.3); margin:0;' target='doc' href='/doc/index.html'>&#x1F4A1;</i>";

    let secure = document.location.href.toLowerCase().startsWith("https"    );
    let local  = document.location.href.toLowerCase().includes  ("//localhost");
    document.body.style.backgroundColor
        = secure ? "#EEE" // bright
        : local  ? "#FFB" // yellowish
        :          "#FDD" // redish
        ;

    document.getElementsByTagName("title")[0].innerText
    = document.location.href
      .replace(/\/\w+\.html/,   "")
      .replace(/:\/\//      ," ➔ ")
      .toUpperCase()
      ;

    let button = document.getElementById("status"); if(button) button.click();

};
/*}}}*/

return { clr_lang
    ,    clr_user_id
    ,    disableAfterSubmit
    ,    get_lang
    ,    get_user_id
    ,    qtext_add
    ,    qtext_clear
    ,    qtext_onchange
    ,    qtext_onkeyup
    ,    qtext_submit
    ,    set_lang
    ,    set_user_id
    ,    tag_page
    ,    query_iframe_onsubmit
    // cookies
    ,    del_cookie
    ,    get_cookie
    ,    set_cookie
    // localStorage
    ,    localStorage_setItem
    ,    localStorage_getItem
    ,    localStorage_delItem
};
})();
