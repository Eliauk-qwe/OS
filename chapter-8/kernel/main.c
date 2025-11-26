#include "print.h"
#include "init.h"
#include "debug.h"
#include "stdint.h"



int main(void){
    
    

    put_str("interrupt init\n");
    init_all();

    

    uint32_t ret=strcmp("abc","abd");
    put_str("strcmp ret:");
    put_int(ret);
    put_char('\n');

    uint32_t len=strlen("hello world");
    put_str("strlen:");
    put_int(len);
    put_char('\n');

    
    


    while(1);
    return 0;
}