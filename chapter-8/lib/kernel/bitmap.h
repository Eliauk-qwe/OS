#ifndef __LIB_KERNEL_BITMAP_H__
#define __LIB_KERNEL_BITMAP_H__

#define BITMAP_MASK 1

#include "stdint.h"
#include "global.h"
struct bitmap
{
    uint32_t    btmp_bytes_len; // 位图字节长度
    uint8_t*    bits;           // 位图数组指针
};

void bitmap_init(struct bitmap* btmp);
bool  judge_bitmap(struct bitmap* btmp,uint32_t bit_index);
void bitmap_set(struct bitmap* btmp,uint32_t bit_index,int8_t value);
int bitmap_scan(struct bitmap* btmp,uint32_t cnt);

#endif