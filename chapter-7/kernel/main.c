#include "print.h"
#include "init.h"
int main(void){
    
    put_char('k');
    put_char('e');
    put_char('r');
    put_char('n');
    put_char('e');
    put_char('l');
    put_char('\n');
    put_char('1');
    put_char('2');
    put_char('\b');
    put_char('3');


    put_str("\nHello, kernel!\n");

    put_int(0);
    put_char('\n');
    put_int(9);
    put_char('\n');
    put_int(0x00021a3f);
    put_char('\n');
    put_int(0x12345678);
    put_char('\n');
    put_int(0x00000000);

    put_str("interrupt init\n");
    init_all();

    asm volatile
    (
        "sti"   //为了演示中断，这里先临时开启中断
    );


    while(1);
    return 0;
}