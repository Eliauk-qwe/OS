#include  "debug.h"
#include  "print.h"
#include  "interrupt.h"


void debug_print(const char* filename, int line, const char* func_name, const char* condition){
    //关闭中断.再打印信息
    intr_close();

    
    put_int("!!!!!!!!!!!  error  !!!!!!!!!!!\n");
    put_str("filename:");
    put_str(filename);
    put_str("\n");

    put_str("line:0x");
    put_int(line);
    put_str("\n");

    put_str("function:");
    put_str(func_name);
    put_str("\n");

    put_str("condition:");
    put_str(condition);
    put_str("\n");
    while(1);
}