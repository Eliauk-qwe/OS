// #ifndef __KERNEL_MEMORY_H
// #define __KERNEL_MEMORY_H

// #include "bitmap.h"
// #include "stdint.h"

// struct virtual_memory_pool{
//     struct bitmap  virtual_bitmap;    //虚拟内存位图
//     uint32_t        vistual_start;       //虚拟内存起始地址
// };


// struct physical_memory_pool{
//     struct bitmap  physical_bitmap;    //物理内存位图
//     uint32_t        physical_start;       //物理内存起始地址
//     uint32_t        physical_pool_size;   //物理内存池大小
// };


// #define PG_SIZE 4096      //页大小4KB
// //定义内核堆区起始地址，堆区就是用来进行动态内存分配的地方，咱们的系统内核运行在c00000000开始的1MB虚拟地址空间，所以自然要跨过这个空间，
// //堆区的起始地址并没有跨过256个页表，没关系，反正使用虚拟地址最终都会被我们的页表转换为物理地址，我们建立物理映射的时候，跳过256个页表就行了
// #define BITMAP_VIRTUAL_START   0xc009a000 //位图的起始地址
// #define KERNEL_HEAP_START 0xc0100000  //内核堆起始地址

// // 每个 PDE 4 字节：

// // 页目录项 结构（32 bit）
// // ┌──┬──┬──┬──┬──┬───────────────┬──────────────┐
// // │P │RW│US│ PWT│PCD│   A(ignored)│   基址 20bit │
// // └──┴──┴──┴──┴──┴───────────────┴──────────────┘
// //  0   1   2     3     4            12~31

// // 主要字段：
// // 位	名称	作用
// // 0	P	Present（是否存在）
// // 1	RW	读写权限
// // 2	US	用户/内核权限
// // 3	PWT	写穿透
// // 4	PCD	Cache 禁止
// // 12–31	Page Table 基址	指向一个页表 (4KB)
// #define	 PG_P_1	  1	// 页表项或页目录项存在属性位
// #define	 PG_P_0	  0	// 页表项或页目录项存在属性位
// #define	 PG_RW_R  0	// R/W 属性位值, 读/执行
// #define	 PG_RW_W  2	// R/W 属性位值, 读/写/执行
// #define	 PG_US_S  0	// U/S 属性位值, 系统级
// #define	 PG_US_U  4	// U/S 属性位值, 用户级

// //虚拟地址结构
// // 名称	                         位段	                        描述
// // Page Directory Index (PDI)	31–22	（10）                页目录表项下标，0–1023
// // Page Table Index (PTI)	    21–12	（10）               页表项下标，0–1023
// // Offset	                    11–0	（10）                  页内偏移，0–409

// //=====取出下标=======
// #define PDE_IDX(addr) ((addr & 0xffc00000) >> 22)  //1111 1111 1100  0000000000000000000000
// #define PTE_IDX(addr) ((addr & 0x003ff000) >> 12)  //0000 0000 0011 1111 1111


// extern struct physical_memory_pool kernel_physical_pool;
// extern struct physical_memory_pool user_physical_pool;
// extern struct virtual_memory_pool kernel_virtual_pool;

// enum pool_flags{
//     KERNEL=1,
//     UESR=2
// };


// void mem_init(void) ;
// void* get_kernel_pages(uint32_t pg_cnt) ;
// void* malloc_page(enum pool_flags flag,uint32_t pg_cnt);
// static void page_table_add(void* _vistual_addr,void* _physical_addr);
// uint32_t* pte_ptr(uint32_t vaddr) ;
// uint32_t* pde_ptr(uint32_t vaddr) ;
// static void* palloc(struct physical_memory_pool* pool);
// void*  vistual_addr_get(enum pool_flags flag,uint32_t pg_count);
// #endif
#ifndef __KERNEL_MEMORY_H
#define __KERNEL_MEMORY_H
#include "stdint.h"
#include "bitmap.h"

//核心数据结构，虚拟内存池，有一个位图与其管理的起始虚拟地址
struct virtual_addr {
   struct bitmap vaddr_bitmap;      // 虚拟地址用到的位图结构 
   uint32_t vaddr_start;            // 虚拟地址起始地址
};

extern struct pool kernel_pool, user_pool;
void mem_init(void);

#define	 PG_P_1	  1	// 页表项或页目录项存在属性位
#define	 PG_P_0	  0	// 页表项或页目录项存在属性位
#define	 PG_RW_R  0	// R/W 属性位值, 读/执行
#define	 PG_RW_W  2	// R/W 属性位值, 读/写/执行
#define	 PG_US_S  0	// U/S 属性位值, 系统级
#define	 PG_US_U  4	// U/S 属性位值, 用户级


/* 内存池标记,用于判断用哪个内存池 */
enum pool_flags {
   PF_KERNEL = 1,    // 内核内存池
   PF_USER = 2	     // 用户内存池
};

void* get_kernel_pages(uint32_t pg_cnt);
void* malloc_page(enum pool_flags pf, uint32_t pg_cnt);
void malloc_init(void);
uint32_t* pte_ptr(uint32_t vaddr);
uint32_t* pde_ptr(uint32_t vaddr);
#endif
