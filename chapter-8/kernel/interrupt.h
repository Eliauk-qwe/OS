#ifndef __KERNEL_INTERRUPT_H
#define __KERNEL_INTERRUPT_H
typedef void* intr_handler;		//将intr_handler定义为void*同类型
void idt_init(void);


//中断状态的两种状态
enum intr_status{
    INTR_OFF,
    INTR_ON
};

enum intr_status get_intr_status();
enum intr_status intr_open();
enum intr_status intr_close();      
enum intr_status set_intr_status(enum intr_status status);
#endif

    