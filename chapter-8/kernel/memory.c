#include "memory.h"
#include "print.h"
struct physical_memory_pool kernel_physical_pool;
struct physical_memory_pool user_physical_pool;
struct virtual_memory_pool kernel_virtual_pool;

//初始化内存池
static void mem_pool_init(uint32_t all_mem){
    put_str("mem_pool_init start\n");

    uint32_t page_table_size=PG_SIZE*256; //页表大小
    uint32_t used_mem=page_table_size+0x100000; //0x100000是低端1MB内存
    uint32_t free_mem=all_mem-used_mem;
    uint16_t all_free_pages=free_mem/PG_SIZE;
    uint16_t kernel_free_pages=all_free_pages/2;
    uint16_t user_free_pages=all_free_pages-kernel_free_pages;

    uint32_t kbm_length=kernel_free_pages/8;
    uint32_t ubm_length=user_free_pages/8;

    uint32_t kp_start=used_mem;
    uint32_t up_start=kp_start+kernel_free_pages*PG_SIZE;

    kernel_physical_pool.physical_start=kp_start;
    user_physical_pool.physical_start=up_start;

    kernel_physical_pool.physical_pool_size=kernel_free_pages*PG_SIZE;
    user_physical_pool.physical_pool_size=user_free_pages*PG_SIZE;

    kernel_physical_pool.physical_bitmap.bits=(void*)BITMAP_VIRTUAL_START;
    user_physical_pool.physical_bitmap.bits=(void*)(BITMAP_VIRTUAL_START+kbm_length);

    put_str("kernel_pool_bitmap_start:");
    put_int((int)kernel_physical_pool.physical_bitmap.bits);
    put_str("\nuser_pool_bitmap_start:");
    put_int((int)user_physical_pool.physical_bitmap.bits);
    put_str("\n");

    put_str("kernel_pool_phy_start:");
    put_int(kernel_physical_pool.physical_start);
    put_str("\nuser_pool_phy_start:");
    put_int(user_physical_pool.physical_start);
    put_str("\n");

   

    kernel_virtual_pool.virtual_bitmap.btmp_bytes_len=kbm_length;
    kernel_virtual_pool.virtual_bitmap.bits=(void*)(BITMAP_VIRTUAL_START+kbm_length+ubm_length);
    kernel_virtual_pool.vistual_start=KERNEL_HEAP_START;
    bitmap_init(&kernel_virtual_pool.virtual_bitmap);
    put_str("mem_pool_init done\n");



}

/* 内存管理部分初始化入口 */
void mem_init() {
   put_str("mem_init start\n");
   uint32_t mem_bytes_total = (*(uint32_t*)(0xb00));
   mem_pool_init(mem_bytes_total);	  // 初始化内存池
   put_str("mem_init done\n");
}