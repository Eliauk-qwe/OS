#include "interrupt.h"
#include "stdint.h"
#include "global.h"
#include "print.h"
#include "io.h"

#define IDT_DESC_CNT 0x21


#define PIC_M_CTRL 0x20	       // 这里用的可编程中断控制器是8259A,主片的控制端口是0x20
#define PIC_M_DATA 0x21	       // 主片的数据端口是0x21
#define PIC_S_CTRL 0xa0	       // 从片的控制端口是0xa0
#define PIC_S_DATA 0xa1	       // 从片的数据端口是0xa1



//按照中断门描述符格式定义结构体
//低-->高
struct gate_desc{
    uint16_t offset_low_word;   //中断处理程序在目标代码段中的偏移量0-15位
    uint16_t selector;          //目标代码段选择子
    uint8_t  dcount;            //该项固定值为0
    uint8_t  attr;              //描述符属性
    uint16_t offset_high_word;  //中断处理程序在目标代码段中的偏移量16-31位
};

//中断描述符表(数组)
static struct gate_desc idt[IDT_DESC_CNT];
//中断处理程序入口地址表，在kernel.S中定义
extern intr_handler intr_entry_table[IDT_DESC_CNT];

//初始化中断门描述符与中断处理函数建立映射
static void make_idt_desc(struct gate_desc* idt_desc,uint8_t attr,intr_handler function){

    idt_desc->offset_low_word=(uint32_t)function&0x0000FFFF;
    idt_desc->selector=SELECTOR_K_CODE;
    idt_desc->dcount=0; 
    idt_desc->attr=attr;
    idt_desc->offset_high_word=((uint32_t)function&0xFFFF0000)>>16;

}



//中断门描述符与中断处理函数建立映射
static void idt_desc_init(){
    int i=0;
    for(i=0;i<IDT_DESC_CNT;i++){
        make_idt_desc(&idt[i],IDT_DESC_ATTR_DPL0,intr_entry_table[i]);

    }
    put_str("idt_desc_init done\n");
}


//初始化可编程中断控制器8259A 
static void pic_init(void) {

   //初始化主片 
   outb (PIC_M_CTRL, 0x11);   // ICW1: 边沿触发,级联8259, 需要ICW4.
   outb (PIC_M_DATA, 0x20);   // ICW2: 起始中断向量号为0x20,也就是IR[0-7] 为 0x20 ~ 0x27.
   outb (PIC_M_DATA, 0x04);   // ICW3: IR2接从片. 
   outb (PIC_M_DATA, 0x01);   // ICW4: 8086模式, 正常EOI

   /* 初始化从片 */
   outb (PIC_S_CTRL, 0x11);	// ICW1: 边沿触发,级联8259, 需要ICW4.
   outb (PIC_S_DATA, 0x28);	// ICW2: 起始中断向量号为0x28,也就是IR[8-15] 为 0x28 ~ 0x2F.
   outb (PIC_S_DATA, 0x02);	// ICW3: 设置从片连接到主片的IR2引脚
   outb (PIC_S_DATA, 0x01);	// ICW4: 8086模式, 正常EOI

   /* 打开主片上IR0,也就是目前只接受时钟产生的中断 */
   outb (PIC_M_DATA, 0xfe);
   outb (PIC_S_DATA, 0xff);

   put_str("   pic_init done\n");
}


void idt_init(){
    put_str("idt_init start\n");
    idt_desc_init();  //初始化中断描述符表
    pic_init();       //初始化8259A

    //加载idt
    uint64_t idt_operand=(sizeof(idt)-1)|((uint64_t)((uint32_t)idt<<16));
//  47              16 15               0
// +------------------+------------------+
// |     基地址        |     界限         |
// +------------------+------------------+
    asm volatile("lidt %0": : "m" (idt_operand));
    put_str("idt_init done\n");

}



