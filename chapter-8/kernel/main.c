#include "print.h"
#include "init.h"
#include "debug.h"
#include "stdint.h"
#include "string.h"
#include "bitmap.h"
#include "memory.h"



int main(void){
    
    

    put_str("interrupt init\n");
    init_all();

    
    //ASSERT(1==2);


   //  uint32_t ret=strcmp("abc","abd");
   //  put_str("strcmp ret:");
   //  put_int(ret);
   //  put_char('\n');

   //  uint32_t len=strlen("hello world");
   //  put_str("strlen:");
   //  put_int(len);
   //  put_char('\n');


   //  int i;
   // struct bitmap btm;                              //创建管理位图的数据结构
   // struct bitmap* bitmap = &btm;
   // uint8_t test_map[2];                            //用这个数组充当测试用的位图，两字节16位
   // bitmap->btmp_bytes_len = sizeof(test_map);       //bitmap的长度域填入整个位图的长度
   // bitmap->bits = test_map;                        //bitmap的地址域填入位图的起始地址
   // bitmap_init(bitmap);                             //位图初始化，实际效果就是位图的所有位都变成0
   //                                                 //以下是在设置位图，设置成1111 0011 0001 0000
   // for(i = 0; i < 4; i++){  
   //    bitmap_set(bitmap, i, 1);
   // }
   // bitmap_set(bitmap, 6, 1);
   // bitmap_set(bitmap, 7, 1);
   // bitmap_set(bitmap, 11, 1);
   // put_char('\n');
   // for(i = 0; i < 16; i++){
   //    put_int(judge_bitmap(bitmap, i));
   // }
   // put_char('\n');
   // put_int(bitmap_scan(bitmap, 4));              //检验bitmap_scan
   // put_char('\n');
   // put_int(bitmap_scan(bitmap, 5));

    
    void* addr = get_kernel_pages(3);
   put_str("\n get_kernel_page start vaddr is ");
   put_int((uint32_t)addr);
   put_str("\n");



    while(1);
    return 0;
}