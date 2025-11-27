#include "bitmap.h"
#include "string.h"
#include "global.h"
#include "debug.h"



//初始化位图
void bitmap_init(struct bitmap* btmp){
    memset(btmp->bits,0,btmp->btmp_bytes_len);
}

//判断bit_idx位是否为1，若为1则返回true，否则返回false

//===================================
//判断某一位是否为1----这一位 & 1
//===================================
bool  judge_bitmap(struct bitmap* btmp,uint32_t bit_index){
    uint32_t byte_index=bit_index/8;
    uint32_t bit_odd=bit_index%8;
    //return (btmp->bits[byte_index] &(BITMAP_MASK<<bit_odd));
    if(btmp->bits[byte_index] &(BITMAP_MASK<<bit_odd)){
        return true;
    }
    else{
        return false;
    }
}



//设置位图某一位bit_idx为value
void bitmap_set(struct bitmap* btmp,uint32_t bit_index,int8_t value){
    ASSERT((value==0)||(value==1));
    uint32_t byte_index=bit_index/8;
    uint32_t bit_odd=bit_index%8;
    if(value==1){
        btmp->bits[byte_index]|=(BITMAP_MASK<<bit_odd);
    }
    else{
        btmp->bits[byte_index]&=~(BITMAP_MASK<<bit_odd);
    }
}


//在位图中申请连续cnt个位，成功则返回起始位下标，失败则返回-1
/*int bitmap_scan(struct bitmap* btmp,uint32_t cnt){
    uint32_t arae_start=0;  //用于记录空闲区域的起始位下标
    uint32_t arae_size=0;   //用于记录空闲区域的大小

    while(1){
        //找到第一个为0的位
        while(judge_bitmap(btmp,arae_start)==1 && arae_start/8 <btmp->btmp_bytes_len){
            arae_start++;
        }

        //如果已经扫描完位图都没有找到空闲位，直接返回-1
        if(arae_start/8 >=btmp->btmp_bytes_len){
            return -1;  
        }

        arae_size=1;

        //继续往后找，直到找到cnt个连续的0
        while (arae_size<cnt)
        {
            if((arae_start+arae_size)/8 >=btmp->btmp_bytes_len){
                return -1;
            }

            if(judge_bitmap(btmp,arae_start+arae_size)==0){
                arae_size++;
            }
            else{
                break;
            }
        }


        //两个出口，两个判断
        if(arae_size==cnt){
            return arae_start;
        }
        else{
            arae_start+=arae_size;
        }
        


    }
}*/
int bitmap_scan(struct bitmap* btmp, uint32_t cnt) {
    uint32_t bit_idx = 0;
    uint32_t size = btmp->btmp_bytes_len * 8;

    while (bit_idx < size) {

        /* 找到第一个为 0 的 bit */
        while (bit_idx < size && judge_bitmap(btmp, bit_idx) ){
            bit_idx++;
        }

        if (bit_idx >= size)
            return -1;

        /* 从这个 0 开始统计是否能找到连续 cnt 个 0 */
        uint32_t start = bit_idx;
        uint32_t length = 1;

        while (length < cnt) {
            if (bit_idx + length >= size)
                return -1;

            if (judge_bitmap(btmp, bit_idx + length) == 0)
                length++;
            else
                break;
        }

        if (length == cnt)
            return start;

        /* 否则跳过当前这段连续 0 区域 */
        bit_idx += length;
    }

    return -1;
}
