#!/bin/sh
#┌────────────────────────────────────────────────────────────────────────────┐
#│ server.sh                                              _TAG(211022:17h:53) │
#└────────────────────────────────────────────────────────────────────────────┘
function signal_trap()                { echo "*** SIGNAL TRAP ***"; press_any_key_to_terminate; }
function press_any_key_to_terminate() { read -p "PRESS ANY KEY TO TERNINATE .. (EXIT_CODE $EXIT_CODE)...";  exit $EXIT_CODE; }
trap signal_trap SIGINT

 EXIT_CODE=-1
 cd `pwd` && node ./SERVER/server.js
 EXIT_CODE=$?

 if [ $EXIT_CODE != 0 ]; then echo "EXIT_CODE=[$EXIT_CODE]"; else echo "...done"; fi
 if [ $EXIT_CODE != 0 ]; then press_any_key_to_terminate; fi

