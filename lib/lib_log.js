//┌────────────────────────────────────────────────────────────────────────────┐
//│ lib_log                                                                    │
//└────────────────────────────────────────────────────────────────────────────┘
/* lib_log {{{*/

/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */
/* globals chrome, module */
/* globals console */
/* globals window */
/* globals lib_util */

/* exported LIB_LOG_JS_TAG */

/* eslint-disable no-warning-comments */
/*
:update|1,$y *
:!start explorer https://jshint.com/
*/

const LIB_LOG_JS_ID         = "lib_log";
const LIB_LOG_JS_TAG        =  LIB_LOG_JS_ID +" (211211:01h:37)";
/*}}}*/
let lib_log = (function() {
"use strict";
let log_this = false;
/* CSS {{{*/
const lbA  = "background-color:inherit;   color:inherit;";

const lbF  = "font-size:120%; font-weight:500; border:2px solid white;";
const lbb  = "font-size:150%; font-weight:100; margin:0 0 0 0;";
const lbB  = "font-size:300%; font-weight:100; margin:0 0 0 0;";
const lbS  = "font-size:500%; font-weight:100; margin:0 0 0 0;";

const lbH  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex 1ex   0; padding:0 .5em 0 .5em; border-radius:1em 1em 1em 1em; background:linear-gradient(to bottom, #555 0%, #223 80%, #454 100%);";
const lbL  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0   0   0 1ex; padding:0 .5em 0 .5em; border-radius:1em   0   0 1em; background:linear-gradient(to   left, #333 0%           ,#445 100%);";
const lbR  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex   0   0; padding:0 .5em 0 .5em; border-radius:  0 1em 1em   0; background:linear-gradient(to  right, #333 0%           ,#544 100%);";
const lbC  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0   0   0   0; padding:0 .5em 0 .5em; border-radius:  0   0   0   0;";

const lb1  = "background-color:#964B00; color:black;";
const lb2  = "background-color:#FF0000; color:black;";
const lb3  = "background-color:#FFA500; color:black;";
const lb4  = "background-color:#FFFF00; color:black;";
const lb5  = "background-color:#9ACD32; color:black;";
const lb6  = "background-color:#6495ED; color:black;";
const lb7  = "background-color:#EE82EE; color:black;";
const lb8  = "background-color:#A0A0A0; color:black;";
const lb9  = "background-color:#FFFFFF; color:black;";
const lb0  = "background-color:#000000; color:gray;";
const lbX = [ lb0 ,lb1 ,lb2 ,lb3 ,lb4 ,lb5 ,lb6 ,lb7 ,lb8 ,lb9 ];

const lf1  = "color:#964B00;";
const lf2  = "color:#FF0000;";
const lf3  = "color:#FFA500;";
const lf4  = "color:#FFFF00;";
const lf5  = "color:#9ACD32;";
const lf6  = "color:#6495ED;";
const lf7  = "color:#EE82EE;";
const lf8  = "color:#A0A0A0;";
const lf9  = "color:#FFFFFF;";
const lf0  = "color:#707070; text-shadow:#000 2px 2px 1px;"; /* offset-x offset-y blur-radius */
const lfX  = [ lf0 ,lf1 ,lf2 ,lf3 ,lf4 ,lf5 ,lf6 ,lf7 ,lf8 ,lf9 ];

const lib_log_CSS
    = {   LOG_BG_CSS : { lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX }
        , LOG_FG_CSS : { lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX }
        , LOG_XX_CSS : { lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb           }
    };

/*}}}*/
/* SYM {{{*/

const SAU = "\u2191"; /* &#x2191; .. SYMBOL ARROW UP       */
const SAR = "\u2192"; /* &#x2192; .. SYMBOL ARROW RIGHT    */
const SAD = "\u2193"; /* &#x2193; .. SYMBOL ARROW DOWN     */
const SAL = "\u21AA"; /* &#x21AA; .. SYMBOL ARROW LEFT     */

const SHV = "\u26A1"; /* &#x26A1; .. HIGH VOLTAGE SIGN     */
const SYN = "\u25CF"; /* &#x25CF; .. SYMBOL BLACK CIRCLE   */
const SBS = "\u2605"; /* &#x2605; .. SYMBOL BLACK STAR     */

const SD0 = "\u24EA"; /* &#x2775; ..       CIRCLED DIGIT 0 */
const SD1 = "\u2776"; /* &#x2776; .. BLACK CIRCLED DIGIT 1 */
const SD2 = "\u2777"; /* &#x2777; .. BLACK CIRCLED DIGIT 2 */
const SD3 = "\u2778"; /* &#x2778; .. BLACK CIRCLED DIGIT 3 */
const SD4 = "\u2779"; /* &#x2779; .. BLACK CIRCLED DIGIT 4 */
const SD5 = "\u277A"; /* &#x277A; .. BLACK CIRCLED DIGIT 5 */
const SD6 = "\u277B"; /* &#x277B; .. BLACK CIRCLED DIGIT 6 */
const SD7 = "\u277C"; /* &#x277C; .. BLACK CIRCLED DIGIT 7 */
const SD8 = "\u277D"; /* &#x277D; .. BLACK CIRCLED DIGIT 8 */
const SD9 = "\u277E"; /* &#x277E; .. BLACK CIRCLED DIGIT 9 */

const L_CHK =         "✔";
const L_NEW =         "➔"; //"☀";

const L_ARD =         "↓";
const L_ARL =       "\t←";
const L_ARR =         "→";
const L_ARU =         "↑";

const L_CLR =         "✘";
const L_FNC =         "f";
const L_WRN =         "‼";

const SYMBOL_FUNCTION         = "\u0083"; /*  */
const SYMBOL_CHECK_MARK       = "\u2714";
const SYMBOL_NOT_CHECKED      = "\u237B";

const SYMBOL_CONSTRUCTION     = "\uD83D\uDEA7";
const SYMBOL_ROCKET           = "\uD83D\uDE80";
const SYMBOL_ASSIGN           = "\u2049";  // SYMBOL_EXCLAM_QUESTION
const SYMBOL_GEAR             = "\u2699";
const SYMBOL_THUMBS_UP        = "\uD83D\uDC4D";

const LOG_SXX = [SAU, SAR, SAD, SAL, SHV, SYN, SBS, SD0, SD1, SD2, SD3, SD4, SD5, SD6, SD7, SD8, SD9];
const LOG_CHR = [L_CHK, L_NEW, L_ARD, L_ARL, L_ARR, L_ARU, L_CLR, L_FNC, L_WRN];
const LOG_SYM = [SYMBOL_FUNCTION, SYMBOL_CHECK_MARK, SYMBOL_NOT_CHECKED, SYMBOL_CONSTRUCTION, SYMBOL_ROCKET, SYMBOL_ASSIGN, SYMBOL_GEAR, SYMBOL_THUMBS_UP];

/*}}}*/
/* CHAR {{{*/
const LF        = String.fromCharCode(10);

/*}}}*/
/* LOG_UTIL {{{*/
/*➔ log_socket {{{*/
let log_socket = function(prefix, socket, socket_request)
{
    let result
        = prefix +"\n"
        + prefix +"➔ WebSocket:\n"
        + prefix +"  │ socket.url                 .. "+ socket.url     +"\n"
        + prefix +"  └ socket.version             .. "+ socket.version +"\n"
        + prefix;

    if( socket_request )
        result
            = result + "\n"
            + prefix + log_request(prefix, socket_request);

    return result;
};
/*}}}*/
/*➔ log_request {{{*/
/*{{{*/
const R_CAPITAL     = "\\s*[A-Z]\\S+";
const R_PARENTH     = "\\s+\\([^\\)]+\\)";
const regexp_UA     = new RegExp("(("+R_CAPITAL+")("+R_PARENTH+")*)", "g");

const R_LINE_INDENT = "  │ request.headers.user-agent  ➔";
/*}}}*/
let log_request = function(prefix, request)
{
    let user_agent = (" "+request.headers["user-agent"]).replace(regexp_UA, "\n"+prefix + R_LINE_INDENT+"$&");
    let domain     = lib_util.get_url_domain(request.headers.origin);

    return "➔ request:\n"
        +  prefix +"  │ request.url                .. "+ request.url                       +"\n"
        +  prefix +"  │ request.method             .. "+ request.method                    +"\n"
        +  prefix +"  │ request.headers.host       .. "+ request.headers.host              +"\n"
        +  prefix +"  │ request.headers.origin     .. "+ request.headers.origin            +"\n"
        +  prefix +"  │ ................domain     .. _______ "+ domain                    +"\n"
        +                                                                user_agent        +"\n"
        +  prefix +"  │ request.headers.connection .. "+ request.headers.connection        +"\n"   // The Upgrade header field is used by clients to invite the server to switch to one of the listed protocols
        +  prefix +"  └ request.headers.upgrade    .. "+ request.headers.upgrade
    ;
};
/*}}}*/
/*➔ log_messages {{{*/
/*{{{*/
const COUNT_MAX = 4;

/*}}}*/
let log_messages = function(messages)
{
    let msg   = "";
    let count = 0;

    for(let i = 0; i < messages.length; ++i)
    {
        msg         += "\n│ │ "+(i+1)+" "+ellipsis(messages[i], 100);

        if(++count > COUNT_MAX)
        {
            if(i < (   messages.length-1))
            {
                i    = messages.length-1;
                msg += "\n│ "+ HORIZONTAL_ELLLIPSIS;
                msg += "\n│ │ "+(i+1)+" "+ellipsis(messages[i], 100);
            }
            break;
        }
    }

    return msg;
};
/*}}}*/

/*➔ log_caller {{{*/
let log_caller = function(level_max)
{
    let stack_trace = get_callers( level_max );

    if( stack_trace.includes(LF) ) console.log("%c"+stack_trace.replace(LF,"%c"+LF), lbH+lf6, lf8);
    else                         { console.log("%c"+stack_trace                    , lf6+lbF     ); console.trace(); }
};
/*}}}*/
/*➔ get_callers {{{*/
let get_callers = function(level_max)
{
    let xx, ex_stack;
    try {   xx.raise(); } catch(ex) { ex_stack = parse_ex_stack_FUNC_FILE_LINE_COL(ex.stack, level_max); }
    return  LF+ex_stack;
};
/*}}}*/
/*_ parse_ex_stack_FUNC_FILE_LINE_COL {{{*/
/*{{{
ReferenceError: exception is not defined
    at XXX1 (file:///.../XXX5.js:12558:38)
    at XXX2 (file:///.../XXX5.js:12497:5)
    at XXX3 (file:///.../XXX5.js:13273:5)
    at XXX4 (file:///.../XXX5.js:2697:5)

/\v\s*at\s*(\S+)\s+\((.+):(\d+):(\d+)
/\v\s*at\s*\zs(\S+)\ze\s+\((.+):(\d+):(\d+)
/\v\s*at\s*(\S+)\s+\(\zs(.+)\ze:(\d+):(\d+)
/\v\s*at\s*(\S+)\s+\((.+):\zs(\d+)\ze:(\d+)
/\v\s*at\s*(\S+)\s+\((.+):(\d+):\zs(\d+)\ze
}}}*/
/*.....................................................func.........file...............line....col..........*/

let parse_ex_stack_FUNC_FILE_LINE_COL = function(text, level_max=10)
{
    let  result = "";
    let   lines = text.split(LF);
    let     sym = L_ARL;
    let line_match;
    for(let i=2; i<=(2+level_max); ++i)
    {
        if( String(lines[i]).includes("at log_caller") ) continue;

        if( line_match = get_ex_stack_line_match(lines[i]) )
            result    += (result ? LF : "") + sym+" "+line_match;
        sym = L_ARU; /* past first line arrow */
    }

    if( !result.includes(LF) ) result += LF + sym +" ... (async)";

    return result;
};
/*}}}*/
/*_ get_ex_stack_line_match {{{*/
/*................................................at    (FILE__).....\( FILE_PATH____).(\......(LINE ).(COL  )*/
const regexp_FUNC_FILE_LINE_COL = new RegExp("\\s*at\\s*([^\\(]+)\\s+\\((?:[^\\/]*\\/)*(\..+?):(\\d+?):(\\d+?)");
/*{{{
const regexp_FUNC_FILE_LINE_COL = new RegExp("\\s*at\\s*([^\\(]+)\\s+\\(([^\\/]*\\/)*(\\w+\\.\\w*):(\\d+):(\\d+)");
}}}*/

let get_ex_stack_line_match = function(ex_stack_line)
{
    let matches = regexp_FUNC_FILE_LINE_COL.exec(ex_stack_line);

    if(!matches ) return "";

    let func = matches[1].replace("Object.","");
    let file = matches[2];
    let line = matches[3];
    let col  = matches[4];
    let match= mPadStart(func, 48)+".. "+file+" "+line+":"+col;

/*{{{
log(ex_stack_line);
log("...... matches[1]=["+matches[1]+"]");
log("...... matches[2]=["+matches[2]+"]");
log("...... matches[3]=["+matches[3]+"]");
log("...... matches[4]=["+matches[4]+"]");
log("...... matches[5]=["+matches[5]+"]");
log("...... matches[6]=["+matches[6]+"]");
log("..match..........=["+match     +"]");
}}}*/
    return match;
};
/*}}}*/

/*➔ log {{{*/
let log = function(...args)
{
/*{{{
- [arguments] variable is not an array
- it's an array-like structure.
- if full Array functionality is needed
- this can be achieved in the following way:
- var argumentsArray = Array.prototype.slice.apply( arguments );
//  console.log.apply(console, Array.prototype.slice.call(arguments));
}}}*/

    console.log(...args); // spread array items
//log_caller(3)
};
/*}}}*/
/*➔ logXXX {{{*/
let logXXX = function(...args)
{
    args[0] = "XXX "+args[0];

    console.log(...args);
};
/*}}}*/
/*➔ logBIG {{{*/
let logBIG = function(msg, lfx=lf7)
{
    let lxx = (typeof lfx == "number")
        ?         lbb+lbH+lfX[lfx]              // just the index
        :                     lfx;              // or a color style

    console.log("%c "+L_NEW+" %c "+msg, lbb+lbH+lf9, lxx);
};
/*}}}*/
/*➔ strip_QUOTE {{{*/
/*{{{*/
const regexp_QUOTE = new RegExp("[\\u0022\\u0027]", "g"); /* "' */

/*}}}*/
let strip_QUOTE = function(text)
{
    return text
        .   replace(regexp_QUOTE,  " ")
        .   trim()
    ;
};
/*}}}*/
/*➔ strip_CR_LF {{{*/
/*{{{*/
//nst SYMBOL_DOWN_LEFT_ARROW        = "\u21B5";
const regexp_CR     = new RegExp("\\r"  , "g");
const regexp_LF     = new RegExp("\\n *", "g");
const regexp_COMMA  = new RegExp(" *, *", "g");

/*}}}*/
let strip_CR_LF   = function(text)
{
    return text
        .   replace(regexp_CR,  "")
        .   replace(regexp_LF, " ")
//      .   replace(regexp_LF, SYMBOL_DOWN_LEFT_ARROW)
        .   trim()
    ;
};
/*}}}*/
/*➔ log_members {{{*/
let log_members = function(o_name, o, lxx=lb0, collapsed=true)
{
    if(!o) {
        log(o_name+": %c null object ", lxx);
        return;
    }

  //log("%c"+o_name+" "+SAD, lbR+lxx);

    if(collapsed) console.groupCollapsed("%c"+o_name+" "+SAD, lbR+lxx);
    else          console.group         ("%c"+o_name+" "+SAD, lbR+lxx);

    //let tdata = "";

    Object.keys(o).forEach(
        function(key) {
            let val = o[key];
            let lbV =    (val == true            ) ? lb5
                :        (val == false           ) ? lb6
                : (String(val).indexOf("\n") >= 0) ? lbH+lf5
                :                                    lb0
            ;
            log(" %c|||%c "+key+"=%c"+log_object_val_format(o[key]), lb0,lxx,lbV);

            //tdata    += "["+key+"]=["+o[key]+"]";
        }
    );
  //log("%c"+o_name+" "+SAU, lbR+lxx);
    console.groupEnd("%c"+o_name+" "+SAU, lbR+lxx);

    //return tdata;
};
/*}}}*/
/*➔ log_object {{{*/
let log_object = function(o_name, o,lxx=lb0)
{
    if(!o) {
        log(o_name+": %c null object ", lxx);
        return;
    }

    let txt = "";
    txt += SAD+" "+o_name+"\n";
    Object.keys(o).forEach(
        function(key) {
            txt += " "+key+"="+log_object_val_format(o[key])+"\n";

          //tdata    += "["+key+"]=["+o[key]+"]";
        }
    );
    txt += SAU+" "+o_name+"\n";

    log("%c" + txt, lbR+lxx);
};
/*}}}*/
/*➔ log_object_JSON {{{*/
let log_object_JSON = function(o, len_max=256)
{
    let result
        = JSON.stringify(o)
        .  replace( /[\{\}\[\]"]/g, " "  )
        .  replace( /,/gm         , "\n" )
        .  replace( / :/gm        , ": " )
        .  trim()
        .  replace( /^ */gm       , "   " )
        ;

    if( result.length > len_max)
        result = result.substring(0,len_max) +"\n...";

    return result;
};
/*}}}*/

/*➔ log_expand {{{*/
/*{{{*/
const PFX = " ▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕▕";
//nst PFX = " ┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊";
//nst PFX = " ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈";
//nst PFX = " ┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕┕";
//nst PFX = " ╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰╰";
//nst PFX = " ╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶";
//nst PFX = " ⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀⦀";
//nst PFX = "                             ";
//nst PFX = ".............................";
//nst PFX = "123456789_                   ";

const SYMBOL_LEAF_MAX  = "\u21F3";
const SYMBOL_DEPTH_MAX = "\u21E8";

let rejected;
let leaf_max;
let depth_max;
/*}}}*/
let log_expand = function(name,obj,_filter)
{
//logXXX("lib_log.log_expand:")
    let filter
        = ((typeof _filter == "object") && Object.keys(_filter).length > 0)
        ?          _filter
        :          null;
//console.log("_filter:")
//console.log( _filter  )

//console.log("filter:" )
//console.log( filter   )

//console.log("obj:"    )
//console.dir( obj      )

    rejected   = [];
    leaf_max   =  0;
    depth_max  =  0;
    let body   = log_expand_object(obj,filter);
    let lines  = body.split("\n");
    lines      = log_expand_uniq( lines );

    /* rejected {{{*/
    let filtered_tags = "";
    if( rejected.length )
    {
        let count = rejected.length;
        for(let i = 0; i < count; ++i)
            filtered_tags
                += "│ . "+rejected[i]+"\n";

        if(filtered_tags)
            filtered_tags
                =  "│──────────────────────────────│\n"
                +  "│ "+ count          +" REJECTED:\n"
                +   filtered_tags.trim()          +"\n";
    }
    /*}}}*/

    obj.leaf_max  = leaf_max;
    obj.depth_max = depth_max;
    obj.rejected  = rejected.length;

    //FIXME
    //FIXME: minify long names
    // [file:///C:/LOCAL/DATA/ANDROID/PROJECTS/iwintoo/DOC/TED/base_de_connaissance/cadrage_alimentation_base_de_connaissance.html]
    // [file:///C:/LOCAL...alimentation_base_de_connaissance.html]
    //FIXME
    let header  = name
        +   " " + SYMBOL_LEAF_MAX  + leaf_max
        +   " " + SYMBOL_DEPTH_MAX + depth_max;

    let txt
        = "┌──────────────────────────────┐\n"
        + "│ "+ header                   +"\n"
        +  filtered_tags
        + "└──────────────────────────────┘\n"
        +  lines
        + "└──────────────────────────────┘";

    return   txt;
};
/*}}}*/
/*_ log_expand_object {{{*/
let log_expand_object = function(obj,filter,depth=1)
{
    let body = "";

    if( Array.isArray(obj) )
    {
        for(let i=0; i<obj.length; ++i)
            body += log_expand_object(obj[i], filter, depth);
    }
    else {
        let pfx = PFX.substring(0, depth)+" ";
        if( obj.label ) {
            let key = obj.label.toLowerCase();
            if((!filter || filter[key]))
            {
                body += pfx+obj.label+"\n";
                //if(!obj.tree)
                    leaf_max += 1;
            }
            else if(!rejected.includes( obj.label ))
                rejected         .push( obj.label );
        }

        if( obj.tree ) {
            let key = obj.label.toLowerCase();
            if(!filter || filter[key])
                body += log_expand_object(obj.tree, filter, depth+1)+"\n";
        }
    }

    if( depth_max < depth)
        depth_max = depth;
    return  body;
};
/*}}}*/
/*_ log_expand_uniq {{{*/
let log_expand_uniq = function(l_array)
{
    let l_uniq  = "";
    let num     = 0;
    let l_count = 0;
    let u_array = "";

    for(let i=0; i < l_array.length; ++i)
    {
        if(l_uniq && (l_uniq == l_array[i]))
        {
            ++l_count;
        }
        else {
            if( l_count) {
                if(l_uniq !="") {
                    let count = (l_count > 1) ? " (x "+l_count+")" : "";
                    u_array += mPadStart(++num, 3)+". "+l_uniq + count +"\n";
                    l_count =  0;
                }
            }

            l_uniq  = l_array[i];
            l_count = 1;
        }
    }
    if(l_count > 1) {
        u_array += mPadStart(++num, 3)+". "+l_uniq+" (x "+l_count+")\n";
        l_count =  0;
    }
    return u_array;
};
    /*}}}*/

/*➔ log_key_val {{{*/
const LF_HEAD = LF+"    ";
let log_key_val       = function(name, o, lxx       ) { return log_key_val_group(name, o, lxx, false); };
let log_key_val_group = function(name, o, lfx=7, group=true)
{
    let lxx = (typeof lfx == "number")
        ?         lfX[lfx]              // just the index
        :             lfx;              // or an fg color

    if(!o) {
        log(name+": %c null object ", (lxx || lb0));
        return "";
    }

/*{{{                  log("%c"+name, lbH+(lxx || lb0)); }}}*/

    name = mPadEnd(name, 60);
    if(group) console.groupCollapsed("  %c"+ name+" ...", ((lbH+lxx) || lb0));
    else      console.log           ("  %c"+ name       , ((lbH+lxx) || lb0));

    let result = "";

    if( Array.isArray(o) )
    {
        console.table(o);
/*{{{
        console.log(result);
        console.dir(o);
}}}*/
        Array.from(o).forEach(
                              (value,index) => {
                                  result += (index ? LF:"")
                                      +      index +" .. "
                                      +((value.key && value.val)
                                        ?    "{ key:"+mPadEnd(value.key,32)
                                        +    ", val:"+value.val
                                        +    "}"
                                        :    value.toString()
                                       );
                              });
    }
    else {

        let n = 1;
        Object.keys(o).forEach( /*..................... [OWN PROPERTY] NAMES */
                                function(key) {
                                    let   val = o[key];
                                    let   lfv = lf2;
                                    try { lfv =        (val          ==  null        ) ?     lb0 /* NULL      */
                                              :        (val          ==  undefined   ) ?     lb0 /* UNDEFINED */
                                              :        (val          ==  "null_node" ) ?     lb0 /* NULL_NODE */
                                              :        (val          ==  "NO"        ) ?     lf3 /* NOTHING   */
                                              :        (val          ==  "[]"        ) ?     lf3 /* NOTHING   */
                                              :        (val          ==  false       ) ?     lf2 /* FALSE     */
                                              :        (val          ==  true        ) ?     lb5 /* TRUE      */
                                              :        (typeof val   == "object"     ) ?     lf3 /* OBJECT    */
                                              :  String(val).startsWith( L_NEW       ) ? lbH+lf9 /* CHANGED   */
                                              :  String(val).startsWith( L_CHK       ) ?     lf8 /* CHECKED   */
                                              :  String(val).includes  ( LF          ) ? lbF+lf5 /* SUBSTANCE */
                                              :  String(val).includes  ( " "         ) ? lbH+lf5 /* ONE_LINER */
                                              :                                              lf4 /* SOMETHING */
                                        ;
                                    } catch(ex) { val = LF+ex.message; lfv = lbb+lb2; }

                                    let ovf = log_object_val_format(val, lxx);

                                    let lfo = ovf.includes("%c") ? lxx : " "; /* f(log_object_val_format .. parse_ex_stack_FUNC_FILE_LINE_COL) */ /* [" "] prevents Firefox [empty string] */

//                                  if((typeof val == "object") && (ovf != "[]"))
//                                      ovf = LF_HEAD+"┌───────────────────────────────────┐"
//                                          + LF_HEAD+ ovf
//                                          + LF_HEAD+"└───────────────────────────────────┘";

                                    log(     " %c|||%c "+mPadStart(   key, 36) +" %c"+ovf
                                             , lb0 ,(lxx || lb0)                ,lfv ,lfo);

                                    result +=   "||| "  +             key      +" <em class='cc"+(++n)+"'>"+ ovf   +"</em><br>"+LF       ;
                                }
                              );
    }
    if(group) console.groupEnd();
    return result;
};
/*}}}*/
/*➔ log_object_val_format {{{*/
let log_object_val_format = function(val,lxx)
{
    let text; try { text = String(val); } catch(ex) { text = LF+ex.message; }
    if     (       !text                ) text = "[]";
    else if(  typeof val == "object"    ) text = log_json(val,lxx);
    else if(  typeof val == "function"  ) text = SYMBOL_FUNCTION +" "+ (val.name || "anonymous");
    else if(  text.indexOf("\n") >= 0   ) text = LF+text.replace(regexp_LF,"\n");
    return    text;
};
/*}}}*/
/*➔ log_json {{{*/
/*{{{*/
const regexp_BRACES = new RegExp("^{|}$"                    , "g");
const regexp_BSLASH = new RegExp("\\\\"                     , "g");
const regexp_URL_64 = new RegExp('"url":"([^"]{1,64})[^"]*"', "g"); // eslint-disable-line quotes

/*}}}*/
let log_json = function(val, lxx)
{
    if(val == null     ) return "null";
    if(val == undefined) return "undefined";
    if(val.id          ) return "#"+val.id;
    if(val.tagName     ) return     val.tagName;

    let result = "";
    try {
        result
            = JSON.stringify(val);

        if( result.length > 64)
            result
                = result
                .   replace(regexp_URL_64, '"url":"$1..."') // eslint-disable-line quotes
        ;
        result
            = result
            . replace(regexp_BRACES , "")
            . replace(regexp_QUOTE  , "")
            . replace(regexp_BSLASH , "")
            . trim()
        ;

        result
            = (". "+result)
            .  replace(regexp_COMMA    ,        LF_HEAD+". ")
        ;

        result
            = result
            .  replace(/\. *([^:]*):{/g, ".$1:"+LF_HEAD+". ")
            .  replace(/}/g            , ""                 )
        ;

        result
            =(LF_HEAD+ result)
            .  replace(/^( *\. *)([^:]*):(.*)$/gm, mpad)
        ;

        result
            = LF_HEAD+"┌───────────────────────────────────┐"
            +          result
            + LF_HEAD+"└───────────────────────────────────┘"
        ;

    } catch(ex) { result = LF+ex.message; }

    if( lxx )
        result = "%c"+ result;

    return result;
};

let mpad = function(match, p1, p2, p3, offset, string) /* eslint-disable-line no-unused-vars */
{
    return mPadStart(p1+p2,39) +" : "+ p3;
};

/*}}}*/

/*_ LOG_TAGS {{{*/
let  LOG_TAGS  = {
    "LOG1_TAG" : 1,  "1" : 1,
    "LOG2_TAG" : 2,  "2" : 2,
    "LOG3_TAG" : 3,  "3" : 3,
    "LOG4_TAG" : 4,  "4" : 4,
    "LOG5_TAG" : 5,  "5" : 5,
    "LOG6_TAG" : 6,  "6" : 6,
    "LOG7_TAG" : 7,  "7" : 7,
    "LOG8_TAG" : 8,  "8" : 8,
    "LOG9_TAG" : 9,  "9" : 9,
    "LOG0_TAG" : 0,  "0" : 0
   };

/*}}}*/

/* STYLE_TOP STYLE_BOT {{{*/
/*{{{
const STYLE_TOP = "font-weight:900;                 border:1px rgba(000,255,255,0.20) solid; border-radius:3em 3em .1em .1em; padding:  0 80% 8em 2em; background:linear-gradient(to bottom, rgba(000,000,255,0.1) 0%, rgba(000,000,136,0.1) 100%);";
const STYLE_BOT = "color:rgba(000,255,255,0.5);     border:1px rgba(000,255,255,0.20) solid; border-radius:.1em .1em 3em 3em; padding:8em 80% 0em 2em; background:linear-gradient(to    top, rgba(000,000,068,0.1) 0%, rgba(000,000,068,0.00) 100%);";
const STYLE_TOP = "font-weight:900; border:0px #000 solid; border-radius:2em 2em .1em .1em; padding:  0 1em 1em 2em; overflow:visible;";
const STYLE_BOT = "color:rgba(000,255,255,0.5);     border:0px #000 solid; border-radius:.1em .1em 2em 2em; padding:1em 1em 0em 2em; overflow:visible;";
const STYLE_TOP = "font-weight:900; border:1px #000 solid; border-radius:2em 2em .1em .1em; padding:  0 20% 8em 2em;";
const STYLE_BOT = "color:rgba(000,255,255,0.5);     border:1px #000 solid; border-radius:.1em .1em 2em 2em; padding:8em 20% 0em 2em;";
}}}*/
const STYLE_TOP = "font-weight:900; border:1px #000 solid; border-radius:2em 2em .1em .1em; padding:  0 20% 2em 2em;";
const STYLE_BOT = "color:rgba(000,255,255,0.5);     border:1px #000 solid; border-radius:.1em .1em 2em 2em; padding:2em 20% 0em 2em;";

const STYLE_BG_TOP=[];
      STYLE_BG_TOP [1] = " background:linear-gradient(to bottom, #964B0060 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #964B00;";
      STYLE_BG_TOP [2] = " background:linear-gradient(to bottom, #FF0000   0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #FF0000;";
      STYLE_BG_TOP [3] = " background:linear-gradient(to bottom, #FFA50060 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #FFA500;";
      STYLE_BG_TOP [4] = " background:linear-gradient(to bottom, #FFFF0060 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #FFFF00;";
      STYLE_BG_TOP [5] = " background:linear-gradient(to bottom, #9ACD3260 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #9ACD32;";
      STYLE_BG_TOP [6] = " background:linear-gradient(to bottom, #6495ED60 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #6495ED;";
      STYLE_BG_TOP [7] = " background:linear-gradient(to bottom, #EE82EE60 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #EE82EE;";
      STYLE_BG_TOP [8] = " background:linear-gradient(to bottom, #A0A0A060 0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #A0A0A0;";
      STYLE_BG_TOP [9] = " background:linear-gradient(to bottom, #FFFFFF   0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #FFFFFF;";
      STYLE_BG_TOP [0] = " background:linear-gradient(to bottom, #000000   0%, rgba(34,34,34,0.1) 100%); border-bottom: 2px solid #000000;";

const STYLE_BG_BOT=[];
      STYLE_BG_BOT [1] = " background:linear-gradient(to    top, #964B0060 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #964B00;";
      STYLE_BG_BOT [2] = " background:linear-gradient(to    top, #FF0000   0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #FF0000;";
      STYLE_BG_BOT [3] = " background:linear-gradient(to    top, #FFA50060 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #FFA500;";
      STYLE_BG_BOT [4] = " background:linear-gradient(to    top, #FFFF0060 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #FFFF00;";
      STYLE_BG_BOT [5] = " background:linear-gradient(to    top, #9ACD3260 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #9ACD32;";
      STYLE_BG_BOT [6] = " background:linear-gradient(to    top, #6495ED60 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #6495ED;";
      STYLE_BG_BOT [7] = " background:linear-gradient(to    top, #EE82EE60 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #EE82EE;";
      STYLE_BG_BOT [8] = " background:linear-gradient(to    top, #A0A0A060 0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #A0A0A0;";
      STYLE_BG_BOT [9] = " background:linear-gradient(to    top, #FFFFFF   0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #FFFFFF;";
      STYLE_BG_BOT [0] = " background:linear-gradient(to    top, #000000   0%, rgba(34,34,34,0.1) 100%); border-top   : 2px solid #000000;";
/*}}}*/
/*_ log_sep_top log_sep_bot  {{{*/

let log_sep_array = [];

let log_sep_top = function(arg_line="", log_tag_or_num="", collapsed=true)
{
    arg_line = mPadEnd(arg_line, 60);
    if(collapsed) console.groupCollapsed("%c "+arg_line, STYLE_TOP + STYLE_BG_TOP[ LOG_TAGS[log_tag_or_num] ]);
    else          console.group         ("%c "+arg_line, STYLE_TOP + STYLE_BG_TOP[ LOG_TAGS[log_tag_or_num] ]);

    if(                             log_tag_or_num  ) {
        if(!log_sep_array.includes( log_tag_or_num ))
            log_sep_array.push    ( log_tag_or_num );
    }

//  console.time(arg_line);
};
let log_sep_bot = function(arg_line="", log_tag_or_num="")
{
//  console.timeEnd(arg_line);

    console.groupEnd();

    arg_line = mPadEnd(arg_line, 60);
    if(!log_tag_or_num ||   log_sep_array.includes(log_tag_or_num))
        console.log("%c "+arg_line, STYLE_BOT + STYLE_BG_BOT[ LOG_TAGS[log_tag_or_num] ]);

    if( log_tag_or_num &&   log_sep_array.includes(log_tag_or_num))
        log_sep_array.splice(log_sep_array.indexOf(log_tag_or_num), 1);
};

/*}}}*/

/*_ log_console_clear {{{*/
const CLEAR_CONSOLE_INTERVAL = 1000; /* ms */
let last_call_time    = 0;
let log_console_clear = function(_caller)
{
    /* DEBOUNCING {{{*/
    let this_time = new Date().getTime() % 86400000;
    if((this_time - last_call_time) < CLEAR_CONSOLE_INTERVAL)
    {
        log("%c"+_caller+" - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CONSOLE CLEAR BURST PREVENTED"
            , "color:gray; font-style:italic;");

        last_call_time = this_time; // and start over from there
        return;
    }
    last_call_time = this_time;
    /*}}}*/
    console.clear();
    log("%c...cleared by "+_caller, "color:gray; font-style:italic;");
};
/*}}}*/
/*_ log_SYN {{{*/
let log_SYN = function(msg, val)
{
    if(val) log(SYN+" %c "+msg+" %c "+val+"", lb0, lb8);
    else    log(SYN+" %c "+msg              , lb0     );
};
/*}}}*/
/*_ log_permission {{{*/
let log_permission = function(script_id, namespace, functionality, permission, logging)
{
    if(namespace != undefined)
    {
if(logging) log("%c "+script_id+" %c "+mPadStart(functionality,32)+" %c ... manifest permission specified %c '"+permission+"' ", lbL,lbC,     lbC+lf5,     lbR+lf5);

        return true;
    }
    else {
if(logging) log("%c "+script_id+" %c "+mPadStart(functionality,32)+" %c *** manifest permission required  %c '"+permission+"' ", lbL,lbR, lbb+lbL+lf2, lbb+lbR+lf2);

        return false;
    }
};
/*}}}*/
/*_ is_embedded {{{*/
/*{{{*/
let is_embedded_result;

/*}}}*/
let is_embedded = function(script_id,logging)
{
    if((typeof is_embedded_result != "undefined") && !logging) return is_embedded_result;

    let can_sendMessage
        =  (typeof chrome            != "undefined")
        && (typeof chrome.runtime    != "undefined")
        && (       chrome.runtime.id !=  undefined );

    if(!can_sendMessage   && !logging) return true;

    /*....................................script_id, namespace        , functionality, permission , logging */
    let runtime           = log_permission( script_id, chrome.runtime   , "runtime"    , "runtime"   , logging);
    let tabs              = log_permission( script_id, chrome.tabs      , "tabs"       , "tabs"      , logging);
    let webRequest        = log_permission( script_id, chrome.webRequest, "webRequest" , "webRequest", logging);

    let window_chrome     = window.chrome;
    let chrome_runtime    = window_chrome  && chrome.runtime;

    is_embedded_result    = !can_sendMessage;

if(logging)
    log_key_val_group("is_embedded: ...return "+is_embedded_result
                      , {   is_embedded_result
                          , can_sendMessage
                          , runtime
                          , tabs
                          , webRequest
                          , chrome_runtime    : typeof chrome_runtime
                      });
if(logging)
    console.log(window_chrome);

    return is_embedded_result;
};
/*}}}*/
/*_ ellipsis {{{*/
/*{{{*/
const HORIZONTAL_ELLLIPSIS = "\u2026";

/*}}}*/
let ellipsis = function(_msg, length=64)
{
    let msg = strip_CR_LF( String(_msg) );

    return (msg.length <= length)
        ?   msg
        :   msg.substring(0, length-3)+HORIZONTAL_ELLLIPSIS
    ;
};
/*}}}*/
/*_ truncate {{{*/
let truncate = function(_msg, length=80)
{
    let msg = strip_CR_LF( String(_msg) );

    return (msg.length <= length)
        ?   msg
        :   msg.substring(0, length-3)+"..."
    ;
};
/*}}}*/
/*_ mPadStart {{{*/
let mPadStart = function(_s,l,c=" ") { let s = String(_s); while(s.length < l) s = c+s; return s; };
/*}}}*/
/*_ mPadEnd{{{*/
let mPadEnd   = function(_s,l,c=" ") { let s = String(_s); while(s.length < l) s += c; return s; };
/*}}}*/
/*_ log_CSP {{{*/
const DIRECTIVE_REGISTRY = "\\w+-src|\\w+-uri|disown-opener|form-action|frame-ancestors|plugin-types|report-to|sandbox|block-all-mixed-content";
const regexp_DIRR = new RegExp("("+DIRECTIVE_REGISTRY+")(.*)","g");
const regexp_SEMI = new RegExp("\\s*;\\s*"                   ,"g");
let log_CSP = function(title, csp)
{
    if(!csp) { log("%c "+ title +": NO CSP", lbH); return; }
    /*......*/ log("%c "+ title +":\n", lbH);

    let lines = csp.replace(regexp_SEMI, "\n").match(/[^\r\n]+/g) || [];

    let num = 0;
    lines.forEach(function(line) {
            log((++num) +" "+ line.replace(regexp_DIRR, "%c $1 %c $2"), lb4, lb0);
        });
};
/*}}}*/
/*_ get_sigignificant_digit {{{*/
let get_sigignificant_digit = function(_value)
{
    let   value = _value;
    while(value && (value > 10)) value /= 10;
    while(value && (value <  1)) value *= 10;

    let unit_digit = parseInt( value );

// console.log("get_sigignificant_digit("+_value+") ...return unit_digit=["+unit_digit+"] ➔ ["+value+"]");
    return unit_digit;
};
/*}}}*/
/*_ get_order_of_magnitude {{{*/
let get_order_of_magnitude = function(_value)
{
    let   order = 0;
    let   value = _value;
    while(value && (value > 10)) { value /= 10; order += 1; }
    while(value && (value <  1)) { value *= 10; order += 1; }

// console.log("get_order_of_magnitude("+_value+") ...return order=["+order+"] ➔ ["+value+"]");
    return order;
};
/*}}}*/
/*}}}*/
/* CONSOLE COMMANDS .. [clear pause reload] {{{*/
/*_ clear {{{*/
let clear = function(pausable)
{
    console.clear();

  //logn();

    if( pausable.l_paused )
        log_pause( pausable );

    return chrome.runtime.lastError
        ?  chrome.runtime.lastError.message
        :  SYMBOL_CHECK_MARK+" CLEARED";
};
/*}}}*/
/*_ pause {{{*/
let pause = function(pausable)
{
    pausable.l_paused = !pausable.l_paused;

    log_pause( pausable );

    let sym = pausable.l_paused
        ?      SYMBOL_CHECK_MARK
        :      SYMBOL_NOT_CHECKED
    ;

    return chrome.runtime.lastError
        ?  chrome.runtime.lastError.message
        :  sym
    ;
};
let log_pause = function( pausable )
{
    let id = pausable.id ? pausable.id :LIB_LOG_JS_ID;

    if(pausable.l_paused) log(SYMBOL_CONSTRUCTION +"%c "+ id +" PAUSED  ", lbb+lb0+lf3);
    else                  log(SYMBOL_CONSTRUCTION +"%c "+ id +" RUNNING ", lbb+lb0+lf5);
};
/*}}}*/
/*_ reload {{{*/
let reload = function()
{
    chrome.runtime.reload();
};
/*}}}*/
/*}}}*/

/* EXPORT {{{*/
return { log_this
    ,    clear
    ,    ellipsis
    ,    get_callers
    ,    get_ex_stack_line_match
    ,    get_sigignificant_digit
    ,    get_order_of_magnitude
    ,    log
    ,    logBIG
    ,    logXXX
    ,    log_CSP
    ,    log_SYN
    ,    log_caller
    ,    log_console_clear
    ,    log_expand
    ,    log_json
    ,    log_key_val
    ,    log_key_val_group
    ,    log_members
    ,    log_messages
    ,    log_object
    ,    log_object_JSON
    ,    log_object_val_format
    ,    log_pause
    ,    log_permission
    ,    log_request
    ,    log_sep_bot
    ,    log_sep_top
    ,    log_socket
    ,    mPadEnd
    ,    mPadStart
    ,    parse_ex_stack_FUNC_FILE_LINE_COL
    ,    pause
    ,    reload
    ,    strip_CR_LF
    ,    strip_QUOTE
    ,    truncate

    , ...lib_log_CSS

    ,    LOG_SXX
    ,    LOG_CHR
    ,    LOG_SYM

    //    UTIL
    ,    is_embedded
};
/*}}}*/
})();
if(lib_log.log_this) console.log("%c"+LIB_LOG_JS_TAG+": LOADING", "color:lime; font-size:200%;");
try { module.exports = lib_log; } catch(ex) { /*console.log(ex);*/ } /* server.js require */
//console.log("LOADED: "+LIB_LOG_JS_TAG);
