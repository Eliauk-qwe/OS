#include "print.h"
#include "init.h"
#include "debug.h"
int main(void){
    
    

    put_str("interrupt init\n");
    init_all();

    


    while(1);
    return 0;
}