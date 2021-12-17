// ┌───────────────────────────────────────────────────────────────────────────┐
// │ [div_tools_html_js] ...................... DIV_TOOLS XPATH CONTENT SCRIPT │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint eslint {{{*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */

/* globals console       */
/* globals window        */
/* globals document      */
/* globals lib_log       */
/* globals lib_util      */
/* globals setTimeout    */ // eslint-disable-line no-unused-vars
/* globals outline       */
/* globals xpath_content_js */

/* exported div_tools_html_js, DIV_TOOLS_HTML_JS_TAG */

/*    eslint-disable no-global-assign    */
/*    eslint-disable no-implicit-globals */
/*    eslint-disable no-native-reassign  */
/*    eslint-disable no-warning-comments */
/*    eslint-disable no-mixed-operators  */

/*
:update|1,$y *
:!start explorer https://jshint.com/
*/

const DIV_TOOLS_HTML_JS_ID     = "div_tools_html_js";
const DIV_TOOLS_HTML_JS_TAG    =  DIV_TOOLS_HTML_JS_ID  +" (211216:19h:56)";
/*}}}*/
let       div_tools_html_js = (function() {
/*➔ LOG {{{*/
"use strict";

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ CSS .. DYNAMIC JS-INLINING ............ [../stylesheet/div_tools.css] │
    // └───────────────────────────────────────────────────────────────────────┘
  /** [div_tools_css_data] {{{*/
/*
../stylesheet/div_tools.css
*/
let div_tools_css_data ="data:text/css,"+ escape(`
/*INLINE{{{*/

   #div_tools_css_tag { content: "dom_tools_css (211216:16h:36)";           }
.waiting_animation SPAN {
    display                   : inline-block;
    font-size                 : 150%;
    transform-origin          : 200% 200%;
    animation-iteration-count : infinite;
    animation-timing-function : linear;
    animation-duration        : 1s;
    animation-name            : waiting_animation;
}

@keyframes waiting_animation {
    from { transform : rotate(  0deg); }
    to   { transform : rotate(360deg); }
}
DIV        BUTTON *  { transition : all 500ms; }
DIV        BUTTON *  { pointer-events: none;                           }
DIV        BUTTON EM { display:        inline; white-space :   nowrap; }
DIV.folded BUTTON EM { display: table-caption; white-space : pre-wrap; }
DIV.folded        OL {   width: 0; height: 0; min-width: 0; min-height: 0; };
#div_domains        button.selected,
#div_urls           button.selected,
#div_outline_pick   button.selected,
#div_outline_sample button.selected {
    border              : 5px solid black !important;
}

#div_xpaths .selected                                        { border  : 5px  solid black !important; }
#div_xpaths .selected.confirm                                { border  : 5px dashed black !important; }
#div_xpaths .selected.confirm     >EM:nth-of-type(1)         { color   : transparent;                           }
#div_xpaths .selected.confirm     >EM:nth-of-type(1)::before { content : "\\2714"; color:black; font-weight: bolder; }
#div_xpaths DIV.wheelable>EM:nth-child(2)         { color   : transparent;                           }
#div_xpaths DIV.wheelable>EM:nth-child(2)::before { color   : black; content : "\\21C5 "; font-size: 150%; vertical-align: middle; }
#div_tools     { transition    : transform 150ms ease-in; }
#div_options   { transition    : all 150ms ease-in;       }
#div_options>* { transition    : all 150ms ease-in;       }

            OL { transition    : all 250ms ease-out; }
            OL { min-height    : 32px;               }
            OL { margin        :  0;                 }
            LI { white-space   : nowrap;             }
#div_domains >OL          { overflow: auto; max-height:  8em; }
#div_urls    >OL          { overflow: auto; max-height:  8em; }
#div_domains >button      { overflow: auto;                   }
#div_urls    >button      { overflow: auto;                   }
#div_tools BUTTON    { width            :                   100%; }
#div_tools BUTTON    { border           :                      0; }
#div_tools BUTTON    { border-radius    :                  1.0em; }
#div_tools BUTTON    { box-shadow       : 1px 1px 1px #DDD inset; }
#div_tools BUTTON    { margin           :            0.2em 0.2em; }
#div_tools BUTTON    { padding          :            0.4em 1.0em; }

#div_tools BUTTON    { background-color :             rgba(136,136,136,0.3); }
#div_tools BUTTON EM { display          :                      inline-block; }
#div_tools BUTTON EM { width            :                       min-content; }
#div_tools BUTTON    { font-weight      :                               900; }
#div_tools BUTTON    { color            :                              #000; }
#div_tools BUTTON    { text-shadow      : 1px 1px 1px rgba(255,255,255,0.7); }
#div_tools SUMMARY                        { white-space: nowrap; };
::-webkit-scrollbar                       { width         : 0.7rem; }
::-webkit-scrollbar:horizontal            { height        : 0.7rem; }
::-webkit-scrollbar                       { width         : 0.7rem; }
::-webkit-scrollbar-thumb                 { border-radius : 0.7rem; }
::-webkit-scrollbar-track                 { border-radius : 0.7rem; }
::-webkit-scrollbar-thumb                 { box-shadow    : inset 0 0 0.1rem rgba(0,0,0,0.5); }
::-webkit-scrollbar-track                 { box-shadow    : inset 0 0 0.1rem rgba(0,0,0,0.3); }
::-webkit-scrollbar-thumb                 { box-shadow    : rgba(0,  0,0,0.5) 0 8px 24px; }
::-webkit-scrollbar-thumb                 { background    : rgba(0, 88,0,0.5); }
::-webkit-scrollbar-thumb:window-inactive { background    : rgba(0, 88,0,0.2); }
::-webkit-scrollbar-track                 { background    : rgba(0,160,0,0.4); }
::-webkit-scrollbar-track:window-inactive { background    : rgba(0,192,0,0.2); }
::-webkit-scrollbar-corner                { background    : transparent;       }

#magnified_div::-webkit-scrollbar-thumb  { min-height    : 100px; }
#div_tools BUTTON { max-width        : 20em;             }
#div_tools OL     { max-width        : 20em;             }
#div_tools { font-size:  initial !important; }
#div_tools                    { display               : grid;                     }
#div_tools                    { grid-gap              : 0.5em;                    }
#div_tools                    { grid-template-columns : 1fr 1fr 1fr;              }
#div_tools>*                  { margin                : 0 0.5em;                  }
#div_tools>*                  { grid-column-start: 1; grid-column-end: 4;                            }
          #div_reload         { grid-column-start: 1; grid-column-end: 2; grid-row-start        : 1; margin: 0; }
          #div_magnify        { grid-column-start: 2; grid-column-end: 3; grid-row-start        : 1; margin: 0; }
          #div_options.hidden { position: unset   ; grid-column-start: 3; grid-column-end: 4; grid-row-start        : 1; margin: 0; }
          #div_options        { position: absolute; top: 0.5em; left: 100%;                          margin: 0; }
          #div_domains        {                                           grid-row-start        : 2; }
          #div_urls           {                                           grid-row-start        : 3; }
      #details_options        {                                           grid-row-start        : 4; }
          #div_outline_pick   {                                           grid-row-start        : 5; }
          #div_outline_sample {                                           grid-row-start        : 6; }
          #div_xpaths         {                                           grid-row-start        : 7; }
#help {
    position       : absolute; top: 2em; left: 100%;
    pointer-events : none;
    transform      : rotate(5deg);
    display        : block;
    width          : fit-content;
    white-space    : pre;
    color          : white;
    text-shadow    : 1px 1px 0 black;
    font-weight    : 900;
}

.hidden #help { display: none; }
#div_reload           button { border-radius    : 0.6em 0.2em 0.6em 0.2em; margin: 0; }
#div_magnify          button { border-radius    : 0     0     1.0em 1.0em; margin: 0; }

#div_options.hidden   button { border-radius    : 0.2em 0.6em 0.2em 0.6em; margin: 0; }
#div_options          button { border-radius    : 1.0em;                              }

#div_reload           button { background-color : rgba(255,255,255,0.1); }
#div_magnify          button { background-color : rgba(255,255,255,0.1); }

#div_options.hidden  >button { background-color : rgba(255,255,255,0.1); }
#div_options         >button { background-color : #F0F; }
#div_options         .p_input{ background-color : #333; }
#div_options         .p_input{            color : #DDD; }

#div_reload           button { box-shadow       : -2px -2px 4px rgba(255,255,255,0.3) inset  !important; }
#div_magnify          button { box-shadow       :  0px -2px 4px rgba(255,255,255,0.3) inset  !important; }

#div_options          button { box-shadow       :  2px -2px 4px rgba(255,255,255,0.3) inset  !important; }
#div_options.hidden          { position: unset   ;                         }
#div_options                 { position: absolute; top: 0.7em; left: 100%; }
#div_reload           button         { border : 0 !important; }
         #div_magnify button         { padding          : 0.1em 1.5em;                        }
         #div_magnify button         { border           : 0                       !important; }

         #div_magnify button::before { content          : "\\1F50E";                           }
.magnify #div_magnify button::before { content          : "\\1F50D";                           }

.magnify #div_magnify button         { background-color : #F0F                    !important; }
#button_sample                       { font-weight      : bolder;                }
#button_sample                       { line-height      : 1em;                   }
#button_sample::before               { content          : "\\2795  \\2795  \\2795"; }
#button_sample.can_add::before       { content          : "\\2573  \\2573  \\2573"; }
#button_sample.can_add               { color            : red;                   }
#button_sample.can_add               { background-color : rgba(034,034,034,0.5); }
#div_options>*               { margin        : 0.5em;                                  }

#div_options                 { opacity       : 1.0;                                      }

#div_options                 { border-radius : 0 0.5em 0.5em 0;                          }
#div_options.hidden          { box-shadow    : none;                                     }
#div_options                 { box-shadow    : 2px 2px 2px rgba(136,136,136,0.5);                        }
#div_options.hidden          { padding       : unset;                                    }
#div_options                 { padding       : 0.5em;                                    }
#div_options.hidden          { background    : transparent;                              }
#div_options                 { background    : #D8D;                                     }
#div_options                 { background    : linear-gradient(to right, #A6A, #D8D 2%, #D8D, #A6A 95%); }

#div_options        button   { border        : 0                       !important; }
#div_options.hidden>details  { display       : none; }
#div_options             div { margin-left: 1em; }
#div_options             div:first-of-type { border-width: 3px; }
#div_options             div:first-of-type {  margin-left: 1em; }
#div_options             div               {  margin-left: 2em; }
#div_urls.disabled    { opacity : 50%; }
#div_xpaths>DIV.add>EM:first-of-type {
    display          : inline-block;
    border           : 2px solid black;
    font-size        : 150%;
    opacity          : 80%;
    background       : white;
    color            : black;
}

#div_xpaths>DIV                       { border        : 2px solid rgba(136,136,136,1.0);   }
#div_xpaths>DIV                       { border-radius : 1em;                               }
#div_xpaths>DIV                       { margin        : 1px 2px;                           }
#div_xpaths>DIV                       { padding       : 3px 0.5em;                         }
#div_xpaths>DIV                       { white-space   : nowrap;                            }
#div_xpaths>DIV      >EM              { background    : rgba(136,136,136,0.3);             }
#div_xpaths>DIV      >EM              { color         : unset;                             }
#div_xpaths>DIV      >EM              { margin        : 2px;                               }
#div_xpaths>DIV      >EM              { box-shadow    : 1px 1px 2px #FFF inset             }
#div_xpaths>DIV      >EM              { padding       : 2px 0.5em;                         }
#div_xpaths>DIV      >EM              { text-align    : left;                              }
#div_xpaths>DIV      >EM              { min-width     : 2em;                               }
#div_xpaths>DIV.delete                { border        : 2px solid black;                   }
#div_xpaths             >DIV                 { display:   grid; }
#div_xpaths             >DIV>EM:nth-child(3) { display:   none; }
.xpath_expand #div_xpaths>DIV>EM:nth-child(3) { display: inline; }

.xpath_expand #div_xpaths>DIV                 { grid-template-columns: max-content max-content auto; }

#div_xpaths             >DIV>EM:nth-child(1) { grid-column-start    : 1;      grid-column-end: 2; }
#div_xpaths             >DIV>EM:nth-child(2) { grid-column-start    : 2;      grid-column-end: 3; }
#div_xpaths             >DIV>EM:nth-child(3) { grid-column-start    : 3;      grid-column-end: 4; }

.docked      #div_xpaths>DIV>EM:nth-child(3) { display:   none; }
.docked      #div_xpaths>DIV>EM:nth-child(2) {                                grid-column-end: 4; }
.cc1 { color: #FFF; background-color:#964B00 !important; }
.cc2 { color: #FFF; background-color:#FF0000 !important; }
.cc3 { color: #000; background-color:#FFA500 !important; }
.cc4 { color: #000; background-color:#FFFF00 !important; }
.cc5 { color: #000; background-color:#9ACD32 !important; }
.cc6 { color: #000; background-color:#6495ED !important; }
.cc7 { color: #000; background-color:#EE82EE !important; }
.cc8 { color: #000; background-color:#A0A0A0 !important; }
.cc9 { color: #000; background-color:#FFFFFF !important; }
.cc0 { color: #FFF; background-color:#202020 !important; }

.bg1 { background-color : rgba(150,  75,   0, .9); color : black; outline: 2px solid rgb(150,  75,   0); outline-offset: 0px; }
.bg2 { background-color : rgba(255,   0,   0, .9); color : black; outline: 2px solid rgb(255,   0,   0); outline-offset: 0px; }
.bg3 { background-color : rgba(255, 165,   0, .9); color : black; outline: 2px solid rgb(255, 165,   0); outline-offset: 0px; }
.bg4 { background-color : rgba(255, 255,   0, .9); color : black; outline: 2px solid rgb(255, 255,   0); outline-offset: 0px; }
.bg5 { background-color : rgba(154, 205,  50, .9); color : black; outline: 2px solid rgb(154, 205,  50); outline-offset: 0px; }
.bg6 { background-color : rgba(100, 149, 237, .9); color : black; outline: 2px solid rgb(100, 149, 237); outline-offset: 0px; }
.bg7 { background-color : rgba(238, 130, 238, .9); color : black; outline: 2px solid rgb(238, 130, 238); outline-offset: 0px; }
.bg8 { background-color : rgba(160, 160, 160, .9); color : black; outline: 2px solid rgb(160, 160, 160); outline-offset: 0px; }
.bg9 { background-color : rgba(255, 255, 255, .9); color : black; outline: 2px solid rgb(255, 255, 255); outline-offset: 0px; }
.bg0 { background-color : rgba(128, 128, 128, .9); color : black; outline: 2px solid rgb(128, 128, 128); outline-offset: 0px; }

.fg1 {            color : rgba(200,  99,   0, 1) !important; }
.fg2 {            color : rgba(255,   0,   0, 1) !important; }
.fg3 {            color : rgba(255, 165,   0, 1) !important; }
.fg4 {            color : rgba(255, 255,   0, 1) !important; }
.fg5 {            color : rgba(154, 205,  50, 1) !important; }
.fg6 {            color : rgba(100, 149, 237, 1) !important; }
.fg7 {            color : rgba(238, 130, 238, 1) !important; }
.fg8 {            color : rgba(160, 160, 160, 1) !important; }
.fg9 {            color : rgba(255, 255, 255, 1) !important; }
.fg0 {            color : rgba(  0,   0,   0, 1) !important; text-shadow : 0px -1px #FFFFFF; }
    button                 { white-space   : nowrap; }
    summary>button         { min-width     :  2.0em; }
    summary>button         { border-radius :  0.5em; }
    #details_options       summary>button { font-size           :  1em; }
    #details_options[open] summary>button { box-shadow          : none; }
    #details_options[open] summary>button { margin-bottom       : -2px; }

    #details_options       summary>button { background          : rgba(136,136,136,0.5) !important; }
    #details_options[open] summary>button { background          : rgba(221,221,221,1.0) !important; }

    #details_options[open] summary        { width               : 50%; }
    #details_options[open] summary>button { width               : 50%; }

    #details_options       summary>button { border-radius       : 1em 1em 0 0;     }
    #details_options[open] summary>button { border              : 2px solid #DDD ; }
    #details_options[open] summary>button { border-bottom-width : 0;               }

    #details_options               button { padding-left        :  2em; }

    #details_options              >div      { display               : grid; }
    #details_options              >div      { column-gap            : 0.5em; }
    #details_options              >div      {    row-gap            : 0.1em; }
    #details_options              >div span { white-space           : nowrap; }
    #details_options              >div      { grid-template-columns : max-content max-content; }
    #details_options              >div      { border-radius         : 0 0 1em 1em;     }
    #details_options[open]        >div      { border                : 2px solid #DDD ; }
    #details_options              >div      { margin                : 0;               }
    #details_options              >div      { background            : rgba(221,221,221,0.3) !important; }
    .p_input {
         background-color: rgba(255,000,255,0.3);
         width           : min-content;
         white-space     : nowrap;
         user-select     : none;
         border-radius   : 1em;
         padding         : 0 0.5em;
         box-shadow      : 2px 2px 2px #888;
         border          : 1px solid   #FFF;
    }

    SPAN.p_input:first-of-type       { background : white; display: inline-block; margin: 0.5em 1.0em; }
    .p_input                          {                                            margin-top:   0.2em; }
    .p_input LABEL                    {                                            margin-left:  1.0em; }
    .p_input LABEL.selected::before   { content: "\\2714"; position: absolute;      margin-left: -1.0em; }
#div_tools.magnify   { transform       : scale(1.5); }
#div_tools           { transform-origin: 0 0;        }

#div_tools {

    position              : fixed; top: 1em; left: 1em;
    z-index               : 2147483646;
    border-radius         : 0.8em;
    box-shadow            : 5px 5px 5px rgba(255,255,255,0.5) inset;

    background            : #D8D;

    padding               : 0 0 0.5em 0;

}
#div_tools.docked.xpath_expand {
    border-width      : 0 0 0 5px;
    border-style      :    groove;
    border-color      :      #F0F;
}

#div_tools>*          { user-select      :            none; }

#div_tools em {
    font-style        : normal;
    margin-right      : 1em;
    border            : 0px solid #aaa;
    border-radius     : 5px;
    padding           : 0.2em 0.5em;

}

#div_tools em>b {
    font-size         : 150%;
    vertical-align    : middle;
    font-weight       : bolder;
}
          #xpath_expand.selected::before      { content     : "\\2714"; position: absolute; margin-left: -1em; }
          #outline_log_dot.selected::before   { content     : "\\2714"; position: absolute; margin-left: -1em; }
          #outline_log_frame.selected::before { content     : "\\2714"; position: absolute; margin-left: -1em; }
          #smooth_scroll.selected::before     { content     : "\\2714"; position: absolute; margin-left: -1em; }

          #xpath_expand                       { text-align  : right; line-height : 1.0em; }
          #outline_log_dot                    { text-align  : right; line-height : 1.0em; }
          #outline_log_frame                  { text-align  : right; line-height : 1.0em; }
          #smooth_scroll                      { text-align  : right; line-height : 1.0em; }
.wheelable    { background-color : rgba(128,128,128,0.5) !important; color: #FFF !important; }

          .lit{ outline-offset   : 7px;                              }
          .lit{ outline          : 3px dotted rgba(000,000,255,0.8); }

        OL.lit{ margin           : 1em;                              }
        OL.lit{ outline          : 3px auto   rgba(000,000,255,0.5); }
.folded OL.lit{ margin           : 0;                                }
.folded OL    { outline          : none;                             }

.lit     *    { box-shadow       : 2px 2px 2px #888 inset;           }

.lit.bg1      { background-color : rgba(150,075,000,0.5) !important; }
.lit.bg2      { background-color : rgba(255,000,000,0.5) !important; }
.lit.bg3      { background-color : rgba(255,165,000,0.5) !important; }
.lit.bg4      { background-color : rgba(255,255,000,0.5) !important; }
.lit.bg5      { background-color : rgba(154,205,050,0.5) !important; }
.lit.bg6      { background-color : rgba(100,149,237,0.5) !important; }
.lit.bg7      { background-color : rgba(238,130,238,0.5) !important; }
.lit.bg8      { background-color : rgba(160,160,160,0.5) !important; }
.lit.bg9      { background-color : rgba(255,255,255,0.5) !important; }
.lit.bg0      { background-color : rgba(032,032,032,0.5) !important; }
#div_mask.bg1 { background-color : rgba(150,075,000,0.9) !important; }
#div_mask.bg2 { background-color : rgba(255,000,000,0.9) !important; }
#div_mask.bg3 { background-color : rgba(255,165,000,0.9) !important; }
#div_mask.bg4 { background-color : rgba(255,255,000,0.9) !important; }
#div_mask.bg5 { background-color : rgba(154,205,050,0.9) !important; }
#div_mask.bg6 { background-color : rgba(100,149,237,0.9) !important; }
#div_mask.bg7 { background-color : rgba(238,130,238,0.9) !important; }
#div_mask.bg8 { background-color : rgba(160,160,160,0.9) !important; }
#div_mask.bg9 { background-color : rgba(255,255,255,0.9) !important; }
#div_mask.bg0 { background-color : rgba(032,032,032,0.9) !important; }
/*INLINE}}}*/
/*# sourceURL=div_tools.css */
`
)
 .replace(/\\(\\x+)/g,"\\\\$1")
;
/*}}}*/
/*_ [div_tools_css] {{{*/
let  div_tools_css;
/*_ dom_load {{{*/
let dom_load = function(html_fragment)
{
    try {

        window.addEventListener("error", load_onerror, false);

        div_tools_css   = load_css_EL("div_tools_css", div_tools_css_data);
        if(div_tools_css.href.length    < 128)
            console.warn("%c"+DIV_TOOLS_HTML_JS_TAG+": [div_tools] CSS NOT LOADED", "font-size:200%;");

        html_fragment.appendChild( div_tools_css );
    }
    catch(ex) {
        console.log(DIV_TOOLS_HTML_JS_ID+": LOADING DATA .. catch");
        console.dir(ex);
    }
    finally {
//console.log(DIV_TOOLS_HTML_JS_ID+": LOADING DATA .. finally: div_tools_css.length=["+div_tools_css.length+"]")
        window.removeEventListener("error", load_onerror, false);
    }
};
/*}}}*/
/*… load_onerror {{{*/
let load_onerror_count = 0;
let load_onerror = function(e)
{
    console.log("%c "+DIV_TOOLS_HTML_JS_TAG      +" %c * load_onerror #"+(++load_onerror_count)
                ,"background-color:#111",  "background-color:#500"                    );
    console.dir( e  );

    if( e.error          ) try { console.log("e.error..."+ e.error  ); } catch(ex) { console.log(ex); }
    if( e.message        ) try { console.log("e.message."+ e.message); } catch(ex) { console.log(ex); }
    if( e.name           ) try { console.log("e.name...."+ e.name   ); } catch(ex) { console.log(ex); }
    if( e.type != "error") try { console.log("e.type...."+ e.type   ); } catch(ex) { console.log(ex); }
    if( e.target         ) try { console.log(              e.target ); } catch(ex) { console.log(ex); }
};
/*}}}*/
/*… load_css_EL {{{*/
let load_css_EL = function(id, scheme_arg) {
    let el           = document.createElement("link");
    el.id            = id;

    el.href          = scheme_arg;
    el.type          = "text/css";
    el.charset       = "utf-8";
    el.rel           = "stylesheet";
    el.addEventListener("error", load_onerror);

    return el;
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ CSS (INLINED) ......................... [../stylesheet/div_tools.css] │
    // └───────────────────────────────────────────────────────────────────────┘
/* INLINING FROM VIM .. XPH/stylesheet/div_tools.css stylesheet/div_tools.css {{{*/
/*
:/^<style>/+,/<\/style>/-d|-read!sed -e 's;\\\\;\\\\\\\\;g' %:h/../stylesheet/div_tools.css
:/^<style>/+,/<\/style>/-d|s/^/\r/
:e %:h/../stylesheet/div_tools.css
*/
const DIV_TOOLS_CSS =
`
<style>

</style>
`;
/*}}}*/
/* MISSING_INLINE_CSS .. (just in case .. as nothing happens on the screen otherwise...) {{{*/
const MISSING_INLINE_CSS = /* eslint-disable-line no-unused-vars */
`
<style>
#div_tools         {
 position         : fixed !important;
 left             : 1em;
 outline          : 0.5em dashed black;
 outline-offset   : 0.5em;
 background-color : red;
 cursor           : pointer;
}
#div_tools::before {
 box-shadow       : 1em 1em 1em #888;
 background       : #222;
 font-size        : 32px !important;
 color            : red;
 content          : "MISSING INLINE: XPH/stylesheet/div_tools.css";
}
</style>
`;
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ HTML [CREATE] [UPDATE] .............. XPH/javascript/xpath_content.js │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ get_div_tools_innerHTML {{{*/
let get_div_tools_innerHTML = function()
{
    /*   div_reload_innerHTML {{{*/
    let  div_reload_innerHTML = "<div id='div_reload'> <button title='Reload'> <span>&#x267B;</span></button> </div>";

    /*}}}*/
    /*   div_magnify_innerHTML {{{*/
    let  div_magnify_innerHTML
        = "<div id='div_magnify'>"
        + " <button title='Magnify'></button>"
        + "</div>"
    ;

    /*}}}*/
    /*   div_options_innerHTML {{{*/
    let  div_options_innerHTML = `
<div id="div_options" class="hidden">
<div id="help">
&#x1F4A1; Outline refresh
➔ Shift Mouse-Click
… <i>(inside tools GUI)</i>
<hr>
&#x1F4A1; Clear all selections
➔ Ctrl-Alt Mouse-Click
… <i>(inside tools GUI)</i>
<hr>
&#x1F4A1; Mouse Wheel offset factor
➔ <span class='fg4'> Shift </span> <span class='fg5'> Ctrl </span> <span class='fg6'> Alt </span>
… <span class='fg4'> x2    </span> <span class='fg5'> x4   </span> <span class='fg6'> x8  </span>
… <i>(DOM-tree up and down quicker)</i>
</div>

 <button title="Settings"> &#x1F527; </button>

 <details  id="details_options">
  <summary><em>OPTIONS </em></summary>
  <div>
   <button id="xpath_expand"     > EXPAND XPATH  </button> <span> expand <b>SELECTED XPath</b>     </span>
   <button id="outline_log_dot"  > LOG DOTS      </button> <span> trace containers detection point </span>
   <button id="outline_log_frame"> LOG FRAMES    </button> <span> trace containers border          </span>
   <button id="smooth_scroll"    > SMOOTH SCROLL </button> <span> ... or instant scroll behavior   </span>
  </div>
 </details>

 <details>
  <summary><em>TOOLS</em></summary>
  <div class="p_input"> <label id= "LOG_TOOLS"     > LOG_TOOLS      </label></div>
  <div class="p_input fg1"> <label id= "LOG1_STEP"     > LOG1_STEP      </label></div>
  <div class="p_input fg2"> <label id= "LOG2_MESSAGE"  > LOG2_MESSAGE   </label></div>
  <div class="p_input fg3"> <label id= "LOG3_SERVER"   > LOG3_SERVER    </label></div>
  <div class="p_input fg4"> <label id= "LOG4_XHR"      > LOG4_XHR       </label></div>
  <div class="p_input fg5"> <label id= "LOG5_DIV_TOOLS"> LOG5_DIV_TOOLS </label></div>
  <div class="p_input fg6"> <label id= "LOG6_MOVE_TOOL"> LOG6_MOVE_TOOL </label></div>
 </details>

 <details>
  <summary><em>OUTLINE</em></summary>
  <div class="p_input"> <label id= "LOG_OUTLINE"   > LOG_OUTLINE    </label></div>
  <div class="p_input fg1"> <label id= "LOG1_EVENT"    > LOG1_EVENT     </label></div>
  <div class="p_input fg2"> <label id= "LOG2_WHEEL"    > LOG2_WHEEL     </label></div>
  <div class="p_input fg3"> <label id= "LOG3_MASK"     > LOG3_MASK      </label></div>
  <div class="p_input fg4"> <label id= "LOG4_FRAMES"   > LOG4_FRAMES    </label></div>
  <div class="p_input fg5"> <label id= "LOG5_XPATH"    > LOG5_XPATH     </label></div>
 </details>

</div>
`;

    /*}}}*/
    /* div_domains_innerHTML {{{*/
    let div_domains_innerHTML
        = "<div id='div_domains'>"
        + " <button>"
        + "  <em><b>&#x27F3;</b> DOMAIN</em>"
        + " </button>"
        + "</div>"
    ;

    /*}}}*/
    /* div_urls_innerHTML {{{*/
    let div_urls_innerHTML
        = "<div id='div_urls' class='disabled'>"
        + " <button>"
        + "  <em><b>&#x27F3;</b> URL</em>"
        + " </button>"
        + "</div>"
    ;

    /*}}}*/
    /* div_xpaths_innerHTML {{{*/
    let div_xpaths_innerHTML
        = "<div id='div_xpaths'>... ➔</div>"
    ;

    /*}}}*/
    /* div_outline_pick_innerHTML {{{*/
    let div_outline_pick_innerHTML
        = "<div id='div_outline_pick'>"
        + " <button title='Click to select a single HTML ELEMENT'> &#x2795; </button>" // &#x279A;
        + "</div>"
    ;

    /*}}}*/
    /* div_outline_sample_innerHTML {{{*/
    let div_outline_sample_innerHTML
        = "<div id='div_outline_sample'>"
        + " <button id='button_sample' title='Click to sample a group of visible containers'>&nbsp;</button>"
        + "</div>"
    ;

    /*}}}*/

    let is_embedded = lib_log.is_embedded(DIV_TOOLS_HTML_JS_ID);
    let    css_link = "<link href='stylesheet/div_tools.css' rel='stylesheet' type='text/css' />"; // wont work with manifest.json
    let tools_css
        = (DIV_TOOLS_CSS.length > 64) ?  DIV_TOOLS_CSS
        : is_embedded                 ?  css_link
        :                                ""//MISSING_INLINE_CSS
    ;

    return ""
        + tools_css
        + "<div id='div_tools'>"        // display  grid
    // --------------------------------
        +  div_reload_innerHTML         // .. grid row 1
        +  div_magnify_innerHTML        // .. grid row 1
        +  div_options_innerHTML        // .. grid row 1
    // --------------------------------
        +  div_domains_innerHTML        // .. grid row 2
    // --------------------------------
        +  div_urls_innerHTML           // .. grid row 3
    // --------------------------------
//      +  details_options_innerHTML    // .. grid row 4
    // --------------------------------
        +  div_outline_pick_innerHTML   // .. grid row 4
    // --------------------------------
        +  div_outline_sample_innerHTML // .. grid row 5
    // --------------------------------
        +  div_xpaths_innerHTML         // .. grid row 6
    // --------------------------------
        + "</div>"
    ;

};
/*}}}*/
/*_ update_div_tools_innerHTML {{{*/
let update_div_tools_innerHTML = function(options={}) // eslint-disable-line complexity
{
/*{{{*/
let caller = "update_div_tools_innerHTML";
let log_this = xpath_content_js.options.LOG5_DIV_TOOLS;

if(log_this) lib_log.log_key_val(caller+"(options)", options);
/*}}}*/
    /* [div_tools_xy] {{{*/
    if( div_tools ) {
        div_tools.style.left = (options.div_tools_xy ? options.div_tools_xy.x : DIV_TOOLS_XY.x)+"px";
        div_tools.style.top  = (options.div_tools_xy ? options.div_tools_xy.y : DIV_TOOLS_XY.y)+"px";

    }
    /*}}}*/
    /* div_options LOG_TOOLS .. LOG_OUTLINE .. details_options {{{*/
    let id;              let el;

    /* OPTIONS */
    id ="xpath_expand"     ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="outline_log_dot"  ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="outline_log_frame"; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="smooth_scroll"    ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;

    id ="details_options"  ; el = lib_util.get_tool(id); el.setAttribute("open", get_option(id) ?            "true" : "false" );

    /* LOG_TOOLS */
    id ="LOG1_STEP"         ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG2_MESSAGE"      ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG3_SERVER"       ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG4_XHR"          ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG5_DIV_TOOLS"    ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG6_MOVE_TOOL"    ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;

    /* LOG_OUTLINE */
    id ="LOG1_EVENT"        ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG2_WHEEL"        ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG3_MASK"         ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG4_FRAMES"       ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;
    id ="LOG5_XPATH"        ; el = lib_util.get_tool(id); el         .className = get_option(id) ? "option selected" : "option" ;

    /*}}}*/
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ SHADOW DOM                                                            │
    // └───────────────────────────────────────────────────────────────────────┘
/* inject_shadow_root {{{*/
/*{{{*/
const CAPTURE_TRUE_PASSIVE_FALSE  = { capture:true , passive:false };
const DIV_TOOLS_XY                = { x: 32 , y: 32 };

let div_tools;
/*}}}*/
// ┌───────────────────────────────────────────────────────────────────────────┐
// │ LOAD-SEQUENCE FOR EMBEDDED SCRIPT                                         │
// │ 1. xpath_embedded.html loads all scripts                                  │
// │ 2. shadowRoot is injected                                                 │
// │ 3. content_script is loaded by embedding html page                        │
// │ 4. setTimeout calls shadow_host_addEventListener reference content_script │
// └───────────────────────────────────────────────────────────────────────────┘
let inject_shadow_root = function()
{
/*{{{*/
let caller = "inject_shadow_root";
let log_this = xpath_content_js.options.LOG5_DIV_TOOLS;

/*}}}*/
//lib_log.log_caller()

    lib_util.clr_shadow_host();
    tools.loaded = false;

    /* [html_fragment] .. [shadow_host] .. [shadowRoot] {{{*/
    let html_fragment;
    let shadow_host = document.getElementById( lib_util.SHADOW_HOST_ID );
    if(!shadow_host)
    {
//lib_log.logBIG("➔ ADDING [shadow_host]", 1)

        shadow_host                = document.createElement("DIV");
        shadow_host.id             = lib_util.SHADOW_HOST_ID;
        shadow_host.style.revert   =     "all";
        shadow_host.style.fontSize =  "revert !important";
      //shadow_host.style.fontSize = "initial !important"; // OK: wikipedia.org
      //shadow_host.style.fontSize =   "unset !important"; // OK: lemonde.fr

        document.documentElement.appendChild( shadow_host );

        html_fragment
            = shadow_host.attachShadow
            ? shadow_host.attachShadow({mode: "open"})
            : shadow_host;

//console.log(html_fragment)
    }
    else {
if(log_this) lib_log.logBIG(caller+"...OK [shadow_host]", 1);

        html_fragment = shadow_host.shadowRoot;
    }
    /*}}}*/
    /* [div_tools] {{{*/
    html_fragment.innerHTML = get_div_tools_innerHTML();

    dom_load( html_fragment );

    update_div_tools_innerHTML( xpath_content_js.options );

    div_tools = html_fragment.getElementById("div_tools");

    let div_tools_xy = get_option("div_tools_xy");

    div_tools.style.left = (div_tools_xy ? div_tools_xy.x : DIV_TOOLS_XY.x)+"px";
    div_tools.style.top  = (div_tools_xy ? div_tools_xy.y : DIV_TOOLS_XY.y)+"px";
    /*}}}*/

    shadow_host_addEventListener();

    let div_options = html_fragment.getElementById("div_options");
    div_options.addEventListener("click", xpath_content_js.log_toggle, CAPTURE_TRUE_PASSIVE_FALSE);

    /* [DETAILS] RESTORE OPEN STATE SAVED IN localStorage {{{*/
    details_load_open_state();

    /*}}}*/
    return html_fragment;
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ DETAILS STORE OPENED STATE                                            │
    // └───────────────────────────────────────────────────────────────────────┘
 /*_ details_load_open_state {{{*/
let  details_load_open_state = function()
{
    /* RESTORE ONLOAD OPEN STATE {{{*/
    let        details = div_tools.querySelectorAll("DETAILS");
    Array.from(details).forEach( (el) => {
        if((el.id) && get_option(el.id+"_open")) el.open = true;
//console.log(el.id+(el.open ? " OPENED":" NOT OPENED"))
    });

    /*}}}*/
    /* TRACK CHANGED OPEN STATE {{{*/
    Array.from(details).forEach( (el) => {
        if(!el.id) return;
        el.addEventListener("toggle", details_ontoggle);
    });
    /*}}}*/
};
/*}}}*/
/*_ details_ontoggle {{{*/
let details_ontoggle = function(event)
{
    if(event.target.id)
    {
        let        key      = event.target.id+"_open";
        let             val = event.target.open;
        set_option(key, val);

//console.log("details_ontoggle: "+event.target.id+(open ? " OPEN":" NOT OPEN"))
    }
};
 /*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EVENT                                                                 │
    // └───────────────────────────────────────────────────────────────────────┘
/*_ shadow_host_addEventListener {{{*/
let shadow_host_addEventListener = function() // eslint-disable-line no-unused-vars
{
    let shadow_host = document.getElementById( lib_util.SHADOW_HOST_ID );
    shadow_host.addEventListener("click", shadow_host_click_handler, CAPTURE_TRUE_PASSIVE_FALSE);

};
/*}}}*/
/*_ shadow_host_click_handler {{{*/
let shadow_host_click_handler = function(event)
{
let log_this = xpath_content_js.options.LOG5_DIV_TOOLS;
/*{{{*/
    if(event.shiftKey               ) outline.outline_clear_all();
    if(event.ctrlKey && event.altKey) outline.data_num_xpath_delete_all();
    if(event.ctrlKey) return;
    if(event.altKey ) return;

let caller = "shadow_host_click_handler";

    if( lib_util.get_has_moved_since_onDown_XY() )
    {
if(log_this) lib_log.logBIG("SHADOW_HOST MOVED", 8);

        return;
    }

if( log_this) lib_log.logBIG(caller);
/*}}}*/

    let { tool_id, e_target, handler} = get_event_tool_target_handler( event );

    if(!e_target)
    {
if(log_this) lib_log.log("...found no tool to serve");

        return;
    }

if(log_this) div_tools_layout( e_target );

    if( handler ) {
if(log_this) lib_log.logBIG("calling "+handler.name, 9);
if(log_this) lib_log.log_key_val(caller, { tool_id , handler , e_target, callers: lib_log.get_callers() });
        handler(e_target, event);
    }
//  else console.log("NO HANDLER FOR ["+e_target+"]")
};
/*}}}*/
/*_ get_event_tool_target_handler {{{*/
let get_event_tool_target_handler = function(event) // eslint-disable-line complexity
{
    /* [tools.loaded] {{{*/
    if(!tools.loaded) load_tools();

    /*}}}*/
    /* [e_target] {{{*/

    let e_target = lib_util.get_event_target(event);
    let     tool;

    /* DOMAINS */
    if     ( lib_util.is_el_child_of_el(e_target, tools.div_domains       .el) ) { tool = tools.div_domains       ; }

    /* URLS */
    else if( lib_util.is_el_child_of_el(e_target, tools.div_urls          .el) ) { tool = tools.div_urls          ; }

    /* OPTION */
    else if( lib_util.is_el_child_of_el(e_target, tools.xpath_expand      .el) ) { tool = tools.xpath_expand      ; }
    else if( lib_util.is_el_child_of_el(e_target, tools.outline_log_dot   .el) ) { tool = tools.outline_log_dot   ; }
    else if( lib_util.is_el_child_of_el(e_target, tools.outline_log_frame .el) ) { tool = tools.outline_log_frame ; }
    else if( lib_util.is_el_child_of_el(e_target, tools.smooth_scroll     .el) ) { tool = tools.smooth_scroll     ; }
    else if( lib_util.is_el_child_of_el(e_target, tools.details_options   .el) ) { tool = tools.details_options   ; }

    /* XPATHS */
    else if( lib_util.is_el_child_of_el(e_target, tools.div_outline_pick  .el) ) { tool = tools.div_outline_pick  ; }
    else if( lib_util.is_el_child_of_el(e_target, tools.div_outline_sample.el) ) { tool = tools.div_outline_sample; }
    else if( lib_util.is_el_child_of_el(e_target, tools.div_xpaths        .el) ) { tool = tools.div_xpaths        ; }
    else {
        return {};
    }
    /*}}}*/
    return { tool_id: tool.id , e_target , handler: tool.handler };
};
/*}}}*/
/*_ load_tools {{{*/
/*{{{*/
const tools = { loaded  : false };

/*}}}*/
let load_tools = function() // eslint-disable-line complexity
{
/*{{{*/
let log_this = xpath_content_js.options.LOG5_DIV_TOOLS;

if( log_this) lib_log.log("load_tools");
/*}}}*/
    /* ID ➔ [handler] {{{*/

    // ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    // │                  TOOLS_GUI =             BUTTON_ID           ➔ CALLBACK                                                  │
    // └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

    /* grid row 1 ➔ DOMAINS */
    tools.div_domains               = {       id: "div_domains"       , handler: xpath_content_js.get_domains                    };

    /* grid row 2 ➔ URLS */
    tools.div_urls                  = {       id: "div_urls"          , handler: xpath_content_js.get_urls                       };

    /* div_options➔ OPTIONS */
    tools.details_options           = {       id: "details_options"   , handler: null                                            };
    tools.xpath_expand              = {       id: "xpath_expand"      , handler:          outline.outline_option_toggle_e_target };
    tools.outline_log_dot           = {       id: "outline_log_dot"   , handler:          outline.outline_dots_toggle_handler    };
    tools.outline_log_frame         = {       id: "outline_log_frame" , handler:          outline.outline_frames_toggle_handler  };
    tools.smooth_scroll             = {       id: "smooth_scroll"     , handler: xpath_content_js.smooth_scroll_toggle_handler   };

    /* grid row 3 ➔ PICK */
    tools.div_outline_pick          = {       id: "div_outline_pick"  , handler:          outline.pick_xpath_e_target            };

    /* grid row 4 ➔ SAMPLE */
    tools.div_outline_sample        = {       id: "div_outline_sample", handler:          outline.sampling_pick_some_xpath       };

    /* grid row 5 ➔ XPATHS */
    tools.div_xpaths                = {       id: "div_xpaths"        , handler:          outline.div_xpaths_click_handler       };

    /*}}}*/
    /* ID ➔ [el] .. (warn about GUI missing tools) {{{*/
    let missing = "";

    /* OPTION */
    if( !tools.details_options   .el ) { tools.id = "details_options"   ; tools.details_options   .el = lib_util.get_tool(tools.id); if( !tools.details_options   ) missing += " "+tools.id; }
    if( !tools.xpath_expand      .el ) { tools.id = "xpath_expand"      ; tools.xpath_expand      .el = lib_util.get_tool(tools.id); if( !tools.xpath_expand      ) missing += " "+tools.id; }
    if( !tools.outline_log_dot   .el ) { tools.id = "outline_log_dot"   ; tools.outline_log_dot   .el = lib_util.get_tool(tools.id); if( !tools.outline_log_dot   ) missing += " "+tools.id; }
    if( !tools.outline_log_frame .el ) { tools.id = "outline_log_frame" ; tools.outline_log_frame .el = lib_util.get_tool(tools.id); if( !tools.outline_log_frame ) missing += " "+tools.id; }
    if( !tools.smooth_scroll     .el ) { tools.id = "smooth_scroll"     ; tools.smooth_scroll     .el = lib_util.get_tool(tools.id); if( !tools.smooth_scroll     ) missing += " "+tools.id; }

    /* DOMAINS .. URLS */
    if( !tools.div_domains       .el ) { tools.id = "div_domains"       ; tools.div_domains       .el = lib_util.get_tool(tools.id); if( !tools.div_domains       ) missing += " "+tools.id; }
    if( !tools.div_urls          .el ) { tools.id = "div_urls"          ; tools.div_urls          .el = lib_util.get_tool(tools.id); if( !tools.div_urls          ) missing += " "+tools.id; }

    /* XPATHS */
    if( !tools.div_outline_pick  .el ) { tools.id = "div_outline_pick"  ; tools.div_outline_pick  .el = lib_util.get_tool(tools.id); if( !tools.div_outline_pick  ) missing += " "+tools.id; }
    if( !tools.div_outline_sample.el ) { tools.id = "div_outline_sample"; tools.div_outline_sample.el = lib_util.get_tool(tools.id); if( !tools.div_outline_sample) missing += " "+tools.id; }
    if( !tools.div_xpaths        .el ) { tools.id = "div_xpaths"        ; tools.div_xpaths        .el = lib_util.get_tool(tools.id); if( !tools.div_xpaths        ) missing += " "+tools.id; }

    /*}}}*/
    /* MISSING TOOLS {{{*/
    tools.loaded = !missing;
if(!tools.loaded)
        lib_log.logBIG("MISSING TOOLS: "+missing);
    /*}}}*/
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ GUI STAGE LAYOUT                                                      │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
const STAGE_LIST
        = [   "stage_options"
            , "stage_domains" // grid row 1
            , "stage_urls"    // grid row 2
            , "stage_pick"    // grid row 3
            , "stage_sample"  // grid row 4
            , "stage_xpaths"  // grid row 5
            , "stage_delete"  // .... ... 5
            , "stage_add"     // .... ... 5
        ];

/*}}}*/
/*_ div_tools_layout {{{*/
let div_tools_layout = function(e_target)
{
/*{{{*/
let caller = "div_tools_layout";

//lib_log.log(caller+"("+lib_util.get_id_or_tag(e_target)+")")
/*}}}*/
    /* [div_tools_child] {{{*/
    let div_tools_child = get_div_tools_child_for_el( e_target );
//lib_log.logBIG("...div_tools_child=["+lib_util.get_id_or_tag(div_tools_child)+"]", 2)

    /*}}}*/
    /* [div_tools_child] ➔ [cmd] ➔ GUI STAGE LAYOUT {{{*/
    let cmd = "";
    switch(div_tools_child.id)
    {
    case "div_domains"        : cmd = "domains"; break;
    case "div_urls"           : cmd = "urls"   ; break;
    case "details_options"    : cmd = "options"; break;
    case "div_outline_pick"   : cmd = "xpaths" ; break;
    case "div_outline_sample" : cmd = "xpaths" ; break;
    case "div_xpaths"         : cmd = "xpaths" ; break;

    default: lib_log.logBIG(caller+": [STAGE_LIST] has no entry for ["+ lib_util.get_id_or_tag(div_tools_child) +"]", 2);
    }

    if( cmd )
        div_tools_layout_cmd(cmd, div_tools_child.id);

    /*}}}*/
};
/*}}}*/
/*_ div_tools_layout_cmd {{{*/
let div_tools_layout_cmd = function(cmd, div_tools_child_id)
{
let caller = "div_tools_layout_cmd";
let log_this = xpath_content_js.options.LOG3_SERVER;

    for(let i=0; i< STAGE_LIST.length; ++i)
        div_tools.classList.remove( STAGE_LIST[i] );

    let className = "stage_"+cmd;

    let msg
        = (div_tools_child_id ? "GUI=["+ div_tools_child_id+"] ➔ " : "")
        +                       "cmd=["+ cmd               +"] ➔ "
        +                           "["+ className         +"]";

    if( STAGE_LIST.includes(className) )
    {
        div_tools.classList.add( className );

if(log_this) lib_log.logBIG(caller+": "+ msg );
    }
    else {
        lib_log.logBIG(     caller+": "+ msg +" *** STAGE_LIST MISMATCH", 2);
    }
};
/*}}}*/
/*_ get_div_tools_child_for_el {{{*/
let get_div_tools_child_for_el = function(el)
{
    if( lib_util.is_parent_or_child(tools.div_domains        .el, el) ) return tools.div_domains       ;
    if( lib_util.is_parent_or_child(tools.div_urls           .el, el) ) return tools.div_urls          ;
    if( lib_util.is_parent_or_child(tools.details_options    .el, el) ) return tools.details_options   ;
    if( lib_util.is_parent_or_child(tools.div_outline_pick   .el, el) ) return tools.div_outline_pick  ;
    if( lib_util.is_parent_or_child(tools.div_outline_sample .el, el) ) return tools.div_outline_sample;
    if( lib_util.is_parent_or_child(tools.div_xpaths         .el, el) ) return tools.div_xpaths        ;
    /*..............................................................*/ return null;
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ OPTIONS                                                               │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
let get_option = function(key    ) { let val = xpath_content_js.get_option(key    ); return val; };
let set_option = function(key,val) {           xpath_content_js.set_option(key,val);             };

/*}}}*/

/* EXPORT {{{*/
return { inject_shadow_root
    ,    div_tools_layout_cmd
    ,    update_div_tools_innerHTML
    ,    details_load_open_state
};

/*}}}*/
}());
/*{{{

" LIB
:new %:h/../../lib/lib_log.js
:new %:h/../../lib/lib_popup.js
:new %:h/../../lib/lib_util.js

" CSS
:new $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/stylesheet/dom_tools.css

" JS
:new $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/javascript/dom_tools.js
:new $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/javascript/dom_util.js

}}}*/

