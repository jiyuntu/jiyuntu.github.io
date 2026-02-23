A timer keeps counting down until being restarted, otherwise, it resets the program. When the program is
1. in an infinite loop
2. spending time on unusual number of interrupts
3. in a deadlock

it might not be able to restart the watchdog timer.
