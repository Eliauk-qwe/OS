#ifndef __KERNEL_MEMORY_H
#define __KERNEL_MEMORY_H

#include "bitmap.h"
#include "stdint.h"

struct virtual_memory_pool{
    struct bitmap  virtual_bitmap;    //虚拟内存位图
    uint32_t        vistual_start;       //虚拟内存起始地址
};


struct physical_memory_pool{
    struct bitmap  physical_bitmap;    //物理内存位图
    uint32_t        physical_start;       //物理内存起始地址
    uint32_t        physical_pool_size;   //物理内存池大小
};


#define PG_SIZE 4096      //页大小4KB
//定义内核堆区起始地址，堆区就是用来进行动态内存分配的地方，咱们的系统内核运行在c00000000开始的1MB虚拟地址空间，所以自然要跨过这个空间，
//堆区的起始地址并没有跨过256个页表，没关系，反正使用虚拟地址最终都会被我们的页表转换为物理地址，我们建立物理映射的时候，跳过256个页表就行了
#define BITMAP_VIRTUAL_START   0xc009a000 //位图的起始地址
#define KERNEL_HEAP_START 0xc0100000  //内核堆起始地址


extern struct physical_memory_pool kernel_physical_pool;
extern struct physical_memory_pool user_physical_pool;
extern struct virtual_memory_pool kernel_virtual_pool;


void mem_init(void) ;

#endif